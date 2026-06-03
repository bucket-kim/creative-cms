'use client'

import { TenantType } from "@/app/types/supabaseTypes"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { updateProfile } from "./actions"

interface ProfileFormProps {
    tenant: TenantType
}

const ProfileForm: FC<ProfileFormProps> = ({ tenant }) => {

    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState(tenant.name)
    const [role, setRole] = useState(tenant.role || '')
    const [bio, setBio] = useState(tenant.bio || '')
    const [avatarUrl, setAvatarUrl] = useState(tenant.avatar_url || '')
    const [location, setLocation] = useState(tenant.location || '')
    const [socialLinks, setSocialLinks] = useState(tenant.social_links || {})

    const handleEdit = async () => {
        setLoading(true)

        const result = await updateProfile(name, role, bio, avatarUrl, location, socialLinks)

        if (result.error) {
            setLoading(false)
            return
        }

        router.push('/dashboard')
    }

    return (
        <div>
            <div className="flex flex-col">
                <label className="text-xl font-bold">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col">
                <label className="text-xl font-bold">User Role</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="flex flex-col">
                <label className="text-xl font-bold">Bio Description</label>
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div className="flex flex-col">
                <label className="text-xl font-bold">Profile Image</label>
                <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://github.com/yourusername.png"
                />  {avatarUrl && (
                    <Image src={avatarUrl} alt="avatar preview" width={80} height={80} />
                )}
            </div>
            <div className="flex flex-col">
                <label className="text-xl font-bold">Current Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="flex flex-col">
                <label className="text-xl font-bold">Github Link</label>
                <input type="text" value={socialLinks.github} onChange={(e) => setSocialLinks((prev) => ({
                    ...prev,
                    github: e.target.value
                }))} />
                <label className="text-xl font-bold">X Link</label>
                <input type="text" value={socialLinks.twitter} onChange={(e) => setSocialLinks((prev) => ({
                    ...prev,
                    twitter: e.target.value
                }))} />
                <label className="text-xl font-bold">LinkedIn Link</label>
                <input type="text" value={socialLinks.linkedin} onChange={(e) => setSocialLinks((prev) => ({
                    ...prev,
                    linkedin: e.target.value
                }))} />
                <label className="text-xl font-bold">Portfolio Link</label>
                <input type="text" value={socialLinks.portfolio} onChange={(e) => setSocialLinks((prev) => ({
                    ...prev,
                    portfolio: e.target.value
                }))} />
            </div>
            <button className="cursor-pointer" disabled={loading} onClick={handleEdit}>{loading ? "Editting" : "Edit Profile"}</button>
        </div>
    )
}

export default ProfileForm
