// src/pages/GamePage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faFilePdf,
  faImage,
  faVideo,
  faDownload,
  faEye,
  faChevronDown,
  faChevronUp,
  faXmark,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

const MAT_CONFIG = {
  pdf: {
    icon: faFilePdf,
    color: "text-red-500",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-700",
    label: "PDF",
  },
  image: {
    icon: faImage,
    color: "text-blue-500",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    label: "Şəkil",
  },
  video: {
    icon: faVideo,
    color: "text-violet-500",
    bg: "bg-violet-50",
    badge: "bg-violet-100 text-violet-700",
    label: "Video",
  },
};

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [matOpen, setMatOpen] = useState(false);
  const [previewMat, setPreviewMat] = useState(null);
  const [matLoading, setMatLoading] = useState(true);

  useEffect(() => {
    async function fetchGame() {
      setLoading(true);
      const { data } = await supabase
        .from("games")
        .select("*")
        .eq("id", id)
        .single();
      if (data) setGame(data);
      setLoading(false);
    }
    fetchGame();
  }, [id]);

  useEffect(() => {
  if (!id) return;
  async function fetchMaterials() {
    console.log("Fetching materials for game id:", id);
    const { data, error } = await supabase
      .from("game_materials").select("*").eq("game_id", id)
      .order("created_at", { ascending: true });
    console.log("Materials data:", data);
    console.log("Materials error:", error);
    setMaterials(data || []);
    if (data && data.length > 0) setMatOpen(true);
    setMatLoading(false);
  }
  fetchMaterials();
}, [id]);

  if (loading)
    return (
      <div className="min-h-screen mt-25 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!game)
    return (
      <div className="min-h-screen mt-25 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="mb-4">Oyun tapılmadı</p>
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-600 font-semibold"
          >
            Geri qayıt
          </button>
        </div>
      </div>
    );

  const hasUrl = game.url && game.url.trim() !== "";

  return (
    <div className="min-h-screen bg-gray-50 mt-25">
      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Başlıq */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" /> Geri
          </button>
          <h1 className="text-lg font-bold text-gray-800 flex-1 truncate">
            {game.title}
          </h1>
        </div>

        {/* ── URL → iframe ── */}
        {hasUrl && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <iframe
              src={game.url}
              title={game.title}
              className="w-full"
              style={{ height: "600px", border: "none" }}
              allow="fullscreen"
              allowFullScreen
            />
          </div>
        )}

        {/* ── URL yoxdur, yalnız material var → placeholder banner ── */}
        {/* URL yoxdur → banner, yalnız materiallar yükləndikdən sonra */}
        {!hasUrl && !matLoading && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6 flex flex-col items-center justify-center text-center">
            {game.thumbnail ? (
              <img
                src={game.thumbnail}
                alt=""
                className="w-32 h-32 rounded-2xl object-cover mb-4 shadow"
              />
            ) : (
              <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={faGamepad}
                  className="text-emerald-400 text-3xl"
                />
              </div>
            )}
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              {game.title}
            </h2>
            {game.description && (
              <p className="text-sm text-gray-500 max-w-md">
                {game.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full">
                {game.age_group}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 font-medium px-3 py-1 rounded-full">
                {game.category}
              </span>
            </div>
            {materials.length > 0 ? (
              <p className="text-xs text-gray-400 mt-4">
                📎 Bu oyunun materialları aşağıdadır — yükləyin və evdə oynayın
              </p>
            ) : (
              <p className="text-xs text-gray-400 mt-4">
                Bu oyun üçün hələ material əlavə edilməyib
              </p>
            )}
          </div>
        )}

        {/* ── Materiallar paneli ── */}
        {materials.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setMatOpen((o) => !o)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <span className="text-lg">📎</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-800 text-sm">
                    Evdə oynanış materialları
                  </p>
                  <p className="text-xs text-gray-400">
                    {materials.length} material — PDF, şəkil, video
                  </p>
                </div>
              </div>
              <FontAwesomeIcon
                icon={matOpen ? faChevronUp : faChevronDown}
                className="text-gray-400 text-sm"
              />
            </button>

            {matOpen && (
              <div className="border-t border-gray-100 px-6 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {materials.map((mat) => (
                    <MaterialCard
                      key={mat.id}
                      mat={mat}
                      onPreview={() => setPreviewMat(mat)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {previewMat && (
        <MaterialPreviewModal
          mat={previewMat}
          onClose={() => setPreviewMat(null)}
        />
      )}
    </div>
  );
}

function MaterialCard({ mat, onPreview }) {
  const cfg = MAT_CONFIG[mat.type] || MAT_CONFIG.pdf;
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 hover:border-emerald-200 transition-colors group">
      <div
        className={`w-10 h-10 ${cfg.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
      >
        <FontAwesomeIcon icon={cfg.icon} className={`${cfg.color} text-base`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-emerald-700 transition-colors">
          {mat.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded ${cfg.badge}`}
          >
            {cfg.label}
          </span>
          {mat.file_size && (
            <span className="text-xs text-gray-400">
              {mat.file_size < 1024 * 1024
                ? `${(mat.file_size / 1024).toFixed(0)} KB`
                : `${(mat.file_size / 1024 / 1024).toFixed(1)} MB`}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={onPreview}
          className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center transition-colors"
          title="Bax"
        >
          <FontAwesomeIcon icon={faEye} className="text-gray-500 text-xs" />
        </button>
        <a
          href={mat.file_url}
          download={mat.title}
          target="_blank"
          rel="noreferrer"
          className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-500 flex items-center justify-center transition-colors group/dl"
          title="Yüklə"
        >
          <FontAwesomeIcon
            icon={faDownload}
            className="text-emerald-600 group-hover/dl:text-white text-xs transition-colors"
          />
        </a>
      </div>
    </div>
  );
}

function MaterialPreviewModal({ mat, onClose }) {
  const cfg = MAT_CONFIG[mat.type] || MAT_CONFIG.pdf;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 ${cfg.bg} rounded-xl flex items-center justify-center`}
            >
              <FontAwesomeIcon
                icon={cfg.icon}
                className={`${cfg.color} text-sm`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                {mat.title}
              </h3>
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded ${cfg.badge}`}
              >
                {cfg.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={mat.file_url}
              download={mat.title}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faDownload} /> Yüklə
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-gray-600 text-sm"
              />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-gray-50">
          {mat.type === "pdf" && (
            <iframe
              src={`${mat.file_url}#toolbar=1&navpanes=0`}
              title={mat.title}
              className="w-full h-full min-h-[60vh]"
              style={{ border: "none" }}
            />
          )}
          {mat.type === "image" && (
            <div className="flex items-center justify-center w-full h-full min-h-[60vh] p-4">
              <img
                src={mat.file_url}
                alt={mat.title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          )}
          {mat.type === "video" && (
            <div className="flex items-center justify-center w-full h-full min-h-[60vh] p-4 bg-black">
              <video
                src={mat.file_url}
                controls
                className="max-w-full max-h-[70vh] rounded-xl"
                style={{ outline: "none" }}
              >
                Brauzeriniz video formatını dəstəkləmir.
              </video>
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 bg-white">
          <p className="text-xs text-gray-400">
            {mat.type === "pdf" &&
              "Brauzer daxilində baxış — tam görüntü üçün yükləyin"}
            {mat.type === "video" &&
              "Tam ekran üçün player düymələrindən istifadə edin"}
            {mat.type === "image" &&
              "Şəkli yükləmək üçün yuxarıdakı düyməni klikləyin"}
          </p>
        </div>
      </div>
    </div>
  );
}
