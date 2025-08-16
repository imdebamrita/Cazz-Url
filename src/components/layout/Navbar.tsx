'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export const NavBar = () => {
    return (
        <nav className="w-full px-4 py-2 absolute z-10 flex items-center justify-between text-foreground">
            <Link href="/" className="flex items-center gap-2">
                <div className="bg-gray-100 flex aspect-square size-8 items-center justify-center rounded-lg shadow-sm">
                    <Image src="/favicon.svg" alt="logo" width={500} height={500} className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-base leading-tight">
                    <span className="truncate font-medium">Cazz Url</span>
                </div>
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
