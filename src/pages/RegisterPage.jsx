// src/pages/RegisterPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faChild,
  faUserGraduate,
  faUsers,
  faBriefcase,
  faBrain,
  faComments,
  faChalkboardTeacher,
  faHeart,
  faPuzzlePiece,
  faStar,
  faCamera,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

const BASE_ROLES = [
  {
    value: "Uşaq",
    label: "Uşaq",
    icon: faChild,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    desc: "6–17 yaş",
  },
  {
    value: "Tələbə",
    label: "Tələbə",
    icon: faUserGraduate,
    color: "text-blue-500",
    bg: "bg-blue-50",
    desc: "Universitet",
  },
  {
    value: "Valideyn",
    label: "Valideyn",
    icon: faUsers,
    color: "text-amber-500",
    bg: "bg-amber-50",
    desc: "Övladım var",
  },
  {
    value: "Mütəxəssis",
    label: "Mütəxəssis",
    icon: faBriefcase,
    color: "text-violet-500",
    bg: "bg-violet-50",
    desc: "Peşəkar",
  },
];

const SPECIALIST_ROLES = [
  {
    value: "Psixoloqlar",
    label: "Psixoloq",
    icon: faBrain,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    value: "Loqopedlər",
    label: "Loqoped",
    icon: faComments,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    value: "Pedaqoqlar",
    label: "Pedaqoq",
    icon: faChalkboardTeacher,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    value: "EQ",
    label: "EQ Mütəxəssisi",
    icon: faHeart,
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    value: "IQ",
    label: "IQ Mütəxəssisi",
    icon: faPuzzlePiece,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    value: "Mentor",
    label: "Mentor",
    icon: faStar,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    password2: "",
    baseRole: "",
    specRole: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  }

  const finalRole =
    form.baseRole === "Mütəxəssis" ? form.specRole : form.baseRole;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!form.fullName || !form.email || !form.password || !form.baseRole) {
      setError("Bütün sahələri doldurun");
      return;
    }
    if (form.baseRole === "Mütəxəssis" && !form.specRole) {
      setError("Mütəxəssis növünü seçin");
      return;
    }
    if (form.password !== form.password2) {
      setError("Şifrələr uyğun gəlmir");
      return;
    }
    if (form.password.length < 6) {
      setError("Şifrə ən az 6 simvol olmalıdır");
      return;
    }
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      if (authError) throw authError;
      const userId = authData.user?.id;
      if (!userId) throw new Error("User yaradılmadı");

      let avatarUrl = null;
      if (avatar) {
        const ext = avatar.name.split(".").pop();
        const path = `avatars/${userId}.${ext}`;
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
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        full_name: form.fullName,
        role: finalRole,
        avatar_url: avatarUrl,
      });
      if (profileError) throw profileError;
      setSuccess(true);
    } catch (err) {
      setError(
        err.message?.includes("rate limit")
          ? "Çox sayda cəhd. Bir az gözləyin."
          : err.message || "Xəta baş verdi",
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon
              icon={faLeaf}
              className="text-emerald-500 text-2xl"
            />
          </div>
          <h2
            className="text-xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Hesab yaradıldı!
          </h2>
          <p className="text-gray-500 text-sm mb-2">
            <span className="font-semibold text-emerald-600">{form.email}</span>{" "}
            ünvanına təsdiq linki göndərildi.
          </p>
          <p className="text-gray-400 text-xs mb-6">
            Linki kliklədikdən sonra daxil ola bilərsiniz.
          </p>
          <Link
            to="/login"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            Daxil ol →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 pt-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4 py-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* ── Sol panel ── */}
            <div className="lg:col-span-2 bg-gradient-to-b from-emerald-500 to-teal-600 p-8 flex flex-col justify-between text-white">
              <div>
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faLeaf}
                      className="text-white text-lg"
                    />
                  </div>
                  <span className="font-bold text-sm opacity-90">
                    İnkişaf Akademiyası
                  </span>
                </div>

                <h1
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Xoş gəldiniz
                </h1>
                <p className="text-emerald-100 text-sm leading-relaxed mb-8">
                  Yaşınıza və sahənizə uyğun resurslardan yararlanın.
                </p>

                {/* Avatar */}
                <label className="cursor-pointer block">
                  <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-white/40 hover:border-white/80 transition-colors overflow-hidden flex items-center justify-center bg-white/10 mb-2">
                    {preview ? (
                      <img
                        src={preview}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <FontAwesomeIcon
                          icon={faCamera}
                          className="text-white/60 text-2xl"
                        />
                        <div className="text-xs text-white/50 mt-1">Şəkil</div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatar}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-emerald-200">
                  Profil şəkli (istəyə bağlı)
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-emerald-100 text-xs mb-1">
                  Artıq hesabınız var?
                </p>
                <Link
                  to="/login"
                  className="text-white font-semibold text-sm hover:opacity-80 transition-opacity"
                >
                  Daxil olun →
                </Link>
              </div>
            </div>

            {/* ── Sağ panel ── */}
            <div
              className="lg:col-span-3 p-8 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Hesab yaradın
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Bütün sahələri doldurun
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rol seçimi */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 tracking-wide">
                    Siz kimsiniz? 
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {BASE_ROLES.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => {
                          handleChange("baseRole", r.value);
                          handleChange("specRole", "");
                        }}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left ${
                          form.baseRole === r.value
                            ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                            : "border-gray-100 text-gray-600 hover:border-emerald-200 hover:bg-emerald-50/50"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg ${form.baseRole === r.value ? r.bg : "bg-gray-100"} flex items-center justify-center flex-shrink-0`}
                        >
                          <FontAwesomeIcon
                            icon={r.icon}
                            className={`text-sm ${form.baseRole === r.value ? r.color : "text-gray-400"}`}
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold">{r.label}</div>
                          <div className="text-xs text-gray-400">{r.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mütəxəssis sahəsi */}
                {form.baseRole === "Mütəxəssis" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                      Sahəniz *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SPECIALIST_ROLES.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => handleChange("specRole", r.value)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                            form.specRole === r.value
                              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                              : "border-gray-100 text-gray-600 hover:border-emerald-200"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-md ${form.specRole === r.value ? r.bg : "bg-gray-100"} flex items-center justify-center flex-shrink-0`}
                          >
                            <FontAwesomeIcon
                              icon={r.icon}
                              className={`text-xs ${form.specRole === r.value ? r.color : "text-gray-400"}`}
                            />
                          </div>
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ad Soyad + Email */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      required
                      placeholder="Aynur Həsənova"
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none text-gray-800 bg-gray-50 focus:bg-white text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      placeholder="email@example.com"
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none text-gray-800 bg-gray-50 focus:bg-white text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Şifrə + Təkrar */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                      Şifrə *
                    </label>
                    <div className="relative">
                      <input
                        type={showPw ? "text" : "password"}
                        value={form.password}
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                        required
                        placeholder="••••••••"
                        className="w-full px-3 py-2.5 pr-10 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none text-gray-800 bg-gray-50 focus:bg-white text-sm transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                      >
                        <FontAwesomeIcon icon={showPw ? faEye : faEyeSlash} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                      Təkrar *
                    </label>
                    <div className="relative">
                      <input
                        type={showPw2 ? "text" : "password"}
                        value={form.password2}
                        onChange={(e) =>
                          handleChange("password2", e.target.value)
                        }
                        required
                        placeholder="••••••••"
                        className="w-full px-3 py-2.5 pr-10 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none text-gray-800 bg-gray-50 focus:bg-white text-sm transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw2(!showPw2)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                      >
                        <FontAwesomeIcon icon={showPw2 ? faEye : faEyeSlash} />
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm flex items-center gap-2">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-emerald-200/50 hover:-translate-y-0.5 mt-2"
                >
                  {loading ? "Hesab yaradılır..." : "Qeydiyyatdan keç →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
