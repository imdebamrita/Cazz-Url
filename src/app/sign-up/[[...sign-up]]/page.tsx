import { SignUp } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
    const user = await currentUser();
    if (user) {
        // If the user is already authenticated, redirect to the dashboard
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-fit max-w-md">
                <SignUp
                    routing="path"
                    path="/sign-up"
                    signInUrl="/sign-in"
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
