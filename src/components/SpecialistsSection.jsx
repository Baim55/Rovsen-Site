import { specialists } from "../data/data";

function SpecialistsSection() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Komanda
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Komandamız
            </h2>
          </div>
          <button className="text-emerald-600 font-semibold hover:text-emerald-700 self-start md:self-auto">
            Bütün mütəxəssislər →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((s) => (
            <div
              key={s.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-center group cursor-pointer"
            >
              <div
                className={`w-20 h-20 rounded-2xl ${s.color} flex items-center justify-center text-2xl font-bold mx-auto mb-4`}
              >
                {s.initial}
              </div>
              <div className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                {s.name}
              </div>
              <div className="text-sm text-emerald-600 font-medium mb-1">
                {s.role}
              </div>
              <div className="text-xs text-gray-400 mb-4">{s.exp} təcrübə</div>
              <button className="w-full border border-gray-200 text-gray-600 text-sm py-2 rounded-xl hover:border-emerald-300 hover:text-emerald-600 transition-all">
                Profil
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpecialistsSection;
