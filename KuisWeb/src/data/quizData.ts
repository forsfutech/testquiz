/**
 * Quiz data for Elementary School Grades 1 and 2
 */

export interface Grade1TypingQuestion {
  id: string;
  type: 'typing';
  categoryTitle: 'Tes Mengetik Huruf & Kata';
  word: string; // Teks yang harus diketik
  instruction: string;
  hint: string;
  funEmoji: string;
  level: 'pemula' | 'mahir';
}

export interface Grade1SentenceQuestion {
  id: string;
  type: 'sentence';
  categoryTitle: 'Menyambung Kalimat';
  instruction: string;
  jumbledWords: string[]; // Kata-kata acak yang harus disusun
  correctSentence: string; // Kalimat yang benar
  translationOrContext?: string;
  missingWordQuiz?: {
    sentenceWithBlank: string;
    missingWord: string;
    options: string[];
  };
}

export interface Grade1GuessPictureQuestion {
  id: string;
  type: 'guess_picture';
  categoryTitle: 'Menebak Gambar Ceria';
  instruction: string;
  targetWord: string; // Jawaban benar (misal: "KUCING")
  acceptedAnswers: string[]; // Variasi jawaban
  hint: string;
  svgIcon: string;
}

export type Grade1Question = Grade1TypingQuestion | Grade1SentenceQuestion | Grade1GuessPictureQuestion;

export interface Grade2ComputerIconQuestion {
  id: string;
  type: 'computer_icon';
  categoryTitle: 'Tebak Ikon Komputer';
  iconName: string; // Nama ikon umum
  targetAnswer: string; // Jawaban baku (misal: "FOLDER")
  acceptedAnswers: string[]; // Variasi jawaban (misal: ["folder", "berkas", "map"])
  clue: string; // Petunjuk fungsi
  detailDescription: string; // Penjelasan edukatif
  category: 'Hardware' | 'Software' | 'Sistem' | 'Aksesoris';
  svgType: 'folder' | 'printer' | 'save_disk' | 'recycle_bin' | 'volume' | 'power' | 'wifi' | 'browser' | 'paint' | 'mouse' | 'keyboard' | 'headphone' | 'search' | 'monitor' | 'usb';
}

