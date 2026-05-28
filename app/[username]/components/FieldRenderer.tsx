'use client'

import { FC } from 'react'

interface FieldRendererProps {
    fieldKey: string;
    type: string;
    value: string;
}

const FieldRenderer: FC<FieldRendererProps> = ({ fieldKey, type, value }) => {

    console.log(fieldKey)
    console.log(value)
    console.log(type)

    switch (type) {
        default:
            return (
                <div key={fieldKey} className='mt-4'>
                    <p>{fieldKey.split("_").join(" ")}</p>
                    <span>{value}</span>
                </div>
            )
            break;
        case "url":
            return (
                <div key={fieldKey} className='mt-4'>
                    <p>{value}</p>
                    <button onClick={() => console.log(value)}>Check it out</button>
                </div>
            )
            break;
        case "tags":
            return (
                <div key={fieldKey} className='mt-4'>
                    {String(value).split(",").map((tag) => (
                        <span key={tag.trim()}>{tag}</span>
                    ))}
                </div>
            )
            break;
        case "boolean":
            return (
                <div key={fieldKey} className='mt-4'>
                    <label >{fieldKey}</label>
                    <p>{value === "false" ? "x" : "o"}</p>
                </div>
            )
            break;

    }

}

export default FieldRenderer
