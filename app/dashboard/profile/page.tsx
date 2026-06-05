
import createClient from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import ProfileForm from './ProfileForm'
import Link from 'next/link'

const ProfilePage = async () => {

    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const supabase = await createClient()

    const { data: tenant, error } = await supabase.from("tenants").select("*").eq('clerk_id', userId).single()

    if (error || !tenant) {
        return <div>No Tenant Exists</div>
    }

    return (
        <div>
            <Link href="/dashboard">← Back to dashboard</Link>
            <h1>Edit Profile</h1>
            <ProfileForm tenant={tenant} />
        </div>
    )
}

export default ProfilePage
