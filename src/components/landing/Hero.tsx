import React from 'react'
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Link as LinkIcon, Mouse } from 'lucide-react';
import Link from 'next/link';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import RealStatsSection from '@/components/landing/RealStatsSection';

const Hero = () => {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center bg-background relative overflow-hidden pt-26">
            <Spotlight />
            <div className="p-4 max-w-7xl mx-auto relative z-10 w-full">
                {/* Main Hero Content */}
                <div className="text-center mb-18">
                    <Badge variant="outline" className="mb-8 pb-1">
                        ✨ Total Server Side Redirection - No Black Screen
                    </Badge>

                    <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground mb-8">
                        Cazz URL
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                        Transform long URLs into powerful short links with comprehensive analytics.
                        Track clicks, analyze traffic, and optimize your digital presence with ease.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button size="lg" asChild>
                            <Link href="/sign-up">
                                Get Started Free
                                <LinkIcon className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/sign-in">
                                Sign In
                                <BarChart3 className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    {/* <div className="flex items-center justify-center gap-8 text-sm text-neutral-400 mb-16">
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span>Enterprise Security</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            <span>99.9% Uptime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>Global CDN</span>
                        </div>
                    </div> */}
                </div>

                {/* Feature Grid */}
                <FeaturesSection />


                {/* Stats Section */}
                <RealStatsSection />

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                        Ready to transform your links?
                    </p>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard">
                            View Dashboard
                            <Mouse className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Hero