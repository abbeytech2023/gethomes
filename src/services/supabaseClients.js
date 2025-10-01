import { createClient } from "@supabase/supabase-js";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsdWVra3Bsenpsc3NwbXhtb2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTAzNjcsImV4cCI6MjA2MzUyNjM2N30.MxYwxrYUwA4HVP3CRGvRl8hfia6qZWmQHC-KhQgrrZs";
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
