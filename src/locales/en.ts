export const en = {
  // Nav / top bars
  'nav.home': 'Home',
  'nav.backHome': '← Home',
  'nav.learnMode': '📖 Learn Mode',
  'nav.quizMode': '🎯 Quiz Mode',

  // Home hero
  'home.subtitle': 'See the algorithm.',
  'home.subtitleBold': 'Understand it.',

  // Category tabs
  'tab.recursion': '🌀 Recursion',
  'tab.sorting': '↕️ Sorting',
  'tab.myFunctions': '✨ My Functions',

  // Algorithm card
  'card.select': 'Select →',
  'card.selected': '✓ Selected',
  'card.custom': 'Custom',
  'card.editFn': 'Edit function',
  'card.deleteFn': 'Delete function',
  'card.addFn': 'Add Your Function',
  'card.addFnSub': 'Paste C# code',
  'card.emptyFns': 'No custom functions yet. Click ➕ to add your first one!',

  // Configure panel
  'config.title': 'Configure',
  'config.run': '▶ Run Visualization',
  'config.arrayHint': '(comma-separated)',

  // Import / Export
  'fn.export': '📥 Export Functions',
  'fn.import': '📤 Import Functions',

  // Difficulty
  'difficulty.easy': 'Easy',
  'difficulty.medium': 'Medium',
  'difficulty.hard': 'Hard',

  // Footer hint
  'home.hint': '⌨️ Pick an algorithm to begin your quest',

  // ControlBar
  'ctrl.reset': 'Reset to beginning',
  'ctrl.prev': 'Previous step',
  'ctrl.play': 'Play',
  'ctrl.pause': 'Pause',
  'ctrl.next': 'Next step',
  'ctrl.skipEnd': 'Skip to end',
  'ctrl.copyLink': 'Copy link to this step',
  'ctrl.speed': 'Animation speed',
  'ctrl.stepOf': 'Step {n} / {total}',

  // NarrationPanel
  'narr.step': 'step {n} / {total}',
  'narr.less': '💡 Less ▲',
  'narr.more': '💡 More ▼',
  'narr.hideInsight': 'Hide insight',
  'narr.showInsight': 'Show insight',
  'narr.engOnly': '🌐 Narration in English only',

  // QuizPanel
  'quiz.header': 'Quiz Mode — What happens next?',
  'quiz.exit': 'Exit Quiz',
  'quiz.xp': 'XP:',
  'quiz.correct': '✓ Correct!',
  'quiz.comboBig': '🔥 COMBO!',
  'quiz.xpGain': '+10 XP',
  'quiz.wrong': '✗ Not quite —',
  'quiz.next': 'Next Step →',

  // AchievementToast
  'achievement.unlocked': 'Achievement Unlocked!',

  // CallStackPanel
  'callstack.title': 'Call Stack',
  'callstack.depth': 'Depth:',
  'callstack.empty': 'Stack is empty — click Run to start',
  'callstack.return': 'return:',

  // RecursionTreePanel
  'tree.title': 'Recursion Tree',

  // AlgorithmInsight
  'insight.title': 'Algorithm Insight',
  'insight.show': 'Show ▼',
  'insight.hide': 'Hide ▲',
  'insight.redundant': 'redundant call',
  'insight.redundantPlural': 'redundant calls',
  'insight.detected': 'detected!',
  'insight.memo': 'memoization',
  'insight.memoSuffix': ', each value is computed only once!',

  // CodePanel
  'code.title': 'C# Code',
  'code.show': '▾ Show',
  'code.hide': '▴ Hide',

  // AddFunctionDialog
  'dialog.addTitle': 'Add Your Function',
  'dialog.editTitle': 'Edit Your Function',
  'dialog.addSub': "Paste a C# recursive function and we'll visualize it",
  'dialog.editSub': 'Modify the code and save your changes',
  'dialog.label': 'C# Recursive Function',
  'dialog.patterns': 'Supported patterns:',
  'dialog.p1': 'int return type with int parameters',
  'dialog.p2': 'if (...) base case with return',
  'dialog.p3': 'Single or double recursive calls (like Fibonacci)',
  'dialog.p4': 'Arithmetic: + - * / %, comparisons, ternary',
  'dialog.cancel': 'Cancel',
  'dialog.test': '🧪 Test',
  'dialog.save': '💾 Save Changes',
  'dialog.add': '➕ Add Function',

  // Viz error
  'viz.traceError': '⚠️ Trace error:',
} as const;

export type TranslationKey = keyof typeof en;
