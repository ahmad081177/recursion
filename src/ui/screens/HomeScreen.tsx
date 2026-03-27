import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { getAlgorithmsByCategory, getCustomAlgorithms } from '../../algorithms/registry';
import type { AlgorithmMeta, InputParam } from '../../engine/types';
import { useApp } from '../../store/AppContext';
import type { CustomFunctionEntry } from '../../store/AppContext';
import { AddFunctionDialog } from '../components/AddFunctionDialog';
import { useLang } from '../../store/LangContext';
import type { Lang } from '../../store/LangContext';
import type { TranslationKey } from '../../locales/en';

const ALG_CARD_DESC_KEYS: Partial<Record<string, TranslationKey>> = {
  factorial:     'alg.factorial.cardDesc',
  power:         'alg.power.cardDesc',
  fibonacci:     'alg.fibonacci.cardDesc',
  sumArray:      'alg.sumArray.cardDesc',
  maxItem:       'alg.maxItem.cardDesc',
  bubbleSort:    'alg.bubbleSort.cardDesc',
  selectionSort: 'alg.selectionSort.cardDesc',
  insertionSort: 'alg.insertionSort.cardDesc',
};

const difficultyConfig = {
  easy:   { gradient: 'from-green-500/20 to-green-600/5', text: '#34d399', border: '#34d399', icon: '🟢' },
  medium: { gradient: 'from-yellow-500/20 to-yellow-600/5', text: '#fbbf24', border: '#fbbf24', icon: '🟡' },
  hard:   { gradient: 'from-red-500/20 to-red-600/5', text: '#f87171', border: '#f87171', icon: '🔴' },
};

const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'ar', label: 'عر' },
  { value: 'he', label: 'עב' },
];

const algorithmIcons: Record<string, string> = {
  factorial: '🔢', power: '⚡', fibonacci: '🐚', sumArray: '➕', maxItem: '👑',
  bubbleSort: '🫧', selectionSort: '🎯', insertionSort: '🃏',
};

/* ── Scene configuration per category ── */
const sceneConfig = {
  recursion: {
    label: '🌀 Recursion',
    accent: '#7c5dfa',
    accentLight: '#a78bfa',
    gradient: 'from-violet-600/8 via-purple-600/4 to-transparent',
    glow: 'rgba(124, 93, 250, 0.06)',
    glowLight: 'rgba(124, 93, 250, 0.03)',
    tabGradient: 'from-violet-600 to-purple-500',
    cardAccent: 'rgba(124, 93, 250, 0.15)',
  },
  sorting: {
    label: '↕️ Sorting',
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    gradient: 'from-amber-600/8 via-orange-600/4 to-transparent',
    glow: 'rgba(245, 158, 11, 0.06)',
    glowLight: 'rgba(245, 158, 11, 0.03)',
    tabGradient: 'from-amber-500 to-orange-500',
    cardAccent: 'rgba(245, 158, 11, 0.15)',
  },
  'my-functions': {
    label: '✨ My Functions',
    accent: '#14b8a6',
    accentLight: '#2dd4bf',
    gradient: 'from-teal-600/8 via-emerald-600/4 to-transparent',
    glow: 'rgba(20, 184, 166, 0.06)',
    glowLight: 'rgba(20, 184, 166, 0.03)',
    tabGradient: 'from-teal-500 to-emerald-500',
    cardAccent: 'rgba(20, 184, 166, 0.15)',
  },
} as const;

const categories = ['recursion', 'sorting', 'my-functions'] as const;
type Category = typeof categories[number];

const heroSnippets = [
  'Factorial(4) → 4 × 3 × 2 × 1 = 24',
  'Fibonacci(6) → 1, 1, 2, 3, 5, 8',
  'BubbleSort([5,3,1]) → [1,3,5]',
  'Power(2, 8) → 256',
];

