import { Badge } from '@/components/ui/badge';
import { BarChart3, Globe, Mouse } from 'lucide-react';

export function AnalyticsPreviewSection() {
    return (
        <section className="py-20 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">Analytics</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
                        Powerful insights at your fingertips
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Get detailed analytics about your links with real-time data and comprehensive reports.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="group p-6 rounded-xl bg-card border border-border hover:border-muted-foreground transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                            <Mouse className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">Click Tracking</h3>
                        <p className="text-muted-foreground text-sm">Monitor every click with detailed timestamp and user information</p>
                    </div>

                    <div className="group p-6 rounded-xl bg-card border border-border hover:border-muted-foreground transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                            <Globe className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">Geographic Data</h3>
                        <p className="text-muted-foreground text-sm">See where your audience is located with country and city breakdowns</p>
                    </div>

                    <div className="group p-6 rounded-xl bg-card border border-border hover:border-muted-foreground transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                            <BarChart3 className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">Performance Metrics</h3>
                        <p className="text-muted-foreground text-sm">Track link performance over time with detailed charts and insights</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
