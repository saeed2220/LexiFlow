import React from 'react';
import { LayoutGrid, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOBILE_PRIMARY_TABS, MODULE_ROUTES, NAV_GROUPS } from '../../types/navigation';
import { getModuleIcon } from './moduleIcons';

export const MobileNav: React.FC = () => {
  const {
    activeModule,
    navigateTo,
    locale,
    copy,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    setLocale,
  } = useApp();

  const isDrawerTabActive = !MOBILE_PRIMARY_TABS.includes(activeModule);

  return (
    <>
      {/* Fixed Bottom Tab Bar for Mobile & Tablet (< lg) — 56px tall to respect 15% sticky cap */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-white/95 backdrop-blur-md border-t border-slate-200 px-1"
      >
        <div className="grid grid-cols-5 h-full max-w-xl mx-auto">
          {MOBILE_PRIMARY_TABS.map((moduleId) => {
            const meta = MODULE_ROUTES[moduleId];
            const isActive = activeModule === moduleId;
            const shortLabel = locale === 'fa' ? meta.shortTitleFa : meta.shortTitleEn;

            return (
              <button
                key={moduleId}
                type="button"
                onClick={() => navigateTo(moduleId)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex flex-col items-center justify-center gap-0.5 min-h-[44px] rounded-lg transition-colors cursor-pointer',
                  isActive ? 'text-blue-700 font-medium' : 'text-slate-500 hover:text-slate-900',
                ].join(' ')}
              >
                {getModuleIcon(moduleId, 'w-5 h-5')}
                <span className="text-[11px] leading-none whitespace-nowrap truncate max-w-[68px]">
                  {shortLabel}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-expanded={mobileDrawerOpen}
            className={[
              'flex flex-col items-center justify-center gap-0.5 min-h-[44px] rounded-lg transition-colors cursor-pointer',
              isDrawerTabActive || mobileDrawerOpen
                ? 'text-blue-700 font-medium'
                : 'text-slate-500 hover:text-slate-900',
            ].join(' ')}
          >
            <LayoutGrid className="w-5 h-5" aria-hidden="true" />
            <span className="text-[11px] leading-none whitespace-nowrap">
              {copy.moreModules}
            </span>
          </button>
        </div>
      </nav>

      {/* Slide-up Bottom Sheet containing all 12 modules */}
      {mobileDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={copy.moreModules}
        >
          <div
            className="flex-1"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="bg-white rounded-t-2xl border-t border-slate-200 max-h-[82vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-blue-700 text-white text-xs font-semibold flex items-center justify-center">
                  L
                </span>
                <span className="text-sm font-semibold text-slate-900">{copy.brandName}</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label={copy.closeMenu}
                className="min-w-[44px] min-h-[44px] -me-2 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-5">
              {/* Bilingual Mode Switcher inside Mobile Sheet */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <span className="text-xs font-medium text-slate-600">{copy.languageLabel}</span>
                <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setLocale('en')}
                    className={[
                      'px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer min-h-[36px]',
                      locale === 'en'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900',
                    ].join(' ')}
                  >
                    EN · LTR
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocale('fa')}
                    className={[
                      'px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer min-h-[36px] font-fa',
                      locale === 'fa'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900',
                    ].join(' ')}
                  >
                    فارسی · RTL
                  </button>
                </div>
              </div>

              {NAV_GROUPS.map((group) => (
                <div key={group.id} className="space-y-1.5">
                  <div className="px-2 text-xs font-medium text-slate-400">
                    {locale === 'fa' ? group.labelFa : group.labelEn}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {group.modules.map((moduleId) => {
                      const meta = MODULE_ROUTES[moduleId];
                      const isActive = activeModule === moduleId;
                      return (
                        <button
                          key={moduleId}
                          type="button"
                          onClick={() => navigateTo(moduleId)}
                          className={[
                            'flex items-center gap-3 px-3 min-h-[44px] rounded-xl text-sm text-start transition-colors cursor-pointer',
                            isActive
                              ? 'bg-blue-50 text-blue-800 font-medium'
                              : 'text-slate-700 hover:bg-slate-100',
                          ].join(' ')}
                        >
                          <span className={isActive ? 'text-blue-700' : 'text-slate-500'}>
                            {getModuleIcon(moduleId, 'w-4 h-4 shrink-0')}
                          </span>
                          <span className="truncate">
                            {locale === 'fa' ? meta.titleFa : meta.titleEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
