// src/components/ServicesSection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faComments,
  faChalkboardTeacher,
  faChartBar,
  faBook,
  faSeedling,
  faArrowRight,
  faCircleCheck,
  faChild,
  faUsers,
  faGraduationCap,
  faFlask,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

// ── Hədəf auditoriya tabları ────────────────────────────────────────────────
const AUDIENCES = [
  {
    key: "usaqlar",
    label: "Uşaqlar",
    icon: faChild,
    color: "text-amber-500",
    badge: "bg-amber-100 text-amber-700",
    activeBg: "bg-amber-500",
    activeText: "text-white",
    border: "border-amber-400",
  },
  {
    key: "yeniyetmeler",
    label: "Yeniyetmələr",
    icon: faSeedling,
    color: "text-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    activeBg: "bg-emerald-500",
    activeText: "text-white",
    border: "border-emerald-400",
  },
  {
    key: "valideynler",
    label: "Valideynlər",
    icon: faUsers,
    color: "text-blue-500",
    badge: "bg-blue-100 text-blue-700",
    activeBg: "bg-blue-500",
    activeText: "text-white",
    border: "border-blue-400",
  },
  {
    key: "muellimler",
    label: "Müəllimlər",
    icon: faChalkboardTeacher,
    color: "text-violet-500",
    badge: "bg-violet-100 text-violet-700",
    activeBg: "bg-violet-500",
    activeText: "text-white",
    border: "border-violet-400",
  },
  {
    key: "akademik",
    label: "Akademik",
    icon: faFlask,
    color: "text-teal-500",
    badge: "bg-teal-100 text-teal-700",
    activeBg: "bg-teal-500",
    activeText: "text-white",
    border: "border-teal-400",
  },
];

