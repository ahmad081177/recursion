import { motion, AnimatePresence } from 'motion/react';
import { useVisualization } from '../../store/VisualizationContext';
import type { CompareStep, SwapStep, TraceStep } from '../../engine/types';
import { useLang } from '../../store/LangContext';
import type { TFn } from '../../engine/narration';

const EMOJIS = {
  default: '🙂',
  comparing: '😮',
  swapping: '😲',
  sorted: '✅',
};

interface TileState {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted';
}

/** Compute which indices are in their final sorted position */
function getSortedRegion(trace: TraceStep[], stepIndex: number): Set<number> {
  const sorted = new Set<number>();
  const step = trace[stepIndex];
  if (!step || (step.type !== 'COMPARE' && step.type !== 'SWAP')) return sorted;

  const alg = (step as CompareStep | SwapStep).sortAlgorithm;
  const arr = (step as CompareStep | SwapStep).array;
  const n = arr.length;
  const pass = (step as CompareStep | SwapStep).pass ?? 0;

  // Last step in trace — the sort is fully complete, all elements are sorted
  if (stepIndex === trace.length - 1) {
    for (let k = 0; k < n; k++) sorted.add(k);
    return sorted;
  }

  if (alg === 'BubbleSort') {
    // During pass i, the last i elements are already confirmed sorted
    for (let k = n - pass; k < n; k++) sorted.add(k);
  } else if (alg === 'SelectionSort') {
    // During pass i, the first i elements are already confirmed sorted
    for (let k = 0; k < pass; k++) sorted.add(k);
  } else if (alg === 'InsertionSort') {
    // The leftmost (pass+1) elements are sorted among themselves
    // but we don't shade them as "final" since they may shift
  }
  return sorted;
}

/** Get comparison result info for the current step */
function getComparisonResult(trace: TraceStep[], stepIndex: number, t: TFn): { text: string; color: string } | null {
  const step = trace[stepIndex];
  if (!step) return null;

  if (step.type === 'COMPARE') {
    const cs = step as CompareStep;
    const [i, j] = cs.indices;
    const a = cs.array[i], b = cs.array[j];
    const next = trace[stepIndex + 1];
    const willSwap = next?.type === 'SWAP' && next.callId === cs.callId;
    if (willSwap) {
      return { text: t('array.cmp.swap', { a, b }), color: '#F5874F' };
    }
    return { text: t('array.cmp.ok', { a, b }), color: '#42D96C' };
  }
  if (step.type === 'SWAP') {
    return { text: t('array.cmp.swapped', { array: (step as SwapStep).array.join(', ') }), color: '#F5874F' };
  }
  return null;
}

function buildArrayState(trace: TraceStep[], stepIndex: number): TileState[] {
  const step = trace[stepIndex];
  let arr: number[] = [];

  if (step && (step.type === 'COMPARE' || step.type === 'SWAP')) {
    arr = [...(step as CompareStep | SwapStep).array];
  } else {
    for (let i = stepIndex; i >= 0; i--) {
      const s = trace[i];
      if (s.type === 'COMPARE' || s.type === 'SWAP') {
        arr = [...(s as CompareStep | SwapStep).array];
        break;
      }
    }
    if (arr.length === 0 && trace.length > 0) {
      const first = trace.find(s => s.type === 'COMPARE' || s.type === 'SWAP') as CompareStep | undefined;
      if (first) arr = [...first.array];
    }
  }

  const sortedRegion = getSortedRegion(trace, stepIndex);
  const tileStates: TileState[] = arr.map((v, i) => ({
    value: v,
    state: sortedRegion.has(i) ? 'sorted' as const : 'default' as const,
  }));

  if (step && step.type === 'COMPARE') {
    const [i, j] = step.indices;
    if (tileStates[i] && !sortedRegion.has(i)) tileStates[i].state = 'comparing';
    if (tileStates[j] && !sortedRegion.has(j)) tileStates[j].state = 'comparing';
  } else if (step && step.type === 'SWAP') {
    const [i, j] = step.indices;
    if (tileStates[i]) tileStates[i].state = 'swapping';
    if (tileStates[j]) tileStates[j].state = 'swapping';
  }

  return tileStates;
}

