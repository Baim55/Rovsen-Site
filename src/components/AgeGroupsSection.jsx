import { useNavigate } from "react-router-dom";
import { ageGroups } from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faLeaf,
  faTree,
  faGraduationCap,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const AGE_STYLES = {
  "1-6": {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    btnBg: "bg-amber-400 hover:bg-amber-500",
    btnText: "text-white",
    text: "text-amber-600",
    dot: "bg-amber-400",
    glow: "hover:shadow-amber-100",
    icon: faSeedling,
    iconBg: "bg-amber-400",
  },
  "6-10": {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    btnBg: "bg-emerald-500 hover:bg-emerald-600",
    btnText: "text-white",
    text: "text-emerald-600",
    dot: "bg-emerald-400",
    glow: "hover:shadow-emerald-100",
    icon: faLeaf,
    iconBg: "bg-emerald-400",
  },
  "11-17": {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    btnBg: "bg-blue-500 hover:bg-blue-600",
    btnText: "text-white",
    text: "text-blue-600",
    dot: "bg-blue-400",
    glow: "hover:shadow-blue-100",
    icon: faTree,
    iconBg: "bg-blue-400",
  },
  "18+": {
    bg: "bg-violet-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
    btnBg: "bg-violet-500 hover:bg-violet-600",
    btnText: "text-white",
    text: "text-violet-600",
    dot: "bg-violet-400",
    glow: "hover:shadow-violet-100",
    icon: faGraduationCap,
    iconBg: "bg-violet-400",
  },
};

function AgeGroupsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Başlıq */}
        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold text-sm  tracking-widest mb-3">
            İNKİŞAF XƏRİTƏSİ
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Yaş qrupları üzrə inkişaf
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Yaş dövrünüzü seçin, rolunuzu seçin, lazımi resurslara çatın
          </p>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ageGroups.map((g, index) => {
            const s = AGE_STYLES[g.id] ?? {};
            return (
              <div
                key={g.id}
                onClick={() => navigate(`/yas/${g.id}`)}
                className={`
                  relative ${s.bg} border ${s.border}
                  rounded-2xl p-6 cursor-pointer group flex flex-col
                  hover:shadow-xl ${s.glow}
                  transition-all duration-300 hover:-translate-y-1.5
                `}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Yuxarı — ikon + dot */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-12 h-12 ${s.iconBg} rounded-2xl flex items-center justify-center shadow-sm`}
                  >
                    <FontAwesomeIcon
                      icon={s.icon}
                      className="text-white text-xl"
                    />
                  </div>
                  <span className={`w-2 h-2 rounded-full ${s.dot} mt-1.5`} />
                </div>

                {/* Yaş */}
                <div
                  className={`text-2xl font-bold ${s.text} mb-0.5`}
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {g.age}
                </div>

                {/* Label */}
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  {g.label}
                </div>

                {/* Ayırıcı xətt */}
                <div
                  className={`h-px ${s.border} bg-current opacity-30 mb-3`}
                />

                {/* Təsvir */}
                <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">
                  {g.desc}
                </p>

                {/* Kateqoriya badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {g.categories.slice(0, 3).map((cat) => (
                    <span
                      key={cat}
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${s.badge}`}
                    >
                      {cat}
                    </span>
                  ))}
                  {g.categories.length > 3 && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.badge} opacity-60`}
                    >
                      +{g.categories.length - 3}
                    </span>
                  )}
                </div>

                {/* Button */}
                <button
                  className={`
                    w-full ${s.btnBg} ${s.btnText}
                    font-semibold py-2.5 rounded-xl text-sm
                    transition-all duration-200 group-hover:shadow-md
                    flex items-center justify-center gap-2
                  `}
                >
                  Bölməyə keç
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AgeGroupsSection;
