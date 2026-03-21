// src/hooks/useArticles.js
import { useState, useEffect } from "react";
import { fetchArticles } from "../api/articlesApi";

/**
 * Məqalələri MockAPI-dan çəkən hook
 *
 * @param {Object} filters
 * @param {string} filters.ageGroup
 * @param {string} filters.category
 * @param {string} [filters.subAge]
 * @param {string} [filters.area]
 *
 * @returns {{ articles, loading, error, refetch }}
 */
export function useArticles(filters = {}) {
  const [articles, setArticles] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  // Filterlər dəyişdikdə yenidən çək
  const key = JSON.stringify(filters);

  useEffect(() => {
    // Əgər ageGroup və ya category yoxdursa — sorğu göndərmə
    if (!filters.ageGroup || !filters.category) {
      setArticles([]);
      return;
    }

    let cancelled = false; // cleanup üçün

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArticles(filters);
        if (!cancelled) setArticles(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => { cancelled = true; };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = () => {
    // key dəyişmədən yenidən çəkmək üçün manual trigger
    setArticles([]);
    setLoading(true);
    fetchArticles(filters)
      .then(setArticles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return { articles, loading, error, refetch };
}