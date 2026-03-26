import type { AlgorithmMeta, TraceStep, CSharpLineMap } from '../engine/types';
import { traceFactorial, tracePower, traceFibonacci, traceSumArray, traceMaxItem } from '../engine/traces/recursion';
import { traceBubbleSort, traceSelectionSort, traceInsertionSort } from '../engine/traces/sorting';
import { csharpSources } from '../engine/csharp-source';
import type { CustomFunctionEntry } from '../store/AppContext';
import type { ParsedFunction } from '../engine/csharp-parser';
import { generateCustomTrace } from '../engine/custom-trace';

export const algorithms: AlgorithmMeta[] = [
  // ── Recursion ──
  {
    id: 'factorial',
    displayName: 'Factorial',
    category: 'recursion',
    difficulty: 'easy',
    csharpSignature: 'int Factorial(int n)',
    csharpCode: csharpSources.factorial.code,
    csharpLineMap: csharpSources.factorial.lineMap,
    description: 'Classic linear recursion. Computes n × (n-1) × ... × 1.',
    defaultInput: { n: 4 },
    inputSchema: [{ name: 'n', type: 'int', min: 1, max: 20, defaultValue: 4 }],
    traceFunction: traceFactorial,
    level: 1,
  },
  {
    id: 'power',
    displayName: 'Power',
    category: 'recursion',
    difficulty: 'easy',
    csharpSignature: 'int Power(int base, int exp)',
    csharpCode: csharpSources.power.code,
    csharpLineMap: csharpSources.power.lineMap,
    description: 'Raises base to the power of exp using recursion.',
    defaultInput: { base: 2, exp: 4 },
    inputSchema: [
      { name: 'base', type: 'int', min: 1, max: 20, defaultValue: 2 },
      { name: 'exp', type: 'int', min: 0, max: 15, defaultValue: 4 },
    ],
    traceFunction: tracePower,
    level: 1,
  },
  {
    id: 'fibonacci',
    displayName: 'Fibonacci',
    category: 'recursion',
    difficulty: 'medium',
    csharpSignature: 'int Fibonacci(int n)',
    csharpCode: csharpSources.fibonacci.code,
    csharpLineMap: csharpSources.fibonacci.lineMap,
    description: 'Computes the nth Fibonacci number using branching recursion — two recursive calls!',
    defaultInput: { n: 5 },
    inputSchema: [{ name: 'n', type: 'int', min: 0, max: 15, defaultValue: 5 }],
    traceFunction: traceFibonacci,
    level: 2,
  },
  {
    id: 'sumArray',
    displayName: 'Sum Array',
    category: 'recursion',
    difficulty: 'medium',
    csharpSignature: 'int SumArray(int[] arr, int i)',
    csharpCode: csharpSources.sumArray.code,
    csharpLineMap: csharpSources.sumArray.lineMap,
    description: 'Sums all elements of an integer array recursively.',
    defaultInput: { arr: [3, 1, 4, 1, 5] },
    inputSchema: [{ name: 'arr', type: 'int[]', isArray: true, defaultValue: [3, 1, 4, 1, 5] }],
    traceFunction: traceSumArray,
    level: 3,
  },
  {
    id: 'maxItem',
    displayName: 'Max Item',
    category: 'recursion',
    difficulty: 'medium',
    csharpSignature: 'int MaxItem(int[] arr, int i)',
    csharpCode: csharpSources.maxItem.code,
    csharpLineMap: csharpSources.maxItem.lineMap,
    description: 'Finds the maximum element in an integer array using recursion.',
    defaultInput: { arr: [3, 9, 2, 7, 4] },
    inputSchema: [{ name: 'arr', type: 'int[]', isArray: true, defaultValue: [3, 9, 2, 7, 4] }],
    traceFunction: traceMaxItem,
    level: 3,
  },
  // ── Sorting ──
  {
    id: 'bubbleSort',
    displayName: 'Bubble Sort',
    category: 'sorting',
    difficulty: 'easy',
    csharpSignature: 'void BubbleSort(int[] arr)',
    csharpCode: csharpSources.bubbleSort.code,
    csharpLineMap: csharpSources.bubbleSort.lineMap,
    description: 'Repeatedly compares adjacent elements and swaps them if out of order.',
    defaultInput: { arr: [5, 3, 8, 1, 9, 2] },
    inputSchema: [{ name: 'arr', type: 'int[]', isArray: true, defaultValue: [5, 3, 8, 1, 9, 2] }],
    traceFunction: traceBubbleSort,
    level: 4,
  },
  {
    id: 'selectionSort',
    displayName: 'Selection Sort',
    category: 'sorting',
    difficulty: 'medium',
    csharpSignature: 'void SelectionSort(int[] arr)',
    csharpCode: csharpSources.selectionSort.code,
    csharpLineMap: csharpSources.selectionSort.lineMap,
    description: 'Finds the minimum element repeatedly and places it at the front.',
    defaultInput: { arr: [64, 25, 12, 22, 11] },
    inputSchema: [{ name: 'arr', type: 'int[]', isArray: true, defaultValue: [64, 25, 12, 22, 11] }],
    traceFunction: traceSelectionSort,
    level: 4,
  },
  {
    id: 'insertionSort',
    displayName: 'Insertion Sort',
    category: 'sorting',
    difficulty: 'medium',
    csharpSignature: 'void InsertionSort(int[] arr)',
    csharpCode: csharpSources.insertionSort.code,
    csharpLineMap: csharpSources.insertionSort.lineMap,
    description: 'Builds the sorted array one element at a time by inserting each element in its correct position.',
    defaultInput: { arr: [9, 5, 2, 7, 1] },
    inputSchema: [{ name: 'arr', type: 'int[]', isArray: true, defaultValue: [9, 5, 2, 7, 1] }],
    traceFunction: traceInsertionSort,
    level: 4,
  },
];

