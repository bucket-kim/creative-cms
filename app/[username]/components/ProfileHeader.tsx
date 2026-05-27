import { TenantType } from '@/app/types/supabaseTypes'
import { FC } from 'react'

interface ProfileHeaderType {
    tenant: TenantType
}

const ProfileHeader: FC<ProfileHeaderType> = ({ tenant }) => {
    return (
        <div>
            <h1>{tenant.name}</h1>
            <p>{tenant.role}</p>
            <p>{tenant.bio}</p>
            <p>{tenant.location}</p>
        </div>
    )
}

export default ProfileHeader
