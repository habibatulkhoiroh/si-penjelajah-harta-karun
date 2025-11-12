import { Trophy, TrendingUp, RotateCcw, Home } from 'lucide-react';

interface ResultScreenProps {
  isWin: boolean;
  currentLevel: number;
  levelScore: number;
  totalScore: number;
  onNextLevel: () => void;
  onRetry: () => void;
  onBackToMenu: () => void;
}

export function ResultScreen({
  isWin,
  currentLevel,
  levelScore,
  totalScore,
  onNextLevel,
  onRetry,
  onBackToMenu
}: ResultScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-700">
          <div className="text-center mb-8">
            {isWin ? (
              <>
                <div className="text-7xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-4xl font-bold text-green-400 mb-2">Level Selesai!</h2>
                <p className="text-slate-300">Selamat! Anda berhasil menyelesaikan level {currentLevel}</p>
              </>
            ) : (
              <>
                <div className="text-7xl mb-4">😔</div>
                <h2 className="text-4xl font-bold text-red-400 mb-2">Waktu Habis!</h2>
                <p className="text-slate-300">Coba lagi dan temukan semua objek lebih cepat</p>
              </>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-400" size={24} />
                  <span className="text-slate-300">Skor Level</span>
                </div>
                <span className="text-2xl font-bold text-white">{levelScore}</span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-green-400" size={24} />
                  <span className="text-slate-300">Total Skor</span>
                </div>
                <span className="text-2xl font-bold text-white">{totalScore}</span>
              </div>
            </div>

            {isWin && currentLevel < 100 && (
              <div className="bg-blue-600/20 rounded-xl p-4 border border-blue-500/50">
                <div className="text-center">
                  <div className="text-blue-300 text-sm mb-1">Level Selanjutnya</div>
                  <div className="text-3xl font-bold text-white">{currentLevel + 1}</div>
                </div>
              </div>
            )}

            {isWin && currentLevel === 100 && (
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-4 border border-yellow-500">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">🏆 SELAMAT! 🏆</div>
                  <div className="text-yellow-100 text-sm">Anda telah menyelesaikan semua 100 level!</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {isWin ? (
              <>
                {currentLevel < 100 && (
                  <button
                    onClick={onNextLevel}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
                  >
                    <TrendingUp size={24} />
                    Lanjut ke Level {currentLevel + 1}
                  </button>
                )}
                <button
                  onClick={onBackToMenu}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 font-bold text-lg flex items-center justify-center gap-2"
                >
                  <Home size={24} />
                  Kembali ke Menu
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onRetry}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
                >
                  <RotateCcw size={24} />
                  Coba Lagi
                </button>
                <button
                  onClick={onBackToMenu}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 font-bold text-lg flex items-center justify-center gap-2"
                >
                  <Home size={24} />
                  Kembali ke Menu
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
