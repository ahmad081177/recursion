import { useVisualization } from '../../store/VisualizationContext';
import type { Speed } from '../../engine/types';
import { useEffect, useRef } from 'react';

const SPEEDS: Speed[] = [0.25, 0.5, 1, 2, 4];
const BASE_STEP_MS = 700;

interface ControlBarProps {
  onCopyLink?: () => void;
}

export function ControlBar({ onCopyLink }: ControlBarProps) {
  const { state, dispatch } = useVisualization();
  const { stepIndex, trace, isPlaying, speed } = state;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const atStart = stepIndex === 0;
  const atEnd = stepIndex >= trace.length - 1;
  const progress = trace.length > 1 ? stepIndex / (trace.length - 1) : 0;

  // Auto-play
  useEffect(() => {
    if (isPlaying && !atEnd) {
      const ms = BASE_STEP_MS / speed;
      timerRef.current = setTimeout(() => dispatch({ type: 'NEXT' }), ms);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, stepIndex, speed, atEnd, dispatch]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') dispatch({ type: 'NEXT' });
      else if (e.key === 'ArrowLeft') dispatch({ type: 'BACK' });
      else if (e.key === ' ') { e.preventDefault(); dispatch({ type: isPlaying ? 'PAUSE' : 'PLAY' }); }
      else if (e.key === 'r' || e.key === 'R') dispatch({ type: 'RESET' });
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlaying, dispatch]);

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const targetStep = Math.round(ratio * (trace.length - 1));
    dispatch({ type: 'JUMP_TO_STEP', index: targetStep });
  }

  return (
    <div className="rounded-2xl bg-surface/80 backdrop-blur-sm border border-subtle/50 p-4 space-y-3.5">
      {/* Progress bar + step counter */}
      <div className="space-y-1.5">
        <div
          className="w-full h-2 bg-elevated rounded-full cursor-pointer overflow-hidden"
          onClick={handleProgressClick}
          role="slider"
          aria-label="Playback progress"
          aria-valuenow={stepIndex}
          aria-valuemin={0}
          aria-valuemax={trace.length - 1}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-secondary font-mono">Step {stepIndex + 1} / {trace.length}</span>
          <div className="flex items-center gap-1.5">
            {onCopyLink && (
              <button
                onClick={onCopyLink}
                className="text-[11px] text-secondary hover:text-primary transition-colors px-1.5 py-0.5 rounded-lg hover:bg-elevated"
                aria-label="Copy link to this step"
                title="Copy link"
              >
                🔗
              </button>
            )}
            <select
              value={speed}
              onChange={e => dispatch({ type: 'SET_SPEED', speed: parseFloat(e.target.value) as Speed })}
              className="text-[11px] bg-elevated border border-subtle/60 rounded-lg px-1.5 py-0.5 text-primary cursor-pointer focus:outline-none focus:border-blue-500/50"
              aria-label="Animation speed"
            >
              {SPEEDS.map(s => (
                <option key={s} value={s}>{s}×</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transport controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Reset to start */}
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="w-8 h-8 rounded-full bg-elevated text-secondary flex items-center justify-center hover:bg-subtle hover:text-primary transition-all text-sm"
          aria-label="Reset to beginning"
          title="Reset (R)"
        >
          ⏮
        </button>

        {/* Back */}
        <button
          onClick={() => dispatch({ type: 'BACK' })}
          disabled={atStart}
          className="w-9 h-9 rounded-full bg-elevated text-primary flex items-center justify-center disabled:opacity-25 hover:bg-subtle transition-all text-sm"
          aria-label="Previous step"
          title="Previous step (←)"
        >
          ◀
        </button>

        {/* Play / Pause — hero button */}
        <button
          onClick={() => dispatch({ type: isPlaying ? 'PAUSE' : 'PLAY' })}
          disabled={atEnd}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center disabled:opacity-30 hover:from-blue-500 hover:to-blue-400 transition-all shadow-md shadow-blue-600/30 text-base"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title="Play / Pause (Space)"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        {/* Next */}
        <button
          onClick={() => dispatch({ type: 'NEXT' })}
          disabled={atEnd}
          className="w-9 h-9 rounded-full bg-elevated text-primary flex items-center justify-center disabled:opacity-25 hover:bg-subtle transition-all text-sm"
          aria-label="Next step"
          title="Next step (→)"
        >
          ▶▶
        </button>

        {/* Skip to end */}
        <button
          onClick={() => dispatch({ type: 'JUMP_TO_STEP', index: trace.length - 1 })}
          disabled={atEnd}
          className="w-8 h-8 rounded-full bg-elevated text-secondary flex items-center justify-center disabled:opacity-25 hover:bg-subtle hover:text-primary transition-all text-sm"
          aria-label="Skip to end"
          title="Skip to end"
        >
          ⏭
        </button>
      </div>
    </div>
  );
}
