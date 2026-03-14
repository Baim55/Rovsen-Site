export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>🌱 → 🌿 → 🌳</span>
          <span>İnkişaf Akademiyası © 2025</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-gray-700 transition-colors">
            Əlaqə
          </a>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Gizlilik
          </a>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Şərtlər
          </a>
        </div>
      </div>
    </footer>
  );
}
