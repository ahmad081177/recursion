import { motion, AnimatePresence } from 'motion/react';
import { useVisualization } from '../../store/VisualizationContext';
import type { TraceStep } from '../../engine/types';
import { useMemo, useRef, useEffect, useCallback } from 'react';
import { useScreenshot } from '../hooks/useScreenshot';
import { ScreenshotButton } from './ScreenshotButton';
import { useLang } from '../../store/LangContext';

// ---------- Tree data structures ----------

interface TreeNode {
  callId: string;
  fnName: string;
  params: Record<string, unknown>;
  depth: number;
  parentCallId: string | null;
  returnValue?: unknown;
  isBaseCase: boolean;
  isReturned: boolean;
  children: TreeNode[];
}

interface LayoutNode extends TreeNode {
  x: number;
  y: number;
}

// ---------- Build tree from trace up to stepIndex ----------

function buildTree(trace: TraceStep[], stepIndex: number): Map<string, TreeNode> {
  const nodes = new Map<string, TreeNode>();

  for (let i = 0; i <= stepIndex; i++) {
    const step = trace[i];

    if (step.type === 'CALL') {
      const node: TreeNode = {
        callId: step.callId,
        fnName: step.fnName,
        params: step.params,
        depth: step.depth,
        parentCallId: step.parentCallId,
        isBaseCase: false,
        isReturned: false,
        children: [],
      };
      nodes.set(step.callId, node);
      if (step.parentCallId) {
        const parent = nodes.get(step.parentCallId);
        if (parent) parent.children.push(node);
      }
    } else if (step.type === 'RETURN') {
      const node = nodes.get(step.callId);
      if (node) {
        node.returnValue = step.returnValue;
        node.isReturned = true;
      }
    } else if (step.type === 'BASE_CASE') {
      const node = nodes.get(step.callId);
      if (node) {
        node.returnValue = step.returnValue;
        node.isBaseCase = true;
        node.isReturned = true;
      }
    }
  }

  return nodes;
}

function findRoot(nodes: Map<string, TreeNode>): TreeNode | null {
  for (const node of nodes.values()) {
    if (!node.parentCallId) return node;
  }
  return null;
}

// ---------- Simple tree layout (Reingold-Tilford inspired) ----------

const NODE_W = 100;
const NODE_H = 56;
const H_GAP = 16;
const V_GAP = 48;

function layoutTree(root: TreeNode): { laidOut: LayoutNode[]; width: number; height: number } {
  const result: LayoutNode[] = [];
  const subtreeWidths = new Map<string, number>();

  // pass 1: compute subtree widths bottom-up
  function computeWidth(node: TreeNode): number {
    if (node.children.length === 0) {
      subtreeWidths.set(node.callId, NODE_W);
      return NODE_W;
    }
    const childrenWidth = node.children.reduce((sum, c) => sum + computeWidth(c) + H_GAP, -H_GAP);
    const w = Math.max(NODE_W, childrenWidth);
    subtreeWidths.set(node.callId, w);
    return w;
  }

  // pass 2: assign positions top-down
  function assignPositions(node: TreeNode, x: number, y: number) {
    result.push({ ...node, x, y } as LayoutNode);

    if (node.children.length === 0) return;
    const totalW = node.children.reduce(
      (sum, c) => sum + (subtreeWidths.get(c.callId) ?? NODE_W) + H_GAP,
      -H_GAP,
    );
    let cx = x - totalW / 2;
    for (const child of node.children) {
      const cw = subtreeWidths.get(child.callId) ?? NODE_W;
      assignPositions(child, cx + cw / 2, y + NODE_H + V_GAP);
      cx += cw + H_GAP;
    }
  }

  const totalWidth = computeWidth(root);
  assignPositions(root, totalWidth / 2, 20);

  let maxY = 0;
  for (const n of result) {
    maxY = Math.max(maxY, n.y);
  }

  return { laidOut: result, width: totalWidth + NODE_W, height: maxY + NODE_H + 20 };
}

// ---------- Depth colors ----------

const DEPTH_COLORS = [
  '#4F8EF7', '#30C9B0', '#42D96C', '#F5C842', '#F5874F', '#F55F5F',
];

const CALL_ARROW_COLOR = '#4F8EF7';        // unified blue for all call arrows
const RETURN_ARROW_COLOR = '#A78BFA';      // accent-purple — regular returns
const BASE_RETURN_ARROW_COLOR = '#F5C842'; // accent-yellow/gold — base-case returns
const ARROW_CURVE_OFFSET = 18;             // px horizontal bow for bezier control points
const ARROW_ATTACH_OFFSET = 9;             // px lateral offset at node attach points

function depthColor(d: number): string {
  return DEPTH_COLORS[Math.min(d, DEPTH_COLORS.length - 1)];
}

function returnArrowColor(isBaseCase: boolean): string {
  return isBaseCase ? BASE_RETURN_ARROW_COLOR : RETURN_ARROW_COLOR;
}

function formatPValue(v: unknown): string {
  if (Array.isArray(v)) return `[${(v as unknown[]).join(',')}]`;
  return String(v);
}

