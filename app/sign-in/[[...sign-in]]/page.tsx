import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
    return (
        <div className='flex flex-center mt-1'>
            <SignIn />
        </div>
    )
}

export default SignInPage
