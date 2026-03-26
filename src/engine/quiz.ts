import type { TraceStep, QuizOption } from './types';
import { generateNarration } from './narration';

export function generateQuizOptions(trace: TraceStep[], stepIndex: number): QuizOption[] {
  if (stepIndex >= trace.length - 1) return [];

  const nextStep = trace[stepIndex + 1];
  const correctNarration = generateNarration(nextStep);

  const correct: QuizOption = {
    text: describeStep(nextStep),
    isCorrect: true,
    explanation: correctNarration,
  };

  const distractors = generateDistractors(trace, stepIndex, nextStep);

  // Shuffle so correct isn't always first
  const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
  return options;
}

function describeStep(step: TraceStep): string {
  switch (step.type) {
    case 'CALL': {
      const p = Object.entries(step.params)
        .map(([k, v]) => `${k}=${Array.isArray(v) ? `[${(v as unknown[]).join(',')}]` : v}`)
        .join(', ');
      return `Call ${step.fnName}(${p})`;
    }
    case 'RETURN':
      return `${step.fnName} returns ${step.returnValue}`;
    case 'BASE_CASE':
      return `Base case: ${step.fnName} returns ${step.returnValue}`;
    case 'COMPARE':
      return `Compare elements at index ${step.indices[0]} and ${step.indices[1]}`;
    case 'SWAP':
      return `Swap elements at index ${step.indices[0]} and ${step.indices[1]}`;
  }
}

function generateDistractors(trace: TraceStep[], stepIndex: number, nextStep: TraceStep): QuizOption[] {
  const distractors: QuizOption[] = [];

  // Distractor 1: describe an incorrect outcome for the same step type
  if (nextStep.type === 'CALL') {
    const callStep = nextStep;
    const wrongN = typeof callStep.params['n'] === 'number' ? callStep.params['n'] + 1 : null;
    if (wrongN !== null) {
      distractors.push({
        text: `Call ${callStep.fnName}(n=${wrongN})`,
        isCorrect: false,
        explanation: `Incorrect — the parameter should decrease, not increase at this point.`,
      });
    }
  }

  if (nextStep.type === 'RETURN' || nextStep.type === 'BASE_CASE') {
    const wrongVal = typeof nextStep.returnValue === 'number' ? nextStep.returnValue + 1 : 0;
    distractors.push({
      text: `${nextStep.fnName} returns ${wrongVal}`,
      isCorrect: false,
      explanation: `Close! But the actual return value is ${nextStep.returnValue}, not ${wrongVal}.`,
    });
  }

  // Distractor 2: pick a step of a different type
  const diffTypes: Array<TraceStep['type']> = ['CALL', 'RETURN', 'BASE_CASE'];
  const altType = diffTypes.find(t => t !== nextStep.type) ?? 'RETURN';

  if (altType === 'RETURN' && 'fnName' in nextStep) {
    distractors.push({
      text: `${nextStep.fnName} returns immediately (base case)`,
      isCorrect: false,
      explanation: `Not yet — the base case hasn't been reached. The function still needs to recurse deeper.`,
    });
  } else if (altType === 'CALL' && 'fnName' in nextStep) {
    const prevCall = trace.slice(0, stepIndex).reverse().find(s => s.type === 'CALL');
    if (prevCall && 'fnName' in prevCall) {
      distractors.push({
        text: `Return to the previous call of ${prevCall.fnName}`,
        isCorrect: false,
        explanation: `Not yet — we're still going deeper, not returning yet.`,
      });
    }
  }

  // Ensure we always return exactly 2 distractors
  while (distractors.length < 2) {
    distractors.push({
      text: `Nothing — execution is complete`,
      isCorrect: false,
      explanation: `The algorithm isn't done yet — there are still steps remaining.`,
    });
  }

  return distractors.slice(0, 2);
}
