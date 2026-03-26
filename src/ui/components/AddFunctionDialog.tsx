import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { parseCSharpFunction } from '../../engine/csharp-parser';
import { generateCustomTrace } from '../../engine/custom-trace';
import { useApp } from '../../store/AppContext';
import type { CustomFunctionEntry } from '../../store/AppContext';
import type { ParsedFunction } from '../../engine/csharp-parser';

const PLACEHOLDER_CODE = `int Factorial(int n)
{
    if (n <= 1) return 1;
    return n * Factorial(n - 1);
}`;

interface Props {
  open: boolean;
  onClose: () => void;
  editEntry?: CustomFunctionEntry;
}

export function AddFunctionDialog({ open, onClose, editEntry }: Props) {
  const { addCustomFunction, updateCustomFunction } = useApp();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const isEditing = !!editEntry;

  useEffect(() => {
    if (open && editEntry) {
      setCode(editEntry.csharpCode);
    } else if (open && !editEntry) {
      setCode('');
    }
    setError(null);
    setTestResult(null);
  }, [open, editEntry]);

  function handleTest() {
    setError(null);
    setTestResult(null);
    setTesting(true);

    const parseResult = parseCSharpFunction(code);
    if (!parseResult.ok) {
      setError(parseResult.error.message);
      setTesting(false);
      return;
    }

    const parsed = parseResult.fn;

    // Build default input
    const input: Record<string, unknown> = {};
    parsed.params.forEach(p => {
      input[p.name] = 4;
    });

    const traceResult = generateCustomTrace(parsed, input);
    if (!traceResult.ok) {
      setError(traceResult.error);
      setTesting(false);
      return;
    }

    const callCount = traceResult.trace.filter(s => s.type === 'CALL').length;
    const returnCount = traceResult.trace.filter(s => s.type === 'RETURN' || s.type === 'BASE_CASE').length;
    const inputStr = parsed.params.map(p => `${p.name}=4`).join(', ');
    setTestResult(`✅ ${parsed.name}(${inputStr}) — ${traceResult.trace.length} steps, ${callCount} calls, ${returnCount} returns. Ready to add!`);
    setTesting(false);
  }

  function handleAdd() {
    setError(null);
    const parseResult = parseCSharpFunction(code);
    if (!parseResult.ok) {
      setError(parseResult.error.message);
      return;
    }

    const parsed: ParsedFunction = parseResult.fn;

    // Quick validation trace
    const input: Record<string, unknown> = {};
    parsed.params.forEach(p => { input[p.name] = 4; });
    const traceResult = generateCustomTrace(parsed, input);
    if (!traceResult.ok) {
      setError(traceResult.error);
      return;
    }

    if (isEditing) {
      updateCustomFunction(editEntry.id, {
        displayName: parsed.name,
        csharpCode: code,
        csharpSignature: parsed.signature,
        parsedJson: JSON.stringify(parsed),
      });
    } else {
      const entry: CustomFunctionEntry = {
        id: `custom-${parsed.name.toLowerCase()}-${Date.now()}`,
        displayName: parsed.name,
        csharpCode: code,
        csharpSignature: parsed.signature,
        parsedJson: JSON.stringify(parsed),
        createdAt: Date.now(),
      };
      addCustomFunction(entry);
    }

    setCode('');
    setError(null);
    setTestResult(null);
    onClose();
  }

  function handleClose() {
    setError(null);
    setTestResult(null);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="relative w-full max-w-xl rounded-2xl bg-surface border border-subtle/50 shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-subtle/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{isEditing ? '✏️' : '✨'}</span>
                  <div>
                    <h2 className="text-lg font-bold text-primary">{isEditing ? 'Edit Your Function' : 'Add Your Function'}</h2>
                    <p className="text-xs text-secondary mt-0.5">{isEditing ? 'Modify the code and save your changes' : 'Paste a C# recursive function and we\'ll visualize it'}</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-secondary hover:text-primary text-lg w-8 h-8 flex items-center justify-center rounded-lg hover:bg-elevated transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              {/* Code editor */}
              <div>
                <label className="block text-sm text-secondary mb-2 font-medium">
                  C# Recursive Function
                </label>
                <textarea
                  value={code}
                  onChange={e => { setCode(e.target.value); setError(null); setTestResult(null); }}
                  placeholder={PLACEHOLDER_CODE}
                  rows={8}
                  spellCheck={false}
                  className="w-full bg-base border border-subtle/50 rounded-xl px-4 py-3 text-sm font-mono text-primary placeholder:text-secondary/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Supported patterns hint */}
              <div className="text-xs text-secondary/60 space-y-1">
                <p className="font-medium text-secondary/80">Supported patterns:</p>
                <ul className="list-disc list-inside space-y-0.5 pl-1">
                  <li><code className="text-blue-400/70">int</code> return type with <code className="text-blue-400/70">int</code> parameters</li>
                  <li><code className="text-yellow-400/70">if (...)</code> base case with <code className="text-yellow-400/70">return</code></li>
                  <li>Single or double recursive calls (like Fibonacci)</li>
                  <li>Arithmetic: <code className="text-purple-400/70">+ - * / %</code>, comparisons, ternary</li>
                </ul>
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 whitespace-pre-wrap"
                >
                  ❌ {error}
                </motion.div>
              )}

              {/* Test result */}
              {testResult && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-400 bg-green-500/10 border border-green-500/25 rounded-xl px-4 py-3"
                >
                  {testResult}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-subtle/30 flex items-center gap-3 justify-end">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-secondary hover:text-primary border border-subtle/50 hover:border-subtle transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTest}
                disabled={!code.trim() || testing}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                🧪 Test
              </button>
              <motion.button
                onClick={handleAdd}
                disabled={!code.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg shadow-blue-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isEditing ? '💾 Save Changes' : '➕ Add Function'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
