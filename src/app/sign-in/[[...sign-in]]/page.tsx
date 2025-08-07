import { SignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export default async function SignInPage() {
    const user = await currentUser();
    if (user) {
        // If the user is already authenticated, redirect to the dashboard
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md">
                <SignIn
                    routing="path"
                    path="/sign-in"
                    signUpUrl="/sign-up"
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "shadow-lg border-0",
                        },
                    }}
                />
            </div>
        </div>
    )
}
