// src/pages/ArticlesPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClock,
  faTag,
  faBookOpen,
  faBoxOpen,
  faLock,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const AGE_STYLES = {
  "1-6":   { badge: "bg-amber-100 text-amber-700"    },
  "6-10":  { badge: "bg-emerald-100 text-emerald-700" },
  "11-17": { badge: "bg-blue-100 text-blue-700"      },
  "18+":   { badge: "bg-violet-100 text-violet-700"  },
};

const CAT_COLORS = {
  Psixoloqlar: "bg-purple-50 text-purple-600",
  Pedaqoqlar:  "bg-blue-50 text-blue-600",
  Loqopedlər:  "bg-teal-50 text-teal-600",
  Valideynlər: "bg-amber-50 text-amber-600",
  Uşaqlar:     "bg-emerald-50 text-emerald-600",
  EQ:          "bg-rose-50 text-rose-600",
  IQ:          "bg-indigo-50 text-indigo-600",
  Mentorlar:   "bg-violet-50 text-violet-600",
};

const CAT_BG = {
  Psixoloqlar: "from-purple-100 to-purple-50",
  Pedaqoqlar:  "from-blue-100 to-blue-50",
  Loqopedlər:  "from-teal-100 to-teal-50",
  Valideynlər: "from-amber-100 to-amber-50",
  Uşaqlar:     "from-emerald-100 to-emerald-50",
  EQ:          "from-rose-100 to-rose-50",
  IQ:          "from-indigo-100 to-indigo-50",
  Mentorlar:   "from-violet-100 to-violet-50",
};

const PAGE_SIZE = 12;

export default function ArticlesPage() {
  const { user } = useAuth();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => { setPage(0); }, [search]);

  useEffect(() => { fetchArticles(); }, [page, search]);

  async function fetchArticles() {
    setLoading(true);

    let query = supabase
      .from("articles")
      .select("id, title, tag, time, category, age_group, image_url, content", { count: "exact" })
      .not("content", "is", null)
      .order("created_at", { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (search.trim()) {
      query = query.ilike("title", `%${search.trim()}%`);
    }

    const { data, count, error } = await query;
    if (!error) {
      setArticles(data || []);
      setTotal(count || 0);
    }
    setLoading(false);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-slate-50 mt-25">
      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-emerald-600 font-semibold text-xs tracking-widest mb-3">
            RESURS MƏRKƏZİ
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Bütün məqalələr
          </h1>
          <p className="text-gray-500 text-sm">
            {total > 0 ? `${total} məqalə` : "Məqalələr yüklənir..."}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ── Axtarış ── */}
        <div className="relative mb-8">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
          />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Məqalə axtar..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-40 bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Boş ── */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <FontAwesomeIcon icon={faBoxOpen} className="text-5xl text-gray-200 mb-4" />
            <p className="mb-3">Heç bir məqalə tapılmadı</p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-sm text-emerald-600 font-semibold hover:text-emerald-700"
              >
                Axtarışı sıfırla
              </button>
            )}
          </div>
        )}

        {/* ── Məqalələr ── */}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map(a => (
              <ArticleCard key={a.id} article={a} user={user} />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              ← Əvvəlki
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i).map(i => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                    page === i
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Növbəti →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleCard({ article: a, user }) {
  const navigate = useNavigate();
  const ageStyle = AGE_STYLES[a.age_group] || {};
  const catColor = CAT_COLORS[a.category] || "bg-gray-50 text-gray-600";
  const catBg    = CAT_BG[a.category]    || "from-gray-100 to-gray-50";

  function handleClick() {
    if (!user) { navigate("/login"); return; }
    navigate(`/meqale/${a.id}`);
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
    >
      <div className="h-40 relative overflow-hidden">
        {a.image_url ? (
          <img
            src={a.image_url}
            alt={a.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${catBg} flex items-center justify-center`}>
            <FontAwesomeIcon icon={faBookOpen} className="text-5xl text-white/40" />
          </div>
        )}
        {a.age_group && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${ageStyle.badge || "bg-white/80 text-gray-700"} shadow-sm`}>
            {a.age_group}
          </span>
        )}
      </div>

      <div className="p-5">
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

        <h3 className="font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
          {a.title}
        </h3>

        {!user ? (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FontAwesomeIcon icon={faLock} />
            Oxumaq üçün daxil olun
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            Oxu
            <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </div>
  );
}