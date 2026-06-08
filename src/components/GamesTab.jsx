// src/components/GamesTab.jsx
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faImage,
  faSpinner,
  faBoxOpen,
  faGamepad,
  faFilePdf,
  faVideo,
  faTrash,
  faUpload,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = [
  "Uşaqlar",
  "Valideynlər",
  "Pedaqoqlar",
  "Psixoloqlar",
  "Loqopedlər",
  "EQ",
  "IQ",
  "Mentorlar",
];
const AGE_GROUPS = ["1-6", "6-10", "11-17", "18+"];

const MATERIAL_TYPES = [
  {
    key: "pdf",
    label: "PDF Sənəd",
    icon: faFilePdf,
    accept: "application/pdf",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    key: "image",
    label: "Şəkil",
    icon: faImage,
    accept: "image/*",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    key: "video",
    label: "Video",
    icon: faVideo,
    accept: "video/mp4,video/webm",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
  age_group: "",
  url: "",
  thumbnail: "",
};

const EMPTY_MATERIAL = { title: "", type: "pdf", file: null, preview: null };

export function GamesTab({ user, profile }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbPrev, setThumbPrev] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [newMaterials, setNewMaterials] = useState([]);
  const [matLoading, setMatLoading] = useState(false);
  const thumbRef = useRef(null);

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    setLoading(true);
    let query = supabase
      .from("games")
      .select("*")
      .order("created_at", { ascending: false });
    if (profile?.role !== "admin") query = query.eq("author_id", user.id);
    const { data } = await query;
    setGames(data || []);
    setLoading(false);
  }

  async function fetchMaterials(gameId) {
    if (!gameId) {
      setMaterials([]);
      return;
    }
    setMatLoading(true);
    const { data } = await supabase
      .from("game_materials")
      .select("*")
      .eq("game_id", gameId)
      .order("created_at", { ascending: true });
    setMaterials(data || []);
    setMatLoading(false);
  }

  async function uploadThumb() {
    if (!thumbFile) return form.thumbnail || null;
    const ext = thumbFile.name.split(".").pop();
    const path = `games/${user.id}_${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("article-images")
      .upload(path, thumbFile, { upsert: true });
    if (error) return null;
    const {
      data: { publicUrl },
    } = supabase.storage.from("article-images").getPublicUrl(path);
    return publicUrl;
  }

  async function uploadMaterialFile(mat) {
    const ext = mat.file.name.split(".").pop();
    const folder =
      mat.type === "pdf" ? "pdfs" : mat.type === "video" ? "videos" : "images";
    const path = `game-materials/${folder}/${user.id}_${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("article-images")
      .upload(path, mat.file, { upsert: true });
    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabase.storage.from("article-images").getPublicUrl(path);
    return publicUrl;
  }

  async function handleSave() {
    if (!form.title || !form.category || !form.age_group) {
      setMsg({
        type: "error",
        text: "Başlıq, kateqoriya və yaş qrupu mütləqdir",
      });
      return;
    }

    const hasUrl = form.url.trim() !== "";
    const hasMaterials = newMaterials.length > 0 || materials.length > 0;

    if (!hasUrl && !hasMaterials) {
      setMsg({
        type: "error",
        text: "Oyun linki və ya ən azı 1 material əlavə edin",
      });
      return;
    }

    setUploading(true);
    const thumbUrl = await uploadThumb();

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      age_group: form.age_group,
      type: "url",
      game_key: null,
      url: hasUrl ? form.url : null,
      thumbnail: thumbUrl,
      author_id: user.id,
    };

    let gameId = editId;
    let error;
    if (editId) {
      ({ error } = await supabase
        .from("games")
        .update(payload)
        .eq("id", editId));
    } else {
      const { data: inserted, error: insErr } = await supabase
        .from("games")
        .insert(payload)
        .select()
        .single();
      error = insErr;
      if (inserted) gameId = inserted.id;
    }

    if (error) {
      setMsg({ type: "error", text: "Xəta: " + error.message });
      setUploading(false);
      return;
    }

    if (gameId && newMaterials.length > 0) {
      for (const mat of newMaterials) {
        if (!mat.file) continue;
        try {
          const fileUrl = await uploadMaterialFile(mat);
          await supabase.from("game_materials").insert({
            game_id: gameId,
            title: mat.title || mat.file.name,
            type: mat.type,
            file_url: fileUrl,
            file_size: mat.file.size,
          });
        } catch (e) {
          console.error("Material yüklənmədi:", e);
        }
      }
    }

    setUploading(false);
    setMsg({
      type: "success",
      text: editId ? "Yeniləndi ✓" : "Əlavə edildi ✓",
    });
    resetForm();
    fetchGames();
    setTimeout(() => setMsg(null), 3000);
  }

  async function handleDeleteMaterial(matId) {
    if (!confirm("Bu material silinsin?")) return;
    await supabase.from("game_materials").delete().eq("id", matId);
    setMaterials((prev) => prev.filter((m) => m.id !== matId));
  }

  async function handleDelete(id) {
    if (!confirm("Silinsin?")) return;
    await supabase.from("games").delete().eq("id", id);
    setGames((prev) => prev.filter((g) => g.id !== id));
  }

  function handleEdit(game) {
    setForm({
      title: game.title,
      description: game.description || "",
      category: game.category || "",
      age_group: game.age_group || "",
      url: game.url || "",
      thumbnail: game.thumbnail || "",
    });
    setThumbPrev(game.thumbnail || null);
    setThumbFile(null);
    setEditId(game.id);
    setNewMaterials([]);
    fetchMaterials(game.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
    setThumbFile(null);
    setThumbPrev(null);
    setNewMaterials([]);
    setMaterials([]);
    if (thumbRef.current) thumbRef.current.value = "";
  }

  function addNewMaterial() {
    setNewMaterials((prev) => [...prev, { ...EMPTY_MATERIAL, id: Date.now() }]);
  }

  function updateNewMaterial(id, field, value) {
    setNewMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  }

  function removeNewMaterial(id) {
    setNewMaterials((prev) => prev.filter((m) => m.id !== id));
  }

  function handleMaterialFile(id, file) {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setNewMaterials((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        return {
          ...m,
          file,
          preview,
          title: m.title || file.name.replace(/\.[^.]+$/, ""),
        };
      }),
    );
  }

  const matTypeIcon = (type) =>
    MATERIAL_TYPES.find((m) => m.key === type)?.icon || faFileAlt;
  const matTypeBg = (type) =>
    MATERIAL_TYPES.find((m) => m.key === type)?.bg || "bg-gray-50";
  const matTypeColor = (type) =>
    MATERIAL_TYPES.find((m) => m.key === type)?.color || "text-gray-500";

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {!showForm && (
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm(EMPTY_FORM);
            setNewMaterials([]);
            setMaterials([]);
          }}
          className="mb-6 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} /> Oyun əlavə et
        </button>
      )}

      {msg && (
        <div
          className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
            msg.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* ── Form ── */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              {editId ? "Oyunu redaktə et" : "Yeni oyun"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Başlıq */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Başlıq *
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Oyunun adı..."
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
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white"
              >
                <option value="">Seçin...</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Yaş qrupu */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Yaş qrupu *
              </label>
              <select
                value={form.age_group}
                onChange={(e) =>
                  setForm((p) => ({ ...p, age_group: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white"
              >
                <option value="">Seçin...</option>
                {AGE_GROUPS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Təsvir */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Qısa təsvir
              </label>
              <input
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Oyun haqqında..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
              />
            </div>

            {/* Oyun linki */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Oyun linki
                <span className="normal-case font-normal text-gray-400 ml-1">
                  (istəyə bağlı — material varsa boş ola bilər)
                </span>
              </label>
              <input
                value={form.url}
                onChange={(e) =>
                  setForm((p) => ({ ...p, url: e.target.value }))
                }
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
              />
            </div>

            {/* Üz şəkli */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Üz şəkli
              </label>
              {thumbPrev ? (
                <div className="relative w-full rounded-xl overflow-hidden border-2 border-gray-200">
                  <img
                    src={thumbPrev}
                    alt=""
                    className="w-full max-h-40 object-cover"
                  />
                  <button
                    onClick={() => {
                      setThumbFile(null);
                      setThumbPrev(null);
                      setForm((p) => ({ ...p, thumbnail: "" }));
                      if (thumbRef.current) thumbRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="game-thumb"
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all"
                >
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-2xl text-gray-300 mb-1"
                  />
                  <p className="text-sm text-gray-400">Üz şəkli seçin</p>
                </label>
              )}
              <input
                id="game-thumb"
                ref={thumbRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setThumbFile(f);
                    setThumbPrev(URL.createObjectURL(f));
                  }
                }}
              />
            </div>

            {/* Materiallar */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    📎 Materiallar
                  </label>
                  <p className="text-xs text-gray-400 mt-0.5">
                    PDF, Şəkil, Video — evdə oynanış üçün rehber
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addNewMaterial}
                  className="flex items-center gap-1.5 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faPlus} /> Material əlavə et
                </button>
              </div>

              {matLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />{" "}
                  Materiallar yüklənir...
                </div>
              )}

              {!matLoading && materials.length > 0 && (
                <div className="space-y-2 mb-3">
                  <p className="text-xs text-gray-500 font-medium">
                    Mövcud materiallar:
                  </p>
                  {materials.map((mat) => (
                    <div
                      key={mat.id}
                      className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <div
                        className={`w-8 h-8 ${matTypeBg(mat.type)} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <FontAwesomeIcon
                          icon={matTypeIcon(mat.type)}
                          className={`${matTypeColor(mat.type)} text-sm`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {mat.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {mat.type.toUpperCase()} ·{" "}
                          {mat.file_size
                            ? `${(mat.file_size / 1024 / 1024).toFixed(1)}MB`
                            : ""}
                        </p>
                      </div>
                      <a
                        href={mat.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-2.5 py-1 rounded-lg transition-colors"
                      >
                        Bax
                      </a>
                      <button
                        onClick={() => handleDeleteMaterial(mat.id)}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {newMaterials.length > 0 && (
                <div className="space-y-3">
                  {materials.length > 0 && (
                    <p className="text-xs text-gray-500 font-medium">
                      Yeni materiallar:
                    </p>
                  )}
                  {newMaterials.map((mat) => (
                    <NewMaterialRow
                      key={mat.id}
                      mat={mat}
                      onUpdate={(field, val) =>
                        updateNewMaterial(mat.id, field, val)
                      }
                      onFile={(file) => handleMaterialFile(mat.id, file)}
                      onRemove={() => removeNewMaterial(mat.id)}
                    />
                  ))}
                </div>
              )}

              {newMaterials.length === 0 &&
                materials.length === 0 &&
                !matLoading && (
                  <div className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                    <FontAwesomeIcon
                      icon={faUpload}
                      className="text-xl mb-1 text-gray-300"
                    />
                    <p className="text-xs">
                      Material əlavə etmək üçün yuxarıdakı düyməni klikləyin
                    </p>
                  </div>
                )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={uploading}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              {uploading && (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              )}
              {uploading ? "Yüklənir..." : editId ? "Yenilə" : "Əlavə et"}
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

      {/* ── Oyunlar siyahısı ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {profile?.role === "admin" ? "Bütün oyunlar" : "Oyunlarım"}
          </h2>
          <span className="text-sm text-gray-400">{games.length} oyun</span>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse h-20"
              />
            ))}
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FontAwesomeIcon
              icon={faBoxOpen}
              className="text-4xl text-gray-200 mb-3"
            />
            <p>Hələ oyun yoxdur</p>
          </div>
        ) : (
          <div className="space-y-3">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
              >
                {game.thumbnail ? (
                  <img
                    src={game.thumbnail}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon
                      icon={faGamepad}
                      className="text-emerald-400 text-xl"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                      {game.age_group}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">
                      {game.category}
                    </span>
                    {game.url && (
                      <span className="text-xs bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full">
                        🔗 Link
                      </span>
                    )}
                  </div>
                  <h3 className="text-gray-800 font-semibold text-sm truncate">
                    {game.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(game)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Redaktə
                  </button>
                  <button
                    onClick={() => handleDelete(game.id)}
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

/* ── Yeni material sırası ── */
function NewMaterialRow({ mat, onUpdate, onFile, onRemove }) {
  const fileRef = useRef(null);
  const matType =
    MATERIAL_TYPES.find((m) => m.key === mat.type) || MATERIAL_TYPES[0];

  function handleTypeChange(key) {
    onUpdate("type", key);
    onUpdate("file", null);
    onUpdate("preview", null);
    // input-u DOM-dan sıfırla
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  }

  return (
    <div className="border-2 border-dashed border-emerald-200 bg-emerald-50/30 rounded-xl p-4">
      <div className="flex items-start gap-3">
        {/* Format seçimi */}
        <div className="flex-shrink-0">
          <p className="text-xs text-gray-500 font-medium mb-1.5">Format</p>
          <div className="flex gap-1.5">
            {MATERIAL_TYPES.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => handleTypeChange(t.key)}
                className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center transition-all ${
                  mat.type === t.key
                    ? "border-emerald-400 bg-white shadow-sm"
                    : "border-gray-200 bg-white hover:border-emerald-300"
                }`}
                title={t.label}
              >
                <FontAwesomeIcon
                  icon={t.icon}
                  className={mat.type === t.key ? t.color : "text-gray-400"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Ad */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-medium mb-1.5">
            Material adı
          </p>
          <input
            value={mat.title}
            onChange={(e) => onUpdate("title", e.target.value)}
            placeholder="Məs: Evdə oyun qaydaları..."
            className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
          />
        </div>

        {/* Sil */}
        <button
          onClick={onRemove}
          type="button"
          className="flex-shrink-0 w-8 h-8 mt-5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>
      </div>

      {/* Fayl seçimi — key={mat.type} ilə tam yenidən render olur */}
      <div className="mt-3">
        {mat.file ? (
          <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 border border-gray-200">
            <FontAwesomeIcon
              icon={matType.icon}
              className={`${matType.color} text-sm flex-shrink-0`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-700 truncate">
                {mat.file.name}
              </p>
              <p className="text-xs text-gray-400">
                {(mat.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {mat.type === "image" && mat.preview && (
              <img
                src={mat.preview}
                alt=""
                className="w-10 h-10 rounded object-cover flex-shrink-0"
              />
            )}
            <button
              onClick={() => {
                onUpdate("file", null);
                onUpdate("preview", null);
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="text-gray-400 hover:text-red-500 flex-shrink-0"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xs" />
            </button>
          </div>
        ) : (
          <label
            key={mat.type} // ← type dəyişəndə label+input yenidən yaranır
            className="flex items-center gap-2 cursor-pointer bg-white border-2 border-dashed border-gray-200 hover:border-emerald-400 rounded-lg px-4 py-2.5 transition-colors group"
          >
            <FontAwesomeIcon
              icon={faUpload}
              className="text-gray-300 group-hover:text-emerald-400 transition-colors"
            />
            <span className="text-sm text-gray-400 group-hover:text-emerald-500 transition-colors">
              {matType.label} seçin...
            </span>
            <input
              key={mat.type}
              ref={fileRef}
              type="file"
              accept={matType.accept}
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}
