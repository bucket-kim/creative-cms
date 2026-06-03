import { TenantType } from '@/app/types/supabaseTypes'
import { FC } from 'react'

interface ProfileHeaderType {
    tenant: TenantType
}

const ProfileHeader: FC<ProfileHeaderType> = ({ tenant }) => {
    return (
        <div className="max-w-4xl">
            <p className='font-mono text-sm text-muted-foreground tracking-wide mb-8"'>{tenant.location}</p>
            < h1 className='font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-6"'> {tenant.name}</ h1>
            <p className='inline-block font-mono text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full tracking-wide'>{tenant.role}</p>
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12">{tenant.bio}</p>
        </div >
    )
}

export default ProfileHeader
