
import createClient from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ContentSchemaType } from '../types/supabaseTypes'
import SchemaCard from './schemas/schema-card'
import NewSchemaCard from './schemas/new-schema-card'

const DashboardPage = async () => {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const supabase = await createClient()

    const { data: tenant, error } = await supabase
        .from('tenants')
        // .select('* , content_schemas(*, content_entries(id, fields))')
        .select('* , content_schemas(*), content_entries(*)')
        .eq('clerk_id', userId)
        .single()

    if (error || !tenant) {
        redirect('/onboarding')
    }

    const onAdd = (id: string) => {
        return `/dashboard/entries/new?schemaId=${id}`
    }
    const onView = (id: string) => {
        return `/dashboard/schemas/${id}/entries`
    }

    // const onEdit = (id: string) => {
    //     return `/dashboard/entries/${id}/edit`
    // }

    return (
        <div className=' min-h-screen'>

            <main className='px-16 py-16'>
                <div className='mb-6'>
                    <h1 className='className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-foreground"'>Welcome back, {tenant.name}!</h1>
                    <p className='mt-4  inline-block font-mono text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full tracking-wide'>{tenant.role}</p>
                    <p className='mt-4 text-muted-foreground'>Manage your content schemas and entries</p>
                </div>
                <div className='mt-6'>

                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-foreground">
                        Your Creative Spaces
                    </h2>
                    {tenant.content_schemas?.length === 0 ? (
                        <NewSchemaCard />
                    ) : (
                        <div className="grid gap-4 lg:grid-cols-3">
                            {tenant.content_schemas?.map((schema: ContentSchemaType) => (
                                <SchemaCard key={schema.id} schema={schema} entries={tenant.content_entries} onAdd={onAdd(schema.id)} onView={onView(schema.id)} isActive={true} />
                            ))}
                            <NewSchemaCard />
                        </div>
                    )}



                </div>

            </main>
        </div>
    )
}

export default DashboardPage