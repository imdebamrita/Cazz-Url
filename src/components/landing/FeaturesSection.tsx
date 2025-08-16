import { BarChart3, Globe, Link as LinkIcon, Zap } from 'lucide-react';


const features = [
    {
        icon: LinkIcon,
        title: "URL Shortening",
        description: "Create short, memorable links instantly for teams"
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Track clicks, devices, and user behavior at scale"
    },
    {
        icon: Globe,
        title: "Global Tracking",
        description: "Monitor worldwide click locations with precision"
    },
    {
        icon: Zap,
        title: "Fast & Reliable",
        description: "Lightning-fast redirects and uptime you trust"
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
