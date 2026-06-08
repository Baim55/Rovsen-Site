import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch, faBoxOpen, faRotateRight,
  faClipboardList, faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = ["Hamısı","Uşaqlar","Valideynlər","Pedaqoqlar","Psixoloqlar","Loqopedlər","EQ","IQ","Mentorlar"];

export default function TestsPage() {
  const navigate = useNavigate();
  const [tests, setTests]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [activeCategory, setActiveCategory] = useState("Hamısı");

  useEffect(() => { fetchTests(); }, []);

  async function fetchTests() {
    setLoading(true);
    const { data } = await supabase
      .from("tests")
      .select("*, test_questions(id)")
      .order("created_at", { ascending: false });
    setTests(data || []);
    setLoading(false);
  }

  const filtered = tests.filter(t => {
    const matchSearch = t.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Hamısı" || t.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-25">
      <div className="bg-white border-b border-gray-200 px-6 py-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-emerald-600 font-semibold text-xs tracking-widest mb-2">TESTLƏR</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily:"'Georgia', serif" }}>
            İnkişaf testləri
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Özünüzü və uşaqlarınızı daha yaxşı tanıyın
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Test axtar..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none text-sm bg-white" />
          </div>
          <button onClick={fetchTests} className="w-12 h-12 rounded-2xl bg-white border-2 border-gray-200 hover:border-emerald-400 flex items-center justify-center transition-colors">
            <FontAwesomeIcon icon={faRotateRight} className="text-gray-500 text-sm" />
          </button>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat ? "bg-emerald-500 text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
              }`}>{cat}</button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse h-40" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FontAwesomeIcon icon={faBoxOpen} className="text-5xl text-gray-200 mb-4" />
            <p>Test tapılmadı</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(test => (
              <div key={test.id}
                onClick={() => navigate(`/test/${test.id}`)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group overflow-hidden">
                {test.thumbnail ? (
                  <img src={test.thumbnail} alt="" className="w-full h-36 object-cover" />
                ) : (
                  <div className="w-full h-36 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                    <FontAwesomeIcon icon={faClipboardList} className="text-4xl text-emerald-200" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">{test.age_group}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">{test.category}</span>
                    <span className="text-xs text-gray-400">{test.test_questions?.length || 0} sual</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{test.title}</h3>
                  {test.description && <p className="text-xs text-gray-400 line-clamp-2 mb-3">{test.description}</p>}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    Testi keç <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}