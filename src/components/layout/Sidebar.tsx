import React from 'react';
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, UserRound } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MODULE_ROUTES, NAV_GROUPS } from '../../types/navigation';
import { getModuleIcon } from './moduleIcons';

export const Sidebar: React.FC = () => {
  const {
    activeModule,
    navigateTo,
    locale,
    direction,
    copy,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useApp();

  const CollapseIcon =
    direction === 'rtl'
      ? sidebarCollapsed
        ? PanelRightOpen
        : PanelRightClose
      : sidebarCollapsed
        ? PanelLeftOpen
        : PanelLeftClose;

  return (
    <aside
      aria-label="Primary Sidebar Navigation"
      className={[
        'hidden lg:flex flex-col shrink-0 bg-white border-e border-slate-200',
        'sticky top-0 h-screen transition-[width] duration-150',
        sidebarCollapsed ? 'w-[72px]' : 'w-64',
      ].join(' ')}
    >
      {/* Brand header */}
      <div
        className={[
          'h-14 flex items-center border-b border-slate-200 px-4 shrink-0',
          sidebarCollapsed ? 'justify-center' : 'justify-between gap-2',
        ].join(' ')}
      >
        {!sidebarCollapsed && (
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2.5 text-start cursor-pointer min-w-0"
          >
            <span className="w-7 h-7 rounded-lg bg-blue-700 text-white font-semibold text-sm flex items-center justify-center shrink-0">
              L
            </span>
            <span className="text-base font-semibold tracking-tight text-slate-900 whitespace-nowrap truncate">
              {copy.brandName}
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label={sidebarCollapsed ? copy.expandSidebar : copy.collapseSidebar}
          title={sidebarCollapsed ? copy.expandSidebar : copy.collapseSidebar}
          className="w-9 h-9 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <CollapseIcon className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Navigation groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.id} className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-2.5 pb-1 text-[11px] font-medium text-slate-400">
                {locale === 'fa' ? group.labelFa : group.labelEn}
              </div>
            )}
            <ul className="space-y-0.5">
              {group.modules.map((moduleId) => {
                const meta = MODULE_ROUTES[moduleId];
                const isActive = activeModule === moduleId;
                const label = locale === 'fa' ? meta.titleFa : meta.titleEn;

                return (
                  <li key={moduleId}>
                    <button
                      type="button"
                      onClick={() => navigateTo(moduleId)}
                      title={sidebarCollapsed ? label : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'w-full flex items-center rounded-lg text-sm transition-colors cursor-pointer min-h-[40px]',
                        sidebarCollapsed ? 'justify-center px-2' : 'gap-2.5 px-2.5',
                        isActive
                          ? 'bg-blue-50 text-blue-800 font-medium'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
                      ].join(' ')}
                    >
                      <span className={isActive ? 'text-blue-700' : 'text-slate-500'}>
                        {getModuleIcon(moduleId, 'w-4 h-4 shrink-0')}
                      </span>
                      {!sidebarCollapsed && (
                        <span className="truncate whitespace-nowrap">{label}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Honest Workspace Auth Readiness Footer */}
      <div className="border-t border-slate-200 p-3 shrink-0">
        <button
          type="button"
          onClick={() => navigateTo('settings')}
          className={[
            'w-full flex items-center rounded-lg p-2 text-start hover:bg-slate-50 transition-colors cursor-pointer',
            sidebarCollapsed ? 'justify-center' : 'gap-2.5',
          ].join(' ')}
          title={copy.authStatusTitle}
        >
          <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <UserRound className="w-4 h-4" aria-hidden="true" />
          </span>
          {!sidebarCollapsed && (
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-slate-900 truncate">
                {copy.authStatusTitle}
              </span>
              <span className="block text-[11px] text-slate-500 truncate">
                {copy.authUnconfiguredDesc}
              </span>
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
