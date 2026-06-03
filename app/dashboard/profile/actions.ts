"use server";

import createClient from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export const updateProfile = async (
  name: string,
  role: string | null,
  bio: string | null,
  avatar_url: string | null,
  location: string | null,
  social_links: Record<string, string>,
) => {
  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  const supabase = await createClient();

  const { error } = await supabase
    .from("tenants")
    .update({
      name,
      role,
      bio,
      avatar_url,
      location,
      social_links,
    })
    .eq("clerk_id", userId);

  if (error) return { error: error.message };

  return { success: true };
};
