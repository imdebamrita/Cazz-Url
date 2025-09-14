import { Github, Twitter, Linkedin, Coffee, Code, LaptopMinimal } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-16 px-4 bg-background border-t border-border relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-8 text-6xl rotate-12">🎨</div>
                <div className="absolute top-12 right-12 text-4xl -rotate-12">⚡</div>
                <div className="absolute bottom-8 left-1/4 text-5xl rotate-45">🚀</div>
                <div className="absolute bottom-4 right-1/3 text-3xl -rotate-45">✨</div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Horizontal layout */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                    {/* Left side - Brand & tagline */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                        <div>
                            <a
                                href="https://github.com/imdebamrita/Cazz-Url"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='group flex items-center gap-3 mb-1'
                            >
                                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-muted-foreground">
                                    Cazz URL
                                </h3>
                                <span
                                    className="group flex items-center gap-2 p-2 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-105"
                                >
                                    <Github className="h-4 w-4 group-hover:animate-spin" />
                                    {/* <span className="text-xs font-medium">GitHub</span> */}
                                </span>
                            </a>
                            <p className="text-sm text-muted-foreground">
                                Modern URL shortener with powerful analytics
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground lg:border-l lg:border-border lg:pl-8">
                            <span>Crafted with</span>
                            <LaptopMinimal className="h-4 w-4 text-sky-700 " />
                            <span>and</span>
                            <Coffee className="h-4 w-4 text-amber-600" />
                        </div>
                    </div>

                    {/* Center - Social Links */}
                    <div className="flex justify-center lg:justify-start gap-4">
                        <a
                            href="https://github.com/imdebamrita"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-105"
                        >
                            <Github className="h-4 w-4 group-hover:animate-spin" />
                            <span className="text-xs font-medium">GitHub</span>
                        </a>
                        <a
                            href="https://twitter.com/DebamritaP"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-105"
                        >
                            <Twitter className="h-4 w-4 group-hover:animate-bounce" />
                            <span className="text-xs font-medium">Twitter</span>
                        </a>
                        <a
                            href="https://linkedin.com/in/debamrita-paul"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-105"
                        >
                            <Linkedin className="h-4 w-4 group-hover:animate-pulse" />
                            <span className="text-xs font-medium">LinkedIn</span>
                        </a>
                    </div>

                    {/* Right side - Signature & Copyright */}
                    <div className="flex flex-col lg:items-end text-center lg:text-right">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-muted-foreground mb-2">
                            <Code className="h-3 w-3" />
                            <span>© {currentYear} All rights reserved</span>
                        </div>

                        {/* Artist Signature */}
                        <div className="relative space-y-1">
                            <div className="text-muted-foreground/90 text-xs italic">
                                ~ Crafted by
                            </div>
                            <div className="text-lg font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-muted-foreground relative">
                                Debamrita Paul
                                {/* @imdebamrita */}
                                <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
                            </div>
                            <div className="text-xs text-muted-foreground italic">
                                Full Stack Developer & AI-ML Dev
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
