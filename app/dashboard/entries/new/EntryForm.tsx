'use client'

import { SchemaField } from '@/app/types/supabaseTypes';
import { saveEntry } from './actions';
import React, { FC, useState } from 'react'

interface EntryFormProps {
    fields: SchemaField[]
    tenantId: string;
    schemaId: string;
}

const EntryForm: FC<EntryFormProps> = ({ fields, tenantId, schemaId }) => {
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const InputFormmat = (field: SchemaField) => {
        switch (field.type) {
            case "url":
                return (
                    <input
                        value={formData[field.name] || ''}
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
                        checked={formData[field.name] === 'true'}
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
                        value={formData[field.name] || ''}
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
                        value={formData[field.name] || ''}
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
        setError('')

        const result = await saveEntry(schemaId, tenantId, formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
            return
        }

        setFormData({})
        setLoading(false)
        // router.push('/dashboard')
    }


    return (
        <div>
            {fields.map((field) => (
                <div key={field.name}>
                    <label>{field.name}</label>
                    {InputFormmat(field)}
                </div>
            ))}
            {error && <p>{error}</p>}
            <button className='cursor-pointer' type='button' disabled={loading} onClick={() => handleSave()}>
                {loading ? 'Saving...' : 'Insert Entries'}
            </button>
        </div>
    )
}

export default EntryForm
