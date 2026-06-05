'use client'

import { useGlobalState } from '@/app/state/useGlobalState'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React, { FC, useRef, useState } from 'react'

interface IframeViewerProps {
    url: string | undefined
    thumbnail: string | StaticImport
    entryId: string
}

const IframeViewer: FC<IframeViewerProps> = ({ url, thumbnail, entryId }) => {

    const { isIframeActive, setIsIframeActive } = useGlobalState(
        (state) => ({
            isIframeActive: state.isIframeActive,
            setIsIframeActive: state.setIsIframeActive
        })
    )
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const isOpen = isIframeActive === entryId

    const handleOpen = () => {
        setIsIframeActive(entryId)
        setHasError(false)
        setLoading(true)

        timerRef.current = setTimeout(() => {
            setHasError(true)
            setLoading(false)
        }, 5000)
    }

    const handleLoad = () => {

        if (!timerRef.current) return

        clearTimeout(timerRef.current)
        setLoading(false)
    }



    return (
        <div className='absolute inset-0'>

            {!isOpen ? (
                <div className='w-full h-full flex items-center justify-center'>

                    <Image src={thumbnail} fill alt={`${thumbnail}_image`} className='absolute top-0 left-0 object-cover blur-lg' />
                    <div className='absolute inset-0 bg-black/40' />

                    <button onClick={handleOpen} className='text-white absolute inset-0 cursor-pointer'>
                        Preview
                    </button>
                </div>
            ) : (
                <div className='relative w-full h-full'>
                    {loading && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <p>Loading preview...</p>
                        </div>
                    )}

                    {hasError ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <p>This site cannot be previewed here.</p>
                        </div>
                    ) : (
                        <iframe
                            src={url}
                            className='w-full h-full border-0'
                            onLoad={handleLoad}
                        />
                    )}


                </div>
            )}

        </div>
    )
}

export default IframeViewer
