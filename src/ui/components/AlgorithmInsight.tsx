import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useVisualization } from '../../store/VisualizationContext';
import type { TraceStep, CallStep, ReturnStep, BaseCaseStep } from '../../engine/types';
import { useLang } from '../../store/LangContext';

// ── Formula key lookup ───────────────────────────────────────

import type { TranslationKey } from '../../locales/en';

type FormulaKeys = { formula: TranslationKey; desc: TranslationKey; cmplx: TranslationKey };

const formulaKeys: Record<string, FormulaKeys> = {
  factorial:     { formula: 'alg.factorial.formula',    desc: 'alg.factorial.desc',    cmplx: 'alg.factorial.cmplx' },
  power:         { formula: 'alg.power.formula',        desc: 'alg.power.desc',        cmplx: 'alg.power.cmplx' },
  fibonacci:     { formula: 'alg.fibonacci.formula',    desc: 'alg.fibonacci.desc',    cmplx: 'alg.fibonacci.cmplx' },
  sumArray:      { formula: 'alg.sumArray.formula',     desc: 'alg.sumArray.desc',     cmplx: 'alg.sumArray.cmplx' },
  maxItem:       { formula: 'alg.maxItem.formula',      desc: 'alg.maxItem.desc',      cmplx: 'alg.maxItem.cmplx' },
  bubbleSort:    { formula: 'alg.bubbleSort.formula',   desc: 'alg.bubbleSort.desc',   cmplx: 'alg.bubbleSort.cmplx' },
  selectionSort: { formula: 'alg.selectionSort.formula', desc: 'alg.selectionSort.desc', cmplx: 'alg.selectionSort.cmplx' },
  insertionSort: { formula: 'alg.insertionSort.formula', desc: 'alg.insertionSort.desc', cmplx: 'alg.insertionSort.cmplx' },
};

// ── Computation chain builders ────────────────────────────────

function buildFactorialChain(trace: TraceStep[], stepIndex: number): string {
  const calls: number[] = [];
  const returns: Map<number, number> = new Map();

  for (let i = 0; i <= stepIndex; i++) {
    const s = trace[i];
    if (s.type === 'CALL' && (s as CallStep).fnName === 'Factorial') {
      const n = (s as CallStep).params['n'] as number;
      if (!calls.includes(n)) calls.push(n);
    }
    if ((s.type === 'RETURN' || s.type === 'BASE_CASE') && 'fnName' in s && s.fnName === 'Factorial') {
      const n = (s as ReturnStep | BaseCaseStep).params['n'] as number;
      const v = (s as ReturnStep | BaseCaseStep).returnValue as number;
      returns.set(n, v);
    }
  }

  if (calls.length === 0) return '';
  const top = calls[0];
  const parts: string[] = [];
  for (let n = top; n >= 1; n--) {
    if (returns.has(n)) {
      parts.push(`${returns.get(n)}`);
      break;
    }
    parts.push(`${n}`);
  }
  return `${top}! = ${parts.join(' × ')}`;
}

function buildFibonacciSequence(trace: TraceStep[], stepIndex: number): { sequence: string; duplicates: Map<number, number> } {
  const computed = new Map<number, number>();
  const callCounts = new Map<number, number>();

  for (let i = 0; i <= stepIndex; i++) {
    const s = trace[i];
    if (s.type === 'CALL' && (s as CallStep).fnName === 'Fibonacci') {
      const n = (s as CallStep).params['n'] as number;
      callCounts.set(n, (callCounts.get(n) ?? 0) + 1);
    }
    if ((s.type === 'RETURN' || s.type === 'BASE_CASE') && 'fnName' in s && s.fnName === 'Fibonacci') {
      const n = (s as ReturnStep | BaseCaseStep).params['n'] as number;
      const v = (s as ReturnStep | BaseCaseStep).returnValue as number;
      computed.set(n, v);
    }
  }

  // Build sequence string
  const maxN = Math.max(...Array.from(computed.keys()), -1);
  const parts: string[] = [];
  for (let n = 0; n <= maxN; n++) {
    if (computed.has(n)) {
      parts.push(`F(${n})=${computed.get(n)}`);
    }
  }

  // Find duplicates (called more than once)
  const duplicates = new Map<number, number>();
  for (const [n, count] of callCounts) {
    if (count > 1) duplicates.set(n, count);
  }

  return { sequence: parts.join(', '), duplicates };
}

