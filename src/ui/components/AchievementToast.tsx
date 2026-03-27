import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import type { Achievement } from '../../engine/types';
import { useLang } from '../../store/LangContext';

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  const { t } = useLang();
  useEffect(() => {
    if (!achievement) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [achievement, onDismiss]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          onClick={onDismiss}
          className="fixed bottom-6 right-6 z-50 cursor-pointer max-w-xs"
        >
          <div className="flex items-start gap-4 bg-purple-900/80 border border-purple-500/40 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
            <span className="text-3xl flex-shrink-0">{achievement.icon}</span>
            <div>
              <p className="text-xs text-purple-300 font-bold uppercase tracking-widest">{t('achievement.unlocked')}</p>
              <p className="text-base text-white font-bold mt-1">{achievement.title}</p>
              <p className="text-sm text-purple-200/80 mt-1 leading-relaxed">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
