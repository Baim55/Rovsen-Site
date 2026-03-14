// data/data.js

export const ageGroups = [
  {
    id: "1-6",
    emoji: "🌱",
    age: "1–6 yaş",
    label: "Erkən uşaqlıq",
    desc: "Oyun əsaslı öyrənmə, nitq və duyusal inkişaf",
    color: "amber",
    bg: "bg-amber-50",
    border: "border-amber-300",
    badge: "bg-amber-400",
    text: "text-amber-700",
    hover: "hover:bg-amber-100",
    ring: "ring-amber-300",
    dot: "bg-amber-400",
    categories: [
      "Uşaqlar üçün",
      "Valideynlər üçün",
      "Müəllimlər üçün",
      "Psixoloqlar üçün",
      "Loqopedlər üçün",
    ],
  },
  {
    id: "6-10",
    emoji: "🌿",
    age: "6–10 yaş",
    label: "İbtidai dövr",
    desc: "Akademik bacarıqlar, sosial inkişaf və yaradıcılıq",
    color: "emerald",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    badge: "bg-emerald-400",
    text: "text-emerald-700",
    hover: "hover:bg-emerald-100",
    ring: "ring-emerald-300",
    dot: "bg-emerald-400",
    categories: [
      "Uşaqlar üçün",
      "Valideynlər üçün",
      "Müəllimlər üçün",
      "Psixoloqlar üçün",
      "Loqopedlər üçün",
    ],
  },
  {
    id: "11-17",
    emoji: "🌳",
    age: "11–17 yaş",
    label: "Yeniyetməlik",
    desc: "Özünüdərk, liderlik, akademik müvəffəqiyyət",
    color: "blue",
    bg: "bg-blue-50",
    border: "border-blue-300",
    badge: "bg-blue-400",
    text: "text-blue-700",
    hover: "hover:bg-blue-100",
    ring: "ring-blue-300",
    dot: "bg-blue-400",
    categories: [
      "Yeniyetmələr üçün",
      "Valideynlər üçün",
      "Müəllimlər üçün",
      "Psixoloqlar üçün",
      "Mentorlar üçün",
    ],
  },
  {
    id: "18-25",
    emoji: "🎓",
    age: "18–25 yaş",
    label: "Gənclik",
    desc: "Karyera, özünüidarə və professional inkişaf",
    color: "violet",
    bg: "bg-violet-50",
    border: "border-violet-300",
    badge: "bg-violet-400",
    text: "text-violet-700",
    hover: "hover:bg-violet-100",
    ring: "ring-violet-300",
    dot: "bg-violet-400",
    categories: [
      "Gənclər üçün",
      "Valideynlər üçün",
      "Müəllim & Mentorlar",
      "Psixoloqlar üçün",
      "Karyera inkişafı",
    ],
  },
];

