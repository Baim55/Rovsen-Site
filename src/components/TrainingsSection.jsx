import { useNavigate } from "react-router-dom";
import { trainings } from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faUsers,
  faSeedling,
  faTrophy,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const TAG_STYLES = {
  "Davam edir": {
    bg: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  Yeni: { bg: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  Tezliklə: { bg: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  Açıq: { bg: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
};

const TRAINING_ICONS = {
  "👨‍🏫": { icon: faChalkboardTeacher, bg: "bg-blue-50", color: "text-blue-500" },
  "👨‍👩‍👧": { icon: faUsers, bg: "bg-amber-50", color: "text-amber-500" },
  "🌱": { icon: faSeedling, bg: "bg-emerald-50", color: "text-emerald-500" },
  "🏆": { icon: faTrophy, bg: "bg-violet-50", color: "text-violet-500" },
};

function TrainingsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Başlıq */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-3">
              PROQRAMLAR
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Təlimlər və proqramlar
            </h2>
          </div>
          <button
            onClick={() => navigate("/training")}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors self-start md:self-auto group"
          >
            Bütün proqramlar
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trainings.map((t) => {
            const tag = TAG_STYLES[t.tag] ?? {
              bg: "bg-gray-100 text-gray-600",
              dot: "bg-gray-400",
            };
            const iconCfg = TRAINING_ICONS[t.icon] ?? {
              icon: faChalkboardTeacher,
              bg: "bg-gray-50",
              color: "text-gray-500",
            };

            return (
              <div
                key={t.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col"
              >
                {/* İkon */}
                <div
                  className={`w-12 h-12 ${iconCfg.bg} rounded-2xl flex items-center justify-center mb-5 shadow-sm`}
                >
                  <FontAwesomeIcon
                    icon={iconCfg.icon}
                    className={`text-xl ${iconCfg.color}`}
                  />
                </div>

                {/* Tag */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${tag.dot}`} />
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tag.bg}`}
                  >
                    {t.tag}
                  </span>
                </div>

                {/* Başlıq */}
                <div className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug flex-1">
                  {t.title}
                </div>

                {/* Təsvir */}
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  {t.desc}
                </p>

                {/* Alt hissə */}
                <div
                  className={`flex items-center gap-1.5 text-xs font-semibold ${iconCfg.color} mt-auto`}
                >
                  Ətraflı bax
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrainingsSection;
