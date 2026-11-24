import type {
  Deck,
  Flashcard,
  MediaSource,
  RepositoryResult,
  ReviewLog,
  User,
  Vocabulary,
} from '../types/models';
import type { LexiFlowRepositories } from './interfaces';

/**
 * Phase 1 repository implementation.
 * Does NOT simulate database persistence or hardcode fake authentication.
 * Cleanly reports unconfigured backend state until Phase 2 provisions Firebase Auth & Firestore.
 */
function unconfiguredResult<T>(fallback: T): Promise<RepositoryResult<T>> {
  return Promise.resolve({
    data: fallback,
    configured: false,
    error: null,
  });
}

export const unconfiguredRepositories: LexiFlowRepositories = {
  auth: {
    getCurrentUser: () => unconfiguredResult<User | null>(null),
    isConfigured: () => false,
  },
  mediaSources: {
    listByUser: () => unconfiguredResult<MediaSource[]>([]),
    getById: () => unconfiguredResult<MediaSource | null>(null),
  },
  vocabulary: {
    listByUser: () => unconfiguredResult<Vocabulary[]>([]),
    findByNormalizedExpression: () => unconfiguredResult<Vocabulary | null>(null),
  },
  decks: {
    listByUser: () => unconfiguredResult<Deck[]>([]),
  },
  flashcards: {
    listDueByUser: () => unconfiguredResult<Flashcard[]>([]),
    listByDeck: () => unconfiguredResult<Flashcard[]>([]),
  },
  reviewLogs: {
    listRecentByUser: () => unconfiguredResult<ReviewLog[]>([]),
  },
};
