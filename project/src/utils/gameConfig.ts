import { LevelConfig } from '../types/game';

export const THEMES = [
  'Hutan Mistis',
  'Gua Kristal',
  'Kuil Kuno',
  'Piramida Mesir',
  'Kastil Medieval',
  'Pulau Tropis',
  'Gunung Salju',
  'Laut Dalam',
  'Kota Tua',
  'Istana Raja'
];

export const GAME_ICONS = [
  '💎', '🔮', '👑', '🗝️', '📜', '⚱️', '🏺', '🪙',
  '🎭', '🗿', '⚔️', '🛡️', '📿', '🔱', '⚡', '🌟',
  '🔥', '❄️', '🌊', '🌪️', '🎯', '🎪', '🎨', '🎭',
  '🏆', '🎖️', '🥇', '🏅', '🎁', '📦', '🎲', '🃏'
];

export function generateLevelConfig(level: number): LevelConfig {
  const baseGridSize = 4;
  const baseTargets = 3;
  const baseTime = 60;

  const gridSize = Math.min(baseGridSize + Math.floor((level - 1) / 10), 8);
  const targetCount = Math.min(baseTargets + Math.floor((level - 1) / 5), gridSize * 2);
  const timeLimit = Math.max(baseTime - Math.floor((level - 1) / 2), 20);
  const pointsPerItem = 10 + Math.floor((level - 1) / 10) * 5;
  const theme = THEMES[Math.floor((level - 1) / 10) % THEMES.length];

  return {
    level,
    gridSize,
    targetCount,
    timeLimit,
    pointsPerItem,
    theme
  };
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
