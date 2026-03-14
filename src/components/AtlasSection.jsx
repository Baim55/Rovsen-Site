import { useState } from "react";
import { ageGroups } from "../data/data";

function AtlasSection() {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const areas = [
    "Emosional inkişaf",
    "Sosial inkişaf",
    "Nitq inkişafı",
    "Öyrənmə bacarıqları",
  ];
  const recs = {
    "Emosional inkişaf": [
      "Hisslərini adlandırma oyunları",
      "Emosiya kartları ilə fəaliyyətlər",
      "Nağıl əsaslı empatiya inkişafı",
    ],
    "Sosial inkişaf": [
      "Qrup oyunları və birgə fəaliyyətlər",
      "Münaqişə həlli bacarıqları",
      "Dostluq dairəsi aktivlikləri",
    ],
    "Nitq inkişafı": [
      "Artikulyasiya məşqləri",
      "Nağıl danışma və şeir əzbərləmə",
      "Fonetik oyunlar",
    ],
    "Öyrənmə bacarıqları": [
      "Diqqət və yaddaş məşqləri",
      "Oxu strategiyaları",
      "Vizual öyrənmə texnikaları",
    ],
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-emerald-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Fərqləndirici xüsusiyyət
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            0–25 yaş inkişaf xəritəsi
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto">
            Yaşı və inkişaf sahəsini seçin — fərdi tövsiyələr açılsın
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto">
          <p className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-4">
            1. Yaş seçin
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {ageGroups.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setSelectedAge(g.id);
                  setSelectedArea(null);
                }}
                className={`p-3 rounded-xl border transition-all text-center ${selectedAge === g.id ? "border-emerald-400 bg-emerald-500/20 text-white" : "border-white/10 text-slate-300 hover:border-white/30"}`}
              >
                <div className="text-2xl mb-1">{g.emoji}</div>
                <div className="text-xs font-medium">{g.age}</div>
              </button>
            ))}
          </div>

          {selectedAge && (
            <>
              <p className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-4">
                2. İnkişaf sahəsi seçin
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all text-left ${selectedArea === area ? "border-emerald-400 bg-emerald-500/20 text-white" : "border-white/10 text-slate-300 hover:border-white/30"}`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedAge && selectedArea && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
              <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">
                ✨ Tövsiyələr
              </p>
              <ul className="space-y-3 mb-5">
                {recs[selectedArea].map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 text-slate-200 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
              <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
                Bütün resursları gör →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AtlasSection;
