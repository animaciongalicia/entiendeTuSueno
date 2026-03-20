import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-side client with service role (bypasses RLS) — lazy singleton
let _supabaseAdmin: SupabaseClient | null = null;

export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabaseAdmin) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error("Supabase env vars not set");
      }
      _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    }
    return (_supabaseAdmin as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type DreamReport = {
  id: string;
  created_at: string;
  email: string | null;
  dream: string;
  feelings: string[];
  symbols: string[];
  free_result: string;
  premium_result: string;
  paid: boolean;
  stripe_session_id: string | null;
};
