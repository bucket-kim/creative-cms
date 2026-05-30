
import createClient from '@/lib/supabase/server'
import { SignOutButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ContentSchemaType } from '../types/supabaseTypes'

const DashboardPage = async () => {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const supabase = await createClient()

    const { data: tenant, error } = await supabase
        .from('tenants')
        .select('* , content_schemas(*), content_entries(id)')
        .eq('clerk_id', userId)
        .single()

    if (error || !tenant) {
        redirect('/onboarding')
    }

    return (
        <div>
            <h1>Welcome back, {tenant.name}!</h1>
            <h1>username: {tenant.username}</h1>
            <p>{tenant.role}</p>

            <a href={`/${tenant.username}`} > View my portfolio ↗</a>

            <hr />
            {tenant.content_schemas?.length === 0 ? (
                <p>No schemas yet. <a href="/dashboard/schemas/new">Create one</a></p>
            ) : (
                tenant.content_schemas?.map((schema: ContentSchemaType) => (
                    <div key={schema.id} className='flex gap-3'>
                        <p>{schema.name ? schema.name : "No name"}</p>
                        {schema.content_entries?.length === 0 && (

                            <a href={`/dashboard/entries/new?schemaId=${schema.id}`}>Add Entry</a>
                        )}
                        <a href={`/dashboard/schemas/${schema.id}/edit`}>Edit Schema</a>
                        <a href={`/dashboard/schemas/${schema.id}/entries`}>View Entries</a>
                    </div>
                ))
            )}

            <a href="/dashboard/schemas/new">Create New Schema</a>

            <SignOutButton>
                <button>Sign Out</button>
            </SignOutButton>
        </div>
    )
}

export default DashboardPage