export const ageGroups = [
  {
    id: "1-6",
    emoji: "🌱",
    age: "1–6 yaş",
    label: "Erkən uşaqlıq",
    desc: "Oyun əsaslı öyrənmə, nitq və duyusal inkişaf",
    bg: "bg-amber-50",
    border: "border-amber-300",
    badge: "bg-amber-400",
    text: "text-amber-700",
    dot: "bg-amber-400",
    categories: ["Uşaqlar", "Valideynlər", "Pedaqoqlar", "Psixoloqlar", "Loqopedlər", "IQ"],
  },
  {
    id: "6-10",
    emoji: "🌿",
    age: "6–10 yaş",
    label: "İbtidai dövr",
    desc: "Akademik bacarıqlar, sosial inkişaf və yaradıcılıq",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    badge: "bg-emerald-400",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
    categories: ["Uşaqlar", "Valideynlər", "Pedaqoqlar", "Psixoloqlar", "Loqopedlər", "IQ"],
  },
  {
    id: "11-17",
    emoji: "🌳",
    age: "11–17 yaş",
    label: "Yeniyetməlik",
    desc: "Özünüdərk, liderlik, akademik müvəffəqiyyət",
    bg: "bg-blue-50",
    border: "border-blue-300",
    badge: "bg-blue-400",
    text: "text-blue-700",
    dot: "bg-blue-400",
    categories: ["Yeniyetmələr", "Valideynlər", "Pedaqoqlar", "Psixoloqlar",  "IQ"],
  },
  {
    id: "18-25",
    emoji: "🎓",
    age: "18–25 yaş",
    label: "Gənclik",
    desc: "Karyera, özünüidarə və professional inkişaf",
    bg: "bg-violet-50",
    border: "border-violet-300",
    badge: "bg-violet-400",
    text: "text-violet-700",
    dot: "bg-violet-400",
    categories: ["IQ", "EQ", "Psixoloq", "Mentor"],
  },
];

export const subAgeGroups = {
  "1-6": [
    { id: "1-3", label: "1–3 yaş" },
    { id: "3-6", label: "3–6 yaş" },
  ],
};

