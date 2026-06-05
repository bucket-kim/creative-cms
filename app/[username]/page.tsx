
import createClient from '@/lib/supabase/server'
import { FC } from 'react'
import { TenantType } from '../types/supabaseTypes'
import Projects from './components/projects/Projects'
import ProfileHeader from './components/ProfileHeader'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'

interface PortfolioPageProps {
    params: Promise<{
        username: string
    }>
}

const PortfolioPage: FC<PortfolioPageProps> = async ({ params }) => {
    const { username } = await params
    const { userId } = await auth()
    const supabase = await createClient()

    const { data: tenant, error } = await supabase.from("tenants").select(`*, content_schemas(*), content_entries(*)`).eq('username', username).single()

    if (error || !tenant) {
        return <div>Portfolio not found</div>
    }

    // const { data: schemas } = await supabase.from("content_schemas").select("*").eq('tenant_id', tenant.id)

    // const { data: entries } = await supabase.from("content_entries").select("*").eq('tenant_id', tenant.id)

    const typedTenant = tenant as TenantType

    const isOwner = userId === tenant?.clerk_id

    return (
        <div className='min-h-screen flex flex-col gap-5 px-6 md:px-12 lg:px-20 py-20'>
            <Link href="/dashboard">← Back to dashboard</Link>
            <ProfileHeader tenant={typedTenant} isOwner={isOwner} />

            <h2>Creative Spaces</h2>

            <Projects schemas={typedTenant.content_schemas} entries={typedTenant.content_entries} />
        </div>
    )
}

export default PortfolioPage
