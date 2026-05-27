import { supabaseAnonKey, supabaseUrl } from "@/app/shared/supabaseEnv";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// runs on server, never in browser. user never sees the code. fetches data before the page is sent to browser.

async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {}
      },
    },
  });
}

export default createClient;
