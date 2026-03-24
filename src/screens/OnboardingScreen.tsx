import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { UserProfile } from '../models/UserProfile';
import { SKILL_LEVELS, GUITAR_TYPES, SkillLevel, GuitarType } from '../config/constants';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';
import Button from '../components/common/Button';

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile) => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Beginner');
  const [guitarType, setGuitarType] = useState<GuitarType>('Acoustic');
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  const handleComplete = () => {
    const profile: UserProfile = {
      skillLevel,
      guitarType,
      trackingEnabled,
      createdAt: new Date().toISOString(),
    };
    onComplete(profile);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎸</Text>
          <Text style={styles.appName}>Guitar Practice{'\n'}Roulette</Text>
          <Text style={styles.subtitle}>
            Let's set up your practice profile before we spin the wheel.
          </Text>
        </View>

        {/* Skill Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILL LEVEL</Text>
          <View style={styles.optionRow}>
            {SKILL_LEVELS.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionButton,
                  skillLevel === level && styles.optionButtonSelected,
                ]}
                onPress={() => setSkillLevel(level)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    skillLevel === level && styles.optionLabelSelected,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Guitar Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GUITAR TYPE</Text>
          <View style={styles.optionRow}>
            {GUITAR_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionButton,
                  guitarType === type && styles.optionButtonSelected,
                ]}
                onPress={() => setGuitarType(type)}
                activeOpacity={0.7}
              >
                <Text style={styles.typeEmoji}>
                  {type === 'Acoustic' ? '🪕' : '⚡'}
                </Text>
                <Text
                  style={[
                    styles.optionLabel,
                    guitarType === type && styles.optionLabelSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Challenge Tracking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CHALLENGE TRACKING</Text>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setTrackingEnabled(!trackingEnabled)}
            activeOpacity={0.8}
          >
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Track my progress</Text>
              <Text style={styles.toggleDesc}>
                Save a log of completed challenges for future stats
              </Text>
            </View>
            <View
              style={[
                styles.toggle,
                trackingEnabled && styles.toggleEnabled,
              ]}
            >
              <View
                style={[
                  styles.toggleThumb,
                  trackingEnabled && styles.toggleThumbEnabled,
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Button
          label="Start Practicing"
          onPress={handleComplete}
          size="lg"
          style={styles.cta}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.xl,
  },
  title: {
    fontSize: 64,
    marginBottom: SPACING.sm,
  },
  appName: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.h1,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 40,
    marginBottom: SPACING.md,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.body,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: SPACING.md,
  },
  optionRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  optionButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
  },
  optionButtonSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent + '15',
  },
  typeEmoji: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  optionLabel: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
  optionLabelSelected: {
    color: COLORS.accent,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toggleInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  toggleLabel: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  toggleDesc: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    lineHeight: 18,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.border,
    padding: 2,
  },
  toggleEnabled: {
    backgroundColor: COLORS.accent,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.textMuted,
  },
  toggleThumbEnabled: {
    backgroundColor: COLORS.background,
    transform: [{ translateX: 22 }],
  },
  cta: {
    marginTop: SPACING.md,
  },
});
