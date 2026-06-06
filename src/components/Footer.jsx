// src/components/Footer.jsx
import { Link } from "react-router-dom";
import logo from "../assets/img/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faArrowRight,
  faLocationDot,
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
  { label: "Xidmətlər", href: "/training" },
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
  { icon: faYoutube,  href: "#", label: "YouTube"  },
];

const CONTACT_ITEMS = [
  {
    icon: faEnvelope,
    href: "mailto:rovshan.academy@gmail.com",
    text: "rovshan.academy@gmail.com",
  },
  {
    icon: faPhone,
    href: "tel:+994506773427",
    text: "+994 50 677 34 27",
  },
  {
    icon: faLocationDot,
    href: "#",
    text: "Binəqədi r., Ə.Məmmədov 7",
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-500">
      {/* ── Əsas hissə ── */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brend */}
        <div className="lg:col-span-1">
          <a href="/" className="inline-block mb-4">
            <img
              src={logo}
              alt="Rovshan Academy"
              className="h-14 w-auto object-contain"
            />
          </a>
          <p className="text-sm font-bold text-gray-800 mb-2">Rovshan Academy</p>
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
            {CONTACT_ITEMS.map((item) => (
              <li key={item.text}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-emerald-500 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 flex items-center justify-center transition-colors flex-shrink-0">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-xs text-gray-400 group-hover:text-emerald-500 transition-colors"
                    />
                  </div>
                  <span className="leading-snug">{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Alt xətt ── */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © 2026 Rovshan Academy. Bütün hüquqlar qorunur.
          </p>
          <div className="flex items-center gap-5">
            <span className="text-xs text-gray-400 hover:text-emerald-500 transition-colors cursor-pointer">
              Gizlilik siyasəti
            </span>
            <span className="text-xs text-gray-400 hover:text-emerald-500 transition-colors cursor-pointer">
              İstifadə şərtləri
            </span>
            <a
              href="/contact"
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