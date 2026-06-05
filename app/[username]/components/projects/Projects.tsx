import { ContentEntryType, ContentSchemaType } from '@/app/types/supabaseTypes'
import React, { FC } from 'react'
import Card from './Card/Card';

interface ProjectsProps {
    schemas: Array<ContentSchemaType>;
    entries: Array<ContentEntryType>
}

const Projects: FC<ProjectsProps> = ({ schemas, entries }) => {

    return (
        <div className='flex flex-col gap-5'>
            {
                entries.map((entry) => (
                    <Card key={entry.id} entry={entry} schemas={schemas} />
                ))
            }
        </div>
    )

}

export default Projects
