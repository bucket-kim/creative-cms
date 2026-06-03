'use client'

import { Blob, DotGrid, FilmGrain, LinearGradient, Liquify, Shader } from 'shaders/react'

const Background = () => {
    return (
        <Shader className='w-full h-full fixed inset-0 -z-10'>
            <LinearGradient colorA="#f2f4ff"
                colorB="#eef6ff"
                edges='mirror'
                colorSpace="oklch" />
            <Blob blendMode='normal-oklch' colorA="#e5e9fd"
                colorB="#dceafa"
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
