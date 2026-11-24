import type {
  Deck,
  Flashcard,
  MediaSource,
  RepositoryResult,
  ReviewLog,
  User,
  Vocabulary,
} from '../types/models';

/**
 * Repository contracts decoupling business logic and UI from persistence engines.
 * Phase 2 will implement these interfaces against Firebase Auth & Cloud Firestore.
 */

export interface IAuthRepository {
  getCurrentUser(): Promise<RepositoryResult<User | null>>;
  isConfigured(): boolean;
}

export interface IMediaSourceRepository {
  listByUser(userId: string): Promise<RepositoryResult<MediaSource[]>>;
  getById(id: string): Promise<RepositoryResult<MediaSource | null>>;
}

export interface IVocabularyRepository {
  listByUser(userId: string): Promise<RepositoryResult<Vocabulary[]>>;
  findByNormalizedExpression(
    userId: string,
    normalizedExpression: string,
  ): Promise<RepositoryResult<Vocabulary | null>>;
}

export interface IDeckRepository {
  listByUser(userId: string): Promise<RepositoryResult<Deck[]>>;
}

export interface IFlashcardRepository {
  listDueByUser(userId: string, asOfIso: string): Promise<RepositoryResult<Flashcard[]>>;
  listByDeck(deckId: string): Promise<RepositoryResult<Flashcard[]>>;
}

export interface IReviewLogRepository {
  listRecentByUser(userId: string, sinceIso: string): Promise<RepositoryResult<ReviewLog[]>>;
}

export interface LexiFlowRepositories {
  auth: IAuthRepository;
  mediaSources: IMediaSourceRepository;
  vocabulary: IVocabularyRepository;
  decks: IDeckRepository;
  flashcards: IFlashcardRepository;
  reviewLogs: IReviewLogRepository;
}
