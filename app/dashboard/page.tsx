
import createClient from '@/lib/supabase/server'
import { SignOutButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const DashboardPage = async () => {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const supabase = await createClient()

    const { data: tenant, error } = await supabase
        .from('tenants')
        .select('*')
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
            <SignOutButton>
                <button>Sign Out</button>
            </SignOutButton>
        </div>
    )
}

export default DashboardPage