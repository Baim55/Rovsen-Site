import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCheck,
  faXmark,
  faRotateLeft,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

export default function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetchTest();
  }, [id]);

  async function fetchTest() {
    setLoading(true);
    const { data } = await supabase
      .from("tests")
      .select("*, test_questions(*)")
      .eq("id", id)
      .single();
    if (data) {
      setTest(data);

      // PDF tipidirsə — birbaşa aç
      if (data.type === "pdf" && data.pdf_url) {
        window.open(data.pdf_url, "_blank");
        navigate(-1);
        return;
      }

      // URL tipidirsə — xarici linkə yönləndir
      if (data.type === "url" && data.url) {
        window.open(data.url, "_blank");
        navigate(-1);
        return;
      }

      setQuestions(
        (data.test_questions || []).sort((a, b) => a.order_num - b.order_num),
      );
    }
    setLoading(false);
  }

  function handleSelect(optIndex) {
    if (finished) return;
    setSelected((prev) => ({ ...prev, [current]: optIndex }));
  }

  function handleNext() {
    if (current < questions.length - 1) setCurrent((c) => c + 1);
    else setFinished(true);
  }

  function handlePrev() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  function handleRestart() {
    setSelected({});
    setCurrent(0);
    setFinished(false);
  }

  if (loading)
    return (
      <div className="min-h-screen mt-25 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!test)
    return (
      <div className="min-h-screen mt-25 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="mb-4">Test tapılmadı</p>
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-600 font-semibold"
          >
            Geri qayıt
          </button>
        </div>
      </div>
    );

  const correctCount = questions.filter(
    (q, i) => selected[i] === q.correct,
  ).length;
  const percent = questions.length
    ? Math.round((correctCount / questions.length) * 100)
    : 0;

  /* ── Nəticə ── */
  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50 mt-25">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
                percent >= 70
                  ? "bg-emerald-50"
                  : percent >= 40
                    ? "bg-amber-50"
                    : "bg-red-50"
              }`}
            >
              <span
                className={`text-3xl font-bold ${
                  percent >= 70
                    ? "text-emerald-500"
                    : percent >= 40
                      ? "text-amber-500"
                      : "text-red-500"
                }`}
              >
                {percent}%
              </span>
            </div>

            <h2
              className="text-2xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {percent >= 70
                ? "Əla nəticə!"
                : percent >= 40
                  ? "Yaxşı cəhd!"
                  : "Davam edin!"}
            </h2>
            <p className="text-gray-500 mb-2">
              {questions.length} sualdan{" "}
              <span className="font-bold text-emerald-600">{correctCount}</span>{" "}
              düzgün cavabladınız
            </p>
            <p
              className={`text-sm font-semibold mb-8 ${
                percent >= 70
                  ? "text-emerald-600"
                  : percent >= 40
                    ? "text-amber-600"
                    : "text-red-500"
              }`}
            >
              {percent >= 70
                ? "Bu sahədə bilikləriniz yaxşıdır!"
                : percent >= 40
                  ? "Bir az daha çalışın!"
                  : "Bu mövzunu daha dərindən öyrənin."}
            </p>

            {/* Sual-cavab icmalı */}
            <div className="text-left space-y-3 mb-8">
              {questions.map((q, i) => {
                const isCorrect = selected[i] === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`rounded-xl p-4 border-2 ${isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isCorrect ? "bg-emerald-500" : "bg-red-500"}`}
                      >
                        <FontAwesomeIcon
                          icon={isCorrect ? faCheck : faXmark}
                          className="text-white text-xs"
                        />
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        {i + 1}. {q.question}
                      </p>
                    </div>
                    {q.image_url && (
                      <img
                        src={q.image_url}
                        alt=""
                        className="w-full max-h-32 object-cover rounded-lg mb-2"
                      />
                    )}
                    <div className="ml-7 space-y-1">
                      {(q.options || []).map((opt, oi) => (
                        <p
                          key={oi}
                          className={`text-xs px-3 py-1.5 rounded-lg ${
                            oi === q.correct
                              ? "bg-emerald-100 text-emerald-700 font-semibold"
                              : oi === selected[i] && !isCorrect
                                ? "bg-red-100 text-red-700"
                                : "text-gray-500"
                          }`}
                        >
                          {oi === q.correct && "✓ "}
                          {opt}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 border-2 border-gray-200 hover:border-emerald-400 text-gray-600 font-semibold px-6 py-3 rounded-xl text-sm transition-all"
              >
                <FontAwesomeIcon icon={faRotateLeft} /> Yenidən
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Geri
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];

  /* ── Test sualı ── */
  return (
    <div className="min-h-screen bg-gray-50 mt-25">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" /> Geri
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-bold text-gray-800 truncate">
              {test.title}
            </h1>
          </div>
          <span className="text-sm text-gray-400">
            {current + 1} / {questions.length}
          </span>
        </div>

        {/* Progress */}
        <div className="h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Sual kartı */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          {q.image_url && (
            <img
              src={q.image_url}
              alt=""
              className="w-full max-h-52 object-cover rounded-xl mb-5"
            />
          )}
          <p className="text-lg font-bold text-gray-900 mb-6">{q.question}</p>

          <div className="space-y-3">
            {(q.options || []).map((opt, oi) => (
              <button
                key={oi}
                onClick={() => handleSelect(oi)}
                className={`w-full text-left px-5 py-3.5 rounded-xl border-2 font-medium text-sm transition-all ${
                  selected[current] === oi
                    ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-gray-700"
                }`}
              >
                <span
                  className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-xs font-bold mr-3 ${
                    selected[current] === oi
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {String.fromCharCode(65 + oi)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Naviqasiya */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 disabled:opacity-40 text-gray-600 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Əvvəlki
          </button>

          <div className="flex gap-1">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current
                    ? "bg-emerald-500 w-5"
                    : selected[i] !== undefined
                      ? "bg-emerald-300"
                      : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selected[current] === undefined}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
          >
            {current === questions.length - 1 ? "Bitir" : "Növbəti"}
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
