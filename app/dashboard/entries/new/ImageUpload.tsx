'use client'

import { createClient } from "@/lib/supabase/client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

interface ImageUploadProps {
    value: string | StaticImport
    onChange: (url: string) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }) => {

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState("")

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0]
        if (!file) return;

        setUploading(true)
        setError('')

        const supabase = createClient()

        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`

        const { data, error } = await supabase.storage.from('thumbnail').upload(fileName, file)

        if (error) {
            setError(error.message)
            setUploading(false)
            return
        }

        const { data: urlData } = supabase.storage.from('thumbnail').getPublicUrl(data.path)

        onChange(urlData.publicUrl)
        setUploading(false)
    }

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="cursor-pointer"
            />
            {uploading && <p>Uploading...</p>}
            {error && <p>{error}</p>}
            {value && (
                <Image src={value} alt="thumbnail preview" height={200} width={200} style={{ margin: ".5rem", borderRadius: ".5rem", objectFit: "cover" }} />
            )}
        </div>
    )
}

export default ImageUpload
