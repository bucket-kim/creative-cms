'use client'

import { saveSchema } from './actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import TagInput from '../../entries/new/TagInput'
import ImageUpload from '../../entries/new/ImageUpload'

const NewSchema = () => {

    const router = useRouter()

    const [schemaName, setSchemaName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        project_name: '',
        description: '',
        demo_url: '',
        github_url: '',
        tech_stack: '',
        published: 'false',
        thumbnail: ''
    })

    const handleSave = async () => {

        setLoading(true)
        setError("")

        const result = await saveSchema(schemaName, formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
            return
        }

        // reset all state after successful save
        setSchemaName("")
        setLoading(false)


        router.push(`/dashboard/schemas/${result.schemaId}/entries`)
    }

    return (
        <div>
            <div>
                <label>Your Role</label>
                <input value={schemaName} onChange={(e) => setSchemaName(e.target.value)} />
            </div>
            {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                    <label>{key}</label>
                    {key === 'published' ? (
                        <input
                            type='checkbox'
                            checked={value === 'true'}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                published: e.target.checked.toString()
                            }))}
                        />
                    ) : key === 'tech_stack' ? (
                        <TagInput
                            value={value}
                            onChange={(val) => setFormData(prev => ({ ...prev, tech_stack: val }))}
                        />
                    ) : key === "thumbnail" ? (
                        <ImageUpload value={value} onChange={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))} />
                    ) : (
                        <input
                            value={value}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                [key]: e.target.value
                            }))}
                        />
                    )}
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
