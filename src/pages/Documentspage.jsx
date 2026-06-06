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

const CATEGORIES = [
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

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState("Hamısı");

  const [showContact, setShowContact] = useState(false);
  const [contactDoc, setContactDoc] = useState(null);
  const [contactType, setContactType] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [activeCategory, setActiveCategory] = useState(
    state?.category ?? "Hamısı",
  );

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setDocuments(data || []);
    setLoading(false);
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

  const filtered = documents.filter((doc) => {
    const matchSearch =
      doc.title?.toLowerCase().includes(search.toLowerCase()) ||
      doc.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === "Hamısı" || doc.category === activeCategory;
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
            Sənədlər & Materiallar
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            PDF, Word, PowerPoint formatında faydalı materialları oxuyun və
            yükləyin
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* ── Axtarış ── */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Sənəd axtar..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white"
            />
          </div>
          <button
            onClick={fetchDocuments}
            className="w-12 h-12 rounded-2xl bg-white border-2 border-gray-200 hover:border-emerald-400 flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <FontAwesomeIcon
              icon={faRotateRight}
              className="text-gray-500 text-sm"
            />
          </button>
        </div>

        {/* ── Kateqoriyalar ── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {!loading && !error && (
          <p className="text-sm text-gray-400 mb-4">
            {filtered.length} sənəd tapıldı
          </p>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse h-36"
              />
            ))}
          </div>
        )}

        {/* ── Xəta ── */}
        {error && (
          <div className="text-center py-16">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-4xl text-amber-400 mb-3"
            />
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={fetchDocuments}
              className="px-5 py-2 bg-gray-800 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Yenidən cəhd et
            </button>
          </div>
        )}

        {/* ── Boş ── */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <FontAwesomeIcon
              icon={faBoxOpen}
              className="text-5xl text-gray-200 mb-4"
            />
            <p>Heç bir sənəd tapılmadı</p>
          </div>
        )}

        {/* ── Kartlar ── */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((doc) => (
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
            title={user ? "Bax" : "Daxil olun"}
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
          title={user ? "Yüklə" : "Daxil olun"}
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
      // 1) Supabase-ə yaz
      await supabase.from("contact_requests").insert({
        name: form.name,
        phone: form.phone,
        message: form.message,
        document_title: doc?.title || "",
        request_type: type,
      });

      // 2) EmailJS ilə email göndər
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
      console.error(err);
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
            <FontAwesomeIcon icon={faDownload} />
            Yüklə
          </a>
        </div>
      </div>
    </div>
  );
}
