import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useVisualization } from '../../store/VisualizationContext';
import { useLang } from '../../store/LangContext';

const CS_KEYWORDS = new Set([
  'int', 'void', 'if', 'else', 'for', 'while', 'return', 'new',
  'true', 'false', 'string', 'bool', 'double', 'null', 'var',
]);

/** Very lightweight C# tokeniser — just enough for keyword colouring */
function tokenise(line: string): { text: string; kind: 'keyword' | 'number' | 'string' | 'comment' | 'plain' }[] {
  const tokens: { text: string; kind: 'keyword' | 'number' | 'string' | 'comment' | 'plain' }[] = [];
  // Match keywords, numbers, strings, or comment prefixes
  const re = /\/\/.*|"[^"]*"|'[^']*'|\b\d+\b|\b[a-zA-Z_]\w*\b|[^\s\w]+|\s+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    const t = m[0];
    if (t.startsWith('//'))                   tokens.push({ text: t, kind: 'comment' });
    else if (t.startsWith('"') || t.startsWith("'")) tokens.push({ text: t, kind: 'string' });
    else if (/^\d+$/.test(t))                 tokens.push({ text: t, kind: 'number' });
    else if (CS_KEYWORDS.has(t))              tokens.push({ text: t, kind: 'keyword' });
    else                                      tokens.push({ text: t, kind: 'plain' });
  }
  return tokens;
}

const kindClass: Record<string, string> = {
  keyword: 'text-purple-400',
  number:  'text-orange-400',
  string:  'text-green-400',
  comment: 'text-slate-500 italic',
  plain:   'text-slate-200',
};

export function CodePanel() {
  const { state } = useVisualization();
  const { t } = useLang();
  const [collapsed, setCollapsed] = useState(false);

  const { csharpCode, csharpLineMap } = state.algorithm;
  const lines = useMemo(() => csharpCode.split('\n'), [csharpCode]);
  const currentStep = state.trace[state.stepIndex];
  const activeLines = useMemo(
    () => (currentStep ? new Set(csharpLineMap.getLines(currentStep)) : new Set<number>()),
    [currentStep, csharpLineMap],
  );

  return (
    <div className="rounded-2xl bg-elevated/80 backdrop-blur-sm border border-subtle/50 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-secondary hover:text-primary transition-colors"
        aria-expanded={!collapsed}
      >
        <span className="flex items-center gap-2">📝 <span>{t('code.title')}</span></span>
        <span className="text-xs">{collapsed ? t('code.show') : t('code.hide')}</span>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="code-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <pre className="px-4 pb-4 pt-1 text-sm leading-7 font-mono overflow-x-auto bg-[#0d0d14] text-slate-200 rounded-b-2xl" dir="ltr">
              {lines.map((line, i) => {
                const active = activeLines.has(i);
                return (
                  <div
                    key={i}
                    className={`flex transition-colors duration-200 rounded-md px-1 ${
                      active
                        ? 'bg-blue-900/40 border-l-[3px] border-blue-400'
                        : 'border-l-[3px] border-transparent'
                    }`}
                  >
                    <span className="w-9 flex-shrink-0 text-right pr-3 select-none text-slate-500 text-xs leading-7">
                      {i + 1}
                    </span>
                    <code>
                      {tokenise(line).map((tok, j) => (
                        <span key={j} className={kindClass[tok.kind]}>
                          {tok.text}
                        </span>
                      ))}
                    </code>
                  </div>
                );
              })}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
