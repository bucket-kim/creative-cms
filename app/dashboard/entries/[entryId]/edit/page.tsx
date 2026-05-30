
import createClient from '@/lib/supabase/server'
import { FC } from 'react'
import EditEntryForm from './EditEntryForm'

interface EntryEditProps {
    params: Promise<{
        entryId: string
    }>
}

const EntryEdit: FC<EntryEditProps> = async ({ params }) => {

    const { entryId } = await params

    const supabase = await createClient()

    const { data: entry, error } = await supabase.from("content_entries").select(`*, content_schemas(*)`).eq('id', entryId).single()

    if (error || !entry) {
        return <div>Entry not found</div>
    }

    return (
        <div>
            <h1>Edit Entry</h1>
            <EditEntryForm entry={entry} schema={entry.content_schemas} />
        </div>
    )
}

export default EntryEdit