export const yearArticles = {
  "1-6": {
    "Uşaqlar üçün": [], // boş — AgeGroupPage özü subArticles-dən oxuyur
    "Valideynlər üçün": [
      {
        title: "Erkən yaşda nitq inkişafını necə dəstəkləmək",
        time: "5 dəq",
        tag: "Nitq",
      },
      {
        title: "0–3 yaş: ən vacib inkişaf mərhələləri",
        time: "7 dəq",
        tag: "İnkişaf",
      },
      {
        title: "Ekran vaxtı — neçə yaşda, nə qədər?",
        time: "4 dəq",
        tag: "Sağlamlıq",
      },
      {
        title: "Uşaqda emosional bağlılıq necə formalaşır",
        time: "6 dəq",
        tag: "Psixologiya",
      },
      {
        title: "Gecə rutini: sağlam yuxu vərdişləri",
        time: "4 dəq",
        tag: "Yuxu",
      },
      {
        title: "Uşaqla necə ünsiyyət qurmaq lazımdır?",
        time: "5 dəq",
        tag: "Ünsiyyət",
      },
    ],
    "Müəllimlər üçün": [
      {
        title: "Oyun əsaslı öyrənmə metodikaları",
        time: "8 dəq",
        tag: "Metodika",
      },
      {
        title: "1–6 yaş qrupunda sinif idarəetməsi",
        time: "6 dəq",
        tag: "Pedaqogika",
      },
      {
        title: "Uşaqların inkişafını müşahidə cədvəli",
        time: "3 dəq",
        tag: "Alət",
      },
      {
        title: "Duyusal fəaliyyətlər: praktik fikirlər",
        time: "5 dəq",
        tag: "Duyusal",
      },
      {
        title: "Qrup işi: kiçik uşaqlarla necə təşkil etmək",
        time: "6 dəq",
        tag: "Qrup",
      },
    ],
    "Psixoloqlar üçün": [
      {
        title: "Erkən uşaqlıqda emosional inkişaf analizi",
        time: "10 dəq",
        tag: "Klinik",
      },
      {
        title: "Davranış problemlərinin erkən diaqnostikası",
        time: "9 dəq",
        tag: "Diaqnostika",
      },
      {
        title: "Bağlanma nəzəriyyəsi: praktik tətbiqi",
        time: "11 dəq",
        tag: "Nəzəriyyə",
      },
      {
        title: "Oyun terapiyasında istifadə olunan üsullar",
        time: "8 dəq",
        tag: "Terapiya",
      },
    ],
    "Loqopedlər üçün": [
      {
        title: "Artikulyasiya məşqlərinin yaşa uyğun seçimi",
        time: "7 dəq",
        tag: "Nitq",
      },
      {
        title: "Gecikmiş nitq inkişafı — ilk addımlar",
        time: "5 dəq",
        tag: "Müdaxilə",
      },
      {
        title: "Fonetik inkişaf: 1–3 yaş normaları",
        time: "6 dəq",
        tag: "Fonetik",
      },
      {
        title: "Valideynlərə ev tapşırıqları vermə qaydaları",
        time: "4 dəq",
        tag: "Ev işi",
      },
    ],
  },

  "6-10": {
    "Uşaqlar üçün": [
      {
        title: "Diqqəti gücləndirən əyləncəli oyunlar",
        time: "4 dəq",
        tag: "Diqqət",
      },
      { title: "Oxumağı sevdirən 5 üsul", time: "3 dəq", tag: "Oxu" },
      {
        title: "Riyaziyyatı oyunla öyrənmək mümkündürmü?",
        time: "4 dəq",
        tag: "Riyaziyyat",
      },
      {
        title: "Yeni dostlar necə qazanmaq olar?",
        time: "3 dəq",
        tag: "Sosial",
      },
    ],
    "Valideynlər üçün": [
      {
        title: "Məktəb adaptasiyasında valideyn rolu",
        time: "6 dəq",
        tag: "Məktəb",
      },
      {
        title: "Evdə oxu vərdişini necə formalaşdırmaq",
        time: "5 dəq",
        tag: "Öyrənmə",
      },
      {
        title: "Uşaqda diqqəti gücləndirən fəaliyyətlər",
        time: "4 dəq",
        tag: "Diqqət",
      },
      {
        title: "Ev tapşırıqlarında dəstək: nə qədər kömək etmək lazımdır?",
        time: "5 dəq",
        tag: "Tapşırıq",
      },
      {
        title: "Uşağınızın güclü tərəflərini necə aşkar etmək",
        time: "6 dəq",
        tag: "İstedadlar",
      },
    ],
    "Müəllimlər üçün": [
      {
        title: "İbtidai sinifdə fərdi yanaşma strategiyaları",
        time: "8 dəq",
        tag: "Metodika",
      },
      {
        title: "Yaradıcı düşüncəni inkişaf etdirən tapşırıqlar",
        time: "6 dəq",
        tag: "Yaradıcılıq",
      },
      {
        title: "Oxu anlayışını yoxlamaq üçün texnikalar",
        time: "5 dəq",
        tag: "Oxu",
      },
      {
        title: "Sinif mühitini öyrənməyə uyğun qurmaq",
        time: "7 dəq",
        tag: "Mühit",
      },
    ],
    "Psixoloqlar üçün": [
      {
        title: "6–10 yaşda emosional tənzimləmə bacarıqları",
        time: "9 dəq",
        tag: "Emosional",
      },
      {
        title: "Sosial davranış problemlərinin müəyyənləşdirilməsi",
        time: "7 dəq",
        tag: "Sosial",
      },
      {
        title: "Narahatlıq pozğunluqları: uşaqlarda əlamətlər",
        time: "8 dəq",
        tag: "Narahatlıq",
      },
    ],
    "Loqopedlər üçün": [
      {
        title: "Oxu çətinlikləri — erkən müdaxilə yolları",
        time: "6 dəq",
        tag: "Oxu",
      },
      {
        title: "Diseksiya əlamətləri və müdaxilə strategiyaları",
        time: "8 dəq",
        tag: "Diseksiya",
      },
      {
        title: "Nitq sürəti problemləri: kəkələmə ilə iş",
        time: "7 dəq",
        tag: "Kəkələmə",
      },
    ],
  },

  "11-17": {
    "Yeniyetmələr üçün": [
      {
        title: "Özünü tanıma: kim olduğunu necə kəşf edərsən",
        time: "5 dəq",
        tag: "Özünüdərk",
      },
      {
        title: "İmtahan stresini idarə etməyin 5 yolu",
        time: "4 dəq",
        tag: "Stress",
      },
      {
        title: "Sosial mediada sağlam olmaq mümkündürmü?",
        time: "6 dəq",
        tag: "Media",
      },
      {
        title: "Liderlik bacarıqlarını necə inkişaf etdirmək",
        time: "5 dəq",
        tag: "Liderlik",
      },
      {
        title: "Pis vərdişlərdən necə qurtulmaq olar?",
        time: "4 dəq",
        tag: "Vərdiş",
      },
    ],
    "Valideynlər üçün": [
      {
        title: "Yeniyetmə ilə ünsiyyətin sirləri",
        time: "7 dəq",
        tag: "Ünsiyyət",
      },
      {
        title: "Münaqişəni böhrana çevirmə — praktik bələdçi",
        time: "8 dəq",
        tag: "Münaqişə",
      },
      {
        title: "Yeniyetmənizin rəqəmsal dünyasını anlamaq",
        time: "6 dəq",
        tag: "Rəqəmsal",
      },
      {
        title: "Həddindən artıq müdaxilə vs lazımi dəstək",
        time: "7 dəq",
        tag: "Balans",
      },
    ],
    "Müəllimlər üçün": [
      {
        title: "Yeniyetmələrdə motivasiyanı artıran üsullar",
        time: "6 dəq",
        tag: "Motivasiya",
      },
      {
        title: "Sinif idarəetməsi — 11–17 yaş xüsusiyyətləri",
        time: "5 dəq",
        tag: "Sinif",
      },
      {
        title: "Kritik düşüncəni inkişaf etdirən tapşırıqlar",
        time: "7 dəq",
        tag: "Kritik",
      },
      {
        title: "Zərərçəkmiş şagirdi necə tanımaq və dəstəkləmək",
        time: "8 dəq",
        tag: "Dəstək",
      },
    ],
    "Psixoloqlar üçün": [
      {
        title: "Yeniyetmə terapiyasında müasir yanaşmalar",
        time: "11 dəq",
        tag: "Terapiya",
      },
      {
        title: "Özünəzərər riski: erkən əlamətlər və müdaxilə",
        time: "9 dəq",
        tag: "Risk",
      },
      {
        title: "Yeniyetmələrdə depressiya diaqnostikası",
        time: "10 dəq",
        tag: "Depressiya",
      },
      {
        title: "Valideyn-yeniyetmə münaqişəsinde mediasiya",
        time: "8 dəq",
        tag: "Mediasiya",
      },
    ],
    "Mentorlar üçün": [
      {
        title: "Yeniyetmə ilə ilk görüş: necə etibar qazanmaq",
        time: "6 dəq",
        tag: "Etibar",
      },
      {
        title: "Mentorluq prosesini necə strukturlaşdırmaq",
        time: "7 dəq",
        tag: "Struktur",
      },
      {
        title: "Gəncin potensialını aşkar etmək üçün suallar",
        time: "5 dəq",
        tag: "Potensial",
      },
    ],
  },

  "18-25": {
    "Gənclər üçün": [
      {
        title: "Karyera planlaması: 20-lərdə nədən başlamaq lazımdır",
        time: "7 dəq",
        tag: "Karyera",
      },
      {
        title: "Burnout — tükənmişlik sindromu və çıxış yolları",
        time: "6 dəq",
        tag: "Sağlamlıq",
      },
      {
        title: "Liderlik bacarıqlarını inkişaf etdirməyin 7 yolu",
        time: "5 dəq",
        tag: "Liderlik",
      },
      {
        title: "Pul idarəetməsi: gənc üçün əsas qaydalar",
        time: "5 dəq",
        tag: "Maliyyə",
      },
      {
        title: "Özünəinam necə formalaşdırılır?",
        time: "4 dəq",
        tag: "Özünəinam",
      },
    ],
    "Valideynlər üçün": [
      {
        title: "Böyümüş uşaqla münasibət: yeni balans",
        time: "5 dəq",
        tag: "Ailə",
      },
      {
        title: "Gənci həddindən artıq müdafiə etməyin nəticələri",
        time: "6 dəq",
        tag: "Müstəqillik",
      },
      {
        title: "Karyera seçimində valideyn rolu",
        time: "5 dəq",
        tag: "Karyera",
      },
    ],
    "Müəllim & Mentorlar": [
      {
        title: "Gənclərə mentorluq — praktik bələdçi",
        time: "8 dəq",
        tag: "Mentorluq",
      },
      {
        title: "Universitetdə akademik dəstək strategiyaları",
        time: "6 dəq",
        tag: "Akademik",
      },
      {
        title: "Gəncin güclü tərəflərini üzə çıxarmaq",
        time: "5 dəq",
        tag: "Güclü tərəf",
      },
    ],
    "Psixoloqlar üçün": [
      {
        title: "Gənc yetkinlərdə narahatlıq pozğunluqları",
        time: "10 dəq",
        tag: "Klinik",
      },
      {
        title: "Stress idarəetməsi: CBT əsaslı müdaxilələr",
        time: "9 dəq",
        tag: "CBT",
      },
      {
        title: "Kimlik böhranı: 18–25 yaş psixoloji xüsusiyyətləri",
        time: "11 dəq",
        tag: "Kimlik",
      },
      {
        title: "Gəncliklə işdə terapevtik alyans qurmaq",
        time: "8 dəq",
        tag: "Terapiya",
      },
    ],
    "Karyera inkişafı": [
      {
        title: "CV yazmağın düzgün yolu — 2025 bələdçisi",
        time: "6 dəq",
        tag: "CV",
      },
      {
        title: "İş müsahibəsindən keçmənin sirləri",
        time: "5 dəq",
        tag: "Müsahibə",
      },
      {
        title: "LinkedIn profili necə gücləndirilir?",
        time: "4 dəq",
        tag: "LinkedIn",
      },
      {
        title: "Freelance vs tam ştat: hansını seçmək lazımdır?",
        time: "6 dəq",
        tag: "Freelance",
      },
    ],
  },
};

