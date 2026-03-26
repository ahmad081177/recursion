import type { TraceStep, CSharpLineMap } from './types';

// ── Recursion algorithms ──────────────────────────────────────

export const factorialCode = `int Factorial(int n)
{
  if (n <= 1)
    return 1;

  return n * Factorial(n - 1);
}`;

export const factorialLineMap: CSharpLineMap = {
  getLines(step: TraceStep): number[] {
    switch (step.type) {
      case 'CALL':       return [0];
      case 'BASE_CASE':  return [2, 3];
      case 'RETURN':     return [5];
      default:           return [];
    }
  },
};

export const powerCode = `int Power(int baseVal, int exp)
{
  if (exp == 0)
    return 1;

  return baseVal * Power(baseVal, exp - 1);
}`;

export const powerLineMap: CSharpLineMap = {
  getLines(step: TraceStep): number[] {
    switch (step.type) {
      case 'CALL':       return [0];
      case 'BASE_CASE':  return [2, 3];
      case 'RETURN':     return [5];
      default:           return [];
    }
  },
};

export const fibonacciCode = `int Fibonacci(int n)
{
  if (n <= 1)
    return n;

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}`;

export const fibonacciLineMap: CSharpLineMap = {
  getLines(step: TraceStep): number[] {
    switch (step.type) {
      case 'CALL':       return [0];
      case 'BASE_CASE':  return [2, 3];
      case 'RETURN':     return [5];
      default:           return [];
    }
  },
};

export const sumArrayCode = `int SumArray(int[] arr, int i)
{
  if (i >= arr.Length)
    return 0;

  return arr[i] + SumArray(arr, i + 1);
}`;

export const sumArrayLineMap: CSharpLineMap = {
  getLines(step: TraceStep): number[] {
    switch (step.type) {
      case 'CALL':       return [0];
      case 'BASE_CASE':  return [2, 3];
      case 'RETURN':     return [5];
      default:           return [];
    }
  },
};

export const maxItemCode = `int MaxItem(int[] arr, int i)
{
  if (i == arr.Length - 1)
    return arr[i];

  int restMax = MaxItem(arr, i + 1);
  return arr[i] > restMax ? arr[i] : restMax;
}`;

export const maxItemLineMap: CSharpLineMap = {
  getLines(step: TraceStep): number[] {
    switch (step.type) {
      case 'CALL':       return [0];
      case 'BASE_CASE':  return [2, 3];
      case 'RETURN':     return [5, 6];
      default:           return [];
    }
  },
};

// ── Sorting algorithms ────────────────────────────────────────

export const bubbleSortCode = `void BubbleSort(int[] arr)
{
  for (int i = 0; i < arr.Length - 1; i++)
  {
    for (int j = 0; j < arr.Length - i - 1; j++)
    {
      if (arr[j] > arr[j + 1])
      {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`;

export const bubbleSortLineMap: CSharpLineMap = {
  getLines(step: TraceStep): number[] {
    switch (step.type) {
      case 'COMPARE': return [6];
      case 'SWAP':    return [8, 9, 10];
      default:        return [];
    }
  },
};

export const selectionSortCode = `void SelectionSort(int[] arr)
{
  for (int i = 0; i < arr.Length - 1; i++)
  {
    int minIdx = i;
    for (int j = i + 1; j < arr.Length; j++)
    {
      if (arr[j] < arr[minIdx])
        minIdx = j;
    }
    int temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
}`;

export const selectionSortLineMap: CSharpLineMap = {
  getLines(step: TraceStep): number[] {
    switch (step.type) {
      case 'COMPARE': return [7, 8];
      case 'SWAP':    return [10, 11, 12];
      default:        return [];
    }
  },
};

export const insertionSortCode = `void InsertionSort(int[] arr)
{
  for (int i = 1; i < arr.Length; i++)
  {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key)
    {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`;

export const insertionSortLineMap: CSharpLineMap = {
  getLines(step: TraceStep): number[] {
    switch (step.type) {
      case 'COMPARE': return [6];
      case 'SWAP':    return [8, 9];
      default:        return [];
    }
  },
};

// ── Lookup maps ───────────────────────────────────────────────

export const csharpSources: Record<string, { code: string; lineMap: CSharpLineMap }> = {
  factorial:      { code: factorialCode,      lineMap: factorialLineMap },
  power:          { code: powerCode,          lineMap: powerLineMap },
  fibonacci:      { code: fibonacciCode,      lineMap: fibonacciLineMap },
  sumArray:       { code: sumArrayCode,       lineMap: sumArrayLineMap },
  maxItem:        { code: maxItemCode,        lineMap: maxItemLineMap },
  bubbleSort:     { code: bubbleSortCode,     lineMap: bubbleSortLineMap },
  selectionSort:  { code: selectionSortCode,  lineMap: selectionSortLineMap },
  insertionSort:  { code: insertionSortCode,  lineMap: insertionSortLineMap },
};
