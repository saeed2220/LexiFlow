import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { LexiFlowRepositories } from '../repositories/interfaces';
import { unconfiguredRepositories } from '../repositories/unconfiguredRepository';
import { getDirectionForLocale, UI_COPY, type UiDictionary } from '../services/i18n';
import type { AppDirection, AppLocale } from '../types/models';
import { MODULE_ROUTES, parseModuleFromHash, type ModuleId } from '../types/navigation';

interface AppContextValue {
  activeModule: ModuleId;
  navigateTo: (moduleId: ModuleId) => void;
  locale: AppLocale;
  direction: AppDirection;
  setLocale: (locale: AppLocale) => void;
  toggleLocale: () => void;
  copy: UiDictionary;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
  dailyReviewGoal: number;
  setDailyReviewGoal: (goal: number) => void;
  repositories: LexiFlowRepositories;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModule] = useState<ModuleId>(() => {
    if (typeof window === 'undefined') return 'dashboard';
    return parseModuleFromHash(window.location.hash);
  });

  const [locale, setLocaleState] = useState<AppLocale>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem('lexiflow_locale');
    return saved === 'fa' ? 'fa' : 'en';
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [dailyReviewGoal, setDailyReviewGoalState] = useState<number>(() => {
    if (typeof window === 'undefined') return 20;
    const saved = Number(window.localStorage.getItem('lexiflow_daily_goal'));
    return Number.isFinite(saved) && saved >= 5 && saved <= 200 ? saved : 20;
  });

  const direction = useMemo(() => getDirectionForLocale(locale), [locale]);
  const copy = useMemo(() => UI_COPY[locale], [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
    window.localStorage.setItem('lexiflow_locale', locale);
  }, [locale, direction]);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveModule(parseModuleFromHash(window.location.hash));
      setMobileDrawerOpen(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback((moduleId: ModuleId) => {
    const targetHash = MODULE_ROUTES[moduleId].path;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setActiveModule(moduleId);
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const setLocale = useCallback((nextLocale: AppLocale) => {
    setLocaleState(nextLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'fa' : 'en'));
  }, []);

  const setDailyReviewGoal = useCallback((goal: number) => {
    const clamped = Math.min(200, Math.max(5, Math.round(goal)));
    setDailyReviewGoalState(clamped);
    window.localStorage.setItem('lexiflow_daily_goal', String(clamped));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      activeModule,
      navigateTo,
      locale,
      direction,
      setLocale,
      toggleLocale,
      copy,
      sidebarCollapsed,
      setSidebarCollapsed,
      mobileDrawerOpen,
      setMobileDrawerOpen,
      dailyReviewGoal,
      setDailyReviewGoal,
      repositories: unconfiguredRepositories,
    }),
    [
      activeModule,
      navigateTo,
      locale,
      direction,
      setLocale,
      toggleLocale,
      copy,
      sidebarCollapsed,
      mobileDrawerOpen,
      dailyReviewGoal,
      setDailyReviewGoal,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
}
