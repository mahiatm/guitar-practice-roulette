import { ChallengeCategory } from '../config/constants';

export interface Challenge {
  id: string;
  category: ChallengeCategory;
  title: string;
  instruction: string;
  requiredBpm: number | null;
  requiredKeyOrScale: string | null;
  isMetronomeRequired: boolean;
  durationSeconds: number | null; // null = open-ended
  skillLevels: ('Beginner' | 'Intermediate' | 'Advanced')[];
}
