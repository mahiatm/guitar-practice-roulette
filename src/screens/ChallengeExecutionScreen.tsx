import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTimer } from '../hooks/useTimer';
import { useMetronome } from '../hooks/useMetronome';
import TimerDisplay from '../components/challenge/TimerDisplay';
import MetronomeDisplay from '../components/challenge/MetronomeDisplay';
import Button from '../components/common/Button';
import CategoryBadge from '../components/common/CategoryBadge';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ChallengeExecution'>;

export default function ChallengeExecutionScreen({ navigation, route }: Props) {
  const { challenge, userProfile } = route.params;
  const [started, setStarted] = useState(false);
  const startTimeRef = useRef<number>(0);

  const timer = useTimer({
    durationSeconds: challenge.durationSeconds,
    onComplete: handleComplete,
  });

  const metronome = useMetronome({
    bpm: challenge.requiredBpm ?? 80,
    enabled: !!challenge.requiredBpm,
  });

  const glowAnim = useRef(new Animated.Value(0)).current;

  // Pulse glow on metronome beat
  useEffect(() => {
    if (!metronome.isPlaying) return;
    Animated.sequence([
      Animated.timing(glowAnim, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [metronome.currentBeat]);

  function handleComplete() {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    metronome.stopMetronome();
    navigation.navigate('Completion', {
      challenge,
      durationSeconds: elapsed,
      userProfile,
    });
  }

  const handleStart = () => {
    setStarted(true);
    startTimeRef.current = Date.now();
    timer.start();
    if (challenge.isMetronomeRequired && challenge.requiredBpm) {
      metronome.startMetronome();
    }
  };

  const handleStop = () => {
    timer.pause();
    metronome.stopMetronome();
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    navigation.navigate('Completion', {
      challenge,
      durationSeconds: elapsed,
      userProfile,
    });
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Metronome glow overlay */}
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.glowOverlay, { opacity: glowOpacity }]}
        pointerEvents="none"
      />

      <View style={styles.inner}>
        {/* Challenge info */}
        <View style={styles.challengeHeader}>
          <CategoryBadge category={challenge.category} />
          <Text style={styles.challengeTitle} numberOfLines={2}>
            {challenge.title}
          </Text>
        </View>

        {/* Central display */}
        <View style={styles.centerArea}>
          <TimerDisplay
            formattedTime={timer.formattedRemaining}
            isRunning={timer.isRunning}
            isCountdown={challenge.durationSeconds !== null}
            remaining={timer.remaining}
            durationSeconds={challenge.durationSeconds}
          />

          {challenge.requiredBpm && (
            <View style={styles.metronomeWrapper}>
              <MetronomeDisplay
                bpm={metronome.bpm}
                isPlaying={metronome.isPlaying}
                currentBeat={metronome.currentBeat}
              />
              {started && (
                <TouchableOpacity
                  style={styles.metronomeToggle}
                  onPress={() =>
                    metronome.isPlaying
                      ? metronome.stopMetronome()
                      : metronome.startMetronome()
                  }
                >
                  <Text style={styles.metronomeToggleText}>
                    {metronome.isPlaying ? '⏸ Pause Metronome' : '▶ Resume Metronome'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {!started ? (
            <>
              <Button label="▶  Begin" onPress={handleStart} size="lg" />
              <Button
                label="← Back"
                onPress={() => navigation.goBack()}
                variant="ghost"
                size="md"
              />
            </>
          ) : (
            <Button
              label="■  Stop & Complete"
              onPress={handleStop}
              variant="secondary"
              size="lg"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  glowOverlay: {
    backgroundColor: COLORS.accent,
  },
  inner: {
    flex: 1,
    padding: SPACING.lg,
  },
  challengeHeader: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  challengeTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.h2,
    fontWeight: '700',
    lineHeight: 28,
  },
  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xxl,
  },
  metronomeWrapper: {
    alignItems: 'center',
    gap: SPACING.md,
  },
  metronomeToggle: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metronomeToggleText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  actions: {
    gap: SPACING.md,
    paddingBottom: SPACING.md,
  },
});
