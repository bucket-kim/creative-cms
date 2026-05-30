"use server";

import createClient from "@/lib/supabase/server";

export const updateSchema = async (
  schemaId: string,
  schemaName: string,
  fields: { name: string; type: string; required: boolean }[],
  removedFieldNames: string[],
) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("content_schemas")
    .update({
      name: schemaName,
      fields: fields,
    })
    .eq("id", schemaId);

  if (error) return { error: error.message };

  if (removedFieldNames.length > 0) {
    const { data: entries } = await supabase
      .from("content_entries")
      .select(`id, fields`)
      .eq("content_schema_id", schemaId);

    if (entries) {
      for (const entry of entries) {
        const updatedField = { ...entry.fields };
        removedFieldNames.forEach((name) => delete updatedField[name]);

        await supabase
          .from("content_entries")
          .update({ fields: updatedField })
          .eq("id", entry.id);
      }
    }
  }

  return { success: true };
};
