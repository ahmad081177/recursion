import { useState, useRef, useCallback, useEffect } from 'react';

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultLeftPercent?: number;
  minPx?: number;
}

export function ResizableColumns({ left, right, defaultLeftPercent = 60, minPx = 200 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftPercent, setLeftPercent] = useState(defaultLeftPercent);
  const isDragging = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerWidth = rect.width;
    const x = e.clientX - rect.left;

    const minPercent = (minPx / containerWidth) * 100;
    const maxPercent = 100 - minPercent;
    const pct = Math.min(maxPercent, Math.max(minPercent, (x / containerWidth) * 100));
    setLeftPercent(pct);
  }, [minPx]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // Safety: clean up cursor if component unmounts mid-drag
  useEffect(() => {
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-1 flex overflow-hidden">
      {/* Left panel */}
      <div
        className="overflow-y-auto p-1"
        style={{ width: `${leftPercent}%`, minWidth: `${minPx}px` }}
      >
        {left}
      </div>

      {/* Drag handle */}
      <div
        className="hidden lg:flex flex-col items-center justify-center w-3 flex-shrink-0 cursor-col-resize group"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="w-0.5 h-full rounded-full bg-subtle group-hover:bg-secondary transition-colors" />
      </div>

      {/* Right panel */}
      <div
        className="overflow-hidden rounded-xl bg-surface border border-subtle p-3"
        style={{ width: `${100 - leftPercent}%`, minWidth: `${minPx}px` }}
      >
        {right}
      </div>
    </div>
  );
}
