// src/pages/ProfilePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCamera,
  faPen,
  faEnvelope,
  faUser,
  faShield,
  faLock,
  faEye,
  faEyeSlash,
  faRightFromBracket,
  faCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(profile?.avatar_url || null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState(null);

  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
          Yüklənir...
        </div>
      </div>
    );

  if (!user) {
    navigate("/login");
    return null;
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
      if (avatar) {
        const ext = avatar.name.split(".").pop();
        const path = `avatars/${user.id}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, avatar, { upsert: true });
        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(path);
          avatarUrl = urlData.publicUrl;
        }
      }
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName, avatar_url: avatarUrl })
        .eq("id", user.id);
      if (error) throw error;
      setMsg({ type: "success", text: "Profil yeniləndi" });
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
      setPwMsg({ type: "error", text: "Şifrələr uyğun gəlmir" });
      return;
    }
    if (newPassword.length < 6) {
      setPwMsg({ type: "error", text: "Şifrə ən az 6 simvol" });
      return;
    }
    setPwLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      setPwMsg({ type: "success", text: "Şifrə dəyişdirildi" });
      setNewPassword("");
      setNewPassword2("");
    } catch (err) {
      setPwMsg({ type: "error", text: err.message });
    } finally {
      setPwLoading(false);
      setTimeout(() => setPwMsg(null), 3000);
    }
  }

  const initials = (profile?.full_name || user.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const ROLE_COLORS = {
    admin: "bg-rose-100 text-rose-700",
    Psixoloqlar: "bg-purple-100 text-purple-700",
    Loqopedlər: "bg-blue-100 text-blue-700",
    Pedaqoqlar: "bg-emerald-100 text-emerald-700",
    EQ: "bg-pink-100 text-pink-700",
    IQ: "bg-amber-100 text-amber-700",
    Mentor: "bg-teal-100 text-teal-700",
    Uşaq: "bg-green-100 text-green-700",
    Tələbə: "bg-indigo-100 text-indigo-700",
    Valideyn: "bg-orange-100 text-orange-700",
  };
  const roleColor = ROLE_COLORS[profile?.role] || "bg-gray-100 text-gray-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 mt-25">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            Geri
          </button>
          <h1 className="text-lg font-bold text-gray-900">Profilim</h1>
          <button
            onClick={async () => {
              await signOut();
              navigate("/");
            }}
            className="cursor-pointer flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
            Çıxış
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-5">
        {/* ── Avatar kart ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Gradient header */}
          <div className="h-20 bg-gradient-to-r from-emerald-400 to-teal-400" />

          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              {/* Avatar */}
              <label className="cursor-pointer group relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-emerald-600">
                        {initials}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-md transition-colors">
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="text-white text-xs"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  className="hidden"
                />
              </label>

              {/* Rol badge */}
              {profile?.role && (
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${roleColor}`}
                >
                  {profile.role}
                </span>
              )}
            </div>

            <h2 className="text-lg font-bold text-gray-900">
              {profile?.full_name || "İstifadəçi"}
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-xs text-gray-400"
              />
              {user.email}
            </p>
          </div>
        </div>

        {/* ── Profil məlumatları ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="text-emerald-500 text-sm"
              />
            </div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Şəxsi məlumatlar
            </h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Ad Soyad
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ad Soyad"
                  className="w-full px-4 py-3 pl-11 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-sm"
                />
                <FontAwesomeIcon
                  icon={faPen}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-3 pl-11 rounded-xl border-2 border-gray-100 text-gray-400 bg-gray-50 text-sm cursor-not-allowed"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"
                />
              </div>
            </div>

            {msg && (
              <div
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                  msg.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <FontAwesomeIcon
                  icon={
                    msg.type === "success" ? faCheck : faTriangleExclamation
                  }
                  className="text-xs"
                />
                {msg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              {loading ? "Saxlanılır..." : "Dəyişiklikləri saxla"}
            </button>
          </form>
        </div>

        {/* ── Şifrə dəyişikliyi ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Yeni şifrə
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-11 pr-12 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-sm"
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={showPw ? faEye : faEyeSlash}
                    className="text-xs"
                  />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Yeni şifrə təkrar
              </label>
              <div className="relative">
                <input
                  type={showPw2 ? "text" : "password"}
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-11 pr-12 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-sm"
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPw2(!showPw2)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={showPw2 ? faEye : faEyeSlash}
                    className="text-xs"
                  />
                </button>
              </div>
            </div>

            {pwMsg && (
              <div
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                  pwMsg.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <FontAwesomeIcon
                  icon={
                    pwMsg.type === "success" ? faCheck : faTriangleExclamation
                  }
                  className="text-xs"
                />
                {pwMsg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={pwLoading}
              className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              {pwLoading ? "Dəyişdirilir..." : "Şifrəni yenilə"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
