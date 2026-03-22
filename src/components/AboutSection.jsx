// src/components/AboutSection.jsx
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask, faHeart, faRocket, faHandshake,
  faArrowRight, faCheck,
  faUserGraduate, faBookOpen, faShieldHeart, faInfinity,
  faPeopleGroup, faMicroscope,
} from "@fortawesome/free-solid-svg-icons";

const VALUES = [
  { icon: faFlask,     label: "Elmi metodika",    bg: "bg-blue-50",    color: "text-blue-500" },
  { icon: faHeart,     label: "Empatik yanaşma",  bg: "bg-rose-50",    color: "text-rose-500" },
  { icon: faRocket,    label: "İnnovasiya",        bg: "bg-amber-50",   color: "text-amber-500" },
  { icon: faHandshake, label: "Cəmiyyətə töhfə",  bg: "bg-emerald-50", color: "text-emerald-500" },
];

const WHY_US = [
  {
    icon: faMicroscope,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "Elmi əsaslı yanaşma",
    desc: "Bütün metodikalar müasir psixologiya və pedaqogika elminə əsaslanır.",
  },
  {
    icon: faUserGraduate,
    color: "text-violet-500",
    bg: "bg-violet-50",
    title: "Peşəkar komanda",
    desc: "10+ illik təcrübəyə sahib psixoloq, pedaqoq və loqopedlərdən ibarət komanda.",
  },
  {
    icon: faInfinity,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    title: "0-dən 25-ə qədər",
    desc: "Bütün yaş mərhələlərini əhatə edən vahid inkişaf sistemi.",
  },
  {
    icon: faPeopleGroup,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "Ailə mərkəzli",
    desc: "Uşaq, valideyn və mütəxəssis — üçünü bir platformada birləşdiririk.",
  },
  {
    icon: faBookOpen,
    color: "text-teal-500",
    bg: "bg-teal-50",
    title: "Zəngin resurs bazası",
    desc: "500+ məqalə, metodiki material və inkişaf vasitələri.",
  },
  {
    icon: faShieldHeart,
    color: "text-rose-500",
    bg: "bg-rose-50",
    title: "Etibarlı mühit",
    desc: "Hər istifadəçi üçün təhlükəsiz, empatik və dəstəkleyici mühit.",
  },
];

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 mt-15 bg-slate-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* ── Sol hissə ── */}
        <div>
          <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-4">
            AKADEMİYA HAQQINDA
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            İnsan inkişafı erkən yaşdan başlayır
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5 text-lg">
            Rövşən İsmayılov adına İnkişaf Akademiyası uşaqların, valideynlərin,
            müəllimlərin və gənclərin inkişafını bir sistem daxilində birləşdirir.
          </p>
          <p className="text-gray-500 leading-relaxed mb-8 text-sm">
            Psixologiya və pedaqogika elminin inteqrasiyasına əsaslanan metodikamız
            hər yaş dövrünün potensialını açmağa yönəlmişdir.
          </p>

          {/* Dəyərlər */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {VALUES.map(({ icon, label, bg, color }) => (
              <div key={label} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <FontAwesomeIcon icon={icon} className={`text-sm ${color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/academy")}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all group"
          >
            Daha ətraflı
            <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ── Sağ hissə — Niyə biz? ── */}
        <div>
          <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-4">
            NİYƏ BİZ?
          </p>
          <h3
            className="text-2xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Fərqimiz nədədir?
          </h3>

          <div className="space-y-3">
            {WHY_US.map(({ icon, color, bg, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* İkon */}
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <FontAwesomeIcon icon={icon} className={`text-sm ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-bold text-gray-900">{title}</h4>
                    <div className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon icon={faCheck} className="text-emerald-500 text-xs" style={{ fontSize: "8px" }} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}