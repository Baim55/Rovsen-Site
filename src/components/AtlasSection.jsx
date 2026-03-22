import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling, faLeaf, faTree, faGraduationCap,
  faChild, faUsers, faBriefcase, faUserGraduate,
  faArrowRight, faArrowLeft, faCheck,
  faBookOpen, faHeart, faBrain,
} from "@fortawesome/free-solid-svg-icons";

const STEPS = {
  age: {
    title: "Neçə yaşınız var?",
    options: [
      { value: "1-6",   label: "1–6 yaş",   desc: "Erkən uşaqlıq",  icon: faSeedling,     color: "text-amber-500",   bg: "bg-amber-50",   border: "border-amber-200",   active: "border-amber-400 bg-amber-50" },
      { value: "6-10",  label: "6–10 yaş",  desc: "İbtidai dövr",   icon: faLeaf,          color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", active: "border-emerald-400 bg-emerald-50" },
      { value: "11-17", label: "11–17 yaş", desc: "Yeniyetməlik",   icon: faTree,          color: "text-blue-500",    bg: "bg-blue-50",    border: "border-blue-200",    active: "border-blue-400 bg-blue-50" },
      { value: "18+",   label: "18+ yaş",   desc: "Gənclik",        icon: faGraduationCap, color: "text-violet-500",  bg: "bg-violet-50",  border: "border-violet-200",  active: "border-violet-400 bg-violet-50" },
    ],
  },
  role: {
    title: "Siz kimsiniz?",
    options: [
      { value: "usaq",       label: "Uşaq",       desc: "Özüm üçün",      icon: faChild,         color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", active: "border-emerald-400 bg-emerald-50" },
      { value: "valideyn",   label: "Valideyn",   desc: "Övladım üçün",   icon: faUsers,         color: "text-amber-500",   bg: "bg-amber-50",   border: "border-amber-200",   active: "border-amber-400 bg-amber-50" },
      { value: "telebe",     label: "Tələbə",     desc: "Özüm üçün",      icon: faUserGraduate,  color: "text-blue-500",    bg: "bg-blue-50",    border: "border-blue-200",    active: "border-blue-400 bg-blue-50" },
      { value: "mutexessis", label: "Mütəxəssis", desc: "Peşəkar məqsəd", icon: faBriefcase,     color: "text-violet-500",  bg: "bg-violet-50",  border: "border-violet-200",  active: "border-violet-400 bg-violet-50" },
    ],
  },
};

const RESULTS = {
  "1-6_usaq":         { title: "Oyun əsaslı inkişaf",       desc: "1–6 yaş üçün oyun, musiqi və duyusal fəaliyyətlər",        icon: faSeedling,     color: "text-amber-500",   link: "/yas/1-6" },
  "1-6_valideyn":     { title: "Erkən yaş valideyn bələdçisi", desc: "Uşağınızın ilk illərini necə dəstəkləyəcəyinizi öyrənin", icon: faHeart,        color: "text-rose-500",    link: "/yas/1-6" },
  "1-6_telebe":       { title: "Erkən inkişaf resursları",   desc: "1–6 yaş inkişafı haqqında elmi məqalələr",                 icon: faSeedling,     color: "text-amber-500",   link: "/yas/1-6" },
  "1-6_mutexessis":   { title: "Mütəxəssis resursları",      desc: "Pedaqoq, psixoloq və loqopedlər üçün metodikalar",         icon: faBriefcase,    color: "text-violet-500",  link: "/yas/1-6" },
  "6-10_usaq":        { title: "Akademik inkişaf",           desc: "Oxu, riyaziyyat və yaradıcı düşüncə oyunları",             icon: faLeaf,         color: "text-emerald-500", link: "/yas/6-10" },
  "6-10_valideyn":    { title: "Məktəb dövrü dəstəyi",      desc: "Övladınızın məktəb həyatına uyğunlaşmasına kömək",          icon: faHeart,        color: "text-rose-500",    link: "/yas/6-10" },
  "6-10_telebe":      { title: "İbtidai dövr resursları",   desc: "6–10 yaş inkişafı haqqında məqalələr",                     icon: faLeaf,         color: "text-emerald-500", link: "/yas/6-10" },
  "6-10_mutexessis":  { title: "İbtidai dövr metodikaları", desc: "Sinif idarəetməsi və fərdi yanaşma strategiyaları",         icon: faBriefcase,    color: "text-violet-500",  link: "/yas/6-10" },
  "11-17_usaq":       { title: "Yeniyetmə inkişafı",        desc: "Özünüdərk, liderlik və akademik uğur məqalələri",          icon: faTree,         color: "text-blue-500",    link: "/yas/11-17" },
  "11-17_valideyn":   { title: "Yeniyetmə ilə ünsiyyət",    desc: "Münaqişəsiz ünsiyyət qurma praktiki tövsiyələri",          icon: faHeart,        color: "text-rose-500",    link: "/yas/11-17" },
  "11-17_telebe":     { title: "Yeniyetmə inkişafı",        desc: "11–17 yaş üçün akademik və sosial inkişaf məqalələri",     icon: faTree,         color: "text-blue-500",    link: "/yas/11-17" },
  "11-17_mutexessis": { title: "Yeniyetmə psixologiyası",   desc: "Müasir yanaşmalar və terapevtik metodlar",                 icon: faBrain,        color: "text-purple-500",  link: "/yas/11-17" },
  "18+_usaq":         { title: "Gənclik inkişafı",          desc: "18+ yaş üçün özünüidarə və inkişaf resursları",            icon: faGraduationCap,color: "text-violet-500",  link: "/yas/18+" },
  "18+_valideyn":     { title: "Gənc yetkinlərlə münasibət",desc: "18+ övladınızla sağlam münasibət qurmaq",                  icon: faHeart,        color: "text-rose-500",    link: "/yas/18+" },
  "18+_telebe":       { title: "Akademik uğur",             desc: "Öyrənmə strategiyaları və karyera planlaması",             icon: faUserGraduate, color: "text-blue-500",    link: "/yas/18+" },
  "18+_mutexessis":   { title: "Professional inkişaf",      desc: "Mentor, kouç və mütəxəssislər üçün resurslar",             icon: faBriefcase,    color: "text-violet-500",  link: "/yas/18+" },
  "default":          { title: "İnkişaf resursları",        desc: "Sizə uyğun məqalə və resursları kəşf edin",               icon: faBookOpen,     color: "text-emerald-500", link: "/yas/1-6" },
};

export default function AtlasSection() {
  const navigate = useNavigate();
  const [step, setStep] = useState("age");
  const [age,  setAge]  = useState(null);
  const [role, setRole] = useState(null);
  const [done, setDone] = useState(false);

  function handleAgeSelect(val) {
    setAge(val);
    setTimeout(() => setStep("role"), 300);
  }

  function handleRoleSelect(val) {
    setRole(val);
    setTimeout(() => setDone(true), 300);
  }

  function reset() {
    setStep("age"); setAge(null); setRole(null); setDone(false);
  }

  const resultKey = age && role ? `${age}_${role}` : "default";
  const result = RESULTS[resultKey] || RESULTS["default"];
  const progress = done ? 100 : step === "role" ? 50 : 0;

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto">

        {/* Başlıq */}
        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-3">
            FƏRDİ TÖVSİYƏ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            Sizə uyğun inkişaf yolu
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            2 addımda sizə uyğun məqalə və resursları tapın
          </p>
        </div>

        {/* Kart */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

            {/* Progress bar */}
            <div className="h-1.5 bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-8">
              {!done ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    {step === "role" && (
                      <button
                        onClick={() => { setStep("age"); setRole(null); }}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} className="text-gray-500 text-xs" />
                      </button>
                    )}
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Addım {step === "age" ? "1" : "2"} / 2</p>
                      <h3 className="text-xl font-bold text-gray-900">{STEPS[step].title}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {STEPS[step].options.map((opt) => {
                      const isSelected = step === "age" ? age === opt.value : role === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => step === "age" ? handleAgeSelect(opt.value) : handleRoleSelect(opt.value)}
                          className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left hover:-translate-y-0.5 ${
                            isSelected ? `${opt.active} shadow-md` : `${opt.border} ${opt.bg} hover:shadow-sm`
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon icon={opt.icon} className={`text-lg ${opt.color}`} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{opt.label}</div>
                            <div className="text-xs text-gray-500">{opt.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <FontAwesomeIcon icon={result.icon} className={`text-3xl ${result.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                    {result.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">{result.desc}</p>

                  <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                    {[
                      STEPS.age.options.find(o => o.value === age),
                      STEPS.role.options.find(o => o.value === role),
                    ].filter(Boolean).map((opt) => (
                      <span key={opt.value} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${opt.bg} ${opt.color} border ${opt.border}`}>
                        <FontAwesomeIcon icon={opt.icon} className="text-xs" />
                        {opt.label}
                      </span>
                    ))}
                    <FontAwesomeIcon icon={faArrowRight} className="text-gray-300 text-xs" />
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <FontAwesomeIcon icon={faCheck} className="text-xs" />
                      Tapıldı
                    </span>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => navigate(result.link)}
                      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-md hover:-translate-y-0.5"
                    >
                      Məqalələrə keç
                      <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                    </button>
                    <button
                      onClick={reset}
                      className="flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold px-6 py-3 rounded-xl text-sm transition-all"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                      Yenidən
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}