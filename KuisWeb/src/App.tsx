/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StudentProfile, QuizScoreRecord } from './data/quizData';
import { StudentRegistration } from './components/StudentRegistration';
import { Grade1Quiz } from './components/Grade1Quiz';
import { Grade2Quiz } from './components/Grade2Quiz';
import { QuizResult } from './components/QuizResult';
import { soundPlayer } from './utils/audio';
import { Volume2, VolumeX, BookOpen, HelpCircle, Laptop, Heart } from 'lucide-react';

type AppView = 'register' | 'quiz_g1' | 'quiz_g2' | 'result' | 'guide';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('register');
  const [currentProfile, setCurrentProfile] = useState<StudentProfile | null>(null);
  const [latestRecord, setLatestRecord] = useState<QuizScoreRecord | null>(null);
  const [savedScores, setSavedScores] = useState<QuizScoreRecord[]>([]);
  const [isMuted, setIsMuted] = useState(soundPlayer.getIsMuted());

  // Load saved scores from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kuis_pintar_sd_records');
      if (saved) {
        setSavedScores(JSON.parse(saved));
      }
    } catch {
      // Local storage unavailable
    }
  }, []);

  const handleToggleSound = () => {
    const muted = soundPlayer.toggleMute();
    setIsMuted(muted);
  };

  const handleStartQuiz = (profile: StudentProfile) => {
    setCurrentProfile(profile);
    if (profile.selectedGrade === 1) {
      setCurrentView('quiz_g1');
    } else {
      setCurrentView('quiz_g2');
    }
  };

  const handleFinishQuiz = (record: QuizScoreRecord) => {
    setLatestRecord(record);
    const updated = [record, ...savedScores.filter(r => r.id !== record.id)].slice(0, 20);
    setSavedScores(updated);
    try {
      localStorage.setItem('kuis_pintar_sd_records', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setCurrentView('result');
  };

  const handleClearHistory = () => {
    if (window.confirm('Hapus seluruh riwayat pengerjaan siswa di perangkat ini?')) {
      setSavedScores([]);
      localStorage.removeItem('kuis_pintar_sd_records');
    }
  };

  const handleViewCertificateFromHistory = (record: QuizScoreRecord) => {
    setLatestRecord(record);
    setCurrentView('result');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50/70 via-white to-sky-50/50 text-slate-800 selection:bg-amber-200">
      {/* Top Bar Contract (1 row, 3 zones) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/80 px-4 sm:px-8 py-3 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => setCurrentView('register')}
            className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-80 transition cursor-pointer"
          >
            <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center text-base font-extrabold shadow-xs">
              SD
            </span>
            <span>Kuis Pintar Mengetik</span>
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setCurrentView('register')}
              className={`hover:text-amber-600 transition-colors ${currentView === 'register' ? 'text-amber-600 underline decoration-2 underline-offset-4' : ''}`}
            >
              Halaman Awal
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentProfile) {
                  setCurrentView('quiz_g1');
                } else {
                  setCurrentProfile({ name: 'Siswa Kelas 1', avatar: 'lion', selectedGrade: 1 });
                  setCurrentView('quiz_g1');
                }
              }}
              className={`hover:text-emerald-600 transition-colors ${currentView === 'quiz_g1' ? 'text-emerald-600 underline decoration-2 underline-offset-4' : ''}`}
            >
              Materi Kelas 1
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentProfile) {
                  setCurrentView('quiz_g2');
                } else {
                  setCurrentProfile({ name: 'Siswa Kelas 2', avatar: 'robot', selectedGrade: 2 });
                  setCurrentView('quiz_g2');
                }
              }}
              className={`hover:text-sky-600 transition-colors ${currentView === 'quiz_g2' ? 'text-sky-600 underline decoration-2 underline-offset-4' : ''}`}
            >
              Materi Kelas 2
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('guide')}
              className={`hover:text-slate-900 transition-colors ${currentView === 'guide' ? 'text-slate-900 underline decoration-2 underline-offset-4' : ''}`}
            >
              Panduan Belajar
            </button>
          </nav>

          {/* Zone 3: Primary action & Sound Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleToggleSound}
              title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
              className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold transition flex items-center gap-1.5 text-xs"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
              <span className="hidden sm:inline">{isMuted ? 'Suara Mati' : 'Suara Aktif'}</span>
            </button>

            {currentProfile && currentView !== 'register' && (
              <button
                type="button"
                onClick={() => setCurrentView('register')}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition border border-slate-200"
              >
                Ganti Siswa
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {currentView === 'register' && (
          <StudentRegistration
            onStartQuiz={handleStartQuiz}
            savedScores={savedScores}
            onClearHistory={handleClearHistory}
            onViewCertificateFromHistory={handleViewCertificateFromHistory}
          />
        )}

        {currentView === 'quiz_g1' && currentProfile && (
          <Grade1Quiz
            profile={currentProfile}
            onFinishQuiz={handleFinishQuiz}
            onExitToMenu={() => setCurrentView('register')}
          />
        )}

        {currentView === 'quiz_g2' && currentProfile && (
          <Grade2Quiz
            profile={currentProfile}
            onFinishQuiz={handleFinishQuiz}
            onExitToMenu={() => setCurrentView('register')}
          />
        )}

        {currentView === 'result' && latestRecord && (
          <QuizResult
            record={latestRecord}
            onPlayAgain={() => {
              if (latestRecord.grade === 1) setCurrentView('quiz_g1');
              else setCurrentView('quiz_g2');
            }}
            onSwitchGrade={() => {
              if (currentProfile) {
                const nextGrade = latestRecord.grade === 1 ? 2 : 1;
                setCurrentProfile({ ...currentProfile, selectedGrade: nextGrade });
                setCurrentView(nextGrade === 1 ? 'quiz_g1' : 'quiz_g2');
              } else {
                setCurrentView('register');
              }
            }}
            onBackToMenu={() => setCurrentView('register')}
          />
        )}

        {currentView === 'guide' && (
          <div className="w-full max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-200">
              <div className="flex items-center gap-3 pb-3 mb-6 border-b border-slate-100">
                <BookOpen className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-black text-slate-800">Panduan Edukasi Guru & Orang Tua</h2>
              </div>

              <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
                <section>
                  <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">1</span>
                    Kurikulum Kelas 1 SD: Mengetik Dasar, Kalimat, & Tebak Gambar
                  </h3>
                  <p className="text-slate-600">
                    Materi Kelas 1 dirancang khusus untuk melatih koordinasi motorik halus pengetikan huruf/kata pemula, menyusun susunan kata Subjek-Predikat-Objek yang runtut, serta asosiasi visual objek nyata ke dalam bentuk tulisan.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-sky-800 flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-black">2</span>
                    Kurikulum Kelas 2 SD: Pengenalan Ikon Komputer & Mengetik Cerdas
                  </h3>
                  <p className="text-slate-600">
                    Materi Kelas 2 mengenalkan literasi digital dasar (TIK) yang sering dijumpai pada sistem operasi komputer sekolah (Folder, Printer, Save/Disket, Tempat Sampah, Tombol Power, Volume, Wi-Fi, dll.). Siswa ditantang mengingat nama ikon dan mengetikkannya secara mandiri dengan bantuan petunjuk edukatif.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-amber-800 flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">3</span>
                    Akses Mudah Tanpa Instalasi (Web Berbasis Responsif)
                  </h3>
                  <p className="text-slate-600">
                    Aplikasi ini 100% berbasis peramban (web browser) murni. Dapat dijalankan di laptop lab komputer sekolah, tablet, maupun ponsel orang tua di rumah tanpa perlu mengunduh berkas APK atau aplikasi apa pun. Dilengkapi papan ketik virtual di layar untuk perangkat layar sentuh.
                  </p>
                </section>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentView('register')}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-2xl shadow-sm transition"
                >
                  Kembali ke Pendaftaran Kuis
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 px-4 border-t border-amber-200/60 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Kuis Pintar Mengetik & Komputer SD · Pembelajaran Digital Interaktif</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Dibuat dengan cinta untuk pendidikan Indonesia</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          </p>
        </div>
      </footer>
    </div>
  );
}
