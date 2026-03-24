export const APP_NAME = 'Guitar Practice Roulette';

export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;
export type SkillLevel = typeof SKILL_LEVELS[number];

export const GUITAR_TYPES = ['Acoustic', 'Electric'] as const;
export type GuitarType = typeof GUITAR_TYPES[number];

export const CHALLENGE_CATEGORIES = [
  'Technique',
  'Rhythm & Timing',
  'Chords & Harmony',
  'Ear Training',
  'Creativity',
] as const;
export type ChallengeCategory = typeof CHALLENGE_CATEGORIES[number];

export const FEEDBACK_OPTIONS = {
  SUCCESS: 'success',
  STRUGGLED: 'struggled',
  ABORT: 'abort',
} as const;
export type FeedbackOption = typeof FEEDBACK_OPTIONS[keyof typeof FEEDBACK_OPTIONS];

export const STORAGE_KEYS = {
  USER_PROFILE: '@gpr_user_profile',
  CHALLENGE_LOG: '@gpr_challenge_log',
};

export const DEFAULT_BPM = 80;
export const DEFAULT_PRACTICE_DURATION = 120; // seconds
