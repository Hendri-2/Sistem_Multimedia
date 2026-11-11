
import { useEffect, useRef, useState } from "react";

function getYouTubeVideoId(url) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v") || "";
      }
      const match = parsedUrl.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/);
      return match ? match[1] : "";
    }

    return "";
  } catch {
    return "";
  }
}

const articles = [
  {
    category: "CEK FAKTA",
    title: "Jangan Langsung Percaya! Kenali Informasi Palsu di Internet",
    date: "17 Oktober 2026",
    read: "4 menit membaca",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=90",
    imageFallback: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=85",
    videoUrl: "https://youtu.be/Df3XiTYOyT8",
    intro: "Informasi dapat menyebar dalam hitungan detik melalui media sosial dan aplikasi percakapan. Namun, informasi yang viral belum tentu benar. Setiap pengguna internet perlu memeriksa fakta sebelum mempercayai atau membagikan sebuah berita.",
    paragraphs: [
      { heading: "Apa itu hoaks?", text: "Hoaks adalah informasi palsu atau menyesatkan yang disajikan seolah-olah benar. Informasi seperti ini dapat memicu kesalahpahaman, kepanikan, bahkan konflik di masyarakat." },
      { heading: "Ciri-ciri informasi yang patut dicurigai", text: "Perhatikan judul yang berlebihan, sumber yang tidak jelas, klaim tanpa bukti, serta pesan yang mendesak pembaca untuk segera menyebarkannya. Foto dan video juga perlu diperiksa karena bisa diambil dari peristiwa berbeda." },
      { heading: "Cara memeriksa fakta", text: "Baca berita sampai selesai, periksa sumber dan tanggal publikasi, lalu bandingkan dengan beberapa media tepercaya. Kamu juga dapat menggunakan layanan pemeriksa fakta sebelum menyebarkan informasi." },
      { heading: "Jangan ikut menyebarkan hoaks", text: "Jika kebenaran informasi belum dapat dipastikan, jangan langsung membagikannya. Sampaikan koreksi dengan sopan dan gunakan fitur pelaporan apabila menemukan konten yang menyesatkan." }
    ]
  },
  {
    category: "KEAMANAN DIGITAL",
    title: "Waspada Phishing: Jangan Asal Klik Tautan",
    date: "18 Oktober 2026",
    read: "4 menit membaca",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=90",
    imageFallback: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85",
    videoUrl: "https://youtu.be/hMvzI5Pup6w",
    intro: "Phishing merupakan penipuan digital yang berusaha memperoleh informasi sensitif melalui pesan, situs palsu, atau tautan yang menyerupai layanan resmi.",
    paragraphs: [
      { heading: "Bagaimana phishing bekerja?", text: "Pelaku dapat mengirim pesan yang mengatasnamakan bank, layanan belanja, perusahaan pengiriman, atau pihak lain. Korban kemudian diarahkan ke situs palsu untuk memasukkan kata sandi, nomor kartu, atau informasi akun." },
      { heading: "Kenali tanda-tandanya", text: "Waspadai pesan yang mengancam akun akan diblokir, menawarkan hadiah tidak masuk akal, atau meminta tindakan segera. Periksa alamat situs dengan teliti karena nama domain palsu dapat menyerupai alamat resmi." },
      { heading: "Langkah pencegahan", text: "Jangan membuka tautan mencurigakan. Kunjungi layanan melalui aplikasi atau alamat resmi yang kamu ketik sendiri. Jangan memasukkan kata sandi atau kode OTP melalui tautan dari pihak yang belum terverifikasi." },
      { heading: "Jika terlanjur memasukkan data", text: "Segera ganti kata sandi melalui situs resmi, keluarkan sesi akun yang tidak dikenal, aktifkan autentikasi dua faktor, dan hubungi penyedia layanan jika informasi keuangan ikut terpapar." }
    ]
  },
  {
    category: "PRIVASI DATA",
    title: "Data Pribadi Bukan untuk Dibagikan Sembarangan",
    date: "19 Oktober 2026",
    read: "5 menit membaca",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=90",
    imageFallback: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
    videoUrl: "https://youtu.be/UW8G_qhR9XA",
    intro: "Nama lengkap, nomor telepon, alamat rumah, dokumen identitas, dan informasi akun merupakan contoh data yang perlu dijaga. Data yang tersebar dapat dimanfaatkan untuk penipuan atau penyalahgunaan identitas.",
    paragraphs: [
      { heading: "Mengapa data pribadi perlu dilindungi?", text: "Informasi pribadi dapat digunakan untuk menyamar sebagai seseorang, mengambil alih akun, atau melakukan penipuan. Semakin banyak informasi yang dibagikan secara terbuka, semakin besar pula risiko penyalahgunaannya." },
      { heading: "Batasi informasi yang dibagikan", text: "Hindari mengunggah foto kartu identitas, alamat rumah, atau dokumen pribadi secara terbuka. Periksa juga izin aplikasi yang meminta akses ke kamera, lokasi, kontak, dan mikrofon." },
      { heading: "Amankan akun digital", text: "Gunakan kata sandi yang berbeda untuk setiap akun, aktifkan autentikasi dua faktor, dan jangan memberikan kode OTP kepada siapa pun. Periksa perangkat yang terhubung dan keluarkan perangkat yang tidak dikenal." },
      { heading: "Pahami hak atas data pribadi", text: "Baca kebijakan privasi layanan dan cari bantuan melalui saluran resmi jika menduga data telah disalahgunakan." }
    ]
  },
  {
    category: "ETIKA DIGITAL",
    title: "Cyberbullying: Dampak Komentar Negatif di Internet",
    date: "20 Oktober 2026",
    read: "4 menit membaca",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1400&q=90",
    imageFallback: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=85",
    videoUrl: "https://youtu.be/c_YCCkQXbJE",
    intro: "Media sosial dapat menjadi tempat berbagi pengalaman dan berdiskusi. Namun, komentar yang menghina, ancaman, dan penyebaran informasi pribadi untuk mempermalukan seseorang dapat menimbulkan dampak serius.",
    paragraphs: [
      { heading: "Apa itu cyberbullying?", text: "Cyberbullying adalah perundungan yang dilakukan melalui media digital. Bentuknya dapat berupa penghinaan berulang, ancaman, penyebaran rumor, atau penyebaran konten pribadi untuk merendahkan seseorang." },
      { heading: "Dampaknya bagi korban", text: "Korban dapat merasa takut, malu, tertekan, dan kehilangan rasa aman ketika menggunakan internet. Karena itu, perundungan digital tidak boleh dianggap sebagai candaan biasa." },
      { heading: "Cara menghadapi perundungan", text: "Simpan bukti berupa tangkapan layar, blokir akun pelaku, dan laporkan konten melalui platform. Jika ancaman serius terjadi, mintalah bantuan orang tepercaya atau pihak berwenang." },
      { heading: "Jadilah pengguna yang berempati", text: "Pikirkan dampak komentar sebelum mengirimkannya. Jangan ikut menyebarkan konten yang mempermalukan orang lain dan dukung korban dengan cara yang aman serta tidak menghakimi." }
    ]
  },
  {
    category: "KECERDASAN BUATAN",
    title: "Deepfake dan AI: Mengapa Kita Harus Memeriksa Video?",
    date: "20 Oktober 2026",
    read: "5 menit membaca",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=90",
    imageFallback: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
    videoUrl: "https://youtu.be/mT1UC8HjV9Y",
    intro: "Teknologi kecerdasan buatan dapat membantu membuat gambar, suara, dan video. Teknologi ini bermanfaat, tetapi juga dapat disalahgunakan untuk menghasilkan konten palsu yang terlihat meyakinkan.",
    paragraphs: [
      { heading: "Apa itu deepfake?", text: "Deepfake adalah konten sintetis yang menggunakan teknik kecerdasan buatan untuk meniru atau memanipulasi wajah, suara, maupun gerakan seseorang." },
      { heading: "Jangan hanya mengandalkan penampilan", text: "Video yang terlihat nyata belum tentu autentik. Perhatikan konteks, sumber pertama, tanggal kejadian, dan apakah media tepercaya juga melaporkan peristiwa yang sama." },
      { heading: "Periksa sebelum mengambil kesimpulan", text: "Cari rekaman asli, periksa akun yang mengunggah, dan bandingkan informasi dengan sumber independen. Kesalahan visual saja tidak selalu cukup untuk membuktikan bahwa video palsu." },
      { heading: "Gunakan AI secara bertanggung jawab", text: "Jangan membuat atau menyebarkan konten AI yang menipu, merugikan, atau melanggar privasi orang lain. Berikan penjelasan jika gambar atau video dibuat menggunakan AI." }
    ]
  },
  {
    category: "JEJAK DIGITAL",
    title: "Jejak Digital: Apa yang Kamu Unggah Bisa Bertahan Lama",
    date: "21 Oktober 2026",
    read: "3 menit membaca",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=90",
    imageFallback: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=85",
    videoUrl: "https://youtu.be/VRFt8JVwvuY",
    intro: "Setiap aktivitas di internet dapat meninggalkan jejak digital, mulai dari komentar, foto, unggahan, hingga interaksi dengan layanan daring. Sebagian informasi mungkin tetap tersimpan atau telah disalin oleh orang lain.",
    paragraphs: [
      { heading: "Jejak digital aktif dan pasif", text: "Jejak digital aktif terbentuk ketika kita sengaja mengunggah komentar, foto, atau mengisi formulir. Jejak digital pasif dapat terbentuk ketika layanan mencatat aktivitas penggunaan." },
      { heading: "Dampak jejak digital", text: "Unggahan yang tidak dipikirkan dengan baik dapat disalahartikan, disebarkan kembali, atau memengaruhi reputasi. Menghapus unggahan tidak selalu berarti semua salinannya hilang dari internet." },
      { heading: "Kelola reputasi digital", text: "Tinjau kembali unggahan lama, periksa pengaturan privasi, dan pikirkan apakah konten pantas dibagikan kepada publik. Hindari mengunggah informasi pribadi milik orang lain tanpa izin." }
    ]
  },
  {
    category: "KEAMANAN AKUN",
    title: "Kata Sandi Kuat dan Autentikasi Dua Faktor",
    date: "21 Oktober 2026",
    read: "3 menit membaca",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1400&q=90",
    imageFallback: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=85",
    videoUrl: "https://youtu.be/-ltmAOVEyR8",
    intro: "Akun digital menyimpan berbagai informasi penting. Kata sandi yang lemah atau digunakan berulang kali dapat meningkatkan risiko pembobolan akun.",
    paragraphs: [
      { heading: "Buat kata sandi yang kuat", text: "Gunakan kata sandi panjang dan unik yang sulit ditebak. Hindari tanggal lahir, nama sendiri, atau kombinasi sederhana yang mudah ditemukan orang lain." },
      { heading: "Aktifkan autentikasi dua faktor", text: "Autentikasi dua faktor menambahkan langkah verifikasi selain kata sandi. Jika layanan mendukungnya, aktifkan fitur tersebut untuk menambah perlindungan akun." },
      { heading: "Waspadai akses yang tidak dikenal", text: "Periksa riwayat login dan perangkat yang terhubung. Jika ada aktivitas mencurigakan, ganti kata sandi melalui situs resmi dan keluarkan sesi yang tidak dikenal." }
    ]
  },
  {
    category: "INFORMASI DIGITAL",
    title: "Algoritma Media Sosial dan Informasi yang Kita Lihat",
    date: "22 Oktober 2026",
    read: "4 menit membaca",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=90",
    imageFallback: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    videoUrl: "https://youtu.be/lru-nRmX3yY",
    intro: "Konten yang muncul di beranda media sosial dipengaruhi berbagai faktor, seperti akun yang diikuti, interaksi sebelumnya, dan sistem rekomendasi platform.",
    paragraphs: [
      { heading: "Bagaimana rekomendasi bekerja?", text: "Sistem rekomendasi berusaha menampilkan konten yang diperkirakan sesuai dengan minat pengguna. Akibatnya, dua orang dapat melihat konten yang berbeda meskipun menggunakan platform yang sama." },
      { heading: "Risiko informasi yang terlalu seragam", text: "Jika kita hanya melihat konten yang sejalan dengan pandangan sendiri, kita bisa melewatkan sudut pandang lain. Konten populer juga tidak otomatis benar hanya karena banyak mendapat tanda suka atau dibagikan." },
      { heading: "Perluas sumber informasi", text: "Ikuti sumber yang beragam dan tepercaya. Gunakan fitur pengaturan rekomendasi jika tersedia, serta periksa fakta sebelum menyimpulkan sesuatu berdasarkan konten yang muncul di beranda." }
    ]
  }
];

