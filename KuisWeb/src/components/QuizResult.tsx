import React, { useRef } from 'react';
import { QuizScoreRecord } from '../data/quizData';
import { AvatarIcon } from './KidGraphics';
import { soundPlayer } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Printer,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  SkipForward,
  Star,
  Share2
} from 'lucide-react';

interface QuizResultProps {
  record: QuizScoreRecord;
  onPlayAgain: () => void;
  onSwitchGrade: () => void;
  onBackToMenu: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  record,
  onPlayAgain,
  onSwitchGrade,
  onBackToMenu
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Fire festive celebration confetti!
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.4 }
    });
  }, []);

  const handlePrintCertificate = () => {
    soundPlayer.playKey();
    window.print();
  };

  const getPraiseMessage = (score: number) => {
    if (score >= 90) {
      return {
        title: 'Luar Biasa Hebat! 🏆',
        desc: 'Kamu berhasil menjawab kuis dengan sangat gemilang. Daya ingat dan ketrampilanmu luar biasa!'
      };
    } else if (score >= 70) {
      return {
        title: 'Bagus Sekali! 🌟',
        desc: 'Hasil belajarmu sangat baik. Teruslah berlatih agar semakin mahir mengetik dan mengenal komputer!'
      };
    } else if (score >= 50) {
      return {
        title: 'Hebat, Terus Bersemangat! 👍',
        desc: 'Kamu sudah berusaha dengan baik. Jangan menyerah, ayo ulangi kuis untuk mendapatkan nilai 100!'
      };
    } else {
      return {
        title: 'Tetap Semangat Belajar! 💪',
        desc: 'Belajar itu butuh proses. Ayo coba lagi dan perhatikan petunjuk di setiap soal ya!'
      };
    }
  };

  const praise = getPraiseMessage(record.finalScore);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10">
      {/* Top Score Summary Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 mb-8 text-center relative overflow-hidden print:hidden">
        <div className="flex justify-center mb-3">
          <AvatarIcon id={record.avatar} className="w-20 h-20 shadow-md" />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800">
          {praise.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mt-2">
          {praise.desc}
        </p>

        {/* Stars */}
        <div className="flex justify-center items-center gap-1.5 sm:gap-2 my-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-8 h-8 sm:w-10 sm:h-10 ${
                s <= record.stars
                  ? 'text-amber-400 fill-amber-400 animate-bounce'
                  : 'text-slate-200 fill-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Score & Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto my-6">
          <div className="bg-amber-50/80 p-3 sm:p-4 rounded-2xl border border-amber-200">
            <span className="text-xs font-bold text-amber-800 block">Nilai Akhir</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-600 tabular-nums">
              {record.finalScore}
            </span>
            <span className="text-xs text-slate-400 font-semibold block">dari 100</span>
          </div>

          <div className="bg-emerald-50/80 p-3 sm:p-4 rounded-2xl border border-emerald-200">
            <span className="text-xs font-bold text-emerald-800 block">Jawaban Benar</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 tabular-nums">
              {record.correctAnswers}
            </span>
            <span className="text-xs text-slate-400 font-semibold block">Soal</span>
          </div>

          <div className="bg-sky-50/80 p-3 sm:p-4 rounded-2xl border border-sky-200">
            <span className="text-xs font-bold text-sky-800 block">Soal Dilewati</span>
            <span className="text-2xl sm:text-3xl font-black text-sky-600 tabular-nums">
              {record.skippedQuestions}
            </span>
            <span className="text-xs text-slate-400 font-semibold block">Soal</span>
          </div>

          <div className="bg-purple-50/80 p-3 sm:p-4 rounded-2xl border border-purple-200">
            <span className="text-xs font-bold text-purple-800 block">Total Soal</span>
            <span className="text-2xl sm:text-3xl font-black text-purple-600 tabular-nums">
              {record.totalQuestions}
            </span>
            <span className="text-xs text-slate-400 font-semibold block">Soal</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button
            type="button"
            onClick={handlePrintCertificate}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-extrabold text-sm sm:text-base shadow-md flex items-center gap-2 transition active:scale-95"
          >
            <Printer className="w-5 h-5" />
            <span>Cetak / Simpan Sertifikat</span>
          </button>

          <button
            type="button"
            onClick={onPlayAgain}
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white font-bold text-sm sm:text-base shadow-md flex items-center gap-2 transition active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Kuis</span>
          </button>

          <button
            type="button"
            onClick={onSwitchGrade}
            className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-sm sm:text-base shadow-md flex items-center gap-2 transition active:scale-95"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Coba Kelas {record.grade === 1 ? '2' : '1'}</span>
          </button>

          <button
            type="button"
            onClick={onBackToMenu}
            className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-sm transition"
          >
            Menu Awal
          </button>
        </div>
      </div>

      {/* --- SERTIFIKAT PRESTASI DIGITAL ANAK --- */}
      <div
        ref={certificateRef}
        className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border-8 border-amber-300 relative text-center print:border-8 print:p-8 print:shadow-none print:m-0"
      >
        {/* Decorative corner ribbons */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-500 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-500 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-500 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-500 rounded-br-xl" />

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs uppercase tracking-widest mb-3">
          <Award className="w-4 h-4 text-amber-600" />
          <span>Piagam Penghargaan Resmi</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
          SERTIFIKAT KELULUSAN
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-semibold tracking-wide uppercase mt-1">
          Kuis Pintar Mengetik & Komputer Sekolah Dasar
        </p>

        <div className="my-6">
          <p className="text-sm text-slate-600 italic">Sertifikat ini dengan bangga diberikan kepada:</p>
          <div className="my-3 py-2 px-6 inline-block bg-amber-50/70 border-b-4 border-amber-400">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-amber-800 tracking-wide">
              {record.studentName}
            </h3>
          </div>
          <p className="text-sm sm:text-base text-slate-700 font-medium max-w-xl mx-auto mt-2">
            Telah menyelesaikan seluruh rangkaian uji kompetensi pembelajaran interaktif:{' '}
            <strong>
              {record.grade === 1
                ? 'Tes Mengetik, Menyambung Kalimat & Tebak Gambar (Kelas 1 SD)'
                : 'Tes Interaktif Mengenal Ikon-Ikon Komputer (Kelas 2 SD)'}
            </strong>
          </p>
        </div>

        {/* Certificate Medallion & Rating */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-6">
          <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 px-5">
            <Trophy className="w-8 h-8 text-amber-500" />
            <div className="text-left">
              <span className="text-xs font-bold text-amber-800 block">Poin Kelulusan:</span>
              <span className="text-2xl font-black text-amber-700 tabular-nums">
                {record.finalScore} / 100
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-sky-50 border-2 border-sky-300 rounded-2xl p-3 px-5">
            <Award className="w-8 h-8 text-sky-500" />
            <div className="text-left">
              <span className="text-xs font-bold text-sky-800 block">Peringkat Prestasi:</span>
              <span className="text-lg font-extrabold text-sky-700">
                {record.stars === 5
                  ? 'Bintang Emas Teladan ⭐'
                  : record.stars >= 4
                  ? 'Sangat Terampil ⭐'
                  : 'Siswa Rajin ⭐'}
              </span>
            </div>
          </div>
        </div>

        {/* Signatures & Stamp */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-200 grid grid-cols-2 gap-4 max-w-lg mx-auto text-xs text-slate-600">
          <div>
            <p className="font-bold text-slate-800">Tanggal Pelaksanaan:</p>
            <p className="mt-1 font-semibold text-slate-700">
              {new Date(record.completedAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-300">
              ✓ TERVERIFIKASI LULUS
            </div>
            <p className="mt-1 text-slate-500 font-medium">Sistem Kuis Web SD</p>
          </div>
        </div>
      </div>
    </div>
  );
};
