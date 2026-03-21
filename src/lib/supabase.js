import { createClient } from "@supabase/supabase-js";
 
const SUPABASE_URL  = "https://notxoqtdinwlbejpmwav.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vdHhvcXRkaW53bGJlanBtd2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwODExODksImV4cCI6MjA4OTY1NzE4OX0.wYMfdZsv0hQxYI-eR0AbeUllHtUKeg5POiieHoP4MgI"; 
 
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);