// src/components/ArticlesSection.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faClock, faTag,
  faBookOpen, faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

const CAT_COLORS = {
  "Psixoloqlar": "bg-purple-50 text-purple-600",
  "Pedaqoqlar":  "bg-blue-50 text-blue-600",
  "Loqopedlər":  "bg-teal-50 text-teal-600",
  "Valideynlər": "bg-amber-50 text-amber-600",
  "Uşaqlar":     "bg-emerald-50 text-emerald-600",
  "EQ":          "bg-rose-50 text-rose-600",
  "IQ":          "bg-indigo-50 text-indigo-600",
  "Mentor":      "bg-violet-50 text-violet-600",
};

const CAT_BG = {
  "Psixoloqlar": "from-purple-100 to-purple-50",
  "Pedaqoqlar":  "from-blue-100 to-blue-50",
  "Loqopedlər":  "from-teal-100 to-teal-50",
  "Valideynlər": "from-amber-100 to-amber-50",
  "Uşaqlar":     "from-emerald-100 to-emerald-50",
  "EQ":          "from-rose-100 to-rose-50",
  "IQ":          "from-indigo-100 to-indigo-50",
  "Mentor":      "from-violet-100 to-violet-50",
};

export default function ArticlesSection() {
  const navigate  = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    async function fetchLatest() {
      const { data } = await supabase
        .from("articles")
        .select("id, title, tag, time, category, age_group")
        .not("content", "is", null)
        .order("created_at", { ascending: false })
        .limit(3);
      setArticles(data || []);
      setLoading(false);
    }
    fetchLatest();
  }, []);

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Başlıq */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-3">
              BLOG
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Son məqalələr
            </h2>
          </div>
          <button
            onClick={() => navigate("/academy")}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors self-start md:self-auto group"
          >
            Bütün məqalələr
            <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-40 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-1/3" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Boş vəziyyət */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <FontAwesomeIcon icon={faBoxOpen} className="text-5xl text-gray-200 mb-4" />
            <p>Hələ məqalə əlavə edilməyib</p>
          </div>
        )}

        {/* Məqalələr */}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((a) => {
              const catColor = CAT_COLORS[a.category] ?? "bg-gray-50 text-gray-600";
              const catBg    = CAT_BG[a.category]    ?? "from-gray-100 to-gray-50";
              return (
                <div
                  key={a.id}
                  onClick={() => navigate(`/meqale/${a.id}`)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  {/* Şəkil hissəsi */}
                  <div className={`bg-gradient-to-br ${catBg} h-40 flex items-center justify-center relative`}>
                    <FontAwesomeIcon icon={faBookOpen} className="text-5xl text-white/40" />
                    {/* Yaş qrupu badge */}
                    {a.age_group && (
                      <span className="absolute top-3 left-3 text-xs font-semibold bg-white/80 text-gray-700 px-2.5 py-1 rounded-full shadow-sm">
                        {a.age_group}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Kateqoriya + oxu müddəti */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${catColor}`}>
                        <FontAwesomeIcon icon={faTag} className="text-xs" />
                        {a.category}
                      </span>
                      {a.time && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <FontAwesomeIcon icon={faClock} className="text-xs" />
                          {a.time}
                        </span>
                      )}
                    </div>

                    {/* Başlıq */}
                    <h3 className="font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors leading-snug">
                      {a.title}
                    </h3>

                    {/* Alt link */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-auto">
                      Oxu
                      <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}