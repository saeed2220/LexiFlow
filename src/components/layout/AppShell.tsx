import React from 'react';
import { Languages, Menu, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MODULE_ROUTES } from '../../types/navigation';
import { Button } from '../ui/Button';
import { MobileNav } from './MobileNav';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const {
    activeModule,
    navigateTo,
    locale,
    toggleLocale,
    copy,
    setMobileDrawerOpen,
  } = useApp();

  const currentRoute = MODULE_ROUTES[activeModule];
  const currentTitle = locale === 'fa' ? currentRoute.titleFa : currentRoute.titleEn;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-700 focus:text-white focus:rounded-lg focus:text-sm"
      >
        {copy.skipToContent}
      </a>

      <Sidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar: 48px on mobile (respects 15% sticky budget with bottom bar), 56px on desktop */}
        <header className="sticky top-0 z-30 h-12 lg:h-14 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left / Start Zone */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              aria-label={copy.openMenu}
              className="lg:hidden min-w-[44px] min-h-[44px] -ms-2 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer shrink-0"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2 min-w-0 text-sm">
              <button
                type="button"
                onClick={() => navigateTo('dashboard')}
                className="hidden sm:inline font-medium text-slate-500 hover:text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copy.brandName}
              </button>
              <span className="hidden sm:inline text-slate-300" aria-hidden="true">
                /
              </span>
              <span className="font-semibold text-slate-900 truncate whitespace-nowrap">
                {currentTitle}
              </span>
            </div>
          </div>

          {/* Right / End Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={copy.languageLabel}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              <Languages className="w-4 h-4 text-slate-500" aria-hidden="true" />
              <span className={locale === 'en' ? 'font-fa' : 'font-en'}>
                {locale === 'en' ? 'فارسی' : 'English'}
              </span>
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigateTo('import')}
              className="hidden sm:inline-flex"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{copy.newImportCta}</span>
            </Button>
          </div>
        </header>

        {/* Main Scrollable Viewport */}
        <main
          id="main-content"
          className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-10"
        >
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
};
