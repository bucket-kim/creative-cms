'use client'

import { saveSchema } from './actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SchemaField {
    name: string
    type: 'text' | 'url' | 'tags' | 'boolean'
    required: boolean
}

const NewSchema = () => {

    const router = useRouter()

    const [schemaName, setSchemaName] = useState("")
    const [fields, setFields] = useState<SchemaField[]>([])
    const [currentField, setCurrentField] = useState<SchemaField>({
        name: '',
        type: "text",
        required: false
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const removeIndex = (index: number) => {
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

    const handleSave = async () => {

        setLoading(true)
        setError("")

        const result = await saveSchema(schemaName, fields)

        if (result.error) {
            setError(result.error)
            setLoading(false)
            return
        }


        router.push('/dashboard')
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
                <div key={index}>
                    <span>{field.name}</span>
                    <span>{field.type}</span>
                    <button onClick={() => removeIndex(index)}>Remove</button>
                </div>
            ))}
            {error && <p>{error}</p>}

            <button style={{ cursor: "pointer" }} onClick={() => handleSave()} disabled={loading}>
                {loading ? "Saving..." : "Add Details"}
            </button>
        </div>
    )
}

export default NewSchema
