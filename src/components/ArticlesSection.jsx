import { articles } from "../data/data";

function ArticlesSection() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Blog
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Son məqalələr
            </h2>
          </div>
          <button className="text-emerald-600 font-semibold hover:text-emerald-700 self-start md:self-auto">
            Bütün məqalələr →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <div
              key={a.title}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-emerald-100 to-teal-50 h-40 flex items-center justify-center">
                <span className="text-5xl">📝</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {a.cat}
                  </span>
                  <span className="text-xs text-gray-400">{a.time} oxu</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                  {a.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArticlesSection;
