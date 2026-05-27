import { ContentEntryType, ContentSchemaType } from '@/app/types/supabaseTypes'
import React, { FC, Fragment } from 'react'
import Card from './Card/Card';

interface ProjectsProps {
    schemas: Array<ContentSchemaType>;
    entries: Array<ContentEntryType>
}

const Projects: FC<ProjectsProps> = ({ schemas, entries }) => {
    return (
        <Fragment>

            {
                entries.map((entry) => (
                    <Card key={entry.id} entry={entry} schemas={schemas} />
                ))
            }
        </Fragment>
    )

}

export default Projects
