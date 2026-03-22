// src/pages/AdminPanel.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import { ageGroups, developmentAreas, subAgeGroups } from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChild,
  faUserGraduate,
  faUsers,
  faBriefcase,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

const ROLE_CATEGORIES = {
  Psixoloqlar: ["Psixoloqlar", "Uşaqlar", "EQ", "Valideynlər"],
  Loqopedlər:  ["Loqopedlər",  "Uşaqlar", "Valideynlər"],
  Pedaqoqlar:  ["Pedaqoqlar",  "Uşaqlar", "Valideynlər", "IQ"],
  EQ:          ["EQ",          "Uşaqlar", "Valideynlər"],
  IQ:          ["IQ",          "Uşaqlar", "Valideynlər"],
  Mentor:      ["Mentorlar",      "Valideynlər"],
  admin:       ["Uşaqlar","Valideynlər","Pedaqoqlar","Psixoloqlar",
                "Loqopedlər","EQ","IQ","Mentorlar"],
};

const ROLE_AGE_GROUPS = {
  Pedaqoqlar:  ["1-6", "6-10", "11-17"],
  Loqopedlər:  ["1-6", "6-10", "11-17"],
  Psixoloqlar: ["1-6", "6-10", "11-17", "18+"],
  IQ:          ["11-17", "18+"],
  EQ:          ["1-6", "6-10", "11-17", "18+"],
  Mentor:      ["18+"],
  admin:       ["1-6", "6-10", "11-17", "18+"],
};

const EMPTY_FORM = {
  title: "", tag: "", time: "", content: "",
  age_group: "", category: "", sub_age: "", area: "",
};

