'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { auth } from '@clerk/nextjs/server'

export async function saveEntry(
    schemaId: string,
    tenantId: string,
    fields: Record<string, string>
) {
    const { userId } = await auth()
    if (!userId) return { error: 'Not authenticated' }

    // Strip out any empty values before saving
    const cleanedFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== '')
    )

    if (Object.keys(cleanedFields).length === 0) {
        return { error: 'Please fill in at least one field' }
    }

    const supabase = createAdminClient()

    const { error } = await supabase.from('content_entries').insert({
        tenant_id: tenantId,
        content_schema_id: schemaId,
        fields: cleanedFields
    })

    if (error) return { error: error.message }

    return { success: true }
}