export const subAgeGroups = {
  "1-6": [
    { id: "1-3", label: "1–3 yaş" },
    { id: "3-6", label: "3–6 yaş" },
  ],
};

export const developmentAreas = [
  { id: "fiziki", label: "Fiziki inkişaf", emoji: "💪" },
  { id: "idrak", label: "İdrak inkişafı", emoji: "🧠" },
  { id: "estetik", label: "Estetik inkişaf", emoji: "🎨" },
  { id: "sosial", label: "Sosial-emosional inkişaf", emoji: "❤️" },
];

export const subArticles = {
  "1-6": {
    "1-3": {
      fiziki: [
        {
          title: "1–3 yaşda iri motor bacarıqlarının inkişafı",
          time: "5 dəq",
          tag: "Motor",
        },
        { title: "Gəzməyi öyrənmə mərhələləri", time: "4 dəq", tag: "Hərəkət" },
        {
          title: "Əl-göz koordinasiyasını inkişaf etdirən oyunlar",
          time: "3 dəq",
          tag: "Koordinasiya",
        },
        {
          title: "Uşaq üçün fiziki fəaliyyət normaları",
          time: "4 dəq",
          tag: "Norma",
        },
      ],
      idrak: [
        {
          title: "1–3 yaşda dil inkişafı: ilk sözlər",
          time: "5 dəq",
          tag: "Dil",
        },
        {
          title: "Cisimlərin daimiliyini anlamaq",
          time: "4 dəq",
          tag: "Koqnitiv",
        },
        {
          title: "Səbəb-nəticə əlaqəsini öyrənmə",
          time: "3 dəq",
          tag: "Düşüncə",
        },
        {
          title: "Rəng və forma tanıma fəaliyyətləri",
          time: "4 dəq",
          tag: "Tanıma",
        },
      ],
      estetik: [
        {
          title: "Musiqi ilə erkən yaş inkişafı",
          time: "4 dəq",
          tag: "Musiqi",
        },
        {
          title: "Barmaq boyaları ilə yaradıcılıq",
          time: "3 dəq",
          tag: "Rəsm",
        },
        { title: "Ritmik hərəkətlər və rəqs", time: "3 dəq", tag: "Rəqs" },
        {
          title: "Uşaq kitabları ilə estetik zövqün formalaşması",
          time: "4 dəq",
          tag: "Kitab",
        },
      ],
      sosial: [
        {
          title: "Bağlanma nəzəriyyəsi: 1–3 yaş",
          time: "6 dəq",
          tag: "Bağlanma",
        },
        {
          title: "Emosiyaları tanımağa kömək edən üsullar",
          time: "4 dəq",
          tag: "Emosiya",
        },
        {
          title: "Paylaşma vərdişinin erkən formalaşması",
          time: "3 dəq",
          tag: "Paylaşma",
        },
        {
          title: "Uşaqda güvən hissini necə gücləndirmək",
          time: "5 dəq",
          tag: "Güvən",
        },
      ],
    },
    "3-6": {
      fiziki: [
        {
          title: "3–6 yaşda xırda motor bacarıqları",
          time: "5 dəq",
          tag: "Motor",
        },
        {
          title: "Qaçma, tullanma, dırmanma — inkişaf normaları",
          time: "4 dəq",
          tag: "Hərəkət",
        },
        {
          title: "Qayçı, karandaş tutma bacarığı",
          time: "3 dəq",
          tag: "Əl bacarığı",
        },
        {
          title: "Açıq havada oyunların fiziki faydaları",
          time: "4 dəq",
          tag: "Açıq hava",
        },
      ],
      idrak: [
        {
          title: "Sayma və rəqəmləri tanıma: 3–6 yaş",
          time: "4 dəq",
          tag: "Riyaziyyat",
        },
        {
          title: "Hərfləri tanımağa hazırlıq mərhələləri",
          time: "5 dəq",
          tag: "Oxu",
        },
        {
          title: "Müqayisə etmə və sıralamaq bacarığı",
          time: "3 dəq",
          tag: "Məntiqi",
        },
        {
          title: "Xəyal gücü ilə problem həll etmə",
          time: "4 dəq",
          tag: "Yaradıcılıq",
        },
      ],
      estetik: [
        {
          title: "Plastilinin inkişafa faydaları",
          time: "3 dəq",
          tag: "Yaradıcılıq",
        },
        { title: "Uşaq teatrı və rol oyunları", time: "4 dəq", tag: "Teatr" },
        { title: "Rəsm çəkməyi sevdirən 5 üsul", time: "3 dəq", tag: "Rəsm" },
        {
          title: "Musiqi alətlərini tanıtma fəaliyyətləri",
          time: "4 dəq",
          tag: "Musiqi",
        },
      ],
      sosial: [
        {
          title: "Uşaq bağçasına adaptasiya — valideyn bələdçisi",
          time: "6 dəq",
          tag: "Adaptasiya",
        },
        {
          title: "Dostluq bacarıqlarının formalaşması",
          time: "4 dəq",
          tag: "Dostluq",
        },
        {
          title: "Qaydaları anlamaq və qəbul etmək",
          time: "3 dəq",
          tag: "Qaydalar",
        },
        {
          title: "Emosional tənzimləmənin əsasları",
          time: "5 dəq",
          tag: "Tənzimləmə",
        },
      ],
    },
  },
};

