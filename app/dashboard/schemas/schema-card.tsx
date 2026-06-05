'use client'

import { ContentEntryType, ContentSchemaType } from '@/app/types/supabaseTypes'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface SchemaCardProps {
    schema: ContentSchemaType
    entries: ContentEntryType[]
    onAdd: string
    onView: string
    isActive: boolean
}

const SchemaCard: FC<SchemaCardProps> = ({ schema, entries, onView, onAdd, isActive }) => {
    const router = useRouter()

    const filterEntries = entries.filter((entry) => entry.content_schema_id === schema.id)

    const thumbnail = filterEntries[0]?.fields?.thumbnail as string | StaticImport

    // const thumbnail = schema.content_entries?.[0]?.fields.thumbnail as string

    return (
        <div className="flex gap-4 rounded-2xl border border-border bg-background p-4 transition-shadow hover:shadow-md">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-accent">
                <Image
                    src={thumbnail || "/placeholder.png"}
                    alt={`${schema.name} thumbnail`}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between py-1">
                <div className="flex items-start justify-between">
                    <div>

                        <h3 className="text-lg font-semibold text-blue-600 dark:text-sky-400">
                            {schema.name}
                        </h3>
                        <span
                            className={`mt-1.5 inline-block rounded-md bg-[#EAE5FB] px-2 py-0.5 font-mono text-xs text-[#145DFB]"
                                }`}

                        >{isActive ? "Active" : "Empty"}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {schema.content_entries?.length === 0 ? (
                        <button
                            onClick={() => router.push(onAdd)}
                            className="font-mono text-xs text-secondary-foreground hover:underline"
                        >
                            Add Entry
                        </button>
                    ) : (
                        <button
                            onClick={() => router.push(onView)}
                            className="font-mono text-xs text-secondary-foreground hover:underline"
                        >
                            View Entries
                        </button>
                    )}
                    {/* <button
                    onClick={() => onDelete(schema.id)}
                    className="font-mono text-xs text-muted-foreground hover:underline"
                >
                    Delete
                </button> */}
                </div>
            </div>

        </div>
    )
}

export default SchemaCard
