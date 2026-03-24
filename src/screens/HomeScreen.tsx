import React, { useRef } from 'react';
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
import { getRandomChallenge } from '../logic/challengeGenerator';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../config/theme';
import Button from '../components/common/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: Props) {
  const { userProfile } = route.params;
  const spinAnim = useRef(new Animated.Value(0)).current;

  const handleRoll = () => {
    // Spin animation
    Animated.sequence([
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(spinAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const challenge = getRandomChallenge(userProfile);
      navigation.navigate('ChallengeReveal', { challenge, userProfile });
    });
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Header row */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.profileLabel}>
              {userProfile.skillLevel} · {userProfile.guitarType}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings', { userProfile })}
            style={styles.iconBtn}
          >
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.appTitle}>Guitar Practice</Text>
          <Text style={[styles.appTitle, { color: COLORS.accent }]}>Roulette</Text>
        </View>

        {/* Roulette wheel button */}
        <View style={styles.wheelArea}>
          <Animated.View
            style={[styles.outerRing, { transform: [{ rotate: spin }] }]}
          >
            <View style={styles.innerRing}>
              <TouchableOpacity
                style={styles.rollButton}
                onPress={handleRoll}
                activeOpacity={0.85}
              >
                <Text style={styles.rollEmoji}>🎲</Text>
                <Text style={styles.rollLabel}>ROLL THE{'\n'}DICE</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Text style={styles.hint}>Tap to get a random practice challenge</Text>
        </View>

        {/* Footer actions */}
        <View style={styles.footer}>
          <Button
            label="View History"
            onPress={() => navigation.navigate('History')}
            variant="ghost"
            size="sm"
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
  profileLabel: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    letterSpacing: 1,
  },
  iconBtn: {
    padding: SPACING.xs,
  },
  iconText: {
    fontSize: 22,
  },
  titleBlock: {
    marginBottom: SPACING.xxl,
  },
  appTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.h1,
    fontWeight: '800',
    lineHeight: 44,
    letterSpacing: 0.5,
  },
  wheelArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xl,
  },
  outerRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: COLORS.accent + '40',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  innerRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1.5,
    borderColor: COLORS.accent + '80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rollButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  rollEmoji: {
    fontSize: 40,
    marginBottom: SPACING.xs,
  },
  rollLabel: {
    color: COLORS.background,
    fontSize: FONT_SIZES.body,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: 20,
  },
  hint: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: SPACING.md,
  },
});