// Data Kelas 1: Mengetik, Menyambung Kalimat, dan Tebak Gambar
export const GRADE_1_QUESTIONS: Grade1Question[] = [
  // --- SUBTES 1: TES MENGETIK CEPAT & TEPAT ---
  {
    id: 'g1_type_1',
    type: 'typing',
    categoryTitle: 'Tes Mengetik Huruf & Kata',
    word: 'BOLA',
    instruction: 'Ketiklah kata di bawah ini dengan benar:',
    hint: 'B - O - L - A (Benda bulat untuk bermain sepak bola)',
    funEmoji: '⚽',
    level: 'pemula'
  },
  {
    id: 'g1_type_2',
    type: 'typing',
    categoryTitle: 'Tes Mengetik Huruf & Kata',
    word: 'BUKU',
    instruction: 'Ketiklah kata di bawah ini:',
    hint: 'B - U - K - U (Buku jendela ilmu)',
    funEmoji: '📚',
    level: 'pemula'
  },
  {
    id: 'g1_type_3',
    type: 'typing',
    categoryTitle: 'Tes Mengetik Huruf & Kata',
    word: 'PENSIL',
    instruction: 'Ayo ketik kata berikut ini:',
    hint: 'P - E - N - S - I - L (Alat untuk menulis di kertas)',
    funEmoji: '✏️',
    level: 'mahir'
  },
  {
    id: 'g1_type_4',
    type: 'typing',
    categoryTitle: 'Tes Mengetik Huruf & Kata',
    word: 'SEKOLAH',
    instruction: 'Ketik kata yang lebih panjang ini:',
    hint: 'S - E - K - O - L - A - H (Tempat kita belajar bersama guru)',
    funEmoji: '🏫',
    level: 'mahir'
  },

  // --- SUBTES 2: MENYAMBUNG & MENYUSUN KALIMAT ---
  {
    id: 'g1_sent_1',
    type: 'sentence',
    categoryTitle: 'Menyambung Kalimat',
    instruction: 'Susun kata-kata di bawah ini menjadi kalimat yang rapi:',
    jumbledWords: ['Ibu', 'memasak', 'sayur', 'di dapur'],
    correctSentence: 'Ibu memasak sayur di dapur',
    missingWordQuiz: {
      sentenceWithBlank: 'Ibu memasak sayur di ...',
      missingWord: 'dapur',
      options: ['dapur', 'lapangan', 'sungai']
    }
  },
  {
    id: 'g1_sent_2',
    type: 'sentence',
    categoryTitle: 'Menyambung Kalimat',
    instruction: 'Sambung dan urutkan kata menjadi kalimat yang tepat:',
    jumbledWords: ['Budi', 'suka', 'membaca', 'buku'],
    correctSentence: 'Budi suka membaca buku',
    missingWordQuiz: {
      sentenceWithBlank: 'Budi suka membaca ...',
      missingWord: 'buku',
      options: ['buku', 'batu', 'kayu']
    }
  },
  {
    id: 'g1_sent_3',
    type: 'sentence',
    categoryTitle: 'Menyambung Kalimat',
    instruction: 'Susun kata-kata agar menjadi kalimat yang utuh:',
    jumbledWords: ['Burung', 'terbang', 'di', 'langit'],
    correctSentence: 'Burung terbang di langit',
    missingWordQuiz: {
      sentenceWithBlank: 'Burung terbang di ...',
      missingWord: 'langit',
      options: ['langit', 'lantai', 'lemari']
    }
  },
  {
    id: 'g1_sent_4',
    type: 'sentence',
    categoryTitle: 'Menyambung Kalimat',
    instruction: 'Ayo sambungkan potongan kata ini:',
    jumbledWords: ['Adik', 'minum', 'susu', 'hangat'],
    correctSentence: 'Adik minum susu hangat',
    missingWordQuiz: {
      sentenceWithBlank: 'Adik minum susu ...',
      missingWord: 'hangat',
      options: ['hangat', 'pedas', 'asin']
    }
  },

  // --- SUBTES 3: MENEBAK GAMBAR DENGAN MENGETIK ---
  {
    id: 'g1_pic_1',
    type: 'guess_picture',
    categoryTitle: 'Menebak Gambar Ceria',
    instruction: 'Gambar apakah ini? Ketik nama hewannya:',
    targetWord: 'KUCING',
    acceptedAnswers: ['kucing', 'cat'],
    hint: 'Hewan berkaki empat yang bersuara "Meong... meong!"',
    svgIcon: 'cat'
  },
  {
    id: 'g1_pic_2',
    type: 'guess_picture',
    categoryTitle: 'Menebak Gambar Ceria',
    instruction: 'Gambar apakah ini? Ketik nama buahnya:',
    targetWord: 'APEL',
    acceptedAnswers: ['apel', 'apple'],
    hint: 'Buah manis berwarna merah cerah yang segar',
    svgIcon: 'apple'
  },
  {
    id: 'g1_pic_3',
    type: 'guess_picture',
    categoryTitle: 'Menebak Gambar Ceria',
    instruction: 'Gambar kendaraan apakah ini? Ketik namanya:',
    targetWord: 'MOBIL',
    acceptedAnswers: ['mobil', 'car'],
    hint: 'Kendaraan darat yang memiliki 4 roda dan setir',
    svgIcon: 'car'
  },
  {
    id: 'g1_pic_4',
    type: 'guess_picture',
    categoryTitle: 'Menebak Gambar Ceria',
    instruction: 'Gambar apakah ini yang bersinar di malam hari?',
    targetWord: 'BINTANG',
    acceptedAnswers: ['bintang', 'star'],
    hint: 'Benda langit yang berkelip-kelip indah di malam hari',
    svgIcon: 'star'
  },
  {
    id: 'g1_pic_5',
    type: 'guess_picture',
    categoryTitle: 'Menebak Gambar Ceria',
    instruction: 'Hewan air apakah ini? Ketik namanya:',
    targetWord: 'IKAN',
    acceptedAnswers: ['ikan', 'fish'],
    hint: 'Bisa berenang dan bernapas dengan insang di dalam air',
    svgIcon: 'fish'
  }
];

