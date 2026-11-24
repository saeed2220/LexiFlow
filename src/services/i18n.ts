import type { AppDirection, AppLocale } from '../types/models';

export function getDirectionForLocale(locale: AppLocale): AppDirection {
  return locale === 'fa' ? 'rtl' : 'ltr';
}

/**
 * Formats numbers using locale-appropriate numerals while preserving Latin digits
 * in English mode and Persian digits in Persian mode.
 */
export function formatLocaleNumber(value: number, locale: AppLocale): string {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(value);
}

export interface UiDictionary {
  brandName: string;
  brandSubtitle: string;
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  moreModules: string;
  collapseSidebar: string;
  expandSidebar: string;
  languageLabel: string;
  switchToEn: string;
  switchToFa: string;
  newImportCta: string;
  startStudyCta: string;
  authStatusTitle: string;
  authUnconfiguredDesc: string;
  dashboard: {
    welcomeHeading: string;
    welcomeLead: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: {
      dueCards: string;
      dueCardsHint: string;
      approvedWords: string;
      approvedWordsHint: string;
      mediaSources: string;
      mediaSourcesHint: string;
      studyTime: string;
      studyTimeHint: string;
      minutesUnit: string;
    };
    studyQueueTitle: string;
    studyQueueEmptyTitle: string;
    studyQueueEmptyDesc: string;
    mediaRecentTitle: string;
    mediaRecentEmptyTitle: string;
    mediaRecentEmptyDesc: string;
    workflowTitle: string;
    workflowSteps: Array<{ title: string; detail: string; moduleId: 'import' | 'review' | 'srs' | 'studio' }>;
    roadmapTitle: string;
    roadmapSubtitle: string;
    bilingualPreviewTitle: string;
    bilingualPreviewDesc: string;
  };
  settings: {
    appearanceTitle: string;
    appearanceDesc: string;
    interfaceLanguage: string;
    interfaceLanguageHelp: string;
    layoutDensity: string;
    sidebarState: string;
    dailyGoal: string;
    dailyGoalHelp: string;
    cardsPerDay: string;
    backendStatusTitle: string;
    backendStatusDesc: string;
  };
  moduleScaffold: {
    phaseLabel: string;
    phase1NoticeTitle: string;
    phase1NoticeBody: string;
    returnDashboard: string;
    openSettings: string;
  };
}

