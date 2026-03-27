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

  // Narration — generic
  'narr.call': 'استدعاء {fnName}({params}) — نتعمق أكثر (العمق {depth}).',
  'narr.return': 'تُعيد {fnName}({params}) القيمة {returnValue} إلى المُستدعي.',
  'narr.baseCase': 'وصلنا إلى الحالة الأساسية! تُعيد {fnName}({params}) مباشرةً القيمة {returnValue} — لا مزيد من التكرار هنا.',
  'narr.compare': 'مقارنة الفهرس [{i}] ({a}) مع الفهرس [{j}] ({b}). {cmp}',
  'narr.compare.swap': '{a} > {b} → تبادل مطلوب!',
  'narr.compare.noSwap': '{a} ≤ {b} → مرتّب بالفعل.',
  'narr.swap': 'تم تبادل الموضعين [{i}] و [{j}]. المصفوفة الآن [{array}].',

  // Narration — sort pass helpers
  'narr.sort.pass': ' (تمريرة {n})',
  'narr.sort.passPrefix': 'تمريرة {n}: ',

  // Narration — Fibonacci
  'narr.fib.call.base': 'استدعاء Fibonacci({n}) — هذه قيمة حالة أساسية، سنحصل على الإجابة مباشرة!',
  'narr.fib.call': 'استدعاء Fibonacci({n}) — نحتاج Fibonacci({n1}) + Fibonacci({n2}) لحساب هذه القيمة. الشجرة تتفرع هنا!',
  'narr.fib.baseCase': 'الحالة الأساسية! Fibonacci({n}) = {val}. بحكم التعريف، F(0)=0 و F(1)=1. هذه القيمة تصعد الآن عبر الشجرة.',
  'narr.fib.return': 'Fibonacci({n}) = {val}. حُسبت بجمع Fibonacci({n1}) + Fibonacci({n2}). النتيجة تعود الآن للمُستدعي.',

  // Narration — Factorial
  'narr.fact.call.base': 'استدعاء Factorial({n}) — هذه الحالة الأساسية! نعرف أن {n}! = 1.',
  'narr.fact.call': 'استدعاء Factorial({n}) — نحتاج {n} × Factorial({n1}). إضافة إطار جديد على مكدس الاستدعاء!',
  'narr.fact.baseCase': 'الحالة الأساسية! Factorial({n}) = 1. هذا قاع التكرار — الآن تبدأ القيم بالصعود مجدداً.',
  'narr.fact.return': 'Factorial({n}) = {val}. حُسبت كـ {n} × {prev} = {val}. تمرير النتيجة إلى المُستدعي.',

  // Narration — Power
  'narr.pow.call.base': 'استدعاء Power({base}, {exp}) — أي عدد مرفوع للأس صفر يساوي 1! حالة أساسية.',
  'narr.pow.call': 'استدعاء Power({base}, {exp}) — نحتاج {base} × Power({base}, {exp1}). تخفيض الأس بمقدار 1 في كل مرة.',
  'narr.pow.baseCase': 'الحالة الأساسية! Power({base}, 0) = 1. أي عدد مرفوع للأس صفر يساوي 1. بدأت عملية الصعود!',
  'narr.pow.return': 'Power({base}, {exp}) = {val}. حُسبت كـ {base} × {prev} = {val}. خطوة أقرب للنتيجة النهائية!',

  // Narration — SumArray
  'narr.sum.call.base': 'استدعاء SumArray عند الفهرس {i} — تجاوزنا نهاية المصفوفة! هذه حالتنا الأساسية.',
  'narr.sum.call': 'استدعاء SumArray عند الفهرس {i} — العنصر الحالي هو {elem}. سنضيفه إلى مجموع ما بعده.',
  'narr.sum.baseCase': 'الحالة الأساسية! الفهرس {i} تجاوز المصفوفة. مجموع لا شيء = 0. الآن يبدأ الجمع في الصعود!',
  'narr.sum.return': 'تُعيد SumArray من الفهرس {i} القيمة {val}. أي arr[{i}] ({elem}) + مجموع البقية = {val}.',

  // Narration — MaxItem
  'narr.max.call.base': 'استدعاء MaxItem عند الفهرس {i} — العنصر الأخير ({elem}). هذه الحالة الأساسية!',
  'narr.max.call': 'استدعاء MaxItem عند الفهرس {i} — العنصر الحالي هو {elem}. هل هو أكبر من الحد الأقصى للعناصر المتبقية؟',
  'narr.max.baseCase': 'الحالة الأساسية! العنصر {elem} الوحيد المتبقي عند الفهرس {i}. الحد الأقصى لعنصر واحد هو نفسه. إرجاع {elem} للأعلى.',
  'narr.max.return': 'تُعيد MaxItem من الفهرس {i} القيمة {val}. قورن arr[{i}]={elem} مع الحد الأقصى للبقية ← الفائز هو {val}.',

  // Narration — BubbleSort
  'narr.bubble.compare.swap': '{passInfo} مقارنة [{i}]={a} مع [{j}]={b}. بما أن {a} > {b}، يلزم التبادل — القيمة الأكبر تفقاعت يميناً! 🫧',
  'narr.bubble.compare.ok': '{passInfo} مقارنة [{i}]={a} مع [{j}]={b}. {a} ≤ {b}، مرتّبان بالفعل. لا تبادل مطلوب. ✓',
  'narr.bubble.swap': '{passInfo}تم التبادل! المصفوفة الآن [{array}]. القيمة الأكبر تقدمت موضعاً واحداً. 🫧',

  // Narration — SelectionSort
  'narr.sel.compare.found': '{passInfo} هل [{j}]={b} < الحد الأدنى الحالي [{minI}]={a}؟ نعم! 🎯 حد أدنى جديد: {b}.',
  'narr.sel.compare.keep': '{passInfo} هل [{j}]={b} < الحد الأدنى الحالي [{minI}]={a}؟ لا، {b} ≥ {a}. نحتفظ بالحد الأدنى الحالي.',
  'narr.sel.swap': '{passInfo}وضع القيمة الدنيا {val} في الموضع [{i}]. أول {sorted} عنصر/عناصر مرتّبة الآن! 🎯',

  // Narration — InsertionSort
  'narr.ins.pass': ' (إدراج العنصر #{n})',
  'narr.ins.passPrefix': 'إدراج العنصر #{n}: ',
  'narr.ins.compare.shift': '{passInfo} [{left}]={a} > [{right}]={b}. نحتاج تحريك {a} لإفساح المجال لـ {b}. 🃏',
  'narr.ins.compare.ok': '{passInfo} [{left}]={a} ≤ [{right}]={b}. وجدنا موضع الإدراج! {b} يبقى في الموضع [{right}]. ✓',
  'narr.ins.swap': '{passInfo}تم الإزاحة! المصفوفة الآن [{array}]. إفساح مجال في الجزء المرتّب. 🃏',

  // Expanded narration — generic
  'narr.exp.call': 'يُضاف إطار مكدس جديد إلى مكدس الاستدعاء. ستُنفَّذ هذه الدالة حتى تصل إلى حالة أساسية أو تُعيد نتيجة. لكل استدعاء نسخته الخاصة من المعاملات.',
  'narr.exp.baseCase': 'هذا ما يوقف التكرار! بدون حالة أساسية، ستستدعي الدالة نفسها إلى الأبد وتسبب فيضان المكدس. تُعيد الحالة الأساسية قيمة معروفة مباشرةً.',
  'narr.exp.return': 'أنهت الدالة عملها. تتدفق قيمة الإرجاع للأعلى إلى الدالة التي استدعتها، حيث ستُستخدم في حساب.',
  'narr.exp.compare': 'الخوارزمية تتحقق إذا كان هذان العنصران في الترتيب الصحيح. هذه المقارنة تحدد ما إذا كان التبادل ضرورياً.',
  'narr.exp.swap': 'هذان العنصران خارج الترتيب، لذا يُتبادلان. بعد عدة تبادلات، ستكون المصفوفة مرتّبة بالكامل.',

  // Expanded narration — Fibonacci
  'narr.exp.fib.call': '💡 فيبوناتشي ينشئ شجرة من الاستدعاءات — Fib({n}) يستدعي Fib({n1}) و Fib({n2}). هذا يعني حساب مسائل فرعية كثيرة أكثر من مرة! لهذا تعقيد الخوارزمية O(2ⁿ) بدون الحفظ المؤقت.',
  'narr.exp.fib.call.base': '💡 F(0)=0 و F(1)=1 محددان بحكم التعريف. جميع القيم الأخرى تُحسب بجمع القيمتين السابقتين.',
  'narr.exp.fib.return': '💡 لاحظ كيف أن كل قيمة إرجاع هي مجموع القيمتين اللتين عادتا من الاستدعاءات الفرعية. هذه خطوة الدمج في نمط فرّق تسد.',
  'narr.exp.fib.baseCase': '💡 الحالات الأساسية توقف التكرار. بدونها، سيستدعي فيبوناتشي نفسه بلا نهاية (فيضان المكدس!). F(0)=0 و F(1)=1 هما المرساتان.',

  // Expanded narration — Factorial
  'narr.exp.fact.call': '💡 المضروب يستخدم التكرار الخطي — كل استدعاء يقوم باستدعاء واحد فقط. فكّر في الأمر كبناء سلسلة: {n}! = {n} × {n1} × ... × 1. يصل المكدس إلى عمق {n}.',
  'narr.exp.fact.return': '💡 في الطريق للأعلى، يضرب كل إطار قيمته في النتيجة القادمة من الأسفل. مرحلة فك اللف هذه هي أين تحدث عمليات الضرب فعلياً.',
  'narr.exp.fact.baseCase': '💡 الحالة الأساسية 1! = 1 (أو 0! = 1) هي الأساس الرياضي. بدون هذا الشرط الإيقافي، لن تعود الدالة أبداً!',

  // Expanded narration — Power
  'narr.exp.pow.call': '💡 Power({base}, {exp}) = {base} × Power({base}, {exp1}). كل استدعاء يُقلّص الأس بمقدار 1. هناك نسخة أسرع باستخدام الرفع للأس بالتربيع بتعقيد O(log n)!',
  'narr.exp.pow.return': '💡 كل إرجاع يضرب الأساس في القوة المتراكمة من الأسفل. عمق المكدس يساوي تماماً قيمة الأس.',
  'narr.exp.pow.baseCase': '💡 أي عدد مرفوع للأس 0 يساوي 1 — هذه هي المحايدة الرياضية. إنها شرط إيقاف مثالي!',

  // Expanded narration — SumArray
  'narr.exp.sum.call': '💡 SumArray تمشي عبر المصفوفة فهرساً بفهرس. كل استدعاء يتعامل مع عنصر واحد ويثق بالتكرار لجمع الباقي. هذا مبدأ الثقة بالتكرار!',
  'narr.exp.sum.return': '💡 في الطريق للأعلى، يضيف كل إطار عنصره إلى المجموع القادم من الأسفل. يتراكم المجموع الإجمالي إطاراً بعد إطار.',
  'narr.exp.sum.baseCase': '💡 عندما يتجاوز الفهرس نهاية المصفوفة، لا شيء يتبقى لإضافته. مجموع الصفر عناصر هو 0 — المحايد لعملية الجمع.',

  // Expanded narration — MaxItem
  'narr.exp.max.call': '💡 MaxItem يقارن كل عنصر بحد أقصى العناصر المتبقية. فكّر في الأمر كبطولة — كل عنصر يتحدى أفضل الباقين!',
  'narr.exp.max.return': '💡 قيمة الإرجاع هي الفائز في المقارنة: max(العنصر الحالي، الحد الأقصى للباقي). البطل يصعد حتى القمة.',
  'narr.exp.max.baseCase': '💡 عندما يتبقى عنصر واحد فقط، فهو تلقائياً الأقصى. لا حاجة للمقارنة — يفوز افتراضياً!',

  // Expanded narration — BubbleSort
  'narr.exp.bubble.compare': '💡 الفقاعة دائماً تقارن العناصر المتجاورة. بعد التمريرة {pass}، ستكون أكبر {sorted} عنصر/عناصر في مواضعها النهائية. التعقيد الزمني: O(n²) — كل تمريرة تُجري ~n مقارنة.',
  'narr.exp.bubble.swap': '💡 تأثير الفقاعة: القيم الأكبر تتحرك خطوة بخطوة، كفقاعات ترتفع في الماء. كل تبادل يُقرّب عنصراً كبيراً من موضعه النهائي.',

  // Expanded narration — SelectionSort
  'narr.exp.sel.compare': '💡 الاختيار يفحص الجزء غير المرتّب لإيجاد الأدنى. التمريرة {pass}: البحث في الفهارس [{from}..{to}] عن أصغر قيمة. التعقيد: O(n²)، لكنه يُجري n تبادل في أقصاه!',
  'narr.exp.sel.swap': '💡 الاختيار يُجري تبادلاً واحداً فقط لكل تمريرة — يضع القيمة الدنيا في الموضع [{pos}]. كفوء في الأنظمة التي تُكلّف فيها التبادلات كثيراً.',

  // Expanded narration — InsertionSort
  'narr.exp.ins.compare': '💡 الإدراج يُبقي الجزء الأيسر مرتّباً دائماً. الآن يُدرج العنصر #{elem} في موضعه الصحيح. أفضل حالة: O(n). أسوأ حالة: O(n²). ممتاز للبيانات الصغيرة أو شبه المرتّبة!',
  'narr.exp.ins.swap': '💡 كل تبادل يُزيح عنصراً أكبر موضعاً للأمام، مُفسحاً مجالاً للعنصر المُدرج. فكّر في الأمر كإدراج بطاقة في يدٍ من البطاقات المرتّبة 🃏.',
};
