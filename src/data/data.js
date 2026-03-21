export const ageGroups = [
  {
    id: "1-6",
    emoji: "🌱",
    age: "1–6 yaş",
    label: "Erkən uşaqlıq",
    desc: "Oyun əsaslı öyrənmə, nitq və duyusal inkişaf",
    categories: ["Uşaqlar", "Valideynlər", "Pedaqoqlar", "Psixoloqlar", "Loqopedlər", "EQ"],
  },
  {
    id: "6-10",
    emoji: "🌿",
    age: "6–10 yaş",
    label: "İbtidai dövr",
    desc: "Akademik bacarıqlar, sosial inkişaf və yaradıcılıq",
    categories: ["Uşaqlar", "Valideynlər", "Pedaqoqlar", "Psixoloqlar", "Loqopedlər", "EQ"],
  },
  {
    id: "11-17",
    emoji: "🌳",
    age: "11–17 yaş",
    label: "Yeniyetməlik",
    desc: "Özünüdərk, liderlik, akademik müvəffəqiyyət",
    categories: ["IQ", "EQ", "Valideynlər", "Pedaqoqlar", "Psixoloqlar"],
  },
  {
    id: "18+",
    emoji: "🎓",
    age: "18+ yaş",
    label: "Gənclik",
    desc: "Karyera, özünüidarə və professional inkişaf",
    categories: ["IQ", "EQ", "Psixoloqlar", "Mentorlar"],
  },
];

export const subAgeGroups = {
  "1-6": [
    { id: "1-3", label: "1–3 yaş" },
    { id: "3-6", label: "3–6 yaş" },
  ],
};

