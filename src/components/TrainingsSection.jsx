import { trainings } from "../data/data";

function TrainingsSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Proqramlar
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Təlimlər və proqramlar
            </h2>
          </div>
          <button className="text-emerald-600 font-semibold hover:text-emerald-700 self-start md:self-auto">
            Bütün proqramlar →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trainings.map((t) => (
            <div
              key={t.title}
              className="border-2 border-gray-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-4">{t.icon}</div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${t.tagCls}`}
              >
                {t.tag}
              </span>
              <div className="font-semibold text-gray-800 mt-3 mb-2 group-hover:text-emerald-700 transition-colors">
                {t.title}
              </div>
              <div className="text-sm text-gray-500">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrainingsSection;
