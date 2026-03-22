// src/components/Navlist.jsx
import { Link } from "react-router-dom";
import { navLinks } from "../data/data";

export default function NavList({ mobile = false, onClose }) {
  if (mobile) {
    return (
      <div className="px-6 py-4 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
        {/* Auth düymələri Navbar-dan gəlir — burada yoxdur */}
      </div>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}