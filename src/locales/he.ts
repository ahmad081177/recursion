import type { TranslationKey } from './en';

export const he: Record<TranslationKey, string> = {
  // Nav / top bars
  'nav.home': 'בית',
  'nav.backHome': '→ בית',
  'nav.learnMode': '📖 מצב למידה',
  'nav.quizMode': '🎯 מצב חידון',

  // Home hero
  'home.subtitle': 'ראה את האלגוריתם.',
  'home.subtitleBold': 'הבן אותו.',

  // Category tabs
  'tab.recursion': '🌀 רקורסיה',
  'tab.sorting': '↕️ מיון',
  'tab.myFunctions': '✨ הפונקציות שלי',

  // Algorithm card
  'card.select': 'בחר ←',
  'card.selected': '✓ נבחר',
  'card.custom': 'מותאם',
  'card.editFn': 'ערוך פונקציה',
  'card.deleteFn': 'מחק פונקציה',
  'card.addFn': 'הוסף פונקציה',
  'card.addFnSub': 'הדבק קוד C#',
  'card.emptyFns': 'אין פונקציות מותאמות עדיין. לחץ ➕ להוספת הראשונה!',

  // Configure panel
  'config.title': 'הגדרות',
  'config.run': '▶ הרץ ויזואליזציה',
  'config.arrayHint': '(מופרד בפסיקים)',

  // Import / Export
  'fn.export': '📥 ייצא פונקציות',
  'fn.import': '📤 ייבא פונקציות',

  // Difficulty
  'difficulty.easy': 'קל',
  'difficulty.medium': 'בינוני',
  'difficulty.hard': 'קשה',

  // Footer hint
  'home.hint': '⌨️ בחר אלגוריתם כדי להתחיל את המסע',

  // ControlBar
  'ctrl.reset': 'חזור להתחלה',
  'ctrl.prev': 'צעד קודם',
  'ctrl.play': 'הפעל',
  'ctrl.pause': 'השהה',
  'ctrl.next': 'צעד הבא',
  'ctrl.skipEnd': 'דלג לסוף',
  'ctrl.copyLink': 'העתק קישור לצעד זה',
  'ctrl.speed': 'מהירות אנימציה',
  'ctrl.stepOf': 'צעד {n} / {total}',

  // NarrationPanel
  'narr.step': 'צעד {n} / {total}',
  'narr.less': '💡 פחות ▲',
  'narr.more': '💡 עוד ▼',
  'narr.hideInsight': 'הסתר הסבר',
  'narr.showInsight': 'הצג הסבר',
  'narr.engOnly': '🌐 הנרציה באנגלית בלבד',

  // QuizPanel
  'quiz.header': 'מצב חידון — מה יקרה הלאה?',
  'quiz.exit': 'צא מהחידון',
  'quiz.xp': 'נקודות:',
  'quiz.correct': '✓ נכון!',
  'quiz.comboBig': '🔥 קומבו!',
  'quiz.xpGain': '+10 נקודות',
  'quiz.wrong': '✗ לא בדיוק —',
  'quiz.next': 'הצעד הבא ←',

  // AchievementToast
  'achievement.unlocked': 'הישג נפתח!',

  // CallStackPanel
  'callstack.title': 'מחסנית קריאות',
  'callstack.depth': 'עומק:',
  'callstack.empty': 'המחסנית ריקה — לחץ הפעל להתחלה',
  'callstack.return': 'החזר:',

  // RecursionTreePanel
  'tree.title': 'עץ רקורסיה',

  // AlgorithmInsight
  'insight.title': 'תובנת אלגוריתם',
  'insight.show': 'הצג ▼',
  'insight.hide': 'הסתר ▲',
  'insight.redundant': 'קריאה מיותרת',
  'insight.redundantPlural': 'קריאות מיותרות',
  'insight.detected': 'זוהו!',
  'insight.memo': 'שינון',
  'insight.memoSuffix': ', כל ערך מחושב פעם אחת בלבד!',

  // CodePanel
  'code.title': 'קוד C#',
  'code.show': '▾ הצג',
  'code.hide': '▴ הסתר',

  // AddFunctionDialog
  'dialog.addTitle': 'הוסף פונקציה',
  'dialog.editTitle': 'ערוך פונקציה',
  'dialog.addSub': 'הדבק פונקציה רקורסיבית ב-C# ונדמה אותה',
  'dialog.editSub': 'שנה את הקוד ושמור את השינויים',
  'dialog.label': 'פונקציה רקורסיבית ב-C#',
  'dialog.patterns': 'תבניות נתמכות:',
  'dialog.p1': 'סוג החזרה int עם פרמטרים int',
  'dialog.p2': 'מקרה בסיס if (...) עם return',
  'dialog.p3': 'קריאה רקורסיבית בודדת או כפולה (כמו פיבונאצ\'י)',
  'dialog.p4': 'חשבון: + - * / %, השוואות, ternary',
  'dialog.cancel': 'ביטול',
  'dialog.test': '🧪 בדוק',
  'dialog.save': '💾 שמור שינויים',
  'dialog.add': '➕ הוסף פונקציה',

  // Viz error
  'viz.traceError': '⚠️ שגיאת מעקב:',
};
