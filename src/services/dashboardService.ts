import type { LexiFlowRepositories } from '../repositories/interfaces';
import {
  ApprovalStatus,
  ProcessingStatus,
  type DashboardSummary,
  type MediaSource,
  type Vocabulary,
} from '../types/models';

export interface DashboardSnapshot {
  summary: DashboardSummary;
  recentSources: MediaSource[];
  recentVocabulary: Vocabulary[];
  isBackendConfigured: boolean;
  isAuthenticated: boolean;
}

const EMPTY_SUMMARY: DashboardSummary = {
  dueFlashcardsCount: 0,
  pendingReviewCount: 0,
  masteredVocabularyCount: 0,
  totalVocabularyCount: 0,
  activeDecksCount: 0,
  mediaSourcesCount: 0,
  processingQueueCount: 0,
  reviewsTodayCount: 0,
  studyMinutesToday: 0,
};

/**
 * Pure business logic service for computing dashboard metrics from repository data.
 * Separated from React UI components so Phase 2 Firestore repositories plug in seamlessly.
 */
export async function fetchDashboardSnapshot(
  repositories: LexiFlowRepositories,
): Promise<DashboardSnapshot> {
  const isBackendConfigured = repositories.auth.isConfigured();
  const userResult = await repositories.auth.getCurrentUser();

  if (userResult.error) {
    throw new Error(userResult.error);
  }

  const user = userResult.data;
  if (!user) {
    return {
      summary: { ...EMPTY_SUMMARY },
      recentSources: [],
      recentVocabulary: [],
      isBackendConfigured,
      isAuthenticated: false,
    };
  }

  const nowIso = new Date().toISOString();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [sourcesRes, vocabRes, decksRes, dueCardsRes, logsRes] = await Promise.all([
    repositories.mediaSources.listByUser(user.id),
    repositories.vocabulary.listByUser(user.id),
    repositories.decks.listByUser(user.id),
    repositories.flashcards.listDueByUser(user.id, nowIso),
    repositories.reviewLogs.listRecentByUser(user.id, startOfDay.toISOString()),
  ]);

  const sources = sourcesRes.data;
  const vocab = vocabRes.data;
  const decks = decksRes.data;
  const dueCards = dueCardsRes.data;
  const logs = logsRes.data;

  const pendingReviewCount = vocab.filter(
    (item) => item.approvalStatus === ApprovalStatus.Pending,
  ).length;
  const approvedVocabCount = vocab.filter(
    (item) => item.approvalStatus === ApprovalStatus.Approved,
  ).length;
  const processingQueueCount = sources.filter(
    (src) =>
      src.processingStatus !== ProcessingStatus.Completed &&
      src.processingStatus !== ProcessingStatus.Failed,
  ).length;

  const totalDurationMs = logs.reduce((acc, log) => acc + Math.max(0, log.reviewDuration), 0);

  return {
    summary: {
      dueFlashcardsCount: dueCards.length,
      pendingReviewCount,
      masteredVocabularyCount: approvedVocabCount,
      totalVocabularyCount: vocab.length,
      activeDecksCount: decks.length,
      mediaSourcesCount: sources.length,
      processingQueueCount,
      reviewsTodayCount: logs.length,
      studyMinutesToday: Math.round(totalDurationMs / 60000),
    },
    recentSources: sources.slice(0, 5),
    recentVocabulary: vocab.slice(0, 6),
    isBackendConfigured,
    isAuthenticated: true,
  };
}