function buildPowerChain(trace: TraceStep[], stepIndex: number): string {
  const returns = new Map<number, number>();
  let base = 0;
  let topExp = 0;

  for (let i = 0; i <= stepIndex; i++) {
    const s = trace[i];
    if (s.type === 'CALL' && (s as CallStep).fnName === 'Power') {
      base = (s as CallStep).params['base'] as number;
      const exp = (s as CallStep).params['exp'] as number;
      if (i === 0) topExp = exp;
    }
    if ((s.type === 'RETURN' || s.type === 'BASE_CASE') && 'fnName' in s && s.fnName === 'Power') {
      const exp = (s as ReturnStep | BaseCaseStep).params['exp'] as number;
      const v = (s as ReturnStep | BaseCaseStep).returnValue as number;
      returns.set(exp, v);
    }
  }

  if (base === 0) return '';
  const parts: string[] = [];
  for (let e = topExp; e >= 0; e--) {
    if (returns.has(e)) {
      parts.push(`${returns.get(e)}`);
      break;
    }
    parts.push(`${base}`);
  }
  return `${base}^${topExp} = ${parts.join(' × ')}`;
}

// ── Component ─────────────────────────────────────────────────

export function AlgorithmInsight() {
  const { state } = useVisualization();
  const { t } = useLang();
  const [collapsed, setCollapsed] = useState(false);
  const algId = state.algorithm.id;
  const keys = formulaKeys[algId];

  if (!keys) return null;

  const isRecursion = state.algorithm.category === 'recursion';

  // Build computation chain for recursion algorithms
  let chain = '';
  let fibData: { sequence: string; duplicates: Map<number, number> } | null = null;

  if (algId === 'factorial') {
    chain = buildFactorialChain(state.trace, state.stepIndex);
  } else if (algId === 'fibonacci') {
    fibData = buildFibonacciSequence(state.trace, state.stepIndex);
  } else if (algId === 'power') {
    chain = buildPowerChain(state.trace, state.stepIndex);
  }

  const duplicateCount = fibData?.duplicates.size ?? 0;
  const totalDuplicateCalls = fibData
    ? Array.from(fibData.duplicates.values()).reduce((sum, c) => sum + c - 1, 0)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-elevated/60 backdrop-blur-sm border border-subtle/40 overflow-hidden"
    >
      {/* Header row with show/hide toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-subtle/20 transition-colors"
        aria-expanded={!collapsed}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{isRecursion ? '📐' : '📊'}</span>
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{t('insight.title')}</span>
        </div>
        <span className="text-xs text-secondary hover:text-primary transition-colors">
          {collapsed ? t('insight.show') : t('insight.hide')}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
      <div className="px-5 pb-3.5 flex items-start gap-4">
        {/* Empty spacer to align content under header icon */}
        <div className="w-5 shrink-0" />

        <div className="flex-1 min-w-0 space-y-2">
          {/* Formula */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-sm font-bold text-blue-400">{t(keys.formula)}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/25 font-mono">
              {t(keys.cmplx)}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-secondary leading-relaxed">{t(keys.desc)}</p>

          {/* Computation chain for factorial/power */}
          <AnimatePresence mode="wait">
            {chain && (
              <motion.div
                key={chain}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-sm text-primary/80 bg-base/50 rounded-lg px-3 py-2 border border-subtle/30"
              >
                {chain}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fibonacci sequence + duplicate warnings */}
          {fibData && fibData.sequence && (
            <div className="space-y-1.5">
              <motion.div
                key={fibData.sequence}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs text-primary/70 bg-base/50 rounded-lg px-3 py-2 border border-subtle/30"
              >
                📝 {fibData.sequence}
              </motion.div>
              {duplicateCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400"
                >
                  <span className="text-base">⚠️</span>
                  <span>
                    <strong>{totalDuplicateCalls} {totalDuplicateCalls > 1 ? t('insight.redundantPlural') : t('insight.redundant')}</strong> {t('insight.detected')}{' '}
                    {Array.from(fibData.duplicates.entries())
                      .slice(0, 3)
                      .map(([n, c]) => t('insight.fibCalled', { n, c }))
                      .join(', ')}
                    {fibData.duplicates.size > 3 ? '…' : ''}.
                    With <span className="text-yellow-400 font-semibold">{t('insight.memo')}</span>{t('insight.memoSuffix')}
                  </span>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
