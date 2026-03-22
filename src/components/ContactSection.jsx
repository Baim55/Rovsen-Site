// src/components/ContactSection.jsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faCommentDots,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  }

  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Başlıq */}
        <div className="text-center mb-10">
          <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-3">
            ƏLAQƏ
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Mütəxəssislə əlaqə
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Sualınız var? Konsultasiya almaq istəyirsiniz? Bizə yazın.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-3xl p-8 border border-gray-100 shadow-sm">
          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-emerald-500 text-2xl"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Mesaj göndərildi!
              </h3>
              <p className="text-gray-500 text-sm">
                Tezliklə sizinlə əlaqə saxlayacağıq.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", phone: "", email: "", message: "" });
                }}
                className="mt-6 text-sm text-emerald-600 font-semibold hover:opacity-80 transition-opacity"
              >
                Yeni mesaj göndər
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                  />
                  <input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Adınız"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                  />
                  <input
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="Telefon"
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <FontAwesomeIcon
                  icon={faCommentDots}
                  className="absolute left-4 top-4 text-gray-400 text-xs"
                />
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Mesajınız..."
                  rows={4}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm focus:border-emerald-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Göndərilir...
                  </>
                ) : (
                  <>Göndər</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
