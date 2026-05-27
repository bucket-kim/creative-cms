import { supabaseAnonKey, supabaseUrl } from "@/app/shared/supabaseEnv";
import { createBrowserClient } from "@supabase/ssr";

// runs in browser, has access to browser api, react state, event handler

export const createClient = () => {
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
};
