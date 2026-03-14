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
        <div className="pt-3 flex gap-3">
          <button className="flex-1 text-sm border border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium">
            Daxil ol
          </button>
          <button className="flex-1 bg-emerald-500 text-white text-sm py-2.5 rounded-xl font-semibold">
            Qeydiyyat
          </button>
        </div>
      </div>
    );
  }

  return (
    <nav className="hidden md:flex items-center gap-1">
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