export const services = [
  {
    icon: "🧠",
    title: "Psixoloji dəstək",
    desc: "Fərdi və qrup konsultasiyaları",
  },
  { icon: "🗣", title: "Nitq inkişafı", desc: "Loqopedik müdaxilə və məşqlər" },
  {
    icon: "👨‍🏫",
    title: "Təlim və seminarlar",
    desc: "Müəllim və valideyn proqramları",
  },
  {
    icon: "📊",
    title: "İnkişaf qiymətləndirməsi",
    desc: "Elmi əsaslı diaqnostika",
  },
  {
    icon: "📚",
    title: "Metodik resurslar",
    desc: "Vəsait, kart və materiallar",
  },
  { icon: "🌱", title: "Şəxsi inkişaf", desc: "Fərdi inkişaf proqramları" },
];

export const specialists = [
  {
    name: "Dr. Aynur Həsənova",
    role: "Uşaq psixoloqu",
    exp: "12 il",
    initial: "AH",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Kamran Əliyev",
    role: "Loqoped",
    exp: "8 il",
    initial: "KƏ",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Nigar Məmmədova",
    role: "Pedaqoq-metodist",
    exp: "15 il",
    initial: "NM",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Tural Quliyev",
    role: "Mentor & Kouç",
    exp: "10 il",
    initial: "TQ",
    color: "bg-violet-100 text-violet-700",
  },
];

