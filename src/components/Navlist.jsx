// src/components/Navlist.jsx
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data/data";

export default function NavList({ mobile = false, onClose }) {
  const { pathname } = useLocation();

  if (mobile) {
    return (
      <div className="px-6 py-4 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              to={link.href}
              onClick={onClose}
              className={`block px-3 py-2.5 text-sm rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.label}
            to={link.href}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 font-medium ${
              isActive
                ? "text-emerald-600 bg-emerald-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {link.label}

          </Link>
        );
      })}
    </nav>
  );
}