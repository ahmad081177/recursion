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

  // AlgorithmInsight — formula panel
  'insight.title': 'תובנת אלגוריתם',
  'insight.show': 'הצג ▼',
  'insight.hide': 'הסתר ▲',
  'insight.redundant': 'קריאה מיותרת',
  'insight.redundantPlural': 'קריאות מיותרות',
  'insight.detected': 'זוהו!',
  'insight.memo': 'שינון',
  'insight.memoSuffix': ', כל ערך מחושב פעם אחת בלבד!',
  'insight.fibCalled': 'F({n}) נקרא {c}×',

  // Algorithm formulas / descriptions / complexities
  'alg.factorial.formula': 'n! = n × (n−1) × … × 1',
  'alg.factorial.desc': 'כל קריאה מכפילה n בעצרת של (n−1).',
  'alg.factorial.cmplx': 'O(n) קריאות, O(n) עומק מחסנית',

  'alg.power.formula': 'baseᵉˣᵖ = base × base^(exp−1)',
  'alg.power.desc': 'מפחיתים את המעריך ב-1 בכל פעם, מכפילים בדרך חזרה.',
  'alg.power.cmplx': 'O(exp) קריאות, O(exp) עומק מחסנית',

  'alg.fibonacci.formula': 'F(n) = F(n−1) + F(n−2)',
  'alg.fibonacci.desc': 'כל קריאה מתפצלת לשתי קריאות משנה, ויוצרת עץ.',
  'alg.fibonacci.cmplx': 'O(2ⁿ) קריאות ללא שינון!',

  'alg.sumArray.formula': 'Sum(i) = arr[i] + Sum(i+1)',
  'alg.sumArray.desc': 'מוסיפים כל איבר לסכום האיברים הנותרים.',
  'alg.sumArray.cmplx': 'O(n) קריאות, O(n) עומק מחסנית',

  'alg.maxItem.formula': 'Max(i) = max(arr[i], Max(i+1))',
  'alg.maxItem.desc': 'משווים כל איבר למקסימום של השאר.',
  'alg.maxItem.cmplx': 'O(n) קריאות, O(n) עומק מחסנית',

  'alg.bubbleSort.formula': 'השווה סמוכים ← החלף אם לא בסדר ← חזור',
  'alg.bubbleSort.desc': 'הערך הגדול ביותר שלא ממוין "מבעבע" לקצה הימני בכל מעבר.',
  'alg.bubbleSort.cmplx': 'O(n²) השוואות, O(n²) החלפות במקרה הגרוע',

  'alg.selectionSort.formula': 'מצא מינימום בלתי-ממוין ← מקם במיקום הנכון',
  'alg.selectionSort.desc': 'כל מעבר בוחר את האיבר הקטן ביותר הנותר.',
  'alg.selectionSort.cmplx': 'O(n²) השוואות, O(n) החלפות',

  'alg.insertionSort.formula': 'קח את האיבר הבא ← הכנס לחלק הממוין',
  'alg.insertionSort.desc': 'בנה את המערך הממוין איבר אחד בכל פעם.',
  'alg.insertionSort.cmplx': 'O(n²) מקרה גרוע, O(n) מקרה טוב (כמעט ממוין)',

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

  // Narration — generic
  'narr.call': 'קורא ל-{fnName}({params}) — צוללים עמוק יותר (עומק {depth}).',
  'narr.return': '{fnName}({params}) מחזיר {returnValue} לקורא.',
  'narr.baseCase': 'הגענו למקרה הבסיס! {fnName}({params}) מחזיר {returnValue} ישירות — אין עוד רקורסיה כאן.',
  'narr.compare': 'משווה אינדקס [{i}] ({a}) עם אינדקס [{j}] ({b}). {cmp}',
  'narr.compare.swap': '{a} > {b} → נדרשת החלפה!',
  'narr.compare.noSwap': '{a} ≤ {b} → כבר מסודר.',
  'narr.swap': 'הוחלפו מיקומים [{i}] ו-[{j}]. המערך כעת [{array}].',

  // Narration — sort pass helpers
  'narr.sort.pass': ' (מעבר {n})',
  'narr.sort.passPrefix': 'מעבר {n}: ',

  // Narration — Fibonacci
  'narr.fib.call.base': 'קורא ל-Fibonacci({n}) — זהו ערך מקרה בסיס, נקבל את התשובה ישירות!',
  'narr.fib.call': 'קורא ל-Fibonacci({n}) — אנחנו צריכים Fibonacci({n1}) + Fibonacci({n2}) כדי לחשב את זה. העץ מתפצל כאן!',
  'narr.fib.baseCase': 'מקרה בסיס! Fibonacci({n}) = {val}. בהגדרה, F(0)=0 ו-F(1)=1. ערך זה עולה כעת בחזרה בעץ.',
  'narr.fib.return': 'Fibonacci({n}) = {val}. חושב על ידי חיבור Fibonacci({n1}) + Fibonacci({n2}). התוצאה חוזרת כעת לקורא.',

  // Narration — Factorial
  'narr.fact.call.base': 'קורא ל-Factorial({n}) — זהו מקרה הבסיס! אנחנו יודעים ש-{n}! = 1.',
  'narr.fact.call': 'קורא ל-Factorial({n}) — אנחנו צריכים {n} × Factorial({n1}). מוסיפים מסגרת למחסנית!',
  'narr.fact.baseCase': 'מקרה בסיס! Factorial({n}) = 1. זה תחתית הרקורסיה — עכשיו הערכים מתחילים להתפרק כלפי מעלה.',
  'narr.fact.return': 'Factorial({n}) = {val}. חושב כ-{n} × {prev} = {val}. מעביר את התוצאה לקורא.',

  // Narration — Power
  'narr.pow.call.base': 'קורא ל-Power({base}, {exp}) — כל מספר בחזקת 0 שווה 1! מקרה בסיס.',
  'narr.pow.call': 'קורא ל-Power({base}, {exp}) — אנחנו צריכים {base} × Power({base}, {exp1}). מפחיתים את המעריך ב-1 בכל פעם.',
  'narr.pow.baseCase': 'מקרה בסיס! Power({base}, 0) = 1. כל מספר בחזקת 0 שווה 1. הפירוק מתחיל עכשיו!',
  'narr.pow.return': 'Power({base}, {exp}) = {val}. חושב כ-{base} × {prev} = {val}. צעד אחד קרוב יותר לתשובה הסופית!',

  // Narration — SumArray
  'narr.sum.call.base': 'קורא ל-SumArray באינדקס {i} — מעבר לסוף המערך! זהו מקרה הבסיס שלנו.',
  'narr.sum.call': 'קורא ל-SumArray באינדקס {i} — האיבר הנוכחי הוא {elem}. נוסיף אותו לסכום כל מה שאחריו.',
  'narr.sum.baseCase': 'מקרה בסיס! אינדקס {i} חרג מהמערך. סכום של כלום = 0. עכשיו החיבור מתחיל לעלות!',
  'narr.sum.return': 'SumArray מאינדקס {i} מחזיר {val}. כלומר arr[{i}] ({elem}) + סכום השאר = {val}.',

  // Narration — MaxItem
  'narr.max.call.base': 'קורא ל-MaxItem באינדקס {i} — האיבר האחרון ({elem}). זהו מקרה הבסיס!',
  'narr.max.call': 'קורא ל-MaxItem באינדקס {i} — האיבר הנוכחי הוא {elem}. האם הוא גדול ממקסימום האיברים הנותרים?',
  'narr.max.baseCase': 'מקרה בסיס! נותר רק האיבר {elem} באינדקס {i}. המקסימום של איבר אחד הוא עצמו. מחזיר {elem} כלפי מעלה.',
  'narr.max.return': 'MaxItem מאינדקס {i} מחזיר {val}. השווה arr[{i}]={elem} עם מקסימום השאר ← המנצח הוא {val}.',

  // Narration — BubbleSort
  'narr.bubble.compare.swap': '{passInfo} משווה [{i}]={a} עם [{j}]={b}. מכיוון ש-{a} > {b}, נדרשת החלפה — הערך הגדול מבעבע ימינה! 🫧',
  'narr.bubble.compare.ok': '{passInfo} משווה [{i}]={a} עם [{j}]={b}. {a} ≤ {b}, כבר מסודרים. אין צורך בהחלפה. ✓',
  'narr.bubble.swap': '{passInfo}הוחלפו! המערך כעת [{array}]. הערך הגדול יותר בועבע מיקום אחד ימינה. 🫧',

  // Narration — SelectionSort
  'narr.sel.compare.found': '{passInfo} האם [{j}]={b} < מינימום נוכחי [{minI}]={a}? כן! 🎯 נמצא מינימום חדש: {b}.',
  'narr.sel.compare.keep': '{passInfo} האם [{j}]={b} < מינימום נוכחי [{minI}]={a}? לא, {b} ≥ {a}. שומרים על המינימום הנוכחי.',
  'narr.sel.swap': '{passInfo}מציב את ערך המינימום {val} במיקום [{i}]. {sorted} האיבר/ים הראשון/ים מסודרים עכשיו! 🎯',

  // Narration — InsertionSort
  'narr.ins.pass': ' (מוסיף איבר #{n})',
  'narr.ins.passPrefix': 'מוסיף איבר #{n}: ',
  'narr.ins.compare.shift': '{passInfo} [{left}]={a} > [{right}]={b}. צריך להזיז {a} ימינה כדי לפנות מקום ל-{b}. 🃏',
  'narr.ins.compare.ok': '{passInfo} [{left}]={a} ≤ [{right}]={b}. מצאנו את נקודת ההוספה! {b} נשאר במיקום [{right}]. ✓',
  'narr.ins.swap': '{passInfo}הוזזו! המערך כעת [{array}]. פינוי מקום בחלק הממוין. 🃏',

  // Expanded narration — generic
  'narr.exp.call': 'מסגרת מחסנית חדשה נדחפת למחסנית הקריאות. הפונקציה תרוץ עד שתגיע למקרה בסיס או תחזיר תוצאה. לכל קריאה יש עותק משלה של הפרמטרים.',
  'narr.exp.baseCase': 'זה מה שעוצר את הרקורסיה! ללא מקרה בסיס, הפונקציה תקרא לעצמה לנצח ותגרום לגלישת מחסנית. מקרה הבסיס מחזיר ערך ידוע ישירות.',
  'narr.exp.return': 'הפונקציה סיימה את עבודתה. ערך ההחזרה זורם כלפי מעלה לפונקציה שקראה לה, שם ישמש בחישוב.',
  'narr.exp.compare': 'האלגוריתם בודק האם שני האיברים הללו בסדר הנכון. השוואה זו קובעת האם נדרשת החלפה.',
  'narr.exp.swap': 'שני האיברים הללו אינם בסדר, ולכן הם מוחלפים. לאחר החלפות רבות, המערך יהיה ממוין לחלוטין.',

  // Expanded narration — Fibonacci
  'narr.exp.fib.call': "💡 פיבונאצ'י יוצר עץ של קריאות — Fib({n}) קורא גם ל-Fib({n1}) וגם ל-Fib({n2}). פירושו שבעיות משנה רבות מחושבות יותר מפעם! לכן מורכבות פיבונאצ'י היא O(2ⁿ) ללא memoization.",
  'narr.exp.fib.call.base': '💡 F(0)=0 ו-F(1)=1 מוגדרים לפי הסדרה. כל ערכי הסדרה האחרים מחושבים על ידי חיבור שני הערכים הקודמים.',
  'narr.exp.fib.return': '💡 שים לב כיצד כל ערך החזרה הוא סכום שני הערכים שחזרו מהקריאות הנכדות. זוהי שלב השילוב בתבנית חלק וכבוש.',
  'narr.exp.fib.baseCase': "💡 מקרי הבסיס עוצרים את הרקורסיה. ללא מקרי הבסיס, פיבונאצ'י היה קורא לעצמו לנצח ומתרסק (גלישת מחסנית!). F(0)=0 ו-F(1)=1 הם שתי העוגנים.",

  // Expanded narration — Factorial
  'narr.exp.fact.call': '💡 עצרת משתמשת ברקורסיה לינארית — כל קריאה עושה בדיוק קריאה אחת. תחשוב על זה כבניית שרשרת: {n}! = {n} × {n1} × ... × 1. המחסנית מגיעה לעומק {n}.',
  'narr.exp.fact.return': '💡 בדרך למעלה, כל מסגרת מכפילה את ערכה בתוצאה מלמטה. שלב הפירוק הוא איפה ההכפלה בפועל מתבצעת.',
  'narr.exp.fact.baseCase': '💡 מקרה הבסיס 1! = 1 (או 0! = 1) הוא הבסיס המתמטי. ללא תנאי עצירה זה, הפונקציה לא תחזור לעולם!',

  // Expanded narration — Power
  'narr.exp.pow.call': '💡 Power({base}, {exp}) = {base} × Power({base}, {exp1}). כל קריאה מקטינה את המעריך ב-1. יש גרסה מהירה עם חזקה בריבוע שהיא O(log n)!',
  'narr.exp.pow.return': '💡 כל החזרה מכפילה את הבסיס בחזקה שנצברה מלמטה. המחסנית עמוקה בדיוק כמות מסגרות ה-exp.',
  'narr.exp.pow.baseCase': '💡 כל מספר בחזקת 0 שווה 1 — זהו האיבר הנייטרלי המתמטי. זהו תנאי עצירה מושלם!',

  // Expanded narration — SumArray
  'narr.exp.sum.call': '💡 SumArray עוברת על המערך אינדקס אחד בכל פעם. כל קריאה מטפלת באיבר אחד ומאמינה לרקורסיה שתסכום את השאר. עקרון הסמיכה על הרקורסיה!',
  'narr.exp.sum.return': '💡 בדרך חזרה, כל מסגרת מוסיפה את האיבר שלה לסכום שחזר מלמטה. הסכום הכולל מצטבר מסגרת אחר מסגרת.',
  'narr.exp.sum.baseCase': '💡 כאשר האינדקס עובר את סוף המערך, אין מה להוסיף. סכום אפס איברים הוא 0 — האיבר הזהותי עבור חיבור.',

  // Expanded narration — MaxItem
  'narr.exp.max.call': '💡 MaxItem משווה כל איבר מול המקסימום של האיברים הנותרים. תחשוב על זה כטורניר — כל איבר מאתגר את הטוב ביותר מהשאר!',
  'narr.exp.max.return': '💡 ערך ההחזרה הוא המנצח בהשוואה: max(האיבר הנוכחי, מקסימום השאר). האלוף מתפשט עד הראש.',
  'narr.exp.max.baseCase': '💡 כשנותר איבר אחד בלבד, הוא אוטומטית המקסימום. אין צורך בהשוואה — הוא מנצח כברירת מחדל!',

  // Expanded narration — BubbleSort
  'narr.exp.bubble.compare': '💡 מיון בועות תמיד משווה איברים סמוכים. לאחר מעבר {pass}, {sorted} האיבר/ים הגדול/ים ביותר יהיו במיקומם הסופי. מורכבות: O(n²) — כל מעבר עושה ~n השוואות.',
  'narr.exp.bubble.swap': '💡 אפקט הבועה: ערכים גדולים יותר מהגרים שלב אחר שלב ימינה, כמו בועות שעולות במים. כל החלפה מקרבת איבר גדול למיקומו הסופי.',

  // Expanded narration — SelectionSort
  'narr.exp.sel.compare': '💡 מיון בחירה סורק את החלק הלא-ממוין למציאת המינימום. מעבר {pass}: חיפוש במיקומים [{from}..{to}] אחר הערך הקטן ביותר. מורכבות: O(n²), אבל עושה לכל היותר n החלפות!',
  'narr.exp.sel.swap': '💡 מיון בחירה עושה בדיוק החלפה אחת לכל מעבר — מציב את המינימום במיקום [{pos}]. יעיל במערכות שבהן החלפות יקרות.',

  // Expanded narration — InsertionSort
  'narr.exp.ins.compare': '💡 מיון הכנסה שומר על החלק השמאלי ממוין בכל עת. עכשיו מכניס איבר #{elem} למיקומו הנכון. מקרה הטוב: O(n). מקרה הגרוע: O(n²). מצוין לנתונים קטנים או כמעט-ממוינים!',
  'narr.exp.ins.swap': '💡 כל החלפה מזיזה איבר גדול יותר מיקום אחד ימינה, לפנות מקום לאיבר המוכנס. תחשוב על זה כהכנסת קלף לקלפי ממוינות 🃏.',
};