// export const yearArticles = {
//   "1-6": {
//     Uşaqlar: {
//       "1-3": {
//         fiziki: [
//           { title: "1–3 yaşda iri motor bacarıqlarının inkişafı", time: "5 dəq", tag: "Motor" },
//           { title: "Gəzməyi öyrənmə mərhələləri", time: "4 dəq", tag: "Hərəkət" },
//           { title: "Əl-göz koordinasiyasını inkişaf etdirən oyunlar", time: "3 dəq", tag: "Koordinasiya" },
//           { title: "Uşaq üçün fiziki fəaliyyət normaları", time: "4 dəq", tag: "Norma" },
//         ],
//         idrak: [
//           { title: "1–3 yaşda dil inkişafı: ilk sözlər", time: "5 dəq", tag: "Dil" },
//           { title: "Cisimlərin daimiliyini anlamaq", time: "4 dəq", tag: "Koqnitiv" },
//           { title: "Səbəb-nəticə əlaqəsini öyrənmə", time: "3 dəq", tag: "Düşüncə" },
//           { title: "Rəng və forma tanıma fəaliyyətləri", time: "4 dəq", tag: "Tanıma" },
//         ],
//         estetik: [
//           { title: "Musiqi ilə erkən yaş inkişafı", time: "4 dəq", tag: "Musiqi" },
//           { title: "Barmaq boyaları ilə yaradıcılıq", time: "3 dəq", tag: "Rəsm" },
//           { title: "Ritmik hərəkətlər və rəqs", time: "3 dəq", tag: "Rəqs" },
//           { title: "Uşaq kitabları ilə estetik zövqün formalaşması", time: "4 dəq", tag: "Kitab" },
//         ],
//         sosial: [
//           { title: "Bağlanma nəzəriyyəsi: 1–3 yaş", time: "6 dəq", tag: "Bağlanma" },
//           { title: "Emosiyaları tanımağa kömək edən üsullar", time: "4 dəq", tag: "Emosiya" },
//           { title: "Paylaşma vərdişinin erkən formalaşması", time: "3 dəq", tag: "Paylaşma" },
//           { title: "Uşaqda güvən hissini necə gücləndirmək", time: "5 dəq", tag: "Güvən" },
//         ],
//       },
//       "3-6": {
//         fiziki: [
//           { title: "3–6 yaşda xırda motor bacarıqları", time: "5 dəq", tag: "Motor" },
//           { title: "Qaçma, tullanma, dırmanma — inkişaf normaları", time: "4 dəq", tag: "Hərəkət" },
//           { title: "Qayçı, karandaş tutma bacarığı", time: "3 dəq", tag: "Əl bacarığı" },
//           { title: "Açıq havada oyunların fiziki faydaları", time: "4 dəq", tag: "Açıq hava" },
//         ],
//         idrak: [
//           { title: "Sayma və rəqəmləri tanıma: 3–6 yaş", time: "4 dəq", tag: "Riyaziyyat" },
//           { title: "Hərfləri tanımağa hazırlıq mərhələləri", time: "5 dəq", tag: "Oxu" },
//           { title: "Müqayisə etmə və sıralamaq bacarığı", time: "3 dəq", tag: "Məntiqi" },
//           { title: "Xəyal gücü ilə problem həll etmə", time: "4 dəq", tag: "Yaradıcılıq" },
//         ],
//         estetik: [
//           { title: "Plastilinin inkişafa faydaları", time: "3 dəq", tag: "Yaradıcılıq" },
//           { title: "Uşaq teatrı və rol oyunları", time: "4 dəq", tag: "Teatr" },
//           { title: "Rəsm çəkməyi sevdirən 5 üsul", time: "3 dəq", tag: "Rəsm" },
//           { title: "Musiqi alətlərini tanıtma fəaliyyətləri", time: "4 dəq", tag: "Musiqi" },
//         ],
//         sosial: [
//           { title: "Uşaq bağçasına adaptasiya — valideyn bələdçisi", time: "6 dəq", tag: "Adaptasiya" },
//           { title: "Dostluq bacarıqlarının formalaşması", time: "4 dəq", tag: "Dostluq" },
//           { title: "Qaydaları anlamaq və qəbul etmək", time: "3 dəq", tag: "Qaydalar" },
//           { title: "Emosional tənzimləmənin əsasları", time: "5 dəq", tag: "Tənzimləmə" },
//         ],
//       },
//     },
//     Valideynlər: [
//       { title: "Erkən yaşda nitq inkişafını necə dəstəkləmək", time: "5 dəq", tag: "Nitq" },
//       { title: "0–3 yaş: ən vacib inkişaf mərhələləri", time: "7 dəq", tag: "İnkişaf" },
//       { title: "Ekran vaxtı — neçə yaşda, nə qədər?", time: "4 dəq", tag: "Sağlamlıq" },
//       { title: "Uşaqda emosional bağlılıq necə formalaşır", time: "6 dəq", tag: "Psixologiya" },
//       { title: "Gecə rutini: sağlam yuxu vərdişləri", time: "4 dəq", tag: "Yuxu" },
//       { title: "Uşaqla necə ünsiyyət qurmaq lazımdır?", time: "5 dəq", tag: "Ünsiyyət" },
//     ],
//     Pedaqoqlar: [
//       { title: "Oyun əsaslı öyrənmə metodikaları", time: "8 dəq", tag: "Metodika" },
//       { title: "1–6 yaş qrupunda sinif idarəetməsi", time: "6 dəq", tag: "Pedaqogika" },
//       { title: "Uşaqların inkişafını müşahidə cədvəli", time: "3 dəq", tag: "Alət" },
//       { title: "Duyusal fəaliyyətlər: praktik fikirlər", time: "5 dəq", tag: "Duyusal" },
//       { title: "Qrup işi: kiçik uşaqlarla necə təşkil etmək", time: "6 dəq", tag: "Qrup" },
//     ],
//     Psixoloqlar: [
//       { title: "Erkən uşaqlıqda emosional inkişaf analizi", time: "10 dəq", tag: "Klinik" },
//       { title: "Davranış problemlərinin erkən diaqnostikası", time: "9 dəq", tag: "Diaqnostika" },
//       { title: "Bağlanma nəzəriyyəsi: praktik tətbiqi", time: "11 dəq", tag: "Nəzəriyyə" },
//       { title: "Oyun terapiyasında istifadə olunan üsullar", time: "8 dəq", tag: "Terapiya" },
//     ],
//     Loqopedlər: [
//       { title: "Artikulyasiya məşqlərinin yaşa uyğun seçimi", time: "7 dəq", tag: "Nitq" },
//       { title: "Gecikmiş nitq inkişafı — ilk addımlar", time: "5 dəq", tag: "Müdaxilə" },
//       { title: "Fonetik inkişaf: 1–3 yaş normaları", time: "6 dəq", tag: "Fonetik" },
//       { title: "Valideynlərə ev tapşırıqları vermə qaydaları", time: "4 dəq", tag: "Ev işi" },
//     ],
//     EQ: [
//       { title: "1–6 yaşda emosional inkişafın əsasları", time: "5 dəq", tag: "Emosional" },
//       { title: "Uşaqda empatiya necə formalaşır?", time: "4 dəq", tag: "Empatiya" },
//       { title: "Emosiyaları tanımaq: uşaqlar üçün oyunlar", time: "3 dəq", tag: "Emosiya" },
//       { title: "Bağlanma və emosional təhlükəsizlik", time: "5 dəq", tag: "Bağlanma" },
//       { title: "Özünütənzimləmə bacarıqlarının erkən inkişafı", time: "4 dəq", tag: "Tənzimləmə" },
//     ],
//   },

