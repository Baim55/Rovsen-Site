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