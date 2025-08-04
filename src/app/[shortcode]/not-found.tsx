import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900">404</h1>
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">
                        Link Not Found
                    </h2>
                    <p className="mt-2 text-gray-600">
                        The short link you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <div className="mt-8">
                        <Button variant="outline" asChild>
                            <Link href="/" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Go Back
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