//   "6-10": {
//     Uşaqlar: [
//       { title: "Diqqəti gücləndirən əyləncəli oyunlar", time: "4 dəq", tag: "Diqqət" },
//       { title: "Oxumağı sevdirən 5 üsul", time: "3 dəq", tag: "Oxu" },
//       { title: "Riyaziyyatı oyunla öyrənmək mümkündürmü?", time: "4 dəq", tag: "Riyaziyyat" },
//       { title: "Yeni dostlar necə qazanmaq olar?", time: "3 dəq", tag: "Sosial" },
//     ],
//     Valideynlər: [
//       { title: "Məktəb adaptasiyasında valideyn rolu", time: "6 dəq", tag: "Məktəb" },
//       { title: "Evdə oxu vərdişini necə formalaşdırmaq", time: "5 dəq", tag: "Öyrənmə" },
//       { title: "Uşaqda diqqəti gücləndirən fəaliyyətlər", time: "4 dəq", tag: "Diqqət" },
//       { title: "Ev tapşırıqlarında dəstək: nə qədər kömək etmək lazımdır?", time: "5 dəq", tag: "Tapşırıq" },
//       { title: "Uşağınızın güclü tərəflərini necə aşkar etmək", time: "6 dəq", tag: "İstedadlar" },
//     ],
//     Pedaqoqlar: [
//       { title: "İbtidai sinifdə fərdi yanaşma strategiyaları", time: "8 dəq", tag: "Metodika" },
//       { title: "Yaradıcı düşüncəni inkişaf etdirən tapşırıqlar", time: "6 dəq", tag: "Yaradıcılıq" },
//       { title: "Oxu anlayışını yoxlamaq üçün texnikalar", time: "5 dəq", tag: "Oxu" },
//       { title: "Sinif mühitini öyrənməyə uyğun qurmaq", time: "7 dəq", tag: "Mühit" },
//     ],
//     Psixoloqlar: [
//       { title: "6–10 yaşda emosional tənzimləmə bacarıqları", time: "9 dəq", tag: "Emosional" },
//       { title: "Sosial davranış problemlərinin müəyyənləşdirilməsi", time: "7 dəq", tag: "Sosial" },
//       { title: "Narahatlıq pozğunluqları: uşaqlarda əlamətlər", time: "8 dəq", tag: "Narahatlıq" },
//     ],
//     Loqopedlər: [
//       { title: "Oxu çətinlikləri — erkən müdaxilə yolları", time: "6 dəq", tag: "Oxu" },
//       { title: "Diseksiya əlamətləri və müdaxilə strategiyaları", time: "8 dəq", tag: "Diseksiya" },
//       { title: "Nitq sürəti problemləri: kəkələmə ilə iş", time: "7 dəq", tag: "Kəkələmə" },
//     ],
//     EQ: [
//       { title: "6–10 yaşda emosional intellektin inkişafı", time: "5 dəq", tag: "Emosional" },
//       { title: "Dostluq münasibətlərində empatiya", time: "4 dəq", tag: "Empatiya" },
//       { title: "Məktəbdə emosional çətinlikləri idarə etmək", time: "5 dəq", tag: "Məktəb" },
//       { title: "Uşaqda özünəinam və emosional sabitlik", time: "4 dəq", tag: "Özünəinam" },
//       { title: "Qəzəb və kədəri sağlam ifadə etmək", time: "3 dəq", tag: "İfadə" },
//     ],
//   },

