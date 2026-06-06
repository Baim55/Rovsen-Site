// src/components/ResourcesSection.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList, faGamepad, faFlask, faFilePdf,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const CONFIGS = [
  { key: "Metodik vəsaitlər", icon: faClipboardList, bg: "bg-blue-50",    color: "text-blue-500",    border: "border-blue-100",    hover: "hover:border-blue-300",    btn: "text-blue-500"    },
  { key: "İnkişaf oyunları",  icon: faGamepad,       bg: "bg-emerald-50", color: "text-emerald-500", border: "border-emerald-100", hover: "hover:border-emerald-300", btn: "text-emerald-500" },
  { key: "Psixoloji testlər", icon: faFlask,         bg: "bg-violet-50",  color: "text-violet-500",  border: "border-violet-100",  hover: "hover:border-violet-300",  btn: "text-violet-500"  },
  { key: "PDF kitablar",      icon: faFilePdf,       bg: "bg-rose-50",    color: "text-rose-500",    border: "border-rose-100",    hover: "hover:border-rose-300",    btn: "text-rose-500"    },
];

const CATEGORY_MAP = {
  "Metodik vəsaitlər": ["Pedaqoqlar", "Müəllimlər"],
  "İnkişaf oyunları":  ["Uşaqlar"],
  "Psixoloji testlər": ["Psixoloqlar", "IQ", "EQ"],
  "PDF kitablar":      ["PDF"],
};

export default function ResourcesSection() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    async function fetchCounts() {
      const { data } = await supabase.from("documents").select("category");
      if (!data) return;

      const result = {};
      CONFIGS.forEach(cfg => {
        const cats = CATEGORY_MAP[cfg.key];
        result[cfg.key] = data.filter(d => cats.includes(d.category)).length;
      });

      // PDF kitablar üçün mime_type-a da bax
      const { data: pdfData } = await supabase
        .from("documents")
        .select("id")
        .ilike("file_url", "%.pdf");
      result["PDF kitablar"] = pdfData?.length ?? 0;

      setCounts(result);
    }
    fetchCounts();
  }, []);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold text-sm tracking-widest mb-3">
            RESURS MƏRKƏZİ
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Faydalı resurslar
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Mütəxəssislər, valideynlər və uşaqlar üçün hazırlanmış keyfiyyətli materiallar
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {CONFIGS.map((cfg) => {
            const count = counts[cfg.key];
            return (
              <div
                key={cfg.key}
                onClick={() => navigate("/resources")}
                className={`border-2 ${cfg.border} ${cfg.hover} rounded-2xl p-6 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center bg-white`}
              >
                <div className={`w-14 h-14 ${cfg.bg} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={cfg.icon} className={`text-2xl ${cfg.color}`} />
                </div>

                <div className="font-bold text-gray-900 text-sm mb-1">{cfg.key}</div>

                <div className={`text-xs font-semibold ${cfg.color} mb-4`}>
                  {count === undefined ? "..." : count === 0 ? "Tezliklə" : `${count} material`}
                </div>

                <div className={`flex items-center gap-1 text-xs font-semibold ${cfg.btn} mt-auto opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Bax
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}