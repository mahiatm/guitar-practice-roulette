import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChallengeCategory } from '../../config/constants';
import { COLORS, FONT_SIZES, BORDER_RADIUS, SPACING } from '../../config/theme';

const CATEGORY_COLORS: Record<ChallengeCategory, string> = {
  'Technique': '#4A90D9',
  'Rhythm & Timing': '#E67E22',
  'Chords & Harmony': '#9B59B6',
  'Ear Training': '#1ABC9C',
  'Creativity': COLORS.burgundy,
};

interface CategoryBadgeProps {
  category: ChallengeCategory;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const color = CATEGORY_COLORS[category] || COLORS.accent;
  return (
    <View style={[styles.badge, { backgroundColor: color + '33', borderColor: color }]}>
      <Text style={[styles.label, { color }]}>{category.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});
