'use client'

import { ContentSchemaType, SchemaField } from "@/app/types/supabaseTypes"
import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { updateSchema } from "./actions"

interface EditSchemaFormProps {
    schema: ContentSchemaType
}

const EditSchemaForm: FC<EditSchemaFormProps> = ({ schema }) => {

    const [schemaName, setSchemaName] = useState(schema.name)
    const [fields, setFields] = useState<SchemaField[]>(schema.fields)
    const [currentField, setCurrentField] = useState<SchemaField>({
        name: "",
        type: "text",
        required: false
    })
    const [removedFields, setRemovedFields] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    const removeIndex = (index: number) => {
        const removedFieldName = fields[index].name
        setRemovedFields(prev => [...prev, removedFieldName])
        setFields((prev) => prev.filter((_, i) => i !== index))
    }

    const addField = () => {
        setFields((prev) => [...prev, currentField])
        setCurrentField({
            name: "",
            type: "text",
            required: false
        })
    }

    const handleEdit = async () => {

        setLoading(true)
        setError("")

        const result = await updateSchema(schema.id, schemaName, fields, removedFields)

        if (result.error) {
            setError(result.error)
            setLoading(false)
            return
        }


        router.push(`/dashboard/schemas/${schema.id}/entries`)
    }

    return (
        <div>
            <div>
                <label>Your Role</label>
                <input value={schemaName} onChange={(e) => setSchemaName(e.target.value)} />
            </div>
            <div>
                <input value={currentField.name} onChange={(e) => {


                    setCurrentField((prev) => ({
                        ...prev,
                        name: e.target.value
                    }))
                }} />
                <select value={currentField.type} onChange={(e) => {

                    setCurrentField((prev) => ({
                        ...prev,
                        type: e.target.value as SchemaField['type']
                    }))
                }}>
                    <option>text</option>
                    <option>url</option>
                    <option>tags</option>
                    <option>boolean</option>
                </select>
                <input type='checkbox' checked={currentField.required} onChange={(e) => setCurrentField((prev) => ({ ...prev, required: e.target.checked }))} />
                <button onClick={() => addField()}>Add Field</button>
            </div>
            {fields.length > 0 && fields.map((field, index) => (
                <div key={index} className="flex gap-4">
                    <span>{field.name}</span>
                    <span>{field.type}</span>
                    <button onClick={() => removeIndex(index)}>Remove</button>
                </div>
            ))}
            {error && <p>{error}</p>}

            <button style={{ cursor: "pointer" }} onClick={() => handleEdit()} disabled={loading}>
                {loading ? "Saving..." : "Edit Details"}
            </button>
        </div>
    )
}

export default EditSchemaForm
