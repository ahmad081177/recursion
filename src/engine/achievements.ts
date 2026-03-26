import type { Achievement } from './types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-base-case',
    title: 'First Base Case!',
    description: 'Witnessed the condition that stops recursion',
    icon: '🛑',
    unlockCondition: 'Reach a BASE_CASE step in any algorithm',
  },
  {
    id: 'fibonacci-conqueror',
    title: 'Fibonacci Conqueror',
    description: 'Completed a full Fibonacci trace',
    icon: '🌀',
    unlockCondition: 'Run Fibonacci to completion',
  },
  {
    id: 'sort-master',
    title: 'Sort Master',
    description: 'Watched a complete sorting algorithm run',
    icon: '↕️',
    unlockCondition: 'Complete any sorting algorithm trace',
  },
  {
    id: 'combo-5',
    title: 'On Fire!',
    description: '5 correct quiz predictions in a row',
    icon: '🔥',
    unlockCondition: 'Get 5 correct quiz answers consecutively',
  },
  {
    id: 'stack-overflow',
    title: 'Survived the Overflow',
    description: 'Triggered disaster mode and learned what stack overflow means',
    icon: '💥',
    unlockCondition: 'View the stack overflow disaster mode',
  },
];

const STORAGE_KEY = 'recursiquest:achievements';
const LEVEL_KEY = 'recursiquest:level';

export function loadUnlockedAchievements(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[];
  } catch {
    return [];
  }
}

export function saveUnlockedAchievements(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function loadLevel(): number {
  return parseInt(localStorage.getItem(LEVEL_KEY) ?? '1', 10);
}

export function saveLevel(level: number): void {
  localStorage.setItem(LEVEL_KEY, String(level));
}

export function getLevelLabel(level: number): string {
  const labels: Record<number, string> = {
    1: 'Recursion Beginner',
    2: 'Fibonacci Explorer',
    3: 'Array Recursion Master',
    4: 'Sorting Champion',
    5: 'RecursiQuest Legend',
  };
  return labels[level] ?? 'Learner';
}
