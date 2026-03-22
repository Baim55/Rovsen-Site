import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarCheck,
  faLeaf,
  faSeedling,
  faTree,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

const AGE_NODES = [
  {
    icon: faSeedling,
    label: "1–6",
    color: "bg-amber-400",
    cls: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  {
    icon: faLeaf,
    label: "6–10",
    color: "bg-emerald-400",
    cls: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
  },
  {
    icon: faTree,
    label: "11–17",
    color: "bg-blue-400",
    cls: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  },
  {
    icon: faGraduationCap,
    label: "18–25",
    color: "bg-violet-400",
    cls: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  },
];

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Dekorativ arxa fon */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-100 blur-3xl opacity-70" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-teal-100 blur-3xl opacity-60" />
        <div className="absolute -bottom-20 right-1/3 w-64 h-64 rounded-full bg-amber-100 blur-3xl opacity-50" />
        {/* Nöqtəli grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #10b981 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Sol hissə ── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold px-4 py-2 rounded-full mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Rövşən İsmayılov adına İnkişaf Akademiyası
            </div>

            {/* Başlıq */}
            <h1
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Kiçikdən böyüyə{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                  inkişaf yolu
                </span>
                {/* Alt xətt dekor */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,3 Q50,0 100,3 Q150,6 200,3"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl">
              Uşaqların, gənclərin və mütəxəssislərin inkişafını elmi əsaslarla
              dəstəkləyirik. 0-dən 25 yaşa qədər bütün inkişaf mərhələlərini
              əhatə edirik.
            </p>

            {/* Düymələr */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/academy")}
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5"
              >
                Yaş qruplarını araşdır
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-emerald-300 bg-white hover:bg-emerald-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  className="text-emerald-500 text-sm"
                />
                Mütəxəssislə görüş
              </button>
            </div>

            {/* Statistika
            <div className="flex gap-8 mt-12 pt-8 border-t border-gray-100">
              {[
                { n: "500+", l: "Resurs",      color: "text-emerald-500" },
                { n: "12+",  l: "Mütəxəssis",  color: "text-blue-500" },
                { n: "1000+",l: "Ailə",         color: "text-amber-500" },
              ].map(({ n, l, color }) => (
                <div key={l}>
                  <div className={`text-2xl font-bold ${color}`} style={{ fontFamily: "'Georgia', serif" }}>
                    {n}
                  </div>
                  <div className="text-sm text-gray-400">{l}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* ── Sağ hissə — interaktiv dairə ── */}
          <div className="hidden lg:flex flex-col items-center gap-16">
            <div className="relative w-72 h-72">
              {/* Xarici dairə */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 flex items-center justify-center shadow-xl shadow-emerald-100/50">
                {/* Orta dairə */}
                <div className="w-52 h-52 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 border-2 border-emerald-200 flex items-center justify-center">
                  {/* Mərkəz */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 border-4 border-white shadow-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faTree}
                      className="text-white text-4xl"
                    />
                  </div>
                </div>
              </div>

              {/* Yaş nodu kartları */}
              {AGE_NODES.map((node) => (
                <div
                  key={node.label}
                  className={`absolute ${node.cls} w-16 h-16 bg-white border-2 border-gray-100 rounded-2xl flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                >
                  <div
                    className={`w-8 h-8 ${node.color} rounded-lg flex items-center justify-center mb-1`}
                  >
                    <FontAwesomeIcon
                      icon={node.icon}
                      className="text-white text-xs"
                    />
                  </div>
                  <span className="text-xs text-gray-600 font-bold">
                    {node.label}
                  </span>
                </div>
              ))}
            </div>

            {/* İnkişaf yolu indikatoru */}
            <div className="flex items-center gap-2  bg-white border border-gray-100 rounded-2xl px-6 py-3 shadow-md">
              {[
                { icon: faSeedling, color: "text-amber-500" },
                { icon: faLeaf, color: "text-emerald-500" },
                { icon: faTree, color: "text-blue-500" },
                { icon: faGraduationCap, color: "text-violet-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`${item.color} text-sm`}
                    />
                  </div>
                  {i < 3 && (
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-gray-300 text-xs"
                    />
                  )}
                </div>
              ))}
              <span className="ml-2 text-gray-500 text-sm font-medium">
                inkişaf yolu
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
