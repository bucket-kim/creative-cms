'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const NewSchemaCard = () => {

    const router = useRouter()

    return (
        <button onClick={() => router.push('/dashboard/schemas/new')} className="flex h-full min-h-[148px] items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-[#ffffff67] px-6 transition-colors hover:border-primary hover:bg-[[#ffffff]] cursor-pointer">


            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f7f8]">
                <Plus className="h-6 w-6 text-[#5CC2C8]" />
            </div>
            <div className="text-left">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-foreground">
                    Create New Space
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Start a new creative hub<br />for your team or project.
                </p>
            </div>

        </button>
    )
}

export default NewSchemaCard
