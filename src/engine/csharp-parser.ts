/**
 * Lightweight parser for simple C# recursive functions.
 * Supports: int return type, int parameters, if-based base case, single/double recursive calls.
 *
 * Example inputs:
 *   int Factorial(int n) { if (n <= 1) return 1; return n * Factorial(n - 1); }
 *   int Fibonacci(int n) { if (n <= 1) return n; return Fibonacci(n-1) + Fibonacci(n-2); }
 */

import type { InputParam } from './types';

export interface ParsedFunction {
  name: string;
  params: { name: string; type: string }[];
  /** The full C# source as provided by the user */
  source: string;
  /** Extracted input schema for the UI */
  inputSchema: InputParam[];
  /** C# signature string like "int Factorial(int n)" */
  signature: string;
}

export interface ParseError {
  message: string;
}

export type ParseResult = { ok: true; fn: ParsedFunction } | { ok: false; error: ParseError };

/**
 * Parse a simple C# recursive function string into structured metadata.
 */
export function parseCSharpFunction(code: string): ParseResult {
  // Normalize whitespace
  const src = code.trim();

  // Match signature: returnType FunctionName(params) { body }
  // Supports: int, long, double, float, bool
  const sigRe = /^(int|long|double|float)\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*\{/;
  const sigMatch = src.match(sigRe);

  if (!sigMatch) {
    return {
      ok: false,
      error: {
        message: 'Could not parse function signature. Expected format:\n  int FunctionName(int param1, int param2) { ... }',
      },
    };
  }

  const returnType = sigMatch[1];
  const fnName = sigMatch[2];
  const paramStr = sigMatch[3].trim();

  // Parse parameters
  const params: { name: string; type: string }[] = [];
  if (paramStr.length > 0) {
    const paramParts = paramStr.split(',').map(p => p.trim());
    for (const part of paramParts) {
      const pm = part.match(/^(int|long|double|float)\s+([A-Za-z_]\w*)$/);
      if (!pm) {
        return {
          ok: false,
          error: {
            message: `Could not parse parameter: "${part}". Expected format: int paramName`,
          },
        };
      }
      params.push({ name: pm[2], type: pm[1] });
    }
  }

  if (params.length === 0) {
    return {
      ok: false,
      error: { message: 'Function must have at least one parameter.' },
    };
  }

  if (params.length > 4) {
    return {
      ok: false,
      error: { message: 'Maximum 4 parameters supported for custom functions.' },
    };
  }

  // Validate body has at least one return statement
  const bodyMatch = src.match(/\{([\s\S]*)\}\s*$/);
  if (!bodyMatch) {
    return {
      ok: false,
      error: { message: 'Could not find function body. Make sure the function has matching { }.' },
    };
  }

  const body = bodyMatch[1];

  // Check for a base case pattern (if ... return)
  if (!/\bif\s*\(/.test(body)) {
    return {
      ok: false,
      error: { message: 'No base case found. Your function needs an if (...) return ... statement to stop recursion.' },
    };
  }

  // Check for a recursive call
  const hasRecursiveCall = new RegExp(`\\b${escapeRegex(fnName)}\\s*\\(`).test(body);
  if (!hasRecursiveCall) {
    return {
      ok: false,
      error: { message: `No recursive call to ${fnName}() found in the function body. This tool visualizes recursive functions.` },
    };
  }

  // Build input schema
  const inputSchema: InputParam[] = params.map(p => ({
    name: p.name,
    type: p.type === 'int' || p.type === 'long' ? 'int' as const : 'double' as const,
    min: 0,
    max: 20,
    defaultValue: 4,
  }));

  const signature = `${returnType} ${fnName}(${params.map(p => `${p.type} ${p.name}`).join(', ')})`;

  return {
    ok: true,
    fn: {
      name: fnName,
      params,
      source: src,
      inputSchema,
      signature,
    },
  };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
