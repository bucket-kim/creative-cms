import { SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import createClient from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'


const Header = async () => {

    const { userId } = await auth()
    const supabase = await createClient()

    const { data: tenant } = await supabase.from('tenants').select('*').eq('clerk_id', userId).single()

    if (!tenant) {
        return (
            <div className='w-full h-20 flex items-center justify-between px-16'>
                <Link href={`${tenant?.username}`}>
                    <Image src={"/img/kinect_logo.png"} height={30} width={30} alt='logo' className='mix-blend-multiply' />
                </Link>
                <header className='flex gap-4'>
                    <Link href="/sign-in">Sign In</Link>
                    <Link href="/sign-up">Get Started</Link>
                </header>
            </div>
        )
    }

    return (
        <div className='w-full h-20 flex items-center justify-between px-16'>
            <Link href={`${tenant.username}`}>
                <Image src={"/img/kinect_logo.png"} height={30} width={30} alt='logo' className='mix-blend-multiply' />
            </Link>

            <div className='flex gap-4'>
                <SignOutButton>
                    <button className='cursor-pointer'>Sign Out</button>
                </SignOutButton>
                <Link href={`/${tenant.username}`} className='rounded-full overflow-hidden'>
                    <Image src={tenant.avatar_url} width={40} height={40} alt={'avatar'} /></Link>
            </div>
        </div>
    )
}

export default Header
