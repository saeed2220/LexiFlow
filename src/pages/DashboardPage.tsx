import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  FileAudio,
  Upload,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { MixedText } from '../components/ui/MixedText';
import { StatTile } from '../components/ui/StatTile';
import { Surface } from '../components/ui/Surface';
import { useApp } from '../context/AppContext';
import { fetchDashboardSnapshot, type DashboardSnapshot } from '../services/dashboardService';
import { formatLocaleNumber } from '../services/i18n';

const ROADMAP_PHASES = [
  { phase: 1, en: 'Foundation, Design System & Shell', fa: 'زیرساخت، سیستم طراحی و داشبورد' },
  { phase: 2, en: 'Firebase Auth & Cloud Firestore', fa: 'احراز هویت و پایگاه داده ابری' },
  { phase: 3, en: 'Media Import & Processing Queue', fa: 'مرکز ورود محتوا و صف پردازش' },
  { phase: 4, en: 'AI Vocabulary Extraction (Gemini)', fa: 'استخراج هوشمند واژگان با هوش مصنوعی' },
  { phase: 5, en: 'Vocabulary Review & Library', fa: 'بازبینی و مدیریت کتابخانه واژگان' },
  { phase: 6, en: 'Flashcards & FSRS Algorithm', fa: 'فلش‌کارت و الگوریتم مرور FSRS' },
  { phase: 7, en: 'Learning Studio & AI Tutor', fa: 'استودیو صوت و تصویر و معلم هوشمند' },
  { phase: 8, en: 'Analytics, Settings & PWA Offline', fa: 'تحلیل پیشرفت و قابلیت نصب PWA' },
  { phase: 9, en: 'Testing, Security Audit & Deployment', fa: 'آزمون، ممیزی امنیت و استقرار' },
];

