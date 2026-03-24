import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Challenge } from '../../models/Challenge';
import CategoryBadge from '../common/CategoryBadge';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../config/theme';

interface ChallengeCardProps {
  challenge: Challenge;
  dimmed?: boolean;
}

export default function ChallengeCard({ challenge, dimmed = false }: ChallengeCardProps) {
  return (
    <View style={[styles.card, dimmed && styles.dimmed]}>
      <CategoryBadge category={challenge.category} />
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.instruction}>{challenge.instruction}</Text>

      {(challenge.requiredBpm || challenge.requiredKeyOrScale) && (
        <View style={styles.metaRow}>
          {challenge.requiredBpm && (
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>BPM</Text>
              <Text style={styles.metaValue}>{challenge.requiredBpm}</Text>
            </View>
          )}
          {challenge.requiredKeyOrScale && (
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>KEY</Text>
              <Text style={styles.metaValue}>{challenge.requiredKeyOrScale}</Text>
            </View>
          )}
          {challenge.durationSeconds && (
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>TIME</Text>
              <Text style={styles.metaValue}>
                {challenge.durationSeconds >= 60
                  ? `${challenge.durationSeconds / 60}m`
                  : `${challenge.durationSeconds}s`}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  dimmed: {
    opacity: 0.7,
  },
  title: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.h2,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  instruction: {
    color: COLORS.text,
    fontSize: FONT_SIZES.h1 * 0.55,
    lineHeight: 26,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  metaPill: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metaLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  metaValue: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
  },
});
