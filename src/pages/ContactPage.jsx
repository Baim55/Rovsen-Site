// src/pages/ContactPage.jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faCommentDots,
  faCheck,
  faLocationDot,
  faClock,
  faHeadset,
  faArrowRight,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

const INFO_CARDS = [
  {
    icon: faLocationDot,
    bg: "bg-emerald-50",
    color: "text-emerald-600",
    border: "border-emerald-100",
    title: "Ünvan",
    lines: ["Binəqədi rayonu, Ə.Məmmədov 7"],
  },
  {
    icon: faPhone,
    bg: "bg-blue-50",
    color: "text-blue-600",
    border: "border-blue-100",
    title: "Telefon",
    lines: ["+994 50 677 34 27"],
  },
  {
    icon: faEnvelope,
    bg: "bg-violet-50",
    color: "text-violet-600",
    border: "border-violet-100",
    title: "Email",
    lines: ["rovshan.academy@gmail.com", " sabinarahimova74@gmail.com"],
  },
  {
    icon: faClock,
    bg: "bg-amber-50",
    color: "text-amber-600",
    border: "border-amber-100",
    title: "İş saatları",
    lines: ["Həftə içi: 09:00 – 19:00", "Şənbə: 10:00 – 16:00"],
  },
];

const SOCIALS = [
  {
    icon: faInstagram,
    label: "Instagram",
    color: "text-pink-500",
    bg: "bg-pink-50",
    href: "#",
  },
  {
    icon: faFacebook,
    label: "Facebook",
    color: "text-blue-600",
    bg: "bg-blue-50",
    href: "#",
  },
  {
    icon: faWhatsapp,
    label: "WhatsApp",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    href: "#",
  },
  {
    icon: faTelegram,
    label: "Telegram",
    color: "text-sky-500",
    bg: "bg-sky-50",
    href: "#",
  },
];


const EMAILJS_SERVICE_ID = "service_n9o155d";
const EMAILJS_TEMPLATE_ID = "template_vx3hrd8";
const EMAILJS_PUBLIC_KEY = "N2VyMm9ew6Fna2gbg";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
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

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
    } catch {
      alert("Mesaj göndərilmədi. Yenidən cəhd edin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* ── Hero banner ── */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-emerald-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-600 text-xs font-semibold px-4 py-2 rounded-full mb-6 shadow-sm">
            <FontAwesomeIcon icon={faHeadset} />
            Dəstək mərkəzi
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Bizimlə əlaqə saxlayın
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Sualınız var? Konsultasiya almaq istəyirsiniz? Komandamız sizə kömək
            etməyə hazırdır.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* ── Info kartları ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {INFO_CARDS.map((card) => (
            <div
              key={card.title}
              className={`bg-white rounded-2xl p-5 border ${card.border} shadow-sm hover:shadow-md transition-shadow`}
            >
              <div
                className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-4`}
              >
                <FontAwesomeIcon
                  icon={card.icon}
                  className={`${card.color} text-sm`}
                />
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {card.title}
              </p>
              {card.lines.map((line) => (
                <p key={line} className="text-sm text-gray-700 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* ── Əsas məzmun: forma + xəritə ── */}
        <div className="grid lg:grid-cols-5 gap-8 mb-14">
          {/* Forma — 3 sütun */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2
                className="text-2xl font-bold text-gray-900 mb-1"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Mesaj göndərin
              </h2>
              <p className="text-sm text-gray-400 mb-7">
                Formu doldurun, tezliklə əlaqə saxlayaq.
              </p>

              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-emerald-500 text-2xl"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Mesaj göndərildi!
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Tezliklə sizinlə əlaqə saxlayacağıq.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({
                        name: "",
                        phone: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="text-sm text-emerald-600 font-semibold hover:opacity-80 transition-opacity"
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"
                      />
                      <input
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Adınız"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm focus:border-emerald-400 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"
                      />
                      <input
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Telefon"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm focus:border-emerald-400 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Email ünvanınız"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm focus:border-emerald-400 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"
                    />
                    <select
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-gray-600 appearance-none"
                    >
                      <option value="">Mövzunu seçin</option>
                      <option>Psixoloji konsultasiya</option>
                      <option>Nitq inkişafı (Loqopediya)</option>
                      <option>Müəllim təlimləri</option>
                      <option>Valideyn seminarı</option>
                      <option>Yeniyetmə proqramı</option>
                      <option>Digər</option>
                    </select>
                  </div>

                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faCommentDots}
                      className="absolute left-4 top-4 text-gray-300 text-xs"
                    />
                    <textarea
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Mesajınız..."
                      rows={5}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm focus:border-emerald-400 focus:bg-white focus:outline-none transition-all resize-none"
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
                      <>
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          className="text-xs"
                        />
                        Göndər
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sağ panel — 2 sütun */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Xəritə */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex-1 min-h-[240px]">
              <iframe
                title="Rovshan Academy xəritə"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.123456789!2d49.8671!3d40.4093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI0JzMzLjUiTiA0OcKwNTInMDEuNiJF!5e0!3m2!1saz!2saz!4v1680000000000!5m2!1saz!2saz"
                width="100%"
                height="100%"
                className="min-h-[240px] w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
