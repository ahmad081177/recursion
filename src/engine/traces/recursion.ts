import type { TraceStep } from '../types';

let callCounter = 0;

function nextId(): string {
  return `call-${++callCounter}`;
}

export function resetCallCounter() {
  callCounter = 0;
}

// ── Factorial ──────────────────────────────────────────────────

export function traceFactorial(input: Record<string, unknown>): TraceStep[] {
  const n = input['n'] as number;
  callCounter = 0;
  const steps: TraceStep[] = [];

  function rec(n: number, depth: number, parentCallId: string | null): number {
    const callId = nextId();
    steps.push({ type: 'CALL', fnName: 'Factorial', params: { n }, depth, callId, parentCallId });

    if (n <= 1) {
      steps.push({ type: 'BASE_CASE', fnName: 'Factorial', params: { n }, returnValue: 1, depth, callId });
      return 1;
    }

    const result = n * rec(n - 1, depth + 1, callId);
    steps.push({ type: 'RETURN', fnName: 'Factorial', params: { n }, returnValue: result, depth, callId });
    return result;
  }

  rec(n, 0, null);
  return steps;
}

// ── Power ──────────────────────────────────────────────────────

export function tracePower(input: Record<string, unknown>): TraceStep[] {
  const base = input['base'] as number;
  const exp = input['exp'] as number;
  callCounter = 0;
  const steps: TraceStep[] = [];

  function rec(base: number, exp: number, depth: number, parentCallId: string | null): number {
    const callId = nextId();
    steps.push({ type: 'CALL', fnName: 'Power', params: { base, exp }, depth, callId, parentCallId });

    if (exp === 0) {
      steps.push({ type: 'BASE_CASE', fnName: 'Power', params: { base, exp }, returnValue: 1, depth, callId });
      return 1;
    }

    const result = base * rec(base, exp - 1, depth + 1, callId);
    steps.push({ type: 'RETURN', fnName: 'Power', params: { base, exp }, returnValue: result, depth, callId });
    return result;
  }

  rec(base, exp, 0, null);
  return steps;
}

// ── Fibonacci ──────────────────────────────────────────────────

export function traceFibonacci(input: Record<string, unknown>): TraceStep[] {
  const n = input['n'] as number;
  callCounter = 0;
  const steps: TraceStep[] = [];

  function rec(n: number, depth: number, parentCallId: string | null): number {
    const callId = nextId();
    steps.push({ type: 'CALL', fnName: 'Fibonacci', params: { n }, depth, callId, parentCallId });

    if (n <= 1) {
      steps.push({ type: 'BASE_CASE', fnName: 'Fibonacci', params: { n }, returnValue: n, depth, callId });
      return n;
    }

    const left = rec(n - 1, depth + 1, callId);
    const right = rec(n - 2, depth + 1, callId);
    const result = left + right;
    steps.push({ type: 'RETURN', fnName: 'Fibonacci', params: { n }, returnValue: result, depth, callId });
    return result;
  }

  rec(n, 0, null);
  return steps;
}

// ── SumArray ───────────────────────────────────────────────────

export function traceSumArray(input: Record<string, unknown>): TraceStep[] {
  const arr = input['arr'] as number[];
  callCounter = 0;
  const steps: TraceStep[] = [];

  function rec(arr: number[], i: number, depth: number, parentCallId: string | null): number {
    const callId = nextId();
    steps.push({ type: 'CALL', fnName: 'SumArray', params: { arr: [...arr], i }, depth, callId, parentCallId });

    if (i >= arr.length) {
      steps.push({ type: 'BASE_CASE', fnName: 'SumArray', params: { arr: [...arr], i }, returnValue: 0, depth, callId });
      return 0;
    }

    const result = arr[i] + rec(arr, i + 1, depth + 1, callId);
    steps.push({ type: 'RETURN', fnName: 'SumArray', params: { arr: [...arr], i }, returnValue: result, depth, callId });
    return result;
  }

  rec(arr, 0, 0, null);
  return steps;
}

// ── MaxItem ────────────────────────────────────────────────────

export function traceMaxItem(input: Record<string, unknown>): TraceStep[] {
  const arr = input['arr'] as number[];
  callCounter = 0;
  const steps: TraceStep[] = [];

  function rec(arr: number[], i: number, depth: number, parentCallId: string | null): number {
    const callId = nextId();
    steps.push({ type: 'CALL', fnName: 'MaxItem', params: { arr: [...arr], i }, depth, callId, parentCallId });

    if (i === arr.length - 1) {
      steps.push({ type: 'BASE_CASE', fnName: 'MaxItem', params: { arr: [...arr], i }, returnValue: arr[i], depth, callId });
      return arr[i];
    }

    const restMax = rec(arr, i + 1, depth + 1, callId);
    const result = arr[i] > restMax ? arr[i] : restMax;
    steps.push({ type: 'RETURN', fnName: 'MaxItem', params: { arr: [...arr], i }, returnValue: result, depth, callId });
    return result;
  }

  rec(arr, 0, 0, null);
  return steps;
}
