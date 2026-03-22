// src/pages/AgeGroupPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ageGroups, subAgeGroups, developmentAreas } from "../data/data";
import { useArticles } from "../hooks/useArticles";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faArrowRight,
  faClock,
  faTag,
  faSeedling,
  faLeaf,
  faTree,
  faGraduationCap,
  faDumbbell,
  faBrain,
  faPalette,
  faHeart,
  faRotateRight,
  faTriangleExclamation,
  faBoxOpen,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const AGE_STYLES = {
  "1-6": {
    bg: "bg-amber-50",
    border: "border-amber-300",
    badge: "bg-amber-400",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
  "6-10": {
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    badge: "bg-emerald-400",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
  },
  "11-17": {
    bg: "bg-blue-50",
    border: "border-blue-300",
    badge: "bg-blue-400",
    text: "text-blue-700",
    dot: "bg-blue-400",
  },
  "18+": {
    bg: "bg-violet-50",
    border: "border-violet-300",
    badge: "bg-violet-400",
    text: "text-violet-700",
    dot: "bg-violet-400",
  },
};

const AGE_ICONS = {
  "1-6": { icon: faSeedling, bg: "bg-amber-400" },
  "6-10": { icon: faLeaf, bg: "bg-emerald-400" },
  "11-17": { icon: faTree, bg: "bg-blue-400" },
  "18+": { icon: faGraduationCap, bg: "bg-violet-400" },
};

const AREA_ICONS = {
  fiziki: { icon: faDumbbell, color: "text-orange-500", bg: "bg-orange-50" },
  idrak: { icon: faBrain, color: "text-blue-500", bg: "bg-blue-50" },
  estetik: { icon: faPalette, color: "text-pink-500", bg: "bg-pink-50" },
  sosial: { icon: faHeart, color: "text-red-500", bg: "bg-red-50" },
};

export default function AgeGroupPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const group = ageGroups.find((g) => g.id === id);
  const style = AGE_STYLES[id] ?? {};
  const ageIcon = AGE_ICONS[id] ?? {};

  const [activeTab, setActiveTab] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [activeArea, setActiveArea] = useState("fiziki");

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faBoxOpen}
            className="text-4xl text-gray-300 mb-4"
          />
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

  const is16 = id === "1-6";
  const tabs = group.categories;
  const tabName = tabs[activeTab];
  const subs = subAgeGroups[id] || [];
  const subId = subs[activeSub]?.id;

  const filters = {
    ageGroup: id,
    category: tabName,
    ...(is16 && tabName === "Uşaqlar" && subId ? { subAge: subId } : {}),
    ...(is16 && tabName === "Uşaqlar" && activeArea
      ? { area: activeArea }
      : {}),
  };

  const { articles, loading, error, refetch } = useArticles(filters);

  return (
    <div className="min-h-screen bg-gray-50 mt-25">
      {/* ── Hero banner ── */}
      <div className={`${style.bg} border-y-2 ${style.border} py-10 px-6`}>
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-5 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            Geri
          </button>
          <div className="flex items-center gap-5">
            <div
              className={`w-16 h-16 ${ageIcon.bg} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
            >
              <FontAwesomeIcon
                icon={ageIcon.icon}
                className="text-white text-3xl"
              />
            </div>
            <div>
              <h1
                className={`text-4xl font-bold ${style.text} mb-2`}
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

      {/* ── Sticky tablar ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-1 flex-wrap items-center justify-center lg:justify-start py-2">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(i);
                  setActiveSub(0);
                  setActiveArea("fiziki");
                }}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all
                  ${
                    activeTab === i
                      ? `${style.badge} bg-opacity-20 ${style.text}`
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

      {/* ── Məzmun ── */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* 1-6 / Uşaqlar üçün sub-filter */}
        {is16 && tabName === "Uşaqlar" && (
          <>
            <div className="flex gap-3 mb-6">
              {subs.map((sub, i) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setActiveSub(i);
                    setActiveArea("fiziki");
                  }}
                  className={`
                    px-6 py-3 rounded-2xl font-bold text-sm transition-all
                    ${
                      activeSub === i
                        ? `${style.badge} bg-opacity-30 ${style.text} shadow-sm`
                        : "bg-white border-2 border-gray-200 text-gray-500 hover:border-gray-300"
                    }
                  `}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {developmentAreas.map((area) => {
                const areaIcon = AREA_ICONS[area.id] ?? {};
                return (
                  <button
                    key={area.id}
                    onClick={() => setActiveArea(area.id)}
                    className={`
                      p-4 rounded-2xl text-left transition-all border-2
                      ${
                        activeArea === area.id
                          ? `${style.bg} ${style.border} ${style.text}`
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }
                    `}
                  >
                    <div
                      className={`w-9 h-9 ${areaIcon.bg} rounded-xl flex items-center justify-center mb-2`}
                    >
                      <FontAwesomeIcon
                        icon={areaIcon.icon}
                        className={`text-sm ${areaIcon.color}`}
                      />
                    </div>
                    <div className="text-xs font-bold leading-tight">
                      {area.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Başlıq sətri */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {is16 && tabName === "Uşaqlar"
              ? `${subs[activeSub]?.label} — ${developmentAreas.find((a) => a.id === activeArea)?.label}`
              : `${tabName} — məqalələr`}
          </h2>
          <div className="flex items-center gap-3">
            {!loading && (
              <span className="text-sm text-gray-400">
                {articles.length} məqalə
              </span>
            )}
            <button
              onClick={refetch}
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              title="Yenilə"
            >
              <FontAwesomeIcon
                icon={faRotateRight}
                className="text-xs text-gray-500"
              />
            </button>
          </div>
        </div>

        {/* State-lər */}
        {loading && <LoadingState style={style} />}
        {error && <ErrorState message={error} onRetry={refetch} />}
        {!loading && !error && articles.length === 0 && <EmptyState />}
        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} style={style} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Alt komponentlər ── */

function ArticleCard({ article, style }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  function handleClick() {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/meqale/${article.id}`);
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group shadow-sm"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        {article.tag && (
          <span
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${style.badge} bg-opacity-20 ${style.text}`}
          >
            <FontAwesomeIcon icon={faTag} className="text-xs" />
            {article.tag}
          </span>
        )}
        {article.time && (
          <span className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
            <FontAwesomeIcon icon={faClock} className="text-xs" />
            {article.time}
          </span>
        )}
      </div>

      <h3 className="text-gray-800 font-semibold text-base leading-snug group-hover:text-gray-900 mb-3">
        {article.title}
      </h3>

      {!user ? (
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <FontAwesomeIcon icon={faLock} />
          <span>Oxumaq üçün daxil olun</span>
        </div>
      ) : (
        <p
          className={`text-sm font-medium ${style.text} flex items-center gap-1.5`}
        >
          Oxu <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </p>
      )}
    </div>
  );
}

function LoadingState({ style }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse"
        >
          <div className="flex gap-3 mb-3">
            <div
              className={`h-6 w-16 rounded-full ${style.badge} bg-opacity-20`}
            />
            <div className="h-6 w-12 rounded-full bg-gray-100 ml-auto" />
          </div>
          <div className="h-4 bg-gray-100 rounded mb-2 w-full" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded mt-4 w-16" />
        </div>
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="text-center py-16">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="text-4xl text-amber-400 mb-3"
      />
      <p className="text-gray-500 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-5 py-2 bg-gray-800 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
      >
        Yenidən cəhd et
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 text-gray-400">
      <FontAwesomeIcon
        icon={faBoxOpen}
        className="text-5xl text-gray-200 mb-4"
      />
      <p>Bu bölmə üçün hələ məqalə yoxdur</p>
    </div>
  );
}
