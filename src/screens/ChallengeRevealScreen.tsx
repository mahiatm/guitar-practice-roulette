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
import { getRandomChallenge } from '../logic/challengeGenerator';
import ChallengeCard from '../components/challenge/ChallengeCard';
import Button from '../components/common/Button';
import { COLORS, SPACING, FONT_SIZES } from '../config/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ChallengeReveal'>;

export default function ChallengeRevealScreen({ navigation, route }: Props) {
  const { challenge, userProfile } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [challenge]);

  const handleReroll = () => {
    const next = getRandomChallenge(userProfile, challenge.id);
    // Reset animation and navigate to same screen with new challenge
    navigation.replace('ChallengeReveal', { challenge: next, userProfile });
  };

  const handleStart = () => {
    navigation.navigate('ChallengeExecution', { challenge, userProfile });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Top nav */}
        <View style={styles.topBar}>
          <Button
            label="← Back"
            onPress={() => navigation.goBack()}
            variant="ghost"
            size="sm"
          />
          <Text style={styles.screenLabel}>YOUR CHALLENGE</Text>
          <View style={{ width: 70 }} />
        </View>

        {/* Animated card reveal */}
        <Animated.View
          style={[
            styles.cardWrapper,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <ChallengeCard challenge={challenge} />
        </Animated.View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            label="🎲  Reroll"
            onPress={handleReroll}
            variant="ghost"
            size="md"
            style={styles.rerollBtn}
          />
          <Button
            label="Start Challenge →"
            onPress={handleStart}
            variant="primary"
            size="lg"
          />
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
  inner: {
    flex: 1,
    padding: SPACING.lg,
  },
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
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  actions: {
    gap: SPACING.md,
    paddingBottom: SPACING.md,
  },
  rerollBtn: {
    width: '100%',
  },
});
