"use server";

import createClient from "@/lib/supabase/server";

export const deleteSchema = async (schemaId: string) => {
  const supabase = await createClient();

  // delete entries data first, and then schema by id
  const { error: entriesError } = await supabase
    .from("content_entries")
    .delete()
    .eq("content_schema_id", schemaId);

  if (entriesError) return { error: entriesError.message };

  const { error: schemaError } = await supabase
    .from("content_schemas")
    .delete()
    .eq("id", schemaId);

  if (schemaError) return { error: schemaError.message };

  return { succes: true };
};

export const deleteEntry = async (entryId: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("content_entries")
    .delete()
    .eq("id", entryId);

  if (error) return { error: error.message };

  return { success: true };
};
