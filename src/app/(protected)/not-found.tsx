'use client'

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-foreground">404</h1>
                    <h2 className="mt-4 text-3xl font-bold text-foreground">
                        Link Not Found
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        The short link you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <div className="mt-8">
                        <Button className='cursor-pointer' variant={"outline"} onClick={() => window.history.back()}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
