import React from 'react';
import {
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckSquare,
  Clapperboard,
  FolderKanban,
  LayoutDashboard,
  ListChecks,
  Settings,
  Sparkles,
  Upload,
} from 'lucide-react';
import type { ModuleId } from '../../types/navigation';

export function getModuleIcon(moduleId: ModuleId, className = 'w-4 h-4'): React.ReactNode {
  switch (moduleId) {
    case 'dashboard':
      return <LayoutDashboard className={className} aria-hidden="true" />;
    case 'import':
      return <Upload className={className} aria-hidden="true" />;
    case 'queue':
      return <ListChecks className={className} aria-hidden="true" />;
    case 'review':
      return <CheckSquare className={className} aria-hidden="true" />;
    case 'library':
      return <BookOpen className={className} aria-hidden="true" />;
    case 'decks':
      return <FolderKanban className={className} aria-hidden="true" />;
    case 'study':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'srs':
      return <BrainCircuit className={className} aria-hidden="true" />;
    case 'studio':
      return <Clapperboard className={className} aria-hidden="true" />;
    case 'tutor':
      return <Bot className={className} aria-hidden="true" />;
    case 'analytics':
      return <BarChart3 className={className} aria-hidden="true" />;
    case 'settings':
      return <Settings className={className} aria-hidden="true" />;
  }
}
