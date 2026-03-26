import type { TraceStep, CallStep, ReturnStep, BaseCaseStep, CompareStep, SwapStep } from './types';

function formatParams(params: Record<string, unknown>): string {
  return Object.entries(params)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}=[${v.join(', ')}]`;
      return `${k}=${v}`;
    })
    .join(', ');
}

function narrate(step: CallStep): string {
  const p = formatParams(step.params);
  return `Calling ${step.fnName}(${p}) — going deeper (depth ${step.depth}).`;
}

function narrateReturn(step: ReturnStep): string {
  const p = formatParams(step.params);
  return `${step.fnName}(${p}) returns ${step.returnValue} back to its caller.`;
}

function narrateBaseCase(step: BaseCaseStep): string {
  const p = formatParams(step.params);
  return `Base case reached! ${step.fnName}(${p}) returns ${step.returnValue} directly — no more recursion needed here.`;
}

function narrateCompare(step: CompareStep): string {
  const [i, j] = step.indices;
  const a = step.array[i], b = step.array[j];
  const cmp = a > b ? `${a} > ${b} → swap needed!` : `${a} ≤ ${b} → already in order.`;
  return `Comparing index [${i}] (${a}) with index [${j}] (${b}). ${cmp}`;
}

function narrateSwap(step: SwapStep): string {
  const [i, j] = step.indices;
  return `Swapped positions [${i}] and [${j}]. The array is now [${step.array.join(', ')}].`;
}

// ── Rich per-algorithm narrations ─────────────────────────────

const customNarrations: Record<string, Partial<Record<TraceStep['type'], (step: TraceStep) => string>>> = {
  Fibonacci: {
    CALL: (s) => {
      const cs = s as CallStep;
      const n = cs.params['n'] as number;
      if (n <= 1) return `Calling Fibonacci(${n}) — this is a base case value, so we'll get the answer directly!`;
      return `Calling Fibonacci(${n}) — we need Fibonacci(${n - 1}) + Fibonacci(${n - 2}) to compute this. The tree branches here!`;
    },
    BASE_CASE: (s) => {
      const bs = s as BaseCaseStep;
      const n = bs.params['n'] as number;
      return `Base case! Fibonacci(${n}) = ${bs.returnValue}. By definition, F(0)=0 and F(1)=1. This value now travels back up the tree.`;
    },
    RETURN: (s) => {
      const rs = s as ReturnStep;
      const n = rs.params['n'] as number;
      return `Fibonacci(${n}) = ${rs.returnValue}. This was computed by adding Fibonacci(${n - 1}) + Fibonacci(${n - 2}). The result now returns to the caller above.`;
    },
  },
  Factorial: {
    CALL: (s) => {
      const cs = s as CallStep;
      const n = cs.params['n'] as number;
      if (n <= 1) return `Calling Factorial(${n}) — this is the base case! We know ${n}! = 1.`;
      return `Calling Factorial(${n}) — we need ${n} × Factorial(${n - 1}). Stacking another frame on the call stack!`;
    },
    BASE_CASE: (s) => {
      const bs = s as BaseCaseStep;
      const n = bs.params['n'] as number;
      return `Base case! Factorial(${n}) = 1. This is the bottom of the recursion — now the returns start "unwinding" back up.`;
    },
    RETURN: (s) => {
      const rs = s as ReturnStep;
      const n = rs.params['n'] as number;
      return `Factorial(${n}) = ${rs.returnValue}. Computed as ${n} × ${(rs.returnValue as number) / n} = ${rs.returnValue}. Passing the result back to the caller.`;
    },
  },
  Power: {
    CALL: (s) => {
      const cs = s as CallStep;
      const base = cs.params['base'] as number;
      const exp = cs.params['exp'] as number;
      if (exp === 0) return `Calling Power(${base}, ${exp}) — anything to the 0th power is 1! Base case.`;
      return `Calling Power(${base}, ${exp}) — we need ${base} × Power(${base}, ${exp - 1}). Reducing the exponent by 1 each time.`;
    },
    BASE_CASE: (s) => {
      const bs = s as BaseCaseStep;
      const base = bs.params['base'] as number;
      return `Base case! Power(${base}, 0) = 1. Any number raised to the power of 0 equals 1. The "unwinding" begins now!`;
    },
    RETURN: (s) => {
      const rs = s as ReturnStep;
      const base = rs.params['base'] as number;
      const exp = rs.params['exp'] as number;
      const prev = (rs.returnValue as number) / base;
      return `Power(${base}, ${exp}) = ${rs.returnValue}. Computed as ${base} × ${prev} = ${rs.returnValue}. One step closer to the final answer!`;
    },
  },
  SumArray: {
    CALL: (s) => {
      const cs = s as CallStep;
      const arr = cs.params['arr'] as number[];
      const i = cs.params['i'] as number;
      if (i >= arr.length) return `Calling SumArray at index ${i} — past the end of the array! This is our base case.`;
      return `Calling SumArray at index ${i} — current element is ${arr[i]}. We'll add it to the sum of everything after it.`;
    },
    BASE_CASE: (s) => {
      const bs = s as BaseCaseStep;
      const i = bs.params['i'] as number;
      return `Base case! Index ${i} is beyond the array. Sum of nothing = 0. Now the adding starts on the way back up!`;
    },
    RETURN: (s) => {
      const rs = s as ReturnStep;
      const arr = rs.params['arr'] as number[];
      const i = rs.params['i'] as number;
      return `SumArray from index ${i} returns ${rs.returnValue}. This means arr[${i}] (${arr[i]}) + sum of rest = ${rs.returnValue}.`;
    },
  },
  MaxItem: {
    CALL: (s) => {
      const cs = s as CallStep;
      const arr = cs.params['arr'] as number[];
      const i = cs.params['i'] as number;
      if (i === arr.length - 1) return `Calling MaxItem at index ${i} — the last element (${arr[i]}). This is the base case!`;
      return `Calling MaxItem at index ${i} — current element is ${arr[i]}. Is it larger than the max of the remaining elements?`;
    },
    BASE_CASE: (s) => {
      const bs = s as BaseCaseStep;
      const arr = bs.params['arr'] as number[];
      const i = bs.params['i'] as number;
      return `Base case! Only element ${arr[i]} left at index ${i}. The max of one element is itself. Returning ${arr[i]} up the stack.`;
    },
    RETURN: (s) => {
      const rs = s as ReturnStep;
      const arr = rs.params['arr'] as number[];
      const i = rs.params['i'] as number;
      const restMax = (rs.returnValue as number);
      return `MaxItem from index ${i} returns ${restMax}. Compared arr[${i}]=${arr[i]} with the max of the rest → winner is ${restMax}.`;
    },
  },
};

