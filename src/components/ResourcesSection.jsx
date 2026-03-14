import { resources } from "../data/data";

function ResourcesSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Resurs mərkəzi
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Faydalı resurslar
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {resources.map((r) => (
            <div
              key={r.title}
              className="border-2 border-gray-100 hover:border-emerald-200 rounded-2xl p-6 text-center hover:bg-emerald-50 transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-3">{r.icon}</div>
              <div className="font-semibold text-gray-800 text-sm group-hover:text-emerald-700 transition-colors">
                {r.title}
              </div>
              <div className="text-xs text-gray-400 mt-1">{r.count}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResourcesSection;
