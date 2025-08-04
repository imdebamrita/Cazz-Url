'use client'

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const NavBar = () => {
    return (
        <nav className="w-full px-4 py-2 absolute z-10 flex items-center justify-between text-primary">
            {/* Logo or App Name */}
            <Link href="/" className="text-xl font-bold tracking-tight">
                🔗 Cazz-Url
            </Link>

            {/* Right side auth controls */}
            <div className="flex items-center gap-2">
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant="outline">Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button>Sign Up</Button>
                    </SignUpButton>
                </SignedOut>

                <SignedIn>
                    <Link href="/dashboard">
                        <Button className='cursor-pointer' variant="ghost">Dashboard</Button>
                    </Link>
                    <Link href="/dashboard/create-link">
                        <Button className='cursor-pointer' variant="ghost">Create</Button>
                    </Link>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}