// ── Auditoriyaya görə xidmətlər ─────────────────────────────────────────────
const AUDIENCE_SERVICES = {
  usaqlar: [
    {
      icon: faBrain,
      bg: "bg-purple-50",
      color: "text-purple-500",
      activeBorder: "border-purple-400",
      activeBg: "bg-purple-50/60",
      hover: "hover:border-purple-300",
      title: "Duyusal və emosional inkişaf",
      desc: "Hissi bütünləmə, diqqət və özünüidarə",
      items: [
        "Duyusal bütünləmə məşğələləri",
        "Emosional inkişaf sessiyaları",
        "Diqqət və özünüidarə bacarıqları",
        "Sosial adaptasiya dəstəyi",
        "İmpuls nəzarəti proqramları",
      ],
    },
    {
      icon: faGraduationCap,
      bg: "bg-amber-50",
      color: "text-amber-500",
      activeBorder: "border-amber-400",
      activeBg: "bg-amber-50/60",
      hover: "hover:border-amber-300",
      title: "Məktəbə hazırlıq",
      desc: "Erkən müdaxilə və akademik hazırlıq",
      items: [
        "Məktəbə hazırlıq proqramları",
        "Erkən müdaxilə və inkişaf",
        "Sensor inkişaf məşğələləri",
        "Oxu-yazı ilkin bacarıqları",
        "Riyazi düşüncənin formalaşması",
      ],
    },
    {
      icon: faSeedling,
      bg: "bg-emerald-50",
      color: "text-emerald-500",
      activeBorder: "border-emerald-400",
      activeBg: "bg-emerald-50/60",
      hover: "hover:border-emerald-300",
      title: "Yaradıcılıq və hərəkət",
      desc: "Sənət, rəqs və motor inkişafı",
      items: [
        "Təsviri fəaliyyət dərsləri",
        "Rəqs və hərəkət inkişafı",
        "Musiqi ilə emosional inkişaf",
        "Motor bacarıqların gücləndirilməsi",
        "Oyun əsaslı öyrənmə metodları",
      ],
    },
  ],

  yeniyetmeler: [
    {
      icon: faBrain,
      bg: "bg-blue-50",
      color: "text-blue-500",
      activeBorder: "border-blue-400",
      activeBg: "bg-blue-50/60",
      hover: "hover:border-blue-300",
      title: "Liderlik və şəxsiyyət",
      desc: "Özünüdərk, liderlik bacarıqları",
      items: [
        "Liderlik və şəxsiyyət inkişafı",
        "Emosional zəka proqramları",
        "Stress və impuls idarəetməsi",
        "Özünəinam və özünüifadə",
        "Konfliktsiz ünsiyyət bacarıqları",
      ],
    },
    {
      icon: faGraduationCap,
      bg: "bg-violet-50",
      color: "text-violet-500",
      activeBorder: "border-violet-400",
      activeBg: "bg-violet-50/60",
      hover: "hover:border-violet-300",
      title: "Karyera və gələcək",
      desc: "Peşə yönümü və həyat bacarıqları",
      items: [
        "Peşə yönümü məsləhəti",
        "Karyera planlaşdırılması",
        "Həyat bacarıqları təlimləri",
        "Rəqəmsal mühitdə təhlükəsiz davranış",
        "Akademik uğur strategiyaları",
      ],
    },
  ],

  valideynler: [
    {
      icon: faUsers,
      bg: "bg-rose-50",
      color: "text-rose-500",
      activeBorder: "border-rose-400",
      activeBg: "bg-rose-50/60",
      hover: "hover:border-rose-300",
      title: "Valideyn Məktəbi",
      desc: "Praktik seminar və məsləhətlər",
      items: [
        "Uşaqlarla sağlam ünsiyyət",
        "Sərhəd və qaydaların formalaşdırılması",
        "Yeniyetmə davranışlarını anlamaq",
        "Ailədə müsbət emosional iqlim",
        "Travmasız tərbiyə yanaşmaları",
        "Praktik və maarifləndirici seminarlar",
      ],
    },
    {
      icon: faBrain,
      bg: "bg-amber-50",
      color: "text-amber-500",
      activeBorder: "border-amber-400",
      activeBg: "bg-amber-50/60",
      hover: "hover:border-amber-300",
      title: "Psixoloji dəstək",
      desc: "Valideyn-uşaq münasibətləri",
      items: [
        "Valideyn-uşaq münasibətlərinin gücləndirilməsi",
        "Qoruyucu bağlanma stilinin inkişafı",
        "Ailə konflikti mediasiyası",
        "Empatik valideynlik üçün praktik alətlər",
        "Övladın inkişafını evdə dəstəkləmək",
      ],
    },
  ],

  muellimler: [
    {
      icon: faChalkboardTeacher,
      bg: "bg-blue-50",
      color: "text-blue-500",
      activeBorder: "border-blue-400",
      activeBg: "bg-blue-50/60",
      hover: "hover:border-blue-300",
      title: "Peşəkar inkişaf",
      desc: "Müəllim və tərbiyəçilər üçün modullar",
      items: [
        "Məktəbəqədər müəssisə proqramları",
        "Müəllimlər üçün ixtisasartırma modulları",
        "Mentorluq və fərdi inkişaf proqramları",
        "Emosional zəka və sinif idarəetməsi",
        "Psixoloji təhlükəsiz mühitin qurulması",
        "Burnout profilaktikası",
        "Sertifikatlı təlim proqramları",
      ],
    },
    {
      icon: faBook,
      bg: "bg-teal-50",
      color: "text-teal-500",
      activeBorder: "border-teal-400",
      activeBg: "bg-teal-50/60",
      hover: "hover:border-teal-300",
      title: "Rəqəmsal pedaqogika",
      desc: "İKT və süni intellekt alətləri",
      items: [
        "Rəqəmsal pedaqoji kompetensiyalar",
        "İKT alətlərinin tədrisdə tətbiqi",
        "Süni intellekt ilə dərs planlaması",
        "İnformasiya ilə işləmə bacarıqları",
        "Hibrid təlim metodologiyası",
      ],
    },
  ],

  akademik: [
    {
      icon: faFlask,
      bg: "bg-teal-50",
      color: "text-teal-500",
      activeBorder: "border-teal-400",
      activeBg: "bg-teal-50/60",
      hover: "hover:border-teal-300",
      title: "Tədqiqat və metodika",
      desc: "Elmi əsaslı inkişaf materialları",
      items: [
        "Elmi əsaslı metodik vəsaitlər",
        "Psixologiya-pedaqogika inteqrasiyası",
        "Elmi-tədqiqat layihələri",
        "Akademik əməkdaşlıqlar",
        "Sertifikat, diplom və akkreditasiya modelləri",
      ],
    },
    {
      icon: faChartBar,
      bg: "bg-indigo-50",
      color: "text-indigo-500",
      activeBorder: "border-indigo-400",
      activeBg: "bg-indigo-50/60",
      hover: "hover:border-indigo-300",
      title: "Qiymətləndirmə sistemi",
      desc: "Elmi diaqnostika alətləri",
      items: [
        "Elmi əsaslı diaqnostika alətləri",
        "IQ & EQ qiymətləndirməsi",
        "İnkişaf profili hazırlanması",
        "Psixoloji testlər",
        "Dinamik izləmə proqramı",
        "Mütəxəssis rəyi və tövsiyə",
      ],
    },
    {
      icon: faBook,
      bg: "bg-violet-50",
      color: "text-violet-500",
      activeBorder: "border-violet-400",
      activeBg: "bg-violet-50/60",
      hover: "hover:border-violet-300",
      title: "Resurs mərkəzi",
      desc: "Material, kart və nəşrlər",
      items: [
        "PDF kitab və materiallar",
        "İnkişaf kartları",
        "Oyun əsaslı öyrənmə materialları",
        "Video dərs yazıları",
        "500+ elmi məqalə arxivi",
      ],
    },
  ],
};