export const yearArticles = {
  "1-6": {
     Uşaqlar: {   
      "1-3": [
        { title: "Zərif əl hərəkətlərini inkişaf etdirən oyunlar", time: "3 dəq", tag: "Motor" },
        { title: "İlk sözlər: danışmağı stimullaşdırmaq", time: "3 dəq", tag: "Nitq" },
        { title: "Obyektləri tanıma: forma və rəng oyunları", time: "2 dəq", tag: "İdrak" },
        { title: "1–3 yaşda emosiyaları tanımaq", time: "3 dəq", tag: "Emosiya" },
      ],
      "3-6": [
        { title: "Hərfləri tanımağa hazırlıq oyunları", time: "3 dəq", tag: "Oxu" },
        { title: "Sayma və rəqəmləri öyrənmə fəaliyyətləri", time: "3 dəq", tag: "Riyaziyyat" },
        { title: "Rol oyunları ilə sosial bacarıqlar", time: "4 dəq", tag: "Sosial" },
        { title: "3–6 yaşda yaradıcılığı inkişaf etdirmək", time: "3 dəq", tag: "Yaradıcılıq" },
      ],
    },
    Valideynlər: [
      { title: "Erkən yaşda nitq inkişafını necə dəstəkləmək", time: "5 dəq", tag: "Nitq" },
      { title: "0–3 yaş: ən vacib inkişaf mərhələləri", time: "7 dəq", tag: "İnkişaf" },
      { title: "Ekran vaxtı — neçə yaşda, nə qədər?", time: "4 dəq", tag: "Sağlamlıq" },
      { title: "Uşaqda emosional bağlılıq necə formalaşır", time: "6 dəq", tag: "Psixologiya" },
      { title: "Gecə rutini: sağlam yuxu vərdişləri", time: "4 dəq", tag: "Yuxu" },
      { title: "Uşaqla necə ünsiyyət qurmaq lazımdır?", time: "5 dəq", tag: "Ünsiyyət" },
    ],
    Pedaqoqlar: [
      { title: "Oyun əsaslı öyrənmə metodikaları", time: "8 dəq", tag: "Metodika" },
      { title: "1–6 yaş qrupunda sinif idarəetməsi", time: "6 dəq", tag: "Pedaqogika" },
      { title: "Uşaqların inkişafını müşahidə cədvəli", time: "3 dəq", tag: "Alət" },
      { title: "Duyusal fəaliyyətlər: praktik fikirlər", time: "5 dəq", tag: "Duyusal" },
      { title: "Qrup işi: kiçik uşaqlarla necə təşkil etmək", time: "6 dəq", tag: "Qrup" },
    ],
    Psixoloqlar: [
      { title: "Erkən uşaqlıqda emosional inkişaf analizi", time: "10 dəq", tag: "Klinik" },
      { title: "Davranış problemlərinin erkən diaqnostikası", time: "9 dəq", tag: "Diaqnostika" },
      { title: "Bağlanma nəzəriyyəsi: praktik tətbiqi", time: "11 dəq", tag: "Nəzəriyyə" },
      { title: "Oyun terapiyasında istifadə olunan üsullar", time: "8 dəq", tag: "Terapiya" },
    ],
    Loqopedlər: [
      { title: "Artikulyasiya məşqlərinin yaşa uyğun seçimi", time: "7 dəq", tag: "Nitq" },
      { title: "Gecikmiş nitq inkişafı — ilk addımlar", time: "5 dəq", tag: "Müdaxilə" },
      { title: "Fonetik inkişaf: 1–3 yaş normaları", time: "6 dəq", tag: "Fonetik" },
      { title: "Valideynlərə ev tapşırıqları vermə qaydaları", time: "4 dəq", tag: "Ev işi" },
    ],
    IQ: [
      { title: "1–6 yaşda idrak inkişafının əsasları", time: "6 dəq", tag: "İdrak" },
      { title: "Rəng, forma, ölçü — koqnitiv oyunlar", time: "4 dəq", tag: "Koqnitiv" },
      { title: "Diqqət və yaddaşı gücləndirən fəaliyyətlər", time: "5 dəq", tag: "Diqqət" },
      { title: "Səbəb-nəticə əlaqəsini öyrənmə üsulları", time: "4 dəq", tag: "Məntiqi" },
      { title: "Erkən yaşda problem həll etmə bacarığı", time: "5 dəq", tag: "Problem" },
      { title: "IQ inkişafına kömək edən oyuncaqlar", time: "3 dəq", tag: "Oyuncaq" },
    ],
  },

  "6-10": {
    Uşaqlar: [
      { title: "Diqqəti gücləndirən əyləncəli oyunlar", time: "4 dəq", tag: "Diqqət" },
      { title: "Oxumağı sevdirən 5 üsul", time: "3 dəq", tag: "Oxu" },
      { title: "Riyaziyyatı oyunla öyrənmək mümkündürmü?", time: "4 dəq", tag: "Riyaziyyat" },
      { title: "Yeni dostlar necə qazanmaq olar?", time: "3 dəq", tag: "Sosial" },
    ],
    Valideynlər: [
      { title: "Məktəb adaptasiyasında valideyn rolu", time: "6 dəq", tag: "Məktəb" },
      { title: "Evdə oxu vərdişini necə formalaşdırmaq", time: "5 dəq", tag: "Öyrənmə" },
      { title: "Uşaqda diqqəti gücləndirən fəaliyyətlər", time: "4 dəq", tag: "Diqqət" },
      { title: "Ev tapşırıqlarında dəstək: nə qədər kömək etmək lazımdır?", time: "5 dəq", tag: "Tapşırıq" },
      { title: "Uşağınızın güclü tərəflərini necə aşkar etmək", time: "6 dəq", tag: "İstedadlar" },
    ],
    Pedaqoqlar: [
      { title: "İbtidai sinifdə fərdi yanaşma strategiyaları", time: "8 dəq", tag: "Metodika" },
      { title: "Yaradıcı düşüncəni inkişaf etdirən tapşırıqlar", time: "6 dəq", tag: "Yaradıcılıq" },
      { title: "Oxu anlayışını yoxlamaq üçün texnikalar", time: "5 dəq", tag: "Oxu" },
      { title: "Sinif mühitini öyrənməyə uyğun qurmaq", time: "7 dəq", tag: "Mühit" },
    ],
    Psixoloqlar: [
      { title: "6–10 yaşda emosional tənzimləmə bacarıqları", time: "9 dəq", tag: "Emosional" },
      { title: "Sosial davranış problemlərinin müəyyənləşdirilməsi", time: "7 dəq", tag: "Sosial" },
      { title: "Narahatlıq pozğunluqları: uşaqlarda əlamətlər", time: "8 dəq", tag: "Narahatlıq" },
    ],
    Loqopedlər: [
      { title: "Oxu çətinlikləri — erkən müdaxilə yolları", time: "6 dəq", tag: "Oxu" },
      { title: "Diseksiya əlamətləri və müdaxilə strategiyaları", time: "8 dəq", tag: "Diseksiya" },
      { title: "Nitq sürəti problemləri: kəkələmə ilə iş", time: "7 dəq", tag: "Kəkələmə" },
    ],
    IQ: [
      { title: "6–10 yaşda idrak inkişafının əsas mərhələləri", time: "6 dəq", tag: "İdrak" },
      { title: "Analitik düşüncəni inkişaf etdirən oyunlar", time: "5 dəq", tag: "Analitik" },
      { title: "Riyazi məntiqi gücləndirən fəaliyyətlər", time: "4 dəq", tag: "Riyaziyyat" },
      { title: "Yaddaş texnikaları: uşaqlar üçün", time: "4 dəq", tag: "Yaddaş" },
      { title: "Oxu anlayışı və koqnitiv inkişaf əlaqəsi", time: "5 dəq", tag: "Oxu" },
      { title: "IQ testləri: nə vaxt və necə?", time: "6 dəq", tag: "Test" },
    ],
  },

  "11-17": {
    Yeniyetmələr: [
      { title: "Özünü tanıma: kim olduğunu necə kəşf edərsən", time: "5 dəq", tag: "Özünüdərk" },
      { title: "İmtahan stresini idarə etməyin 5 yolu", time: "4 dəq", tag: "Stress" },
      { title: "Sosial mediada sağlam olmaq mümkündürmü?", time: "6 dəq", tag: "Media" },
      { title: "Liderlik bacarıqlarını necə inkişaf etdirmək", time: "5 dəq", tag: "Liderlik" },
      { title: "Pis vərdişlərdən necə qurtulmaq olar?", time: "4 dəq", tag: "Vərdiş" },
    ],
    Valideynlər: [
      { title: "Yeniyetmə ilə ünsiyyətin sirləri", time: "7 dəq", tag: "Ünsiyyət" },
      { title: "Münaqişəni böhrana çevirmə — praktik bələdçi", time: "8 dəq", tag: "Münaqişə" },
      { title: "Yeniyetmənizin rəqəmsal dünyasını anlamaq", time: "6 dəq", tag: "Rəqəmsal" },
      { title: "Həddindən artıq müdaxilə vs lazımi dəstək", time: "7 dəq", tag: "Balans" },
    ],
    Pedaqoqlar: [
      { title: "Yeniyetmələrdə motivasiyanı artıran üsullar", time: "6 dəq", tag: "Motivasiya" },
      { title: "Sinif idarəetməsi — 11–17 yaş xüsusiyyətləri", time: "5 dəq", tag: "Sinif" },
      { title: "Kritik düşüncəni inkişaf etdirən tapşırıqlar", time: "7 dəq", tag: "Kritik" },
      { title: "Zərərçəkmiş şagirdi necə tanımaq və dəstəkləmək", time: "8 dəq", tag: "Dəstək" },
    ],
    Psixoloqlar: [
      { title: "Yeniyetmə terapiyasında müasir yanaşmalar", time: "11 dəq", tag: "Terapiya" },
      { title: "Özünəzərər riski: erkən əlamətlər və müdaxilə", time: "9 dəq", tag: "Risk" },
      { title: "Yeniyetmələrdə depressiya diaqnostikası", time: "10 dəq", tag: "Depressiya" },
      { title: "Valideyn-yeniyetmə münaqişəsində mediasiya", time: "8 dəq", tag: "Mediasiya" },
    ],
    IQ: [
      { title: "11–17 yaşda idrak inkişafının zirvəsi", time: "7 dəq", tag: "İdrak" },
      { title: "Abstrakt düşüncəni gücləndirən üsullar", time: "6 dəq", tag: "Abstrakt" },
      { title: "Akademik uğur üçün koqnitiv strategiyalar", time: "5 dəq", tag: "Akademik" },
      { title: "Yeniyetmə beyi: neyroloji inkişaf", time: "8 dəq", tag: "Beyin" },
      { title: "Problem həll etmə: yeniyetmələr üçün üsullar", time: "5 dəq", tag: "Problem" },
      { title: "Yaradıcı düşüncə və IQ arasındakı əlaqə", time: "6 dəq", tag: "Yaradıcılıq" },
    ],
  },

  "18-25": {
    IQ: [
      { title: "Karyera planlaması: analitik düşüncə ilə", time: "7 dəq", tag: "Karyera" },
      { title: "Kritik düşüncəni gündəlik həyata tətbiq etmək", time: "6 dəq", tag: "Kritik" },
      { title: "Problem həll etmə: sistematik yanaşma", time: "5 dəq", tag: "Problem" },
      { title: "Öyrənməyi öyrənmək: metakoqnitiv strategiyalar", time: "7 dəq", tag: "Öyrənmə" },
      { title: "Akademik yazı və tədqiqat bacarıqları", time: "8 dəq", tag: "Tədqiqat" },
      { title: "İdrak çevikliyi: adaptasiya bacarıqları", time: "6 dəq", tag: "Adaptasiya" },
    ],
    EQ: [
      { title: "Burnout — tükənmişlik sindromu və çıxış yolları", time: "6 dəq", tag: "Burnout" },
      { title: "Özünəinam necə formalaşdırılır?", time: "4 dəq", tag: "Özünəinam" },
      { title: "Liderlik bacarıqlarını inkişaf etdirməyin 7 yolu", time: "5 dəq", tag: "Liderlik" },
      { title: "Sosial narahatlıq: gənclər üçün praktik üsullar", time: "6 dəq", tag: "Narahatlıq" },
      { title: "Emosional intellekt: iş həyatında tətbiqi", time: "7 dəq", tag: "EQ" },
      { title: "Münaqişə idarəetməsi: emosional yanaşma", time: "6 dəq", tag: "Münaqişə" },
    ],
    Psixoloq: [
      { title: "Gənc yetkinlərdə narahatlıq pozğunluqları", time: "10 dəq", tag: "Klinik" },
      { title: "Stress idarəetməsi: CBT əsaslı müdaxilələr", time: "9 dəq", tag: "CBT" },
      { title: "Kimlik böhranı: 18–25 yaş psixoloji xüsusiyyətləri", time: "11 dəq", tag: "Kimlik" },
      { title: "Gəncliklə işdə terapevtik alyans qurmaq", time: "8 dəq", tag: "Terapiya" },
      { title: "Emosional tənzimləmə: DBT texnikaları", time: "10 dəq", tag: "DBT" },
    ],
    Mentor: [
      { title: "Gənclərə mentorluq — praktik bələdçi", time: "8 dəq", tag: "Mentorluq" },
      { title: "Universitetdə akademik dəstək strategiyaları", time: "6 dəq", tag: "Akademik" },
      { title: "Gəncin güclü tərəflərini üzə çıxarmaq", time: "5 dəq", tag: "Güclü tərəf" },
      { title: "Karyera seçimində mentorluq yanaşması", time: "7 dəq", tag: "Karyera" },
      { title: "Gənclə emosional bağlılıq qurmaq", time: "6 dəq", tag: "Bağlılıq" },
    ],
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
    desc: "Pedaqoq və valideyn proqramları",
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
    title: "Pedaqoq təlimləri",
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
    role: "Pedaqoqlar",
    text: "Pedaqoq təlimi proqramı metodikama yeni baxış qazandırdı. Tövsiyə edirəm.",
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
