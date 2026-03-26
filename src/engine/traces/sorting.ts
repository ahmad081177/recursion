import type { TraceStep } from '../types';

let stepCounter = 0;
function nextId(): string {
  return `sort-${++stepCounter}`;
}

// ── Bubble Sort ───────────────────────────────────────────────

export function traceBubbleSort(input: Record<string, unknown>): TraceStep[] {
  const arr = [...(input['arr'] as number[])];
  stepCounter = 0;
  const steps: TraceStep[] = [];
  const n = arr.length;
  const totalPasses = n - 1;

  for (let i = 0; i < totalPasses; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const callId = nextId();
      steps.push({ type: 'COMPARE', indices: [j, j + 1], array: [...arr], depth: 0, callId, pass: i, sortAlgorithm: 'BubbleSort' });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ type: 'SWAP', indices: [j, j + 1], array: [...arr], depth: 0, callId, pass: i, sortAlgorithm: 'BubbleSort' });
      }
    }
  }
  return steps;
}

// ── Selection Sort ────────────────────────────────────────────

export function traceSelectionSort(input: Record<string, unknown>): TraceStep[] {
  const arr = [...(input['arr'] as number[])];
  stepCounter = 0;
  const steps: TraceStep[] = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      const callId = nextId();
      steps.push({ type: 'COMPARE', indices: [minIdx, j], array: [...arr], depth: 0, callId, pass: i, sortAlgorithm: 'SelectionSort' });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      const callId = nextId();
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ type: 'SWAP', indices: [i, minIdx], array: [...arr], depth: 0, callId, pass: i, sortAlgorithm: 'SelectionSort' });
    }
  }
  return steps;
}

// ── Insertion Sort ────────────────────────────────────────────

export function traceInsertionSort(input: Record<string, unknown>): TraceStep[] {
  const arr = [...(input['arr'] as number[])];
  stepCounter = 0;
  const steps: TraceStep[] = [];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      const callId = nextId();
      steps.push({ type: 'COMPARE', indices: [j - 1, j], array: [...arr], depth: 0, callId, pass: i - 1, sortAlgorithm: 'InsertionSort' });
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        steps.push({ type: 'SWAP', indices: [j - 1, j], array: [...arr], depth: 0, callId, pass: i - 1, sortAlgorithm: 'InsertionSort' });
        j--;
      } else {
        break;
      }
    }
  }
  return steps;
}
