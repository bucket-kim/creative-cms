'use client'

import { createClient } from '@/lib/supabase/client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const OnboardingPage = () => {

    const { user } = useUser()
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [name, setName] = useState('')
    const [schemaName, setSchemaName] = useState('My Projects')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async () => {

        if (!username || !name || !user) {
            console.log('early return - missing:', { username, name, user: !!user })
            return
        }

        setLoading(true)
        setError('')

        const supabase = createClient()
        const { data: tenant, error } = await supabase.from('tenants').upsert({
            clerk_id: user.id,
            email: user.emailAddresses[0].emailAddress,
            username,
            name,
            role: role || null
        }, { onConflict: 'clerk_id' }).select('id').single()

        if (error) {
            if (error.code === '23505') {
                setError("That user name is already taken, Try another one")
            } else {
                setError("Something went wrong. Please try again")
            }
            setLoading(false)
            return
        }

        await supabase.from('content_schemas').insert({
            tenant_id: tenant.id,
            name: schemaName,
            fields: [
                { name: 'project_name', type: 'text', required: true },
                { name: 'description', type: 'text', required: true },
                { name: 'demo_url', type: 'url', required: false },
                { name: 'github_url', type: 'url', required: false },
                { name: 'tech_stack', type: 'tags', required: false },
                { name: 'published', type: 'boolean', required: false },
                { name: 'thumbnail', type: 'image', required: false }
            ]
        })

        router.push("/dashboard")
    }


    return (
        <div>
            <h1>Set up your profile</h1>

            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='e.g. Jack' />
            </div>
            <div>
                <label>Display Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g. John Sparrow' />
            </div>
            <div>
                <label>Portfolio Category Name</label>
                <input
                    type="text"
                    value={schemaName}
                    onChange={(e) => setSchemaName(e.target.value)}
                    placeholder='e.g. Creative Projects, Client Work, Experiments'
                />
            </div>
            <div>
                <label>Role (optional)</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder='e.g. Creative Developer' />
            </div>

            {error && <p>{error}</p>}

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Setting Up" : "Create my profile"}
            </button>
        </div>
    )
}

export default OnboardingPage
