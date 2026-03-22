// src/pages/ArticlePage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faClock,
  faFolderOpen,
  faChevronLeft,
  faBoxOpen,
  faPenToSquare,
  faUser,
  faComment,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const AGE_STYLES = {
  "1-6": {
    bg: "bg-amber-50",
    border: "border-amber-300",
    badge: "bg-amber-100",
    text: "text-amber-700",
  },
  "6-10": {
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    badge: "bg-emerald-100",
    text: "text-emerald-700",
  },
  "11-17": {
    bg: "bg-blue-50",
    border: "border-blue-300",
    badge: "bg-blue-100",
    text: "text-blue-700",
  },
  "18+": {
    bg: "bg-violet-50",
    border: "border-violet-300",
    badge: "bg-violet-100",
    text: "text-violet-700",
  },
};

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    if (error) {
      setError("Məqalə tapılmadı");
      setLoading(false);
      return;
    }
    setArticle(data);
    if (data.author_id) {
      const { data: p } = await supabase
        .from("profiles")
        .select("full_name, role, avatar_url")
        .eq("id", data.author_id)
        .single();
      setAuthor(p);
    }
    setLoading(false);
  }

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 mt-25 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-emerald-500 rounded-full animate-spin" />
          Yüklənir...
        </div>
      </div>
    );

  if (error || !article)
    return (
      <div className="min-h-screen bg-gray-50 mt-25 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faBoxOpen}
            className="text-5xl text-gray-200 mb-4"
          />
          <p className="text-gray-500 mb-4">{error || "Məqalə tapılmadı"}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:opacity-80 transition-opacity"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" /> Geri
          </button>
        </div>
      </div>
    );

  const style = AGE_STYLES[article.age_group] ?? {};

  return (
    <div className="min-h-screen bg-gray-50 mt-25">
      {/* ── Hero ── */}
      <div className={`${style.bg} border-b-2 ${style.border} py-10 px-6`}>
        <div className="max-w-3xl mx-auto">
           <button
            onClick={() => navigate(-1)}
            className={`cursor-pointer inline-flex items-center gap-2 ${style.text} font-semibold text-sm hover:opacity-80 transition-opacity mb-8`}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" /> Geri
            qayıt
          </button>

          <div className="flex items-center gap-2 mb-5 flex-wrap">
            {article.tag && (
              <span
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${style.badge} ${style.text}`}
              >
                <FontAwesomeIcon icon={faTag} className="text-xs" />{" "}
                {article.tag}
              </span>
            )}
            {article.time && (
              <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200">
                <FontAwesomeIcon icon={faClock} className="text-xs" />{" "}
                {article.time} oxu
              </span>
            )}
            {article.category && (
              <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/70 px-3 py-1 rounded-full border border-gray-200">
                <FontAwesomeIcon icon={faFolderOpen} className="text-xs" />{" "}
                {article.category}
              </span>
            )}
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {article.title}
          </h1>

          {author && (
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${style.badge} ${style.text} flex items-center justify-center font-bold text-sm overflow-hidden`}
              >
                {author.avatar_url ? (
                  <img
                    src={author.avatar_url}
                    alt={author.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {author.full_name}
                </p>
                <p className="text-xs text-gray-500">{author.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Məzmun ── */}
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
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-4xl text-gray-200 mb-3"
            />
            <p>Bu məqalə üçün hələ məzmun əlavə edilməyib</p>
          </div>
        )}

        {/* ── Geri düyməsi ── */}
        <div className="mt-12 border-t border-gray-200 ">
         
        </div>

        {/* ── Şərhlər bölməsi ── */}
        <CommentsSection
          articleId={id}
          user={user}
          profile={profile}
          style={style}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Şərhlər komponenti
══════════════════════════════════════ */
function CommentsSection({ articleId, user, profile, style }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  async function fetchComments() {
    setLoading(true);
    const { data } = await supabase
      .from("comments")
      .select("*, profiles(full_name, avatar_url, role)")
      .eq("article_id", articleId)
      .order("created_at", { ascending: false });
    setComments(data || []);
    setLoading(false);
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSending(true);
    const { data, error } = await supabase
      .from("comments")
      .insert({
        article_id: articleId,
        user_id: user.id,
        content: newComment.trim(),
      })
      .select("*, profiles(full_name, avatar_url, role)")
      .single();
    if (!error) {
      setComments((prev) => [data, ...prev]);
      setNewComment("");
    }
    setSending(false);
  }

  async function handleDelete(commentId) {
    setDeletingId(commentId);
    await supabase.from("comments").delete().eq("id", commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    setDeletingId(null);
  }

  function timeAgo(dateStr) {
    const normalized =
      dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z";
    const diff = Math.floor((Date.now() - new Date(normalized)) / 1000);
    if (diff < 60) return "indicə";
    if (diff < 3600) return `${Math.floor(diff / 60)} dəq əvvəl`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} saat əvvəl`;
    return `${Math.floor(diff / 86400)} gün əvvəl`;
  }

  return (
    <div className="border-t border-gray-200 pt-10">
      {/* Başlıq */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faComment} className="text-gray-500 text-sm" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Şərhlər
          {comments.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({comments.length})
            </span>
          )}
        </h3>
      </div>

      {/* Şərh yazma formu */}
      {user ? (
        <form onSubmit={handleSend} className="mb-8">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-emerald-100 flex items-center justify-center flex-shrink-0">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-emerald-700 font-bold text-xs">
                  {(profile?.full_name || user.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Şərhinizi yazın..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 focus:border-emerald-400 focus:bg-white rounded-2xl text-sm text-gray-700 focus:outline-none transition-colors resize-none leading-relaxed"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={sending || !newComment.trim()}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-all"
                >
                  {sending ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                  )}
                  Göndər
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-5 text-center">
          <p className="text-gray-500 text-sm mb-3">
            Şərh yazmaq üçün daxil olun
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors"
          >
            Daxil ol
          </button>
        </div>
      )}

      {/* Şərhlər siyahısı */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-1/4" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <FontAwesomeIcon
            icon={faComment}
            className="text-3xl text-gray-200 mb-3"
          />
          <p className="text-sm">Hələ şərh yoxdur. İlk şərhi siz yazın!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => {
            const isOwn = user?.id === c.user_id;
            const initials = (c.profiles?.full_name || "U")
              .charAt(0)
              .toUpperCase();
            return (
              <div key={c.id} className="flex gap-3 group">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  {c.profiles?.avatar_url ? (
                    <img
                      src={c.profiles.avatar_url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-emerald-700 font-bold text-xs">
                      {initials}
                    </span>
                  )}
                </div>

                {/* Məzmun */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {c.profiles?.full_name || "İstifadəçi"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {timeAgo(c.created_at)}
                      </span>
                      {isOwn && (
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={deletingId === c.id}
                          className=" w-6 h-6 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-400 text-xs"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                 <p className="text-sm text-gray-700 leading-relaxed break-all">
  {c.content}
</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