function useTypingAnimation(texts: string[], speed = 60, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);

  useEffect(() => {
    const text = texts[textIdx];
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (!deleting) {
        setDisplay(text.slice(0, charIdx + 1));
        charIdx++;
        if (charIdx >= text.length) {
          timer = setTimeout(() => { deleting = true; tick(); }, pause);
          return;
        }
        timer = setTimeout(tick, speed);
      } else {
        setDisplay(text.slice(0, charIdx));
        charIdx--;
        if (charIdx < 0) {
          setTextIdx((textIdx + 1) % texts.length);
          return;
        }
        timer = setTimeout(tick, speed / 2);
      }
    }
    tick();
    return () => clearTimeout(timer);
  }, [textIdx, texts, speed, pause]);

  return display;
}

export function HomeScreen() {
  const navigate = useNavigate();
  const { theme, toggleTheme, customFunctions, removeCustomFunction, exportFunctions, importFunctions } = useApp();
  const { lang, setLang, t } = useLang();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const [selected, setSelected] = useState<AlgorithmMeta | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState<Category>('recursion');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingFn, setEditingFn] = useState<CustomFunctionEntry | null>(null);
  const typedText = useTypingAnimation(heroSnippets);

  const scene = sceneConfig[activeCategory];

  const categoryAlgos = activeCategory === 'my-functions'
    ? getCustomAlgorithms(customFunctions)
    : getAlgorithmsByCategory(activeCategory);

  function selectAlgorithm(alg: AlgorithmMeta) {
    setSelected(alg);
    const defaults: Record<string, string> = {};
    alg.inputSchema.forEach((p: InputParam) => {
      defaults[p.name] = Array.isArray(p.defaultValue)
        ? (p.defaultValue as number[]).join(', ')
        : String(p.defaultValue ?? '');
    });
    setInputValues(defaults);
  }

  function handleRun() {
    if (!selected) return;
    const input: Record<string, unknown> = {};
    selected.inputSchema.forEach((p: InputParam) => {
      const raw = inputValues[p.name] ?? '';
      if (p.isArray) {
        input[p.name] = raw.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
      } else {
        let val = p.type === 'double' ? parseFloat(raw) : parseInt(raw, 10);
        if (!isNaN(val)) {
          if (p.min !== undefined) val = Math.max(p.min, val);
          if (p.max !== undefined) val = Math.min(p.max, val);
        }
        input[p.name] = isNaN(val) ? (p.defaultValue ?? 0) : val;
      }
    });
    const params = new URLSearchParams({ input: JSON.stringify(input) });
    navigate(`/visualize/${selected.id}?${params}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-5 sm:px-8 lg:px-12 py-10 relative overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: 'var(--app-bg)' }}
    >
      {/* ── Subtle background gradient (shifts per category) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[200px] animate-scene-glow"
            style={{ background: scene.glow }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Theme toggle (top-right) ── */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors duration-200"
        style={{
          backgroundColor: 'var(--app-surface)',
          border: '1px solid var(--app-border)',
          color: 'var(--app-secondary)',
          boxShadow: 'var(--app-card-shadow)',
        }}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </motion.button>

      {/* ── Language toggle (top-right, beside theme) ── */}
      <div className="absolute top-6 z-50 flex gap-1" style={{ right: '4rem' }}>
        {LANG_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => setLang(opt.value)}
            className="h-10 px-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              backgroundColor: lang === opt.value ? 'var(--app-accent, #7c5dfa)' : 'var(--app-surface)',
              color: lang === opt.value ? '#fff' : 'var(--app-secondary)',
              border: `1px solid ${lang === opt.value ? 'var(--app-accent, #7c5dfa)' : 'var(--app-border)'}`,
              boxShadow: 'var(--app-card-shadow)',
            }}
            aria-pressed={lang === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Hero section ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="text-center mb-8 relative z-10 max-w-xl"
      >
        {/* Icon + Title + Subtitle — single compact row */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl sm:text-5xl shrink-0"
          >
            🔁
          </motion.div>
          <div className="text-left">
            <h1 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight leading-tight" style={{ color: 'var(--app-text)' }}>
              <span style={{ color: 'var(--app-accent, #7c5dfa)' }}>Recursi</span><span style={{ color: 'var(--app-accent-light, #a78bfa)' }}>Quest</span>
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--app-secondary)' }}>
              {t('home.subtitle')} <span className="font-medium" style={{ color: 'var(--app-text)' }}>{t('home.subtitleBold')}</span>
            </p>
          </div>
        </div>

        {/* Typing banner */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{
            backgroundColor: 'var(--app-surface)',
            border: '1px solid var(--app-border)',
            boxShadow: 'var(--app-card-shadow)',
          }}
        >
          <span className="text-xs font-mono" style={{ color: 'var(--app-accent, #7c5dfa)' }}>{'>'}</span>
          <span className="font-mono text-sm min-w-[220px] sm:min-w-[260px] text-left" style={{ color: 'var(--app-text)', opacity: 0.75 }}>{typedText}</span>
          <span className="w-0.5 h-4 animate-blink shrink-0" style={{ backgroundColor: 'var(--app-accent, #7c5dfa)' }} />
        </div>
      </motion.div>

      {/* ── Category Tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex mb-10 relative z-10 w-full max-w-5xl"
        style={{ borderBottom: '2px solid var(--app-border)', margin: '10px' }}
      >
        {categories.map(cat => {
          const catScene = sceneConfig[cat];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSelected(null); }}
              className="relative px-6 sm:px-8 py-3 text-sm font-medium transition-all duration-200"
              style={{
                color: isActive ? catScene.accent : 'var(--app-secondary)',
                backgroundColor: isActive ? `${catScene.accent}0d` : 'transparent',
              }}
            >
              <span className="flex items-center gap-2">
                {cat === 'recursion' ? t('tab.recursion') : cat === 'sorting' ? t('tab.sorting') : t('tab.myFunctions')}
                {cat === 'my-functions' && customFunctions.length > 0 && (
                  <span
                    className="text-[10px] rounded-full px-1.5 py-0.5 font-bold"
                    style={{ backgroundColor: `${catScene.accent}22`, color: catScene.accent }}
                  >
                    {customFunctions.length}
                  </span>
                )}
              </span>
              {isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-[-2px] left-0 right-0 h-0.5 rounded-t-full"
                  style={{ backgroundColor: catScene.accent }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* ── Algorithm Cards ── */}
      <div className="w-full max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 relative z-10">
        <AnimatePresence mode="popLayout">
          {categoryAlgos.map((alg, i) => {
            const diff = difficultyConfig[alg.difficulty];
            const isSelected = selected?.id === alg.id;
            const icon = algorithmIcons[alg.id] ?? '✨';
            const isCustom = alg.id.startsWith('custom-');
            return (
              <motion.div
                key={alg.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 24 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectAlgorithm(alg)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectAlgorithm(alg); }}
                  className="w-full group text-left rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer"
                  style={{
                    background: 'var(--app-surface)',
                    border: isSelected
                      ? `2px solid ${scene.accent}`
                      : '1px solid var(--app-border)',
                    boxShadow: isSelected
                      ? `var(--app-card-shadow-hover), 0 0 0 1px ${scene.accent}20`
                      : 'var(--app-card-shadow)',
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="h-0.5 w-full"
                    style={{
                      background: isCustom
                        ? `linear-gradient(to right, ${sceneConfig['my-functions'].accent}, transparent)`
                        : `linear-gradient(to right, ${scene.accent}, transparent)`,
                      opacity: isSelected ? 1 : 0.5,
                    }}
                  />

                  <div className="p-6">
                    {/* Icon + Name row */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <span
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                        style={{
                          backgroundColor: `${scene.accent}10`,
                          border: `1px solid ${scene.accent}18`,
                        }}
                      >
                        {icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-[15px] transition-colors truncate" style={{ color: 'var(--app-text)' }}>
                            {alg.displayName}
                          </span>
                          {isCustom ? (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider shrink-0"
                              style={{
                                backgroundColor: `${sceneConfig['my-functions'].accent}12`,
                                color: sceneConfig['my-functions'].accent,
                                border: `1px solid ${sceneConfig['my-functions'].accent}25`,
                              }}
                            >
                              Custom
                            </span>
                          ) : (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider shrink-0"
                              style={{ backgroundColor: `${diff.border}12`, color: diff.text, border: `1px solid ${diff.border}25` }}
                            >
                              {t(`difficulty.${alg.difficulty}` as 'difficulty.easy' | 'difficulty.medium' | 'difficulty.hard')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Signature */}
                    <p className="font-mono text-xs mb-3 truncate" style={{ color: scene.accent, opacity: 0.7 }}>{alg.csharpSignature}</p>

                    {/* Description */}
                    <p className="text-sm leading-relaxed line-clamp-2 mb-5" style={{ color: 'var(--app-secondary)' }}>{t(ALG_CARD_DESC_KEYS[alg.id] ?? 'alg.custom.cardDesc', { name: alg.displayName })}</p>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--app-border)' }}>
                      {isCustom ? (
                        <span className="text-xs font-mono" style={{ color: 'var(--app-secondary)', opacity: 0.6 }}>recursion</span>
                      ) : (
                        <div className="flex gap-1.5">
                          {[1, 2, 3].map(d => (
                            <div
                              key={d}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor: d <= (alg.difficulty === 'easy' ? 1 : alg.difficulty === 'medium' ? 2 : 3)
                                  ? diff.border
                                  : 'var(--app-border)',
                              }}
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {isCustom && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const entry = customFunctions.find(f => f.id === alg.id);
                                if (entry) setEditingFn(entry);
                              }}
                              className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors text-[11px]"
                              style={{
                                backgroundColor: 'rgba(59,130,246,0.08)',
                                color: '#60a5fa',
                                border: '1px solid rgba(59,130,246,0.15)',
                              }}
                              title="Edit function"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); removeCustomFunction(alg.id); if (selected?.id === alg.id) setSelected(null); }}
                              className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors text-[11px]"
                              style={{
                                backgroundColor: 'rgba(239,68,68,0.08)',
                                color: '#f87171',
                                border: '1px solid rgba(239,68,68,0.15)',
                              }}
                              title="Delete function"
                            >
                              ✕
                            </button>
                          </>
                        )}
                        <span className="text-xs font-medium transition-colors" style={{ color: isSelected ? scene.accent : 'var(--app-secondary)' }}>
                          {isSelected ? t('card.selected') : t('card.select')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Add Function card — My Functions tab only */}
          {activeCategory === 'my-functions' && (
            <motion.button
              key="add-function"
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ delay: categoryAlgos.length * 0.05, type: 'spring', stiffness: 200, damping: 24 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddDialog(true)}
              className="group text-left rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                background: 'var(--app-surface)',
                border: '1px dashed var(--app-border)',
                boxShadow: 'var(--app-card-shadow)',
              }}
            >
              <div
                className="h-0.5 w-full"
                style={{ background: `linear-gradient(to right, ${sceneConfig['my-functions'].accent}30, transparent)` }}
              />
              <div className="p-6 flex flex-col items-center justify-center gap-3 min-h-[180px]">
                <motion.span
                  className="text-3xl"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  ➕
                </motion.span>
                <span className="text-sm font-semibold" style={{ color: 'var(--app-text)', opacity: 0.7 }}>
                  {t('card.addFn')}
                </span>
                <span className="text-xs" style={{ color: 'var(--app-secondary)' }}>{t('card.addFnSub')}</span>
              </div>
            </motion.button>
          )}

          {/* Empty state */}
          {activeCategory === 'my-functions' && categoryAlgos.length === 0 && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-sm" style={{ color: 'var(--app-secondary)' }}>{t('card.emptyFns')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Export / Import bar (My Functions tab only) ── */}
      {activeCategory === 'my-functions' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 relative z-10 mb-6"
        >
          {customFunctions.length > 0 && (
            <button
              onClick={exportFunctions}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium transition-colors"
              style={{
                backgroundColor: 'var(--app-surface)',
                border: '1px solid var(--app-border)',
                color: 'var(--app-secondary)',
                boxShadow: 'var(--app-card-shadow)',
              }}
              title="Download all functions as JSON"
            >
              <span>📥</span> {t('fn.export')}
            </button>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium transition-colors"
            style={{
              backgroundColor: 'var(--app-surface)',
              border: '1px solid var(--app-border)',
              color: 'var(--app-secondary)',
              boxShadow: 'var(--app-card-shadow)',
            }}
            title="Load functions from a JSON file"
          >
            <span>📤</span> {t('fn.import')}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const count = await importFunctions(file);
                setImportMsg(count > 0 ? `✅ Imported ${count} function${count > 1 ? 's' : ''}!` : '⚠️ No new functions to import (all duplicates).');
              } catch {
                setImportMsg('❌ Invalid file format.');
              }
              e.target.value = '';
              setTimeout(() => setImportMsg(null), 4000);
            }}
          />
          {importMsg && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-medium"
              style={{ color: importMsg.startsWith('✅') ? '#34d399' : importMsg.startsWith('⚠️') ? '#fbbf24' : '#f87171' }}
            >
              {importMsg}
            </motion.span>
          )}
        </motion.div>
      )}

      {/* ── Input panel ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            className="w-full max-w-5xl relative z-10"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'var(--app-surface)',
                border: `1px solid var(--app-border)`,
                boxShadow: 'var(--app-card-shadow-hover)',
              }}
            >
              {/* Accent top bar */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${scene.accent}, transparent)` }} />

              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      backgroundColor: `${scene.accent}10`,
                      border: `1px solid ${scene.accent}18`,
                    }}
                  >
                    {algorithmIcons[selected.id] ?? '📦'}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--app-text)' }}>
                      {t('config.title')} {selected.displayName}
                    </h3>
                    <p className="font-mono text-sm" style={{ color: scene.accent, opacity: 0.7 }}>{selected.csharpSignature}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {selected.inputSchema.map((param: InputParam) => (
                    <div key={param.name}>
                      <label className="block text-sm mb-2.5 font-mono" style={{ color: 'var(--app-secondary)' }}>
                        <span style={{ color: 'var(--app-accent, #7c5dfa)' }}>{param.type}</span>{' '}
                        <span style={{ color: 'var(--app-text)', opacity: 0.8 }}>{param.name}</span>
                        {param.min !== undefined && (
                          <span style={{ color: 'var(--app-secondary)', opacity: 0.5 }} className="ml-1">({param.min}–{param.max})</span>
                        )}
                        {param.isArray && <span style={{ color: 'var(--app-secondary)', opacity: 0.5 }} className="ml-1">{t('config.arrayHint')}</span>}
                      </label>
                      <input
                        type={param.isArray ? 'text' : (param.type === 'int' || param.type === 'double') ? 'number' : 'text'}
                        min={!param.isArray && param.min !== undefined ? param.min : undefined}
                        max={!param.isArray && param.max !== undefined ? param.max : undefined}
                        value={inputValues[param.name] ?? ''}
                        onChange={e => setInputValues(v => ({ ...v, [param.name]: e.target.value }))}
                        className="w-full rounded-xl px-4 py-3 text-sm font-mono focus:outline-none transition-all"
                        style={{
                          backgroundColor: 'var(--app-input-bg, var(--app-elevated))',
                          border: '1px solid var(--app-border)',
                          color: 'var(--app-text)',
                        }}
                        placeholder={param.isArray ? '1, 2, 3' : String(param.defaultValue)}
                      />
                    </div>
                  ))}
                </div>
                <motion.button
                  onClick={handleRun}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-base transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${scene.accent}, ${scene.accentLight})`,
                    boxShadow: `0 2px 12px ${scene.accent}20`,
                  }}
                >
                  {t('config.run')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 mb-8 flex items-center gap-2 text-sm relative z-10"
        style={{ color: 'var(--app-secondary)', opacity: 0.4 }}
      >
        <span>{t('home.hint')}</span>
      </motion.div>

      {/* Add/Edit Function Dialog */}
      <AddFunctionDialog
        open={showAddDialog || editingFn !== null}
        onClose={() => { setShowAddDialog(false); setEditingFn(null); }}
        editEntry={editingFn ?? undefined}
      />
    </div>
  );
}
