'use client'

import { cn } from '@/lib/utils';
import { FC } from 'react'
import { ArrowUpRight } from "lucide-react"
import { FieldTypes } from '@/app/types/supabaseTypes';

interface FieldItem {
    fieldKey: string;
    type: FieldTypes;
    value: string;
}

interface FieldRendererProps {
    fields: FieldItem[]
}

const FieldRenderer: FC<FieldRendererProps> = ({ fields }) => {

    const urlField = fields.find(f => f.type === 'url')
    const tagsField = fields.find(f => f.type === 'tags')
    const textField = fields.find(f => f.type === 'text')
    const publishedField = fields.find(f => f.type === 'boolean')

    return (
        <article className={"bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"} >
            <div className="relative aspect-video bg-foreground  rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-xs text-muted-foreground/40 tracking-widest">
                        PREVIEW
                    </span>
                </div>

                {/* Hover overlay with CTA */}
                <a
                    href={urlField?.value ?? '#'}
                    className={cn(
                        "absolute inset-0 flex items-center justify-center bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    )}
                >
                    <span className="flex items-center gap-2 font-mono text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full">
                        LIVE DEMO
                        <ArrowUpRight className="w-4 h-4" />
                    </span>
                </a>
            </div>

            {/* Card content */}
            <div className="p-6">
                <div>

                    {tagsField && (
                        <div className="flex flex-wrap gap-2 mb-4">
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
                    {publishedField ? <span>yes</span> : <span>no</span>
                    }
                </div>

                {/* Description from text field */}
                {textField && (
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {textField.value}
                    </p>
                )}
            </div>
        </article>
    )
}

export default FieldRenderer
