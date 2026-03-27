import { motion, AnimatePresence } from 'motion/react';
import { useVisualization } from '../../store/VisualizationContext';
import { useLang } from '../../store/LangContext';

interface QuizPanelProps {
  onExit: () => void;
}

export function QuizPanel({ onExit }: QuizPanelProps) {
  const { state, dispatch } = useVisualization();
  const { t } = useLang();
  const { quizState, trace, stepIndex } = state;

  if (!quizState) return null;

  const { options, answered, selectedIndex, xp, combo } = quizState;
  const currentStep = trace[stepIndex];
  const stepSummary = currentStep ? `${currentStep.type.replace('_', ' ')} — step ${stepIndex + 1} of ${trace.length}` : '';

  function handleAnswer(idx: number) {
    if (answered) return;
    dispatch({ type: 'QUIZ_ANSWER', answerIndex: idx });
  }

  function handleNext() {
    dispatch({ type: 'NEXT' });
    // Re-generate quiz for next step
    setTimeout(() => dispatch({ type: 'SET_MODE', mode: 'quiz' }), 50);
  }

  return (
    <div className="rounded-2xl bg-elevated/80 backdrop-blur-sm border border-subtle/50 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">🎯</span>
          <span className="text-sm font-bold text-primary">{t('quiz.header')}</span>
        </div>
        <div className="flex items-center gap-4">
          {combo >= 3 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs font-bold text-orange-400"
            >
              🔥 ×{combo}
            </motion.span>
          )}
              <span className="text-xs font-bold text-purple-400">{t('quiz.xp')} {xp}</span>
          <button onClick={onExit} className="text-xs text-secondary hover:text-blue-400 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-500/10">{t('quiz.exit')}</button>
        </div>
      </div>

      <p className="text-sm text-secondary">{stepSummary}</p>

      {/* Options */}
      <div className="space-y-2.5">
        {options.map((option, idx) => {
          let borderClass = 'border-subtle';
          let bgClass = 'bg-surface';
          let textClass = 'text-primary';

          if (answered) {
            if (option.isCorrect) {
              borderClass = 'border-green-500';
              bgClass = 'bg-green-900/20';
              textClass = 'text-green-300';
            } else if (idx === selectedIndex && !option.isCorrect) {
              borderClass = 'border-red-500';
              bgClass = 'bg-red-900/20';
              textClass = 'text-red-300';
            } else {
              textClass = 'text-secondary';
            }
          }

          return (
            <motion.button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              animate={answered && idx === selectedIndex && !option.isCorrect ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.3 }}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${borderClass} ${bgClass} ${textClass} disabled:cursor-default`}
            >
              <span className="font-mono mr-2 text-secondary text-xs">{String.fromCharCode(65 + idx)})</span>
              {option.text}
              {answered && option.isCorrect && <span className="ml-2 text-green-400">✓</span>}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {options[selectedIndex ?? 0]?.isCorrect ? (
              <div className="text-sm text-green-400 font-semibold">
                ✓ {t('quiz.correct')} {combo >= 5 ? t('quiz.comboBig') : t('quiz.xpGain')}
              </div>
            ) : (
              <div className="text-sm text-red-400">
                ✗ {t('quiz.wrong')} {options.find(o => o.isCorrect)?.explanation}
              </div>
            )}
            <button
              onClick={handleNext}
              className="mt-2 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
            >
              {t('quiz.next')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
