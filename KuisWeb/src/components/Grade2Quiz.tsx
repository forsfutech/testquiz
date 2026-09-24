import React, { useState, useEffect, useRef } from 'react';
import {
  Grade2ComputerIconQuestion,
  GRADE_2_QUESTIONS,
  StudentProfile,
  QuizScoreRecord
} from '../data/quizData';
import { ComputerIconIllustration } from './KidGraphics';
import { VirtualKeyboard } from './VirtualKeyboard';
import { soundPlayer } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  HelpCircle,
  SkipForward,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Monitor,
  Info,
  Lightbulb
} from 'lucide-react';

interface Grade2QuizProps {
  profile: StudentProfile;
  onFinishQuiz: (record: QuizScoreRecord) => void;
  onExitToMenu: () => void;
}

export const Grade2Quiz: React.FC<Grade2QuizProps> = ({
  profile,
  onFinishQuiz,
  onExitToMenu
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedChars, setRevealedChars] = useState<string[]>([]);
  const [showClue, setShowClue] = useState(true);
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'correct' | 'wrong' | 'skipped';
    message: string;
  }>({ status: 'idle', message: '' });

  // Score states
  const [totalScore, setTotalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const currentQ: Grade2ComputerIconQuestion = GRADE_2_QUESTIONS[currentIndex];

  useEffect(() => {
    setTypedInput('');
    setHintsUsed(0);
    setAttemptCount(0);
    setRevealedChars([]);
    setShowClue(true);
    setFeedback({ status: 'idle', message: '' });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [currentIndex, currentQ]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) {
        if (e.key === 'Enter') {
          handleSubmit();
        }
        return;
      }

      if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Backspace') {
        handleVirtualDelete();
      } else if (e.key.length === 1 && /[a-zA-Z0-9 ]/.test(e.key)) {
        handleVirtualKey(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleVirtualKey = (char: string) => {
    soundPlayer.playKey();
    if (feedback.status === 'correct') return;
    setTypedInput(prev => prev + char);
  };

  const handleVirtualDelete = () => {
    soundPlayer.playKey();
    if (feedback.status === 'correct') return;
    setTypedInput(prev => prev.slice(0, -1));
  };

  // Text-to-speech for clue
  const speakClue = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Check Answer Handler
  const handleSubmit = () => {
    if (feedback.status === 'correct') {
      goToNextQuestion();
      return;
    }

    const cleanInput = typedInput.trim().toLowerCase();
    if (!cleanInput) {
      soundPlayer.playWrong();
      setFeedback({
        status: 'wrong',
        message: 'Ketik dulu nama ikonnya di kotak ya! 😊'
      });
      return;
    }

    setAttemptCount(prev => prev + 1);

    // Check if input matches any of accepted answers
    const isMatched = currentQ.acceptedAnswers.some(ans => {
      const cleanAns = ans.toLowerCase();
      return cleanInput === cleanAns || cleanInput.includes(cleanAns) || cleanAns.includes(cleanInput);
    });

    if (isMatched) {
      soundPlayer.playSuccess();
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 }
      });

      const points = attemptCount === 0 && hintsUsed === 0 ? 10 : 7;
      setTotalScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);

      setFeedback({
        status: 'correct',
        message: `Benar sekali! Ini adalah ikon ${currentQ.iconName}! (+${points} Poin) 🌟`
      });

      setTimeout(() => {
        goToNextQuestion();
      }, 1500);
    } else {
      soundPlayer.playWrong();
      setFeedback({
        status: 'wrong',
        message: 'Jawabanmu belum tepat. Coba periksa petunjuk atau buka huruf bantuan ya! 💡'
      });
    }
  };

  // Skip question handler
  const handleSkip = () => {
    soundPlayer.playSkip();
    setSkippedCount(prev => prev + 1);
    setFeedback({
      status: 'skipped',
      message: `Soal dilewati. Ikon ini adalah "${currentQ.iconName}". Ayo tetap semangat! 🚀`
    });

    setTimeout(() => {
      goToNextQuestion();
    }, 1400);
  };

  // Reveal 1 Letter hint
  const handleRevealLetter = () => {
    soundPlayer.playKey();
    setHintsUsed(prev => prev + 1);

    const target = currentQ.targetAnswer.toUpperCase();
    const letters = target.split('');
    const unrevealedIndex = letters.findIndex((_, idx) => !revealedChars[idx]);

    if (unrevealedIndex !== -1) {
      const nextRevealed = [...revealedChars];
      nextRevealed[unrevealedIndex] = letters[unrevealedIndex];
      setRevealedChars(nextRevealed);
      setTypedInput(nextRevealed.join(''));
    }
  };

  const goToNextQuestion = () => {
    if (currentIndex < GRADE_2_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      soundPlayer.playFanfare();
      const maxPossibleScore = GRADE_2_QUESTIONS.length * 10;
      const normalizedScore = Math.round((totalScore / maxPossibleScore) * 100);

      let stars = 3;
      if (normalizedScore >= 90) stars = 5;
      else if (normalizedScore >= 75) stars = 4;
      else if (normalizedScore >= 50) stars = 3;
      else if (normalizedScore >= 30) stars = 2;
      else stars = 1;

      const record: QuizScoreRecord = {
        id: 'quiz_' + Date.now(),
        studentName: profile.name,
        avatar: profile.avatar,
        grade: 2,
        totalQuestions: GRADE_2_QUESTIONS.length,
        correctAnswers: correctCount,
        skippedQuestions: skippedCount,
        finalScore: normalizedScore,
        stars,
        completedAt: new Date().toISOString()
      };

      onFinishQuiz(record);
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / GRADE_2_QUESTIONS.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 md:py-6">
      {/* Top Header Card: Profile, Grade & Points */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-200 flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center font-bold text-sky-800 border border-sky-300">
            2 SD
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">
              {profile.name}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Monitor className="w-3 h-3 text-sky-600" />
              <span>Mengenal Ikon Komputer</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-semibold block">Skor Kamu</span>
            <span className="text-lg font-black text-amber-600 tabular-nums">{totalScore} Poin</span>
          </div>

          <button
            type="button"
            onClick={onExitToMenu}
            className="text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl font-bold transition"
          >
            Ganti Kelas / Menu
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-sky-100 rounded-full h-3 mb-6 overflow-hidden border border-sky-200">
        <div
          className="bg-sky-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border-2 border-sky-200/80 mb-4 relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-bold text-xs">
            Soal {currentIndex + 1} dari {GRADE_2_QUESTIONS.length}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            Kategori: {currentQ.category}
          </span>
        </div>

        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 mb-1">
            Ikon apakah gambar di bawah ini?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-4">
            Perhatikan gambarnya dengan seksama, lalu ketik nama ikonnya di kotak jawaban.
          </p>

          {/* Computer Icon Graphic */}
          <div className="flex justify-center my-3">
            <ComputerIconIllustration
              name={currentQ.svgType}
              className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-md transition hover:scale-105"
            />
          </div>

          {/* Educational Clue Box */}
          <div className="max-w-lg mx-auto bg-sky-50/70 border-2 border-sky-200/80 rounded-2xl p-3.5 mb-4 text-left">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider">
                    Fungsi di Komputer:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed">
                    {currentQ.clue}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => speakClue(currentQ.clue)}
                title="Dengarkan Suara Petunjuk"
                className="p-1.5 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 transition shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Letter Slots */}
          <div className="flex justify-center flex-wrap gap-1.5 sm:gap-2 mb-4">
            {currentQ.targetAnswer.split('').map((char, idx) => {
              const isRevealed = revealedChars[idx];
              const typedChar = typedInput[idx] || isRevealed || '';
              const isSpace = char === ' ';

              if (isSpace) {
                return <div key={idx} className="w-4 h-10 sm:h-12" />;
              }

              return (
                <div
                  key={idx}
                  className={`w-9 h-11 sm:w-11 sm:h-13 rounded-xl border-2 flex items-center justify-center font-extrabold text-lg sm:text-xl shadow-sm transition-all ${
                    typedChar
                      ? 'bg-sky-100 text-sky-900 border-sky-400'
                      : 'bg-slate-50 text-slate-300 border-slate-300'
                  }`}
                >
                  {typedChar.toUpperCase()}
                </div>
              );
            })}
          </div>

          {/* Input Box for typing computer icon name */}
          <div className="max-w-sm mx-auto mb-3">
            <input
              ref={inputRef}
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder="Ketik nama ikon di sini..."
              className="w-full text-center py-3 px-4 text-xl font-bold rounded-2xl border-2 border-sky-300 bg-sky-50/50 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-200 shadow-inner uppercase tracking-wider text-slate-800"
            />
          </div>

          {/* Assistance Button: Buka 1 Huruf */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleRevealLetter}
              className="text-xs sm:text-sm text-sky-800 font-bold px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 transition flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-sky-600" />
              <span>
                Buka 1 Huruf Bantuan ({revealedChars.filter(Boolean).length}/{currentQ.targetAnswer.replace(/\s+/g, '').length})
              </span>
            </button>
          </div>
        </div>

        {/* Feedback Message */}
        {feedback.message && (
          <div
            className={`mt-5 p-3 sm:p-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
              feedback.status === 'correct'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : feedback.status === 'skipped'
                ? 'bg-sky-100 text-sky-800 border border-sky-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            {feedback.status === 'correct' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : feedback.status === 'skipped' ? (
              <SkipForward className="w-5 h-5 text-sky-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Action Controls: Skip & Submit */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleSkip}
            className="py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
          >
            <SkipForward className="w-4 h-4 text-slate-500" />
            <span>Lewati Soal Ini (Skip)</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="py-2.5 px-6 rounded-2xl bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-extrabold text-sm sm:text-base shadow-md flex items-center gap-2 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Kirim Jawaban</span>
          </button>
        </div>
      </div>

      {/* On-Screen Virtual Keyboard */}
      <VirtualKeyboard
        onKeyPress={handleVirtualKey}
        onDelete={handleVirtualDelete}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