//   "11-17": {
//     Valideynlər: [
//       { title: "Yeniyetmə ilə ünsiyyətin sirləri", time: "7 dəq", tag: "Ünsiyyət" },
//       { title: "Münaqişəni böhrana çevirmə — praktik bələdçi", time: "8 dəq", tag: "Münaqişə" },
//       { title: "Yeniyetmənizin rəqəmsal dünyasını anlamaq", time: "6 dəq", tag: "Rəqəmsal" },
//       { title: "Həddindən artıq müdaxilə vs lazımi dəstək", time: "7 dəq", tag: "Balans" },
//     ],
//     Pedaqoqlar: [
//       { title: "Yeniyetmələrdə motivasiyanı artıran üsullar", time: "6 dəq", tag: "Motivasiya" },
//       { title: "Sinif idarəetməsi — 11–17 yaş xüsusiyyətləri", time: "5 dəq", tag: "Sinif" },
//       { title: "Kritik düşüncəni inkişaf etdirən tapşırıqlar", time: "7 dəq", tag: "Kritik" },
//       { title: "Zərərçəkmiş şagirdi necə tanımaq və dəstəkləmək", time: "8 dəq", tag: "Dəstək" },
//     ],
//     Psixoloqlar: [
//       { title: "Yeniyetmə terapiyasında müasir yanaşmalar", time: "11 dəq", tag: "Terapiya" },
//       { title: "Özünəzərər riski: erkən əlamətlər və müdaxilə", time: "9 dəq", tag: "Risk" },
//       { title: "Yeniyetmələrdə depressiya diaqnostikası", time: "10 dəq", tag: "Depressiya" },
//       { title: "Valideyn-yeniyetmə münaqişəsində mediasiya", time: "8 dəq", tag: "Mediasiya" },
//     ],
//     IQ: [
//       { title: "11–17 yaşda idrak inkişafının zirvəsi", time: "7 dəq", tag: "İdrak" },
//       { title: "Abstrakt düşüncəni gücləndirən üsullar", time: "6 dəq", tag: "Abstrakt" },
//       { title: "Akademik uğur üçün koqnitiv strategiyalar", time: "5 dəq", tag: "Akademik" },
//       { title: "Yeniyetmə beyni: neyroloji inkişaf", time: "8 dəq", tag: "Beyin" },
//       { title: "Problem həll etmə: yeniyetmələr üçün üsullar", time: "5 dəq", tag: "Problem" },
//       { title: "Yaradıcı düşüncə və IQ arasındakı əlaqə", time: "6 dəq", tag: "Yaradıcılıq" },
//     ],
//     EQ: [
//       { title: "Yeniyetmələrdə emosional intellektin inkişafı", time: "6 dəq", tag: "Emosional" },
//       { title: "Sosial münasibətlərdə empatiya bacarıqları", time: "5 dəq", tag: "Empatiya" },
//       { title: "Emosional tənzimləmə: yeniyetmələr üçün texnikalar", time: "5 dəq", tag: "Tənzimləmə" },
//       { title: "Özünüdərk və emosional yetkinlik", time: "6 dəq", tag: "Özünüdərk" },
//       { title: "Stress altında emosional balans saxlamaq", time: "4 dəq", tag: "Stress" },
//       { title: "Münaqişəni emosional intellektlə həll etmək", time: "5 dəq", tag: "Münaqişə" },
//     ],
//   },

//   "18+": {
//     IQ: [
//       { title: "Karyera planlaması: analitik düşüncə ilə", time: "7 dəq", tag: "Karyera" },
//       { title: "Kritik düşüncəni gündəlik həyata tətbiq etmək", time: "6 dəq", tag: "Kritik" },
//       { title: "Problem həll etmə: sistematik yanaşma", time: "5 dəq", tag: "Problem" },
//       { title: "Öyrənməyi öyrənmək: metakoqnitiv strategiyalar", time: "7 dəq", tag: "Öyrənmə" },
//       { title: "Akademik yazı və tədqiqat bacarıqları", time: "8 dəq", tag: "Tədqiqat" },
//       { title: "İdrak çevikliyi: adaptasiya bacarıqları", time: "6 dəq", tag: "Adaptasiya" },
//     ],
//     EQ: [
//       { title: "Burnout — tükənmişlik sindromu və çıxış yolları", time: "6 dəq", tag: "Burnout" },
//       { title: "Özünəinam necə formalaşdırılır?", time: "4 dəq", tag: "Özünəinam" },
//       { title: "Liderlik bacarıqlarını inkişaf etdirməyin 7 yolu", time: "5 dəq", tag: "Liderlik" },
//       { title: "Sosial narahatlıq: gənclər üçün praktik üsullar", time: "6 dəq", tag: "Narahatlıq" },
//       { title: "Emosional intellekt: iş həyatında tətbiqi", time: "7 dəq", tag: "EQ" },
//       { title: "Münaqişə idarəetməsi: emosional yanaşma", time: "6 dəq", tag: "Münaqişə" },
//     ],
//     Psixoloq: [
//       { title: "Gənc yetkinlərdə narahatlıq pozğunluqları", time: "10 dəq", tag: "Klinik" },
//       { title: "Stress idarəetməsi: CBT əsaslı müdaxilələr", time: "9 dəq", tag: "CBT" },
//       { title: "Kimlik böhranı: 18–25 yaş psixoloji xüsusiyyətləri", time: "11 dəq", tag: "Kimlik" },
//       { title: "Gəncliklə işdə terapevtik alyans qurmaq", time: "8 dəq", tag: "Terapiya" },
//       { title: "Emosional tənzimləmə: DBT texnikaları", time: "10 dəq", tag: "DBT" },
//     ],
//     Mentor: [
//       { title: "Gənclərə mentorluq — praktik bələdçi", time: "8 dəq", tag: "Mentorluq" },
//       { title: "Universitetdə akademik dəstək strategiyaları", time: "6 dəq", tag: "Akademik" },
//       { title: "Gəncin güclü tərəflərini üzə çıxarmaq", time: "5 dəq", tag: "Güclü tərəf" },
//       { title: "Karyera seçimində mentorluq yanaşması", time: "7 dəq", tag: "Karyera" },
//       { title: "Gənclə emosional bağlılıq qurmaq", time: "6 dəq", tag: "Bağlılıq" },
//     ],
//   },
// };

