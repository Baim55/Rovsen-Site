import { useState, useEffect } from "react";
import NavList from "./Navlist";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-3"
          : "bg-white/90 backdrop-blur-sm py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        {/* Desktop NavList */}
        <NavList />

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Daxil ol
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
            Qeydiyyat
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menyu"
        >
          <div
            className={`w-5 h-0.5 bg-gray-700 mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <div
            className={`w-5 h-0.5 bg-gray-700 mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile NavList */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <NavList mobile onClose={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
