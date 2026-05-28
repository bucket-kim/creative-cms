'use client'

import { SchemaField } from '@/app/types/supabaseTypes';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'

interface EntryFormProps {
    fields: SchemaField[]
    tenantId: string;
    schemaId: string;
}

const EntryForm: FC<EntryFormProps> = ({ fields, tenantId, schemaId }) => {

    const router = useRouter()

    const [formData, setFormData] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)
    const [errorInsert, setErrorInsert] = useState("")

    const InputFormmat = (field: SchemaField) => {
        switch (field.type) {
            case "url":
                return (
                    <input
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [field.name]: e.target.value  // use field.name as key
                        }))}
                        placeholder="Share your URL"
                    />
                )
            case "boolean":
                return (
                    <input
                        type='checkbox'
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [field.name]: e.target.checked.toString()
                        }))}
                    />
                )
            case "tags":
                return (
                    <input
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [field.name]: e.target.value
                        }))}
                        placeholder='e.g. Three.js, WebGL, React'
                    />
                )
            default:
                return (
                    <textarea
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [field.name]: e.target.value
                        }))}
                        placeholder="Type in your thoughts"
                    />
                )
        }
    }

    const handleSave = async () => {
        setLoading(true)
        setErrorInsert("")

        const supabase = createClient()

        console.log("tenant: ", tenantId)
        console.log("schema id: ", schemaId)

        const { error } = await supabase.from("content_entries").insert({
            tenant_id: tenantId,
            content_schema_id: schemaId,
            fields: formData
        })

        console.log("insert error: ", error);

        if (error) {
            setErrorInsert(error.message)
            setLoading(false)
            return
        }

        router.push('/dashboard')

        return { success: true };
    }


    return (
        <div>
            {fields.map((field) => (
                <div key={field.name}>
                    <label>{field.name}</label>
                    {InputFormmat(field)}
                </div>
            ))}
            <button disabled={loading} onClick={() => handleSave()}>Insert Entries</button>
        </div>
    )
}

export default EntryForm