// ── Sorting-specific narrations ───────────────────────────────

const sortNarrations: Record<string, Partial<Record<'COMPARE' | 'SWAP', (step: TraceStep) => string>>> = {
  BubbleSort: {
    COMPARE: (s) => {
      const cs = s as CompareStep;
      const [i, j] = cs.indices;
      const a = cs.array[i], b = cs.array[j];
      const passInfo = cs.pass !== undefined ? ` (Pass ${cs.pass + 1})` : '';
      if (a > b) return `${passInfo} Comparing [${i}]=${a} with [${j}]=${b}. Since ${a} > ${b}, they need to swap — the bigger value "bubbles" right! 🫧`;
      return `${passInfo} Comparing [${i}]=${a} with [${j}]=${b}. ${a} ≤ ${b}, so they're already in order. No swap needed. ✓`;
    },
    SWAP: (s) => {
      const sw = s as SwapStep;
      const passInfo = sw.pass !== undefined ? `Pass ${sw.pass + 1}: ` : '';
      return `${passInfo}Swapped! Array is now [${sw.array.join(', ')}]. The larger value bubbled one position to the right. 🫧`;
    },
  },
  SelectionSort: {
    COMPARE: (s) => {
      const cs = s as CompareStep;
      const [minI, j] = cs.indices;
      const a = cs.array[minI], b = cs.array[j];
      const passInfo = cs.pass !== undefined ? ` (Pass ${cs.pass + 1})` : '';
      if (b < a) return `${passInfo} Is [${j}]=${b} < current min [${minI}]=${a}? YES! 🎯 New minimum found: ${b}.`;
      return `${passInfo} Is [${j}]=${b} < current min [${minI}]=${a}? No, ${b} ≥ ${a}. Keeping current minimum.`;
    },
    SWAP: (s) => {
      const sw = s as SwapStep;
      const [i] = sw.indices;
      const passInfo = sw.pass !== undefined ? `Pass ${sw.pass + 1}: ` : '';
      return `${passInfo}Placing minimum value ${sw.array[i]} at position [${i}]. The first ${i + 1} element(s) are now sorted! 🎯`;
    },
  },
  InsertionSort: {
    COMPARE: (s) => {
      const cs = s as CompareStep;
      const [left, right] = cs.indices;
      const a = cs.array[left], b = cs.array[right];
      const passInfo = cs.pass !== undefined ? ` (Inserting element #${cs.pass + 2})` : '';
      if (a > b) return `${passInfo} [${left}]=${a} > [${right}]=${b}. Need to shift ${a} right to make room for ${b}. 🃏`;
      return `${passInfo} [${left}]=${a} ≤ [${right}]=${b}. Found the insertion point! ${b} stays at position [${right}]. ✓`;
    },
    SWAP: (s) => {
      const sw = s as SwapStep;
      const passInfo = sw.pass !== undefined ? `Inserting element #${sw.pass + 2}: ` : '';
      return `${passInfo}Shifted! Array is now [${sw.array.join(', ')}]. Making room in the sorted portion. 🃏`;
    },
  },
};

