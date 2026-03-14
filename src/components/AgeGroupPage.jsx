import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ageGroups,
  yearArticles,
  subAgeGroups,
  developmentAreas,
  subArticles,
} from "../data/data";

export default function AgeGroupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const group = ageGroups.find((g) => g.id === id);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [activeArea, setActiveArea] = useState(0);

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Səhifə tapılmadı</p>
          <button
            onClick={() => navigate("/")}
            className="text-emerald-600 font-semibold"
          >
            Ana səhifəyə qayıt
          </button>
        </div>
      </div>
    );
  }

  const tabs = group.categories;
  const hasSub = !!subAgeGroups[id];
  const isUsaqlarTab = hasSub && tabs[activeTab] === "Uşaqlar üçün";

  const subs = subAgeGroups[id] || [];
  const areas = developmentAreas;
  const subId = subs[activeSub]?.id;
  const areaId = areas[activeArea]?.id;

  const currentArticles = yearArticles[id]?.[tabs[activeTab]] || [];
  const subCurrentArticles = subArticles[id]?.[subId]?.[areaId] || [];

  return (
    <div className="min-h-screen bg-gray-50 mt-25">
      {/* Hero banner */}
      <div className={`${group.bg} border-y-2 ${group.border} py-10 px-6`}>
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-5 transition-colors"
          >
            ← Geri
          </button>
          <div className="flex items-center gap-5">
            <span className="text-6xl">{group.emoji}</span>
            <div>
              <p
                className={`text-sm font-semibold ${group.text} uppercase tracking-widest mb-1`}
              >
                İnkişaf akademiyası
              </p>
              <h1
                className={`text-4xl font-bold ${group.text} mb-2`}
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {group.age}
              </h1>
              <p className="text-gray-600 text-lg">
                {group.label} — {group.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky tab-lar — bütün yaş qrupları üçün */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-1 flex-wrap items-center justify-center lg:justify-start py-2">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all
                  ${
                    activeTab === i
                      ? `${group.badge} bg-opacity-20 ${group.text}`
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Məzmun */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {isUsaqlarTab ? (
          /* ── UŞAQLAR ÜÇÜN TAB: 1-3 / 3-6 + inkişaf sahələri ── */
          <>
            {/* Alt yaş seçici */}
            <div className="flex gap-3 mb-8">
              {subs.map((sub, i) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setActiveSub(i);
                    setActiveArea(0);
                  }}
                  className={`
                    px-6 py-3 rounded-2xl font-bold text-sm transition-all
                    ${
                      activeSub === i
                        ? `${group.badge} bg-opacity-30 ${group.text} shadow-sm`
                        : "bg-white border-2 border-gray-200 text-gray-500 hover:border-gray-300"
                    }
                  `}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* 4 inkişaf sahəsi kartları */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {areas.map((area, i) => (
                <button
                  key={area.id}
                  onClick={() => setActiveArea(i)}
                  className={`
                    p-4 rounded-2xl text-left transition-all border-2
                    ${
                      activeArea === i
                        ? `${group.bg} ${group.border} ${group.text}`
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }
                  `}
                >
                  <div className="text-2xl mb-2">{area.emoji}</div>
                  <div className="text-xs font-bold leading-tight">
                    {area.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Başlıq */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">
                {subs[activeSub]?.label} — {areas[activeArea]?.label}
              </h2>
              <span className="text-sm text-gray-400">
                {subCurrentArticles.length} məqalə
              </span>
            </div>

            {/* Məqalələr */}
            {subCurrentArticles.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-4">📭</p>
                <p>Bu bölmə üçün hələ məqalə yoxdur</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subCurrentArticles.map((article, i) => (
                  <ArticleCard key={i} article={article} group={group} />
                ))}
              </div>
            )}
          </>
        ) : (
          /* ── DİGƏR BÜTÜN TAB-LAR: adi məqalə siyahısı ── */
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {tabs[activeTab]} məqalələr
              </h2>
              <span className="text-sm text-gray-400">
                {currentArticles.length} məqalə
              </span>
            </div>

            {currentArticles.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-4">📭</p>
                <p>Bu bölmə üçün hələ məqalə yoxdur</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentArticles.map((article, i) => (
                  <ArticleCard key={i} article={article} group={group} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ArticleCard({ article, group }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${group.badge} bg-opacity-20 ${group.text}`}
        >
          {article.tag}
        </span>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {article.time} oxu
        </span>
      </div>
      <h3 className="text-gray-800 font-semibold text-base leading-snug group-hover:text-gray-900">
        {article.title}
      </h3>
      <p className={`mt-3 text-sm font-medium ${group.text}`}>Oxu →</p>
    </div>
  );
}
