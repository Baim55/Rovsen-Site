import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faEdit,
  faXmark,
  faImage,
  faSpinner,
  faBoxOpen,
  faChevronDown,
  faChevronUp,
  faUpload,
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
const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
  age_group: "",
  thumbnail: "",
  type: "questions", // "questions" | "pdf" | "url"
};
const EMPTY_Q = {
  question: "",
  image_url: "",
  options: ["", "", "", ""],
  correct: 0,
};

export function TestsTab({ user, profile }) {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [questions, setQuestions] = useState([
    { ...EMPTY_Q, options: ["", "", "", ""] },
  ]);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const thumbRef = useRef(null);

  useEffect(() => {
    fetchTests();
  }, []);

  async function fetchTests() {
    setLoading(true);
    const query = supabase
      .from("tests")
      .select("*, test_questions(*)")
      .order("created_at", { ascending: false });
    if (profile?.role !== "admin") query.eq("author_id", user.id);
    const { data } = await query;
    setTests(data || []);
    setLoading(false);
  }

  async function uploadThumb() {
    if (!thumbFile) return form.thumbnail || null;
    setUploading(true);
    const ext = thumbFile.name.split(".").pop();
    const path = `tests/${user.id}_${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("article-images")
      .upload(path, thumbFile, { upsert: true });
    if (error) {
      setUploading(false);
      return null;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("article-images").getPublicUrl(path);
    setUploading(false);
    return publicUrl;
  }

  async function uploadQuestionImage(file, idx) {
    if (!file) return null;
    const ext = file.name.split(".").pop();
    const path = `tests/q_${user.id}_${Date.now()}_${idx}.${ext}`;
    const { error } = await supabase.storage
      .from("article-images")
      .upload(path, file, { upsert: true });
    if (error) return null;
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

    if (
      form.type === "questions" &&
      questions.some((q) => !q.question || q.options.some((o) => !o))
    ) {
      setMsg({ type: "error", text: "Bütün sual və seçimləri doldurun" });
      return;
    }

    if (form.type === "url" && !form.url) {
      setMsg({ type: "error", text: "Test linkini daxil edin" });
      return;
    }

    if (form.type === "pdf" && !form.pdf_url) {
      setMsg({ type: "error", text: "PDF fayl yükləyin" });
      return;
    }

    const thumbUrl = await uploadThumb();
    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      age_group: form.age_group,
      type: form.type,
      thumbnail: thumbUrl,
      author_id: user.id,
      url: form.type === "url" ? form.url || "" : "",
      pdf_url: form.type === "pdf" ? form.pdf_url || "" : "",
    };

    let testId = editId;

    if (editId) {
      await supabase.from("tests").update(payload).eq("id", editId);
      await supabase.from("test_questions").delete().eq("test_id", editId);
    } else {
      const { data } = await supabase
        .from("tests")
        .insert(payload)
        .select()
        .single();
      testId = data?.id;
    }

    if (!testId) {
      setMsg({ type: "error", text: "Xəta baş verdi" });
      return;
    }

    // Yalnız "questions" tipində sualları yüklə
    if (form.type === "questions" && questions.length > 0) {
      const qPayload = await Promise.all(
        questions.map(async (q, i) => {
          let imgUrl = q.image_url;
          if (q._imageFile)
            imgUrl = (await uploadQuestionImage(q._imageFile, i)) || "";
          return {
            test_id: testId,
            question: q.question,
            image_url: imgUrl || "",
            options: q.options,
            correct: q.correct,
            order_num: i,
          };
        }),
      );
      await supabase.from("test_questions").insert(qPayload);
    }

    setMsg({
      type: "success",
      text: editId ? "Yeniləndi ✓" : "Əlavə edildi ✓",
    });
    resetForm();
    fetchTests();
    setTimeout(() => setMsg(null), 3000);
  }

  async function handleDelete(id) {
    if (!confirm("Silinsin?")) return;
    await supabase.from("tests").delete().eq("id", id);
    setTests((prev) => prev.filter((t) => t.id !== id));
  }

  function handleEdit(test) {
    setForm({
      title: test.title,
      description: test.description || "",
      category: test.category || "",
      age_group: test.age_group || "",
      thumbnail: test.thumbnail || "",
      type: test.type || "questions",
      url: test.url || "",
      pdf_url: test.pdf_url || "",
    });
    setThumbPreview(test.thumbnail || null);
    setThumbFile(null);
    const qs = (test.test_questions || [])
      .sort((a, b) => a.order_num - b.order_num)
      .map((q) => ({
        question: q.question,
        image_url: q.image_url || "",
        options: q.options,
        correct: q.correct,
      }));
    setQuestions(qs.length ? qs : [{ ...EMPTY_Q, options: ["", "", "", ""] }]);
    setEditId(test.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
    setQuestions([{ ...EMPTY_Q, options: ["", "", "", ""] }]);
    setThumbFile(null);
    setThumbPreview(null);
    if (thumbRef.current) thumbRef.current.value = "";
  }

  /* sual əməliyyatları */
  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      { ...EMPTY_Q, options: ["", "", "", ""] },
    ]);
  }
  function removeQuestion(i) {
    setQuestions((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateQuestion(i, field, value) {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === i ? { ...q, [field]: value } : q)),
    );
  }
  function updateOption(qi, oi, value) {
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === qi
          ? {
              ...q,
              options: q.options.map((o, oidx) => (oidx === oi ? value : o)),
            }
          : q,
      ),
    );
  }
  function handleQImage(i, file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === i ? { ...q, image_url: url, _imageFile: file } : q,
      ),
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {!showForm && (
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} /> Test əlavə et
          </button>
        </div>
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
              {editId ? "Testi redaktə et" : "Yeni test"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Başlıq *
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Testin adı..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
              />
            </div>
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
            {/* Tip seçimi */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Test növü *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    key: "questions",
                    label: "📝 Suallar",
                    desc: "Sual-cavab formatı",
                  },
                  { key: "pdf", label: "📄 PDF", desc: "PDF fayl yüklə" },
                  { key: "url", label: "🔗 Link", desc: "Xarici link" },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, type: t.key }))}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      form.type === t.key
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    <div className="text-lg mb-1">{t.label.split(" ")[0]}</div>
                    <div className="text-xs font-bold text-gray-800">
                      {t.label.split(" ").slice(1).join(" ")}
                    </div>
                    <div className="text-xs text-gray-400">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
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
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Qısa təsvir
              </label>
              <input
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Test haqqında..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
              />
            </div>

            {/* Thumbnail */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Üz şəkli
              </label>
              {thumbPreview ? (
                <div className="relative w-full rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50">
                  <img
                    src={thumbPreview}
                    alt=""
                    className="w-full max-h-40 object-cover"
                  />
                  <button
                    onClick={() => {
                      setThumbFile(null);
                      setThumbPreview(null);
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
                  htmlFor="thumb-upload"
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all"
                >
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-2xl text-gray-300 mb-1"
                  />
                  <p className="text-sm text-gray-400">Şəkil seçin</p>
                </label>
              )}
              <input
                id="thumb-upload"
                ref={thumbRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setThumbFile(f);
                    setThumbPreview(URL.createObjectURL(f));
                  }
                }}
              />
            </div>
            {/* URL tipi */}
            {form.type === "url" && (
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Test linki *
                </label>
                <input
                  value={form.url || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, url: e.target.value }))
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Google Forms, Typeform və ya digər test platformaları
                </p>
              </div>
            )}

            {/* PDF tipi */}
            {form.type === "pdf" && (
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  PDF fayl *
                </label>
                {form.pdf_url ? (
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
                    <span className="text-red-500 text-2xl">📄</span>
                    <span className="text-sm text-gray-700 flex-1 truncate">
                      {form.pdf_url}
                    </span>
                    <button
                      onClick={() => setForm((p) => ({ ...p, pdf_url: "" }))}
                      className="w-7 h-7 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <FontAwesomeIcon icon={faXmark} className="text-xs" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="test-pdf-upload"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all"
                  >
                    <FontAwesomeIcon
                      icon={faUpload}
                      className="text-2xl text-gray-300 mb-2"
                    />
                    <p className="text-sm text-gray-400">
                      PDF yükləmək üçün klikləyin
                    </p>
                  </label>
                )}
                <input
                  id="test-pdf-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    const path = `tests/pdf_${user.id}_${Date.now()}.pdf`;
                    const { error } = await supabase.storage
                      .from("documents")
                      .upload(path, file, { upsert: true });
                    if (!error) {
                      const {
                        data: { publicUrl },
                      } = supabase.storage.from("documents").getPublicUrl(path);
                      setForm((p) => ({ ...p, pdf_url: publicUrl }));
                    }
                    setUploading(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* ── Suallar ── */}
          {form.type === "questions" && (
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Suallar</h3>
                <button
                  onClick={addQuestion}
                  className="flex items-center gap-2 text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  <FontAwesomeIcon icon={faPlus} /> Sual əlavə et
                </button>
              </div>

              <div className="space-y-4">
                {questions.map((q, qi) => (
                  <div
                    key={qi}
                    className="bg-gray-50 rounded-2xl border border-gray-200 p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-gray-700">
                        Sual {qi + 1}
                      </span>
                      {questions.length > 1 && (
                        <button
                          onClick={() => removeQuestion(qi)}
                          className="w-7 h-7 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-xs" />
                        </button>
                      )}
                    </div>

                    <input
                      value={q.question}
                      onChange={(e) =>
                        updateQuestion(qi, "question", e.target.value)
                      }
                      placeholder="Sualı yazın..."
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm mb-3"
                    />

                    {/* Sual şəkli */}
                    <div className="mb-3">
                      {q.image_url ? (
                        <div className="relative w-full max-w-xs rounded-xl overflow-hidden border border-gray-200">
                          <img
                            src={q.image_url}
                            alt=""
                            className="w-full h-32 object-cover"
                          />
                          <button
                            onClick={() => updateQuestion(qi, "image_url", "")}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-md flex items-center justify-center text-xs"
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor={`q-img-${qi}`}
                          className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer hover:text-emerald-500 transition-colors"
                        >
                          <FontAwesomeIcon icon={faImage} /> Şəkil əlavə et
                          (istəyə bağlı)
                        </label>
                      )}
                      <input
                        id={`q-img-${qi}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleQImage(qi, f);
                        }}
                      />
                    </div>

                    {/* Seçimlər */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${qi}`}
                            checked={q.correct === oi}
                            onChange={() => updateQuestion(qi, "correct", oi)}
                            className="accent-emerald-500 flex-shrink-0"
                          />
                          <input
                            value={opt}
                            onChange={(e) =>
                              updateOption(qi, oi, e.target.value)
                            }
                            placeholder={`Seçim ${oi + 1}...`}
                            className={`flex-1 px-3 py-2 rounded-xl border-2 text-sm focus:outline-none transition-colors ${
                              q.correct === oi
                                ? "border-emerald-400 bg-emerald-50"
                                : "border-gray-200 focus:border-emerald-400"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      ● işarəli seçim düzgün cavabdır
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

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

      {/* ── Testlər siyahısı ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {profile?.role === "admin" ? "Bütün testlər" : "Testlərim"}
          </h2>
          <span className="text-sm text-gray-400">{tests.length} test</span>
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
        ) : tests.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FontAwesomeIcon
              icon={faBoxOpen}
              className="text-4xl text-gray-200 mb-3"
            />
            <p>Hələ test yoxdur</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div className="p-5 flex items-center gap-4">
                  {test.thumbnail && (
                    <img
                      src={test.thumbnail}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
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
                    <h3 className="text-gray-800 font-semibold text-sm truncate">
                      {test.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() =>
                        setExpanded(expanded === test.id ? null : test.id)
                      }
                      className="w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={
                          expanded === test.id ? faChevronUp : faChevronDown
                        }
                        className="text-xs text-gray-500"
                      />
                    </button>
                    <button
                      onClick={() => handleEdit(test)}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Redaktə
                    </button>
                    <button
                      onClick={() => handleDelete(test.id)}
                      className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>

                {expanded === test.id && (
                  <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                    {(test.test_questions || [])
                      .sort((a, b) => a.order_num - b.order_num)
                      .map((q, i) => (
                        <div key={q.id} className="mb-3 last:mb-0">
                          <p className="text-sm font-semibold text-gray-700 mb-1">
                            {i + 1}. {q.question}
                          </p>
                          <div className="grid grid-cols-2 gap-1">
                            {(q.options || []).map((opt, oi) => (
                              <p
                                key={oi}
                                className={`text-xs px-2 py-1 rounded-lg ${q.correct === oi ? "bg-emerald-100 text-emerald-700 font-semibold" : "bg-white text-gray-500"}`}
                              >
                                {oi + 1}. {opt}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
