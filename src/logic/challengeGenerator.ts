import { Challenge } from '../models/Challenge';
import { UserProfile } from '../models/UserProfile';
import { ChallengeCategory } from '../config/constants';
import challengesData from '../assets/data/challenges.json';

const allChallenges: Challenge[] = challengesData as Challenge[];

/**
 * Returns a filtered pool of challenges appropriate for the user's skill level.
 */
function getFilteredPool(userProfile: UserProfile): Challenge[] {
  return allChallenges.filter((c) =>
    c.skillLevels.includes(userProfile.skillLevel)
  );
}

/**
 * Selects a random challenge from the pool, optionally excluding a specific challenge ID.
 */
export function getRandomChallenge(
  userProfile: UserProfile,
  excludeId?: string
): Challenge {
  let pool = getFilteredPool(userProfile);

  if (excludeId) {
    pool = pool.filter((c) => c.id !== excludeId);
  }

  if (pool.length === 0) {
    // Fallback: return any challenge
    return allChallenges[Math.floor(Math.random() * allChallenges.length)];
  }

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

/**
 * Returns challenges grouped by category.
 */
export function getChallengesByCategory(
  userProfile: UserProfile
): Record<ChallengeCategory, Challenge[]> {
  const pool = getFilteredPool(userProfile);

  const grouped = {} as Record<ChallengeCategory, Challenge[]>;

  for (const challenge of pool) {
    if (!grouped[challenge.category]) {
      grouped[challenge.category] = [];
    }
    grouped[challenge.category].push(challenge);
  }

  return grouped;
}

/**
 * Returns a random challenge from a specific category.
 */
export function getRandomChallengeByCategory(
  userProfile: UserProfile,
  category: ChallengeCategory
): Challenge | null {
  const pool = getFilteredPool(userProfile).filter(
    (c) => c.category === category
  );

  if (pool.length === 0) return null;

  return pool[Math.floor(Math.random() * pool.length)];
}

export { allChallenges };
