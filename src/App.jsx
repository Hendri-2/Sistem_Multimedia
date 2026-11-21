import { useEffect, useState } from "react";

// Mencoba beberapa ekstensi foto lokal di public/image sebelum memakai gambar cadangan.
// Contoh nama yang didukung: berita1.jpg, berita1.jpeg, berita1.JPG, berita1.png, berita1.webp.
function handleLocalImageError(event, imageNumber, fallbackUrl) {
  const img = event.currentTarget;
  const extensions = [".jpg", ".jpeg", ".JPG", ".JPEG", ".png", ".webp"];
  const candidates = [
    ...extensions.map((extension) => `/image/berita${imageNumber}${extension}`),
    fallbackUrl,
  ].filter(Boolean);
  const currentIndex = Number(img.dataset.fallbackIndex || "0");
  const nextIndex = currentIndex + 1;

  if (nextIndex < candidates.length) {
    img.dataset.fallbackIndex = String(nextIndex);
    img.src = candidates[nextIndex];
  } else {
    img.onerror = null;
  }
}

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
    image: "/image/berita1.jpg",
    imageFallback: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=85",
    videoTitle: "Cara Menangkal Hoaks di Internet",
    videoUrl: "https://youtu.be/Df3XiTYOyT8",
    intro: "Hoaks merupakan informasi palsu atau menyesatkan yang sengaja dibuat seolah-olah benar. Informasi seperti ini banyak beredar melalui media sosial dan aplikasi percakapan, terutama ketika membahas isu politik dan SARA. Judul yang provokatif sering digunakan untuk memancing emosi agar pembaca langsung percaya dan menyebarkannya.",
    paragraphs: [
      { heading: "Waspadai judul yang provokatif", text: "Hoaks sering menggunakan judul sensasional, berlebihan, atau menakut-nakuti pembaca. Judul seperti ini bertujuan memancing rasa penasaran dan emosi. Karena itu, jangan langsung mempercayai isi berita hanya berdasarkan judulnya. Bacalah informasi secara lengkap dan periksa apakah isinya sesuai dengan judul." },
      { heading: "Periksa alamat situs", text: "Perhatikan alamat situs yang menerbitkan berita. Situs yang tidak dikenal, memiliki nama domain mencurigakan, atau tidak mencantumkan identitas redaksi perlu diwaspadai. Utamakan sumber informasi yang jelas dan memiliki reputasi baik." },
      { heading: "Periksa fakta melalui sumber lain", text: "Pastikan informasi dengan membandingkannya melalui beberapa sumber berita tepercaya. Periksa siapa yang menyampaikan informasi, kapan berita diterbitkan, serta bukti yang mendukung klaim tersebut. Jangan menganggap informasi benar hanya karena banyak orang membagikannya." },
      { heading: "Periksa keaslian foto dan konten visual", text: "Foto dapat diedit, dimanipulasi, atau digunakan kembali tanpa konteks yang benar. Perhatikan apakah gambar sesuai dengan peristiwa yang diberitakan. Jika ragu, cari gambar atau informasi serupa dari sumber lain sebelum mengambil kesimpulan." },
      { heading: "Jadilah pengguna internet yang cerdas", text: "Jika kebenaran informasi belum dapat dipastikan, jangan ikut menyebarkannya. Kebiasaan memeriksa judul, alamat situs, fakta, dan keaslian foto membantu mengurangi penyebaran informasi palsu di masyarakat." }
    ]
  },
  {
    category: "KEAMANAN DIGITAL",
    title: "Waspada Phishing: Jangan Asal Klik Tautan atau Lampiran",
    date: "18 Oktober 2026",
    read: "4 menit membaca",
    image: "/image/berita2.jpg",
    imageFallback: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85",
    videoTitle: "Mengenal Bahaya Serangan Phishing",
    videoUrl: "https://youtu.be/hMvzI5Pup6w",
    intro: "Phishing adalah bentuk serangan siber yang memanfaatkan pesan atau email palsu untuk menipu pengguna. Pelaku biasanya membuat pesan yang terlihat meyakinkan agar korban mau membuka tautan atau mengunduh lampiran berbahaya. Tindakan sederhana seperti mengeklik file yang tidak dikenal dapat membuka jalan bagi peretas untuk menyerang perangkat.",
    paragraphs: [
      { heading: "Bagaimana phishing bekerja?", text: "Peretas mengirimkan email yang dirancang agar terlihat seperti pesan resmi atau penting. Email tersebut dapat berisi tautan maupun file lampiran (attachment) yang meminta korban melakukan tindakan tertentu. Pesan sering dibuat seolah-olah berasal dari pihak yang dapat dipercaya agar korban tidak curiga." },
      { heading: "Dampak ketika lampiran dibuka", text: "Ketika korban mengeklik tautan atau membuka lampiran berbahaya, perangkat dapat terinfeksi malware seperti virus atau Trojan. Program berbahaya tersebut dapat berjalan tanpa disadari pengguna dan memungkinkan pelaku memperoleh akses ke perangkat." },
      { heading: "Tujuan serangan phishing", text: "Serangan ini dapat digunakan untuk mencuri data pribadi, memata-matai aktivitas pengguna, dan mendapatkan kata sandi. Perangkat yang telah terinfeksi juga dapat dimanfaatkan untuk melakukan serangan lanjutan atau tindakan berbahaya lainnya." },
      { heading: "Cara melindungi diri", text: "Jangan terburu-buru membuka email, tautan, atau lampiran dari pengirim yang tidak dikenal. Periksa alamat email pengirim, pastikan alamat situs benar, dan konfirmasikan pesan mencurigakan melalui saluran resmi. Gunakan perlindungan keamanan pada perangkat dan perbarui sistem secara berkala." },
      { heading: "Utamakan keamanan siber", text: "Jika menerima pesan yang terasa janggal, lebih baik menghapusnya atau melaporkannya daripada mengambil risiko. Memahami cara kerja phishing membuat kita lebih waspada terhadap upaya pencurian data dan penyusupan ke perangkat." }
    ]
  },
  {
    category: "PRIVASI DATA",
    title: "Jaga Data Pribadi Saat Beraktivitas di Media Sosial",
    date: "19 Oktober 2026",
    read: "5 menit membaca",
    image: "/image/berita3.jpg",
    imageFallback: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
    videoTitle: "Pentingnya Menjaga Kerahasiaan Data Pribadi",
    videoUrl: "https://youtu.be/UW8G_qhR9XA",
    intro: "Media sosial memudahkan kita berbagi foto dan pengalaman. Namun, unggahan yang terlihat biasa saja dapat tanpa sengaja memperlihatkan informasi penting milik diri sendiri maupun orang lain. Salah satu contohnya adalah foto yang menampilkan dompet dan kartu kredit teman. Jika informasi pada kartu terlihat jelas, pihak yang tidak bertanggung jawab dapat mencoba menyalahgunakannya.",
    paragraphs: [
      { heading: "Waspadai unggahan yang ceroboh", text: "Sebelum mengunggah foto atau video, periksa seluruh bagian gambar. Pastikan tidak ada kartu identitas, kartu pembayaran, dokumen, alamat, atau informasi pribadi orang lain yang terlihat. Minta izin terlebih dahulu jika unggahan menampilkan barang atau data milik orang lain." },
      { heading: "Risiko penyalahgunaan kartu kredit", text: "Foto kartu kredit yang memperlihatkan informasi penting dapat dimanfaatkan untuk percobaan transaksi tanpa izin. Karena itu, jangan pernah membagikan foto bagian depan maupun belakang kartu pembayaran secara terbuka, meskipun hanya untuk bercanda atau sekadar menunjukkan sesuatu kepada teman." },
      { heading: "Data yang wajib dirahasiakan", text: "Lindungi kartu identitas, nomor kartu, tanggal kedaluwarsa (expired date), kode CVV, PIN, kata sandi, dan kode OTP. Informasi tersebut merupakan data sensitif yang dapat membuka akses ke akun atau layanan keuangan jika jatuh ke tangan orang yang salah." },
      { heading: "Periksa kembali sebelum mengunggah", text: "Biasakan melihat ulang foto sebelum menekan tombol kirim. Jika terdapat informasi sensitif, hapus foto tersebut atau tutupi bagian yang berisi data pribadi dengan cara yang benar. Jangan menyimpan atau membagikan data pribadi orang lain tanpa persetujuan." },
      { heading: "Bertanggung jawab atas data pribadi", text: "Menjaga kerahasiaan data merupakan tanggung jawab setiap pemiliknya. Sikap hati-hati saat menggunakan media sosial dapat mencegah kerugian dan mengurangi risiko penyalahgunaan identitas maupun informasi keuangan di kemudian hari." }
    ]
  },
  {
    category: "ETIKA DIGITAL",
    title: "Cyberbullying: Berani Melapor dan Dukung Korban",
    date: "20 Oktober 2026",
    read: "5 menit membaca",
    image: "/image/berita4.jpg",
    imageFallback: "https://images.unsplash.com/photo-1516321310764-8d8d8b4f4f2d?auto=format&fit=crop&w=1200&q=85",
    videoTitle: "Mengenal dan Mencegah Cyberbullying di Sekolah",
    videoUrl: "https://youtu.be/c_YCCkQXbJE",
    intro: "Cyberbullying atau perundungan siber merupakan tindakan menyakiti, mengancam, atau merendahkan orang lain melalui teknologi internet. Perundungan dapat terjadi di media sosial, aplikasi percakapan, maupun platform digital lainnya. Video ini menggambarkan pengalaman seorang siswa bernama Freddy yang menerima pesan rasis dan ancaman di dunia maya.",
    paragraphs: [
      { heading: "Apa itu cyberbullying?", text: "Cyberbullying adalah bentuk kekerasan atau perundungan yang dilakukan dengan memanfaatkan teknologi digital. Contohnya meliputi pesan hinaan, komentar rasis, ancaman, penyebaran rumor, serta tindakan mempermalukan seseorang melalui internet. Perilaku ini bukan candaan biasa karena dapat membuat korban merasa tidak aman." },
      { heading: "Dampak terhadap korban", text: "Perundungan siber dapat menyebabkan stres, rasa takut, depresi, dan hilangnya rasa percaya diri. Korban juga dapat merasa terisolasi dan kesulitan menjalani aktivitas sehari-hari. Dalam kondisi berat, dampaknya dapat membahayakan keselamatan dan kesehatan mental korban." },
      { heading: "Berikan dukungan kepada korban", text: "Seperti yang dilakukan Raisa kepada Freddy, teman dan orang terdekat sebaiknya memberikan dukungan, mendengarkan cerita korban, serta meyakinkan bahwa korban tidak bersalah atas perundungan yang dialaminya. Jangan menyalahkan atau menganggap kejadian tersebut sebagai hal sepele." },
      { heading: "Laporkan kepada pihak yang dapat membantu", text: "Simpan bukti berupa tangkapan layar pesan atau unggahan, lalu laporkan kejadian kepada guru, pihak sekolah, orang tua, atau orang dewasa yang dipercaya. Pihak sekolah dapat memberikan bimbingan kepada pelaku dan mengambil langkah untuk menjaga keamanan lingkungan belajar." },
      { heading: "Ciptakan lingkungan digital yang aman", text: "Jangan ikut menyebarkan hinaan atau konten yang mempermalukan orang lain. Berani melaporkan perundungan dan mendukung korban merupakan langkah penting untuk mencegah dampak yang lebih buruk serta menciptakan lingkungan sekolah dan internet yang aman." }
    ]
  },
  {
    category: "KECERDASAN BUATAN",
    title: "Deepfake AI: Kenali Tanda Video yang Dimanipulasi",
    date: "20 Oktober 2026",
    read: "4 menit membaca",
    image: "/image/berita5.jpg",
    imageFallback: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
    videoTitle: "Cara Mengenali Video Deepfake",
    videoUrl: "https://youtu.be/mT1UC8HjV9Y",
    intro: "Perkembangan kecerdasan buatan (Artificial Intelligence/AI) memungkinkan seseorang membuat atau memanipulasi video sehingga terlihat seperti rekaman asli. Teknologi ini dikenal sebagai deepfake. Agar tidak mudah tertipu, kita perlu memperhatikan beberapa tanda visual dan tetap memeriksa sumber video sebelum mempercayainya.",
    paragraphs: [
      { heading: "Perhatikan gerakan bibir", text: "Amati apakah gerakan bibir orang dalam video sesuai dengan suara yang terdengar. Jika gerakan mulut tampak terlambat, tidak sinkron, atau tidak sesuai dengan ucapan, hal tersebut dapat menjadi salah satu tanda video mengalami manipulasi." },
      { heading: "Amati kedipan mata", text: "Perhatikan pola kedipan mata orang dalam video. Subjek yang jarang berkedip atau memiliki gerakan mata yang terlihat tidak wajar dapat menjadi petunjuk adanya manipulasi. Namun, tanda ini perlu dilihat bersama indikator lainnya." },
      { heading: "Periksa pencahayaan dan bayangan", text: "Perhatikan cahaya yang mengenai wajah serta bayangan di sekitarnya. Pencahayaan yang tidak konsisten, bayangan yang janggal, atau bagian wajah yang tampak berbeda dari lingkungan dapat menjadi tanda video hasil rekayasa." },
      { heading: "Jangan menyimpulkan dari satu tanda saja", text: "Ketidaksesuaian gerakan bibir, kedipan mata, atau pencahayaan bukan bukti mutlak bahwa video merupakan deepfake. Gunakan beberapa petunjuk sekaligus dan periksa apakah video tersebut berasal dari akun atau sumber yang dapat dipercaya." },
      { heading: "Selalu periksa sumber video", text: "Cari unggahan asli, bandingkan dengan informasi dari media tepercaya, dan jangan langsung membagikan video yang belum jelas kebenarannya. Gunakan teknologi AI secara bijak serta bertanggung jawab." }
    ]
  },
  {
    category: "JEJAK DIGITAL",
    title: "Jejak Digital: Pikirkan Sebelum Membagikan Sesuatu",
    date: "21 Oktober 2026",
    read: "4 menit membaca",
    image: "/image/berita6.jpg",
    imageFallback: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=85",
    videoTitle: "Memahami Jejak Digital dan Dampaknya",
    videoUrl: "https://youtu.be/VRFt8JVwvuY",
    intro: "Jejak digital adalah informasi atau rekaman yang tertinggal ketika seseorang melakukan aktivitas di internet. Mengunggah foto, menulis komentar, mencari informasi, dan menggunakan aplikasi dapat meninggalkan data. Karena itu, setiap pengguna perlu memahami jenis jejak digital dan mempertimbangkan dampak aktivitasnya di dunia maya.",
    paragraphs: [
      { heading: "Apa itu jejak digital?", text: "Jejak digital merupakan rekaman aktivitas seseorang ketika menggunakan layanan internet. Informasi tersebut dapat berupa unggahan, komentar, riwayat pencarian, maupun data penggunaan layanan. Sebagian jejak dapat tetap tersimpan meskipun pengguna sudah tidak lagi melihatnya." },
      { heading: "Jejak digital aktif", text: "Jejak digital aktif adalah informasi yang sengaja dibagikan oleh pengguna. Contohnya mengunggah foto, menulis komentar, membuat postingan, mengisi formulir daring, atau membagikan lokasi secara langsung." },
      { heading: "Jejak digital pasif", text: "Jejak digital pasif adalah data yang tercatat secara otomatis ketika seseorang menggunakan layanan digital. Contohnya informasi perangkat, alamat IP, lokasi jika izin diberikan, serta aktivitas penggunaan yang dikumpulkan oleh layanan sesuai kebijakan privasinya." },
      { heading: "Dampak positif dan negatif", text: "Jejak digital dapat memberikan dampak positif jika digunakan untuk berbagi karya, belajar, dan membangun reputasi. Sebaliknya, unggahan yang tidak pantas atau informasi pribadi yang tersebar dapat menimbulkan masalah privasi dan memengaruhi reputasi seseorang." },
      { heading: "Tiga langkah bijak sebelum membagikan sesuatu", text: "Pertama, pikirkan dampak unggahan terhadap diri sendiri dan orang lain. Kedua, periksa kebenaran informasi sebelum menyebarkannya. Ketiga, lindungi informasi pribadi agar tidak digunakan oleh pihak yang tidak bertanggung jawab." }
    ]
  },
  {
    category: "KEAMANAN AKUN",
    title: "Lindungi Akun Digital dengan Kata Sandi dan Autentikasi",
    date: "21 Oktober 2026",
    read: "5 menit membaca",
    image: "/image/berita7.jpg",
    imageFallback: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=85",
    videoTitle: "Cara Melindungi Akun dengan Password dan Autentikasi",
    videoUrl: "https://youtu.be/-ltmAOVEyR8",
    intro: "Akun digital menjadi pintu masuk ke berbagai layanan penting, mulai dari media sosial hingga layanan keuangan. Jika akun diretas, data pribadi dan identitas pengguna dapat disalahgunakan. Oleh karena itu, setiap orang perlu menggunakan kata sandi yang kuat serta memahami metode autentikasi untuk memastikan hanya pemilik akun yang dapat mengaksesnya.",
    paragraphs: [
      { heading: "Mengapa keamanan akun penting?", text: "Melindungi akun berarti menjaga privasi, data pribadi, dan informasi penting yang tersimpan di dalamnya. Kata sandi yang bocor atau mudah ditebak dapat dimanfaatkan pihak lain untuk mengambil alih akun dan melakukan tindakan tanpa izin." },
      { heading: "Buat kata sandi yang kuat dan unik", text: "Hindari menggunakan kata sandi yang sama untuk banyak akun. Gunakan kombinasi huruf kapital, huruf kecil, angka, dan simbol. Panjang kata sandi minimal delapan karakter disarankan, dan semakin panjang serta sulit ditebak kata sandi, semakin baik perlindungannya." },
      { heading: "Apa itu autentikasi?", text: "Autentikasi adalah proses verifikasi identitas pengguna sebelum sistem memberikan akses. Sistem memeriksa informasi yang dimasukkan, seperti nama pengguna dan kata sandi, lalu mencocokkannya dengan data yang tersimpan di database." },
      { heading: "Kenali berbagai metode autentikasi", text: "OTP (One Time Password) merupakan kode sekali pakai yang dikirim melalui SMS atau aplikasi. Biometrik menggunakan ciri fisik seperti sidik jari atau pengenalan wajah. PIN dan kata sandi merupakan metode verifikasi yang umum digunakan untuk mengakses akun atau perangkat." },
      { heading: "Gunakan 2FA untuk perlindungan tambahan", text: "Two-Factor Authentication (2FA) menambahkan dua lapisan verifikasi, misalnya kata sandi yang dilanjutkan dengan kode OTP. Dengan begitu, orang yang mengetahui kata sandi saja belum tentu dapat masuk ke akun. Jangan pernah memberikan kode OTP kepada orang lain." }
    ]
  },
  {
    category: "INFORMASI DIGITAL",
    title: "Algoritma Media Sosial: Mengapa Konten Ini Muncul di Berandamu?",
    date: "22 Oktober 2026",
    read: "6 menit membaca",
    image: "/image/berita8.jpg",
    imageFallback: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    videoTitle: "Mengenal Cara Kerja Algoritma Media Sosial",
    videoUrl: "https://youtu.be/lru-nRmX3yY",
    intro: "Konten yang muncul di beranda media sosial bukanlah pilihan acak. Platform menggunakan algoritma, yaitu serangkaian instruksi otomatis, untuk menentukan konten yang diperkirakan sesuai dengan minat pengguna. Sistem ini memengaruhi informasi yang kita lihat, pengalaman kreator, hingga cara iklan ditampilkan.",
    paragraphs: [
      { heading: "Apa itu algoritma media sosial?", text: "Algoritma merupakan serangkaian instruksi yang diproses secara otomatis untuk menentukan konten yang ditampilkan kepada pengguna. Sistem rekomendasi mempertimbangkan berbagai informasi agar konten yang muncul diperkirakan sesuai dengan minat dan kebiasaan pengguna." },
      { heading: "Bagaimana algoritma mempelajari minat pengguna?", text: "Algoritma dapat mempelajari pola interaksi, seperti tanda suka (like), komentar, konten yang dibagikan (share), akun yang diikuti, dan durasi menonton. Aktivitas tersebut membantu platform membangun perkiraan mengenai topik yang menarik bagi setiap pengguna." },
      { heading: "Mengenal echo chamber", text: "Echo chamber adalah keadaan ketika pengguna lebih sering menerima konten yang sejalan dengan pandangan atau minatnya. Jika terus terjadi, pengguna dapat terjebak dalam gelembung informasi dan jarang melihat sudut pandang yang berbeda." },
      { heading: "Mengapa sebuah konten bisa viral?", text: "Konten dengan tingkat interaksi tinggi dan sesuai tren dapat memperoleh jangkauan lebih luas. Namun, jumlah tanda suka, komentar, atau pembagian tidak menjamin bahwa informasi tersebut benar dan bermanfaat." },
      { heading: "Pengaruh algoritma bagi kreator konten", text: "Algoritma dapat membantu kreator menjangkau banyak orang dan membuat konten menjadi viral. Di sisi lain, perubahan sistem rekomendasi membuat jangkauan konten sulit diprediksi sehingga kreator perlu terus menyesuaikan strategi dan kualitas konten." },
      { heading: "Dampak terhadap kesehatan mental", text: "Fitur rekomendasi dan kebiasaan scrolling tanpa henti dapat membuat pengguna menghabiskan waktu lebih lama di media sosial. Hal ini dapat memicu penggunaan berlebihan dan FOMO (Fear of Missing Out), yaitu rasa takut tertinggal informasi atau tren terbaru." },
      { heading: "Algoritma dan iklan digital", text: "Platform dapat menggunakan data minat dan aktivitas pengguna untuk membantu menampilkan iklan yang lebih sesuai dengan sasaran pengiklan. Karena itu, penting untuk memahami pengaturan privasi dan memperhatikan data yang dibagikan kepada layanan digital." },
      { heading: "Masa depan algoritma dan AI", text: "Kemajuan Artificial Intelligence (AI) memungkinkan sistem rekomendasi menjadi semakin canggih dalam menganalisis pola dan memperkirakan perilaku pengguna. Kita tetap perlu bersikap kritis, mengatur waktu penggunaan, serta mencari informasi dari sumber yang beragam." }
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
    content: [
      { heading: "Mengapa cek fakta penting?", text: "Informasi di internet dapat dibuat dan dibagikan oleh siapa saja. Karena itu, berita yang ramai dibicarakan atau memiliki banyak tanda suka belum tentu benar. Memeriksa fakta membantu kita menghindari kesalahpahaman dan tidak ikut menyebarkan hoaks." },
      { heading: "Periksa sumber dan tanggal", text: "Cari tahu siapa yang menerbitkan informasi, apakah sumbernya jelas, dan kapan informasi tersebut dibuat. Berita lama yang dibagikan kembali seolah-olah baru dapat menimbulkan pemahaman yang keliru." },
      { heading: "Bandingkan bukti", text: "Jangan hanya membaca judul. Baca isi berita, periksa bukti yang disertakan, lalu bandingkan dengan beberapa media atau sumber tepercaya. Foto dan video juga perlu diperiksa konteks serta asalnya." },
      { heading: "Kenali hoaks dan deepfake", text: "Hoaks adalah informasi palsu atau menyesatkan. Deepfake merupakan konten gambar, suara, atau video yang dimanipulasi dengan bantuan AI. Periksa sumber pertama dan cari konfirmasi lain sebelum mempercayainya." }
    ],
  },
  {
    number: "02",
    icon: "🔐",
    title: "Keamanan Digital",
    description:
      "Jaga kata sandi, rahasiakan OTP, dan hindari tautan yang mencurigakan.",
    color: "bg-violet-50",
    content: [
      { heading: "Lindungi data pribadi", text: "Nama lengkap, alamat, nomor telepon, dokumen identitas, kata sandi, dan kode OTP tidak boleh dibagikan sembarangan. Data tersebut dapat disalahgunakan untuk penipuan atau mengambil alih akun." },
      { heading: "Waspadai phishing", text: "Phishing adalah upaya menipu dengan menyamar sebagai pihak tepercaya agar korban memberikan informasi sensitif. Pelaku dapat mengirim tautan situs palsu melalui pesan yang mengaku berasal dari bank, toko daring, atau jasa pengiriman." },
      { heading: "Kenali tanda tautan mencurigakan", text: "Berhati-hatilah terhadap pesan yang mendesak, mengancam akun akan diblokir, atau menawarkan hadiah yang tidak masuk akal. Periksa alamat situs dan jangan memasukkan kata sandi atau OTP melalui tautan yang tidak jelas." },
      { heading: "Gunakan perlindungan akun", text: "Buat kata sandi yang panjang dan berbeda untuk setiap akun. Aktifkan autentikasi dua faktor, periksa perangkat yang masuk, dan segera ganti kata sandi melalui layanan resmi jika menemukan aktivitas mencurigakan." }
    ],
  },
  {
    number: "03",
    icon: "🤝",
    title: "Etika Digital",
    description:
      "Hormati orang lain, hindari perundungan, dan pikirkan dampak sebelum berkomentar.",
    color: "bg-emerald-50",
    content: [
      { heading: "Bersikap sopan di ruang digital", text: "Etika digital adalah sikap bertanggung jawab ketika berkomunikasi dan beraktivitas melalui teknologi. Hormati perbedaan pendapat, gunakan bahasa yang pantas, dan pikirkan dampak komentar sebelum mengirimkannya." },
      { heading: "Hindari cyberbullying", text: "Cyberbullying merupakan perundungan melalui media digital, misalnya penghinaan berulang, ancaman, penyebaran rumor, atau konten pribadi untuk mempermalukan seseorang. Perilaku ini dapat membuat korban merasa takut dan tertekan." },
      { heading: "Apa yang dilakukan jika melihat perundungan?", text: "Jangan ikut menyebarkan konten yang merendahkan korban. Simpan bukti, blokir dan laporkan akun pelaku, serta mintalah bantuan orang tepercaya jika ancaman serius terjadi." },
      { heading: "Hormati privasi dan jejak digital", text: "Jangan mengunggah data atau foto orang lain tanpa izin. Komentar, foto, dan unggahan dapat disalin atau disebarkan kembali sehingga jejak digital perlu dipikirkan sebelum kita memposting sesuatu." }
    ],
  },
  {
    number: "04",
    icon: "📢",
    title: "Sebarkan Informasi dengan Bijak",
    description:
      "Bagikan informasi yang bermanfaat setelah memeriksa kebenarannya.",
    color: "bg-amber-50",
    content: [
      { heading: "Saring sebelum sharing", text: "Sebelum membagikan informasi, periksa siapa sumbernya, apa bukti kebenarannya, kapan informasi diterbitkan, dan apakah informasi tersebut bermanfaat. Jangan membagikan berita hanya karena judulnya mengejutkan atau sedang viral." },
      { heading: "Pahami algoritma media sosial", text: "Sistem rekomendasi dapat menampilkan konten berdasarkan akun yang diikuti dan interaksi sebelumnya. Akibatnya, setiap pengguna bisa melihat informasi yang berbeda. Konten yang sering muncul atau mendapat banyak suka tidak otomatis benar." },
      { heading: "Cari sudut pandang beragam", text: "Gunakan beberapa sumber yang tepercaya dan jangan hanya mengandalkan satu unggahan. Membandingkan informasi membantu kita melihat konteks yang lebih lengkap dan mengurangi risiko terjebak informasi yang seragam." },
      { heading: "Bagikan secara bertanggung jawab", text: "Jika informasi belum terverifikasi, tahan diri untuk tidak menyebarkannya. Jika menemukan kekeliruan, berikan koreksi dengan sopan dan gunakan fitur pelaporan pada platform bila diperlukan." }
    ],
  },
];

