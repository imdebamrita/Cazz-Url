import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    )
}
