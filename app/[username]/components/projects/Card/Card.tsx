import { ContentEntryType, ContentSchemaType } from '@/app/types/supabaseTypes'
import React, { FC } from 'react'
import FieldRenderer from '../../FieldRenderer';

interface CardProps {
    entry: ContentEntryType;
    schemas: ContentSchemaType[]
}

const Card: FC<CardProps> = ({ entry, schemas }) => {

    const schema = schemas.find((s) => s.id === entry.content_schema_id)

    if (!schema) return null;

    // Build typed fields from actual entry data, using schema only for type lookup
    const fields = Object.entries(entry.fields)
        .filter(([_, value]) => value)
        .map(([fieldKey, value]) => {
            const schemaField = schema.fields.find(f => f.name === fieldKey)
            return {
                fieldKey,
                type: schemaField?.type ?? 'text',
                value: String(value)
            }
        })

    return <FieldRenderer fields={fields} />
}

export default Card
