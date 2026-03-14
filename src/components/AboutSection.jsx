function AboutSection() {
  return (
    <section className="py-20 px-6 bg-slate-50 mt-15">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Akademiya haqqında
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            İnsan inkişafı erkən yaşdan başlayır
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5 text-lg">
            Rövşən İsmayılov adına İnkişaf Akademiyası uşaqların, valideynlərin,
            müəllimlərin və gənclərin inkişafını bir sistem daxilində
            birləşdirir.
          </p>
          <p className="text-gray-500 leading-relaxed mb-8">
            Psixologiya və pedaqogika elminin inteqrasiyasına əsaslanan
            metodikamız hər yaş dövrünün potensialını açmağa yönəlmişdir.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              ["🔬", "Elmi metodika"],
              ["💚", "Empatik yanaşma"],
              ["🚀", "İnnovasiya"],
              ["🤝", "Cəmiyyətə töhfə"],
            ].map(([icon, label]) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100"
              >
                <span>{icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <button className="bg-slate-900 hover:bg-slate-700 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all">
            Daha ətraflı →
          </button>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-emerald-100 to-teal-50 rounded-3xl aspect-square flex items-center justify-center border-2 border-emerald-200">
            <div className="text-center p-8">
              <div className="text-8xl mb-4">🌳</div>
              <div
                className="text-emerald-700 font-semibold text-lg"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                "İnkişafın elmi yolu"
              </div>
              <div className="text-emerald-600 text-sm mt-2">
                Rövşən İsmayılov adına İnkişaf Akademiyası
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white rounded-2xl p-4 shadow-lg">
            <div
              className="text-2xl font-bold"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              10+
            </div>
            <div className="text-xs text-emerald-100">il təcrübə</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
