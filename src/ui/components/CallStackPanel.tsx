import { motion, AnimatePresence } from 'motion/react';
import { useVisualization } from '../../store/VisualizationContext';
import type { TraceStep } from '../../engine/types';
import { useScreenshot } from '../hooks/useScreenshot';
import { ScreenshotButton } from './ScreenshotButton';

interface FrameData {
  callId: string;
  fnName: string;
  params: Record<string, unknown>;
  depth: number;
  returnValue?: unknown;
  isBaseCase?: boolean;
}

const DEPTH_COLORS = [
  '#4F8EF7', // depth 0 - blue
  '#30C9B0', // depth 1 - teal
  '#42D96C', // depth 2 - green
  '#F5C842', // depth 3 - yellow
  '#F5874F', // depth 4 - orange
  '#F55F5F', // depth 5+ - red
];

function getDepthColor(depth: number): string {
  return DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)];
}

function formatParam(value: unknown): string {
  if (Array.isArray(value)) return `[${(value as unknown[]).join(', ')}]`;
  return String(value);
}

function buildActiveFrames(trace: TraceStep[], stepIndex: number): FrameData[] {
  const stack: FrameData[] = [];
  const frameMap = new Map<string, FrameData>();

  for (let i = 0; i <= stepIndex; i++) {
    const step = trace[i];
    if (step.type === 'CALL') {
      const frame: FrameData = {
        callId: step.callId,
        fnName: step.fnName,
        params: step.params,
        depth: step.depth,
      };
      stack.push(frame);
      frameMap.set(step.callId, frame);
    } else if (step.type === 'RETURN') {
      const frame = frameMap.get(step.callId);
      if (frame) frame.returnValue = step.returnValue;
      const idx = stack.findIndex(f => f.callId === step.callId);
      if (idx !== -1) stack.splice(idx, 1);
    } else if (step.type === 'BASE_CASE') {
      const frame = frameMap.get(step.callId);
      if (frame) {
        frame.returnValue = step.returnValue;
        frame.isBaseCase = true;
      }
      const idx = stack.findIndex(f => f.callId === step.callId);
      if (idx !== -1) stack.splice(idx, 1);
    }
  }

  return stack.reverse(); // top of stack first
}

export function CallStackPanel() {
  const { state } = useVisualization();
  const activeFrames = buildActiveFrames(state.trace, state.stepIndex);
  const { targetRef, capture, isCapturing, justCaptured } = useScreenshot({
    filename: `callstack-${state.algorithm.id}-step${state.stepIndex}`,
  });

  return (
    <div className="flex flex-col gap-3 min-h-[300px]">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider">Call Stack</h2>
        <div className="flex items-center gap-2.5">
          <ScreenshotButton onClick={capture} isCapturing={isCapturing} justCaptured={justCaptured} />
          <span className="text-xs px-2.5 py-1 rounded-full bg-elevated border border-subtle/50 text-secondary font-mono">
            Depth: {activeFrames.length}
          </span>
        </div>
      </div>

      <div ref={targetRef}>

      {activeFrames.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-secondary text-sm italic">
          Stack is empty — click Run to start
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {activeFrames.map((frame, index) => {
          const isActive = index === 0;
          const color = getDepthColor(frame.depth);
          return (
            <motion.div
              key={frame.callId}
              layout
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`rounded-2xl p-4 border-2 bg-surface/80 backdrop-blur-sm ${isActive ? 'shadow-lg ring-1 ring-orange-400/20' : 'opacity-75'}`}
              style={{
                borderColor: isActive ? '#F5874F' : color,
                boxShadow: isActive ? `0 0 12px 2px #F5874F44` : 'none',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-bold text-primary">
                  {frame.fnName}
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-md font-mono font-bold"
                  style={{ backgroundColor: color + '22', color }}
                >
                  d{frame.depth}
                </span>
              </div>
              <div className="space-y-1">
                {Object.entries(frame.params).map(([k, v]) => (
                  <div key={k} className="font-mono text-sm text-secondary">
                    <span className="text-blue-400">{k}</span>
                    <span className="text-primary/60"> = </span>
                    <span className="text-green-400">{formatParam(v)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-subtle/40">
                <span className="font-mono text-xs text-secondary">return: </span>
                {frame.returnValue !== undefined ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-mono text-xs font-bold"
                    style={{ color }}
                  >
                    {String(frame.returnValue)}
                  </motion.span>
                ) : (
                  <span className="font-mono text-xs text-secondary/40">__</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      </div>
    </div>
  );
}
