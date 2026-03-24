import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { persistenceService } from '../services/persistenceService';
import { ChallengeLogEntry } from '../models/UserProfile';
import { allChallenges } from '../logic/challengeGenerator';
import Button from '../components/common/Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

export default function HistoryScreen({ navigation }: Props) {
  const [log, setLog] = useState<ChallengeLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    persistenceService.getChallengeLog().then((entries) => {
      setLog(entries.reverse()); // most recent first
      setLoading(false);
    });
  }, []);

  const successCount = log.filter((e) => e.wasSuccessful).length;
  const struggledCount = log.filter((e) => e.feedback === 'struggled').length;

  const getChallengeTitle = (id: string) =>
    allChallenges.find((c) => c.id === id)?.title ?? 'Unknown Challenge';

  const renderEntry = ({ item }: { item: ChallengeLogEntry }) => {
    const date = new Date(item.completionTimestamp);
    const formatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const feedbackColor =
      item.feedback === 'success'
        ? COLORS.success
        : item.feedback === 'struggled'
        ? COLORS.burgundy
        : COLORS.textMuted;

    const feedbackEmoji =
      item.feedback === 'success' ? '🎸' : item.feedback === 'struggled' ? '😅' : '↩';

    return (
      <View style={styles.entry}>
        <View style={styles.entryLeft}>
          <Text style={styles.entryEmoji}>{feedbackEmoji}</Text>
        </View>
        <View style={styles.entryInfo}>
          <Text style={styles.entryTitle}>{getChallengeTitle(item.challengeId)}</Text>
          <Text style={styles.entryDate}>{formatted}</Text>
          <Text style={styles.entryDuration}>
            {Math.floor(item.durationSeconds / 60)}m {item.durationSeconds % 60}s
          </Text>
        </View>
        <View style={[styles.feedbackDot, { backgroundColor: feedbackColor }]} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topBar}>
          <Button label="← Back" onPress={() => navigation.goBack()} variant="ghost" size="sm" />
          <Text style={styles.screenLabel}>HISTORY</Text>
          <View style={{ width: 70 }} />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{log.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: COLORS.success }]}>{successCount}</Text>
            <Text style={styles.statLabel}>Nailed It</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: COLORS.burgundy }]}>{struggledCount}</Text>
            <Text style={styles.statLabel}>Struggled</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: SPACING.xxl }} />
        ) : log.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎸</Text>
            <Text style={styles.emptyText}>No challenges completed yet.</Text>
            <Text style={styles.emptySubtext}>Roll the dice and start practicing!</Text>
          </View>
        ) : (
          <FlatList
            data={log}
            keyExtractor={(item) => item.logId}
            renderItem={renderEntry}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  inner: { flex: 1, padding: SPACING.lg },
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
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.h1 * 0.8,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  list: { gap: SPACING.sm, paddingBottom: SPACING.xxl },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  entryLeft: { width: 32, alignItems: 'center' },
  entryEmoji: { fontSize: 22 },
  entryInfo: { flex: 1 },
  entryTitle: { color: COLORS.text, fontSize: FONT_SIZES.body, fontWeight: '600' },
  entryDate: { color: COLORS.textMuted, fontSize: FONT_SIZES.sm, marginTop: 2 },
  entryDuration: { color: COLORS.textMuted, fontSize: FONT_SIZES.sm },
  feedbackDot: { width: 10, height: 10, borderRadius: 5 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: SPACING.sm },
  emptyEmoji: { fontSize: 64 },
  emptyText: { color: COLORS.text, fontSize: FONT_SIZES.h2, fontWeight: '700' },
  emptySubtext: { color: COLORS.textMuted, fontSize: FONT_SIZES.body },
});
