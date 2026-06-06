// src/components/AboutSection.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faSeedling,
  faUsers,
  faBookOpen,
  faGlobe,
  faRocket,
  faStar,
  faHeart,
  faLightbulb,
  faHandshake,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../lib/supabase";

const IMAGE_URL =
  "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80";

const MISSION_POINTS = [
  "Uşaqdan gəncə — bütün yaş mərhələlərini əhatə edirik",
  "Psixologiya, pedaqogika və loqopediya — bir platformada",
  "Elmi metodika ilə empatik yanaşmanı birləşdiririk",
  "Valideyn, müəllim və mütəxəssisə eyni dəstəyi veririk",
];

// ── Zaman xətti — tarixi hadisələri öz tarixlərinizlə dəyişin ──────────────
const TIMELINE = [
  {
    year: "2020",
    title: "Əsas ideyasının doğulması",
    desc: "Rövşən İsmayılov uşaq inkişafına elmi yanaşmanın zəruriliyini görərək ilk metodiki materialları hazırladı.",
    icon: faSeedling,
    dotBg: "bg-emerald-400",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
  },
  {
    year: "2021",
    title: "İlk proqramların başlanması",
    desc: "Psixoloq və pedaqoqlardan ibarət komanda ilə uşaq inkişafı üzrə ilk qrup sessiyaları keçirildi.",
    icon: faUsers,
    dotBg: "bg-blue-400",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
  },
  {
    year: "2022",
    title: "Resurs bazasının yaradılması",
    desc: "100+ elmi məqalə, metodiki vəsait və inkişaf materialları ilə onlayn resurs mərkəzi açıldı.",
    icon: faBookOpen,
    dotBg: "bg-amber-400",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
  },
  {
    year: "2023",
    title: "Rəqəmsal platforma",
    desc: "Akademiya tam rəqəmsal formata keçdi — valideyn, müəllim və uşaqlar üçün vahid onlayn ekosistem quruldu.",
    icon: faGlobe,
    dotBg: "bg-violet-400",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
  },
  {
    year: "2024",
    title: "Mütəxəssis şəbəkəsi",
    desc: "Psixoloq, loqoped, pedaqoq və mentorlardan ibarət peşəkar komanda tam formalaşdı.",
    icon: faRocket,
    dotBg: "bg-rose-400",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
  },
  {
    year: "2025",
    title: "Yeni mərhələ",
    desc: "500+ məqalə, genişlənən istifadəçi bazası və yeni yaş qrupları ilə akademiya böyüməyə davam edir.",
    icon: faStar,
    dotBg: "bg-teal-400",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-700",
  },
];

const VALUES = [
  {
    icon: faHeart,
    bg: "bg-rose-50",
    color: "text-rose-500",
    title: "Empatiya",
    desc: "Hər uşağa, valideynə və mütəxəssisə fərdi yanaşırıq. Dinləmək bizim üçün peşədir.",
  },
  {
    icon: faLightbulb,
    bg: "bg-amber-50",
    color: "text-amber-500",
    title: "Elm və innovasiya",
    desc: "Bütün metodikalar müasir psixologiya və pedaqogika elminə əsaslanır, daim yenilənir.",
  },
  {
    icon: faHandshake,
    bg: "bg-blue-50",
    color: "text-blue-500",
    title: "Əməkdaşlıq",
    desc: "Ailə, məktəb və mütəxəssis birlikdə işlədikdə ən güclü nəticə əldə edilir.",
  },
  {
    icon: faShieldHeart,
    bg: "bg-emerald-50",
    color: "text-emerald-500",
    title: "Təhlükəsiz mühit",
    desc: "Hər kəs üçün hörmətli, etibarlı və dəstəkleyici bir məkan yaradırıq.",
  },
];

function useAboutStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: articleCount },
          { count: userCount },
          { count: specialistCount },
        ] = await Promise.all([
          supabase.from("articles").select("*", { count: "exact", head: true }),
          supabase.from("profiles").select("*", { count: "exact", head: true }),
          supabase
            .from("specialists")
            .select("*", { count: "exact", head: true }),
        ]);
        setStats({
          articles: articleCount ?? 0,
          users: userCount ?? 0,
          specialists: specialistCount ?? 0,
        });
      } catch (err) {
        console.error("AboutSection stats xətası:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return { stats, loading };
}

function formatCount(n) {
  if (n === null || n === undefined) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}K+`;
  return String(n);
}

export default function AboutSection() {
  const navigate = useNavigate();
  const { stats, loading } = useAboutStats();

  const STATS = [
    { value: loading ? null : formatCount(stats?.articles), label: "Məqalə" },
    { value: loading ? null : formatCount(stats?.users), label: "İstifadəçi" },
    {
      value: loading ? null : formatCount(stats?.specialists),
      label: "Mütəxəssis",
    },
    { value: "4", label: "Yaş qrupu" },
  ];

  return (
    <section className="py-40 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* ── Başlıq ── */}
        <div className="text-center mb-14">
          <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Akademiya haqqında
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            İnsan inkişafı{" "}
            <span className="text-emerald-500">erkən yaşdan</span> başlayır
          </h2>
        </div>

        {/* ── İki sütun ── */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Sol: şəkil */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/5] w-full">
              <img
                src={IMAGE_URL}
                alt="Uşaqlar öyrənir"
                className="w-full h-full object-cover"
              />
              {/* Üzən stat kart */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center justify-between shadow-lg">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="text-center">
                    {value === null ? (
                      <div className="w-10 h-6 bg-gray-200 rounded animate-pulse mx-auto mb-1" />
                    ) : (
                      <div
                        className="text-2xl font-bold text-emerald-500"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        {value}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 font-medium mt-0.5">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-emerald-100 -z-10" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-amber-100 -z-10" />
          </div>

          {/* Sağ: missiya */}
          <div>
            <h3
              className="text-3xl font-bold text-gray-900 mb-5 leading-snug"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Rövşən İsmayılov adına
              <br />
              <span className="text-emerald-500">İnkişaf Akademiyası</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Uşaqların, valideynlərin, müəllimlərin və gənclərin inkişafını bir
              sistem daxilində birləşdirən yeganə platformayıq. Psixologiya və
              pedaqogika elminin inteqrasiyasına əsaslanan metodikamız hər kəsin
              potensialını açmağa yönəlmişdir.
            </p>
            <ul className="space-y-3 mb-10">
              {MISSION_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-emerald-600 text-[10px]"
                    />
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/academy")}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
              >
                Akademiya haqqında
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xs group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-emerald-400 text-gray-600 hover:text-emerald-600 font-semibold px-7 py-3.5 rounded-2xl transition-all"
              >
                Əlaqə
              </button>
            </div>
          </div>
        </div>

        {/* ── Zaman xətti ── */}
        <div className="mt-28">
          <div className="text-center mb-14">
            <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Tariximiz
            </span>
            <h3
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Akademiyanın inkişaf yolu
            </h3>
          </div>

          {/* Sol xətt + nöqtə + kart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-4 pb-8">
                {/* Xətt + nöqtə sütunu */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-11 h-11 rounded-full ${item.dotBg} flex items-center justify-center shadow-md flex-shrink-0`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-white text-sm"
                    />
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 mt-2" />
                  )}
                </div>

                {/* Kart */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow flex-1 mb-2">
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${item.badgeBg} ${item.badgeText}`}
                  >
                    {item.year}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dəyərlərimiz ── */}
        <div className="mt-14">
          <div className="text-center mb-7">
            <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Dəyərlərimiz
            </span>
            <h3
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Bizi birləşdirən prinsiplər
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon, bg, color, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className={`text-2xl ${color}`}
                  />
                </div>
                <h4
                  className="text-base font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
