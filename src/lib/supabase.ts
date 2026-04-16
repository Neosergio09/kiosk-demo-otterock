import { createClient } from '@supabase/supabase-js';

// Credentials injected from .env — Supabase Local on port 54331
const supabaseUrl     = import.meta.env.SUPABASE_URL     ?? 'http://127.0.0.1:54331';
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY ?? '';

if (!supabaseAnonKey) {
  console.warn('[supabase] SUPABASE_ANON_KEY is not set. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