export const developmentAreas = [
  { id: "fiziki",  label: "Fiziki inkişaf",          emoji: "💪" },
  { id: "idrak",   label: "İdrak inkişafı",           emoji: "🧠" },
  { id: "estetik", label: "Estetik inkişaf",          emoji: "🎨" },
  { id: "sosial",  label: "Sosial-emosional inkişaf", emoji: "❤️" },
];

export const services = [
  { icon: "🧠", title: "Psixoloji dəstək",         desc: "Fərdi və qrup konsultasiyaları" },
  { icon: "🗣",  title: "Nitq inkişafı",            desc: "Loqopedik müdaxilə və məşqlər" },
  { icon: "👨‍🏫", title: "Təlim və seminarlar",      desc: "Pedaqoq və valideyn proqramları" },
  { icon: "📊", title: "İnkişaf qiymətləndirməsi", desc: "Elmi əsaslı diaqnostika" },
  { icon: "📚", title: "Metodik resurslar",         desc: "Vəsait, kart və materiallar" },
  { icon: "🌱", title: "Şəxsi inkişaf",             desc: "Fərdi inkişaf proqramları" },
];

export const specialists = [
  { name: "Dr. Aynur Həsənova", role: "Uşaq psixoloqu",   exp: "12 il", initial: "AH" },
  { name: "Kamran Əliyev",      role: "Loqoped",           exp: "8 il",  initial: "KƏ" },
  { name: "Nigar Məmmədova",    role: "Pedaqoq-metodist",  exp: "15 il", initial: "NM" },
  { name: "Tural Quliyev",      role: "Mentor & Kouç",     exp: "10 il", initial: "TQ" },
];

export const trainings = [
  { icon: "👨‍🏫", title: "Pedaqoq təlimləri",          desc: "Pedaqoji innovasiya və metodika",   tag: "Davam edir" },
  { icon: "👨‍👩‍👧", title: "Valideyn seminarları",        desc: "Uşaq psixologiyası və inkişaf",    tag: "Yeni" },
  { icon: "🌱",  title: "Yeniyetmə inkişaf proqramı", desc: "Şəxsiyyət inkişafı üzrə intensiv",  tag: "Tezliklə" },
  { icon: "🏆",  title: "Gənc liderlər proqramı",     desc: "Liderlik, karyera, özünüidarə",     tag: "Açıq" },
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
  { icon: "🎮", title: "İnkişaf oyunları",  count: "32 oyun" },
  { icon: "🧪", title: "Psixoloji testlər", count: "15 test" },
  { icon: "📄", title: "PDF kitablar",      count: "27 kitab" },
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
  { label: "Akademiya",  href: "/academy" },
  { label: "Təlimlər",   href: "/training" },
  { label: "Resurslar",  href: "/resources" },
  { label: "Mütəxəssislər", href: "/specialists" },
  { label: "Media",      href: "/media" },
];

export const quickAccessItems = [
  { icon: "📚", label: "Resurs Mərkəzi", desc: "PDF, kart, material",    color: "bg-orange-50 border-orange-200" },
  { icon: "🎓", label: "Təlimlər",       desc: "Seminar, kurs, proqram", color: "bg-blue-50 border-blue-200" },
  { icon: "👩‍⚕️", label: "Mütəxəssislər", desc: "Psixoloq, loqoped",     color: "bg-purple-50 border-purple-200" },
  { icon: "🎬", label: "Media",          desc: "Video dərs, seminar",    color: "bg-rose-50 border-rose-200" },
];