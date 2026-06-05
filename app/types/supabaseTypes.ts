import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type FieldTypes = "text" | "url" | "tags" | "boolean" | "image";

export interface SchemaField {
  name: string;
  type: FieldTypes;
  required: boolean;
}

export interface ContentEntryType {
  id: string;
  tenant_id: string;
  content_schema_id: string;
  fields: Record<string, unknown>;
  created_at: string;
}

export interface ContentSchemaType {
  id: string;
  tenant_id: string;
  name: string;
  fields: SchemaField[];
  content_entries?: Pick<ContentEntryType, "id" | "fields">[];
  created_at: string;
  type: string;
}

export interface TenantType {
  id: string;
  username: string;
  name: string;
  role: string;
  bio: string;
  avatar_url: string | StaticImport;
  location: string;
  social_links: Record<string, string>;
  content_schemas: ContentSchemaType[];
  content_entries: ContentEntryType[];
  created_at: string;
}
