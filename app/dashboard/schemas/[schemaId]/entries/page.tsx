import Card from '@/app/[username]/components/projects/Card/Card'
import { ContentEntryType, ContentSchemaType } from '@/app/types/supabaseTypes'
import createClient from '@/lib/supabase/server'
import React, { FC, Fragment, ReactNode } from 'react'
import DeleteSchemaButton from './DeleteSchemaButton'
import DeleteEntryButton from './DeleteEntryButton'
import Link from 'next/link'
import { CheckIsOwner } from '@/app/shared/CheckIsOwner'

interface EntriesProps {
    params: Promise<{
        schemaId: string
    }>
}

const Entries: FC<EntriesProps> = async ({ params }) => {

    const { schemaId } = await params

    const { isOwner } = await CheckIsOwner()

    const supabase = await createClient();

    const { data: schema, error } = await supabase.from('content_schemas').select(`*, content_entries(*)`).eq("id", schemaId).single()


    if (error || !schema) {
        return (
            <div>Schema not found</div>
        )
    }

    return (
        <div className='flex flex-col px-20 gap-5'>
            <Link href="/dashboard">← Back to dashboard</Link>


            {schema.content_entries?.length === 0 ? (
                <Fragment>
                    <p>No entries yet</p>
                    <a href={`/dashboard/entries/new?schemaId=${schema.id}`}>Add Entry</a>
                </Fragment>
            ) : (
                schema.content_entries?.map((entry: ContentEntryType) => {

                    const projectName = entry.fields.project_name as ReactNode

                    return (
                        <div key={entry.id} className='flex flex-col gap-5'>
                            <h1 className='font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-3'>{projectName}</h1>
                            <Card entry={entry} schemas={[schema as ContentSchemaType]} />
                            {isOwner && (
                                <div className='flex gap-4 mt-4'>
                                    <a href={`/dashboard/entries/${entry.id}/edit`}>Edit Entry</a>
                                    <DeleteEntryButton entryId={entry.id} />
                                </div>
                            )}
                        </div>
                    )
                })
            )}
            {isOwner && (
                <DeleteSchemaButton schemaId={schema.id} />
            )}
        </div>
    )
}

export default Entries
