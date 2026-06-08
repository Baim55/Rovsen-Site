// src/pages/DocumentsPage.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faDownload,
  faEye,
  faSearch,
  faBoxOpen,
  faTriangleExclamation,
  faLock,
  faRotateRight,
  faClipboardList,
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const EMAILJS_SERVICE_ID = "service_n9o155d";
const EMAILJS_TEMPLATE_ID = "template_vx3hrd8";
const EMAILJS_PUBLIC_KEY = "N2VyMm9ew6Fna2gbg";

const FILE_TYPES = {
  pdf: {
    icon: faFilePdf,
    color: "text-red-500",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-700",
    label: "PDF",
  },
  docx: {
    icon: faFileWord,
    color: "text-blue-500",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    label: "Word",
  },
  doc: {
    icon: faFileWord,
    color: "text-blue-500",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    label: "Word",
  },
  pptx: {
    icon: faFilePowerpoint,
    color: "text-orange-500",
    bg: "bg-orange-50",
    badge: "bg-orange-100 text-orange-700",
    label: "PPTX",
  },
  ppt: {
    icon: faFilePowerpoint,
    color: "text-orange-500",
    bg: "bg-orange-50",
    badge: "bg-orange-100 text-orange-700",
    label: "PPTX",
  },
};

const DOC_CATEGORIES = [
  "Hamısı",
  "Uşaqlar",
  "Valideynlər",
  "Pedaqoqlar",
  "Psixoloqlar",
  "Loqopedlər",
  "EQ",
  "IQ",
  "Mentorlar",
];
const TEST_CATEGORIES = [
  "Hamısı",
  "Uşaqlar",
  "Valideynlər",
  "Pedaqoqlar",
  "Psixoloqlar",
  "Loqopedlər",
  "EQ",
  "IQ",
  "Mentorlar",
];

const MAIN_TABS = [
  {
    key: "documents",
    label: "📄 Sənədlər",
    desc: "PDF, Word, PowerPoint materiallar",
  },
  { key: "tests", label: "📝 Testlər", desc: "Özünüzü yoxlayın" },
  { key: "games", label: "🎮 Oyunlar", desc: "Oynayaraq öyrənin" },
];

function getFileType(url = "", mimeType = "") {
  const ext = url.split(".").pop()?.toLowerCase().split("?")[0];
  if (FILE_TYPES[ext]) return ext;
  if (mimeType.includes("pdf")) return "pdf";
  if (mimeType.includes("word") || mimeType.includes("docx")) return "docx";
  if (mimeType.includes("presentation") || mimeType.includes("pptx"))
    return "pptx";
  return "pdf";
}