// Data Kelas 2: Tes Interaktif Menebak Ikon Komputer & Menjawab dengan Mengetik
export const GRADE_2_QUESTIONS: Grade2ComputerIconQuestion[] = [
  {
    id: 'g2_icon_1',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Folder',
    targetAnswer: 'FOLDER',
    acceptedAnswers: ['folder', 'berkas', 'map', 'map berkas', 'direktori'],
    clue: 'Bentuknya seperti map berwarna kuning. Berfungsi untuk menyimpan dan mengelompokkan file di komputer.',
    detailDescription: 'Folder digunakan untuk merapikan dokumen, foto, dan gambar agar tidak tercecer.',
    category: 'Sistem',
    svgType: 'folder'
  },
  {
    id: 'g2_icon_2',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Printer',
    targetAnswer: 'PRINTER',
    acceptedAnswers: ['printer', 'pencetak', 'mesin cetak', 'cetak', 'print'],
    clue: 'Digunakan untuk mencetak tulisan atau gambar dari komputer ke lembaran kertas.',
    detailDescription: 'Printer adalah alat keluaran (output) untuk mencetak hasil tugas kita ke kertas.',
    category: 'Hardware',
    svgType: 'printer'
  },
  {
    id: 'g2_icon_3',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Save / Disket',
    targetAnswer: 'SAVE',
    acceptedAnswers: ['save', 'disket', 'simpan', 'floppy', 'floppy disk'],
    clue: 'Berbentuk disket persegi biru. Berfungsi untuk MENYIMPAN hasil karya kita agar tidak hilang.',
    detailDescription: 'Tombol Save biasanya memiliki ikon disket dan shortcut keyboard Ctrl + S.',
    category: 'Software',
    svgType: 'save_disk'
  },
  {
    id: 'g2_icon_4',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Recycle Bin',
    targetAnswer: 'RECYCLE BIN',
    acceptedAnswers: ['recycle bin', 'tempat sampah', 'tong sampah', 'sampah', 'kotak sampah', 'trash', 'bin'],
    clue: 'Ikon tempat sampah untuk menampung file atau berkas yang sudah dihapus.',
    detailDescription: 'Jika kita tidak sengaja menghapus file, file itu bisa dikembalikan dari Recycle Bin!',
    category: 'Sistem',
    svgType: 'recycle_bin'
  },
  {
    id: 'g2_icon_5',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Volume / Speaker',
    targetAnswer: 'SPEAKER',
    acceptedAnswers: ['speaker', 'volume', 'suara', 'sound', 'pengeras suara'],
    clue: 'Ikon corong suara untuk mengatur keras atau kecilnya suara lagu/video di komputer.',
    detailDescription: 'Ikon Speaker berada di pojok kanan bawah layar untuk mengatur volume audio.',
    category: 'Sistem',
    svgType: 'volume'
  },
  {
    id: 'g2_icon_6',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Power',
    targetAnswer: 'POWER',
    acceptedAnswers: ['power', 'daya', 'matikan', 'tombol power', 'turn off', 'shutdown', 'hidupkan'],
    clue: 'Ikon lingkaran dengan garis tegak, digunakan untuk menyalakan atau mematikan komputer.',
    detailDescription: 'Tombol Power ada di casing komputer atau di menu Start untuk Shutdown komputer secara aman.',
    category: 'Sistem',
    svgType: 'power'
  },
  {
    id: 'g2_icon_7',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Wi-Fi / Internet',
    targetAnswer: 'WIFI',
    acceptedAnswers: ['wifi', 'wi-fi', 'internet', 'sinyal', 'jaringan', 'wireless'],
    clue: 'Ikon gelombang melengkung yang menandakan koneksi internet nirkabel (tanpa kabel).',
    detailDescription: 'Wi-Fi memungkinkan komputer dan laptop kita terhubung ke internet untuk mencari ilmu.',
    category: 'Sistem',
    svgType: 'wifi'
  },
  {
    id: 'g2_icon_8',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Web Browser / Chrome',
    targetAnswer: 'BROWSER',
    acceptedAnswers: ['browser', 'chrome', 'web browser', 'google chrome', 'internet', 'web'],
    clue: 'Aplikasi dengan ikon bola warna-warni untuk membuka situs web dan mencari informasi di internet.',
    detailDescription: 'Contoh Web Browser terkenal adalah Google Chrome, Microsoft Edge, dan Mozilla Firefox.',
    category: 'Software',
    svgType: 'browser'
  },
  {
    id: 'g2_icon_9',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Paint',
    targetAnswer: 'PAINT',
    acceptedAnswers: ['paint', 'kuas', 'gambar', 'aplikasi paint', 'mewarnai', 'menggambar'],
    clue: 'Ikon palet warna dan kuas cat. Digunakan anak-anak untuk menggambar dan mewarnai di komputer.',
    detailDescription: 'MS Paint adalah program seru untuk melatih ketangkasan jari dan kreativitas menggambar.',
    category: 'Software',
    svgType: 'paint'
  },
  {
    id: 'g2_icon_10',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Mouse',
    targetAnswer: 'MOUSE',
    acceptedAnswers: ['mouse', 'tetikus', 'kursor'],
    clue: 'Alat yang digerakkan tangan untuk menggeser tanda panah (kursor) di layar komputer.',
    detailDescription: 'Mouse biasanya memiliki tombol klik kiri, klik kanan, dan roda scroll di tengahnya.',
    category: 'Hardware',
    svgType: 'mouse'
  },
  {
    id: 'g2_icon_11',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Keyboard',
    targetAnswer: 'KEYBOARD',
    acceptedAnswers: ['keyboard', 'papan ketik', 'tombol ketik', 'papan tombol'],
    clue: 'Papan berisi banyak tombol huruf, angka, dan spasi untuk mengetik tulisan ke komputer.',
    detailDescription: 'Keyboard memiliki susunan tombol standar yang disebut QWERTY.',
    category: 'Hardware',
    svgType: 'keyboard'
  },
  {
    id: 'g2_icon_12',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Headphone',
    targetAnswer: 'HEADPHONE',
    acceptedAnswers: ['headphone', 'headset', 'earphone', 'head phone'],
    clue: 'Dipasang di telinga agar kita bisa mendengarkan suara komputer tanpa mengganggu orang lain.',
    detailDescription: 'Headphone sangat asyik dipakai saat belajar mendengarkan dongeng atau lagu anak.',
    category: 'Aksesoris',
    svgType: 'headphone'
  },
  {
    id: 'g2_icon_13',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Search / Cari',
    targetAnswer: 'SEARCH',
    acceptedAnswers: ['search', 'cari', 'pencarian', 'kaca pembesar', 'lup'],
    clue: 'Ikon kaca pembesar (lup) yang ditekan saat kita ingin mencari file atau kata tertentu.',
    detailDescription: 'Ikon Search membantu kita menemukan file tugas yang tersimpan dengan sangat cepat.',
    category: 'Software',
    svgType: 'search'
  },
  {
    id: 'g2_icon_14',
    type: 'computer_icon',
    categoryTitle: 'Tebak Ikon Komputer',
    iconName: 'Monitor',
    targetAnswer: 'MONITOR',
    acceptedAnswers: ['monitor', 'layar', 'layar komputer', 'screen'],
    clue: 'Layar kaca berbentuk persegi yang menampilkan gambar, tulisan, dan video dari komputer.',
    detailDescription: 'Monitor adalah layar utama tempat kita melihat semua aktivitas komputer kita.',
    category: 'Hardware',
    svgType: 'monitor'
  }
];

export interface StudentProfile {
  name: string;
  avatar: string;
  selectedGrade: 1 | 2;
}

export interface QuizScoreRecord {
  id: string;
  studentName: string;
  avatar: string;
  grade: 1 | 2;
  totalQuestions: number;
  correctAnswers: number;
  skippedQuestions: number;
  finalScore: number;
  stars: number;
  completedAt: string;
}