// ── Niyə biz (ümumi) ────────────────────────────────────────────────────────
const WHY_ITEMS = [
  { icon: faFlask,            color: "text-blue-500",   bg: "bg-blue-50",   text: "Elmi əsaslı inkişaf modeli" },
  { icon: faUsers,            color: "text-emerald-500", bg: "bg-emerald-50", text: "Təcrübəli ekspert heyəti" },
  { icon: faChild,            color: "text-amber-500",  bg: "bg-amber-50",  text: "Uşaqdan müəllimə hər kəs üçün" },
  { icon: faChalkboardTeacher,color: "text-violet-500", bg: "bg-violet-50", text: "Onlayn, əyani və hibrid format" },
  { icon: faGraduationCap,    color: "text-teal-500",   bg: "bg-teal-50",   text: "Sertifikatlı proqramlar" },
  { icon: faBook,             color: "text-rose-500",   bg: "bg-rose-50",   text: "Beynəlxalq əməkdaşlıqlara açıq" },
];

export default function ServicesSection() {
  const navigate = useNavigate();
  const [activeAudience, setActiveAudience] = useState("usaqlar");
  const [openCard, setOpenCard] = useState(null);

  const currentAudience = AUDIENCES.find((a) => a.key === activeAudience);
  const currentServices = AUDIENCE_SERVICES[activeAudience] ?? [];

  function toggleCard(title) {
    setOpenCard((prev) => (prev === title ? null : title));
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* ── Başlıq ── */}
        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-3">
            XİDMƏTLƏR
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Rovshan Academy nə təklif edir?
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Hədəf qrupunuzu seçin, sizə uyğun proqramları kəşf edin
          </p>
        </div>

        {/* ── Auditoriya tabları ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {AUDIENCES.map((aud) => {
            const isActive = activeAudience === aud.key;
            return (
              <button
                key={aud.key}
                onClick={() => {
                  setActiveAudience(aud.key);
                  setOpenCard(null);
                }}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold
                  transition-all duration-200 border-2
                  ${
                    isActive
                      ? `${aud.activeBg} ${aud.activeText} ${aud.border} shadow-md`
                      : `bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300 hover:bg-gray-100`
                  }
                `}
              >
                <FontAwesomeIcon
                  icon={aud.icon}
                  className={isActive ? "text-white" : aud.color}
                />
                {aud.label}
              </button>
            );
          })}
        </div>

        {/* ── Xidmət kartları ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {currentServices.map((svc) => {
            const isOpen = openCard === svc.title;
            return (
              <div
                key={svc.title}
                className={`
                  border-2 rounded-2xl overflow-hidden transition-all duration-300
                  ${isOpen
                    ? `${svc.activeBorder} ${svc.activeBg} shadow-lg`
                    : `border-gray-100 hover:shadow-md ${svc.hover}`}
                `}
              >
                {/* Kart başlığı — klik edilə bilən */}
                <button
                  onClick={() => toggleCard(svc.title)}
                  className="w-full text-left p-6 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <div
                        className={`
                          w-12 h-12 ${svc.bg} rounded-2xl flex items-center justify-center flex-shrink-0
                          shadow-sm transition-transform duration-300
                          ${isOpen ? "scale-110" : "group-hover:scale-110"}
                        `}
                      >
                        <FontAwesomeIcon icon={svc.icon} className={`text-xl ${svc.color}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{svc.title}</h3>
                        <p className="text-sm text-gray-500">{svc.desc}</p>
                      </div>
                    </div>
                    <div
                      className={`
                        w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-1
                        transition-all duration-200
                        ${isOpen ? `${svc.bg} ${svc.color}` : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}
                      `}
                    >
                      <FontAwesomeIcon
                        icon={isOpen ? faChevronUp : faChevronDown}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </button>

                {/* Açılan məzmun */}
                {isOpen && (
                  <div
                    className="px-6 pb-6"
                    style={{ animation: "fadeSlideDown .18s ease" }}
                  >
                    <div className="border-t border-gray-100 pt-4 space-y-2">
                      {svc.items.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className={`${svc.color} text-sm mt-0.5 flex-shrink-0`}
                          />
                          <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="text-center mb-20">
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all shadow-md hover:-translate-y-0.5 hover:shadow-lg"
          >
            Müraciət et
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </button>
        </div>

        {/* ── Niyə biz? ── */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
          <div className="text-center mb-8">
            <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-2">
              NİYƏ ROVSHAN ACADEMY?
            </p>
            <h3
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Fərqimiz nədədir?
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {WHY_ITEMS.map(({ icon, color, bg, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm"
              >
                <div
                  className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <FontAwesomeIcon icon={icon} className={`text-sm ${color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}