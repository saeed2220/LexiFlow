/**
 * Navigation definitions for all 12 LexiFlow application modules.
 */

export type ModuleId =
  | 'dashboard'
  | 'import'
  | 'queue'
  | 'review'
  | 'library'
  | 'decks'
  | 'study'
  | 'srs'
  | 'studio'
  | 'tutor'
  | 'analytics'
  | 'settings';

export type NavGroupId = 'overview' | 'acquire' | 'study' | 'practice' | 'system';

export interface ModuleRouteMeta {
  id: ModuleId;
  group: NavGroupId;
  path: string;
  titleEn: string;
  titleFa: string;
  shortTitleEn: string;
  shortTitleFa: string;
  descriptionEn: string;
  descriptionFa: string;
  plannedPhase: number;
}

export const MODULE_ROUTES: Record<ModuleId, ModuleRouteMeta> = {
  dashboard: {
    id: 'dashboard',
    group: 'overview',
    path: '#/dashboard',
    titleEn: 'Dashboard',
    titleFa: 'داشبورد',
    shortTitleEn: 'Home',
    shortTitleFa: 'خانه',
    descriptionEn: 'Daily study queue, vocabulary progress, and recent media activity.',
    descriptionFa: 'صف مطالعه روزانه، پیشرفت واژگان و فعالیت‌های اخیر رسانه.',
    plannedPhase: 1,
  },
  import: {
    id: 'import',
    group: 'acquire',
    path: '#/import',
    titleEn: 'Import Center',
    titleFa: 'مرکز ورود محتوا',
    shortTitleEn: 'Import',
    shortTitleFa: 'ورود محتوا',
    descriptionEn: 'Import video/audio URLs, media files, SRT/VTT subtitles, or transcripts.',
    descriptionFa: 'افزودن لینک ویدیو یا صوت، فایل رسانه‌ای، زیرنویس یا متن.',
    plannedPhase: 3,
  },
  queue: {
    id: 'queue',
    group: 'acquire',
    path: '#/queue',
    titleEn: 'Processing Queue',
    titleFa: 'صف پردازش',
    shortTitleEn: 'Queue',
    shortTitleFa: 'صف پردازش',
    descriptionEn: 'Track media transcription and AI vocabulary extraction jobs.',
    descriptionFa: 'پیگیری وضعیت پیاده‌سازی متن و استخراج هوشمند واژگان.',
    plannedPhase: 3,
  },
  review: {
    id: 'review',
    group: 'acquire',
    path: '#/review',
    titleEn: 'Vocabulary Review',
    titleFa: 'بازبینی واژگان',
    shortTitleEn: 'Review',
    shortTitleFa: 'بازبینی',
    descriptionEn: 'Verify, edit, and approve extracted expressions before deck creation.',
    descriptionFa: 'بررسی، ویرایش و تایید عبارات استخراج‌شده پیش از ساخت فلش‌کارت.',
    plannedPhase: 5,
  },
  library: {
    id: 'library',
    group: 'study',
    path: '#/library',
    titleEn: 'My Vocabulary Library',
    titleFa: 'کتابخانه واژگان من',
    shortTitleEn: 'Library',
    shortTitleFa: 'کتابخانه',
    descriptionEn: 'Search and organize words, phrasal verbs, idioms, and collocations.',
    descriptionFa: 'جستجو و مدیریت لغات، افعال عبارتی، اصطلاحات و همایندها.',
    plannedPhase: 5,
  },
  decks: {
    id: 'decks',
    group: 'study',
    path: '#/decks',
    titleEn: 'Deck Management',
    titleFa: 'مدیریت دسته‌ها',
    shortTitleEn: 'Decks',
    shortTitleFa: 'دسته‌ها',
    descriptionEn: 'Create and organize themed flashcard decks for targeted study.',
    descriptionFa: 'ایجاد و دسته‌بندی بسته‌های فلش‌کارت برای مرور هدفمند.',
    plannedPhase: 6,
  },
  study: {
    id: 'study',
    group: 'study',
    path: '#/study',
    titleEn: 'Flashcard Study',
    titleFa: 'مطالعه فلش‌کارت',
    shortTitleEn: 'Study',
    shortTitleFa: 'مطالعه',
    descriptionEn: 'Interactive flashcard sessions with audio pronunciation and Persian glosses.',
    descriptionFa: 'جلسات مطالعه فلش‌کارت همراه با تلفظ صوتی و معنای فارسی.',
    plannedPhase: 6,
  },
  srs: {
    id: 'srs',
    group: 'study',
    path: '#/srs',
    titleEn: 'Spaced Repetition Review',
    titleFa: 'مرور زمان‌بندی‌شده',
    shortTitleEn: 'SRS Review',
    shortTitleFa: 'مرور FSRS',
    descriptionEn: 'FSRS-scheduled due cards with memory stability and difficulty tracking.',
    descriptionFa: 'مرور کارت‌های سررسید با الگوریتم FSRS و تنظیم فاصله یادآوری.',
    plannedPhase: 6,
  },
  studio: {
    id: 'studio',
    group: 'practice',
    path: '#/studio',
    titleEn: 'Video & Audio Learning Studio',
    titleFa: 'استودیو یادگیری صوت و تصویر',
    shortTitleEn: 'Studio',
    shortTitleFa: 'استودیو',
    descriptionEn: 'Synchronized transcript player with one-click expression capture.',
    descriptionFa: 'پخش‌کننده همگام با متن و ثبت فوری اصطلاحات حین تماشا.',
    plannedPhase: 7,
  },
  tutor: {
    id: 'tutor',
    group: 'practice',
    path: '#/tutor',
    titleEn: 'AI Tutor',
    titleFa: 'معلم هوشمند',
    shortTitleEn: 'AI Tutor',
    shortTitleFa: 'معلم هوشمند',
    descriptionEn: 'Contextual usage explanations, collocation drills, and Persian guidance.',
    descriptionFa: 'توضیح کاربرد در بافت جمله، تمرین جملهسازی و راهنمایی فارسی.',
    plannedPhase: 7,
  },
  analytics: {
    id: 'analytics',
    group: 'practice',
    path: '#/analytics',
    titleEn: 'Progress & Analytics',
    titleFa: 'پیشرفت و تحلیل',
    shortTitleEn: 'Analytics',
    shortTitleFa: 'تحلیل‌ها',
    descriptionEn: 'Retention curves, CEFR coverage, and daily learning consistency.',
    descriptionFa: 'نمودارهای ماندگاری در حافظه، پوشش سطوح CEFR و تداوم مطالعه.',
    plannedPhase: 8,
  },
  settings: {
    id: 'settings',
    group: 'system',
    path: '#/settings',
    titleEn: 'Settings',
    titleFa: 'تنظیمات',
    shortTitleEn: 'Settings',
    shortTitleFa: 'تنظیمات',
    descriptionEn: 'Language direction, study goals, account security, and PWA preferences.',
    descriptionFa: 'جهت و زبان رابط، اهداف مطالعه، تنظیمات حساب و نصب اپلیکیشن.',
    plannedPhase: 1,
  },
};

