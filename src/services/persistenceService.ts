import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, ChallengeLogEntry } from '../models/UserProfile';
import { STORAGE_KEYS } from '../config/constants';

export const persistenceService = {
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  },

  async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save user profile', e);
    }
  },

  async getChallengeLog(): Promise<ChallengeLogEntry[]> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEYS.CHALLENGE_LOG);
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  },

  async addChallengeLogEntry(entry: ChallengeLogEntry): Promise<void> {
    try {
      const log = await this.getChallengeLog();
      log.push(entry);
      await AsyncStorage.setItem(STORAGE_KEYS.CHALLENGE_LOG, JSON.stringify(log));
    } catch (e) {
      console.error('Failed to save challenge log entry', e);
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER_PROFILE, STORAGE_KEYS.CHALLENGE_LOG]);
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
  },
};
