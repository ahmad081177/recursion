import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadUnlockedAchievements, saveUnlockedAchievements, ACHIEVEMENTS, loadLevel, saveLevel, getLevelLabel } from '../engine/achievements';
import type { Achievement } from '../engine/types';

type Theme = 'dark' | 'light';

/** Serialisable shape stored in localStorage */
export interface CustomFunctionEntry {
  id: string;
  displayName: string;
  csharpCode: string;
  csharpSignature: string;
  /** JSON-stringified ParsedFunction */
  parsedJson: string;
  createdAt: number;
}

const CUSTOM_FN_KEY = 'recursiquest:custom-functions';

function loadCustomFunctions(): CustomFunctionEntry[] {
  try {
    const raw = localStorage.getItem(CUSTOM_FN_KEY);
    return raw ? JSON.parse(raw) as CustomFunctionEntry[] : [];
  } catch { return []; }
}
function saveCustomFunctions(fns: CustomFunctionEntry[]) {
  localStorage.setItem(CUSTOM_FN_KEY, JSON.stringify(fns));
}

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => void;
  level: number;
  levelLabel: string;
  recentAchievement: Achievement | null;
  clearRecentAchievement: () => void;
  onboardingDone: boolean;
  completeOnboarding: () => void;
  customFunctions: CustomFunctionEntry[];
  addCustomFunction: (entry: CustomFunctionEntry) => void;
  removeCustomFunction: (id: string) => void;
  updateCustomFunction: (id: string, updated: Partial<CustomFunctionEntry>) => void;
  exportFunctions: () => void;
  importFunctions: (file: File) => Promise<number>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('recursiquest:theme') as Theme) ?? 'dark';
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('recursiquest:sound') === 'true';
  });
  const [unlockedAchievements, setUnlocked] = useState<string[]>(() => loadUnlockedAchievements());
  const [level, setLevel] = useState<number>(() => loadLevel());
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);
  const [onboardingDone, setOnboardingDone] = useState(() => {
    return localStorage.getItem('recursiquest:onboarding') === 'true';
  });
  const [customFunctions, setCustomFunctions] = useState<CustomFunctionEntry[]>(() => loadCustomFunctions());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('recursiquest:theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('recursiquest:sound', String(next));
  };

  const unlockAchievement = (id: string) => {
    if (unlockedAchievements.includes(id)) return;
    const updated = [...unlockedAchievements, id];
    setUnlocked(updated);
    saveUnlockedAchievements(updated);
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (ach) setRecentAchievement(ach);

    // Level up logic based on achievements
    const newLevel = calculateLevel(updated);
    if (newLevel > level) {
      setLevel(newLevel);
      saveLevel(newLevel);
    }
  };

  const clearRecentAchievement = () => setRecentAchievement(null);

  const completeOnboarding = () => {
    setOnboardingDone(true);
    localStorage.setItem('recursiquest:onboarding', 'true');
  };

  const addCustomFunction = useCallback((entry: CustomFunctionEntry) => {
    setCustomFunctions(prev => {
      const updated = [...prev.filter(f => f.id !== entry.id), entry];
      saveCustomFunctions(updated);
      return updated;
    });
  }, []);

  const removeCustomFunction = useCallback((id: string) => {
    setCustomFunctions(prev => {
      const updated = prev.filter(f => f.id !== id);
      saveCustomFunctions(updated);
      return updated;
    });
  }, []);

  const updateCustomFunction = useCallback((id: string, updated: Partial<CustomFunctionEntry>) => {
    setCustomFunctions(prev => {
      const next = prev.map(fn => fn.id === id ? { ...fn, ...updated } : fn);
      saveCustomFunctions(next);
      return next;
    });
  }, []);

  const exportFunctions = useCallback(() => {
    const data = JSON.stringify(customFunctions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recursiquest-functions-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [customFunctions]);

  const importFunctions = useCallback(async (file: File): Promise<number> => {
    const text = await file.text();
    const entries = JSON.parse(text) as CustomFunctionEntry[];
    if (!Array.isArray(entries)) throw new Error('Invalid file format');
    let imported = 0;
    setCustomFunctions(prev => {
      const existingIds = new Set(prev.map(f => f.id));
      const newEntries = entries.filter(e =>
        e.id && e.displayName && e.csharpCode && e.parsedJson && !existingIds.has(e.id)
      );
      imported = newEntries.length;
      const merged = [...prev, ...newEntries];
      saveCustomFunctions(merged);
      return merged;
    });
    return imported;
  }, []);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      soundEnabled, toggleSound,
      unlockedAchievements, unlockAchievement,
      level, levelLabel: getLevelLabel(level),
      recentAchievement, clearRecentAchievement,
      onboardingDone, completeOnboarding,
      customFunctions, addCustomFunction, removeCustomFunction, updateCustomFunction,
      exportFunctions, importFunctions,
    }}>
      {children}
    </AppContext.Provider>
  );
}

function calculateLevel(unlockedIds: string[]): number {
  if (unlockedIds.includes('fibonacci-conqueror') && unlockedIds.includes('first-base-case')) return 3;
  if (unlockedIds.includes('fibonacci-conqueror')) return 2;
  if (unlockedIds.includes('first-base-case')) return 1;
  return 1;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
