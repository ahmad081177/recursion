import { motion, AnimatePresence } from 'motion/react';
import { useVisualization } from '../../store/VisualizationContext';
import { generateNarration, generateExpandedNarration } from '../../engine/narration';
import { useState } from 'react';
import { useLang } from '../../store/LangContext';

export function NarrationPanel() {
  const { state } = useVisualization();
  const { t } = useLang();
  const [expanded, setExpanded] = useState(true);
  const currentStep = state.trace[state.stepIndex];

  if (!currentStep) return null;

  const narration = generateNarration(currentStep, t);
  const expanded_text = generateExpandedNarration(currentStep, t);

  const stepTypeColors: Record<string, string> = {
    CALL: 'text-blue-400',
    RETURN: 'text-green-400',
    BASE_CASE: 'text-yellow-400',
    COMPARE: 'text-purple-400',
    SWAP: 'text-orange-400',
  };
  const stepTypeBg: Record<string, string> = {
    CALL: 'bg-blue-500/10',
    RETURN: 'bg-green-500/10',
    BASE_CASE: 'bg-yellow-500/10',
    COMPARE: 'bg-purple-500/10',
    SWAP: 'bg-orange-500/10',
  };
  const typeColor = stepTypeColors[currentStep.type] ?? 'text-primary';
  const typeBg = stepTypeBg[currentStep.type] ?? '';

  return (
    <div className="rounded-2xl bg-elevated/80 backdrop-blur-sm border border-subtle/50 p-5" aria-live="polite">
      <div className="flex items-start gap-4">
        <span className="text-2xl flex-shrink-0 mt-0.5">💬</span>
        <div className="flex-1">
          <div className="flex items-center gap-2.5 mb-2">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${typeColor} ${typeBg}`}>
              {currentStep.type.replace('_', ' ')}
            </span>
            <span className="w-1 h-1 rounded-full bg-secondary/40" />
            <span className="text-xs text-secondary">
              {t('narr.step', { n: state.stepIndex + 1, total: state.trace.length })}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={state.stepIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-primary leading-relaxed tracking-wide"
            >
              {narration}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-subtle/30"
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`exp-${state.stepIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-secondary/90 leading-relaxed"
                  >
                    {expanded_text}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-secondary hover:text-blue-400 transition-colors flex-shrink-0 font-medium px-2 py-1 rounded-lg hover:bg-blue-500/10"
          aria-label={expanded ? t('narr.hideInsight') : t('narr.showInsight')}
        >
          {expanded ? t('narr.less') : t('narr.more')}
        </button>
      </div>
    </div>
  );
}
