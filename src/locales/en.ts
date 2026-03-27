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

  // AlgorithmInsight — formula panel (formula is math notation, desc/cmplx are text)
  'insight.title': 'Algorithm Insight',
  'insight.show': 'Show ▼',
  'insight.hide': 'Hide ▲',
  'insight.redundant': 'redundant call',
  'insight.redundantPlural': 'redundant calls',
  'insight.detected': 'detected!',
  'insight.memo': 'memoization',
  'insight.memoSuffix': ', each value is computed only once!',
  'insight.fibCalled': 'F({n}) called {c}×',

  // Algorithm formulas / descriptions / complexities
  'alg.factorial.formula': 'n! = n × (n−1) × … × 1',
  'alg.factorial.desc': 'Each call multiplies n by the factorial of (n−1).',
  'alg.factorial.cmplx': 'O(n) calls, O(n) stack depth',

  'alg.power.formula': 'baseᵉˣᵖ = base × base^(exp−1)',
  'alg.power.desc': 'Reduce the exponent by 1 each time, multiply on the way back.',
  'alg.power.cmplx': 'O(exp) calls, O(exp) stack depth',

  'alg.fibonacci.formula': 'F(n) = F(n−1) + F(n−2)',
  'alg.fibonacci.desc': 'Each call branches into TWO sub-calls, creating a tree.',
  'alg.fibonacci.cmplx': 'O(2ⁿ) calls without memoization!',

  'alg.sumArray.formula': 'Sum(i) = arr[i] + Sum(i+1)',
  'alg.sumArray.desc': 'Add each element to the sum of the remaining elements.',
  'alg.sumArray.cmplx': 'O(n) calls, O(n) stack depth',

  'alg.maxItem.formula': 'Max(i) = max(arr[i], Max(i+1))',
  'alg.maxItem.desc': 'Compare each element against the maximum of the rest.',
  'alg.maxItem.cmplx': 'O(n) calls, O(n) stack depth',

  'alg.bubbleSort.formula': 'Compare adjacent → swap if out of order → repeat',
  'alg.bubbleSort.desc': 'The largest unsorted element "bubbles up" to the right end each pass.',
  'alg.bubbleSort.cmplx': 'O(n²) comparisons, O(n²) swaps worst case',

  'alg.selectionSort.formula': 'Find minimum in unsorted → place at correct position',
  'alg.selectionSort.desc': 'Each pass selects the smallest remaining element.',
  'alg.selectionSort.cmplx': 'O(n²) comparisons, O(n) swaps',

  'alg.insertionSort.formula': 'Pick next element → insert into sorted portion',
  'alg.insertionSort.desc': 'Build the sorted array one element at a time.',
  'alg.insertionSort.cmplx': 'O(n²) worst, O(n) best (nearly sorted)',

  // Algorithm card descriptions (home screen)
  'alg.factorial.cardDesc': 'Classic linear recursion. Computes n × (n-1) × ... × 1.',
  'alg.power.cardDesc': 'Raises base to the power of exp using recursion.',
  'alg.fibonacci.cardDesc': 'Computes the nth Fibonacci number using branching recursion — two recursive calls!',
  'alg.sumArray.cardDesc': 'Sums all elements of an integer array recursively.',
  'alg.maxItem.cardDesc': 'Finds the maximum element in an integer array using recursion.',
  'alg.bubbleSort.cardDesc': 'Repeatedly compares adjacent elements and swaps them if out of order.',
  'alg.selectionSort.cardDesc': 'Finds the minimum element repeatedly and places it at the front.',
  'alg.insertionSort.cardDesc': 'Builds the sorted array one element at a time by inserting each element in its correct position.',
  'alg.custom.cardDesc': 'Your custom recursive function: {name}',

  // ArrayVisualizer
  'array.empty': 'Array will appear here',
  'array.pass': 'Pass {n} of {total}',
  'array.comparisons': 'Comparisons:',
  'array.swaps': 'Swaps:',
  'array.legend.comparing': 'Comparing',
  'array.legend.swapping': 'Swapping',
  'array.legend.sorted': 'Sorted',
  'array.hint.bubble': '🫧 Larger values "bubble" to the right end after each pass',
  'array.hint.selection': '🎯 Each pass finds the minimum and places it at the correct position',
  'array.hint.insertion': '🃏 Like sorting a hand of cards — pick a card and slide it into the right spot',
  'array.cmp.swap': '{a} > {b} → Swap! 🔄',
  'array.cmp.ok': '{a} ≤ {b} → OK ✓',
  'array.cmp.swapped': 'Swapped! → [{array}]',

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

  // Narration — generic
  'narr.call': 'Calling {fnName}({params}) — going deeper (depth {depth}).',
  'narr.return': '{fnName}({params}) returns {returnValue} back to its caller.',
  'narr.baseCase': 'Base case reached! {fnName}({params}) returns {returnValue} directly — no more recursion needed here.',
  'narr.compare': 'Comparing index [{i}] ({a}) with index [{j}] ({b}). {cmp}',
  'narr.compare.swap': '{a} > {b} → swap needed!',
  'narr.compare.noSwap': '{a} ≤ {b} → already in order.',
  'narr.swap': 'Swapped positions [{i}] and [{j}]. The array is now [{array}].',

  // Narration — sort pass helpers
  'narr.sort.pass': ' (Pass {n})',
  'narr.sort.passPrefix': 'Pass {n}: ',

  // Narration — Fibonacci
  'narr.fib.call.base': "Calling Fibonacci({n}) — this is a base case value, so we'll get the answer directly!",
  'narr.fib.call': 'Calling Fibonacci({n}) — we need Fibonacci({n1}) + Fibonacci({n2}) to compute this. The tree branches here!',
  'narr.fib.baseCase': 'Base case! Fibonacci({n}) = {val}. By definition, F(0)=0 and F(1)=1. This value now travels back up the tree.',
  'narr.fib.return': 'Fibonacci({n}) = {val}. This was computed by adding Fibonacci({n1}) + Fibonacci({n2}). The result now returns to the caller above.',

  // Narration — Factorial
  'narr.fact.call.base': 'Calling Factorial({n}) — this is the base case! We know {n}! = 1.',
  'narr.fact.call': 'Calling Factorial({n}) — we need {n} × Factorial({n1}). Stacking another frame on the call stack!',
  'narr.fact.baseCase': 'Base case! Factorial({n}) = 1. This is the bottom of the recursion — now the returns start "unwinding" back up.',
  'narr.fact.return': 'Factorial({n}) = {val}. Computed as {n} × {prev} = {val}. Passing the result back to the caller.',

  // Narration — Power
  'narr.pow.call.base': 'Calling Power({base}, {exp}) — anything to the 0th power is 1! Base case.',
  'narr.pow.call': 'Calling Power({base}, {exp}) — we need {base} × Power({base}, {exp1}). Reducing the exponent by 1 each time.',
  'narr.pow.baseCase': 'Base case! Power({base}, 0) = 1. Any number raised to the power of 0 equals 1. The "unwinding" begins now!',
  'narr.pow.return': 'Power({base}, {exp}) = {val}. Computed as {base} × {prev} = {val}. One step closer to the final answer!',

  // Narration — SumArray
  'narr.sum.call.base': 'Calling SumArray at index {i} — past the end of the array! This is our base case.',
  'narr.sum.call': "Calling SumArray at index {i} — current element is {elem}. We'll add it to the sum of everything after it.",
  'narr.sum.baseCase': 'Base case! Index {i} is beyond the array. Sum of nothing = 0. Now the adding starts on the way back up!',
  'narr.sum.return': 'SumArray from index {i} returns {val}. This means arr[{i}] ({elem}) + sum of rest = {val}.',

  // Narration — MaxItem
  'narr.max.call.base': 'Calling MaxItem at index {i} — the last element ({elem}). This is the base case!',
  'narr.max.call': 'Calling MaxItem at index {i} — current element is {elem}. Is it larger than the max of the remaining elements?',
  'narr.max.baseCase': 'Base case! Only element {elem} left at index {i}. The max of one element is itself. Returning {elem} up the stack.',
  'narr.max.return': 'MaxItem from index {i} returns {val}. Compared arr[{i}]={elem} with the max of the rest → winner is {val}.',

  // Narration — BubbleSort
  'narr.bubble.compare.swap': '{passInfo} Comparing [{i}]={a} with [{j}]={b}. Since {a} > {b}, they need to swap — the bigger value "bubbles" right! 🫧',
  'narr.bubble.compare.ok': "{passInfo} Comparing [{i}]={a} with [{j}]={b}. {a} ≤ {b}, so they're already in order. No swap needed. ✓",
  'narr.bubble.swap': '{passInfo}Swapped! Array is now [{array}]. The larger value bubbled one position to the right. 🫧',

  // Narration — SelectionSort
  'narr.sel.compare.found': '{passInfo} Is [{j}]={b} < current min [{minI}]={a}? YES! 🎯 New minimum found: {b}.',
  'narr.sel.compare.keep': '{passInfo} Is [{j}]={b} < current min [{minI}]={a}? No, {b} ≥ {a}. Keeping current minimum.',
  'narr.sel.swap': '{passInfo}Placing minimum value {val} at position [{i}]. The first {sorted} element(s) are now sorted! 🎯',

  // Narration — InsertionSort
  'narr.ins.pass': ' (Inserting element #{n})',
  'narr.ins.passPrefix': 'Inserting element #{n}: ',
  'narr.ins.compare.shift': '{passInfo} [{left}]={a} > [{right}]={b}. Need to shift {a} right to make room for {b}. 🃏',
  'narr.ins.compare.ok': '{passInfo} [{left}]={a} ≤ [{right}]={b}. Found the insertion point! {b} stays at position [{right}]. ✓',
  'narr.ins.swap': '{passInfo}Shifted! Array is now [{array}]. Making room in the sorted portion. 🃏',

  // Expanded narration — generic
  'narr.exp.call': 'A new stack frame is pushed onto the call stack. This function will run until it hits a base case or returns a result. Each call has its own copy of the parameters.',
  'narr.exp.baseCase': 'This is what stops the recursion! Without a base case, the function would call itself forever and cause a stack overflow. The base case returns a known value directly.',
  'narr.exp.return': 'The function has finished its work. The return value flows back up to the function that called it, where it will be used in a calculation.',
  'narr.exp.compare': 'The algorithm is checking whether these two elements are in the right order. This comparison determines whether a swap is needed.',
  'narr.exp.swap': "These two elements are out of order, so they're being swapped. After many such swaps, the array will be fully sorted.",

  // Expanded narration — Fibonacci
  'narr.exp.fib.call': '💡 Fibonacci creates a TREE of calls — Fib({n}) calls both Fib({n1}) and Fib({n2}). This means many sub-problems get computed more than once! This is why Fibonacci is O(2ⁿ) without memoization.',
  'narr.exp.fib.call.base': '💡 F(0)=0 and F(1)=1 are defined by the sequence. All other values are computed by adding the two preceding values.',
  'narr.exp.fib.return': '💡 Notice how each return value is the SUM of the two values that came back from the sub-calls. This is the "combine" step in the divide-and-conquer pattern.',
  'narr.exp.fib.baseCase': '💡 Base cases stop the recursion. Without them, Fibonacci would call itself infinitely and crash (Stack Overflow!). F(0)=0 and F(1)=1 are the two anchors.',

  // Expanded narration — Factorial
  'narr.exp.fact.call': '💡 Factorial uses "linear recursion" — each call makes exactly ONE recursive call. Think of it as building a chain: {n}! = {n} × {n1} × ... × 1. The stack grows to depth {n}.',
  'narr.exp.fact.return': '💡 On the way back up, each frame MULTIPLIES its value by the result from below. This "unwinding" phase is where the actual multiplication happens.',
  'narr.exp.fact.baseCase': '💡 The base case 1! = 1 (or 0! = 1) is the mathematical foundation. Without this stopping condition, the function would never return!',

  // Expanded narration — Power
  'narr.exp.pow.call': '💡 Power({base}, {exp}) = {base} × Power({base}, {exp1}). Each call reduces the exponent by 1. There\'s a faster version using "exponentiation by squaring" that\'s O(log n)!',
  'narr.exp.pow.return': '💡 Each return multiplies the base by the accumulated power from below. The stack is exactly "exp" frames deep.',
  'narr.exp.pow.baseCase': "💡 Any number to the power 0 is 1 — this is the mathematical identity. It's the perfect stopping condition!",

  // Expanded narration — SumArray
  'narr.exp.sum.call': '💡 SumArray walks through the array one index at a time. Each call handles ONE element and trusts recursion to sum the rest. This is the "trust the recursion" principle!',
  'narr.exp.sum.return': '💡 On the way back, each frame adds its element to the sum returned from below. The total builds up frame by frame.',
  'narr.exp.sum.baseCase': '💡 When the index goes past the array end, there\'s nothing left to add. The sum of zero elements is 0 — the identity for addition.',

  // Expanded narration — MaxItem
  'narr.exp.max.call': '💡 MaxItem compares each element against the maximum of the remaining elements. Think of it as a "tournament" — each element challenges the best of the rest!',
  'narr.exp.max.return': '💡 The return value is the WINNER of the comparison: max(current element, max of rest). The champion propagates all the way back up.',
  'narr.exp.max.baseCase': '💡 With only one element left, it\'s automatically the maximum. No comparison needed — it wins by default!',

  // Expanded narration — BubbleSort
  'narr.exp.bubble.compare': '💡 Bubble Sort always compares ADJACENT elements. After Pass {pass}, the {sorted} largest element(s) will be in their final positions at the right end. Time complexity: O(n²) — each pass does ~n comparisons.',
  'narr.exp.bubble.swap': '💡 The "bubble" effect: larger values migrate rightward step by step, like bubbles rising in water. Each swap moves a big element one position closer to its final spot.',

  // Expanded narration — SelectionSort
  'narr.exp.sel.compare': '💡 Selection Sort scans the unsorted portion to find the minimum. Pass {pass}: searching positions [{from}..{to}] for the smallest value. Time complexity: O(n²), but it does at most n swaps!',
  'narr.exp.sel.swap': '💡 Selection Sort does exactly ONE swap per pass — placing the minimum at position [{pos}]. It\'s efficient on swap-costly systems because it minimizes the number of writes.',

  // Expanded narration — InsertionSort
  'narr.exp.ins.compare': '💡 Insertion Sort keeps the left portion sorted at all times. Now inserting element #{elem} into its correct position. Best case (already sorted): O(n). Worst case (reversed): O(n²). Great for small or nearly-sorted data!',
  'narr.exp.ins.swap': '💡 Each swap "shifts" a larger element one position right, making room for the element being inserted. Think of it like inserting a card into a sorted hand of cards 🃏.',
} as const;

export type TranslationKey = keyof typeof en;
