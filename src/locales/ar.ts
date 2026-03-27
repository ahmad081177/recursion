import type { TranslationKey } from './en';

export const ar: Record<TranslationKey, string> = {
  // Nav / top bars
  'nav.home': 'الرئيسية',
  'nav.backHome': '→ الرئيسية',
  'nav.learnMode': '📖 وضع التعلم',
  'nav.quizMode': '🎯 وضع الاختبار',

  // Home hero
  'home.subtitle': 'شاهد الخوارزمية.',
  'home.subtitleBold': 'افهمها.',

  // Category tabs
  'tab.recursion': '🌀 التكرار',
  'tab.sorting': '↕️ الترتيب',
  'tab.myFunctions': '✨ دواليّ',

  // Algorithm card
  'card.select': 'اختر ←',
  'card.selected': '✓ تم الاختيار',
  'card.custom': 'مخصص',
  'card.editFn': 'تعديل الدالة',
  'card.deleteFn': 'حذف الدالة',
  'card.addFn': 'أضف دالتك',
  'card.addFnSub': 'الصق كود C#',
  'card.emptyFns': 'لا توجد دوال مخصصة بعد. انقر ➕ لإضافة أول دالة!',

  // Configure panel
  'config.title': 'ضبط',
  'config.run': '▶ تشغيل التصوير',
  'config.arrayHint': '(مفصولة بفواصل)',

  // Import / Export
  'fn.export': '📥 تصدير الدوال',
  'fn.import': '📤 استيراد الدوال',

  // Difficulty
  'difficulty.easy': 'سهل',
  'difficulty.medium': 'متوسط',
  'difficulty.hard': 'صعب',

  // Footer hint
  'home.hint': '⌨️ اختر خوارزمية لبدء رحلتك',

  // ControlBar
  'ctrl.reset': 'إعادة للبداية',
  'ctrl.prev': 'الخطوة السابقة',
  'ctrl.play': 'تشغيل',
  'ctrl.pause': 'إيقاف مؤقت',
  'ctrl.next': 'الخطوة التالية',
  'ctrl.skipEnd': 'التخطي للنهاية',
  'ctrl.copyLink': 'نسخ رابط هذه الخطوة',
  'ctrl.speed': 'سرعة الرسوم المتحركة',
  'ctrl.stepOf': 'خطوة {n} / {total}',

  // NarrationPanel
  'narr.step': 'خطوة {n} / {total}',
  'narr.less': '💡 أقل ▲',
  'narr.more': '💡 المزيد ▼',
  'narr.hideInsight': 'إخفاء الشرح',
  'narr.showInsight': 'عرض الشرح',
  'narr.engOnly': '🌐 السرد باللغة الإنجليزية فقط',

  // QuizPanel
  'quiz.header': 'وضع الاختبار — ماذا يحدث بعد ذلك؟',
  'quiz.exit': 'خروج من الاختبار',
  'quiz.xp': 'نقاط:',
  'quiz.correct': '✓ صحيح!',
  'quiz.comboBig': '🔥 تسلسل!',
  'quiz.xpGain': '+10 نقاط',
  'quiz.wrong': '✗ ليس تمامًا —',
  'quiz.next': 'الخطوة التالية ←',

  // AchievementToast
  'achievement.unlocked': 'إنجاز مفتوح!',

  // CallStackPanel
  'callstack.title': 'مكدس الاستدعاء',
  'callstack.depth': 'العمق:',
  'callstack.empty': 'المكدس فارغ — انقر تشغيل للبدء',
  'callstack.return': 'إرجاع:',

  // RecursionTreePanel
  'tree.title': 'شجرة التكرار',

  // AlgorithmInsight
  'insight.title': 'تحليل الخوارزمية',
  'insight.show': 'عرض ▼',
  'insight.hide': 'إخفاء ▲',
  'insight.redundant': 'استدعاء زائد',
  'insight.redundantPlural': 'استدعاءات زائدة',
  'insight.detected': 'تم اكتشافه!',
  'insight.memo': 'الحفظ المؤقت',
  'insight.memoSuffix': '، كل قيمة تُحسب مرة واحدة فقط!',

  // CodePanel
  'code.title': 'كود C#',
  'code.show': '▾ عرض',
  'code.hide': '▴ إخفاء',

  // AddFunctionDialog
  'dialog.addTitle': 'أضف دالتك',
  'dialog.editTitle': 'تعديل دالتك',
  'dialog.addSub': 'الصق دالة C# تكرارية وسنصوّرها',
  'dialog.editSub': 'عدّل الكود واحفظ التغييرات',
  'dialog.label': 'دالة C# التكرارية',
  'dialog.patterns': 'الأنماط المدعومة:',
  'dialog.p1': 'نوع إرجاع int مع معاملات int',
  'dialog.p2': 'حالة أساسية if (...) مع return',
  'dialog.p3': 'استدعاء تكراري واحد أو مزدوج (مثل فيبوناتشي)',
  'dialog.p4': 'العمليات الحسابية: + - * / %، المقارنات، الثلاثي',
  'dialog.cancel': 'إلغاء',
  'dialog.test': '🧪 اختبار',
  'dialog.save': '💾 حفظ التغييرات',
  'dialog.add': '➕ إضافة دالة',

  // Viz error
  'viz.traceError': '⚠️ خطأ في التتبع:',
};
