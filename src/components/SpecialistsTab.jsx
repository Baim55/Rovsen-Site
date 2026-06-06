import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faXmark,
  faSpinner,
  faTriangleExclamation,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const EMPTY_SPEC = {
  full_name: "",
  role: "",
  exp: "",
  bio: "",
  email: "",
  specialties: "",   // vergüllə ayrılmış mətn, save-də array-ə çevrilir
  avatar_url: "",
};

const ROLES = [
  "Psixoloqlar", "Loqopedlər", "Pedaqoqlar",
  "Mentor", "EQ", "IQ",
];

const ALLOWED_TYPES = ["image/jpeg","image/jpg","image/png","image/webp","image/gif"];
const MAX_MB = 5;

export function SpecialistsTab({ user, profile }) {
  const [specialists, setSpecialists] = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [showForm,    setShowForm]    = useState(false);
  const [form,        setForm]        = useState(EMPTY_SPEC);
  const [editId,      setEditId]      = useState(null);
  const [msg,         setMsg]         = useState(null);

  // Avatar
  const [imgFile,      setImgFile]      = useState(null);
  const [imgPreview,   setImgPreview]   = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgError,     setImgError]     = useState(null);
  const fileRef = useRef(null);

  useEffect(() => { fetchSpecialists(); }, []);

  async function fetchSpecialists() {
    setLoading(true);
    const { data } = await supabase
      .from("specialists")
      .select("*")
      .order("created_at", { ascending: true });
    setSpecialists(data || []);
    setLoading(false);
  }

  /* ── Şəkil ── */
  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgError(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      setImgError("Yalnız JPG, JPEG, PNG, WebP, GIF qəbul edilir");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setImgError(`Maksimum ${MAX_MB}MB`);
      return;
    }
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  }

  function handleRemoveImg() {
    setImgFile(null);
    setImgPreview(null);
    setImgError(null);
    setForm(f => ({ ...f, avatar_url: "" }));
    if (fileRef.current) fileRef.current.value = "";
  }

  async function uploadAvatar() {
    if (!imgFile) return form.avatar_url || null;
    setImgUploading(true);
    const ext  = imgFile.name.split(".").pop();
    const path = `avatars/${user.id}_${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("specialist-avatars")
      .upload(path, imgFile, { upsert: true });
    if (error) {
      setImgError("Avatar yüklənmədi: " + error.message);
      setImgUploading(false);
      return null;
    }
    const { data: { publicUrl } } = supabase.storage
      .from("specialist-avatars")
      .getPublicUrl(path);
    setImgUploading(false);
    return publicUrl;
  }

  /* ── Save ── */
  async function handleSave() {
    if (!form.full_name || !form.role) {
      setMsg({ type: "error", text: "Ad və sahə mütləqdir" });
      return;
    }
    const avatarUrl = await uploadAvatar();
    if (imgFile && !avatarUrl) return;

    // Specialties: vergüllə bölüb array et
    const specialtiesArray = form.specialties
      ? form.specialties.split(",").map(s => s.trim()).filter(Boolean)
      : [];

    const payload = {
      full_name:   form.full_name,
      role:        form.role,
      exp:         form.exp || null,
      bio:         form.bio || null,
      email:       form.email || null,
      specialties: specialtiesArray,
      avatar_url:  avatarUrl,
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from("specialists").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("specialists").insert(payload));
    }

    if (error) {
      setMsg({ type: "error", text: "Xəta: " + error.message });
    } else {
      setMsg({ type: "success", text: editId ? "Yeniləndi ✓" : "Əlavə edildi ✓" });
      resetForm();
      fetchSpecialists();
    }
    setTimeout(() => setMsg(null), 3000);
  }

  async function handleDelete(id) {
    if (!confirm("Silinsin?")) return;
    await supabase.from("specialists").delete().eq("id", id);
    setSpecialists(prev => prev.filter(s => s.id !== id));
    setMsg({ type: "success", text: "Silindi ✓" });
    setTimeout(() => setMsg(null), 2000);
  }

  function handleEdit(s) {
    setForm({
      full_name:   s.full_name,
      role:        s.role,
      exp:         s.exp        || "",
      bio:         s.bio        || "",
      email:       s.email      || "",
      specialties: (s.specialties || []).join(", "),
      avatar_url:  s.avatar_url  || "",
    });
    setImgPreview(s.avatar_url || null);
    setImgFile(null);
    setImgError(null);
    setEditId(s.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(EMPTY_SPEC);
    setEditId(null);
    setShowForm(false);
    setImgFile(null);
    setImgPreview(null);
    setImgError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  /* ── UI ── */
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

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

      {/* Əlavə et düyməsi */}
      {!showForm && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_SPEC); }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            Mütəxəssis əlavə et
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              {editId ? "Mütəxəssisi redaktə et" : "Yeni mütəxəssis"}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Ad */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Ad Soyad *</label>
              <input
                value={form.full_name}
                onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                placeholder="Dr. Aynur Həsənova"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
              />
            </div>

            {/* Sahə */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Sahə *</label>
              <select
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white"
              >
                <option value="">Seçin...</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Təcrübə */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Təcrübə</label>
              <input
                value={form.exp}
                onChange={e => setForm(f => ({ ...f, exp: e.target.value }))}
                placeholder="12 il"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
              <input
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="example@mail.com"
                type="email"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
              />
            </div>

            {/* İxtisas sahələri */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                İxtisas sahələri{" "}
                <span className="normal-case font-normal text-gray-400">(vergüllə ayırın)</span>
              </label>
              <input
                value={form.specialties}
                onChange={e => setForm(f => ({ ...f, specialties: e.target.value }))}
                placeholder="Nitq inkişafı, Autizm, Uşaq psixologiyası"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
              />
            </div>

            {/* Avatar */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Avatar{" "}
                <span className="text-gray-400 normal-case font-normal">
                  (JPG, JPEG, PNG, WebP · max {MAX_MB}MB)
                </span>
              </label>

              {imgPreview ? (
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-gray-200">
                  <img src={imgPreview} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImg}
                    className="absolute top-1.5 right-1.5 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center shadow-md"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-xs" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="avatar-upload"
                  className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
                >
                  <FontAwesomeIcon icon={faImage} className="text-2xl text-gray-300 group-hover:text-emerald-400 mb-1.5" />
                  <p className="text-xs text-gray-400 text-center px-2">Şəkil seç</p>
                </label>
              )}

              <input
                id="avatar-upload"
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/jpg,image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleFileSelect}
              />

              {imgError && (
                <div className="mt-2 flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {imgError}
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Haqqında</label>
              <textarea
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                placeholder="Mütəxəssis haqqında qısa məlumat..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm resize-y leading-relaxed"
              />
            </div>
          </div>

          {/* Düymələr */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={imgUploading}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              {imgUploading && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />}
              {imgUploading ? "Yüklənir..." : editId ? "Yenilə" : "Əlavə et"}
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

      {/* Siyahı */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Mütəxəssislər</h2>
          <span className="text-sm text-gray-400">{specialists.length} nəfər</span>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse h-20" />
            ))}
          </div>
        ) : specialists.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">👤</p>
            <p>Hələ mütəxəssis yoxdur</p>
          </div>
        ) : (
          <div className="space-y-3">
            {specialists.map(s => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-sm transition-shadow"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm flex-shrink-0 overflow-hidden">
                  {s.avatar_url
                    ? <img src={s.avatar_url} alt="" className="w-full h-full object-cover" />
                    : (s.full_name?.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase())}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-semibold text-gray-800 text-sm">{s.full_name}</span>
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-full">
                      {s.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {s.exp && <span>{s.exp} təcrübə</span>}
                    {s.specialties?.length > 0 && (
                      <span>{s.specialties.slice(0, 2).join(", ")}{s.specialties.length > 2 ? "..." : ""}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Redaktə
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}