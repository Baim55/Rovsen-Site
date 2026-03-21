// src/pages/ArticlePage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const AGE_STYLES = {
  "1-6":   { bg: "bg-amber-50",   border: "border-amber-300",   badge: "bg-amber-100",   text: "text-amber-700" },
  "6-10":  { bg: "bg-emerald-50", border: "border-emerald-300", badge: "bg-emerald-100", text: "text-emerald-700" },
  "11-17": { bg: "bg-blue-50",    border: "border-blue-300",    badge: "bg-blue-100",    text: "text-blue-700" },
  "18+":   { bg: "bg-violet-50",  border: "border-violet-300",  badge: "bg-violet-100",  text: "text-violet-700" },
};

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [author,  setAuthor]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  async function fetchArticle() {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) { setError("Məqalə tapılmadı"); setLoading(false); return; }
    setArticle(data);

    // Müəllif məlumatı
    if (data.author_id) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", data.author_id)
        .single();
      setAuthor(profile);
    }
    setLoading(false);
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 mt-25 flex items-center justify-center">
      <div className="text-gray-400 text-lg">Yüklənir...</div>
    </div>
  );

  if (error || !article) return (
    <div className="min-h-screen bg-gray-50 mt-25 flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl mb-4">📭</p>
        <p className="text-gray-500 mb-4">{error || "Məqalə tapılmadı"}</p>
        <button onClick={() => navigate(-1)} className="text-emerald-600 font-semibold">← Geri</button>
      </div>
    </div>
  );

  const style = AGE_STYLES[article.age_group] ?? {};

  return (
    <div className="min-h-screen bg-gray-50 mt-25">

      {/* Hero */}
      <div className={`${style.bg} border-b-2 ${style.border} py-10 px-6`}>
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition-colors"
          >
            ← Geri
          </button>

          {/* Tag + oxu müddəti */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {article.tag && (
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${style.badge} ${style.text}`}>
                {article.tag}
              </span>
            )}
            {article.time && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                🕐 {article.time} oxu
              </span>
            )}
            {article.category && (
              <span className="text-xs text-gray-500">
                📂 {article.category}
              </span>
            )}
          </div>

          {/* Başlıq */}
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {article.title}
          </h1>

          {/* Müəllif */}
          {author && (
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${style.badge} ${style.text} flex items-center justify-center font-bold text-sm`}>
                {author.full_name?.charAt(0) || "M"}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{author.full_name}</p>
                <p className="text-xs text-gray-500">{author.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Məzmun */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        {article.content ? (
          <div
            className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-base"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {article.content}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📝</p>
            <p>Bu məqalə üçün hələ məzmun əlavə edilməyib</p>
          </div>
        )}

        {/* Alt naviqasiya */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => navigate(-1)}
            className={`inline-flex items-center gap-2 ${style.text} font-semibold text-sm hover:opacity-80 transition-opacity`}
          >
            ← Geri qayıt
          </button>
        </div>
      </div>
    </div>
  );
}