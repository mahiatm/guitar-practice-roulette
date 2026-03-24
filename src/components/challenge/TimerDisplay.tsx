import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../../config/theme';

interface TimerDisplayProps {
  formattedTime: string;
  isRunning: boolean;
  isCountdown: boolean;
  remaining: number | null;
  durationSeconds: number | null;
}

export default function TimerDisplay({
  formattedTime,
  isRunning,
  isCountdown,
  remaining,
  durationSeconds,
}: TimerDisplayProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.02, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [isRunning]);

  const isWarning = isCountdown && remaining !== null && remaining <= 10 && remaining > 0;

  const progress =
    isCountdown && durationSeconds && remaining !== null
      ? 1 - remaining / durationSeconds
      : null;

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.timerText,
          { transform: [{ scale: pulseAnim }] },
          isWarning && styles.warningText,
        ]}
      >
        {formattedTime}
      </Animated.Text>
      <Text style={styles.label}>
        {isCountdown ? 'REMAINING' : 'ELAPSED'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timerText: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.timer,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
  },
  warningText: {
    color: COLORS.failure,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: SPACING.xs,
  },
});
