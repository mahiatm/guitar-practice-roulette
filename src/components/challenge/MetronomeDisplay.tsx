import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../../config/theme';

interface MetronomeDisplayProps {
  bpm: number;
  isPlaying: boolean;
  currentBeat: number;
}

export default function MetronomeDisplay({ bpm, isPlaying, currentBeat }: MetronomeDisplayProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (!isPlaying) {
      pulseAnim.setValue(1);
      opacityAnim.setValue(0.4);
      return;
    }

    Animated.sequence([
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 1.4,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.4,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [currentBeat]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [{ scale: pulseAnim }],
            opacity: opacityAnim,
            backgroundColor: isPlaying ? COLORS.accent : COLORS.textMuted,
          },
        ]}
      />
      <Text style={styles.bpmText}>{bpm}</Text>
      <Text style={styles.bpmLabel}>BPM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: SPACING.xs,
  },
  bpmText: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.bpm,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  bpmLabel: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