const STAT_CARDS = [
  { label: "Uşaq",       key: "Uşaq",      icon: faChild,        color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Tələbə",     key: "Tələbə",    icon: faUserGraduate, color: "text-blue-500",    bg: "bg-blue-50" },
  { label: "Valideyn",   key: "Valideyn",  icon: faUsers,         color: "text-amber-500",   bg: "bg-amber-50" },
  { label: "Mütəxəssis", key: "mutexessis",icon: faBriefcase,    color: "text-violet-500",  bg: "bg-violet-50" },
  { label: "Məqalə",     key: "articles",  icon: faNewspaper,    color: "text-rose-500",    bg: "bg-rose-50" },
];

export default function AdminPanel() {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [editId,   setEditId]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [msg,      setMsg]      = useState(null);
  const [stats,    setStats]    = useState(null);

  useEffect(() => {
    if (user && profile?.role === "admin") fetchStats();
  }, [user, profile]);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) fetchMyArticles();
  }, [user]);

  useEffect(() => {
    if (!authLoading && profile &&
      !["admin","Psixoloqlar","Loqopedlər","Pedaqoqlar","EQ","IQ","Mentor"]
        .includes(profile.role)) {
      navigate("/");
    }
  }, [profile, authLoading, navigate]);

  async function fetchStats() {
    const { data } = await supabase.from("profiles").select("role");
    const counts = {
      "Uşaq": 0, "Tələbə": 0, "Valideyn": 0,
      "Psixoloqlar": 0, "Loqopedlər": 0, "Pedaqoqlar": 0,
      "EQ": 0, "IQ": 0, "Mentor": 0,
    };
    (data || []).forEach((p) => {
      if (counts[p.role] !== undefined) counts[p.role]++;
    });
    const { count: articleCount } = await supabase
      .from("articles").select("*", { count: "exact", head: true });

    setStats({
      ...counts,
      articles:    articleCount || 0,
      mutexessis:  (counts["Psixoloqlar"] || 0) + (counts["Loqopedlər"] || 0) +
                   (counts["Pedaqoqlar"]  || 0) + (counts["EQ"] || 0) +
                   (counts["IQ"] || 0)          + (counts["Mentor"] || 0),
    });
  }

  async function fetchMyArticles() {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles").select("*")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false });
    if (!error) setArticles(data || []);
    setLoading(false);
  }

  const allowedAgeGroups = profile
    ? (ROLE_AGE_GROUPS[profile.role] || ROLE_AGE_GROUPS["admin"])
    : ROLE_AGE_GROUPS["admin"];

  const allowedCategories = profile
    ? (ROLE_CATEGORIES[profile.role] || ROLE_CATEGORIES["admin"])
    : ROLE_CATEGORIES["admin"];

  const availableCategories = form.age_group
    ? (ageGroups.find((g) => g.id === form.age_group)?.categories || [])
        .filter((c) => allowedCategories.includes(c))
    : [];

  const is16    = form.age_group === "1-6";
  const hasSubs = is16 && form.category === "Uşaqlar";

  function handleChange(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "age_group") { next.category = ""; next.sub_age = ""; next.area = ""; }
      if (field === "category")  { next.sub_age = ""; next.area = ""; }
      return next;
    });
  }

  async function handleSave() {
    if (!form.title || !form.age_group || !form.category) {
      setMsg({ type: "error", text: "Başlıq, yaş qrupu və kateqoriya mütləqdir" }); return;
    }
    const payload = { ...form, author_id: user.id };
    let error;
    if (editId) {
      ({ error } = await supabase.from("articles").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("articles").insert(payload));
    }
    if (error) {
      setMsg({ type: "error", text: "Xəta: " + error.message });
    } else {
      setMsg({ type: "success", text: editId ? "Yeniləndi ✓" : "Əlavə edildi ✓" });
      setForm(EMPTY_FORM); setEditId(null); setShowForm(false);
      fetchMyArticles();
    }
    setTimeout(() => setMsg(null), 3000);
  }

  async function handleDelete(id) {
    if (!confirm("Silinsin?")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (!error) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setMsg({ type: "success", text: "Silindi ✓" });
      setTimeout(() => setMsg(null), 2000);
    }
  }

  function handleEdit(article) {
    setForm({
      title:     article.title,
      tag:       article.tag       || "",
      time:      article.time      || "",
      content:   article.content   || "",
      age_group: article.age_group || "",
      category:  article.category  || "",
      sub_age:   article.sub_age   || "",
      area:      article.area      || "",
    });
    setEditId(article.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Yüklənir...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-25">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-500">
              {profile?.full_name || user?.email} · {profile?.role || "Mütəxəssis"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
            >
              + Məqalə əlavə et
            </button>
            <button
              onClick={async () => { await signOut(); navigate("/login"); }}
              className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
            >
              Çıxış
            </button>
          </div>
        </div>
      </div>

      {/* ── Statistika — yalnız admin ── */}
      {profile?.role === "admin" && stats && (
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {STAT_CARDS.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <FontAwesomeIcon icon={s.icon} className={`${s.color} text-lg`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats[s.key]}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Məzmun ── */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Bildiriş */}
        {msg && (
          <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
            msg.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}>
            {msg.text}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">
                {editId ? "Məqaləni redaktə et" : "Yeni məqalə"}
              </h2>
              <button onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
                className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Başlıq *</label>
                <input value={form.title} onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Məqalənin başlığı..."
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Yaş qrupu *</label>
                <select value={form.age_group} onChange={(e) => handleChange("age_group", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white">
                  <option value="">Seçin...</option>
                  {ageGroups.filter((g) => allowedAgeGroups.includes(g.id)).map((g) => (
                    <option key={g.id} value={g.id}>{g.age} — {g.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Kateqoriya *</label>
                <select value={form.category} onChange={(e) => handleChange("category", e.target.value)}
                  disabled={!form.age_group}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white disabled:opacity-50">
                  <option value="">Seçin...</option>
                  {availableCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {hasSubs && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Alt yaş qrupu</label>
                  <select value={form.sub_age} onChange={(e) => handleChange("sub_age", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white">
                    <option value="">Seçin...</option>
                    {(subAgeGroups["1-6"] || []).map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {hasSubs && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">İnkişaf sahəsi</label>
                  <select value={form.area} onChange={(e) => handleChange("area", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white">
                    <option value="">Seçin...</option>
                    {developmentAreas.map((a) => (
                      <option key={a.id} value={a.id}>{a.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Tag</label>
                <input value={form.tag} onChange={(e) => handleChange("tag", e.target.value)}
                  placeholder="Psixologiya, Motor..."
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Oxu müddəti</label>
                <input value={form.time} onChange={(e) => handleChange("time", e.target.value)}
                  placeholder="5 dəq"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Məzmun</label>
                <textarea value={form.content} onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Məqalənin ətraflı məzmununu buraya yazın..."
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm resize-y leading-relaxed" />
                <p className="text-xs text-gray-400 mt-1">Paraqraflar arası boş sətir buraxın</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleSave}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
                {editId ? "Yenilə" : "Əlavə et"}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
                Ləğv et
              </button>
            </div>
          </div>
        )}

        {/* Məqalələr siyahısı */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Məqalələrim</h2>
            <span className="text-sm text-gray-400">{articles.length} məqalə</span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse h-20" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">📝</p>
              <p>Hələ məqalə yoxdur. Yeni məqalə əlavə edin!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {articles.map((article) => (
                <div key={article.id}
                  className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start justify-between gap-4 hover:shadow-sm transition-shadow">
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/meqale/${article.id}`)}>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                        {article.age_group}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">
                        {article.category}
                      </span>
                      {article.tag && <span className="text-xs text-gray-400">{article.tag}</span>}
                    </div>
                    <h3 className="text-gray-800 font-semibold text-sm leading-snug truncate hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      {article.time && <p className="text-xs text-gray-400">{article.time} oxu</p>}
                      {article.content
                        ? <p className="text-xs text-emerald-500">✓ Məzmun var</p>
                        : <p className="text-xs text-orange-400">⚠ Məzmun yoxdur</p>
                      }
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleEdit(article)}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-3 py-1.5 rounded-lg transition-colors">
                      Redaktə
                    </button>
                    <button onClick={() => handleDelete(article.id)}
                      className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg transition-colors">
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}