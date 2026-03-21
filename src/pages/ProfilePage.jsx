// src/pages/ProfilePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [fullName,  setFullName]  = useState(profile?.full_name  || "");
  const [avatar,    setAvatar]    = useState(null);
  const [preview,   setPreview]   = useState(profile?.avatar_url || null);
  const [loading,   setLoading]   = useState(false);
  const [msg,       setMsg]       = useState(null);

  // Şifrə dəyişikliyi
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2,setNewPassword2]= useState("");
  const [pwLoading,   setPwLoading]   = useState(false);
  const [pwMsg,       setPwMsg]       = useState(null);

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">Yüklənir...</div>
  );

  if (!user) {
    navigate("/login"); return null;
  }

  function handleAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSaveProfile(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      let avatarUrl = profile?.avatar_url || null;

      // Avatar yüklə
      if (avatar) {
        const ext  = avatar.name.split(".").pop();
        const path = `avatars/${user.id}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, avatar, { upsert: true });
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
          avatarUrl = urlData.publicUrl;
        }
      }

      // Profili yenilə
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName, avatar_url: avatarUrl })
        .eq("id", user.id);

      if (error) throw error;
      setMsg({ type: "success", text: "Profil yeniləndi ✓" });
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(null), 3000);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPwMsg(null);

    if (newPassword !== newPassword2) {
      setPwMsg({ type: "error", text: "Şifrələr uyğun gəlmir" }); return;
    }
    if (newPassword.length < 6) {
      setPwMsg({ type: "error", text: "Şifrə ən az 6 simvol olmalıdır" }); return;
    }

    setPwLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPwMsg({ type: "success", text: "Şifrə dəyişdirildi ✓" });
      setOldPassword(""); setNewPassword(""); setNewPassword2("");
    } catch (err) {
      setPwMsg({ type: "error", text: err.message });
    } finally {
      setPwLoading(false);
      setTimeout(() => setPwMsg(null), 3000);
    }
  }

  const initials = (profile?.full_name || user.email || "U")
    .split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 mt-25">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
              ← Geri
            </button>
            <h1 className="text-xl font-bold text-gray-900">Profilim</h1>
          </div>
          <button
            onClick={async () => { await signOut(); navigate("/"); }}
            className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Çıxış
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">

        {/* Profil məlumatları */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-800 mb-6">Şəxsi məlumatlar</h2>

          <form onSubmit={handleSaveProfile} className="space-y-5">

            {/* Avatar */}
            <div className="flex items-center gap-5">
              <label className="cursor-pointer group relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-emerald-100 flex items-center justify-center border-2 border-dashed border-gray-200 group-hover:border-emerald-400 transition-colors">
                  {preview
                    ? <img src={preview} alt="avatar" className="w-full h-full object-cover" />
                    : <span className="text-2xl font-bold text-emerald-600">{initials}</span>
                  }
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs shadow">
                  ✎
                </div>
                <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
              </label>
              <div>
                <p className="text-sm font-semibold text-gray-800">{profile?.full_name || "İstifadəçi"}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                {profile?.role && (
                  <span className="inline-block mt-1 text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-full">
                    {profile.role}
                  </span>
                )}
              </div>
            </div>

            {/* Ad Soyad */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Ad Soyad</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ad Soyad"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-sm"
              />
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-gray-400 bg-gray-50 text-sm cursor-not-allowed"
              />
            </div>

            {msg && (
              <div className={`px-4 py-3 rounded-xl text-sm font-medium ${
                msg.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}>
                {msg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              {loading ? "Saxlanılır..." : "Yadda saxla"}
            </button>
          </form>
        </div>

        {/* Şifrə dəyişikliyi */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-800 mb-6">Şifrəni dəyiş</h2>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Yeni şifrə</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Yeni şifrə təkrar</label>
              <input
                type="password"
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-sm"
              />
            </div>

            {pwMsg && (
              <div className={`px-4 py-3 rounded-xl text-sm font-medium ${
                pwMsg.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}>
                {pwMsg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={pwLoading}
              className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              {pwLoading ? "Dəyişdirilir..." : "Şifrəni dəyiş"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}