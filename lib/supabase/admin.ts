import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "@/app/shared/supabaseEnv";

// Service role client — bypasses RLS. Server-side only, never import in client components.
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl!, serviceRoleKey);
};
