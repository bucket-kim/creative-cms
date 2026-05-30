import Card from '@/app/[username]/components/projects/Card/Card'
import { ContentEntryType, ContentSchemaType } from '@/app/types/supabaseTypes'
import createClient from '@/lib/supabase/server'
import React, { FC, Fragment } from 'react'
import DeleteSchemaButton from './DeleteSchemaButton'
import DeleteEntryButton from './DeleteEntryButton'

interface EntriesProps {
    params: Promise<{
        schemaId: string
    }>
}

const Entries: FC<EntriesProps> = async ({ params }) => {

    const { schemaId } = await params

    const supabase = await createClient();

    const { data: schema, error } = await supabase.from('content_schemas').select(`*, content_entries(*)`).eq("id", schemaId).single()


    if (error || !schema) {
        return (
            <div>Schema not found</div>
        )
    }

    console.log(schema.content_entries)

    return (
        <div>
            <h1>{schema.name}</h1>
            <a href="/dashboard">← Back to dashboard</a>
            <a href={`/dashboard/entries/new?schemaId=${schema.id}`}>Add Entry</a>

            {schema.content_entries?.length === 0 ? (
                <Fragment>
                    <p>No entries yet</p>
                    <a href={`/dashboard/entries/new?schemaId=${schema.id}`}>Add Entry</a>
                </Fragment>
            ) : (
                schema.content_entries?.map((entry: ContentEntryType) => (
                    <div key={entry.id}>
                        <Card entry={entry} schemas={[schema as ContentSchemaType]} />
                        <div className='flex gap-4 mt-4'>
                            <a href={`/dashboard/entries/${entry.id}/edit`}>Edit Entry</a>
                            <DeleteEntryButton entryId={entry.id} />
                        </div>
                    </div>
                ))
            )}
            <DeleteSchemaButton schemaId={schema.id} />
        </div>
    )
}

export default Entries
