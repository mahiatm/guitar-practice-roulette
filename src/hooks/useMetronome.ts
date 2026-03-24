import { useEffect, useRef, useState, useCallback } from 'react';

interface MetronomeOptions {
  bpm: number;
  enabled: boolean;
}

interface MetronomeState {
  isPlaying: boolean;
  currentBeat: number;
  bpm: number;
}

export function useMetronome({ bpm: initialBpm, enabled }: MetronomeOptions) {
  const [state, setState] = useState<MetronomeState>({
    isPlaying: false,
    currentBeat: 0,
    bpm: initialBpm,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const beatRef = useRef(0);

  const getBeatInterval = (bpm: number) => (60 / bpm) * 1000;

  const startMetronome = useCallback(() => {
    if (!enabled) return;

    beatRef.current = 0;
    setState((prev) => ({ ...prev, isPlaying: true, currentBeat: 0 }));

    intervalRef.current = setInterval(() => {
      beatRef.current += 1;
      setState((prev) => ({ ...prev, currentBeat: beatRef.current }));
    }, getBeatInterval(state.bpm));
  }, [enabled, state.bpm]);

  const stopMetronome = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    beatRef.current = 0;
    setState((prev) => ({ ...prev, isPlaying: false, currentBeat: 0 }));
  }, []);

  const setBpm = useCallback(
    (newBpm: number) => {
      setState((prev) => ({ ...prev, bpm: newBpm }));
      if (state.isPlaying) {
        stopMetronome();
        // Restart will be triggered by useEffect
      }
    },
    [state.isPlaying, stopMetronome]
  );

  // Restart metronome when BPM changes while playing
  useEffect(() => {
    if (state.isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        beatRef.current += 1;
        setState((prev) => ({ ...prev, currentBeat: beatRef.current }));
      }, getBeatInterval(state.bpm));
    }
  }, [state.bpm]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    isPlaying: state.isPlaying,
    currentBeat: state.currentBeat,
    bpm: state.bpm,
    startMetronome,
    stopMetronome,
    setBpm,
  };
}
