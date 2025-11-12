import { Play, Trophy, Target, Clock } from 'lucide-react';

interface StartScreenProps {
  onStartGame: () => void;
  highestLevel: number;
  totalScore: number;
}

export function StartScreen({ onStartGame, highestLevel, totalScore }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏴‍☠️</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Petualangan Harta Karun
            </h1>
            <p className="text-blue-300 text-lg">
              Game Edukasi Interaktif
            </p>
          </div>

          <div className="bg-slate-700/50 rounded-2xl p-6 mb-8 border border-slate-600">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="text-yellow-400" size={24} />
              Cara Bermain
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Perhatikan objek target yang harus dicari di setiap level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Klik semua objek target tersembunyi di dalam grid</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Selesaikan sebelum waktu habis untuk lanjut ke level berikutnya</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Kesulitan akan meningkat setiap level (lebih banyak objek, lebih sedikit waktu)</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-700/50 rounded-2xl p-6 mb-8 border border-slate-600">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="text-green-400" size={24} />
              Aturan Permainan
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Menang:</strong> Temukan semua objek target sebelum waktu habis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span><strong>Kalah:</strong> Waktu habis sebelum semua objek ditemukan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">🎯</span>
                <span><strong>Level:</strong> Ada 100 level dengan kesulitan yang meningkat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">⚡</span>
                <span><strong>Poin:</strong> Setiap objek yang ditemukan memberikan poin</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-700/50 rounded-2xl p-6 mb-8 border border-slate-600">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="text-purple-400" size={24} />
              Kontrol Game
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">🖱️</span>
                <span><strong>Mouse/Klik:</strong> Klik pada objek untuk memilihnya</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">📱</span>
                <span><strong>Sentuh:</strong> Tap pada objek untuk perangkat mobile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">❌</span>
                <span><strong>Keluar:</strong> Tekan tombol "Keluar" untuk kembali ke menu</span>
              </li>
            </ul>
          </div>

          {(highestLevel > 1 || totalScore > 0) && (
            <div className="flex gap-4 mb-8">
              <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-center border border-blue-500">
                <div className="text-blue-200 text-sm mb-1">Level Tertinggi</div>
                <div className="text-3xl font-bold text-white">{highestLevel}</div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-center border border-green-500">
                <div className="text-green-200 text-sm mb-1">Total Skor</div>
                <div className="text-3xl font-bold text-white">{totalScore}</div>
              </div>
            </div>
          )}

          <button
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 font-bold text-xl flex items-center justify-center gap-3 shadow-lg"
          >
            <Play size={28} />
            Mulai Petualangan
          </button>
        </div>
      </div>
    </div>
  );
}
