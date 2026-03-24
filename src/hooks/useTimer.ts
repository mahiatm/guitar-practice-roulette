import { useEffect, useRef, useState, useCallback } from 'react';

interface TimerOptions {
  durationSeconds: number | null; // null = count up
  onComplete?: () => void;
}

export function useTimer({ durationSeconds, onComplete }: TimerOptions) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const remaining = durationSeconds !== null ? Math.max(0, durationSeconds - elapsed) : null;
  const isComplete = remaining !== null && remaining === 0;

  const start = useCallback(() => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    pause();
    setElapsed(0);
  }, [pause]);

  useEffect(() => {
    if (isComplete && onComplete) {
      pause();
      onComplete();
    }
  }, [isComplete]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return {
    elapsed,
    remaining,
    isRunning,
    isComplete,
    start,
    pause,
    reset,
    formattedElapsed: formatTime(elapsed),
    formattedRemaining: remaining !== null ? formatTime(remaining) : formatTime(elapsed),
  };
}
