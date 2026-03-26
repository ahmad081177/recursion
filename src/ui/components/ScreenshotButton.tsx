interface Props {
  onClick: () => void;
  isCapturing: boolean;
  justCaptured: boolean;
}

export function ScreenshotButton({ onClick, isCapturing, justCaptured }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isCapturing}
      className="text-secondary hover:text-primary transition-colors p-1 rounded-md hover:bg-elevated disabled:opacity-50"
      aria-label="Take screenshot"
      title="Save as PNG"
    >
      {justCaptured ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : isCapturing ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      )}
    </button>
  );
}
