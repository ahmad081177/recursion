import type { TraceStep, CallStep, ReturnStep, BaseCaseStep, CompareStep, SwapStep } from './types';
import { en } from '../locales/en';
import type { TranslationKey } from '../locales/en';

export type TFn = (key: TranslationKey, vars?: Record<string, unknown>) => string;

function defaultT(key: TranslationKey, vars?: Record<string, unknown>): string {
  const template = (en as Record<string, string>)[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

function formatParams(params: Record<string, unknown>): string {
  return Object.entries(params)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}=[${v.join(', ')}]`;
      return `${k}=${v}`;
    })
    .join(', ');
}

// ── Generic narrations ────────────────────────────────────────

function narrate(step: CallStep, t: TFn): string {
  return t('narr.call', { fnName: step.fnName, params: formatParams(step.params), depth: step.depth });
}

function narrateReturn(step: ReturnStep, t: TFn): string {
  return t('narr.return', { fnName: step.fnName, params: formatParams(step.params), returnValue: step.returnValue });
}

function narrateBaseCase(step: BaseCaseStep, t: TFn): string {
  return t('narr.baseCase', { fnName: step.fnName, params: formatParams(step.params), returnValue: step.returnValue });
}

function narrateCompare(step: CompareStep, t: TFn): string {
  const [i, j] = step.indices;
  const a = step.array[i], b = step.array[j];
  const cmp = a > b ? t('narr.compare.swap', { a, b }) : t('narr.compare.noSwap', { a, b });
  return t('narr.compare', { i, j, a, b, cmp });
}

function narrateSwap(step: SwapStep, t: TFn): string {
  const [i, j] = step.indices;
  return t('narr.swap', { i, j, array: step.array.join(', ') });
}

// ── Per-algorithm narrators ───────────────────────────────────

function narrateFibonacci(step: TraceStep, t: TFn): string | null {
  if (step.type === 'CALL') {
    const n = (step as CallStep).params['n'] as number;
    if (n <= 1) return t('narr.fib.call.base', { n });
    return t('narr.fib.call', { n, n1: n - 1, n2: n - 2 });
  }
  if (step.type === 'BASE_CASE') {
    const n = (step as BaseCaseStep).params['n'] as number;
    return t('narr.fib.baseCase', { n, val: (step as BaseCaseStep).returnValue });
  }
  if (step.type === 'RETURN') {
    const n = (step as ReturnStep).params['n'] as number;
    return t('narr.fib.return', { n, val: (step as ReturnStep).returnValue, n1: n - 1, n2: n - 2 });
  }
  return null;
}

function narrateFactorial(step: TraceStep, t: TFn): string | null {
  if (step.type === 'CALL') {
    const n = (step as CallStep).params['n'] as number;
    if (n <= 1) return t('narr.fact.call.base', { n });
    return t('narr.fact.call', { n, n1: n - 1 });
  }
  if (step.type === 'BASE_CASE') {
    const n = (step as BaseCaseStep).params['n'] as number;
    return t('narr.fact.baseCase', { n });
  }
  if (step.type === 'RETURN') {
    const rs = step as ReturnStep;
    const n = rs.params['n'] as number;
    const prev = (rs.returnValue as number) / n;
    return t('narr.fact.return', { n, val: rs.returnValue, prev });
  }
  return null;
}

function narratePower(step: TraceStep, t: TFn): string | null {
  if (step.type === 'CALL') {
    const base = (step as CallStep).params['base'] as number;
    const exp = (step as CallStep).params['exp'] as number;
    if (exp === 0) return t('narr.pow.call.base', { base, exp });
    return t('narr.pow.call', { base, exp, exp1: exp - 1 });
  }
  if (step.type === 'BASE_CASE') {
    const base = (step as BaseCaseStep).params['base'] as number;
    return t('narr.pow.baseCase', { base });
  }
  if (step.type === 'RETURN') {
    const rs = step as ReturnStep;
    const base = rs.params['base'] as number;
    const exp = rs.params['exp'] as number;
    const prev = (rs.returnValue as number) / base;
    return t('narr.pow.return', { base, exp, val: rs.returnValue, prev });
  }
  return null;
}

function narrateSumArray(step: TraceStep, t: TFn): string | null {
  if (step.type === 'CALL') {
    const arr = (step as CallStep).params['arr'] as number[];
    const i = (step as CallStep).params['i'] as number;
    if (i >= arr.length) return t('narr.sum.call.base', { i });
    return t('narr.sum.call', { i, elem: arr[i] });
  }
  if (step.type === 'BASE_CASE') {
    const i = (step as BaseCaseStep).params['i'] as number;
    return t('narr.sum.baseCase', { i });
  }
  if (step.type === 'RETURN') {
    const rs = step as ReturnStep;
    const arr = rs.params['arr'] as number[];
    const i = rs.params['i'] as number;
    return t('narr.sum.return', { i, val: rs.returnValue, elem: arr[i] });
  }
  return null;
}

function narrateMaxItem(step: TraceStep, t: TFn): string | null {
  if (step.type === 'CALL') {
    const arr = (step as CallStep).params['arr'] as number[];
    const i = (step as CallStep).params['i'] as number;
    if (i === arr.length - 1) return t('narr.max.call.base', { i, elem: arr[i] });
    return t('narr.max.call', { i, elem: arr[i] });
  }
  if (step.type === 'BASE_CASE') {
    const arr = (step as BaseCaseStep).params['arr'] as number[];
    const i = (step as BaseCaseStep).params['i'] as number;
    return t('narr.max.baseCase', { i, elem: arr[i] });
  }
  if (step.type === 'RETURN') {
    const rs = step as ReturnStep;
    const arr = rs.params['arr'] as number[];
    const i = rs.params['i'] as number;
    return t('narr.max.return', { i, val: rs.returnValue, elem: arr[i] });
  }
  return null;
}

// ── Sorting narrators ─────────────────────────────────────────

function narrateBubbleSort(step: TraceStep, t: TFn): string | null {
  if (step.type === 'COMPARE') {
    const cs = step as CompareStep;
    const [i, j] = cs.indices;
    const a = cs.array[i], b = cs.array[j];
    const passInfo = cs.pass !== undefined ? t('narr.sort.pass', { n: cs.pass + 1 }) : '';
    if (a > b) return t('narr.bubble.compare.swap', { passInfo, i, j, a, b });
    return t('narr.bubble.compare.ok', { passInfo, i, j, a, b });
  }
  if (step.type === 'SWAP') {
    const sw = step as SwapStep;
    const passInfo = sw.pass !== undefined ? t('narr.sort.passPrefix', { n: sw.pass + 1 }) : '';
    return t('narr.bubble.swap', { passInfo, array: sw.array.join(', ') });
  }
  return null;
}

function narrateSelectionSort(step: TraceStep, t: TFn): string | null {
  if (step.type === 'COMPARE') {
    const cs = step as CompareStep;
    const [minI, j] = cs.indices;
    const a = cs.array[minI], b = cs.array[j];
    const passInfo = cs.pass !== undefined ? t('narr.sort.pass', { n: cs.pass + 1 }) : '';
    if (b < a) return t('narr.sel.compare.found', { passInfo, j, minI, a, b });
    return t('narr.sel.compare.keep', { passInfo, j, minI, a, b });
  }
  if (step.type === 'SWAP') {
    const sw = step as SwapStep;
    const [i] = sw.indices;
    const passInfo = sw.pass !== undefined ? t('narr.sort.passPrefix', { n: sw.pass + 1 }) : '';
    return t('narr.sel.swap', { passInfo, i, val: sw.array[i], sorted: i + 1 });
  }
  return null;
}

function narrateInsertionSort(step: TraceStep, t: TFn): string | null {
  if (step.type === 'COMPARE') {
    const cs = step as CompareStep;
    const [left, right] = cs.indices;
    const a = cs.array[left], b = cs.array[right];
    const passInfo = cs.pass !== undefined ? t('narr.ins.pass', { n: cs.pass + 2 }) : '';
    if (a > b) return t('narr.ins.compare.shift', { passInfo, left, right, a, b });
    return t('narr.ins.compare.ok', { passInfo, left, right, a, b });
  }
  if (step.type === 'SWAP') {
    const sw = step as SwapStep;
    const passInfo = sw.pass !== undefined ? t('narr.ins.passPrefix', { n: sw.pass + 2 }) : '';
    return t('narr.ins.swap', { passInfo, array: sw.array.join(', ') });
  }
  return null;
}

const sortNarratorMap: Record<string, (step: TraceStep, t: TFn) => string | null> = {
  BubbleSort: narrateBubbleSort,
  SelectionSort: narrateSelectionSort,
  InsertionSort: narrateInsertionSort,
};

const recursionNarratorMap: Record<string, (step: TraceStep, t: TFn) => string | null> = {
  Fibonacci: narrateFibonacci,
  Factorial: narrateFactorial,
  Power: narratePower,
  SumArray: narrateSumArray,
  MaxItem: narrateMaxItem,
};

export function generateNarration(step: TraceStep, t: TFn = defaultT): string {
  if ((step.type === 'COMPARE' || step.type === 'SWAP') && step.sortAlgorithm) {
    const narrator = sortNarratorMap[step.sortAlgorithm];
    if (narrator) {
      const result = narrator(step, t);
      if (result !== null) return result;
    }
  }

  if ('fnName' in step && step.fnName) {
    const narrator = recursionNarratorMap[step.fnName];
    if (narrator) {
      const result = narrator(step, t);
      if (result !== null) return result;
    }
  }

  switch (step.type) {
    case 'CALL':      return narrate(step, t);
    case 'RETURN':    return narrateReturn(step, t);
    case 'BASE_CASE': return narrateBaseCase(step, t);
    case 'COMPARE':   return narrateCompare(step, t);
    case 'SWAP':      return narrateSwap(step, t);
  }
}

// ── Expanded narrators ────────────────────────────────────────

function expandedFibonacci(step: TraceStep, t: TFn): string | null {
  if (step.type === 'CALL') {
    const n = (step as CallStep).params['n'] as number;
    if (n > 2) return t('narr.exp.fib.call', { n, n1: n - 1, n2: n - 2 });
    return t('narr.exp.fib.call.base');
  }
  if (step.type === 'RETURN') return t('narr.exp.fib.return');
  if (step.type === 'BASE_CASE') return t('narr.exp.fib.baseCase');
  return null;
}

function expandedFactorial(step: TraceStep, t: TFn): string | null {
  if (step.type === 'CALL') {
    const n = (step as CallStep).params['n'] as number;
    return t('narr.exp.fact.call', { n, n1: n - 1 });
  }
  if (step.type === 'RETURN') return t('narr.exp.fact.return');
  if (step.type === 'BASE_CASE') return t('narr.exp.fact.baseCase');
  return null;
}

function expandedPower(step: TraceStep, t: TFn): string | null {
  if (step.type === 'CALL') {
    const { base, exp } = (step as CallStep).params as { base: number; exp: number };
    return t('narr.exp.pow.call', { base, exp, exp1: exp - 1 });
  }
  if (step.type === 'RETURN') return t('narr.exp.pow.return');
  if (step.type === 'BASE_CASE') return t('narr.exp.pow.baseCase');
  return null;
}

function expandedSumArray(step: TraceStep, t: TFn): string | null {
  if (step.type === 'CALL') return t('narr.exp.sum.call');
  if (step.type === 'RETURN') return t('narr.exp.sum.return');
  if (step.type === 'BASE_CASE') return t('narr.exp.sum.baseCase');
  return null;
}

function expandedMaxItem(step: TraceStep, t: TFn): string | null {
  if (step.type === 'CALL') return t('narr.exp.max.call');
  if (step.type === 'RETURN') return t('narr.exp.max.return');
  if (step.type === 'BASE_CASE') return t('narr.exp.max.baseCase');
  return null;
}

function expandedBubbleSort(step: TraceStep, t: TFn): string | null {
  if (step.type === 'COMPARE') {
    const cs = step as CompareStep;
    const pass = cs.pass ?? 0;
    return t('narr.exp.bubble.compare', { pass: pass + 1, sorted: pass + 1 });
  }
  if (step.type === 'SWAP') return t('narr.exp.bubble.swap');
  return null;
}

function expandedSelectionSort(step: TraceStep, t: TFn): string | null {
  if (step.type === 'COMPARE') {
    const cs = step as CompareStep;
    const pass = cs.pass ?? 0;
    return t('narr.exp.sel.compare', { pass: pass + 1, from: pass, to: cs.array.length - 1 });
  }
  if (step.type === 'SWAP') {
    const sw = step as SwapStep;
    const pass = sw.pass ?? 0;
    return t('narr.exp.sel.swap', { pos: pass });
  }
  return null;
}

function expandedInsertionSort(step: TraceStep, t: TFn): string | null {
  if (step.type === 'COMPARE') {
    const cs = step as CompareStep;
    const pass = cs.pass ?? 0;
    return t('narr.exp.ins.compare', { elem: pass + 2 });
  }
  if (step.type === 'SWAP') return t('narr.exp.ins.swap');
  return null;
}

const expandedRecursionMap: Record<string, (step: TraceStep, t: TFn) => string | null> = {
  Fibonacci: expandedFibonacci,
  Factorial: expandedFactorial,
  Power: expandedPower,
  SumArray: expandedSumArray,
  MaxItem: expandedMaxItem,
};

const expandedSortingMap: Record<string, (step: TraceStep, t: TFn) => string | null> = {
  BubbleSort: expandedBubbleSort,
  SelectionSort: expandedSelectionSort,
  InsertionSort: expandedInsertionSort,
};

export function generateExpandedNarration(step: TraceStep, t: TFn = defaultT): string {
  if ((step.type === 'COMPARE' || step.type === 'SWAP') && step.sortAlgorithm) {
    const expander = expandedSortingMap[step.sortAlgorithm];
    if (expander) {
      const result = expander(step, t);
      if (result !== null) return result;
    }
  }

  if ('fnName' in step && step.fnName) {
    const expander = expandedRecursionMap[step.fnName];
    if (expander) {
      const result = expander(step, t);
      if (result !== null) return result;
    }
  }

  switch (step.type) {
    case 'CALL':      return t('narr.exp.call');
    case 'BASE_CASE': return t('narr.exp.baseCase');
    case 'RETURN':    return t('narr.exp.return');
    case 'COMPARE':   return t('narr.exp.compare');
    case 'SWAP':      return t('narr.exp.swap');
  }
}

