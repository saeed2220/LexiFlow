/**
 * Core domain models for LexiFlow.
 * Strongly typed schemas shared across repositories, services, and UI views.
 */

export enum MediaSourceType {
  VideoUrl = 'video_url',
  AudioUrl = 'audio_url',
  VideoFile = 'video_file',
  AudioFile = 'audio_file',
  SubtitleFile = 'subtitle_file',
  TranscriptText = 'transcript_text',
}

export enum ProcessingStatus {
  Queued = 'queued',
  Downloading = 'downloading',
  Transcribing = 'transcribing',
  Extracting = 'extracting',
  Completed = 'completed',
  Failed = 'failed',
}

export enum VocabularyCategory {
  Word = 'word',
  PhrasalVerb = 'phrasal_verb',
  Idiom = 'idiom',
  Collocation = 'collocation',
  Expression = 'expression',
}

export enum CefrLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export enum ApprovalStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export enum CardType {
  Recognition = 'recognition',
  Recall = 'recall',
  ContextCloze = 'context_cloze',
  Listening = 'listening',
}

export enum FsrsCardState {
  New = 'new',
  Learning = 'learning',
  Review = 'review',
  Relearning = 'relearning',
}

export enum ReviewRating {
  Again = 1,
  Hard = 2,
  Good = 3,
  Easy = 4,
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  nativeLanguage: 'fa' | string;
  learningLanguage: 'en' | string;
  createdAt: string;
}

export interface TranscriptSegment {
  startSeconds: number;
  endSeconds: number;
  text: string;
}

export interface MediaSource {
  id: string;
  userId: string;
  sourceType: MediaSourceType;
  sourceUrl: string | null;
  fileName: string | null;
  duration: number | null;
  processingStatus: ProcessingStatus;
  transcript: string;
  segments?: TranscriptSegment[];
  createdAt: string;
}

export interface VocabularyExample {
  sentence: string;
  translation: string;
  timestampSeconds?: number;
}

export interface Vocabulary {
  id: string;
  userId: string;
  expression: string;
  normalizedExpression: string;
  pronunciation: string;
  ipa: string;
  persianMeaning: string;
  category: VocabularyCategory;
  cefrLevel: CefrLevel;
  examples: VocabularyExample[];
  translations: string[];
  sourceId: string | null;
  timestamp: number | null;
  tags: string[];
  approvalStatus: ApprovalStatus;
  createdAt: string;
}

export interface Deck {
  id: string;
  userId: string;
  name: string;
  description: string;
  color: string;
  vocabularyIds: string[];
  createdAt: string;
}

export interface FsrsReviewState {
  state: FsrsCardState;
  due: string;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  lastReview: string | null;
}

export interface Flashcard {
  id: string;
  vocabularyId: string;
  deckId: string;
  cardType: CardType;
  front: string;
  back: string;
  reviewState: FsrsReviewState;
  createdAt: string;
}

export interface ReviewLog {
  id: string;
  userId: string;
  flashcardId: string;
  rating: ReviewRating;
  reviewedAt: string;
  reviewDuration: number;
}

export type AppLocale = 'en' | 'fa';
export type AppDirection = 'ltr' | 'rtl';

export interface DashboardSummary {
  dueFlashcardsCount: number;
  pendingReviewCount: number;
  masteredVocabularyCount: number;
  totalVocabularyCount: number;
  activeDecksCount: number;
  mediaSourcesCount: number;
  processingQueueCount: number;
  reviewsTodayCount: number;
  studyMinutesToday: number;
}

export interface RepositoryResult<T> {
  data: T;
  configured: boolean;
  error: string | null;
}
