import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher, faUsers, faSeedling, faBrain,
  faFlask, faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const HIGHLIGHTS = [
  { icon: faBrain,             bg: "bg-purple-50", color: "text-purple-500", title: "Duyusal və emosional inkişaf", desc: "Hissi bütünləmə, diqqət və özünüidarə",      tag: "Uşaqlar",      tagBg: "bg-amber-100 text-amber-700",   dot: "bg-amber-400"  },
  { icon: faUsers,             bg: "bg-rose-50",   color: "text-rose-500",   title: "Valideyn Məktəbi",             desc: "Praktik seminar və məsləhətlər",               tag: "Valideynlər",  tagBg: "bg-blue-100 text-blue-700",     dot: "bg-blue-400"   },
  { icon: faChalkboardTeacher, bg: "bg-blue-50",   color: "text-blue-500",   title: "Peşəkar inkişaf",              desc: "Müəllim və tərbiyəçilər üçün modullar",        tag: "Müəllimlər",   tagBg: "bg-violet-100 text-violet-700", dot: "bg-violet-400" },
  { icon: faFlask,             bg: "bg-teal-50",   color: "text-teal-500",   title: "Tədqiqat və metodika",         desc: "Elmi əsaslı inkişaf materialları",             tag: "Akademik",     tagBg: "bg-teal-100 text-teal-700",     dot: "bg-teal-400"   },
];

function TrainingsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-emerald-600 font-semibold text-xs tracking-widest mb-2">PROQRAMLAR</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Xidmətlər
            </h2>
          </div>
          <button
            onClick={() => navigate("/training")}
            className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm group"
          >
            Hamısı
            <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((t) => (
            <div
              key={t.title}
              onClick={() => navigate("/training")}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            >
              <div className={`w-10 h-10 ${t.bg} rounded-xl flex items-center justify-center mb-4`}>
                <FontAwesomeIcon icon={t.icon} className={`${t.color} text-base`} />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.tagBg}`}>{t.tag}</span>
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors leading-snug">
                {t.title}
              </p>
              <p className="text-xs text-gray-400">{t.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TrainingsSection;