export const NAV_GROUPS: Array<{
  id: NavGroupId;
  labelEn: string;
  labelFa: string;
  modules: ModuleId[];
}> = [
  {
    id: 'overview',
    labelEn: 'Overview',
    labelFa: 'نمای کلی',
    modules: ['dashboard'],
  },
  {
    id: 'acquire',
    labelEn: 'Acquire',
    labelFa: 'استخراج محتوا',
    modules: ['import', 'queue', 'review'],
  },
  {
    id: 'study',
    labelEn: 'Library & SRS',
    labelFa: 'کتابخانه و مرور',
    modules: ['library', 'decks', 'study', 'srs'],
  },
  {
    id: 'practice',
    labelEn: 'Practice & Insights',
    labelFa: 'تمرین و تحلیل',
    modules: ['studio', 'tutor', 'analytics'],
  },
  {
    id: 'system',
    labelEn: 'Preferences',
    labelFa: 'پیکربندی',
    modules: ['settings'],
  },
];

export const MOBILE_PRIMARY_TABS: ModuleId[] = ['dashboard', 'import', 'srs', 'library'];

export function parseModuleFromHash(hash: string): ModuleId {
  const cleaned = hash.replace(/^#\/?/, '').split('?')[0].trim().toLowerCase();
  if (cleaned && cleaned in MODULE_ROUTES) {
    return cleaned as ModuleId;
  }
  return 'dashboard';
}
