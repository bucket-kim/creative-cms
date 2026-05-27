
import createClient from '@/lib/supabase/server'
import React, { FC } from 'react'
import { TenantType } from '../types/supabaseTypes'

interface PortfolioPageProps {
    params: Promise<{
        username: string
    }>
}

const PortfolioPage: FC<PortfolioPageProps> = async ({ params }) => {
    const { username } = await params
    const supabase = await createClient()

    const { data: tenant, error } = await supabase.from("tenants").select(`*, content_schemas(*), content_entries(*)`).eq('username', username).single()

    if (error || !tenant) {
        return <div>Portfolio not found</div>
    }

    // const { data: schemas } = await supabase.from("content_schemas").select("*").eq('tenant_id', tenant.id)

    // const { data: entries } = await supabase.from("content_entries").select("*").eq('tenant_id', tenant.id)

    const typedTenant = tenant as TenantType

    return (
        <div>
            <h1>{typedTenant.name}</h1>
            <p>{typedTenant.role}</p>
            <p>{typedTenant.bio}</p>
            <p>{typedTenant.location}</p>

            <hr />

            <h2>Projects</h2>
            {typedTenant.content_entries.map((entry) => (
                <div key={entry.id}>
                    <pre>{JSON.stringify(entry.fields, null, 2)}</pre>
                </div>
            ))}
        </div>
    )
}

export default PortfolioPage
