import React from 'react';
import { Database, Languages, SlidersHorizontal } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Surface } from '../components/ui/Surface';
import { useApp } from '../context/AppContext';
import { formatLocaleNumber } from '../services/i18n';
import { MODULE_ROUTES } from '../types/navigation';

export const SettingsPage: React.FC = () => {
  const {
    locale,
    setLocale,
    copy,
    sidebarCollapsed,
    setSidebarCollapsed,
    dailyReviewGoal,
    setDailyReviewGoal,
    repositories,
  } = useApp();

  const meta = MODULE_ROUTES.settings;
  const isBackendConfigured = repositories.auth.isConfigured();

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        breadcrumb={`${copy.brandName} / ${locale === 'fa' ? meta.titleFa : meta.titleEn}`}
        title={locale === 'fa' ? meta.titleFa : meta.titleEn}
        description={locale === 'fa' ? meta.descriptionFa : meta.descriptionEn}
      />

      {/* Language & Direction */}
      <Surface padding="md" className="space-y-5">
        <div className="flex items-start gap-3">
          <Languages className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-slate-900">
              {copy.settings.appearanceTitle}
            </h2>
            <p className="text-sm text-slate-500">{copy.settings.appearanceDesc}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 max-w-md">
            <div className="text-sm font-medium text-slate-900">
              {copy.settings.interfaceLanguage}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {copy.settings.interfaceLanguageHelp}
            </p>
          </div>

          <div
            role="group"
            aria-label={copy.settings.interfaceLanguage}
            className="inline-flex items-center p-1 bg-slate-100 rounded-lg shrink-0 self-start sm:self-auto"
          >
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={[
                'px-3.5 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer min-h-[40px] whitespace-nowrap',
                locale === 'en'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900',
              ].join(' ')}
            >
              {copy.switchToEn}
            </button>
            <button
              type="button"
              onClick={() => setLocale('fa')}
              className={[
                'px-3.5 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer min-h-[40px] whitespace-nowrap font-fa',
                locale === 'fa'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900',
              ].join(' ')}
            >
              {copy.switchToFa}
            </button>
          </div>
        </div>
      </Surface>

      {/* Study & Layout Preferences */}
      <Surface padding="md" className="space-y-5">
        <div className="flex items-start gap-3">
          <SlidersHorizontal className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-slate-900">
              {copy.settings.layoutDensity}
            </h2>
            <p className="text-sm text-slate-500">{copy.settings.dailyGoalHelp}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-5">
          {/* Daily Goal Slider with explicit label, numeric value, and unit */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label htmlFor="daily-goal-range" className="text-sm font-medium text-slate-900">
              {copy.settings.dailyGoal}:{' '}
              <span className="font-mono tabular-nums text-blue-700">
                {formatLocaleNumber(dailyReviewGoal, locale)} {copy.settings.cardsPerDay}
              </span>
            </label>
            <input
              id="daily-goal-range"
              type="range"
              min={5}
              max={100}
              step={5}
              value={dailyReviewGoal}
              onChange={(e) => setDailyReviewGoal(Number(e.target.value))}
              className="w-full sm:w-56 accent-blue-700 cursor-pointer"
            />
          </div>

          {/* Desktop Sidebar State */}
          <div className="hidden lg:flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <span className="text-sm font-medium text-slate-900">
              {copy.settings.sidebarState}
            </span>
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setSidebarCollapsed(false)}
                className={[
                  'px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer min-h-[36px]',
                  !sidebarCollapsed
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900',
                ].join(' ')}
              >
                {locale === 'fa' ? 'باز' : 'Expanded'}
              </button>
              <button
                type="button"
                onClick={() => setSidebarCollapsed(true)}
                className={[
                  'px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer min-h-[36px]',
                  sidebarCollapsed
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900',
                ].join(' ')}
              >
                {locale === 'fa' ? 'جمع‌شده' : 'Collapsed'}
              </button>
            </div>
          </div>
        </div>
      </Surface>

      {/* Repository & Auth Readiness */}
      <Surface padding="md" className="space-y-3">
        <div className="flex items-start gap-3">
          <Database className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-slate-900">
              {copy.settings.backendStatusTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {copy.settings.backendStatusDesc}
            </p>
            <p className="text-xs font-medium text-slate-500 pt-1">
              {locale === 'fa' ? 'وضعیت اتصال:' : 'Connection state:'}{' '}
              <span className="text-amber-700 font-semibold">
                {isBackendConfigured
                  ? locale === 'fa'
                    ? 'متصل'
                    : 'Connected'
                  : locale === 'fa'
                    ? 'در انتظار فاز ۲ (Firebase Auth & Firestore)'
                    : 'Awaiting Phase 2 (Firebase Auth & Firestore)'}
              </span>
            </p>
          </div>
        </div>
      </Surface>
    </div>
  );
};
