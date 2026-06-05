'use client'

import { FC, useState } from "react"

interface TagInputProps {
    value: string,
    onChange: (value: string) => void
}

const TagInput: FC<TagInputProps> = ({ value, onChange }) => {

    const [tagInput, setTagInput] = useState('')

    const tags = value ? value.split(',').map((t) => t.trim()).filter(Boolean) : []

    const addTag = () => {
        if (!tagInput.trim()) return
        const newTag = [...tags, tagInput.trim()]

        onChange(newTag.join(', '))
        setTagInput("")
    }

    const removeTag = (index: number) => {
        const newTag = tags.filter((_, i) => i !== index)
        onChange(newTag.join(', '))
    }

    return (
        <div>
            <div>
                {tags.map((tag, index) => (
                    <span key={index}>
                        {tag}
                        <button type='button' onClick={() => removeTag(index)}>×</button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            addTag()
                        }
                    }}
                    placeholder='e.g. Three.js'
                />
                <button type='button' onClick={addTag}>Add</button>
            </div>
        </div>
    )
}

export default TagInput
