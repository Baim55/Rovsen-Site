// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLeaf,
  faEnvelope,
  faLock,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Şifrə sıfırlama state-ləri
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      navigate(profile?.role === "admin" ? "/admin" : "/");
    } catch (err) {
      if (err.message?.includes("Email not confirmed")) {
        setError("Email ünvanınızı təsdiqləyin — göndərilən linkə klikləyin");
      } else {
        setError("Email və ya şifrə yanlışdır");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setResetError(null);
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setResetSent(true);
    } catch (err) {
      setResetError("Email göndərilmədi. Ünvanı yoxlayın.");
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <div className="min-h-screen mt-15 bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-100 p-8">
          {/* ── Şifrəni unutdum modu ── */}
          {forgotMode ? (
            <div>
              <button
                onClick={() => {
                  setForgotMode(false);
                  setResetSent(false);
                  setResetError(null);
                  setResetEmail("");
                }}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                Geri qayıt
              </button>

              {resetSent ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-emerald-500 text-2xl"
                    />
                  </div>
                  <h2
                    className="text-xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    Email göndərildi!
                  </h2>
                  <p className="text-gray-500 text-sm mb-1">
                    <span className="font-semibold text-emerald-600">
                      {resetEmail}
                    </span>
                  </p>
                  <p className="text-gray-400 text-xs mb-6">
                    Linki klikləyin, yeni şifrə təyin edin.
                  </p>
                  <button
                    onClick={() => {
                      setForgotMode(false);
                      setResetSent(false);
                      setResetEmail("");
                    }}
                    className="text-sm text-emerald-600 font-semibold hover:opacity-80 transition-opacity"
                  >
                    Daxil ol səhifəsinə qayıt
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-2xl mb-3 shadow-lg shadow-emerald-200">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="text-white text-xl"
                      />
                    </div>
                    <h2
                      className="text-xl font-bold text-gray-900"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      Şifrəni sıfırla
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Email ünvanınızı daxil edin
                    </p>
                  </div>

                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                      />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 pl-11 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-sm"
                      />
                    </div>

                    {resetError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm flex items-center gap-2">
                        <span>⚠️</span> {resetError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-emerald-200 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      {resetLoading
                        ? "Göndərilir..."
                        : "Sıfırlama linki göndər"}
                    </button>
                  </form>
                </>
              )}
            </div>
          ) : (
            /* ── Normal giriş modu ── */
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4 shadow-lg shadow-emerald-200">
                  <FontAwesomeIcon
                    icon={faLeaf}
                    className="text-white text-2xl"
                  />
                </div>
                <h1
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Xoş gəldiniz
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  İnkişaf Akademiyasına daxil olun
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 pl-11 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-sm"
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Şifrə
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotMode(true);
                        setResetEmail(email);
                      }}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Şifrəni unutdum?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
                      <FontAwesomeIcon icon={showPw ? faEye : faEyeSlash} />
                    </button>
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
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-emerald-200 hover:shadow-lg hover:-translate-y-0.5 mt-2"
                >
                  {loading ? "Giriş edilir..." : "Daxil ol"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Hesabınız yoxdur?{" "}
                <Link
                  to="/register"
                  className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  Qeydiyyat
                </Link>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          © 2025 İnkişaf Akademiyası
        </p>
      </div>
    </div>
  );
}
