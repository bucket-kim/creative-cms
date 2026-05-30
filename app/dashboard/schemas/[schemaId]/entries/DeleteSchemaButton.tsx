'use client'

import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { deleteSchema } from './actions'

interface DeleteSchemaButtonProps {
    schemaId: string
}

const DeleteSchemaButton: FC<DeleteSchemaButtonProps> = ({ schemaId }) => {

    const router = useRouter()

    const handleDelete = async () => {

        const confirmed = confirm('This will delete the schema and all its entries. Are you sure?')
        if (!confirmed) return;

        const result = await deleteSchema(schemaId)

        if (result.error) {
            alert(result.error)
            return
        }

        router.push('/dashboard')
    }

    return (
        <button className='cursor-pointer' onClick={handleDelete}>
            Delete Schema
        </button>
    )
}

export default DeleteSchemaButton
