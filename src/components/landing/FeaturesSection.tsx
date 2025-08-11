import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { BarChart3, Users, Clock, Smartphone, Share2, TrendingUp } from 'lucide-react';
import { BarChart3, Globe, Link as LinkIcon, Mouse, Shield, Zap } from 'lucide-react';


const features = [
    {
        icon: LinkIcon,
        title: "URL Shortening",
        description: "Create short, memorable links instantly"
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Track clicks, devices, and user behavior"
    },
    {
        icon: Globe,
        title: "Global Tracking",
        description: "Monitor worldwide click locations"
    },
    {
        icon: Zap,
        title: "Fast & Reliable",
        description: "Lightning-fast redirects and uptime"
    }
];

export function FeaturesSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="group p-6 rounded-xl bg-card border border-border hover:border-muted-foreground transition-all duration-300 hover:bg-muted"
                >
                    <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                        <feature.icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                        {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        {feature.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