export function generateNarration(step: TraceStep): string {
  // Check sorting-specific narration
  if ((step.type === 'COMPARE' || step.type === 'SWAP') && step.sortAlgorithm) {
    const custom = sortNarrations[step.sortAlgorithm]?.[step.type];
    if (custom) return custom(step);
  }

  // Check recursion-specific narration
  const custom = ('fnName' in step && step.fnName)
    ? customNarrations[step.fnName]?.[step.type]
    : undefined;

  if (custom) return custom(step);

  switch (step.type) {
    case 'CALL':      return narrate(step);
    case 'RETURN':    return narrateReturn(step);
    case 'BASE_CASE': return narrateBaseCase(step);
    case 'COMPARE':   return narrateCompare(step);
    case 'SWAP':      return narrateSwap(step);
  }
}

// ── Rich per-algorithm expanded narrations ────────────────────

const expandedRecursion: Record<string, Partial<Record<TraceStep['type'], (step: TraceStep) => string>>> = {
  Fibonacci: {
    CALL: (s) => {
      const n = (s as CallStep).params['n'] as number;
      if (n > 2) return `💡 Fibonacci creates a TREE of calls — Fib(${n}) calls both Fib(${n - 1}) and Fib(${n - 2}). This means many sub-problems get computed more than once! This is why Fibonacci is O(2ⁿ) without memoization.`;
      return `💡 F(0)=0 and F(1)=1 are defined by the sequence. All other values are computed by adding the two preceding values.`;
    },
    RETURN: () =>
      `💡 Notice how each return value is the SUM of the two values that came back from the sub-calls. This is the "combine" step in the divide-and-conquer pattern.`,
    BASE_CASE: () =>
      `💡 Base cases stop the recursion. Without them, Fibonacci would call itself infinitely and crash (Stack Overflow!). F(0)=0 and F(1)=1 are the two anchors.`,
  },
  Factorial: {
    CALL: (s) => {
      const n = (s as CallStep).params['n'] as number;
      return `💡 Factorial uses "linear recursion" — each call makes exactly ONE recursive call. Think of it as building a chain: ${n}! = ${n} × ${n - 1} × ... × 1. The stack grows to depth ${n}.`;
    },
    RETURN: () =>
      `💡 On the way back up, each frame MULTIPLIES its value by the result from below. This "unwinding" phase is where the actual multiplication happens.`,
    BASE_CASE: () =>
      `💡 The base case 1! = 1 (or 0! = 1) is the mathematical foundation. Without this stopping condition, the function would never return!`,
  },
  Power: {
    CALL: (s) => {
      const { base, exp } = (s as CallStep).params as { base: number; exp: number };
      return `💡 Power(${base}, ${exp}) = ${base} × Power(${base}, ${exp - 1}). Each call reduces the exponent by 1. There's a faster version using "exponentiation by squaring" that's O(log n)!`;
    },
    RETURN: () =>
      `💡 Each return multiplies the base by the accumulated power from below. The stack is exactly "exp" frames deep.`,
    BASE_CASE: () =>
      `💡 Any number to the power 0 is 1 — this is the mathematical identity. It's the perfect stopping condition!`,
  },
  SumArray: {
    CALL: () =>
      `💡 SumArray walks through the array one index at a time. Each call handles ONE element and trusts recursion to sum the rest. This is the "trust the recursion" principle!`,
    RETURN: () =>
      `💡 On the way back, each frame adds its element to the sum returned from below. The total builds up frame by frame.`,
    BASE_CASE: () =>
      `💡 When the index goes past the array end, there's nothing left to add. The sum of zero elements is 0 — the identity for addition.`,
  },
  MaxItem: {
    CALL: () =>
      `💡 MaxItem compares each element against the maximum of the remaining elements. Think of it as a "tournament" — each element challenges the best of the rest!`,
    RETURN: () =>
      `💡 The return value is the WINNER of the comparison: max(current element, max of rest). The champion propagates all the way back up.`,
    BASE_CASE: () =>
      `💡 With only one element left, it's automatically the maximum. No comparison needed — it wins by default!`,
  },
};

