import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MermaidDiagram from '@/components/ui/MermaidDiagram';
import { Server, Shield, BarChart3, Database } from 'lucide-react';

export default function SystemDesignSection() {
    // Single compact overview diagram (theme-aligned via MermaidDiagram)
    const overview = `
        graph TB
            %% Nodes (shapes follow flowchart norms)
            U([User])
            SHORT[/Short Link Click/]
            FE[Edge/Middleware]
            API[Record Click - Server Action]
            DB[(MongoDB)]
            GEO[GeoIP Service]
            AUTH[Clerk]
            ANALYTICS[Analytics Aggregates]
            DASH[Dashboard]
            OUT[/Destination URL/]

            %% Flow
            U --> SHORT --> FE --> API
            API -->|Extract IP| GEO
            GEO -->|Country / City / ISP| API
            API -->|Store click| DB
            DB -->|Aggregates| ANALYTICS -->|Insights| DASH
            API -->|Server Side Redirect| OUT
            FE -.->|SSR/CSR| DASH
            DASH -.->|Auth| AUTH

            %% Styling (no subgraphs)
            class U,FE,API,DASH core;
            class DB store;
            class AUTH,GEO ext;
            class ANALYTICS metric;
            class SHORT,OUT io;

            classDef core fill:#111827,stroke:#374151,color:#e5e7eb,stroke-width:1px;
            classDef store fill:#1f2937,stroke:#374151,color:#e5e7eb,stroke-width:1px;
            classDef ext fill:#1f2937,stroke:#374151,color:#e5e7eb,stroke-width:1px,stroke-dasharray: 3 3;
            classDef metric fill:#111827,stroke:#374151,color:#e5e7eb,stroke-width:1px;
            classDef io fill:#111827,stroke:#374151,color:#e5e7eb,stroke-width:1px;
    `;

    return (
        <section className="py-16 px-4 bg-background">
            <div className="flex flex-col items-center max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 h-12 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
                        How Cazz URL Works
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Explore the architecture and user journey that powers our URL shortening and analytics platform.
                    </p>
                </div>

                <div className="mb-20 w-fit">
                    <Card className="bg-card border border-border hover:border-muted-foreground transition-all duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-card-foreground text-lg">
                                <Server className="h-5 w-5" />
                                System Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 !px-4 md:px-4 overflow-x-auto">
                            <MermaidDiagram chart={overview} id="system-overview" scale={1} />
                        </CardContent>
                    </Card>
                </div>

                <h3 className="text-2xl font-bold text-center mb-10">Technical Stack</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card className="group text-center bg-card border border-border hover:border-muted-foreground transition-all duration-300">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors">
                                <Server className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h4 className="font-semibold mb-2">Next.js 15</h4>
                            <p className="text-sm text-muted-foreground">Server Actions, App Router & SSR</p>
                        </CardContent>
                    </Card>

                    <Card className="group text-center bg-card border border-border hover:border-muted-foreground transition-all duration-300">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors">
                                <Database className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h4 className="font-semibold mb-2">MongoDB</h4>
                            <p className="text-sm text-muted-foreground">Scalable NoSQL via Mongoose ODM</p>
                        </CardContent>
                    </Card>

                    <Card className="group text-center bg-card border border-border hover:border-muted-foreground transition-all duration-300">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors">
                                <Shield className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h4 className="font-semibold mb-2">Clerk Auth</h4>
                            <p className="text-sm text-muted-foreground">Secure authentication & user management</p>
                        </CardContent>
                    </Card>

                    <Card className="group text-center bg-card border border-border hover:border-muted-foreground transition-all duration-300">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors">
                                <BarChart3 className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h4 className="font-semibold mb-2">Real-time Analytics</h4>
                            <p className="text-sm text-muted-foreground">Live tracking with geolocation data</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
