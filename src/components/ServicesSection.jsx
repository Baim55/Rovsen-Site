// src/components/ServicesSection.jsx
import { services } from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain, faComments, faChalkboardTeacher,
  faChartBar, faBook, faSeedling, faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const SERVICE_ICONS = {
  "🧠": { icon: faBrain,               bg: "bg-purple-50",  color: "text-purple-500",  border: "hover:border-purple-200 hover:bg-purple-50/50" },
  "🗣":  { icon: faComments,            bg: "bg-teal-50",    color: "text-teal-500",    border: "hover:border-teal-200 hover:bg-teal-50/50" },
  "👨‍🏫": { icon: faChalkboardTeacher,  bg: "bg-blue-50",    color: "text-blue-500",    border: "hover:border-blue-200 hover:bg-blue-50/50" },
  "📊": { icon: faChartBar,            bg: "bg-amber-50",   color: "text-amber-500",   border: "hover:border-amber-200 hover:bg-amber-50/50" },
  "📚": { icon: faBook,                bg: "bg-rose-50",    color: "text-rose-500",    border: "hover:border-rose-200 hover:bg-rose-50/50" },
  "🌱": { icon: faSeedling,            bg: "bg-emerald-50", color: "text-emerald-500", border: "hover:border-emerald-200 hover:bg-emerald-50/50" },
};

export default function ServicesSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-3">
            XİDMƏTLƏR
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Nə təklif edirik?
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Hər yaş qrupu və rol üçün xüsusi hazırlanmış xidmətlər
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((s) => {
            const cfg = SERVICE_ICONS[s.icon] ?? {
              icon: faSeedling, bg: "bg-gray-50", color: "text-gray-500",
              border: "hover:border-gray-200",
            };
            return (
              <div
                key={s.title}
                className={`group border-2 border-gray-100 ${cfg.border} rounded-2xl p-6 transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5`}
              >
                <div className={`w-12 h-12 ${cfg.bg} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={cfg.icon} className={`text-xl ${cfg.color}`} />
                </div>
                <div className="font-bold text-gray-900 mb-1.5 group-hover:text-gray-800 transition-colors">
                  {s.title}
                </div>
                <div className="text-sm text-gray-500 mb-4">{s.desc}</div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${cfg.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Ətraflı
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}