export const DashboardPage: React.FC = () => {
  const { locale, direction, copy, navigateTo, repositories } = useApp();
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchDashboardSnapshot(repositories)
      .then((data) => {
        if (!cancelled) {
          setSnapshot(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load dashboard summary.');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [repositories]);

  const DirectionalArrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const summary = snapshot?.summary;

  return (
    <div className="space-y-6">
      {/* Dominant Focal Banner */}
      <Surface padding="lg" className="bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-xs font-medium text-blue-700">
              {copy.brandName} · {copy.brandSubtitle}
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 text-balance">
              {copy.dashboard.welcomeHeading}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {copy.dashboard.welcomeLead}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button variant="primary" size="md" onClick={() => navigateTo('import')}>
              <Upload className="w-4 h-4" aria-hidden="true" />
              <span>{copy.dashboard.primaryCta}</span>
            </Button>
            <Button variant="outline" size="md" onClick={() => navigateTo('srs')}>
              <span>{copy.dashboard.secondaryCta}</span>
              <DirectionalArrow className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Surface>

      {/* Error State */}
      {error && (
        <Surface padding="md" className="border-red-200 bg-red-50/40">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </Surface>
      )}

      {/* 4-Column KPI Strip */}
      <section aria-label="Study Metrics Overview">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Surface padding="sm"><LoadingSkeleton rows={2} /></Surface>
            <Surface padding="sm"><LoadingSkeleton rows={2} /></Surface>
            <Surface padding="sm"><LoadingSkeleton rows={2} /></Surface>
            <Surface padding="sm"><LoadingSkeleton rows={2} /></Surface>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatTile
              label={copy.dashboard.metrics.dueCards}
              value={formatLocaleNumber(summary?.dueFlashcardsCount ?? 0, locale)}
              hint={copy.dashboard.metrics.dueCardsHint}
              onClick={() => navigateTo('srs')}
            />
            <StatTile
              label={copy.dashboard.metrics.approvedWords}
              value={formatLocaleNumber(summary?.masteredVocabularyCount ?? 0, locale)}
              hint={copy.dashboard.metrics.approvedWordsHint}
              onClick={() => navigateTo('library')}
            />
            <StatTile
              label={copy.dashboard.metrics.mediaSources}
              value={formatLocaleNumber(summary?.mediaSourcesCount ?? 0, locale)}
              hint={copy.dashboard.metrics.mediaSourcesHint}
              onClick={() => navigateTo('import')}
            />
            <StatTile
              label={copy.dashboard.metrics.studyTime}
              value={formatLocaleNumber(summary?.studyMinutesToday ?? 0, locale)}
              unit={copy.dashboard.metrics.minutesUnit}
              hint={copy.dashboard.metrics.studyTimeHint}
              onClick={() => navigateTo('analytics')}
            />
          </div>
        )}
      </section>

      {/* Main 12-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Primary Column (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Today's Spaced Repetition Queue */}
          <Surface padding="none">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <h2 className="text-base font-semibold text-slate-900">
                {copy.dashboard.studyQueueTitle}
              </h2>
              <button
                type="button"
                onClick={() => navigateTo('srs')}
                className="text-xs font-medium text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copy.startStudyCta}
              </button>
            </div>
            {loading ? (
              <div className="p-6">
                <LoadingSkeleton rows={3} />
              </div>
            ) : (
              <EmptyState
                icon={<BrainCircuit className="w-5 h-5" aria-hidden="true" />}
                title={copy.dashboard.studyQueueEmptyTitle}
                description={copy.dashboard.studyQueueEmptyDesc}
                actionLabel={copy.dashboard.primaryCta}
                onAction={() => navigateTo('import')}
                secondaryLabel={copy.moduleScaffold.openSettings}
                onSecondaryAction={() => navigateTo('settings')}
              />
            )}
          </Surface>

          {/* Learning Pipeline Steps */}
          <Surface padding="none">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-900">
                {copy.dashboard.workflowTitle}
              </h2>
            </div>
            <div className="divide-y divide-slate-200">
              {copy.dashboard.workflowSteps.map((step, idx) => (
                <button
                  key={step.moduleId}
                  type="button"
                  onClick={() => navigateTo(step.moduleId)}
                  className="w-full px-5 sm:px-6 py-4 flex items-start justify-between gap-4 text-start hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span className="text-xs font-mono font-medium text-slate-400 tabular-nums pt-0.5 shrink-0">
                      0{idx + 1}.
                    </span>
                    <div className="min-w-0 space-y-1">
                      <div className="text-sm font-semibold text-slate-900">{step.title}</div>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                  <DirectionalArrow
                    className="w-4 h-4 text-slate-400 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </Surface>
        </div>

        {/* Secondary Column (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent Media Sources */}
          <Surface padding="none">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <h2 className="text-base font-semibold text-slate-900">
                {copy.dashboard.mediaRecentTitle}
              </h2>
              <button
                type="button"
                onClick={() => navigateTo('queue')}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {locale === 'fa' ? 'صف پردازش' : 'View Queue'}
              </button>
            </div>
            {loading ? (
              <div className="p-6">
                <LoadingSkeleton rows={2} />
              </div>
            ) : (
              <EmptyState
                icon={<FileAudio className="w-5 h-5" aria-hidden="true" />}
                title={copy.dashboard.mediaRecentEmptyTitle}
                description={copy.dashboard.mediaRecentEmptyDesc}
                actionLabel={copy.newImportCta}
                onAction={() => navigateTo('import')}
              />
            )}
          </Surface>

          {/* Mixed-Script Bilingual Typography Verification */}
          <Surface padding="md" className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-slate-900">
                  {copy.dashboard.bilingualPreviewTitle}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {copy.dashboard.bilingualPreviewDesc}
                </p>
              </div>
              <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-1" aria-hidden="true" />
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <MixedText script="en" className="text-base font-semibold text-slate-900">
                  get the hang of something
                </MixedText>
                <MixedText script="ipa" className="text-xs">
                  /ɡɛt ðə hæŋ əv ˈsʌmθɪŋ/
                </MixedText>
              </div>

              <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5">
                <span>Idiom</span>
                <span aria-hidden="true">·</span>
                <span>CEFR B2</span>
                <span aria-hidden="true">·</span>
                <MixedText script="ipa" className="text-xs">
                  01:42
                </MixedText>
              </div>

              <MixedText script="fa" as="p" className="text-sm font-medium text-slate-800 leading-relaxed">
                قلق کاری را به دست آوردن؛ مهارت پیدا کردن در انجام کاری پس از تمرین
              </MixedText>

              <div className="pt-2 border-t border-slate-100 space-y-1">
                <MixedText script="en" as="p" className="text-xs text-slate-600 leading-relaxed">
                  “It takes a few sessions to get the hang of spaced repetition.”
                </MixedText>
                <MixedText script="fa" as="p" className="text-xs text-slate-500 leading-relaxed">
                  «چند جلسه زمان می‌برد تا قلق مرور زمان‌بندی‌شده دستتان بیاید.»
                </MixedText>
              </div>
            </div>
          </Surface>

          {/* Incremental Architecture Roadmap */}
          <Surface padding="none">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-baseline justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-900">
                {copy.dashboard.roadmapTitle}
              </h2>
              <span className="text-xs text-slate-500">{copy.dashboard.roadmapSubtitle}</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {ROADMAP_PHASES.map((item) => {
                const isCurrent = item.phase === 1;
                return (
                  <li
                    key={item.phase}
                    className="px-5 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono text-slate-400 tabular-nums shrink-0">
                        {formatLocaleNumber(item.phase, locale).padStart(2, '0')}
                      </span>
                      <span
                        className={[
                          'truncate',
                          isCurrent ? 'font-semibold text-slate-900' : 'text-slate-600',
                        ].join(' ')}
                      >
                        {locale === 'fa' ? item.fa : item.en}
                      </span>
                    </div>
                    <span
                      className={[
                        'shrink-0 whitespace-nowrap',
                        isCurrent ? 'font-semibold text-blue-700' : 'text-slate-400',
                      ].join(' ')}
                    >
                      {isCurrent
                        ? locale === 'fa'
                          ? 'در حال اجرا'
                          : 'Active'
                        : locale === 'fa'
                          ? 'در صف توسعه'
                          : 'Planned'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Surface>
        </div>
      </div>
    </div>
  );
};
