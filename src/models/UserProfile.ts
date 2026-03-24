import { SkillLevel, GuitarType } from '../config/constants';

export interface UserProfile {
  skillLevel: SkillLevel;
  guitarType: GuitarType;
  trackingEnabled: boolean;
  createdAt: string;
}

export interface ChallengeLogEntry {
  logId: string;
  challengeId: string;
  completionTimestamp: string;
  durationSeconds: number;
  wasSuccessful: boolean;
  feedback: 'success' | 'struggled' | 'abort';
}
