// data/data.js — dəyişiklik yoxdur, eyni qalır

// components/AgeGroupsSection.jsx
import { useNavigate } from "react-router-dom";
import { ageGroups } from "../data/data";

function AgeGroupsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Başlıq */}
        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
            İnkişaf xəritəsi
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Yaş qrupları üzrə inkişaf
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Yaş dövrünüzü seçin, rolunuzu seçin, lazımi resurslara çatın
          </p>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ageGroups.map((g, index) => (
            <div
              key={g.id}
              onClick={() => navigate(`/yas/${g.id}`)}
              className={`
                relative ${g.bg} border-2 ${g.border}
                rounded-3xl p-6 cursor-pointer group
                hover:shadow-xl transition-all duration-300 hover:-translate-y-2
              `}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Yuxarı sıra: emoji + rəngli indicator nöqtəsi */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{g.emoji}</span>
                <span className={`w-3 h-3 rounded-full ${g.dot} mt-1`} />
              </div>

              {/* Yaş + etiket */}
              <div
                className={`text-xl font-bold ${g.text} mb-1`}
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {g.age}
              </div>
              <div className="text-sm font-semibold text-gray-600 mb-3">
                {g.label}
              </div>

              {/* Təsvir */}
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {g.desc}
              </p>

              {/* Kateqoriya badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {g.categories.slice(0, 3).map((cat) => (
                  <span
                    key={cat}
                    className={`text-xs px-2 py-0.5 rounded-full ${g.badge} bg-opacity-20 ${g.text} font-medium`}
                  >
                    {cat.replace(" üçün", "")}
                  </span>
                ))}
                {g.categories.length > 3 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${g.text} font-medium opacity-60`}>
                    +{g.categories.length - 3}
                  </span>
                )}
              </div>

              {/* Button */}
              <button
                className={`
                  w-full ${g.badge} bg-opacity-90 ${g.text}
                  font-semibold py-2.5 rounded-xl text-sm
                  transition-all duration-200
                  group-hover:bg-opacity-100 group-hover:shadow-md
                  border-2 ${g.border}
                `}
              >
                Bölməyə keç →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgeGroupsSection;