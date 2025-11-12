import { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { ResultScreen } from './components/ResultScreen';
import { useGameProgress } from './hooks/useGameProgress';
import { generateLevelConfig } from './utils/gameConfig';
import { LevelConfig } from './types/game';

type GameState = 'start' | 'playing' | 'result';

function App() {
  const { gameProgress, isLoading, updateProgress } = useGameProgress();
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentLevelConfig, setCurrentLevelConfig] = useState<LevelConfig | null>(null);
  const [levelScore, setLevelScore] = useState(0);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (gameProgress) {
      document.title = `Level ${gameProgress.current_level} - Petualangan Harta Karun`;
    }
  }, [gameProgress]);

  const handleStartGame = () => {
    if (!gameProgress) return;
    const config = generateLevelConfig(gameProgress.current_level);
    setCurrentLevelConfig(config);
    setGameState('playing');
  };

  const handleLevelComplete = async (score: number) => {
    if (!gameProgress) return;

    setLevelScore(score);
    setIsWin(true);

    const newTotalScore = gameProgress.total_score + score;
    const newLevel = Math.min(gameProgress.current_level + 1, 100);
    const newHighestLevel = Math.max(gameProgress.highest_level, gameProgress.current_level);

    await updateProgress({
      current_level: newLevel,
      total_score: newTotalScore,
      highest_level: newHighestLevel
    });

    setGameState('result');
  };

  const handleLevelFailed = () => {
    setLevelScore(0);
    setIsWin(false);
    setGameState('result');
  };

  const handleRetry = () => {
    if (!gameProgress) return;
    const config = generateLevelConfig(gameProgress.current_level);
    setCurrentLevelConfig(config);
    setGameState('playing');
  };

  const handleNextLevel = () => {
    if (!gameProgress) return;
    const config = generateLevelConfig(gameProgress.current_level);
    setCurrentLevelConfig(config);
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('start');
  };

  const handleExitGame = () => {
    setGameState('start');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Memuat game...</div>
      </div>
    );
  }

  if (!gameProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Error loading game progress</div>
      </div>
    );
  }

  return (
    <>
      {gameState === 'start' && (
        <StartScreen
          onStartGame={handleStartGame}
          highestLevel={gameProgress.highest_level}
          totalScore={gameProgress.total_score}
        />
      )}

      {gameState === 'playing' && currentLevelConfig && (
        <GameBoard
          levelConfig={currentLevelConfig}
          onLevelComplete={handleLevelComplete}
          onLevelFailed={handleLevelFailed}
          onExitGame={handleExitGame}
        />
      )}

      {gameState === 'result' && (
        <ResultScreen
          isWin={isWin}
          currentLevel={gameProgress.current_level}
          levelScore={levelScore}
          totalScore={gameProgress.total_score}
          onNextLevel={handleNextLevel}
          onRetry={handleRetry}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </>
  );
}

export default App;
