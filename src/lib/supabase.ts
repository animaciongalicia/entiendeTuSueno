import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side client with service role (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

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
