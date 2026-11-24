import React from 'react';
import { getModuleIcon } from '../components/layout/moduleIcons';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { PageHeader } from '../components/ui/PageHeader';
import { Surface } from '../components/ui/Surface';
import { useApp } from '../context/AppContext';
import { formatLocaleNumber } from '../services/i18n';
import { MODULE_ROUTES, type ModuleId } from '../types/navigation';

interface ModuleScaffoldPageProps {
  moduleId: Exclude<ModuleId, 'dashboard' | 'settings'>;
}

/**
 * Clean workspace shell for modules scheduled in Phases 2–8.
 * Provides consistent PageHeader, Phase readiness context, and zero dead controls.
 */
export const ModuleScaffoldPage: React.FC<ModuleScaffoldPageProps> = ({ moduleId }) => {
  const { locale, copy, navigateTo } = useApp();
  const meta = MODULE_ROUTES[moduleId];

  const title = locale === 'fa' ? meta.titleFa : meta.titleEn;
  const description = locale === 'fa' ? meta.descriptionFa : meta.descriptionEn;
  const phaseFormatted = formatLocaleNumber(meta.plannedPhase, locale);

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={`${copy.brandName} / ${title}`}
        title={title}
        description={description}
        action={
          <Button variant="outline" size="sm" onClick={() => navigateTo('dashboard')}>
            {copy.moduleScaffold.returnDashboard}
          </Button>
        }
      />

      <Surface padding="lg">
        <EmptyState
          icon={getModuleIcon(moduleId, 'w-5 h-5')}
          title={`${copy.moduleScaffold.phaseLabel} ${phaseFormatted} · ${copy.moduleScaffold.phase1NoticeTitle}`}
          description={copy.moduleScaffold.phase1NoticeBody}
          actionLabel={copy.moduleScaffold.returnDashboard}
          onAction={() => navigateTo('dashboard')}
          secondaryLabel={copy.moduleScaffold.openSettings}
          onSecondaryAction={() => navigateTo('settings')}
        />
      </Surface>
    </div>
  );
};
