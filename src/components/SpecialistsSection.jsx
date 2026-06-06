// src/components/SpecialistsSection.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faXmark,
  faClock,
  faBriefcase,
  faTag,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ROLE_STYLES = {
  Psixoloqlar: { bg: "bg-violet-100", text: "text-violet-700", badge: "bg-violet-50 text-violet-600" },
  Loqopedlər:  { bg: "bg-teal-100",   text: "text-teal-700",   badge: "bg-teal-50 text-teal-600" },
  Pedaqoqlar:  { bg: "bg-blue-100",   text: "text-blue-700",   badge: "bg-blue-50 text-blue-600" },
  Mentor:      { bg: "bg-amber-100",  text: "text-amber-700",  badge: "bg-amber-50 text-amber-600" },
  EQ:          { bg: "bg-rose-100",   text: "text-rose-700",   badge: "bg-rose-50 text-rose-600" },
  IQ:          { bg: "bg-indigo-100", text: "text-indigo-700", badge: "bg-indigo-50 text-indigo-600" },
};
const DEFAULT_STYLE = { bg: "bg-emerald-100", text: "text-emerald-700", badge: "bg-emerald-50 text-emerald-600" };

function getStyle(role = "") {
  for (const key of Object.keys(ROLE_STYLES)) {
    if (role.includes(key)) return ROLE_STYLES[key];
  }
  return DEFAULT_STYLE;
}

function getInitials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

export default function SpecialistsSection() {
  const navigate = useNavigate();
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("specialists")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(4); // ana səhifədə yalnız 4 göstər
      setSpecialists(data || []);
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <>
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Başlıq */}
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
            <button
              onClick={() => navigate("/komanda")}
              className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 self-start md:self-auto group transition-colors"
            >
              Bütün mütəxəssislər
              <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                  <div className="w-20 h-20 rounded-2xl bg-gray-100 mx-auto mb-4" />
                  <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mb-4" />
                  <div className="h-8 bg-gray-100 rounded-xl" />
                </div>
              ))}
            </div>
          )}

          {/* Kartlar */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialists.map(s => {
                const style = getStyle(s.role);
                const initials = getInitials(s.full_name);
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center group cursor-pointer"
                  >
                    {/* Avatar */}
                    <div className={`w-20 h-20 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center text-2xl font-bold mx-auto mb-4 overflow-hidden`}>
                      {s.avatar_url
                        ? <img src={s.avatar_url} alt={s.full_name} className="w-full h-full object-cover" />
                        : initials}
                    </div>

                    <div className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors leading-snug">
                      {s.full_name}
                    </div>
                    <div className={`text-sm font-medium mb-1 ${style.text}`}>{s.role}</div>
                    {s.exp && (
                      <div className="text-xs text-gray-400 mb-4">{s.exp} təcrübə</div>
                    )}

                    <button className="w-full border border-gray-200 text-gray-600 text-sm py-2 rounded-xl hover:border-emerald-300 hover:text-emerald-600 transition-all">
                      Profil
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <SpecialistModal specialist={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

/* ── Modal ── */
function SpecialistModal({ specialist: s, onClose }) {
  const style = getStyle(s.role);
  const initials = getInitials(s.full_name);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`${style.bg} px-6 pt-8 pb-6 text-center relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/60 hover:bg-white/90 flex items-center justify-center transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="text-gray-600 text-sm" />
          </button>

          <div className={`w-24 h-24 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden`}>
            {s.avatar_url
              ? <img src={s.avatar_url} alt={s.full_name} className="w-full h-full object-cover" />
              : initials}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Georgia', serif" }}>
            {s.full_name}
          </h2>
          <p className={`text-sm font-semibold ${style.text}`}>{s.role}</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-96 overflow-y-auto">
          {/* Stats */}
          <div className="flex gap-3">
            {s.exp && (
              <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                <FontAwesomeIcon icon={faClock} className="text-gray-400 text-sm mb-1" />
                <div className="text-xs font-bold text-gray-700">{s.exp}</div>
                <div className="text-xs text-gray-400">Təcrübə</div>
              </div>
            )}
            {s.role && (
              <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                <FontAwesomeIcon icon={faBriefcase} className="text-gray-400 text-sm mb-1" />
                <div className="text-xs font-bold text-gray-700 leading-tight">{s.role}</div>
                <div className="text-xs text-gray-400">Sahə</div>
              </div>
            )}
          </div>

          {/* Bio */}
          {s.bio && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-400 text-xs" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Haqqında</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{s.bio}</p>
            </div>
          )}

          {/* Specialties */}
          {s.specialties?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faTag} className="text-gray-400 text-xs" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">İxtisas sahələri</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.specialties.map(sp => (
                  <span key={sp} className={`text-xs px-2.5 py-1 rounded-full font-medium ${style.badge}`}>
                    {sp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Email */}
          {s.email && (
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
              <a href={`mailto:${s.email}`} className="text-sm text-emerald-600 font-medium hover:underline">
                {s.email}
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
          >
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
}