'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export const NavBar = () => {
    return (
        <nav className="w-full px-4 py-2 absolute z-10 flex items-center justify-between text-foreground">
            {/* Logo or App Name */}
            <Link href="/" className="text-xl font-bold tracking-tight">
                🔗 Cazz-Url
            </Link>

            {/* Right side auth controls */}
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <SignedOut>
                    <Button variant="outline" asChild>
                        <Link href="/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/sign-up">Sign Up</Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <Button variant="ghost" asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/dashboard/create-link">Create</Link>
                    </Button>
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "h-8 w-8",
                            },
                        }}
                    />
                </SignedIn>
            </div>
        </nav>
    )
}
