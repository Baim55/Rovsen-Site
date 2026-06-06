// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faEnvelope,
  faPhone,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const NAV_LINKS = [
  { label: "Ana səhifə", href: "/" },
  { label: "Akademiya", href: "/academy" },
  { label: "Təlimlər", href: "/training" },
  { label: "Resurslar", href: "/resources" },
  { label: "Mütəxəssislər", href: "/specialists" },
  { label: "Media", href: "/media" },
];

const AGE_GROUPS = [
  { label: "1–6 yaş", href: "/yas/1-6" },
  { label: "6–10 yaş", href: "/yas/6-10" },
  { label: "11–17 yaş", href: "/yas/11-17" },
  { label: "18+ yaş", href: "/yas/18+" },
];

const SOCIAL = [
  {
    icon: faInstagram,
    href: "https://www.instagram.com/rovshan.academy?igsh=Z3czOTl6cGptdnpn",
    label: "Instagram",
  },
  {
    icon: faFacebook,
    href: "https://www.facebook.com/share/1B8z9VWnF7/",
    label: "Facebook",
  },
  { icon: faLinkedin, href: "#", label: "LinkedIn" },
  { icon: faYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-500">
      {/* ── Əsas hissə ── */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brend */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
              <FontAwesomeIcon icon={faLeaf} className="text-white text-sm" />
            </div>
            <span className="text-gray-900 font-bold text-sm leading-tight">
              Rovshan
              <br />
              Academy
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-6 text-gray-400">
            Uşaqlar, yeniyetmələr, valideynlər və mütəxəssislər üçün elmi əsaslı
            inkişaf proqramları.
          </p>

          {/* Sosial şəbəkələr */}
          <div className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-emerald-500 flex items-center justify-center transition-all duration-200 group"
              >
                <FontAwesomeIcon
                  icon={s.icon}
                  className="text-gray-500 group-hover:text-white text-sm transition-colors"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Naviqasiya */}
        <div>
          <h4 className="text-gray-900 text-xs font-bold uppercase tracking-widest mb-5">
            Səhifələr
          </h4>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.href}
                  className="text-sm text-gray-400 hover:text-emerald-500 transition-colors flex items-center gap-1.5 group"
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Yaş qrupları */}
        <div>
          <h4 className="text-gray-900 text-xs font-bold uppercase tracking-widest mb-5">
            Yaş qrupları
          </h4>
          <ul className="space-y-2.5">
            {AGE_GROUPS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.href}
                  className="text-sm text-gray-400 hover:text-emerald-500 transition-colors flex items-center gap-1.5 group"
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Əlaqə */}
        <div>
          <h4 className="text-gray-900 text-xs font-bold uppercase tracking-widest mb-5">
            Əlaqə
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href="mailto:info@inkishaf.az"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-emerald-500 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors flex-shrink-0">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-xs text-emerald-500"
                  />
                </div>
                info@inkishaf.az
              </a>
            </li>
            <li>
              <a
                href="tel:+994506773427"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-emerald-500 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors flex-shrink-0">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-xs text-emerald-500"
                  />
                </div>
                +994 50 677 34 27
              </a>
            </li>
          </ul>

          {/* Newsletter */}
          <div className="mt-6">
            <p className="text-xs text-gray-400 mb-3">
              Xəbərlərdən xəbərdar olun
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl transition-colors shadow-sm">
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Alt xətt ── */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © 2026 Rovshan Academy. Bütün hüquqlar qorunur.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-emerald-500 transition-colors"
            >
              Gizlilik siyasəti
            </a>
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-emerald-500 transition-colors"
            >
              İstifadə şərtləri
            </a>
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-emerald-500 transition-colors"
            >
              Əlaqə
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
