import createClient from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export const CheckIsOwner = async () => {
  const { userId } = await auth();
  const supabase = await createClient();

  const { data: tenant, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("clerk_id", userId)
    .single();

  if (error) {
    return {
      error: error.message,
    };
  }

  const isOwner = userId === tenant.clerk_id;

  return { isOwner };
};