const questions = [
  {
    question: "Apa yang dimaksud dengan literasi digital?",
    options: [
      "Kemampuan menggunakan internet tanpa batas",
      "Kemampuan mengakses, memahami, mengevaluasi, dan menggunakan informasi digital",
      "Kemampuan membuat akun media sosial",
      "Kemampuan mengunduh semua informasi",
    ],
    answer: 1,
    explanation:
      "Literasi digital mencakup kemampuan menggunakan teknologi secara kritis, aman, bijak, dan bertanggung jawab.",
  },
  {
    question: "Apa yang harus dilakukan ketika menerima berita yang mengejutkan?",
    options: [
      "Langsung membagikannya",
      "Mengubah judulnya agar lebih menarik",
      "Memeriksa sumber dan kebenaran informasi",
      "Mempercayainya jika dikirim teman",
    ],
    answer: 2,
    explanation:
      "Periksa sumber, bukti, tanggal, dan bandingkan dengan sumber tepercaya sebelum mempercayai atau membagikan berita.",
  },
  {
    question: "Apa yang dimaksud dengan hoaks?",
    options: [
      "Informasi yang selalu berasal dari media sosial",
      "Informasi palsu atau menyesatkan",
      "Informasi resmi pemerintah",
      "Informasi yang memiliki banyak pembaca",
    ],
    answer: 1,
    explanation:
      "Hoaks adalah informasi palsu atau menyesatkan yang dapat membuat masyarakat salah memahami suatu peristiwa.",
  },
  {
    question: "Manakah contoh menjaga keamanan data pribadi?",
    options: [
      "Membagikan kata sandi kepada teman",
      "Mengunggah foto kartu identitas secara publik",
      "Menggunakan kata sandi kuat dan autentikasi dua faktor",
      "Mengirim kode OTP kepada orang yang mengaku petugas",
    ],
    answer: 2,
    explanation:
      "Kata sandi yang kuat dan autentikasi dua faktor membantu melindungi akun dari akses yang tidak sah.",
  },
  {
    question: "Apa yang sebaiknya dilakukan sebelum membagikan berita?",
    options: [
      "Membaca judulnya saja",
      "Memeriksa fakta dan sumber berita",
      "Melihat jumlah tanda suka saja",
      "Membagikannya agar menjadi viral",
    ],
    answer: 1,
    explanation:
      "Informasi perlu diperiksa terlebih dahulu agar kita tidak ikut menyebarkan berita palsu.",
  },
  {
    question: "Apa contoh perilaku yang baik di internet?",
    options: [
      "Menghina orang yang berbeda pendapat",
      "Menyebarkan data pribadi orang lain",
      "Menyampaikan pendapat dengan sopan",
      "Menyebarkan komentar tanpa membaca konteks",
    ],
    answer: 2,
    explanation:
      "Etika digital mengharuskan kita menghormati orang lain dan bertanggung jawab atas perilaku di ruang digital.",
  },
  {
    question: "Apa itu phishing?",
    options: [
      "Cara mempercepat koneksi internet",
      "Upaya menipu untuk memperoleh informasi sensitif",
      "Teknik memperbaiki komputer",
      "Cara memeriksa fakta berita",
    ],
    answer: 1,
    explanation:
      "Phishing adalah upaya penipuan yang menyamar sebagai pihak tepercaya untuk mencuri data seperti kata sandi atau informasi akun.",
  },
  {
    question: "Jika menerima pesan berisi tautan hadiah yang mencurigakan, apa tindakan terbaik?",
    options: [
      "Langsung membuka tautannya",
      "Memasukkan kata sandi untuk mengklaim hadiah",
      "Meneruskannya ke semua grup",
      "Memeriksa keaslian pesan dan menghindari tautan mencurigakan",
    ],
    answer: 3,
    explanation:
      "Jangan terburu-buru membuka tautan atau memberikan data pribadi. Periksa melalui situs atau saluran resmi.",
  },
];

