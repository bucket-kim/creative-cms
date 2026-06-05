"use server";

import createClient from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

const defaultFields = [
  { name: "project_name", type: "text", required: true },
  { name: "description", type: "text", required: true },
  { name: "demo_url", type: "url", required: false },
  { name: "github_url", type: "url", required: false },
  { name: "tech_stack", type: "tags", required: false },
  { name: "published", type: "boolean", required: false },
  { name: "thumbnail", type: "image", required: false },
];

export async function saveSchema(
  schemaName: string,
  entryData: {
    project_name: string;
    description: string;
    demo_url: string;
    github_url: string;
    tech_stack: string;
    published: string;
    thumbnail: string;
  },
) {
  const { userId } = await auth();
  console.log("userId:", userId);

  if (!userId) return { error: "Not authenticated" };

  const supabase = await createClient();

  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (!tenant) return { error: "Tenant not found" };

  const { data: schema, error: schemaError } = await supabase
    .from("content_schemas")
    .insert({
      tenant_id: tenant.id,
      name: schemaName,
      fields: defaultFields,
    })
    .select("id")
    .single();

  if (schemaError) return { error: schemaError.message };

  const { error: entryError } = await supabase.from("content_entries").insert({
    tenant_id: tenant.id,
    content_schema_id: schema.id,
    fields: entryData,
  });

  if (entryError) return { error: entryError.message };

  return { success: true, schemaId: schema.id };
}
