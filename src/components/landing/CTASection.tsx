import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
    return (
        <section className="py-20 px-4 bg-background">
            <div className="max-w-4xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4">Get Started</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 h-12 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
                    Ready to start tracking your links?
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                    Join thousands of users who are already using Cazz URL to shorten links and track performance.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                        <Link href="/dashboard">
                            Get Started Free
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/dashboard">
                            View Dashboard
                            <BarChart3 className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
