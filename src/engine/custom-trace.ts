/**
 * Generic trace generator for user-provided C# recursive functions.
 *
 * Transpiles a simple C# function body into a safe JS evaluator,
 * then executes it to produce TraceStep[] for the visualizer.
 *
 * Supports:
 * - int parameters
 * - if/else base case with return
 * - Single or double recursive calls (e.g. Fibonacci pattern)
 * - Arithmetic expressions: +, -, *, /, %
 * - Comparison operators: <, >, <=, >=, ==, !=
 * - Ternary: condition ? a : b
 */

import type { TraceStep } from './types';
import type { ParsedFunction } from './csharp-parser';

const MAX_DEPTH = 200;
const MAX_STEPS = 2000;

export type TraceGenResult =
  | { ok: true; trace: TraceStep[] }
  | { ok: false; error: string };

/**
 * Transpile C# function body to a JavaScript function string.
 * This is NOT general-purpose — it handles the school-level patterns:
 *   if (cond) return expr;
 *   return expr;
 */
function transpileBody(source: string, integerDivision: boolean): string | { error: string } {
  // Extract body between first { and last }
  const bodyMatch = source.match(/\{([\s\S]*)\}\s*$/);
  if (!bodyMatch) return { error: 'Could not extract function body.' };

  let body = bodyMatch[1].trim();

  // Strip C# comments so they don't interfere with transformations
  body = body.replace(/\/\/.*$/gm, '');
  body = body.replace(/\/\*[\s\S]*?\*\//g, '');

  // Replace C# local variable declarations with JS `let`
  // Handles: int x = ..., long count = ..., bool found = ..., var y = ...
  body = body.replace(/\b(int|long|double|float|bool|var)\s+(?=[A-Za-z_]\w*\s*[=;,])/g, 'let ');

  // Replace C# int casts like (int) with nothing (JS doesn't need them)
  body = body.replace(/\(int\)\s*/g, '');
  body = body.replace(/\(long\)\s*/g, '');
  body = body.replace(/\(double\)\s*/g, '');

  // Replace Math.Max/Min with JS equivalents
  body = body.replace(/Math\.Max/g, 'Math.max');
  body = body.replace(/Math\.Min/g, 'Math.min');
  body = body.replace(/Math\.Abs/g, 'Math.abs');

  // C# integer division: int/int truncates toward zero.
  // JS division always produces a float. Wrap with Math.trunc().
  if (integerDivision) {
    body = body.replace(
      /(\([^)]*\)|[A-Za-z_]\w*|\d+)\s*\/\s*(\([^)]*\)|[A-Za-z_]\w*|\d+)/g,
      'Math.trunc($1/$2)',
    );
  }

  return body;
}

/**
 * Generate a trace by safely evaluating a transpiled C# recursive function.
 */
export function generateCustomTrace(
  parsed: ParsedFunction,
  input: Record<string, unknown>,
): TraceGenResult {
  const fnName = parsed.name;
  const paramNames = parsed.params.map(p => p.name);

  const isAllInteger = parsed.params.every(p => p.type === 'int' || p.type === 'long');
  const bodyResult = transpileBody(parsed.source, isAllInteger);
  if (typeof bodyResult === 'object' && 'error' in bodyResult) {
    return { ok: false, error: bodyResult.error };
  }
  const jsBody = bodyResult;

  const steps: TraceStep[] = [];
  let callCounter = 0;

  function nextId(): string {
    return `custom-${++callCounter}`;
  }

  // Build the recursive function using closure-based tracing
  // We create the function dynamically but in a controlled way
  type RecFn = (...args: number[]) => number;

  function makeTracedFunction(): RecFn {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callStack: string[] = [];

    const tracedFn = (...args: number[]): number => {
      if (steps.length >= MAX_STEPS) {
        throw new Error(`Too many steps (>${MAX_STEPS}). Your function might have infinite recursion or the input is too large.`);
      }

      const depth = callStack.length;
      if (depth >= MAX_DEPTH) {
        throw new Error(`Recursion too deep (>${MAX_DEPTH}). Check your base case — it might not be stopping the recursion.`);
      }

      const callId = nextId();
      const parentCallId = callStack.length > 0 ? callStack[callStack.length - 1] : null;
      callStack.push(callId);

      // Build params object
      const params: Record<string, unknown> = {};
      paramNames.forEach((name, i) => {
        params[name] = args[i];
      });

      steps.push({
        type: 'CALL',
        fnName,
        params: { ...params },
        depth,
        callId,
        parentCallId,
      });

      // We track whether this call makes a recursive sub-call
      let madeRecursiveCall = false;

      // Execute the function body by creating a controlled evaluator
      // The function body can call `fnName(...)` which we intercept
      try {
        // Create a scope object with the parameters and the recursive function reference
        const scope: Record<string, unknown> = { Math };
        paramNames.forEach((name, i) => {
          scope[name] = args[i];
        });
        scope[fnName] = (...callArgs: number[]) => {
          madeRecursiveCall = true;
          return tracedFn(...callArgs);
        };

        // Build the evaluator function
        const scopeKeys = Object.keys(scope);
        const scopeValues = scopeKeys.map(k => scope[k]);

        // Safety: the jsBody comes from our transpiler, but we still wrap it
        // in a function with explicit parameter binding
        const evaluator = new Function(...scopeKeys, jsBody);
        const result = evaluator(...scopeValues);

        const returnValue = typeof result === 'number' ? result : Number(result);

        if (isNaN(returnValue)) {
          throw new Error(`Function returned NaN. Check your arithmetic and base case.`);
        }

        callStack.pop();

        // Determine if this was a base case (no recursive calls made from this frame)
        if (!madeRecursiveCall) {
          // Replace the CALL step logic: this was actually a base case
          steps.push({
            type: 'BASE_CASE',
            fnName,
            params: { ...params },
            returnValue,
            depth,
            callId,
          });
        } else {
          steps.push({
            type: 'RETURN',
            fnName,
            params: { ...params },
            returnValue,
            depth,
            callId,
          });
        }

        return returnValue;
      } catch (e) {
        callStack.pop();
        if (e instanceof Error && (e.message.includes('Too many steps') || e.message.includes('Recursion too deep') || e.message.includes('returned NaN'))) {
          throw e;
        }
        throw new Error(`Error running your function: ${e instanceof Error ? e.message : String(e)}`);
      }
    };

    return tracedFn;
  }

  try {
    const fn = makeTracedFunction();

    // Build argument list from input
    const args = paramNames.map(name => {
      const val = input[name];
      return typeof val === 'number' ? val : Number(val);
    });

    fn(...args);

    return { ok: true, trace: steps };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
