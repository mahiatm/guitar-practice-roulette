import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { persistenceService } from '../services/persistenceService';
import { ChallengeLogEntry } from '../models/UserProfile';
import Button from '../components/common/Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Completion'>;

export default function CompletionScreen({ navigation, route }: Props) {
  const { challenge, durationSeconds, userProfile } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 80 }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  const logEntry = async (feedback: 'success' | 'struggled' | 'abort') => {
    if (userProfile.trackingEnabled) {
      const entry: ChallengeLogEntry = {
        logId: Date.now().toString(),
        challengeId: challenge.id,
        completionTimestamp: new Date().toISOString(),
        durationSeconds,
        wasSuccessful: feedback === 'success',
        feedback,
      };
      await persistenceService.addChallengeLogEntry(entry);
    }
  };

  const handleFeedback = async (feedback: 'success' | 'struggled' | 'abort') => {
    await logEntry(feedback);
    navigation.navigate('Home', { userProfile });
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.inner, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>🎵</Text>
          <Text style={styles.title}>Challenge Complete!</Text>
          <Text style={styles.challengeName}>{challenge.title}</Text>
          <Text style={styles.duration}>Session: {formatDuration(durationSeconds)}</Text>
        </View>

        <View style={styles.promptBox}>
          <Text style={styles.promptText}>How did it go?</Text>
        </View>

        <View style={styles.feedbackButtons}>
          <Button
            label="🎸  Nailed It!"
            onPress={() => handleFeedback('success')}
            variant="success"
            size="lg"
            style={styles.feedbackBtn}
          />
          <Button
            label="😅  Struggled"
            onPress={() => handleFeedback('struggled')}
            variant="secondary"
            size="lg"
            style={styles.feedbackBtn}
          />
          <Button
            label="← Back to Home"
            onPress={() => handleFeedback('abort')}
            variant="ghost"
            size="md"
            style={styles.feedbackBtn}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    gap: SPACING.sm,
  },
  emoji: {
    fontSize: 72,
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.h1,
    fontWeight: '800',
    textAlign: 'center',
  },
  challengeName: {
    color: COLORS.text,
    fontSize: FONT_SIZES.h2,
    fontWeight: '600',
    textAlign: 'center',
  },
  duration: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.body,
    letterSpacing: 0.5,
  },
  promptBox: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  promptText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.h2,
    fontWeight: '700',
  },
  feedbackButtons: {
    gap: SPACING.md,
  },
  feedbackBtn: {
    width: '100%',
  },
});