const lessons = [
  {
    number: "01",
    icon: "🔎",
    title: "Cek Fakta",
    description:
      "Periksa sumber, penulis, tanggal, bukti, dan bandingkan berita dengan sumber lain.",
    color: "bg-blue-50",
  },
  {
    number: "02",
    icon: "🔐",
    title: "Keamanan Digital",
    description:
      "Jaga kata sandi, rahasiakan OTP, dan hindari tautan yang mencurigakan.",
    color: "bg-violet-50",
  },
  {
    number: "03",
    icon: "🤝",
    title: "Etika Digital",
    description:
      "Hormati orang lain, hindari perundungan, dan pikirkan dampak sebelum berkomentar.",
    color: "bg-emerald-50",
  },
  {
    number: "04",
    icon: "📢",
    title: "Sebarkan Informasi dengan Bijak",
    description:
      "Bagikan informasi yang bermanfaat setelah memeriksa kebenarannya.",
    color: "bg-amber-50",
  },
];

function App() {
  const [activePage, setActivePage] = useState("beranda");
  const [activeArticle, setActiveArticle] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [fontSize, setFontSize] = useState(17);
  const [darkMode, setDarkMode] = useState(false);

  // Sound effect kuis
const suaraBenar = useRef(null);
const suaraSalah = useRef(null);

useEffect(() => {
  suaraBenar.current = new Audio("/sounds/benar.mp3");
  suaraSalah.current = new Audio("/sounds/salah.mp3");

  suaraBenar.current.preload = "auto";
  suaraSalah.current.preload = "auto";

  return () => {
    suaraBenar.current?.pause();
    suaraSalah.current?.pause();
  };
}, []);

const playSound = (isCorrect) => {
  const audio = isCorrect
    ? suaraBenar.current
    : suaraSalah.current;

  if (!audio) return;

  // Mulai ulang suara jika diputar kembali
  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.log("Sound effect gagal diputar:", error);
  });
};

  // Nomor artikel mengikuti urutan aslinya dan tidak berubah.
  const indexedArticles = articles.map((item, index) => ({
    ...item,
    index,
    number: String(index + 1).padStart(2, "0"),
  }));
  const article = indexedArticles[activeArticle];
  const visibleArticles = indexedArticles;

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      setReadingProgress(
        scrollable > 0
          ? Math.round((window.scrollY / scrollable) * 100)
          : 0
      );
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, [activePage, activeArticle]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const navigate = (page) => {
    window.speechSynthesis?.cancel();
    setAudioPlaying(false);
    setAudioPaused(false);
    setActivePage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAudio = () => {
    if (!("speechSynthesis" in window)) {
      alert("Browser kamu belum mendukung fitur audio narasi.");
      return;
    }

    if (audioPaused) {
      window.speechSynthesis.resume();
      setAudioPaused(false);
      setAudioPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const textToRead = [
      article.title,
      article.intro,
      ...article.paragraphs.flatMap((p) => [p.heading, p.text]),
    ].join(". ");

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "id-ID";
    utterance.rate = 0.92;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setAudioPlaying(true);
      setAudioPaused(false);
    };

    utterance.onend = () => {
      setAudioPlaying(false);
      setAudioPaused(false);
    };

    utterance.onerror = () => {
      setAudioPlaying(false);
      setAudioPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setAudioPaused(true);
    setAudioPlaying(false);
  };

  const stopAudio = () => {
    window.speechSynthesis?.cancel();
    setAudioPlaying(false);
    setAudioPaused(false);
  };

  const score = questions.reduce(
    (total, question, index) =>
      total +
      (selectedAnswers[index] === question.answer ? 1 : 0),
    0
  );

const answerQuestion = (answerIndex) => {
  // Mencegah jawaban dipilih lebih dari sekali
  if (selectedAnswers[currentQuestion] !== undefined) return;

  // Memeriksa apakah jawaban benar
  const isCorrect =
    answerIndex === questions[currentQuestion].answer;

  // Memutar suara sesuai jawaban
  playSound(isCorrect);

  // Menyimpan jawaban yang dipilih
  setSelectedAnswers((previous) => ({
    ...previous,
    [currentQuestion]: answerIndex,
  }));
};

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "materi", label: "Materi" },
    { id: "berita", label: "Baca Artikel" },
    { id: "kuis", label: "Kuis Interaktif" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      <div
        className="fixed left-0 top-0 z-50 h-1 bg-blue-600 transition-all"
        style={{ width: `${readingProgress}%` }}
      />

      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl ${
          darkMode
            ? "border-slate-800 bg-slate-950/90"
            : "border-slate-200 bg-white/90"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            onClick={() => navigate("beranda")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-xl text-white shadow-lg shadow-blue-200">
              ◈
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight">
                Digi<span className="text-blue-600">Smart</span>
              </p>
              <p
                className={`text-xs ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Belajar cerdas di dunia digital
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  activePage === item.id
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "text-slate-300 hover:bg-slate-800"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`rounded-xl border p-2.5 transition ${
                darkMode
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-200 bg-white hover:bg-slate-100"
              }`}
              aria-label="Ganti tema"
              title="Ganti tema"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-slate-200 px-3 py-2.5 lg:hidden"
              aria-label="Buka menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="grid gap-1 border-t border-slate-200 p-4 lg:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="rounded-xl px-4 py-3 text-left font-semibold hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        {activePage === "beranda" && (
          <>
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 text-white">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
              <div className="absolute -bottom-36 left-1/3 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

              <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Platform Edukasi Digital
                  </span>

                  <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                    Jadilah Cerdas di Dunia{" "}
                    <span className="text-cyan-300">Digital.</span>
                  </h1>

                  <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 md:text-lg">
                    Pelajari cara memilah informasi, mengenali hoaks, menjaga
                    keamanan data, dan menjadi pengguna internet yang bijak
                    melalui pengalaman belajar yang interaktif.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate("materi")}
                      className="rounded-2xl bg-white px-6 py-4 font-bold text-blue-900 shadow-xl transition hover:-translate-y-1 hover:bg-cyan-50"
                    >
                      Mulai Belajar <span className="ml-2">→</span>
                    </button>
                    <button
                      onClick={() => navigate("kuis")}
                      className="rounded-2xl border border-white/30 bg-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/20"
                    >
                      Coba Kuis
                    </button>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-7 text-sm text-blue-100">
                    <span>✓ Materi mudah dipahami</span>
                    <span>✓ Audio narasi</span>
                    <span>✓ Kuis interaktif</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=90"
                      alt="Pengguna memanfaatkan teknologi digital"
                      className="h-64 w-full rounded-2xl object-cover md:h-80"
                    />
                    <div className="grid grid-cols-2 gap-3 p-2 pt-5">
                      <div className="rounded-2xl bg-white/10 p-4">
                        <span className="text-2xl">🧠</span>
                        <p className="mt-2 font-bold">Berpikir Kritis</p>
                        <p className="mt-1 text-sm text-blue-100">
                          Tidak mudah percaya
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-4">
                        <span className="text-2xl">🛡️</span>
                        <p className="mt-2 font-bold">Tetap Aman</p>
                        <p className="mt-1 text-sm text-blue-100">
                          Lindungi data pribadi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="font-bold uppercase tracking-widest text-blue-600">
                    Yang akan kamu pelajari
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                    Bekal menjadi warga digital
                  </h2>
                  <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                    Empat keterampilan penting untuk menghadapi informasi
                    yang terus berkembang di internet.
                  </p>
                </div>
                <button
                  onClick={() => navigate("materi")}
                  className="font-bold text-blue-600 hover:text-blue-800"
                >
                  Lihat semua materi →
                </button>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.number}
                    onClick={() => navigate("materi")}
                    className={`rounded-3xl border p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      darkMode
                        ? "border-slate-800 bg-slate-900"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${lesson.color}`}
                    >
                      {lesson.icon}
                    </div>
                    <p className="mt-5 text-xs font-bold tracking-widest text-blue-600">
                      MATERI {lesson.number}
                    </p>
                    <h3 className="mt-2 text-lg font-extrabold">
                      {lesson.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {lesson.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl bg-blue-600 p-8 text-white md:p-10">
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
                    Baca dan dengarkan
                  </p>
                  <h2 className="mt-4 text-3xl font-black">
                    Informasi benar dimulai dari kebiasaan yang benar.
                  </h2>
                  <p className="mt-4 leading-7 text-blue-100">
                    Baca artikel edukasi dan dengarkan narasi agar materi
                    lebih mudah dipahami.
                  </p>
                  <button
                    onClick={() => navigate("berita")}
                    className="mt-7 rounded-xl bg-white px-5 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
                  >
                    Baca artikel →
                  </button>
                </div>

                <div
                  className={`rounded-3xl border p-8 md:p-10 ${
                    darkMode
                      ? "border-slate-800 bg-slate-900"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                    Uji pemahaman
                  </p>
                  <h2 className="mt-4 text-3xl font-black">
                    Seberapa cerdas kamu di dunia digital?
                  </h2>
                  <p className="mt-4 leading-7 text-slate-500">
                    Jawab delapan soal pilihan ganda dan lihat hasil serta
                    pembahasan jawabanmu.
                  </p>
                  <button
                    onClick={() => navigate("kuis")}
                    className="mt-7 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
                  >
                    Mulai kuis →
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activePage === "materi" && (
          <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-blue-950 to-blue-700 p-8 text-white md:p-12">
              <p className="font-bold uppercase tracking-widest text-cyan-300">
                Pusat Pembelajaran
              </p>
              <h1 className="mt-3 text-4xl font-black">
                Materi Literasi Digital
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-blue-100">
                Pahami keterampilan dasar dalam mengakses, mengevaluasi,
                menggunakan, dan menyebarkan informasi secara bertanggung
                jawab.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {lessons.map((lesson, index) => (
                <article
                  key={lesson.number}
                  className={`rounded-3xl border p-7 ${
                    darkMode
                      ? "border-slate-800 bg-slate-900"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${lesson.color}`}
                    >
                      {lesson.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-600">
                        MATERI {lesson.number}
                      </p>
                      <h2 className="mt-1 text-xl font-extrabold">
                        {lesson.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-5 leading-7 text-slate-500">
                    {lesson.description}
                  </p>
                  <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-700">
                    <strong>Contoh penerapan:</strong>{" "}
                    {
                      [
                        "Bandingkan berita dengan media tepercaya sebelum membagikannya.",
                        "Gunakan kata sandi unik dan jangan pernah membagikan kode OTP.",
                        "Sampaikan kritik dengan sopan tanpa menghina atau menyerang pribadi.",
                        "Bagikan informasi yang sumber dan kebenarannya sudah diperiksa.",
                      ][index]
                    }
                  </div>
                </article>
              ))}
            </div>

            <div
              className={`mt-8 rounded-3xl border p-7 ${
                darkMode
                  ? "border-slate-800 bg-slate-900"
                  : "border-blue-100 bg-blue-50"
              }`}
            >
              <h2 className="text-2xl font-black">
                Ingat prinsip Saring Sebelum Sharing
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Sebelum menyebarkan informasi, tanyakan tiga hal: siapa
                sumbernya, apa bukti kebenarannya, dan apakah informasi ini
                bermanfaat jika dibagikan?
              </p>
              <button
                onClick={() => navigate("kuis")}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
              >
                Uji pemahaman →
              </button>
            </div>
          </section>
        )}

        {activePage === "berita" && (
          <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
            <div className="mb-8">
              <p className="font-bold uppercase tracking-widest text-blue-600">
                Ruang Baca Digital
              </p>
              <h1 className="mt-2 text-3xl font-black md:text-4xl">
                Artikel dan Edukasi
              </h1>
              <p className="mt-3 text-slate-500">
                Pilih artikel, atur ukuran teks, atau dengarkan narasi.
              </p>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
              <aside
                className={`rounded-3xl border p-5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto overscroll-contain ${
                  darkMode
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-extrabold">Daftar Artikel</h2>
                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                    {visibleArticles.length} artikel
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Pilih judul untuk membaca artikel. Nomor mengikuti urutan artikel.
                </p>

                <div className="mt-4 max-h-[55vh] space-y-2 overflow-y-auto overscroll-contain pr-2 lg:max-h-[calc(100vh-19rem)]">
                  {visibleArticles.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => {
                        stopAudio();
                        setActiveArticle(item.index);
                        const reader = document.querySelector("[data-article-reader]");
                        if (reader) reader.scrollTo({ top: 0, behavior: "smooth" });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-full rounded-2xl p-3 text-left transition ${
                        activeArticle === item.index
                          ? "bg-blue-600 text-white"
                          : darkMode
                          ? "bg-slate-800 hover:bg-slate-700"
                          : "bg-slate-50 hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black ${activeArticle === item.index ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"}`}>
                          {item.number}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-bold tracking-wider opacity-80">{item.category}</span>
                          <p className="mt-1 text-sm font-bold leading-5">{item.title}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-7 border-t border-slate-200 pt-5">
                  <h3 className="font-bold">Ukuran teks</h3>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() =>
                        setFontSize((size) => Math.max(14, size - 1))
                      }
                      className="rounded-xl border border-slate-300 px-4 py-2 font-bold"
                      aria-label="Perkecil teks"
                    >
                      A−
                    </button>
                    <span className="flex-1 text-center text-sm">
                      {fontSize}px
                    </span>
                    <button
                      onClick={() =>
                        setFontSize((size) => Math.min(23, size + 1))
                      }
                      className="rounded-xl border border-slate-300 px-4 py-2 font-bold"
                      aria-label="Perbesar teks"
                    >
                      A+
                    </button>
                  </div>
                </div>
              </aside>

              <article
                data-article-reader
                className={`min-w-0 overflow-hidden rounded-3xl border lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain ${
                  darkMode
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <a
                  href={article.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Buka gambar di tab baru"
                >
                  <img
                    src={article.image}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = article.imageFallback;
                    }}
                    alt={article.title}
                    loading="lazy"
                    className="h-56 w-full object-cover sm:h-80"
                  />
                </a>

                <div className="p-6 md:p-10">
                  <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-extrabold tracking-wider text-blue-700">
                    {article.category}
                  </span>
                  <div className="mt-5 flex items-start gap-3 md:gap-4">
                    <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 px-2 text-sm font-black text-white md:h-12 md:min-w-12 md:text-base">
                      {article.number}
                    </span>
                    <h2 className="text-3xl font-black leading-tight md:text-4xl">
                      {article.title}
                    </h2>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                    <span>📅 {article.date}</span>
                    <span>📖 {article.read}</span>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2 border-y border-slate-200 py-5">
                    {!audioPlaying && !audioPaused && (
                      <button
                        onClick={startAudio}
                        className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
                      >
                        ▶ Dengarkan Artikel
                      </button>
                    )}

                    {audioPlaying && (
                      <button
                        onClick={pauseAudio}
                        className="rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-white hover:bg-amber-600"
                      >
                        ⏸ Jeda Audio
                      </button>
                    )}

                    {audioPaused && (
                      <button
                        onClick={startAudio}
                        className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                      >
                        ▶ Lanjutkan Audio
                      </button>
                    )}

                    {(audioPlaying || audioPaused) && (
                      <button
                        onClick={stopAudio}
                        className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold"
                      >
                        ■ Hentikan
                      </button>
                    )}

                    <button
                      onClick={() => window.print()}
                      className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold hover:bg-slate-50"
                    >
                      🖨 Cetak Artikel
                    </button>
                  </div>

                  <div
                    className={`mt-7 rounded-2xl border p-5 ${
                      darkMode
                        ? "border-slate-700 bg-slate-800"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-xl">▶️</span>
                        <div>
                          <h3 className="font-extrabold">Video Terkait</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-500">{article.videoTitle}</p>
                          <p className="mt-1 text-xs text-slate-400">Video dapat diputar langsung di bawah ini.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 overflow-hidden rounded-xl bg-black">
                      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                          className="absolute inset-0 h-full w-full"
                          src={`https://www.youtube-nocookie.com/embed/${getYouTubeVideoId(article.videoUrl)}`}
                          title={article.videoTitle}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>

                  <p
                    className="mt-7 leading-8 text-slate-500"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {article.intro}
                  </p>

                  <div className="mt-7 space-y-8">
                    {article.paragraphs.map((paragraph, index) => (
                      <section key={paragraph.heading}>
                        <h3 className="text-xl font-extrabold">
                          {index + 1}. {paragraph.heading}
                        </h3>
                        <p
                          className="mt-3 leading-8 text-slate-500"
                          style={{ fontSize: `${fontSize}px` }}
                        >
                          {paragraph.text}
                        </p>
                      </section>
                    ))}
                  </div>

                  <div className="mt-9 rounded-2xl border-l-4 border-blue-600 bg-blue-50 p-5">
                    <p className="font-extrabold text-blue-950">
                      Pesan untuk pembaca
                    </p>
                    <p className="mt-2 leading-7 text-blue-900">
                      Jadilah pembaca yang kritis. Periksa sebelum percaya
                      dan pikirkan dampaknya sebelum membagikan informasi.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-between gap-3">
                    <button
                      onClick={() =>
                        setActiveArticle((index) =>
                          index === 0 ? articles.length - 1 : index - 1
                        )
                      }
                      className="rounded-xl border border-slate-300 px-4 py-3 font-bold hover:bg-slate-50"
                    >
                      ← Artikel sebelumnya
                    </button>
                    <button
                      onClick={() =>
                        setActiveArticle((index) =>
                          index === articles.length - 1 ? 0 : index + 1
                        )
                      }
                      className="rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700"
                    >
                      Artikel berikutnya →
                    </button>
                  </div>

                  <div className={`mt-10 border-t pt-8 ${darkMode ? "border-slate-700" : "border-slate-200"}`}>
                    <h3 className="text-2xl font-black">Berita Lainnya</h3>
                    <p className="mt-2 text-sm text-slate-500">Jelajahi topik literasi digital lainnya.</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {indexedArticles
                        .filter((item) => item.index !== activeArticle)
                        .slice(0, 4)
                        .map((item) => (
                          <button
                            key={item.title}
                            onClick={() => {
                              stopAudio();
                              setActiveArticle(item.index);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={`overflow-hidden rounded-2xl border text-left transition hover:-translate-y-1 hover:shadow-lg ${darkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = item.imageFallback;
                              }}
                              className="h-36 w-full object-cover"
                            />
                            <div className="p-4">
                              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">ARTIKEL {item.number} · {item.category}</p>
                              <h4 className="mt-2 font-extrabold leading-6">{item.title}</h4>
                              <p className="mt-2 text-sm text-slate-500">{item.read} →</p>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        {activePage === "kuis" && (
          <section className="mx-auto max-w-3xl px-5 py-12">
            <div className="text-center">
              <span className="text-5xl">🧠</span>
              <p className="mt-4 font-bold uppercase tracking-widest text-blue-600">
                Uji Kemampuan
              </p>
              <h1 className="mt-2 text-3xl font-black md:text-4xl">
                Kuis Literasi Digital
              </h1>
              <p className="mt-3 leading-7 text-slate-500">
                Jawab pertanyaan berikut untuk menguji pemahamanmu.
              </p>
            </div>

            {!quizFinished ? (
              <div
                className={`mt-9 rounded-3xl border p-6 shadow-sm md:p-9 ${
                  darkMode
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-blue-600">
                    SOAL {currentQuestion + 1} DARI {questions.length}
                  </span>
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">
                    Skor: {score * (100 / questions.length)}
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / questions.length) * 100
                      }%`,
                    }}
                  />
                </div>

                <h2 className="mt-8 text-xl font-extrabold leading-8 md:text-2xl">
                  {questions[currentQuestion].question}
                </h2>

                <div className="mt-6 grid gap-3">
                  {questions[currentQuestion].options.map(
                    (option, index) => {
                      const selected =
                        selectedAnswers[currentQuestion] === index;
                      const answered =
                        selectedAnswers[currentQuestion] !== undefined;
                      const correct =
                        questions[currentQuestion].answer === index;

                      let optionStyle = darkMode
                        ? "border-slate-700 bg-slate-800 hover:border-blue-500"
                        : "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50";

                      if (answered && correct) {
                        optionStyle =
                          "border-emerald-500 bg-emerald-50 text-emerald-900";
                      } else if (selected && !correct) {
                        optionStyle =
                          "border-red-400 bg-red-50 text-red-900";
                      }

                      return (
                        <button
                          key={option}
                          disabled={answered}
                          onClick={() => answerQuestion(index)}
                          className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${optionStyle}`}
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-current/20 font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1 font-medium leading-6">
                            {option}
                          </span>
                          {answered && correct && <span>✓</span>}
                          {selected && !correct && <span>✕</span>}
                        </button>
                      );
                    }
                  )}
                </div>

                {selectedAnswers[currentQuestion] !== undefined && (
                  <div className="mt-5 rounded-2xl bg-blue-50 p-5 text-blue-950">
                    <p className="font-extrabold">
                      {selectedAnswers[currentQuestion] ===
                      questions[currentQuestion].answer
                        ? "Benar! Jawaban kamu tepat."
                        : "Belum tepat, yuk pelajari jawabannya."}
                    </p>
                    <p className="mt-2 text-sm leading-6">
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                <div className="mt-7 flex justify-between gap-3">
                  <button
                    disabled={currentQuestion === 0}
                    onClick={() =>
                      setCurrentQuestion((previous) => previous - 1)
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Sebelumnya
                  </button>
                  <button
                    disabled={
                      selectedAnswers[currentQuestion] === undefined
                    }
                    onClick={nextQuestion}
                    className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {currentQuestion === questions.length - 1
                      ? "Lihat Hasil"
                      : "Soal Berikutnya →"}
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`mt-9 rounded-3xl border p-8 text-center md:p-12 ${
                  darkMode
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="text-6xl">
                  {score >= 6 ? "🏆" : score >= 4 ? "🎉" : "📚"}
                </div>
                <h2 className="mt-5 text-3xl font-black">
                  {score >= 6
                    ? "Hebat sekali!"
                    : score >= 4
                    ? "Bagus, terus belajar!"
                    : "Jangan menyerah!"}
                </h2>
                <p className="mt-3 text-slate-500">
                  Kamu telah menyelesaikan semua soal.
                </p>

                <div className="mx-auto mt-7 flex h-36 w-36 flex-col items-center justify-center rounded-full border-8 border-blue-100 bg-blue-50">
                  <span className="text-4xl font-black text-blue-700">
                    {Math.round((score / questions.length) * 100)}
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    dari 100
                  </span>
                </div>

                <p className="mt-5 text-lg font-bold">
                  Jawaban benar: {score} dari {questions.length} soal
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={resetQuiz}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
                  >
                    ↻ Ulangi Kuis
                  </button>
                  <button
                    onClick={() => navigate("materi")}
                    className="rounded-xl border border-slate-300 px-6 py-3 font-bold hover:bg-slate-50"
                  >
                    Pelajari Materi
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="mt-12 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 lg:px-8">
          <div>
            <p className="text-xl font-extrabold">
              Digi<span className="text-blue-400">Smart</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
              Media pembelajaran interaktif tentang literasi digital dan
              penyebaran informasi di internet.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Jelajahi</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-400">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className="text-left transition hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold">Pesan Literasi Digital</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Berpikir kritis, menjaga privasi, menghormati sesama, dan
              bertanggung jawab atas setiap informasi yang kita bagikan.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 px-5 py-5 text-center text-sm text-slate-500">
          © 2026 DigiSmart. Media Edukasi Literasi Digital.
        </div>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-blue-700"
        aria-label="Kembali ke atas"
        title="Kembali ke atas"
      >
        ↑
      </button>
    </div>
  );
}

export default App;
   