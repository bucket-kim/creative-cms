import { ContentEntryType, ContentSchemaType } from '@/app/types/supabaseTypes'
import React, { FC, Fragment } from 'react'
import FieldRenderer from '../../FieldRenderer';

interface CardProps {
    entry: ContentEntryType;
    schemas: ContentSchemaType[]
}

const Card: FC<CardProps> = ({ entry, schemas }) => {

    const schema = schemas.find((s) => s.id === entry.content_schema_id)

    if (!schema) return;
    return (
        <Fragment>
            {
                schema.fields.map((schemaField) => {
                    const name = String((schemaField as { name: string }).name);
                    const type = String((schemaField as { type: string }).type);
                    const value = String(entry.fields[name] ?? "");
                    return (
                        <FieldRenderer key={name} fieldKey={name} type={type} value={value} />
                    )
                })
            }
        </Fragment>
    )
}

export default Card