function formatReturnLabel(v: unknown): string {
  const s = Array.isArray(v) ? `[${(v as unknown[]).join(',')}]` : String(v);
  return s.length > 8 ? s.slice(0, 7) + '…' : s;
}

/** Quadratic bezier midpoint at t=0.5: B(0.5) = 0.25*P0 + 0.5*CP + 0.25*P1 */
function bezierMid(p0: number, cp: number, p1: number): number {
  return 0.25 * p0 + 0.5 * cp + 0.25 * p1;
}

// ---------- Component ----------

export function RecursionTreePanel() {
  const { state } = useVisualization();
  const { t } = useLang();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { targetRef: screenshotRef, capture, isCapturing, justCaptured } = useScreenshot({
    filename: `tree-${state.algorithm.id}-step${state.stepIndex}`,
  });

  // figure out currently active callId
  const currentStep = state.trace[state.stepIndex];
  const activeCallId = currentStep && 'callId' in currentStep ? currentStep.callId : null;

  const { laidOut, width, height, root } = useMemo(() => {
    const nodes = buildTree(state.trace, state.stepIndex);
    const r = findRoot(nodes);
    if (!r) return { laidOut: [], width: 0, height: 0, root: null };
    const layout = layoutTree(r);
    return { ...layout, root: r };
  }, [state.trace, state.stepIndex]);

  // build parent lookup for edges
  const parentPos = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    for (const n of laidOut) {
      map.set(n.callId, { x: n.x, y: n.y });
    }
    return map;
  }, [laidOut]);

  // auto-scroll to active node
  const scrollToActive = useCallback(() => {
    if (!containerRef.current || !activeCallId) return;
    const el = containerRef.current.querySelector(`[data-callid="${activeCallId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [activeCallId]);

  useEffect(() => {
    scrollToActive();
  }, [scrollToActive]);

  if (!root || laidOut.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-secondary">
        <div className="text-center">
          <p className="text-3xl mb-2">🌳</p>
          <p className="text-sm font-semibold">{t('tree.title')}</p>
          <p className="text-xs mt-1">Step through to see the tree grow</p>
        </div>
      </div>
    );
  }

  const svgW = Math.max(width + 40, 280);
  const svgH = height + 40;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider">{t('tree.title')}</h2>
        <div className="flex items-center gap-2">
          <ScreenshotButton onClick={capture} isCapturing={isCapturing} justCaptured={justCaptured} />
          <span className="text-xs px-2 py-1 rounded-full bg-surface border border-subtle text-secondary">
            {laidOut.length} node{laidOut.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div ref={(el) => { containerRef.current = el; (screenshotRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }} className="flex-1 overflow-auto rounded-lg bg-surface/50 border border-subtle">
        <svg
          ref={svgRef}
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="block mx-auto"
        >
          {/* Arrowhead markers — all use orient="auto" so tip points in travel direction */}
          <defs>
            {/* Call: tip at end of path (marker-end) → forward triangle */}
            <marker id="arrow-call" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L7,3 L0,6 Z" fill={CALL_ARROW_COLOR} />
            </marker>
            {/* Return regular: tip at end of path → forward triangle, purple */}
            <marker id="arrow-return" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L7,3 L0,6 Z" fill={RETURN_ARROW_COLOR} />
            </marker>
            {/* Return base-case: forward triangle, gold */}
            <marker id="arrow-return-base" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L7,3 L0,6 Z" fill={BASE_RETURN_ARROW_COLOR} />
            </marker>
          </defs>

          {/* Centre the tree */}
          <g transform={`translate(${(svgW - width) / 2}, 10)`}>
            {/* Edges — dual arrows: call (left curve) + return (right curve) */}
            {laidOut.map((node) => {
              if (!node.parentCallId) return null;
              const p = parentPos.get(node.parentCallId);
              if (!p) return null;

              // Lateral attach points: call arrow on left side, return on right side of each node
              const px = p.x - ARROW_ATTACH_OFFSET; // parent bottom-left
              const py = p.y + NODE_H;
              const cx = node.x - ARROW_ATTACH_OFFSET; // child top-left
              const cy = node.y;
              // Return arrow attaches on the right side
              const prx = p.x + ARROW_ATTACH_OFFSET; // parent bottom-right
              const crx = node.x + ARROW_ATTACH_OFFSET; // child top-right

              const midY = (py + cy) / 2;

              const isActiveCall = node.callId === activeCallId && currentStep?.type === 'CALL';
              const isActiveReturn = node.callId === activeCallId &&
                (currentStep?.type === 'RETURN' || currentStep?.type === 'BASE_CASE');

              const retColor = returnArrowColor(node.isBaseCase);

              // Call arrow: left side, bows further left
              const callPath = `M ${px},${py} Q ${px - ARROW_CURVE_OFFSET},${midY} ${cx},${cy}`;
              // Return arrow: right side, bows further right, travels from child up to parent
              const retPath = `M ${crx},${cy} Q ${crx + ARROW_CURVE_OFFSET},${midY} ${prx},${py}`;

              return (
                <g key={`edges-${node.callId}`}>
                  {/* Call arrow (always visible once node exists) */}
                  <path
                    d={callPath}
                    fill="none"
                    stroke={CALL_ARROW_COLOR}
                    strokeWidth={isActiveCall ? 3 : 1.8}
                    strokeOpacity={isActiveCall ? 1 : 0.6}
                    markerEnd="url(#arrow-call)"
                  />

                  {/* Return arrow + label (visible only after return) */}
                  {node.isReturned && (() => {
                    const labelX = bezierMid(crx, crx + ARROW_CURVE_OFFSET, prx);
                    const labelY = bezierMid(cy, midY, py);
                    const markerRef = node.isBaseCase ? 'url(#arrow-return-base)' : 'url(#arrow-return)';
                    const valStr = node.returnValue !== undefined ? formatReturnLabel(node.returnValue) : '';

                    return (
                      <>
                        <path
                          d={retPath}
                          fill="none"
                          stroke={retColor}
                          strokeWidth={isActiveReturn ? 3 : 1.8}
                          strokeOpacity={isActiveReturn ? 1 : 0.7}
                          strokeDasharray="5 3"
                          markerEnd={markerRef}
                          className="transition-opacity duration-200"
                        />
                        {valStr && (
                          <>
                            <rect
                              x={labelX + 2}
                              y={labelY - 8}
                              width={valStr.length * 6.5 + 4}
                              height={14}
                              rx={3}
                              style={{ fill: 'var(--color-surface)' }}
                              fillOpacity={0.9}
                            />
                            <text
                              x={labelX + 2 + (valStr.length * 6.5) / 2 + 2}
                              y={labelY + 2}
                              textAnchor="middle"
                              fill={retColor}
                              fontSize={10}
                              fontFamily="'JetBrains Mono', monospace"
                              fontWeight={700}
                            >
                              {valStr}
                            </text>
                          </>
                        )}
                      </>
                    );
                  })()}
                </g>
              );
            })}

            {/* Nodes */}
            <AnimatePresence>
              {laidOut.map((node) => {
                const isActive = node.callId === activeCallId;
                const isRoot = !node.parentCallId;
                const color = depthColor(node.depth);
                // Never dim nodes — root gets a persistent subtle highlight
                const paramStr = Object.entries(node.params)
                  .map(([k, v]) => `${k}=${formatPValue(v)}`)
                  .join(', ');

                return (
                  <motion.g
                    key={node.callId}
                    data-callid={node.callId}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {/* Node background */}
                    <rect
                      x={node.x - NODE_W / 2}
                      y={node.y}
                      width={NODE_W}
                      height={NODE_H}
                      rx={10}
                      ry={10}
                      fill={
                        isActive ? color + '33'
                        : isRoot ? color + '20'
                        : color + '14'
                      }
                      stroke={
                        isActive ? color
                        : isRoot ? color + 'CC'
                        : color + '77'
                      }
                      strokeWidth={isActive ? 2.5 : isRoot ? 2 : 1.5}
                    />

                    {/* Active or root glow */}
                    {(isActive || isRoot) && (
                      <rect
                        x={node.x - NODE_W / 2 - 3}
                        y={node.y - 3}
                        width={NODE_W + 6}
                        height={NODE_H + 6}
                        rx={12}
                        ry={12}
                        fill="none"
                        stroke={color}
                        strokeWidth={1}
                        opacity={isActive ? 0.35 : 0.15}
                      />
                    )}

                    {/* Function name */}
                    <text
                      x={node.x}
                      y={node.y + 18}
                      textAnchor="middle"
                      style={{ fill: 'var(--color-primary)' }}
                      fontSize={isRoot ? 12 : 11}
                      fontFamily="'JetBrains Mono', monospace"
                      fontWeight={isRoot ? 700 : 600}
                    >
                      {node.fnName}
                    </text>

                    {/* Params */}
                    <text
                      x={node.x}
                      y={node.y + 32}
                      textAnchor="middle"
                      style={{ fill: 'var(--color-secondary)' }}
                      fontSize={9}
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      {paramStr.length > 14 ? paramStr.slice(0, 12) + '…' : paramStr}
                    </text>

                    {/* Return value */}
                    {node.returnValue !== undefined && (
                      <text
                        x={node.x}
                        y={node.y + 46}
                        textAnchor="middle"
                        fill={color}
                        fontSize={10}
                        fontFamily="'JetBrains Mono', monospace"
                        fontWeight={700}
                      >
                        → {String(node.returnValue)}
                      </text>
                    )}

                    {/* Base case badge */}
                    {node.isBaseCase && (
                      <g>
                        <circle
                          cx={node.x + NODE_W / 2 - 4}
                          cy={node.y + 4}
                          r={6}
                          fill="#F5C842"
                        />
                        <text
                          x={node.x + NODE_W / 2 - 4}
                          y={node.y + 7.5}
                          textAnchor="middle"
                          fontSize={8}
                          fill="#1a1b26"
                          fontWeight={700}
                        >
                          B
                        </text>
                      </g>
                    )}
                  </motion.g>
                );
              })}
            </AnimatePresence>
          </g>
        </svg>
      </div>
    </div>
  );
}
