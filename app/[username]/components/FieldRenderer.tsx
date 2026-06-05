'use client'

import { FC } from 'react'
import { FieldTypes } from '@/app/types/supabaseTypes';
import IframeViewer from './IframeViewer';
import { useGlobalState } from '@/app/state/useGlobalState';

interface FieldItem {
    fieldKey: string;
    type: FieldTypes;
    value: string;
}

interface FieldRendererProps {
    fields: FieldItem[]
    entryId: string
}

const FieldRenderer: FC<FieldRendererProps> = ({ fields, entryId }) => {

    const urlField = fields.find(f => f.type === 'url')
    const tagsField = fields.find(f => f.type === 'tags')
    const textField = fields.find(f => f.type === 'text')
    const publishedField = fields.find(f => f.type === 'boolean')
    const thumbnailField = fields.find(f => f.type === 'image')

    const { setIsIframeActive } = useGlobalState(
        (state) => ({
            setIsIframeActive: state.setIsIframeActive
        })
    )

    const handleClose = () => {
        setIsIframeActive(null)
    }

    return (
        <article className={"bg-card border border-border rounded-xl p-8 hover:shadow-md transition-shadow"} >
            <div className="relative aspect-video bg-transparent  rounded-xl overflow-hidden">

                <IframeViewer url={urlField?.value} thumbnail={thumbnailField?.value ?? "/placeholder.png"} entryId={entryId} />

                {/* Hover overlay with CTA */}
            </div>


            {/* Card content */}
            <div className="flex flex-col gap-6 pt-6">
                <div className='flex gap-2'>
                    <a href={urlField?.value} target="_blank" rel="noopener noreferrer">
                        Open in new tab ↗
                    </a>
                    <button onClick={handleClose}>Close preview</button>
                </div>
                <div className='flex flex-col gap-6'>

                    {tagsField && (
                        <div className="flex flex-wrap gap-2">
                            {tagsField.value.split(",").map((tag) => (
                                <span
                                    key={tag.trim()}
                                    className="font-mono text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                                >
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                    {publishedField ? <span>published</span> : <span>not published</span>
                    }
                </div>

                {/* Description from text field */}
                {textField && (
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed ">
                        {textField.value}
                    </p>
                )}

            </div>
        </article>
    )
}

export default FieldRenderer
