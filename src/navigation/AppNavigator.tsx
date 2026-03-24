import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChallengeRevealScreen from '../screens/ChallengeRevealScreen';
import ChallengeExecutionScreen from '../screens/ChallengeExecutionScreen';
import CompletionScreen from '../screens/CompletionScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { UserProfile } from '../models/UserProfile';
import { Challenge } from '../models/Challenge';

export type RootStackParamList = {
  Home: { userProfile: UserProfile };
  ChallengeReveal: { challenge: Challenge; userProfile: UserProfile };
  ChallengeExecution: { challenge: Challenge; userProfile: UserProfile };
  Completion: { challenge: Challenge; durationSeconds: number; userProfile: UserProfile };
  Settings: { userProfile: UserProfile };
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  userProfile: UserProfile;
}

export default function AppNavigator({ userProfile }: AppNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ userProfile }}
      />
      <Stack.Screen name="ChallengeReveal" component={ChallengeRevealScreen} />
      <Stack.Screen name="ChallengeExecution" component={ChallengeExecutionScreen} />
      <Stack.Screen name="Completion" component={CompletionScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
}
