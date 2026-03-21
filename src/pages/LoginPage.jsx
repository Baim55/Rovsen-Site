// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate   = useNavigate();

  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [error,       setError]       = useState(null);
  const [loading,     setLoading]     = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);

      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const isSpecialist = ["admin","Psixoloqlar","Loqopedlər",
                            "Pedaqoqlar","EQ","IQ","Mentor"].includes(profile?.role);
      navigate(isSpecialist ? "/admin" : "/");

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

  return (
    <div className="min-h-screen mt-15 bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-100 p-8">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4 shadow-lg shadow-emerald-200">
              <span className="text-3xl">🎓</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Xoş gəldiniz
            </h1>
            <p className="text-gray-500 text-sm mt-1">İnkişaf Akademiyasına daxil olun</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-sm"
              />
            </div>

            {/* Şifrə */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Şifrə</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none transition-colors text-gray-800 bg-gray-50 focus:bg-white text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} />
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
            <Link to="/register" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              Qeydiyyat
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">© 2025 İnkişaf Akademiyası</p>
      </div>
    </div>
  );
}