function App() {
  const [activePage, setActivePage] = useState("beranda");
  const [activeArticle, setActiveArticle] = useState(0);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [fontSize, setFontSize] = useState(17);
  const [darkMode, setDarkMode] = useState(false);

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
    if (selectedAnswers[currentQuestion] !== undefined) return;

    // File audio berada di public/sounds/.
    const isCorrect = answerIndex === questions[currentQuestion].answer;
    const answerSound = new Audio(
      isCorrect ? "/sounds/benar.mp3" : "/sounds/salah.mp3"
    );
    answerSound.volume = 1;
    answerSound.play().catch((error) => {
      console.error("Efek suara kuis gagal diputar:", error);
    });

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
    { id: "about", label: "Tentang Kami" },
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
                Digi<span className="text-slate-700">Smart</span>
              </p>
              <p
                className={`text-lg ${
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
                className={`rounded-xl px-4 py-2.5 text-lg font-semibold transition ${
                  activePage === item.id
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "text-slate-300 hover:bg-slate-800"
                    : "text-slate-600 hover:bg-blue-50 hover:text-slate-800"
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
                className="rounded-xl px-4 py-3 text-left font-semibold hover:bg-blue-50 hover:text-slate-800"
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
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-lg font-medium text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Platform Edukasi Digital
                  </span>

                  <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                    Jadilah Cerdas di Dunia{" "}
                    <span className="text-white/80">Digital.</span>
                  </h1>

                  <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200 md:text-lg">
                    Pelajari cara memilah informasi, mengenali hoaks, menjaga
                    keamanan data, dan menjadi pengguna internet yang bijak
                    melalui pengalaman belajar yang interaktif.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate("materi")}
                      className="rounded-2xl bg-white px-6 py-4 font-bold text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-cyan-50"
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

                  <div className="mt-10 flex flex-wrap gap-7 text-lg text-slate-200">
                    <span>✓ Materi mudah dipahami</span>
                    <span>✓ Audio narasi</span>
                    <span>✓ Kuis interaktif</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur">
                    <img
                      key="homepage-image-3"
                      src="/image/berita3.jpg"
                      data-fallback-index="0"
                      onError={(event) =>
                        handleLocalImageError(
                          event,
                          3,
                          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85"
                        )
                      }
                      alt="Pengguna memanfaatkan teknologi digital"
                      className="h-64 w-full rounded-2xl object-cover md:h-80"
                    />
                    <div className="grid grid-cols-2 gap-3 p-2 pt-5">
                      <div className="rounded-2xl bg-white/10 p-4">
                        <span className="text-2xl">🧠</span>
                        <p className="mt-2 font-bold">Berpikir Kritis</p>
                        <p className="mt-1 text-lg text-slate-200">
                          Tidak mudah percaya
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-4">
                        <span className="text-2xl">🛡️</span>
                        <p className="mt-2 font-bold">Tetap Aman</p>
                        <p className="mt-1 text-lg text-slate-200">
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
                  <p className="font-bold uppercase tracking-widest text-slate-700">
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
                  className="font-bold text-slate-700 hover:text-slate-900"
                >
                  Lihat semua materi →
                </button>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.number}
                    onClick={() => { setExpandedLesson(lesson.number); navigate("materi"); }}
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
                    <p className="mt-5 text-lg font-bold tracking-widest text-slate-700">
                      MATERI {lesson.number}
                    </p>
                    <h3 className="mt-2 text-lg font-extrabold">
                      {lesson.title}
                    </h3>
                    <p className="mt-3 text-lg leading-7 text-slate-500">
                      {lesson.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl bg-blue-600 p-8 text-white md:p-10">
                  <p className="text-lg font-bold uppercase tracking-widest text-slate-200">
                    Baca dan dengarkan
                  </p>
                  <h2 className="mt-4 text-3xl font-black">
                    Informasi benar dimulai dari kebiasaan yang benar.
                  </h2>
                  <p className="mt-4 leading-7 text-slate-200">
                    Baca artikel edukasi dan dengarkan narasi agar materi
                    lebih mudah dipahami.
                  </p>
                  <button
                    onClick={() => navigate("berita")}
                    className="mt-7 rounded-xl bg-white px-5 py-3 font-bold text-slate-800 transition hover:bg-blue-50"
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
                  <p className="text-lg font-bold uppercase tracking-widest text-emerald-600">
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
          <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-800 to-indigo-950 p-8 text-white shadow-2xl shadow-slate-900/10 md:p-12">
              <div className="absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl" />
              <div className="absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-white/90">
                <span className="h-2 w-2 rounded-full bg-emerald-300" /> PUSAT PEMBELAJARAN
              </span>
              <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Bangun Kebiasaan Digital yang Lebih Cerdas
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                Pelajari cara memeriksa informasi, menjaga keamanan, menghormati sesama, dan membagikan konten secara bertanggung jawab.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-white/80">
                <span className="rounded-full bg-white/10 px-4 py-2">Contoh dalam kehidupan sehari-hari</span>
                <span className="rounded-full bg-white/10 px-4 py-2">Belajar sesuai kecepatanmu</span>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className={`text-sm font-bold uppercase tracking-[0.18em] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Mulai dari sini</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Pilih materi yang ingin dipelajari</h2>
              </div>
              <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Klik kartu untuk membuka penjelasan</p>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {lessons.map((lesson, index) => (
                <article
                  key={lesson.number}
                  className={`group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    darkMode
                      ? "border-slate-800 bg-slate-900 hover:border-slate-600"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-400 via-indigo-400 to-cyan-300 opacity-70 transition group-hover:opacity-100" />
                  <button
                    type="button"
                    onClick={() => setExpandedLesson(lesson.number)}
                    aria-label={`Buka materi ${lesson.title}`}
                    className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4 rounded-2xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-sm ${lesson.color} transition duration-300 group-hover:rotate-3 group-hover:scale-105`}>
                        {lesson.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-extrabold tracking-[0.16em] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>MATERI {lesson.number}</span>
                        </div>
                        <h3 className="mt-2 text-xl font-extrabold leading-snug tracking-tight md:text-2xl">{lesson.title}</h3>
                      </div>
                    </div>
                    <p className={`mt-5 leading-7 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>{lesson.description}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-dashed border-slate-300/50 pt-4">
                      <span className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-600"}`}>Pelajari materi ini</span>
                      <span className={`rounded-xl px-4 py-2 text-sm font-bold transition group-hover:shadow-md ${darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"}`}>Buka Materi</span>
                    </div>
                  </button>
                </article>
              ))}
            </div>

            <div className={`mt-9 flex flex-col gap-5 rounded-3xl border p-6 md:flex-row md:items-center md:justify-between md:p-8 ${darkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white shadow-sm"}`}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl">💡</div>
                <div>
                  <h2 className="text-xl font-black">Ingat prinsip Saring Sebelum Sharing</h2>
                  <p className={`mt-2 max-w-2xl leading-7 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                    Periksa sumber, bukti, dan manfaat informasi sebelum membagikannya kepada orang lain.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("kuis")}
                className="shrink-0 rounded-2xl bg-slate-900 px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              >
                Uji pemahaman <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>
        )}

        {activePage === "berita" && (
          <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-700">
                Ruang Baca Digital
              </p>
              <h1 className="mt-2 text-2xl font-black md:text-3xl">
                Artikel dan Edukasi
              </h1>
              <p className="mt-2 text-base text-slate-500">
                Pilih artikel, atur ukuran teks, atau dengarkan narasi.
              </p>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
              <aside
                className={`rounded-2xl border p-4 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto overscroll-contain ${
                  darkMode
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-extrabold">Daftar Artikel</h2>
                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-sm font-bold text-slate-800">
                    {visibleArticles.length} artikel
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-500">
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
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg font-black ${activeArticle === item.index ? "bg-white/20 text-white" : "bg-blue-100 text-slate-800"}`}>
                          {item.number}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-bold tracking-wider opacity-80">{item.category}</span>
                          <p className="mt-1 text-base font-bold leading-6">{item.title}</p>
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
                    <span className="flex-1 text-center text-lg">
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
                className={`min-w-0 overflow-hidden rounded-2xl border lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain ${
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
                    key={article.image}
                    src={article.image}
                    data-fallback-index="0"
                    onError={(event) =>
                      handleLocalImageError(
                        event,
                        article.index + 1,
                        article.imageFallback
                      )
                    }
                    alt={article.title}
                    loading="lazy"
                    className="h-48 w-full object-cover sm:h-64"
                  />
                </a>

                <div className="p-5 md:p-7">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-extrabold tracking-wider text-slate-800">
                    {article.category}
                  </span>
                  <div className="mt-5 flex items-start gap-3 md:gap-4">
                    <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 px-2 text-lg font-black text-white md:h-12 md:min-w-12 md:text-lg">
                      {article.number}
                    </span>
                    <h2 className="text-2xl font-black leading-tight md:text-3xl">
                      {article.title}
                    </h2>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                    <span>📅 {article.date}</span>
                    <span>📖 {article.read}</span>
                  </div>

                  <div className="mt-7 grid gap-3 border-y border-slate-200 py-5">
                    <div>
                      <p className="mb-2 text-base font-bold">🎙️ Dengarkan Audio</p>
                      <audio controls preload="none" className="w-full">
                        <source src="/audio/suara-kelompok.mp3" type="audio/mpeg" />
                        Browser kamu belum mendukung pemutar audio.
                      </audio>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Audio kelompok belum tersedia. Setelah rekaman dibuat, simpan file dengan nama
                        <code className="mx-1 rounded bg-slate-100 px-1 py-0.5">suara-kelompok.mp3</code>
                        di folder <code className="rounded bg-slate-100 px-1 py-0.5">public/audio</code>.
                      </p>
                    </div>

                    <button
                      onClick={() => window.print()}
                      className="rounded-xl border border-slate-300 px-4 py-2.5 text-base font-bold hover:bg-slate-50"
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
                          <p className="mt-1 text-base leading-6 text-slate-500">{article.videoTitle}</p>
                          <p className="mt-1 text-sm text-slate-400">Video dapat diputar langsung di bawah ini.</p>
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

                  <div className="mt-6 space-y-6">
                    {article.paragraphs.map((paragraph, index) => (
                      <section key={paragraph.heading}>
                        <h3 className="text-lg font-extrabold">
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
                    <p className="font-extrabold text-slate-950">
                      Pesan untuk pembaca
                    </p>
                    <p className="mt-2 leading-7 text-slate-950">
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
                    <h3 className="text-xl font-black">Berita Lainnya</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Jelajahi topik literasi digital lainnya.</p>
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
                              key={item.image}
                              src={item.image}
                              data-fallback-index="0"
                              alt={item.title}
                              loading="lazy"
                              onError={(event) =>
                                handleLocalImageError(
                                  event,
                                  item.index + 1,
                                  item.imageFallback
                                )
                              }
                              className="h-36 w-full object-cover"
                            />
                            <div className="p-4">
                              <p className="text-lg font-bold uppercase tracking-wider text-slate-700">ARTIKEL {item.number} · {item.category}</p>
                              <h4 className="mt-2 font-extrabold leading-7">{item.title}</h4>
                              <p className="mt-2 text-sm leading-6 text-slate-500">{item.read} →</p>
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
              <p className="mt-4 font-bold uppercase tracking-widest text-slate-700">
                Uji Kemampuan
              </p>
              <h1 className="mt-2 text-3xl font-black md:text-4xl">
                Kuis Literasi Digital
              </h1>
              <p className="mt-3 leading-7 text-slate-500">
                Soal diambil dari empat materi: cek fakta, keamanan digital, etika digital, dan penyebaran informasi secara bijak.
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
                  <span className="text-lg font-bold text-slate-700">
                    SOAL {currentQuestion + 1} DARI {questions.length}
                  </span>
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-lg font-bold text-slate-800">
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
                          <span className="flex-1 font-medium leading-7">
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
                  <div className="mt-5 rounded-2xl bg-blue-50 p-5 text-slate-950">
                    <p className="font-extrabold">
                      {selectedAnswers[currentQuestion] ===
                      questions[currentQuestion].answer
                        ? "Benar! Jawaban kamu tepat."
                        : "Belum tepat, yuk pelajari jawabannya."}
                    </p>
                    <p className="mt-2 text-lg leading-7">
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
                  <span className="text-4xl font-black text-slate-800">
                    {Math.round((score / questions.length) * 100)}
                  </span>
                  <span className="text-lg font-bold text-slate-700">
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

        {activePage === "about" && (
          <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
            {/* Hero Tentang Kami */}
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 p-7 text-white shadow-2xl md:p-12">
              <div className="absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
              <div className="absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    Tentang Pengembang
                  </span>
                  <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Kenalan dengan <span className="text-cyan-200">DigiSmart</span></h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                    DigiSmart merupakan media pembelajaran interaktif yang membahas literasi digital dan penyebaran informasi di internet. Website ini dibuat untuk memenuhi tugas terstruktur mata kuliah Sistem Multimedia.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">Proyek</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">Sistem Multimedia</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">Kelompok 7</span>
                  </div>
                </div>
                <div className="mx-auto w-full max-w-xs">
                  <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-sm">
                    <div className="flex aspect-square items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-cyan-300 to-blue-500 text-7xl shadow-inner">◈</div>
                    <p className="mt-5 text-center text-2xl font-black tracking-tight">DigiSmart</p>
                    <p className="mt-1 text-center text-sm text-slate-200">Belajar cerdas di dunia digital</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fokus website */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: "🔎", title: "Berpikir Kritis", text: "Membantu pengguna memeriksa sumber dan kebenaran informasi sebelum mempercayainya." },
                { icon: "🛡️", title: "Aman di Internet", text: "Mengenalkan cara menjaga data pribadi dan melindungi akun digital." },
                { icon: "🤝", title: "Bijak Berinteraksi", text: "Mengajak pengguna menghormati orang lain dan bertanggung jawab saat berbagi informasi." },
              ].map((item) => (
                <div key={item.title} className={`group rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${darkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-2xl transition group-hover:scale-110">{item.icon}</div>
                  <h2 className="mt-4 text-lg font-extrabold">{item.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Identitas proyek */}
            <div className={`mt-8 overflow-hidden rounded-3xl border ${darkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white shadow-sm"}`}>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 px-7 py-6">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.18em] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Informasi akademik</p>
                  <h2 className="mt-1 text-2xl font-black">Identitas Proyek</h2>
                </div>
                <span className={`rounded-full px-4 py-2 text-sm font-bold ${darkMode ? "bg-slate-800 text-slate-200" : "bg-blue-50 text-slate-700"}`}>Sistem Multimedia</span>
              </div>
              <div className="grid gap-3 p-6 sm:grid-cols-2 md:p-7">
                {[
                  { label: "Perguruan Tinggi", value: "Universitas Widya Dharma Pontianak", icon: "🏛️" },
                  { label: "Fakultas", value: "Fakultas Teknologi Informasi", icon: "🎓" },
                  { label: "Program Studi", value: "Informatika", icon: "💻" },
                  { label: "Nama Media", value: "DigiSmart", icon: "🌐" },
                  { label: "Mata Kuliah", value: "Sistem Multimedia", icon: "📚" },
                  { label: "Kelompok", value: "Kelompok 7", icon: "👥" },
                ].map((item) => (
                  <div key={item.label} className={`flex items-start gap-4 rounded-2xl p-4 ${darkMode ? "bg-slate-800" : "bg-slate-50"}`}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">{item.icon}</span>
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>{item.label}</p>
                      <p className="mt-1 font-bold leading-6">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tim pengembang */}
            <div className={`mt-8 rounded-3xl border p-6 md:p-8 ${darkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white shadow-sm"}`}>
              <div className="text-center">
                <p className={`text-xs font-bold uppercase tracking-[0.18em] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Di balik DigiSmart</p>
                <h2 className="mt-2 text-2xl font-black md:text-3xl">Tim Pengembang</h2>
                <p className={`mt-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Kelompok 7 · Universitas Widya Dharma Pontianak</p>
              </div>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {[
                  { name: "Emanuel Yorlius Nirwana Hopaya", npm: "23421659", initials: "EY" },
                  { name: "Hendri", npm: "23421674", initials: "H" },
                  { name: "Pingkan Emma Rut Werung", npm: "23421697", initials: "PE" },
                ].map((member, index) => (
                  <div key={member.npm} className={`group rounded-2xl border p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg ${darkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"}`}>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-xl font-black text-white shadow-lg transition group-hover:rotate-3">{member.initials}</div>
                    <p className="mt-4 font-extrabold leading-6">{member.name}</p>
                    <p className={`mt-2 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>NPM: {member.npm}</p>
                    <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${darkMode ? "bg-slate-700 text-slate-200" : "bg-white text-slate-600"}`}>Anggota {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg md:flex md:items-center md:justify-between md:gap-6 md:p-8">
              <div>
                <h2 className="text-xl font-black">Yuk, mulai belajar bersama DigiSmart!</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-blue-100">Jelajahi materi dan artikel, lalu uji pemahamanmu melalui kuis literasi digital.</p>
              </div>
              <div className="mt-5 flex shrink-0 flex-wrap gap-3 md:mt-0">
                <button onClick={() => navigate("materi")} className="rounded-xl bg-white px-5 py-3 font-bold text-blue-800 transition hover:-translate-y-0.5 hover:bg-blue-50">Lihat Materi</button>
                <button onClick={() => navigate("kuis")} className="rounded-xl border border-white/40 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/20">Coba Kuis</button>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-12 bg-slate-950 text-base text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-4 lg:px-8">
          <div>
            <p className="font-extrabold">
              Digi<span className="text-slate-200">Smart</span>
            </p>
            <p className="mt-3 max-w-sm leading-7 text-slate-400">
              Media pembelajaran interaktif tentang literasi digital dan
              penyebaran informasi di internet.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Jelajahi</h3>
            <div className="mt-4 grid gap-3 text-slate-400">
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
            <h3 className="font-bold">Institusi</h3>
            <div className="mt-4 leading-7 text-slate-400">
              <p className="whitespace-nowrap">Universitas Widya Dharma Pontianak</p>
              <p>Fakultas Teknologi Informasi</p>
              <p>Program Studi Informatika</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Pesan Literasi Digital</h3>
            <p className="mt-4 leading-7 text-slate-400">
              Berpikir kritis, menjaga privasi, menghormati sesama, dan
              bertanggung jawab atas setiap informasi yang kita bagikan.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 px-5 py-5 text-center text-slate-500">
          <p>© 2026 DigiSmart. Media Edukasi Literasi Digital.</p>
          <p className="mt-2 text-slate-400">Dikembangkan oleh Kelompok 7 · Emanuel Yorlius Nirwana Hopaya, Hendri, dan Pingkan Emma Rut Werung</p>
        </div>
      </footer>

      {expandedLesson && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-md sm:p-5"
          onClick={() => setExpandedLesson(null)}
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="lesson-modal-title"
            className={`relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10 ${darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
            onClick={(event) => event.stopPropagation()}
          >
            {(() => {
              const selectedLesson = lessons.find((item) => item.number === expandedLesson);
              if (!selectedLesson) return null;
              return (
                <>
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-800 to-indigo-950 px-6 py-7 text-white sm:px-9 sm:py-8">
                    <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-cyan-300/15 blur-3xl" />
                    <button
                      type="button"
                      onClick={() => setExpandedLesson(null)}
                      aria-label="Tutup pop-up"
                      className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:rotate-90 hover:bg-white/20"
                    >×</button>
                    <div className="relative flex items-start gap-4 pr-10">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-lg ${selectedLesson.color}`}>
                        {selectedLesson.icon}
                      </div>
                      <div>
                        <p className="text-xs font-extrabold tracking-[0.2em] text-white/65">MATERI {selectedLesson.number} · DIGISMART</p>
                        <h2 id="lesson-modal-title" className="mt-2 text-2xl font-black leading-tight sm:text-3xl">{selectedLesson.title}</h2>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">{selectedLesson.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="max-h-[calc(90vh-220px)] overflow-y-auto px-6 py-7 sm:px-9">
                    <div className="mb-6 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <p className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-500"}`}>Ringkasan pembelajaran</p>
                    </div>
                    <div className="space-y-5">
                      {selectedLesson.content.map((section, index) => (
                        <article key={section.heading} className={`rounded-2xl border p-5 sm:p-6 ${darkMode ? "border-slate-700 bg-slate-800/70" : "border-slate-200 bg-slate-50/80"}`}>
                          <div className="flex items-start gap-4">
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${darkMode ? "bg-slate-700 text-white" : "bg-slate-900 text-white"}`}>{String(index + 1).padStart(2, "0")}</span>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-base font-extrabold leading-6 sm:text-lg">{section.heading}</h3>
                              <p className={`mt-3 text-sm leading-7 sm:text-base ${darkMode ? "text-slate-300" : "text-slate-600"}`}>{section.text}</p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                    <div className={`mt-6 rounded-2xl p-5 ${darkMode ? "bg-slate-800" : "bg-amber-50"}`}>
                      <p className="font-extrabold">✦ Poin penting</p>
                      <p className={`mt-2 text-sm leading-7 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Terapkan hal yang sudah dipelajari sebelum mengambil tindakan atau membagikan informasi di internet.</p>
                    </div>
                  </div>
                </>
              );
            })()}
          </section>
        </div>
      )}

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
