import createClient from "@/lib/supabase/server"
import { FC } from "react"
import EntryForm from "./EntryForm"

interface NewEntryProps {
    searchParams: Promise<{
        schemaId: string
    }>
}

const NewEntry: FC<NewEntryProps> = async ({ searchParams }) => {

    const { schemaId } = await searchParams

    const supabase = await createClient()

    const { data: schema, error: schemaError } = await supabase.from("content_schemas").select("*").eq("id", schemaId).single()

    if (schemaError || !schema) {
        return <div>Schema not found</div>
    }

    return (
        <div>
            <pre>{schema.name}</pre>
            <EntryForm fields={schema.fields} tenantId={schema.tenant_id} schemaId={schema.id} />
        </div>
    )
}

export default NewEntry