export function ArrayVisualizer() {
  const { state } = useVisualization();
  const { t } = useLang();
  const tiles = buildArrayState(state.trace, state.stepIndex);
  const compResult = getComparisonResult(state.trace, state.stepIndex, t);

  // Pass info
  const currentStep = state.trace[state.stepIndex];
  const pass = currentStep && (currentStep.type === 'COMPARE' || currentStep.type === 'SWAP')
    ? (currentStep as CompareStep | SwapStep).pass
    : undefined;
  const algName = currentStep && (currentStep.type === 'COMPARE' || currentStep.type === 'SWAP')
    ? (currentStep as CompareStep | SwapStep).sortAlgorithm
    : undefined;
  const totalPasses = tiles.length > 0 ? tiles.length - 1 : 0;

  if (tiles.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-secondary text-sm italic">
        {t('array.empty')}
      </div>
    );
  }

  const tileWidth = Math.min(80, Math.floor(600 / tiles.length));

  return (
    <div className="flex flex-col gap-5">
      {/* Array tiles — hero, top */}
      <div className="flex gap-3 flex-wrap justify-center py-4">
        <AnimatePresence mode="popLayout">
          {tiles.map((tile, i) => {
            const bg =
              tile.state === 'comparing' ? '#F5C84228' :
              tile.state === 'swapping'   ? '#F5874F28' :
              tile.state === 'sorted'     ? '#42D96C18' :
              'var(--color-surface)';
            const border =
              tile.state === 'comparing' ? '#F5C842' :
              tile.state === 'swapping'   ? '#F5874F' :
              tile.state === 'sorted'     ? '#42D96C' :
              'var(--color-subtle)';

            return (
              <motion.div
                key={`${i}-${tile.value}`}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: tile.state === 'comparing' || tile.state === 'swapping' ? 1.1 : 1,
                }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="flex flex-col items-center rounded-2xl border-2 p-3 min-w-[52px] relative"
                style={{
                  backgroundColor: bg,
                  borderColor: border,
                  width: tileWidth,
                }}
              >
                <span className="text-xl">{EMOJIS[tile.state]}</span>
                <span className="font-mono text-base font-bold text-primary mt-1.5">{tile.value}</span>
                <span className="text-xs text-secondary/60 mt-1">[{i}]</span>
                {tile.state === 'sorted' && (
                  <span className="absolute -top-1.5 -right-1.5 text-[10px] bg-green-500/25 text-green-400 rounded-full px-1.5 py-0.5 font-bold border border-green-500/30">
                    ✓
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Status row: pass badge + comparison result */}
      <div className="flex items-center justify-center gap-3 flex-wrap min-h-[2rem]">
        {pass !== undefined && (
          <motion.span
            key={pass}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30"
          >
            {t('array.pass', { n: pass + 1, total: totalPasses })}
          </motion.span>
        )}
        {compResult && (
          <AnimatePresence mode="wait">
            <motion.span
              key={`${state.stepIndex}-result`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: `${compResult.color}20`, color: compResult.color, border: `1px solid ${compResult.color}40` }}
            >
              {compResult.text}
            </motion.span>
          </AnimatePresence>
        )}
      </div>

      {/* Stats + Legend */}
      <div className="flex items-center justify-between flex-wrap gap-3 text-xs text-secondary">
        <div className="flex gap-4">
          <span>{t('array.comparisons')} <strong className="text-primary font-mono">{countStepType(state.trace, state.stepIndex, 'COMPARE')}</strong></span>
          <span>{t('array.swaps')} <strong className="text-primary font-mono">{countStepType(state.trace, state.stepIndex, 'SWAP')}</strong></span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#F5C842]/30 border border-[#F5C842]/50" /> {t('array.legend.comparing')}</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#F5874F]/30 border border-[#F5874F]/50" /> {t('array.legend.swapping')}</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#42D96C]/20 border border-[#42D96C]/50" /> {t('array.legend.sorted')}</span>
        </div>
      </div>

      {/* Algorithm hint */}
      {algName && (
        <div className="text-xs text-secondary/60 text-center italic">
          {algName === 'BubbleSort' && t('array.hint.bubble')}
          {algName === 'SelectionSort' && t('array.hint.selection')}
          {algName === 'InsertionSort' && t('array.hint.insertion')}
        </div>
      )}
    </div>
  );
}

function countStepType(trace: TraceStep[], upTo: number, type: TraceStep['type']): number {
  return trace.slice(0, upTo + 1).filter(s => s.type === type).length;
}
