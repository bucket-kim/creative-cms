import createClient from "@/lib/supabase/server"
import { FC } from "react"
import EditSchemaForm from "./EditSchemaForm"

interface SchemaEditProps {
    params: Promise<{
        schemaId: string
    }>
}

const SchemaEdit: FC<SchemaEditProps> = async ({ params }) => {

    const { schemaId } = await params

    const supabase = await createClient()

    const { data: schema, error } = await supabase.from("content_schemas").select(`*`).eq("id", schemaId).single()

    if (!schema || error) {
        return (
            <div>No Schema contained</div>
        )
    }

    return (
        <div>
            <h1>Edit Schema</h1>
            <EditSchemaForm schema={schema} />
        </div>
    )
}

export default SchemaEdit
