'use client'
import { useTheme } from 'next-themes'

import { Blob, DotGrid, FilmGrain, LinearGradient, Liquify, Shader } from 'shaders/react'

const Background = () => {

    const { theme } = useTheme()

    return (
        <Shader className='w-full h-full fixed inset-0 -z-10'>
            <LinearGradient colorA={theme === 'dark' ? "#27282a" : "#f2f4ff"}
                colorB={theme === 'dark' ? "#1d1f20" : "#eef6ff"}
                edges='mirror'
                colorSpace="oklch" />
            <Blob blendMode='normal-oklch' colorA={theme === 'dark' ? "#292a2e" : "#e5e9fd"}
                colorB={theme === 'dark' ? "#2a2d30" : "#dceafa"}
                softness={2}
                colorSpace="oklch" />
            <Liquify />
            <DotGrid
                color="#f2f4fc"
                density={50}
                dotSize={0.15}
                blendMode="screen"
                opacity={0.5}
            />
            <FilmGrain />
        </Shader>
    )
}

export default Background
