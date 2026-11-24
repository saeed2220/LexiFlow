import React from 'react';
import { AppShell } from './components/layout/AppShell';
import { AppProvider, useApp } from './context/AppContext';
import { DashboardPage } from './pages/DashboardPage';
import { ModuleScaffoldPage } from './pages/ModuleScaffoldPage';
import { SettingsPage } from './pages/SettingsPage';

const ActiveModuleView: React.FC = () => {
  const { activeModule } = useApp();

  if (activeModule === 'dashboard') {
    return <DashboardPage />;
  }

  if (activeModule === 'settings') {
    return <SettingsPage />;
  }

  return <ModuleScaffoldPage moduleId={activeModule} />;
};

export default function App() {
  return (
    <AppProvider>
      <AppShell>
        <ActiveModuleView />
      </AppShell>
    </AppProvider>
  );
}