function formatBytes(bytes) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(state?.tab ?? null); // null = seçim ekranı

  // Sənədlər state
  const [documents, setDocuments] = useState([]);
  const [docLoading, setDocLoading] = useState(false);
  const [docError, setDocError] = useState(null);
  const [docSearch, setDocSearch] = useState("");
  const [docCategory, setDocCategory] = useState("Hamısı");
  const [showContact, setShowContact] = useState(false);
  const [contactDoc, setContactDoc] = useState(null);
  const [contactType, setContactType] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Testlər state
  const [tests, setTests] = useState([]);
  const [testLoading, setTestLoading] = useState(false);
  const [testSearch, setTestSearch] = useState("");
  const [testCategory, setTestCategory] = useState("Hamısı");

  // Oyunlar state
  const [games, setGames] = useState([]);
  const [gameLoading, setGameLoading] = useState(false);
  const [gameSearch, setGameSearch] = useState("");
  const [gameCategory, setGameCategory] = useState("Hamısı");

  useEffect(() => {
    if (activeTab === "documents") fetchDocuments();
    else if (activeTab === "tests") fetchTests();
    else if (activeTab === "games") fetchGames();
  }, [activeTab]);

  async function fetchDocuments() {
    setDocLoading(true);
    setDocError(null);
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setDocError(error.message);
    else setDocuments(data || []);
    setDocLoading(false);
  }

  async function fetchTests() {
    setTestLoading(true);
    const { data } = await supabase
      .from("tests")
      .select("*, test_questions(id)")
      .order("created_at", { ascending: false });
    setTests(data || []);
    setTestLoading(false);
  }

  async function fetchGames() {
    setGameLoading(true);
    const { data } = await supabase
      .from("games")
      .select("*")
      .order("created_at", { ascending: false });
    setGames(data || []);
    setGameLoading(false);
  }

  function handleDownload(doc) {
    if (!user) {
      navigate("/login");
      return;
    }
    setContactDoc(doc);
    setContactType("download");
    setShowContact(true);
  }
  function handlePreview(doc) {
    if (!user) {
      navigate("/login");
      return;
    }
    setContactDoc(doc);
    setContactType("preview");
    setShowContact(true);
  }

  const filteredDocs = documents.filter((doc) => {
    const matchSearch =
      doc.title?.toLowerCase().includes(docSearch.toLowerCase()) ||
      doc.description?.toLowerCase().includes(docSearch.toLowerCase());
    const matchCat = docCategory === "Hamısı" || doc.category === docCategory;
    return matchSearch && matchCat;
  });

  const filteredTests = tests.filter((t) => {
    const matchSearch = t.title
      ?.toLowerCase()
      .includes(testSearch.toLowerCase());
    const matchCat = testCategory === "Hamısı" || t.category === testCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-25">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-emerald-600 font-semibold text-xs tracking-widest mb-2">
            RESURS MƏRKƏZİ
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {activeTab === "documents"
              ? "Sənədlər & Materiallar"
              : activeTab === "tests"
                ? "İnkişaf Testləri"
                : activeTab === "games"
                  ? "İnkişaf Oyunları"
                  : "Resurs Mərkəzi"}
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            {activeTab === "documents"
              ? "PDF, Word, PowerPoint formatında faydalı materiallar"
              : activeTab === "tests"
                ? "Özünüzü və uşaqlarınızı daha yaxşı tanıyın"
                : "Sənədlər, testlər və oyunlar arasından seçin"}
          </p>
        </div>
      </div>

      {/* ── Seçim ekranı ── */}
      {!activeTab && (
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MAIN_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  if (tab.disabled) return;
                  setActiveTab(tab.key); // navigate yox
                }}
                disabled={tab.disabled}
                className={`relative bg-white rounded-2xl border-2 p-6 text-left transition-all duration-200 ${
                  tab.disabled
                    ? "border-gray-100 opacity-60 cursor-not-allowed"
                    : "border-gray-200 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
                }`}
              >
                {tab.disabled && (
                  <span className="absolute top-3 right-3 text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">
                    Tezliklə
                  </span>
                )}
                <div className="text-3xl mb-4">{tab.label.split(" ")[0]}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-base">
                  {tab.label.split(" ").slice(1).join(" ")}
                </h3>
                <p className="text-sm text-gray-400">{tab.desc}</p>
                {!tab.disabled && (
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Keç{" "}
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </div>
                )}  
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab navigasiyası (seçildikdən sonra) ── */}
      {activeTab && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex gap-1">
              {MAIN_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (tab.disabled) return;
                    setActiveTab(tab.key); // navigate yox
                  }}
                  disabled={tab.disabled}
                  className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                    activeTab === tab.key
                      ? "border-emerald-500 text-emerald-600"
                      : tab.disabled
                        ? "border-transparent text-gray-300 cursor-not-allowed"
                        : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Sənədlər ── */}
      {activeTab === "documents" && (
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              />
              <input
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                placeholder="Sənəd axtar..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white"
              />
            </div>
            <button
              onClick={fetchDocuments}
              className="w-12 h-12 rounded-2xl bg-white border-2 border-gray-200 hover:border-emerald-400 flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon
                icon={faRotateRight}
                className="text-gray-500 text-sm"
              />
            </button>
          </div>

          <div className="flex gap-2 flex-wrap mb-6">
            {DOC_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setDocCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  docCategory === cat
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {!docLoading && !docError && (
            <p className="text-sm text-gray-400 mb-4">
              {filteredDocs.length} sənəd tapıldı
            </p>
          )}

          {docLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse h-36"
                />
              ))}
            </div>
          )}
          {docError && (
            <div className="text-center py-16">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="text-4xl text-amber-400 mb-3"
              />
              <p className="text-gray-500 mb-4">{docError}</p>
              <button
                onClick={fetchDocuments}
                className="px-5 py-2 bg-gray-800 text-white rounded-xl text-sm font-semibold"
              >
                Yenidən cəhd et
              </button>
            </div>
          )}
          {!docLoading && !docError && filteredDocs.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-5xl text-gray-200 mb-4"
              />
              <p>Heç bir sənəd tapılmadı</p>
            </div>
          )}
          {!docLoading && !docError && filteredDocs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  user={user}
                  onDownload={handleDownload}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Testlər ── */}
      {activeTab === "tests" && (
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              />
              <input
                value={testSearch}
                onChange={(e) => setTestSearch(e.target.value)}
                placeholder="Test axtar..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white"
              />
            </div>
            <button
              onClick={fetchTests}
              className="w-12 h-12 rounded-2xl bg-white border-2 border-gray-200 hover:border-emerald-400 flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon
                icon={faRotateRight}
                className="text-gray-500 text-sm"
              />
            </button>
          </div>

          <div className="flex gap-2 flex-wrap mb-6">
            {TEST_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setTestCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  testCategory === cat
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {testLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse h-40"
                />
              ))}
            </div>
          )}
          {!testLoading && filteredTests.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-5xl text-gray-200 mb-4"
              />
              <p>Test tapılmadı</p>
            </div>
          )}
          {!testLoading && filteredTests.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTests.map((test) => (
                <div
                  key={test.id}
                  onClick={() => navigate(`/test/${test.id}`)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group overflow-hidden"
                >
                  {test.thumbnail ? (
                    <img
                      src={test.thumbnail}
                      alt=""
                      className="w-full h-36 object-cover"
                    />
                  ) : (
                    <div className="w-full h-36 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faClipboardList}
                        className="text-4xl text-emerald-200"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                        {test.age_group}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">
                        {test.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {test.test_questions?.length || 0} sual
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                      {test.title}
                    </h3>
                    {test.description && (
                      <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                        {test.description}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      Testi keç{" "}
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-xs group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Oyunlar ── */}
      {activeTab === "games" && (
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              />
              <input
                value={gameSearch}
                onChange={(e) => setGameSearch(e.target.value)}
                placeholder="Oyun axtar..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white"
              />
            </div>
            <button
              onClick={fetchGames}
              className="w-12 h-12 rounded-2xl bg-white border-2 border-gray-200 hover:border-emerald-400 flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon
                icon={faRotateRight}
                className="text-gray-500 text-sm"
              />
            </button>
          </div>

          <div className="flex gap-2 flex-wrap mb-6">
            {[
              "Hamısı",
              "Uşaqlar",
              "Valideynlər",
              "Pedaqoqlar",
              "Psixoloqlar",
              "Loqopedlər",
              "EQ",
              "IQ",
              "Mentorlar",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setGameCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  gameCategory === cat
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {gameLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse h-52"
                />
              ))}
            </div>
          ) : games.filter((g) => {
              const ms = g.title
                ?.toLowerCase()
                .includes(gameSearch.toLowerCase());
              const mc =
                gameCategory === "Hamısı" || g.category === gameCategory;
              return ms && mc;
            }).length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-5xl text-gray-200 mb-4"
              />
              <p>Oyun tapılmadı</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games
                .filter((g) => {
                  const ms = g.title
                    ?.toLowerCase()
                    .includes(gameSearch.toLowerCase());
                  const mc =
                    gameCategory === "Hamısı" || g.category === gameCategory;
                  return ms && mc;
                })
                .map((game) => (
                  <div
                    key={game.id}
                    onClick={() => navigate(`/oyun/${game.id}`)}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group overflow-hidden"
                  >
                    {game.thumbnail ? (
                      <img
                        src={game.thumbnail}
                        alt=""
                        className="w-full h-36 object-cover"
                      />
                    ) : (
                      <div className="w-full h-36 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                        <span className="text-5xl">🎮</span>
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {game.age_group && (
                          <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                            {game.age_group}
                          </span>
                        )}
                        {game.category && (
                          <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">
                            {game.category}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                        {game.title}
                      </h3>
                      {game.description && (
                        <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                          {game.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        Oyna{" "}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-xs group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* ── Modallar ── */}
      {showContact && (
        <ContactModal
          doc={contactDoc}
          type={contactType}
          onClose={() => setShowContact(false)}
          onPreviewOpen={() => {
            setShowContact(false);
            setPreviewDoc(contactDoc);
          }}
        />
      )}
      {previewDoc && (
        <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
      )}
    </div>
  );
}

/* ─── DocumentCard ─────────────────────────────────── */
function DocumentCard({ doc, user, onDownload, onPreview }) {
  const ext = getFileType(doc.file_url, doc.mime_type || "");
  const ft = FILE_TYPES[ext] || FILE_TYPES["pdf"];
  const canPreview = ext === "pdf";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex gap-4">
      <div
        className={`w-14 h-14 ${ft.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}
      >
        <FontAwesomeIcon icon={ft.icon} className={`${ft.color} text-2xl`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1 flex-wrap">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${ft.badge}`}
          >
            {ft.label}
          </span>
          {doc.category && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
              {doc.category}
            </span>
          )}
        </div>
        <h3 className="text-gray-800 font-semibold text-sm leading-snug mb-1 truncate">
          {doc.title}
        </h3>
        {doc.description && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-2">
            {doc.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {doc.file_size && <span>{formatBytes(doc.file_size)}</span>}
          {doc.download_count > 0 && <span>{doc.download_count} yükləmə</span>}
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0">
        {canPreview && (
          <button
            onClick={() => onPreview(doc)}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors group"
          >
            <FontAwesomeIcon
              icon={user ? faEye : faLock}
              className="text-sm text-gray-500 group-hover:text-blue-600"
            />
          </button>
        )}
        <button
          onClick={() => onDownload(doc)}
          className="w-9 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-500 flex items-center justify-center transition-colors group"
        >
          <FontAwesomeIcon
            icon={user ? faDownload : faLock}
            className="text-sm text-emerald-600 group-hover:text-white"
          />
        </button>
      </div>
    </div>
  );
}

/* ─── ContactModal ─────────────────────────────────── */
function ContactModal({ doc, type, onClose, onPreviewOpen }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from("contact_requests").insert({
        name: form.name,
        phone: form.phone,
        message: form.message,
        document_title: doc?.title || "",
        request_type: type,
      });
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: "",
          phone: form.phone,
          subject:
            type === "download"
              ? `Yükləmə müraciəti: ${doc?.title || ""}`
              : `Baxış müraciəti: ${doc?.title || ""}`,
          message: form.message || "Qeyd yoxdur",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
    } catch (err) {
      alert("Müraciət göndərilmədi. Yenidən cəhd edin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon
                icon={faDownload}
                className="text-emerald-500 text-2xl"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Müraciətiniz qəbul edildi!
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              Tezliklə sizinlə əlaqə saxlayacağıq.
            </p>
            {type === "preview" && (
              <button
                onClick={onPreviewOpen}
                className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                Sənədə bax
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              Bağla
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">
                {type === "download"
                  ? "Sənədi yükləmək üçün"
                  : "Sənədə baxmaq üçün"}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            {doc && (
              <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4 text-sm text-gray-600">
                📄 <span className="font-semibold">{doc.title}</span>
              </div>
            )}
            <p className="text-gray-500 text-sm mb-5">
              Bu material üçün əlaqə məlumatlarınızı buraxın, sizinlə əlaqə
              saxlayacağıq.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Adınız *"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none text-sm"
              />
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="Telefon nömrəsi *"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none text-sm"
              />
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Qeyd (istəyə bağlı)"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-400 focus:outline-none text-sm resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                {loading ? "Göndərilir..." : "Müraciət et"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── PreviewModal ─────────────────────────────────── */
function PreviewModal({ doc, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                {doc.title}
              </h3>
              {doc.category && (
                <span className="text-xs text-gray-400">{doc.category}</span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl font-medium transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            src={`${doc.file_url}#toolbar=1&navpanes=0`}
            title={doc.title}
            className="w-full h-full min-h-[60vh]"
            style={{ border: "none" }}
          />
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-400">
            Brauzer daxilində baxış — tam görüntü üçün yükləyin
          </p>
          <a
            href={doc.file_url}
            download={doc.title}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <FontAwesomeIcon icon={faDownload} /> Yüklə
          </a>
        </div>
      </div>
    </div>
  );
}
