'use client'
import { useTheme } from 'next-themes'

import { Blob, DotGrid, FilmGrain, LinearGradient, Liquify, Shader } from 'shaders/react'

const Background = () => {

    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    return (
        <Shader className='w-full h-full fixed inset-0 -z-10'>
            <LinearGradient colorA={isDark ? "#1a1b1c" : "#f2f4ff"}
                colorB={isDark ? "#121415" : "#eef6ff"}
                edges='mirror'
                colorSpace="oklch" />
            <Blob blendMode='normal-oklch' colorA={isDark ? "#292a2e" : "#e5e9fd"}
                colorB={isDark ? "#2a2d30" : "#dceafa"}
                softness={2}
                colorSpace="oklch" />
            <Liquify />
            <DotGrid
                color={isDark ? "#252527 " : "#f2f4fc"}
                density={50}
                dotSize={0.15}
                blendMode="screen"
                opacity={0.5}
            />
            {isDark ? null : (
                <FilmGrain />
            )}
        </Shader>
    )
}

export default Background