const expandedSorting: Record<string, Partial<Record<'COMPARE' | 'SWAP', (step: TraceStep) => string>>> = {
  BubbleSort: {
    COMPARE: (s) => {
      const cs = s as CompareStep;
      const pass = cs.pass ?? 0;
      const sortedCount = pass;
      return `💡 Bubble Sort always compares ADJACENT elements. After Pass ${pass + 1}, the ${sortedCount + 1} largest element(s) will be in their final positions at the right end. Time complexity: O(n²) — each pass does ~n comparisons.`;
    },
    SWAP: () =>
      `💡 The "bubble" effect: larger values migrate rightward step by step, like bubbles rising in water. Each swap moves a big element one position closer to its final spot.`,
  },
  SelectionSort: {
    COMPARE: (s) => {
      const cs = s as CompareStep;
      const pass = cs.pass ?? 0;
      return `💡 Selection Sort scans the unsorted portion to find the minimum. Pass ${pass + 1}: searching positions [${pass}..${cs.array.length - 1}] for the smallest value. Time complexity: O(n²), but it does at most n swaps!`;
    },
    SWAP: (s) => {
      const sw = s as SwapStep;
      const pass = sw.pass ?? 0;
      return `💡 Selection Sort does exactly ONE swap per pass — placing the minimum at position [${pass}]. It's efficient on swap-costly systems because it minimizes the number of writes.`;
    },
  },
  InsertionSort: {
    COMPARE: (s) => {
      const cs = s as CompareStep;
      const pass = cs.pass ?? 0;
      return `💡 Insertion Sort keeps the left portion sorted at all times. Now inserting element #${pass + 2} into its correct position. Best case (already sorted): O(n). Worst case (reversed): O(n²). Great for small or nearly-sorted data!`;
    },
    SWAP: () =>
      `💡 Each swap "shifts" a larger element one position right, making room for the element being inserted. Think of it like inserting a card into a sorted hand of cards 🃏.`,
  },
};

export function generateExpandedNarration(step: TraceStep): string {
  // Sorting-specific expanded
  if ((step.type === 'COMPARE' || step.type === 'SWAP') && step.sortAlgorithm) {
    const custom = expandedSorting[step.sortAlgorithm]?.[step.type];
    if (custom) return custom(step);
  }

  // Recursion-specific expanded
  if ('fnName' in step && step.fnName) {
    const custom = expandedRecursion[step.fnName]?.[step.type];
    if (custom) return custom(step);
  }

  // Generic fallback
  switch (step.type) {
    case 'CALL':
      return `A new stack frame is pushed onto the call stack. This function will run until it hits a base case or returns a result. Each call has its own copy of the parameters.`;
    case 'BASE_CASE':
      return `This is what stops the recursion! Without a base case, the function would call itself forever and cause a stack overflow. The base case returns a known value directly.`;
    case 'RETURN':
      return `The function has finished its work. The return value flows back up to the function that called it, where it will be used in a calculation.`;
    case 'COMPARE':
      return `The algorithm is checking whether these two elements are in the right order. This comparison determines whether a swap is needed.`;
    case 'SWAP':
      return `These two elements are out of order, so they're being swapped. After many such swaps, the array will be fully sorted.`;
  }
}
