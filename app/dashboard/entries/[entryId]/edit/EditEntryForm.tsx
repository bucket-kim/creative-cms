'use client'

import { ContentEntryType, ContentSchemaType, SchemaField } from '@/app/types/supabaseTypes';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'
import TagInput from '../../new/TagInput';

interface EditEntryFormProps {
    entry: ContentEntryType
    schema: ContentSchemaType;
}

const EditEntryForm: FC<EditEntryFormProps> = ({ entry, schema }) => {

    const [formData, setFormData] = useState<Record<string, string>>(entry.fields as Record<string, string>)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const InputFormmat = (field: SchemaField) => {
        switch (field.type) {
            case "url":
                return (
                    <input
                        className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"

                        value={formData[field.name]}
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
                        checked={formData[field.name] === 'true'}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [field.name]: e.target.checked.toString()
                        }))}
                    />
                )
            case "tags":
                return (
                    <TagInput value={formData[field.name]} onChange={(value) => setFormData(prev => ({
                        ...prev,
                        [field.name]: value
                    }))} />

                )
            default:
                return (
                    <textarea
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        value={formData[field.name]}
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

        const supabase = createClient()

        const { data, error } = await supabase.from("content_entries").update({
            fields: formData
        }).eq('id', entry.id).select()

        console.log('update result:', data)
        console.log('update error:', error)


        if (error) {
            console.log("insert error: ", error);
            setLoading(false)
            return
        }

        router.push('/dashboard')

        return { success: true };
    }

    return (
        <div>
            {schema.fields.map((field) =>
            (
                <div key={field.name as string}>
                    <label>{field.name as string}</label>
                    {InputFormmat(field)}
                </div>
            )
            )}
            <button className='cursor-pointer' onClick={() => handleSave()} disabled={loading}>Insert Edits</button>
        </div>
    )
}

export default EditEntryForm
