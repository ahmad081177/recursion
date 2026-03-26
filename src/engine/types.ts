// ============================================================
// Core domain types for RecursiQuest
// ============================================================

// --- Trace Steps ---

export interface CallStep {
  type: 'CALL';
  fnName: string;
  params: Record<string, unknown>;
  depth: number;
  callId: string;
  parentCallId: string | null;
}

export interface ReturnStep {
  type: 'RETURN';
  fnName: string;
  params: Record<string, unknown>;
  returnValue: unknown;
  depth: number;
  callId: string;
}

export interface BaseCaseStep {
  type: 'BASE_CASE';
  fnName: string;
  params: Record<string, unknown>;
  returnValue: unknown;
  depth: number;
  callId: string;
}

export interface CompareStep {
  type: 'COMPARE';
  indices: [number, number];
  array: number[];
  depth: number;
  callId: string;
  /** Outer-loop pass number (0-based) */
  pass?: number;
  /** Algorithm name for context-aware tips */
  sortAlgorithm?: string;
}

export interface SwapStep {
  type: 'SWAP';
  indices: [number, number];
  array: number[];
  depth: number;
  callId: string;
  /** Outer-loop pass number (0-based) */
  pass?: number;
  /** Algorithm name for context-aware tips */
  sortAlgorithm?: string;
}

export type TraceStep = CallStep | ReturnStep | BaseCaseStep | CompareStep | SwapStep;

// --- Algorithm Metadata ---

export interface InputParam {
  name: string;
  type: 'int' | 'double' | 'bool' | 'string' | 'int[]' | 'string[]';
  min?: number;
  max?: number;
  isArray?: boolean;
  defaultValue?: unknown;
}

export interface CSharpLineMap {
  /** Given a TraceStep, return 0-based line indices to highlight */
  getLines: (step: TraceStep) => number[];
}

export interface AlgorithmMeta {
  id: string;
  displayName: string;
  category: 'recursion' | 'sorting';
  difficulty: 'easy' | 'medium' | 'hard';
  csharpSignature: string;
  csharpCode: string;
  csharpLineMap: CSharpLineMap;
  description: string;
  defaultInput: Record<string, unknown>;
  inputSchema: InputParam[];
  traceFunction: (input: Record<string, unknown>) => TraceStep[];
  level: number;
}

// --- Quiz ---

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

// --- Achievement ---

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockCondition: string;
}

// --- Visualization State ---

export type AppMode = 'learn' | 'quiz';

export interface QuizState {
  options: QuizOption[];
  answered: boolean;
  selectedIndex: number | null;
  xp: number;
  combo: number;
}

export interface VisualizationState {
  algorithm: AlgorithmMeta;
  input: Record<string, unknown>;
  trace: TraceStep[];
  stepIndex: number;
  isPlaying: boolean;
  speed: number;
  mode: AppMode;
  quizState: QuizState | null;
}

export type Speed = 0.25 | 0.5 | 1 | 2 | 4;

export type VisualizationAction =
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'RESET' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SET_SPEED'; speed: Speed }
  | { type: 'JUMP_TO_STEP'; index: number }
  | { type: 'SET_MODE'; mode: AppMode }
  | { type: 'QUIZ_ANSWER'; answerIndex: number };
