import { useParams, useSearchParams, useNavigate } from 'react-router';
import { getAlgorithmById } from '../../algorithms/registry';
import { VisualizationProvider, useVisualization } from '../../store/VisualizationContext';
import { CallStackPanel } from '../components/CallStackPanel';
import { ArrayVisualizer } from '../components/ArrayVisualizer';
import { NarrationPanel } from '../components/NarrationPanel';
import { QuizPanel } from '../components/QuizPanel';
import { ControlBar } from '../components/ControlBar';
import { AchievementToast } from '../components/AchievementToast';
import { RecursionTreePanel } from '../components/RecursionTreePanel';
import { ResizableColumns } from '../components/ResizableColumns';
import { CodePanel } from '../components/CodePanel';
import { AlgorithmInsight } from '../components/AlgorithmInsight';
import { useApp } from '../../store/AppContext';
import { useEffect } from 'react';
import { useLang } from '../../store/LangContext';
import type { Lang } from '../../store/LangContext';

const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'ar', label: 'عر' },
  { value: 'he', label: 'עב' },
];

function VisualizationContent() {
  const { state, dispatch } = useVisualization();
  const { unlockAchievement, recentAchievement, clearRecentAchievement } = useApp();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();

  // Achievement detection
  useEffect(() => {
    const step = state.trace[state.stepIndex];
    if (!step) return;
    if (step.type === 'BASE_CASE') unlockAchievement('first-base-case');
    if (state.stepIndex === state.trace.length - 1) {
      if (state.algorithm.id === 'fibonacci') unlockAchievement('fibonacci-conqueror');
      if (state.algorithm.category === 'sorting') unlockAchievement('sort-master');
    }
    if (state.quizState?.combo && state.quizState.combo >= 5) unlockAchievement('combo-5');
  }, [state.stepIndex, state.trace, state.algorithm, state.quizState, unlockAchievement]);

  function handleCopyLink() {
    const url = new URL(window.location.href);
    url.searchParams.set('step', String(state.stepIndex));
    navigator.clipboard.writeText(url.toString()).then(() => {
      // Could show a toast here
    });
  }

  const isInQuizMode = state.mode === 'quiz';
  const isSorting = state.algorithm.category === 'sorting';

  // Detect error trace: custom function failed to generate a trace
  const errorStep = state.trace.length === 1 && state.trace[0].type === 'CALL' && state.trace[0].callId === 'error-1'
    ? state.trace[0]
    : null;
  const traceError = errorStep ? ((errorStep.params as Record<string, unknown>)._error as string | undefined) : null;

  return (
    <div className="min-h-screen bg-base flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3.5 border-b border-subtle/50 bg-surface/80 backdrop-blur-md">
        <button
          onClick={() => navigate('/')}
          className="text-secondary hover:text-primary text-sm font-medium transition-colors flex items-center gap-1.5"
          aria-label="Back to home"
        >
          <span className="text-lg">←</span> {t('nav.home')}
        </button>
        <div className="text-center">
          <span className="font-mono text-sm font-semibold text-primary">{state.algorithm.csharpSignature}</span>
        </div>
        <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="flex gap-1">
              {LANG_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setLang(opt.value)}
                  className="h-8 px-2.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: lang === opt.value ? '#7c3aed' : 'var(--elevated, #1e1e2e)',
                    color: lang === opt.value ? '#fff' : 'var(--secondary)',
                    border: `1px solid ${lang === opt.value ? '#7c3aed' : 'rgba(255,255,255,0.08)'}`,
                  }}
                  aria-pressed={lang === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          <button
            onClick={() => dispatch({ type: 'SET_MODE', mode: isInQuizMode ? 'learn' : 'quiz' })}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              isInQuizMode
                ? 'bg-yellow-600/90 text-white shadow-sm shadow-yellow-600/20'
                : 'bg-elevated border border-subtle/60 text-secondary hover:text-primary hover:border-blue-500/40'
            }`}
            aria-label={isInQuizMode ? 'Exit quiz mode' : 'Enter quiz mode'}
          >
            {isInQuizMode ? t('nav.learnMode') : t('nav.quizMode')}
          </button>
        </div>
      </header>

      {/* Error banner for custom function trace failures */}
      {traceError && (
        <div className="mx-5 mt-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
          <span className="font-semibold">{t('viz.traceError')}</span> {traceError}
        </div>
      )}

      {/* Main content */}
      {isSorting ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Scrollable array + status + code content */}
          <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
            <div className="max-w-3xl mx-auto flex flex-col gap-5">
              <ArrayVisualizer />
              <CodePanel />
            </div>
          </div>
          {/* Pinned bottom: play controls */}
          <div className="shrink-0 border-t border-subtle/30 px-5 py-4 bg-surface/80 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto">
              <ControlBar onCopyLink={handleCopyLink} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top row: 3 columns */}
          <div className="flex-1 flex overflow-hidden">
            {/* Col 1 (~18%): Algorithm Insight + Play Controls — fixed, narrower */}
            <div className="w-[18%] min-w-[160px] shrink-0 flex flex-col gap-3 p-4 border-r border-subtle/30 overflow-y-auto">
              <AlgorithmInsight />
              <ControlBar onCopyLink={handleCopyLink} />
            </div>

            {/* Col 2 + Col 3: Call Stack | Recursion Tree — resizable drag handle */}
            <ResizableColumns
              left={<CallStackPanel />}
              right={<RecursionTreePanel />}
              defaultLeftPercent={38}
              minPx={180}
            />
          </div>

          {/* Bottom row: C# Code + Narration side-by-side */}
          <div className="flex shrink-0 border-t border-subtle/30">
            {/* C# Code */}
            <div className="w-1/2 p-4 border-r border-subtle/30">
              <CodePanel />
            </div>

            {/* Narration / Quiz */}
            <div className="w-1/2 p-4">
              {isInQuizMode && state.quizState ? (
                <QuizPanel onExit={() => dispatch({ type: 'SET_MODE', mode: 'learn' })} />
              ) : (
                <NarrationPanel />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Achievement toast */}
      <AchievementToast achievement={recentAchievement} onDismiss={clearRecentAchievement} />
    </div>
  );
}

export function VisualizationScreen() {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { customFunctions } = useApp();

  const algorithm = algorithmId ? getAlgorithmById(algorithmId, customFunctions) : undefined;

  if (!algorithm) {
    navigate('/');
    return null;
  }

  const inputParam = searchParams.get('input');
  const input = inputParam ? JSON.parse(inputParam) as Record<string, unknown> : algorithm.defaultInput;
  const startStep = parseInt(searchParams.get('step') ?? '0', 10);

  return (
    <VisualizationProvider key={algorithmId} algorithm={algorithm} input={input} startStep={startStep}>
      <VisualizationContent />
    </VisualizationProvider>
  );
}