export function getAlgorithmById(id: string, customFns?: CustomFunctionEntry[]): AlgorithmMeta | undefined {
  const builtIn = algorithms.find(a => a.id === id);
  if (builtIn) return builtIn;
  if (customFns) {
    const custom = customFns.find(f => f.id === id);
    if (custom) return customEntryToMeta(custom);
  }
  return undefined;
}

export function getAlgorithmsByCategory(category: 'recursion' | 'sorting', customFns?: CustomFunctionEntry[]): AlgorithmMeta[] {
  const builtIn = algorithms.filter(a => a.category === category);
  if (category !== 'recursion' || !customFns) return builtIn;
  // Custom functions are always recursion category
  return builtIn;
}

export function getCustomAlgorithms(customFns: CustomFunctionEntry[]): AlgorithmMeta[] {
  return customFns.map(customEntryToMeta);
}

/**
 * Build a smart CSharpLineMap for a custom function by scanning its source lines.
 * - CALL      → signature line (line 0)
 * - BASE_CASE → `if` line(s) + the `return` immediately following the base-case condition
 * - RETURN    → the recursive `return` line (contains the function name)
 */
function buildCustomLineMap(code: string, fnName: string): CSharpLineMap {
  const lines = code.split('\n');

  // Collect base-case line indices: lines containing `if (` and adjacent return lines
  const baseCaseLines: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (/\bif\s*\(/.test(trimmed)) {
      baseCaseLines.push(i);
      // Look ahead up to 3 lines for the matching return (handles inline or next-line)
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        const next = lines[j].trim();
        if (/\breturn\b/.test(next)) {
          baseCaseLines.push(j);
          break;
        }
        if (next === '' || next === '{' || next === '}') continue;
        break;
      }
    }
  }

  // Collect recursive return line indices: `return` lines that mention the fn name
  const recursiveReturnLines: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (/\breturn\b/.test(trimmed) && trimmed.includes(fnName + '(')) {
      recursiveReturnLines.push(i);
    }
  }

  return {
    getLines(step: TraceStep): number[] {
      switch (step.type) {
        case 'CALL':      return [0];
        case 'BASE_CASE': return baseCaseLines.length > 0 ? baseCaseLines : [0];
        case 'RETURN':    return recursiveReturnLines.length > 0 ? recursiveReturnLines : [0];
        default:          return [];
      }
    },
  };
}

/** Convert a stored custom function entry into a full AlgorithmMeta */
function customEntryToMeta(entry: CustomFunctionEntry): AlgorithmMeta {
  const parsed: ParsedFunction = JSON.parse(entry.parsedJson);

  const lineMap = buildCustomLineMap(entry.csharpCode, parsed.name);

  // Re-derive inputSchema from params at runtime — never trust the stored schema,
  // which may carry stale min/max values from an older parser version.
  const inputSchema = parsed.params.map(p => ({
    name: p.name,
    type: (p.type === 'int' || p.type === 'long' ? 'int' : 'double') as 'int' | 'double',
    defaultValue: 1,
  }));

  return {
    id: entry.id,
    displayName: entry.displayName,
    category: 'recursion',
    difficulty: 'medium',
    csharpSignature: entry.csharpSignature,
    csharpCode: entry.csharpCode,
    csharpLineMap: lineMap,
    description: `Your custom recursive function: ${entry.displayName}`,
    defaultInput: buildDefaultInput(parsed),
    inputSchema,
    traceFunction: (input: Record<string, unknown>) => {
      const result = generateCustomTrace(parsed, input);
      if (result.ok) return result.trace;
      // If trace generation fails, return a single error-indicating step
      console.error('[RecursiQuest] Custom trace generation failed for', parsed.name, ':', result.error);
      return [{
        type: 'CALL' as const,
        fnName: parsed.name,
        params: { ...input, _error: result.error },
        depth: 0,
        callId: 'error-1',
        parentCallId: null,
      }];
    },
    level: 1,
  };
}

function buildDefaultInput(parsed: ParsedFunction): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const p of parsed.params) {
    result[p.name] = p.type === 'int' || p.type === 'long' ? 4 : 4.0;
  }
  return result;
}
