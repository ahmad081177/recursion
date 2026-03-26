import { useRef, useState, useCallback } from 'react';
import { toBlob } from 'html-to-image';

interface UseScreenshotOptions {
  filename: string;
  backgroundColor?: string;
}

export function useScreenshot({ filename, backgroundColor = '#1a1b26' }: UseScreenshotOptions) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [justCaptured, setJustCaptured] = useState(false);

  const capture = useCallback(async () => {
    if (!targetRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      const blob = await toBlob(targetRef.current, {
        backgroundColor,
        cacheBust: true,
        pixelRatio: 2,
      });
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setJustCaptured(true);
      setTimeout(() => setJustCaptured(false), 1500);
    } finally {
      setIsCapturing(false);
    }
  }, [filename, backgroundColor, isCapturing]);

  return { targetRef, capture, isCapturing, justCaptured };
}
