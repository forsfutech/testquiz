import React, { useState, useEffect, useRef } from 'react';
import {
  Grade1Question,
  GRADE_1_QUESTIONS,
  StudentProfile,
  QuizScoreRecord
} from '../data/quizData';
import { PictureIllustration } from './KidGraphics';
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
  RefreshCw,
  Award
} from 'lucide-react';

interface Grade1QuizProps {
  profile: StudentProfile;
  onFinishQuiz: (record: QuizScoreRecord) => void;
  onExitToMenu: () => void;
}

export const Grade1Quiz: React.FC<Grade1QuizProps> = ({
  profile,
  onFinishQuiz,
  onExitToMenu
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedChars, setRevealedChars] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'correct' | 'wrong' | 'skipped';
    message: string;
  }>({ status: 'idle', message: '' });

  // Scoring tally
  const [totalScore, setTotalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [attemptCountForCurrent, setAttemptCountForCurrent] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const currentQ: Grade1Question = GRADE_1_QUESTIONS[currentIndex];

  // Setup current question state
  useEffect(() => {
    setTypedInput('');
    setHintsUsed(0);
    setAttemptCountForCurrent(0);
    setRevealedChars([]);
    setFeedback({ status: 'idle', message: '' });

    if (currentQ.type === 'sentence') {
      // Shuffle words for jumbled sentence
      const shuffled = [...currentQ.jumbledWords].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setAssembledWords([]);
    } else {
      setAvailableWords([]);
      setAssembledWords([]);
    }

    // Auto focus input if typing or guess picture
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [currentIndex, currentQ]);

  // Physical keyboard listener for typing test & guess picture
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in input naturally, do not intercept
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

  // Handle Virtual Keyboard Key
  const handleVirtualKey = (char: string) => {
    soundPlayer.playKey();
    if (feedback.status === 'correct') return;

    if (currentQ.type === 'typing') {
      const nextTyped = (typedInput + char).toUpperCase();
      if (nextTyped.length <= currentQ.word.length) {
        setTypedInput(nextTyped);
        // Instant check if full word reached
        if (nextTyped === currentQ.word.toUpperCase()) {
          handleSuccess();
        }
      }
    } else if (currentQ.type === 'guess_picture') {
      setTypedInput(prev => prev + char);
    }
  };

  const handleVirtualDelete = () => {
    soundPlayer.playKey();
    if (feedback.status === 'correct') return;
    setTypedInput(prev => prev.slice(0, -1));
  };

  // Trigger sound feedback
  const speakHint = (text: string) => {
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

    setAttemptCountForCurrent(prev => prev + 1);

    if (currentQ.type === 'typing') {
      if (typedInput.trim().toUpperCase() === currentQ.word.toUpperCase()) {
        handleSuccess();
      } else {
        handleWrong('Tulisan belum sama persis, yuk coba periksa lagi! ✨');
      }
    } else if (currentQ.type === 'sentence') {
      const builtSentence = assembledWords.join(' ').trim().toLowerCase();
      const targetSentence = currentQ.correctSentence.trim().toLowerCase();

      if (builtSentence === targetSentence) {
        handleSuccess();
      } else {
        handleWrong('Urutan kalimat belum tepat, coba susun ulang ya! 😊');
      }
    } else if (currentQ.type === 'guess_picture') {
      const cleanTyped = typedInput.trim().toLowerCase();
      const isCorrect = currentQ.acceptedAnswers.some(ans => ans.toLowerCase() === cleanTyped);

      if (isCorrect) {
        handleSuccess();
      } else {
        handleWrong('Tebakanmu belum tepat, coba lihat petunjuknya ya! 💡');
      }
    }
  };

  const handleSuccess = () => {
    soundPlayer.playSuccess();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });

    const points = attemptCountForCurrent === 0 && hintsUsed === 0 ? 10 : 7;
    setTotalScore(prev => prev + points);
    setCorrectCount(prev => prev + 1);

    setFeedback({
      status: 'correct',
      message: `Hebat sekali! Jawabanmu Benar! (+${points} Poin) 🎉`
    });

    setTimeout(() => {
      goToNextQuestion();
    }, 1400);
  };

  const handleWrong = (msg: string) => {
    soundPlayer.playWrong();
    setFeedback({
      status: 'wrong',
      message: msg
    });
  };

  // Skip Question Handler
  const handleSkip = () => {
    soundPlayer.playSkip();
    setSkippedCount(prev => prev + 1);
    setFeedback({
      status: 'skipped',
      message: 'Soal ini dilewati. Jangan berkecil hati, ayo lanjut ke soal berikutnya! 🚀'
    });

    setTimeout(() => {
      goToNextQuestion();
    }, 1200);
  };

  // Clue / Hint reveal for picture or typing
  const handleUseHint = () => {
    soundPlayer.playKey();
    setHintsUsed(prev => prev + 1);

    if (currentQ.type === 'guess_picture') {
      const targetLetters = currentQ.targetWord.split('');
      const unrevealedIdx = targetLetters.findIndex((_, idx) => !revealedChars[idx]);
      if (unrevealedIdx !== -1) {
        const nextRevealed = [...revealedChars];
        nextRevealed[unrevealedIdx] = targetLetters[unrevealedIdx];
        setRevealedChars(nextRevealed);
        // Pre-fill typed input
        setTypedInput(nextRevealed.join(''));
      }
    } else if (currentQ.type === 'sentence') {
      // Find the next correct word in sequence and place it
      const correctWords = currentQ.correctSentence.split(' ');
      const nextWordNeeded = correctWords[assembledWords.length];
      if (nextWordNeeded && availableWords.includes(nextWordNeeded)) {
        setAssembledWords([...assembledWords, nextWordNeeded]);
        setAvailableWords(availableWords.filter((w, i) => i !== availableWords.indexOf(nextWordNeeded)));
      }
    }
  };

  // Next question or finish
  const goToNextQuestion = () => {
    if (currentIndex < GRADE_1_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finished all questions!
      soundPlayer.playFanfare();
      const maxPossibleScore = GRADE_1_QUESTIONS.length * 10;
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
        grade: 1,
        totalQuestions: GRADE_1_QUESTIONS.length,
        correctAnswers: correctCount,
        skippedQuestions: skippedCount,
        finalScore: normalizedScore,
        stars,
        completedAt: new Date().toISOString()
      };

      onFinishQuiz(record);
    }
  };

  // Next required key for virtual keyboard guide
  const getExpectedKey = (): string | undefined => {
    if (currentQ.type === 'typing') {
      const nextIndex = typedInput.length;
      if (nextIndex < currentQ.word.length) {
        return currentQ.word[nextIndex];
      }
    }
    return undefined;
  };

  const progressPercent = Math.round(((currentIndex + 1) / GRADE_1_QUESTIONS.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 md:py-6">
      {/* Top Header Card: Student Info & Progress */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-200 flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center font-bold text-emerald-800 border border-emerald-300">
            1 SD
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">
              {profile.name}
            </h3>
            <p className="text-xs text-slate-500">{currentQ.categoryTitle}</p>
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
      <div className="w-full bg-amber-100 rounded-full h-3 mb-6 overflow-hidden border border-amber-200">
        <div
          className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Container Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border-2 border-emerald-200/80 mb-4 relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
            Soal {currentIndex + 1} dari {GRADE_1_QUESTIONS.length}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            {currentQ.type === 'typing'
              ? '⌨️ Latihan Mengetik'
              : currentQ.type === 'sentence'
              ? '🧩 Susun Kalimat'
              : '🎨 Tebak Gambar'}
          </span>
        </div>

        {/* --- SUBTYPE 1: TES MENGETIK --- */}
        {currentQ.type === 'typing' && (
          <div className="text-center py-2">
            <p className="text-base sm:text-lg font-semibold text-slate-700 mb-4">
              {currentQ.instruction}
            </p>

            {/* Target Word Display with big child-friendly tiles */}
            <div className="inline-flex items-center gap-2 sm:gap-3 my-4 bg-amber-50/80 p-3 sm:p-5 rounded-3xl border-2 border-amber-200">
              <span className="text-3xl sm:text-4xl">{currentQ.funEmoji}</span>
              <div className="flex gap-1.5 sm:gap-2">
                {currentQ.word.split('').map((char, i) => {
                  const typedChar = typedInput[i] || '';
                  const isCurrent = typedInput.length === i;
                  const isMatch = typedChar.toUpperCase() === char.toUpperCase();

                  return (
                    <div
                      key={i}
                      className={`w-12 h-14 sm:w-16 sm:h-18 rounded-2xl flex flex-col items-center justify-center font-extrabold text-2xl sm:text-3xl border-3 shadow-md transition-all ${
                        isMatch
                          ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                          : isCurrent
                          ? 'bg-white text-slate-800 border-amber-500 ring-4 ring-amber-200 animate-pulse'
                          : 'bg-white text-slate-400 border-slate-300'
                      }`}
                    >
                      <span>{char}</span>
                      {typedChar && (
                        <span className="text-xs font-bold text-amber-200 leading-none mt-1">
                          {typedChar}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Physical typing input hidden / visible helper */}
            <div className="max-w-xs mx-auto mt-2">
              <input
                ref={inputRef}
                type="text"
                value={typedInput}
                maxLength={currentQ.word.length}
                onChange={(e) => {
                  const val = e.target.value.toUpperCase();
                  setTypedInput(val);
                  if (val === currentQ.word.toUpperCase()) {
                    handleSuccess();
                  }
                }}
                placeholder="Ketik di sini..."
                className="w-full text-center py-2 px-4 text-xl font-bold rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 uppercase tracking-widest text-slate-800"
              />
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
              <span>💡 Petunjuk: {currentQ.hint}</span>
              <button
                type="button"
                onClick={() => speakHint(currentQ.hint)}
                title="Dengarkan Suara"
                className="p-1 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* --- SUBTYPE 2: MENYAMBUNG KALIMAT --- */}
        {currentQ.type === 'sentence' && (
          <div className="text-center py-2">
            <p className="text-base sm:text-lg font-semibold text-slate-700 mb-2">
              {currentQ.instruction}
            </p>

            {/* Assembled Sentence Box */}
            <div className="min-h-20 p-4 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300 flex flex-wrap items-center justify-center gap-2 mb-4">
              {assembledWords.length === 0 ? (
                <span className="text-slate-400 text-sm font-medium italic">
                  Klik kata-kata di bawah ini berurutan untuk menyambung kalimat...
                </span>
              ) : (
                assembledWords.map((word, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      soundPlayer.playKey();
                      // Remove this word and return to available pool
                      setAssembledWords(assembledWords.filter((_, i) => i !== index));
                      setAvailableWords([...availableWords, word]);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white font-bold text-base shadow-sm border border-emerald-600 hover:bg-emerald-600 active:scale-95 transition flex items-center gap-1.5"
                  >
                    <span>{word}</span>
                    <span className="text-xs bg-emerald-700 px-1 rounded">✕</span>
                  </button>
                ))
              )}
            </div>

            {/* Available Words to click */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    soundPlayer.playKey();
                    setAssembledWords([...assembledWords, word]);
                    setAvailableWords(availableWords.filter((_, i) => i !== idx));
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-300 text-slate-800 font-bold text-base shadow-md hover:border-amber-400 hover:bg-amber-50 active:scale-95 transition"
                >
                  {word}
                </button>
              ))}
            </div>

            {/* Hint & Reset options for sentence */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundPlayer.playKey();
                  setAvailableWords(currentQ.jumbledWords);
                  setAssembledWords([]);
                }}
                className="text-xs text-slate-600 font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ulang Susunan</span>
              </button>

              <button
                type="button"
                onClick={handleUseHint}
                className="text-xs text-amber-700 font-semibold px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 transition flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Bantuan Kata Pertama</span>
              </button>
            </div>
          </div>
        )}

        {/* --- SUBTYPE 3: MENEBAK GAMBAR --- */}
        {currentQ.type === 'guess_picture' && (
          <div className="text-center py-2">
            <p className="text-base sm:text-lg font-semibold text-slate-700 mb-2">
              {currentQ.instruction}
            </p>

            {/* Cute Picture Vector */}
            <div className="flex justify-center my-3">
              <PictureIllustration name={currentQ.svgIcon} className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-md" />
            </div>

            {/* Letter Slots Display */}
            <div className="flex justify-center gap-2 mb-4">
              {currentQ.targetWord.split('').map((char, idx) => {
                const isRevealed = revealedChars[idx];
                const typedChar = typedInput[idx] || isRevealed || '';
                return (
                  <div
                    key={idx}
                    className={`w-10 h-12 sm:w-12 sm:h-14 rounded-xl border-2 flex items-center justify-center font-extrabold text-xl sm:text-2xl shadow-sm ${
                      typedChar
                        ? 'bg-amber-100 text-amber-900 border-amber-400'
                        : 'bg-slate-50 text-slate-300 border-slate-300'
                    }`}
                  >
                    {typedChar.toUpperCase()}
                  </div>
                );
              })}
            </div>

            {/* Input Box for typing answer */}
            <div className="max-w-xs mx-auto mb-3">
              <input
                ref={inputRef}
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder="Ketik jawabanmu di sini..."
                className="w-full text-center py-3 px-4 text-xl font-bold rounded-2xl border-2 border-amber-300 bg-amber-50/50 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 shadow-inner uppercase tracking-wider text-slate-800"
              />
            </div>

            {/* Hint & Speech */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleUseHint}
                className="text-xs sm:text-sm text-amber-700 font-bold px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 transition flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Buka 1 Huruf Bantuan ({revealedChars.filter(Boolean).length}/{currentQ.targetWord.length})</span>
              </button>

              <button
                type="button"
                onClick={() => speakHint(currentQ.hint)}
                title="Dengarkan Petunjuk"
                className="text-xs sm:text-sm text-sky-700 font-bold px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 transition flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengar Petunjuk</span>
              </button>
            </div>
          </div>
        )}

        {/* Feedback Message Alert */}
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

        {/* Action Buttons: Kirim & Lewati (Skip) */}
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
            className="py-2.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-md flex items-center gap-2 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Periksa Jawaban</span>
          </button>
        </div>
      </div>

      {/* On-Screen Virtual Keyboard for Grade 1 Kids */}
      <VirtualKeyboard
        onKeyPress={handleVirtualKey}
        onDelete={handleVirtualDelete}
        onSubmit={handleSubmit}
        highlightKey={getExpectedKey()}
      />
    </div>
  );
};
