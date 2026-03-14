function ContactSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
          Əlaqə
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Mütəxəssislə əlaqə
        </h2>
        <p className="text-gray-500 mb-10">
          Sualınız var? Konsultasiya almaq istəyirsiniz? Bizə yazın.
        </p>
        <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Adınız"
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 transition-colors w-full"
            />
            <input
              placeholder="Telefon"
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 transition-colors w-full"
            />
          </div>
          <input
            placeholder="Email"
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 transition-colors w-full mb-4"
          />
          <textarea
            placeholder="Mesajınız..."
            rows={4}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 transition-colors w-full resize-none mb-4"
          />
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg">
            Göndər →
          </button>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
