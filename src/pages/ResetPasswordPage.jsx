// src/pages/ResetPasswordPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash, faLeaf } from "@fortawesome/free-solid-svg-icons";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password,  setPassword]  = useState("");
  const [password2, setPassword2] = useState("");
  const [showPw,    setShowPw]    = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(null);
  const [success,   setSuccess]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== password2) { setError("Şifrələr uyğun gəlmir"); return; }
    if (password.length < 6)    { setError("Şifrə ən az 6 simvol olmalıdır"); return; }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError("Şifrə yenilənmədi. Linkin müddəti bitmiş ola bilər.");
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-emerald-100 p-8">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-2xl mb-3 shadow-lg shadow-emerald-200">
            <FontAwesomeIcon icon={success ? faLeaf : faLock} className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
            {success ? "Şifrə yeniləndi!" : "Yeni şifrə təyin edin"}
          </h1>
          {success && <p className="text-gray-500 text-sm mt-2">Giriş səhifəsinə yönləndirilirsiniz...</p>}
        </div>

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input type={showPw ? "text" : "password"} value={password}
                onChange={e => setPassword(e.target.value)} required placeholder="Yeni şifrə"
                className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none bg-gray-50 focus:bg-white text-sm transition-colors" />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={showPw ? faEye : faEyeSlash} />
              </button>
            </div>

            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input type={showPw ? "text" : "password"} value={password2}
                onChange={e => setPassword2(e.target.value)} required placeholder="Şifrəni təkrarlayın"
                className="w-full pl-11 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none bg-gray-50 focus:bg-white text-sm transition-colors" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:-translate-y-0.5">
              {loading ? "Yenilənir..." : "Şifrəni yenilə"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}