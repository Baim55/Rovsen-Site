// src/components/DocumentsTab.jsx
// Admin paneldə "Sənədlər" tabı — yükləmə, redaktə, silmə

import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileAlt,
  faUpload,
  faDownload,
  faXmark,
  faSpinner,
  faTriangleExclamation,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

/* ─── sabitlər ─────────────────────────────────────── */
const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
const ALLOWED_EXT = ["pdf", "doc", "docx", "ppt", "pptx"];
const MAX_SIZE_MB = 20;

const FILE_TYPE_INFO = {
  pdf:  { icon: faFilePdf,        color: "text-red-500",    bg: "bg-red-50",    label: "PDF"  },
  docx: { icon: faFileWord,       color: "text-blue-500",   bg: "bg-blue-50",   label: "Word" },
  doc:  { icon: faFileWord,       color: "text-blue-500",   bg: "bg-blue-50",   label: "Word" },
  pptx: { icon: faFilePowerpoint, color: "text-orange-500", bg: "bg-orange-50", label: "PPTX" },
  ppt:  { icon: faFilePowerpoint, color: "text-orange-500", bg: "bg-orange-50", label: "PPTX" },
};

const CATEGORIES = ["Uşaqlar", "Valideynlər", "Pedaqoqlar", "Psixoloqlar", "Loqopedlər", "EQ", "IQ", "Mentorlar"];

const EMPTY_FORM = { title: "", description: "", category: "" };

function formatBytes(bytes) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getExt(filename = "") {
  return filename.split(".").pop()?.toLowerCase() || "";
}

