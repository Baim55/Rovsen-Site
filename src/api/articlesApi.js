// src/api/articlesApi.js
// Artıq MockAPI yox, Supabase istifadə olunur
import { supabase } from "../lib/supabase";

export async function fetchArticles({ ageGroup, category, subAge, area } = {}) {
  let query = supabase.from("articles").select("*");

  if (ageGroup) query = query.eq("age_group", ageGroup);
  if (category) query = query.eq("category",  category);
  if (subAge)   query = query.eq("sub_age",   subAge);
  if (area)     query = query.eq("area",      area);

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}