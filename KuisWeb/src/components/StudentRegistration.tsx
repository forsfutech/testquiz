import React, { useState } from 'react';
import { AvatarIcon } from './KidGraphics';
import { StudentProfile, QuizScoreRecord } from '../data/quizData';
import { soundPlayer } from '../utils/audio';
import { Sparkles, ArrowRight, Award, Trophy, Trash2, BookOpen, Monitor } from 'lucide-react';

interface StudentRegistrationProps {
  onStartQuiz: (profile: StudentProfile) => void;
  savedScores: QuizScoreRecord[];
  onClearHistory: () => void;
  onViewCertificateFromHistory: (record: QuizScoreRecord) => void;
}

const AVATARS = [
  { id: 'lion', label: 'Singa Berani' },
  { id: 'rabbit', label: 'Kelinci Ceria' },
  { id: 'robot', label: 'Robot Pintar' },
  { id: 'cat', label: 'Kucing Imut' },
  { id: 'owl', label: 'Burung Hantu Bijak' },
  { id: 'bear', label: 'Beruang Semangat' }
];

export const StudentRegistration: React.FC<StudentRegistrationProps> = ({
  onStartQuiz,
  savedScores,
  onClearHistory,
  onViewCertificateFromHistory
}) => {
  const [studentName, setStudentName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('lion');
  const [selectedGrade, setSelectedGrade] = useState<1 | 2>(1);
  const [errorMessage, setErrorMessage] = useState('');

  const handleStart = (gradeToStart: 1 | 2) => {
    if (!studentName.trim()) {
      soundPlayer.playWrong();
      setErrorMessage('Ayo tulis namamu dulu ya sebelum mulai! 😊');
      return;
    }
    soundPlayer.playSuccess();
    onStartQuiz({
      name: studentName.trim(),
      avatar: selectedAvatar,
      selectedGrade: gradeToStart
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10">
      {/* Welcome Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 font-bold text-sm mb-3 shadow-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Kuis Interaktif Anak Pintar SD</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          Selamat Datang di Dunia <span className="text-amber-500 underline decoration-wavy decoration-amber-400">Mengetik & Komputer</span>!
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Latihan mengetik ceria, menyambung kalimat, tebak gambar untuk <strong>Kelas 1</strong>, serta petualangan menebak ikon komputer untuk <strong>Kelas 2</strong>.
        </p>
      </div>

      {/* Main Registration Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-200/80 mb-10 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-36 h-36 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-sky-100/50 rounded-full blur-2xl pointer-events-none" />

        {/* Step 1: Input Nama */}
        <div className="mb-8">
          <label htmlFor="student-name-input" className="block text-lg sm:text-xl font-bold text-slate-800 mb-2">
            1. Siapa Namamu? <span className="text-red-500">*</span>
          </label>
          <div className="relative max-w-md">
            <input
              id="student-name-input"
              type="text"
              value={studentName}
              maxLength={30}
              placeholder="Contoh: Budi Santoso / Siti Rahma"
              onChange={(e) => {
                setStudentName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleStart(selectedGrade);
                }
              }}
              className="w-full px-5 py-3.5 text-lg font-bold text-slate-800 bg-amber-50/50 rounded-2xl border-2 border-amber-300 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200/60 shadow-inner transition placeholder:text-slate-400"
            />
          </div>
          {errorMessage && (
            <p className="mt-2 text-sm font-semibold text-red-600 flex items-center gap-1.5 animate-pulse">
              <span>⚠️</span> {errorMessage}
            </p>
          )}
        </div>

        {/* Step 2: Pilih Avatar Karakter */}
        <div className="mb-8">
          <label className="block text-lg sm:text-xl font-bold text-slate-800 mb-2">
            2. Pilih Karakter Favoritmu:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {AVATARS.map((av) => {
              const isSelected = selectedAvatar === av.id;
              return (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    soundPlayer.playKey();
                    setSelectedAvatar(av.id);
                  }}
                  className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-100/70 ring-4 ring-amber-300 scale-105 shadow-md'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <AvatarIcon id={av.id} className="w-12 h-12" />
                  <span className="mt-1.5 text-xs font-semibold text-slate-700 text-center leading-tight">
                    {av.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Pilih Kelas & Mulai */}
        <div>
          <label className="block text-lg sm:text-xl font-bold text-slate-800 mb-3">
            3. Pilih Kelas yang Ingin Kamu Ikuti:
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card Kelas 1 */}
            <div
              onClick={() => {
                setSelectedGrade(1);
                soundPlayer.playKey();
              }}
              className={`p-5 rounded-3xl border-3 transition-all cursor-pointer flex flex-col justify-between ${
                selectedGrade === 1
                  ? 'border-emerald-500 bg-emerald-50/70 ring-4 ring-emerald-200 shadow-lg'
                  : 'border-slate-200 bg-slate-50/80 hover:border-emerald-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
                    1
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
                    Kelas 1 SD
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Mengetik, Kalimat & Tebak Gambar
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Tes mengetik huruf dan kata pemula</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Menyambung potongan kata jadi kalimat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Menebak gambar hewan, buah, benda</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStart(1);
                }}
                className="mt-5 w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 transition active:scale-98"
              >
                <span>Mulai Kuis Kelas 1</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Card Kelas 2 */}
            <div
              onClick={() => {
                setSelectedGrade(2);
                soundPlayer.playKey();
              }}
              className={`p-5 rounded-3xl border-3 transition-all cursor-pointer flex flex-col justify-between ${
                selectedGrade === 2
                  ? 'border-sky-500 bg-sky-50/70 ring-4 ring-sky-200 shadow-lg'
                  : 'border-slate-200 bg-slate-50/80 hover:border-sky-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
                    2
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-bold text-xs border border-sky-300">
                    Kelas 2 SD
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-sky-600" />
                  Tebak Ikon Komputer & Mengetik
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-sky-600 font-bold">✓</span>
                    <span>Mengenal Folder, Printer, Disket, Recycle Bin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sky-600 font-bold">✓</span>
                    <span>Menjawab dengan mengetik nama ikon komputer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sky-600 font-bold">✓</span>
                    <span>Dilengkapi petunjuk huruf & fungsi perangkat</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStart(2);
                }}
                className="mt-5 w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 transition active:scale-98"
              >
                <span>Mulai Kuis Kelas 2</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Riwayat Prestasi / Skor Siswa Terdahulu */}
      {savedScores.length > 0 && (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border-2 border-slate-200/80 shadow-md">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-800 text-lg">Papan Riwayat Belajar Siswa</h3>
            </div>
            <button
              type="button"
              onClick={onClearHistory}
              title="Bersihkan Riwayat"
              className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 hover:bg-red-50 px-2.5 py-1 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Riwayat</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {savedScores.slice(0, 5).map((score) => (
              <div key={score.id} className="py-3 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <AvatarIcon id={score.avatar} className="w-9 h-9" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{score.studentName}</h4>
                    <p className="text-xs text-slate-500">
                      Kelas {score.grade} SD · {new Date(score.completedAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-extrabold text-amber-600 text-lg tabular-nums">
                      {score.finalScore}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/100 Poin</span>
                    <div className="text-xs text-amber-500 font-semibold">
                      {'★'.repeat(score.stars)}{'☆'.repeat(5 - score.stars)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewCertificateFromHistory(score)}
                    className="px-3 py-1.5 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 rounded-xl hover:bg-sky-100 transition flex items-center gap-1"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Lihat Sertifikat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
