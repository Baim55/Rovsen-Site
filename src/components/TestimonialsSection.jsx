// src/components/TestimonialsSection.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const ROLE_COLORS = {
  "Uşaq":       "bg-emerald-100 text-emerald-700",
  "Tələbə":     "bg-blue-100 text-blue-700",
  "Valideyn":   "bg-amber-100 text-amber-700",
  "Psixoloqlar":"bg-purple-100 text-purple-700",
  "Pedaqoqlar": "bg-teal-100 text-teal-700",
  "Loqopedlər": "bg-cyan-100 text-cyan-700",
  "EQ":         "bg-rose-100 text-rose-700",
  "IQ":         "bg-indigo-100 text-indigo-700",
  "Mentor":     "bg-violet-100 text-violet-700",
};

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      // profiles cədvəlindən son qeydiyyat olanları çək
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, role, avatar_url, created_at")
        .not("full_name", "is", null)
        .order("created_at", { ascending: false })
        .limit(3);
      setReviews(data || []);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  if (loading) return null;
  if (reviews.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Başlıq */}
        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-3">
            ÜZVLƏR
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Bizimlə olan insanlar
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            İnkişaf Akademiyasına qoşulan üzvlərimiz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => {
            const initials = (r.full_name || "U")
              .split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
            const roleColor = ROLE_COLORS[r.role] || "bg-gray-100 text-gray-600";

            return (
              <div
                key={r.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Quote ikonu */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faQuoteLeft} className="text-emerald-400 text-sm" />
                  </div>
                  {/* Ulduzlar */}
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <FontAwesomeIcon key={s} icon={faStar} className="text-amber-400 text-xs" />
                    ))}
                  </div>
                </div>

                {/* Mətn */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "İnkişaf Akademiyasına qoşulmaq çox faydalı oldu. Tövsiyə edirəm!"
                </p>

                {/* İstifadəçi */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    {r.avatar_url
                      ? <img src={r.avatar_url} alt={r.full_name} className="w-full h-full object-cover" />
                      : <div className={`w-full h-full ${roleColor} flex items-center justify-center font-bold text-sm`}>
                          {initials}
                        </div>
                    }
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{r.full_name}</div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColor}`}>
                      {r.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}