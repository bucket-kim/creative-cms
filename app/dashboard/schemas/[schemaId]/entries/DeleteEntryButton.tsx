'use client'

import React, { FC } from 'react'
import { deleteEntry } from './actions'
import { useRouter } from 'next/navigation'

interface DeleteEntryButtonProps {
    entryId: string
}

const DeleteEntryButton: FC<DeleteEntryButtonProps> = ({ entryId }) => {

    const router = useRouter()

    const handleDelete = async () => {
        const confirmed = confirm('This will delete entries data. Are you sure?')
        if (!confirmed) return;

        const result = await deleteEntry(entryId)

        if (result.error) {
            alert(result.error)
            return
        }

        router.refresh()
    }

    return (
        <button className='cursor-pointer' onClick={handleDelete}>
            Delete Entries
        </button>
    )
}

export default DeleteEntryButton