export const trainings = [
  {
    icon: "👨‍🏫",
    title: "Müəllim təlimləri",
    desc: "Pedaqoji innovasiya və metodika",
    tag: "Davam edir",
    tagCls: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Valideyn seminarları",
    desc: "Uşaq psixologiyası və inkişaf",
    tag: "Yeni",
    tagCls: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🌱",
    title: "Yeniyetmə inkişaf proqramı",
    desc: "Şəxsiyyət inkişafı üzrə intensiv",
    tag: "Tezliklə",
    tagCls: "bg-amber-100 text-amber-700",
  },
  {
    icon: "🏆",
    title: "Gənc liderlər proqramı",
    desc: "Liderlik, karyera, özünüidarə",
    tag: "Açıq",
    tagCls: "bg-violet-100 text-violet-700",
  },
];

export const articles = [
  {
    cat: "Psixologiya",
    title: "Uşaqlarda emosional inkişaf necə dəstəklənir?",
    desc: "Erkən yaşdan emosional zəkanın inkişafı üçün praktiki tövsiyələr.",
    time: "5 dəq",
  },
  {
    cat: "Loqopediya",
    title: "Nitq inkişafını evdə necə dəstəkləmək olar",
    desc: "Valideynlər üçün sadə və effektiv nitq oyunları və məşqlər.",
    time: "4 dəq",
  },
  {
    cat: "Yeniyetmə",
    title: "Yeniyetmələrdə motivasiya problemi və həlli",
    desc: "Müasir yeniyetmə psixologiyasına əsaslanan yanaşmalar.",
    time: "6 dəq",
  },
];

