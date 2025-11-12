import { useEffect, useState } from 'react';
import { GameItem, LevelConfig } from '../types/game';
import { GAME_ICONS } from '../utils/gameConfig';
import { Timer, Trophy, Target, X } from 'lucide-react';

interface GameBoardProps {
  levelConfig: LevelConfig;
  onLevelComplete: (score: number) => void;
  onLevelFailed: () => void;
  onExitGame: () => void;
}

export function GameBoard({ levelConfig, onLevelComplete, onLevelFailed, onExitGame }: GameBoardProps) {
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  const [timeLeft, setTimeLeft] = useState(levelConfig.timeLimit);
  const [score, setScore] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [levelConfig]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onLevelFailed();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onLevelFailed]);

  useEffect(() => {
    if (foundCount === levelConfig.targetCount && foundCount > 0) {
      setTimeout(() => {
        onLevelComplete(score);
      }, 500);
    }
  }, [foundCount, levelConfig.targetCount, score, onLevelComplete]);

  const initializeGame = () => {
    const totalItems = levelConfig.gridSize * levelConfig.gridSize;
    const items: GameItem[] = [];
    const targetIndices = new Set<number>();

    while (targetIndices.size < levelConfig.targetCount) {
      targetIndices.add(Math.floor(Math.random() * totalItems));
    }

    const availableIcons = [...GAME_ICONS];
    const targetIcon = availableIcons[Math.floor(Math.random() * availableIcons.length)];

    for (let i = 0; i < totalItems; i++) {
      const isTarget = targetIndices.has(i);
      const icon = isTarget
        ? targetIcon
        : availableIcons[Math.floor(Math.random() * availableIcons.length)];

      items.push({
        id: i,
        icon,
        isTarget,
        isFound: false
      });
    }

    setGameItems(items);
    setTimeLeft(levelConfig.timeLimit);
    setScore(0);
    setFoundCount(0);
  };

  const handleItemClick = (itemId: number) => {
    const item = gameItems.find((i) => i.id === itemId);
    if (!item || item.isFound) return;

    if (item.isTarget) {
      const newScore = score + levelConfig.pointsPerItem;
      setScore(newScore);
      setFoundCount(foundCount + 1);
      setGameItems(
        gameItems.map((i) =>
          i.id === itemId ? { ...i, isFound: true } : i
        )
      );
    }
  };

  const targetIcon = gameItems.find(item => item.isTarget)?.icon || '💎';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-2xl border border-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Level {levelConfig.level}</h2>
              <p className="text-blue-300 text-sm">{levelConfig.theme}</p>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2 bg-blue-600/30 px-4 py-2 rounded-lg border border-blue-500/50">
                <Timer className="text-blue-300" size={20} />
                <span className={`font-bold text-lg ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                  {timeLeft}s
                </span>
              </div>

              <div className="flex items-center gap-2 bg-green-600/30 px-4 py-2 rounded-lg border border-green-500/50">
                <Trophy className="text-green-300" size={20} />
                <span className="font-bold text-lg text-white">{score}</span>
              </div>

              <div className="flex items-center gap-2 bg-purple-600/30 px-4 py-2 rounded-lg border border-purple-500/50">
                <Target className="text-purple-300" size={20} />
                <span className="font-bold text-lg text-white">
                  {foundCount}/{levelConfig.targetCount}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowExitConfirm(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <X size={20} />
              Keluar
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-2xl border border-slate-700">
          <div className="flex items-center gap-3 justify-center">
            <p className="text-white text-lg">Cari objek ini:</p>
            <div className="text-5xl bg-yellow-500/20 px-6 py-3 rounded-xl border-2 border-yellow-500 shadow-lg">
              {targetIcon}
            </div>
          </div>
        </div>

        <div
          className="grid gap-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700"
          style={{
            gridTemplateColumns: `repeat(${levelConfig.gridSize}, minmax(0, 1fr))`
          }}
        >
          {gameItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              disabled={item.isFound}
              className={`
                aspect-square text-4xl md:text-5xl flex items-center justify-center rounded-xl
                transition-all duration-300 transform
                ${item.isFound
                  ? 'bg-green-500 scale-110 shadow-lg shadow-green-500/50 animate-pulse'
                  : 'bg-slate-700 hover:bg-slate-600 hover:scale-105 active:scale-95'
                }
                ${!item.isFound && 'cursor-pointer hover:shadow-xl'}
                border-2 ${item.isFound ? 'border-green-400' : 'border-slate-600'}
              `}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">Keluar dari Permainan?</h3>
            <p className="text-slate-300 mb-6">
              Progress level ini tidak akan disimpan. Apakah Anda yakin ingin keluar?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors font-semibold"
              >
                Batal
              </button>
              <button
                onClick={onExitGame}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors font-semibold"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
