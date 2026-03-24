import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { persistenceService } from '../services/persistenceService';
import { UserProfile } from '../models/UserProfile';
import { SKILL_LEVELS, GUITAR_TYPES, SkillLevel, GuitarType } from '../config/constants';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';
import Button from '../components/common/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation, route }: Props) {
  const { userProfile } = route.params;
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(userProfile.skillLevel);
  const [guitarType, setGuitarType] = useState<GuitarType>(userProfile.guitarType);
  const [trackingEnabled, setTrackingEnabled] = useState(userProfile.trackingEnabled);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const updated: UserProfile = {
      ...userProfile,
      skillLevel,
      guitarType,
      trackingEnabled,
    };
    await persistenceService.saveUserProfile(updated);
    setSaving(false);
    navigation.navigate('Home', { userProfile: updated });
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete your profile and challenge history. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await persistenceService.clearAll();
            // App.tsx will re-show onboarding when profile is null
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.topBar}>
          <Button
            label="← Back"
            onPress={() => navigation.goBack()}
            variant="ghost"
            size="sm"
          />
          <Text style={styles.screenLabel}>SETTINGS</Text>
          <View style={{ width: 70 }} />
        </View>

        {/* Skill Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILL LEVEL</Text>
          <View style={styles.optionRow}>
            {SKILL_LEVELS.map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.optionButton, skillLevel === level && styles.optionButtonSelected]}
                onPress={() => setSkillLevel(level)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.optionLabel, skillLevel === level && styles.optionLabelSelected]}
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
                style={[styles.optionButton, guitarType === type && styles.optionButtonSelected]}
                onPress={() => setGuitarType(type)}
                activeOpacity={0.7}
              >
                <Text style={styles.typeEmoji}>{type === 'Acoustic' ? '🪕' : '⚡'}</Text>
                <Text
                  style={[styles.optionLabel, guitarType === type && styles.optionLabelSelected]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tracking Toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CHALLENGE TRACKING</Text>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setTrackingEnabled(!trackingEnabled)}
            activeOpacity={0.8}
          >
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Track my progress</Text>
              <Text style={styles.toggleDesc}>Log completed challenges locally</Text>
            </View>
            <View style={[styles.toggle, trackingEnabled && styles.toggleEnabled]}>
              <View style={[styles.toggleThumb, trackingEnabled && styles.toggleThumbEnabled]} />
            </View>
          </TouchableOpacity>
        </View>

        <Button label="Save Changes" onPress={handleSave} loading={saving} size="lg" />

        <Button
          label="Clear All Data"
          onPress={handleClearData}
          variant="danger"
          size="md"
          style={styles.dangerBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  screenLabel: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    letterSpacing: 2,
  },
  section: { marginBottom: SPACING.xl },
  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: SPACING.md,
  },
  optionRow: { flexDirection: 'row', gap: SPACING.sm },
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
  typeEmoji: { fontSize: 24, marginBottom: SPACING.xs },
  optionLabel: { color: COLORS.textMuted, fontSize: FONT_SIZES.body, fontWeight: '600' },
  optionLabelSelected: { color: COLORS.accent },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toggleInfo: { flex: 1, marginRight: SPACING.md },
  toggleLabel: { color: COLORS.text, fontSize: FONT_SIZES.body, fontWeight: '600', marginBottom: 2 },
  toggleDesc: { color: COLORS.textMuted, fontSize: FONT_SIZES.sm },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.border,
    padding: 2,
  },
  toggleEnabled: { backgroundColor: COLORS.accent },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.textMuted },
  toggleThumbEnabled: { backgroundColor: COLORS.background, transform: [{ translateX: 22 }] },
  dangerBtn: { marginTop: SPACING.md },
});
