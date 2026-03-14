import React from "react";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, #10b981 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Rövşən İsmayılov adına İnkişaf Akademiyası
            </div>
            <h1
              className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Kiçikdən böyüyə{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                inkişaf yolu
              </span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
              Uşaqların, gənclərin və mütəxəssislərin inkişafını elmi əsaslarla
              dəstəkləyirik. 0-dən 25 yaşa qədər bütün inkişaf mərhələlərini
              əhatə edirik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-500/25">
                Yaş qruplarını araşdır →
              </button>
              <button className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 backdrop-blur-sm">
                Mütəxəssislə görüş
              </button>
            </div>
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                ["500+", "Resurs"],
                ["12+", "Mütəxəssis"],
                ["1000+", "Ailə"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {n}
                  </div>
                  <div className="text-sm text-slate-400">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center gap-6">
            <div className="relative w-72 h-72">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-emerald-500/40 border border-emerald-400/50 flex items-center justify-center">
                    <span className="text-5xl">🌳</span>
                  </div>
                </div>
              </div>
              {[
                {
                  emoji: "🌱",
                  label: "1–6",
                  cls: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                },
                {
                  emoji: "🌿",
                  label: "6–10",
                  cls: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
                },
                {
                  emoji: "🌳",
                  label: "11–17",
                  cls: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                },
                {
                  emoji: "🎓",
                  label: "18–25",
                  cls: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`absolute ${item.cls} w-16 h-16 bg-slate-800 border border-white/20 rounded-2xl flex flex-col items-center justify-center shadow-lg`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-xs text-slate-300 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
              {["🌱", "🌿", "🌳"].map((e, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-2xl">{e}</span>
                  {i < 2 && <span className="text-emerald-500">→</span>}
                </div>
              ))}
              <span className="ml-2 text-slate-300 text-sm">inkişaf yolu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