export const resources = [
  { icon: "📋", title: "Metodik vəsaitlər", count: "48 material" },
  { icon: "🎮", title: "İnkişaf oyunları", count: "32 oyun" },
  { icon: "🧪", title: "Psixoloji testlər", count: "15 test" },
  { icon: "📄", title: "PDF kitablar", count: "27 kitab" },
];

export const testimonials = [
  {
    name: "Leyla X.",
    role: "Valideyn",
    text: "Uşağımın nitq problemləri üçün loqoped tövsiyəsi aldım. 3 ayda inanılmaz irəliləyiş var!",
    initial: "L",
  },
  {
    name: "Rəna M.",
    role: "Müəllim",
    text: "Müəllim təlimi proqramı metodikama yeni baxış qazandırdı. Tövsiyə edirəm.",
    initial: "R",
  },
  {
    name: "Orxan B.",
    role: "Valideyn",
    text: "İnkişaf qiymətləndirməsi sayəsində uşağımın güclü tərəflərini anladım.",
    initial: "O",
  },
];

export const navLinks = [
  { label: "Ana səhifə", href: "/" },
  { label: "Akademiya", href: "/academy" },
  { label: "Təlimlər", href: "/training" },
  { label: "Resurslar", href: "/resources" },
  { label: "Mütəxəssislər", href: "/specialists" },
  { label: "Media", href: "/media" },
];

export const quickAccessItems = [
  {
    icon: "📚",
    label: "Resurs Mərkəzi",
    desc: "PDF, kart, material",
    color: "bg-orange-50 border-orange-200",
  },
  {
    icon: "🎓",
    label: "Təlimlər",
    desc: "Seminar, kurs, proqram",
    color: "bg-blue-50 border-blue-200",
  },
  {
    icon: "👩‍⚕️",
    label: "Mütəxəssislər",
    desc: "Psixoloq, loqoped",
    color: "bg-purple-50 border-purple-200",
  },
  {
    icon: "🎬",
    label: "Media",
    desc: "Video dərs, seminar",
    color: "bg-rose-50 border-rose-200",
  },
];
