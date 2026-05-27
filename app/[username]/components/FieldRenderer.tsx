'use client'

import { FC } from 'react'

interface FieldRendererProps {
    fieldKey: string;
    type: string;
    value: string;
}

const FieldRenderer: FC<FieldRendererProps> = ({ fieldKey, type, value }) => {

    switch (type) {
        case "url":
            return (
                <div key={fieldKey}>
                    <p>{value}</p>
                    <button onClick={() => console.log(value)}>URL</button>
                </div>
            )
            break;
        case "tags":
            return (
                <div key={fieldKey}>
                    {String(value).split(",").map((tag) => (
                        <span key={tag.trim()}>{tag.trim()}</span>
                    ))}
                </div>
            )
            break;
        case "boolean":
            return (
                <div key={fieldKey}>
                    <p>{value}</p>
                    <p>{false ? "x" : "o"}</p>
                </div>
            )
            break;

    }

}

export default FieldRenderer