export const UI_COPY: Record<AppLocale, UiDictionary> = {
  en: {
    brandName: 'LexiFlow',
    brandSubtitle: 'Vocabulary & SRS',
    skipToContent: 'Skip to main content',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    moreModules: 'Modules',
    collapseSidebar: 'Collapse sidebar',
    expandSidebar: 'Expand sidebar',
    languageLabel: 'Interface Language',
    switchToEn: 'English (LTR)',
    switchToFa: 'فارسی (RTL)',
    newImportCta: 'Import Media',
    startStudyCta: 'Review Due Cards',
    authStatusTitle: 'Guest Workspace',
    authUnconfiguredDesc: 'Cloud sync & sign-in connect in Phase 2.',
    dashboard: {
      welcomeHeading: 'Build lasting English fluency from real media',
      welcomeLead:
        'Extract expressions, phrasal verbs, idioms, and collocations from videos, audio, and transcripts into Persian-supported FSRS flashcards.',
      primaryCta: 'Open Import Center',
      secondaryCta: 'Explore Study Modules',
      metrics: {
        dueCards: 'Due Flashcards',
        dueCardsHint: 'Scheduled by FSRS',
        approvedWords: 'Vocabulary Library',
        approvedWordsHint: 'Approved expressions',
        mediaSources: 'Media Sources',
        mediaSourcesHint: 'Videos, audio & texts',
        studyTime: 'Study Time Today',
        studyTimeHint: 'Active review duration',
        minutesUnit: 'min',
      },
      studyQueueTitle: 'Daily Spaced Repetition Queue',
      studyQueueEmptyTitle: 'No flashcards scheduled yet',
      studyQueueEmptyDesc:
        'Once you import media and approve extracted expressions, your due FSRS flashcards will appear here for daily practice.',
      mediaRecentTitle: 'Recent Media Sources',
      mediaRecentEmptyTitle: 'No media imported yet',
      mediaRecentEmptyDesc:
        'Video links, audio recordings, SRT/VTT subtitles, and transcripts you process will be listed here.',
      workflowTitle: 'Learning Pipeline',
      workflowSteps: [
        {
          title: 'Import Center',
          detail: 'Add video/audio URLs, local media files, SRT/VTT subtitles, or transcripts.',
          moduleId: 'import',
        },
        {
          title: 'Vocabulary Review',
          detail: 'Inspect extracted idioms, collocations, IPA, and Persian meanings before saving.',
          moduleId: 'review',
        },
        {
          title: 'Spaced Repetition Review',
          detail: 'Practice due cards using FSRS memory stability and difficulty scheduling.',
          moduleId: 'srs',
        },
        {
          title: 'Learning Studio',
          detail: 'Study with synchronized transcripts, playback timestamps, and AI Tutor context.',
          moduleId: 'studio',
        },
      ],
      roadmapTitle: 'Platform Architecture Status',
      roadmapSubtitle: 'Incremental build foundation',
      bilingualPreviewTitle: 'Bilingual Typography Verification',
      bilingualPreviewDesc:
        'Mixed English (Inter) and Persian (Vazirmatn) rendering with strict directional isolation.',
    },
    settings: {
      appearanceTitle: 'Language & Direction',
      appearanceDesc: 'Switch between English (LTR) and Persian (RTL) across the entire workspace.',
      interfaceLanguage: 'Interface Language & Layout Direction',
      interfaceLanguageHelp:
        'English expressions, IPA phonetics, and example sentences automatically preserve left-to-right alignment even in Persian RTL mode.',
      layoutDensity: 'Navigation Layout',
      sidebarState: 'Desktop Sidebar',
      dailyGoal: 'Daily Study Target',
      dailyGoalHelp: 'Stored locally in Phase 1; synchronized to your Firestore user profile in Phase 2.',
      cardsPerDay: 'cards / day',
      backendStatusTitle: 'Authentication & Database Connection',
      backendStatusDesc:
        'Firebase Authentication and Cloud Firestore repositories are decoupled behind typed interfaces and ready for Phase 2 provisioning.',
    },
    moduleScaffold: {
      phaseLabel: 'Scheduled for Phase',
      phase1NoticeTitle: 'Module workspace shell ready',
      phase1NoticeBody:
        'Navigation routing, bilingual RTL/LTR layout, and strongly typed repository contracts are active. Domain data persistence and API pipelines will connect in the scheduled phase.',
      returnDashboard: 'Back to Dashboard',
      openSettings: 'Workspace Settings',
    },
  },
  fa: {
    brandName: 'LexiFlow',
    brandSubtitle: 'واژگان و مرور هوشمند',
    skipToContent: 'رفتن به محتوای اصلی',
    openMenu: 'باز کردن منوی ناوبری',
    closeMenu: 'بستن منوی ناوبری',
    moreModules: 'ماژول‌ها',
    collapseSidebar: 'جمع کردن منو',
    expandSidebar: 'باز کردن منو',
    languageLabel: 'زبان رابط کاربری',
    switchToEn: 'English (LTR)',
    switchToFa: 'فارسی (RTL)',
    newImportCta: 'ورود محتوا',
    startStudyCta: 'شروع مرور امروز',
    authStatusTitle: 'فضای کاری مهمان',
    authUnconfiguredDesc: 'ورود حساب و همگام‌سازی ابری در فاز ۲ متصل می‌شود.',
    dashboard: {
      welcomeHeading: 'تسلط ماندگار بر واژگان انگلیسی از دل محتوای واقعی',
      welcomeLead:
        'اصطلاحات، افعال عبارتی، همایندها و عبارات کاربردی را از ویدیو، پادکست و متن استخراج کنید و با ترجمه فارسی و الگوریتم FSRS به خاطر بسپارید.',
      primaryCta: 'ورود به مرکز محتوا',
      secondaryCta: 'مشاهده ماژول‌های یادگیری',
      metrics: {
        dueCards: 'کارت‌های آماده مرور',
        dueCardsHint: 'زمان‌بندی با FSRS',
        approvedWords: 'کتابخانه واژگان',
        approvedWordsHint: 'عبارات تایید شده',
        mediaSources: 'منابع رسانه‌ای',
        mediaSourcesHint: 'ویدیو، صوت و متن',
        studyTime: 'زمان مطالعه امروز',
        studyTimeHint: 'مدت مرور فعال',
        minutesUnit: 'دقیقه',
      },
      studyQueueTitle: 'صف مرور روزانه (Spaced Repetition)',
      studyQueueEmptyTitle: 'هنوز کارتی برای مرور زمان‌بندی نشده است',
      studyQueueEmptyDesc:
        'پس از افزودن منبع رسانه‌ای و تایید عبارات استخراج‌شده، کارت‌های سررسید شما برای مرور روزانه اینجا نمایش داده می‌شوند.',
      mediaRecentTitle: 'منابع رسانه‌ای اخیر',
      mediaRecentEmptyTitle: 'هنوز منبعی وارد نشده است',
      mediaRecentEmptyDesc:
        'لینک‌های ویدیو، فایل‌های صوتی، زیرنویس SRT/VTT و متن‌هایی که پردازش می‌کنید در این بخش فهرست می‌شوند.',
      workflowTitle: 'چرخه یادگیری',
      workflowSteps: [
        {
          title: 'مرکز ورود محتوا',
          detail: 'افزودن لینک ویدیو/صوت، فایل رسانه‌ای، زیرنویس SRT/VTT یا متن پیاده‌سازی‌شده.',
          moduleId: 'import',
        },
        {
          title: 'بازبینی واژگان',
          detail: 'بررسی اصطلاحات، همایندها، تلفظ IPA و معنای فارسی پیش از ذخیره نهایی.',
          moduleId: 'review',
        },
        {
          title: 'مرور زمان‌بندی‌شده',
          detail: 'تمرین کارت‌های سررسید با محاسبه پایداری و دشواری حافظه در الگوریتم FSRS.',
          moduleId: 'srs',
        },
        {
          title: 'استودیو یادگیری',
          detail: 'تماشا و شنیدن همگام با متن، ثبت سریع عبارت و تمرین با معلم هوشمند.',
          moduleId: 'studio',
        },
      ],
      roadmapTitle: 'وضعیت معماری پلتفرم',
      roadmapSubtitle: 'ساختار توسعه مرحله‌بندی‌شده',
      bilingualPreviewTitle: 'آزمون تایپوگرافی دوزبانه',
      bilingualPreviewDesc:
        'نمایش ترکیبی فونت فارسی وزیرمتن و فونت انگلیسی Inter با ایزوله‌سازی دقیق جهت متن.',
    },
    settings: {
      appearanceTitle: 'زبان و جهت نمایش',
      appearanceDesc: 'تغییر بین حالت انگلیسی (چپ‌به‌راست) و فارسی (راست‌به‌چین) در تمام بخش‌های برنامه.',
      interfaceLanguage: 'زبان رابط کاربری و جهت چیدمان',
      interfaceLanguageHelp:
        'عبارات انگلیسی، آوانگاری IPA و جملات مثال حتی در حالت راست‌به‌چین فارسی به‌صورت خودکار چپ‌به‌راست نمایش داده می‌شوند.',
      layoutDensity: 'چیدمان ناوبری',
      sidebarState: 'ستون کناری دسکتاپ',
      dailyGoal: 'هدف مطالعه روزانه',
      dailyGoalHelp: 'در فاز ۱ به‌صورت موقت نگهداری می‌شود و در فاز ۲ به پروفایل Firestore متصل خواهد شد.',
      cardsPerDay: 'کارت در روز',
      backendStatusTitle: 'وضعیت احراز هویت و پایگاه داده',
      backendStatusDesc:
        'لایه‌های مخزن داده (Repository) برای Firebase Auth و Cloud Firestore طراحی شده‌اند و آماده پیاده‌سازی در فاز ۲ هستند.',
    },
    moduleScaffold: {
      phaseLabel: 'برنامه‌ریزی شده برای فاز',
      phase1NoticeTitle: 'ساختار پایه این ماژول آماده است',
      phase1NoticeBody:
        'مسیریابی، چیدمان دوزبانه RTL/LTR و قراردادهای داده با تایپ‌اسکریپت فعال هستند. منطق ذخیره‌سازی و پردازش در فاز مربوطه متصل می‌شود.',
      returnDashboard: 'بازگشت به داشبورد',
      openSettings: 'تنظیمات فضای کاری',
    },
  },
};
