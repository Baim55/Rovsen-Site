import { services } from "../data/data";

function ServicesSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Xidmətlər
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Nə təklif edirik?
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group border-2 border-gray-100 hover:border-emerald-200 rounded-2xl p-6 hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <div className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                {s.title}
              </div>
              <div className="text-sm text-gray-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
