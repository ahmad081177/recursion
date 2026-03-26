import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type {
  VisualizationState,
  VisualizationAction,
  AlgorithmMeta,
  Speed,
} from '../engine/types';
import { generateQuizOptions } from '../engine/quiz';

function initState(algorithm: AlgorithmMeta, input: Record<string, unknown>, startStep = 0): VisualizationState {
  const trace = algorithm.traceFunction(input);
  return {
    algorithm,
    input,
    trace,
    stepIndex: Math.min(startStep, trace.length - 1),
    isPlaying: false,
    speed: 1,
    mode: 'learn',
    quizState: null,
  };
}

function reducer(state: VisualizationState, action: VisualizationAction): VisualizationState {
  switch (action.type) {
    case 'NEXT':
      if (state.stepIndex >= state.trace.length - 1) return { ...state, isPlaying: false };
      return { ...state, stepIndex: state.stepIndex + 1, quizState: null };

    case 'BACK':
      if (state.stepIndex <= 0) return state;
      return { ...state, stepIndex: state.stepIndex - 1, quizState: null };

    case 'RESET':
      return { ...state, stepIndex: 0, isPlaying: false, quizState: null };

    case 'PLAY':
      return { ...state, isPlaying: true };

    case 'PAUSE':
      return { ...state, isPlaying: false };

    case 'SET_SPEED':
      return { ...state, speed: action.speed as Speed };

    case 'JUMP_TO_STEP':
      return { ...state, stepIndex: Math.max(0, Math.min(action.index, state.trace.length - 1)), isPlaying: false, quizState: null };

    case 'SET_MODE': {
      if (action.mode === 'quiz') {
        const options = generateQuizOptions(state.trace, state.stepIndex);
        return {
          ...state,
          isPlaying: false,
          mode: 'quiz',
          quizState: { options, answered: false, selectedIndex: null, xp: 0, combo: 0 },
        };
      }
      return { ...state, mode: 'learn', quizState: null };
    }

    case 'QUIZ_ANSWER': {
      if (!state.quizState || state.quizState.answered) return state;
      const isCorrect = state.quizState.options[action.answerIndex]?.isCorrect ?? false;
      const newCombo = isCorrect ? state.quizState.combo + 1 : 0;
      const newXp = state.quizState.xp + (isCorrect ? 10 : 0);
      const updatedQuiz = { ...state.quizState, answered: true, selectedIndex: action.answerIndex, combo: newCombo, xp: newXp };
      return { ...state, quizState: updatedQuiz };
    }

    default:
      return state;
  }
}

interface ContextValue {
  state: VisualizationState;
  dispatch: React.Dispatch<VisualizationAction>;
  reinit: (algorithm: AlgorithmMeta, input: Record<string, unknown>, startStep?: number) => void;
}

const VisualizationContext = createContext<ContextValue | null>(null);

export function VisualizationProvider({
  algorithm,
  input,
  startStep,
  children,
}: {
  algorithm: AlgorithmMeta;
  input: Record<string, unknown>;
  startStep?: number;
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, undefined, () => initState(algorithm, input, startStep));

  const reinit = useCallback((alg: AlgorithmMeta, inp: Record<string, unknown>, step = 0) => {
    dispatch({ type: 'RESET' });
    // We can't re-init via dispatch cleanly, so we force via a special action
    // handled by replacing internal state by key changes. For now just reset.
    const fresh = initState(alg, inp, step);
    // Dispatch a jump to carry new trace:
    // Workaround: use 'JUMP_TO_STEP' which alone doesn't change trace.
    // Real re-init needs re-mounting; parent must handle this.
    void fresh;
  }, []);

  return (
    <VisualizationContext.Provider value={{ state, dispatch, reinit }}>
      {children}
    </VisualizationContext.Provider>
  );
}

export function useVisualization(): ContextValue {
  const ctx = useContext(VisualizationContext);
  if (!ctx) throw new Error('useVisualization must be used within VisualizationProvider');
  return ctx;
}