/* ─── əsas komponent ────────────────────────────────── */
export function DocumentsTab({ user, profile }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState(null);

  // Fayl state-ləri
  const [docFile, setDocFile] = useState(null);
  const [docUploading, setDocUploading] = useState(false);
  const [docError, setDocError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => { fetchDocuments(); }, []);

  async function fetchDocuments() {
    setLoading(true);
    const query = supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    // Admin deyilsə yalnız öz sənədlərini göstər
    if (profile?.role !== "admin") {
      query.eq("author_id", user.id);
    }

    const { data, error } = await query;
    if (!error) setDocuments(data || []);
    setLoading(false);
  }

  /* ── fayl seçimi ── */
  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocError(null);

    const ext = getExt(file.name);
    if (!ALLOWED_EXT.includes(ext)) {
      setDocError("Yalnız PDF, DOC, DOCX, PPT, PPTX formatları qəbul edilir");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setDocError(`Fayl ölçüsü ${MAX_SIZE_MB}MB-dan böyük olmamalıdır`);
      return;
    }
    setDocFile(file);
  }

  function removeFile() {
    setDocFile(null);
    setDocError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  /* ── yükləmə ── */
  async function uploadDocument() {
    if (!docFile) return null;
    setDocUploading(true);

    const ext = getExt(docFile.name);
    const fileName = `${user.id}_${Date.now()}.${ext}`;
    const filePath = `documents/${fileName}`;

    const { error: upError } = await supabase.storage
      .from("documents")
      .upload(filePath, docFile, { upsert: true });

    if (upError) {
      setDocError("Fayl yüklənərkən xəta: " + upError.message);
      setDocUploading(false);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    setDocUploading(false);
    return { publicUrl, ext, size: docFile.size, mimeType: docFile.type };
  }

  /* ── saxla ── */
  async function handleSave() {
    if (!form.title || !form.category) {
      setMsg({ type: "error", text: "Başlıq və kateqoriya mütləqdir" });
      return;
    }
    if (!editId && !docFile) {
      setMsg({ type: "error", text: "Zəhmət olmasa fayl seçin" });
      return;
    }

    let fileData = null;
    if (docFile) {
      fileData = await uploadDocument();
      if (!fileData) return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      author_id: user.id,
      ...(fileData && {
        file_url: fileData.publicUrl,
        file_ext: fileData.ext,
        file_size: fileData.size,
        mime_type: fileData.mimeType,
      }),
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from("documents").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("documents").insert({ ...payload, download_count: 0 }));
    }

    if (error) {
      setMsg({ type: "error", text: "Xəta: " + error.message });
    } else {
      setMsg({ type: "success", text: editId ? "Yeniləndi ✓" : "Əlavə edildi ✓" });
      resetForm();
      fetchDocuments();
    }
    setTimeout(() => setMsg(null), 3000);
  }

  async function handleDelete(id) {
    if (!confirm("Silinsin?")) return;
    const { error } = await supabase.from("documents").delete().eq("id", id);
    if (!error) {
      setDocuments(prev => prev.filter(d => d.id !== id));
      setMsg({ type: "success", text: "Silindi ✓" });
      setTimeout(() => setMsg(null), 2000);
    }
  }

  function handleEdit(doc) {
    setForm({ title: doc.title, description: doc.description || "", category: doc.category || "" });
    setEditId(doc.id);
    setShowForm(true);
    setDocFile(null);
    setDocError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
    setDocFile(null);
    setDocError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  /* ── render ── */
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Əlavə et düyməsi (header-dən ayrı burada da) */}
      {!showForm && (
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            <FontAwesomeIcon icon={faUpload} />
            Sənəd yüklə
          </button>
        </div>
      )}

      {/* Mesaj */}
      {msg && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
          msg.type === "success"
            ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
            : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          {msg.text}
        </div>
      )}

      {/* ── Form ── */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              {editId ? "Sənədi redaktə et" : "Yeni sənəd yüklə"}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Başlıq */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Başlıq *
              </label>
              <input
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="Sənədin adı..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
              />
            </div>

            {/* Kateqoriya */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Kateqoriya *
              </label>
              <select
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white"
              >
                <option value="">Seçin...</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Qısa təsvir */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Qısa təsvir
              </label>
              <input
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Sənəd haqqında qısa məlumat..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
              />
            </div>

            {/* Fayl seçimi */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Fayl{" "}
                <span className="text-gray-400 normal-case font-normal">
                  (PDF, DOC, DOCX, PPT, PPTX · max {MAX_SIZE_MB}MB)
                </span>
                {editId && (
                  <span className="text-gray-400 normal-case font-normal"> — boş buraxsanız mövcud fayl saxlanılır</span>
                )}
              </label>

              {docFile ? (
                /* Seçilmiş fayl */
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    FILE_TYPE_INFO[getExt(docFile.name)]?.bg || "bg-gray-100"
                  }`}>
                    <FontAwesomeIcon
                      icon={FILE_TYPE_INFO[getExt(docFile.name)]?.icon || faFileAlt}
                      className={`text-xl ${FILE_TYPE_INFO[getExt(docFile.name)]?.color || "text-gray-400"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">{docFile.name}</p>
                    <p className="text-xs text-gray-400">{formatBytes(docFile.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-sm" />
                  </button>
                </div>
              ) : (
                /* Yükləmə zonası */
                <label
                  htmlFor="doc-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
                >
                  <FontAwesomeIcon
                    icon={faUpload}
                    className="text-2xl text-gray-300 group-hover:text-emerald-400 mb-2 transition-colors"
                  />
                  <p className="text-sm text-gray-400 group-hover:text-emerald-500 transition-colors">
                    Faylı seçmək üçün klikləyin
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    PDF, DOC, DOCX, PPT, PPTX · max {MAX_SIZE_MB}MB
                  </p>
                </label>
              )}

              <input
                id="doc-upload"
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="hidden"
                onChange={handleFileSelect}
              />

              {docError && (
                <div className="mt-2 flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {docError}
                </div>
              )}
            </div>
          </div>

          {/* Düymələr */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={docUploading}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              {docUploading && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />}
              {docUploading ? "Yüklənir..." : editId ? "Yenilə" : "Yüklə"}
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              Ləğv et
            </button>
          </div>
        </div>
      )}

      {/* ── Sənədlər siyahısı ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {profile?.role === "admin" ? "Bütün sənədlər" : "Sənədlərim"}
          </h2>
          <span className="text-sm text-gray-400">{documents.length} sənəd</span>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse h-20" />
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FontAwesomeIcon icon={faBoxOpen} className="text-4xl text-gray-200 mb-3" />
            <p>Hələ sənəd yoxdur. Yeni sənəd yükləyin!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map(doc => {
              const ext = doc.file_ext || getExt(doc.file_url || "");
              const ft = FILE_TYPE_INFO[ext] || FILE_TYPE_INFO["pdf"];
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-sm transition-shadow"
                >
                  {/* İkon */}
                  <div className={`w-12 h-12 ${ft.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <FontAwesomeIcon icon={ft.icon} className={`${ft.color} text-xl`} />
                  </div>

                  {/* Məlumat */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs font-bold text-gray-500 uppercase">{ft.label}</span>
                      {doc.category && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                          {doc.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-gray-800 font-semibold text-sm truncate">{doc.title}</h3>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                      {doc.file_size && <span>{formatBytes(doc.file_size)}</span>}
                      {doc.download_count > 0 && <span>{doc.download_count} yükləmə</span>}
                    </div>
                  </div>

                  {/* Düymələr */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <FontAwesomeIcon icon={faDownload} className="text-xs" />
                      Bax
                    </a>
                    <button
                      onClick={() => handleEdit(doc)}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Redaktə
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}