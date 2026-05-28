"use server";

import createClient from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function saveSchema(
  schemaName: string,
  fields: { name: string; type: string; required: boolean }[],
) {
  console.log("saveSchema called:", { schemaName, fields });

  const { userId } = await auth();
  console.log("userId:", userId);

  if (!userId) return { error: "Not authenticated" };

  const supabase = await createClient();

  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .select("id")
    .eq("clerk_id", userId)
    .single();

  console.log("tenant:", tenant);
  console.log("tenantError:", tenantError);

  if (!tenant) return { error: "Tenant not found" };

  const { error } = await supabase.from("content_schemas").insert({
    tenant_id: tenant.id,
    name: schemaName,
    fields: fields,
  });

  console.log("insert error:", error);

  if (error) return { error: error.message };

  return { success: true };
}
