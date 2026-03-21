import { useState, useEffect } from "react";
import NavList from "./Navlist";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { user, profile } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSpecialist = ["admin","Psixoloqlar","Loqopedlər",
                        "Pedaqoqlar","EQ","IQ","Mentor"].includes(profile?.role);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-white/90 backdrop-blur-sm py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        {/* Desktop NavList */}
        <NavList />

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              {/* Admin Panel düyməsi — yalnız mütəxəssislərə */}
              {isSpecialist && (
                <button
                  onClick={() => navigate("/admin")}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium transition-colors"
                >
                  <FontAwesomeIcon icon={faGear} />
                  Admin
                </button>
              )}

              {/* Profil düyməsi */}
              <button
                onClick={() => navigate("/profil")}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="avatar"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
                {profile?.full_name?.split(" ")[0] || "Profilim"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Daxil ol
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Qeydiyyat
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menyu"
        >
          <div className={`w-5 h-0.5 bg-gray-700 mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-5 h-0.5 bg-gray-700 mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile NavList */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <NavList mobile onClose={() => setMenuOpen(false)} />
          {/* Mobile auth buttons */}
          <div className="px-6 py-4 flex flex-col gap-2 border-t border-gray-100">
            {user ? (
              <>
                {isSpecialist && (
                  <button
                    onClick={() => { navigate("/admin"); setMenuOpen(false); }}
                    className="flex items-center gap-2 text-sm text-gray-600 font-medium py-2"
                  >
                    <FontAwesomeIcon icon={faGear} /> Admin Panel
                  </button>
                )}
                <button
                  onClick={() => { navigate("/profil"); setMenuOpen(false); }}
                  className="flex items-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
                >
                  <FontAwesomeIcon icon={faUser} />
                  {profile?.full_name?.split(" ")[0] || "Profilim"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { navigate("/login"); setMenuOpen(false); }}
                  className="text-sm text-gray-600 font-medium py-2"
                >
                  Daxil ol
                </button>
                <button
                  onClick={() => { navigate("/register"); setMenuOpen(false); }}
                  className="bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
                >
                  Qeydiyyat
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}