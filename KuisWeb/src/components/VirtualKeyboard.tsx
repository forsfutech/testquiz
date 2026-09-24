import React from 'react';
import { soundPlayer } from '../utils/audio';
import { Delete, CornerDownLeft, Keyboard } from 'lucide-react';

interface VirtualKeyboardProps {
  onKeyPress: (char: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  highlightKey?: string; // Optional letter to highlight as next expected key
  disabled?: boolean;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  onDelete,
  onSubmit,
  highlightKey,
  disabled = false
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleKeyClick = (key: string) => {
    if (disabled) return;
    soundPlayer.playKey();
    onKeyPress(key);
  };

  const handleDeleteClick = () => {
    if (disabled) return;
    soundPlayer.playKey();
    onDelete();
  };

  const handleSubmitClick = () => {
    if (disabled) return;
    onSubmit();
  };

  const normHighlight = highlightKey ? highlightKey.toUpperCase() : '';

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl shadow-xl border border-slate-700/60 text-slate-100 transition-all">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
          <Keyboard className="w-4 h-4 text-amber-400" />
          <span>Papan Ketik Ceria (Bisa klik atau ketik keyboard fisik)</span>
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-xs text-amber-300 hover:text-amber-200 px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
        >
          {isCollapsed ? 'Buka Papan Ketik ▲' : 'Sembunyikan ▼'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="flex flex-col gap-1.5 sm:gap-2 select-none">
          {/* Row 1 */}
          <div className="flex justify-center gap-1 sm:gap-1.5">
            {KEYBOARD_ROWS[0].map(k => {
              const isTarget = normHighlight === k;
              return (
                <button
                  key={k}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleKeyClick(k)}
                  className={`flex-1 max-w-12 h-10 sm:h-12 rounded-xl text-sm sm:text-base font-bold shadow-md transition-all active:scale-95 flex items-center justify-center ${
                    isTarget
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/60 animate-bounce'
                      : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white border border-slate-700'
                  }`}
                >
                  {k}
                </button>
              );
            })}
          </div>

          {/* Row 2 */}
          <div className="flex justify-center gap-1 sm:gap-1.5 px-2 sm:px-4">
            {KEYBOARD_ROWS[1].map(k => {
              const isTarget = normHighlight === k;
              return (
                <button
                  key={k}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleKeyClick(k)}
                  className={`flex-1 max-w-12 h-10 sm:h-12 rounded-xl text-sm sm:text-base font-bold shadow-md transition-all active:scale-95 flex items-center justify-center ${
                    isTarget
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/60 animate-bounce'
                      : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white border border-slate-700'
                  }`}
                >
                  {k}
                </button>
              );
            })}
          </div>

          {/* Row 3 */}
          <div className="flex justify-center gap-1 sm:gap-1.5">
            <button
              type="button"
              disabled={disabled}
              onClick={handleDeleteClick}
              title="Hapus satu huruf"
              className="px-2.5 sm:px-4 h-10 sm:h-12 rounded-xl text-xs sm:text-sm font-semibold bg-red-600/80 hover:bg-red-500 active:bg-red-600 text-white shadow-md flex items-center justify-center gap-1 border border-red-500/50 active:scale-95"
            >
              <Delete className="w-4 h-4" />
              <span className="hidden sm:inline">Hapus</span>
            </button>

            {KEYBOARD_ROWS[2].map(k => {
              const isTarget = normHighlight === k;
              return (
                <button
                  key={k}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleKeyClick(k)}
                  className={`flex-1 max-w-12 h-10 sm:h-12 rounded-xl text-sm sm:text-base font-bold shadow-md transition-all active:scale-95 flex items-center justify-center ${
                    isTarget
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/60 animate-bounce'
                      : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white border border-slate-700'
                  }`}
                >
                  {k}
                </button>
              );
            })}

            <button
              type="button"
              disabled={disabled}
              onClick={handleSubmitClick}
              title="Kirim Jawaban"
              className="px-2.5 sm:px-4 h-10 sm:h-12 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600 text-white shadow-md flex items-center justify-center gap-1 border border-emerald-500/50 active:scale-95"
            >
              <CornerDownLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kirim</span>
            </button>
          </div>

          {/* Row 4 (Spacebar) */}
          <div className="flex justify-center gap-2 mt-0.5">
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleKeyClick(' ')}
              className="w-48 sm:w-64 h-9 sm:h-10 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 border border-slate-700 shadow-sm flex items-center justify-center gap-2 active:scale-95"
            >
              <span>␣ Spasi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
