import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Globe, BarChart3 } from 'lucide-react';

const useCases = [
    {
        title: "Marketing Campaigns",
        description: "Track the performance of your marketing campaigns across different channels",
        icon: Target
    },
    {
        title: "Social Media",
        description: "Share clean links on social platforms while gathering valuable analytics",
        icon: Globe
    },
    {
        title: "Email Marketing",
        description: "Monitor email click-through rates and engagement metrics",
        icon: BarChart3
    }
];

export function UseCasesSection() {
    return (
        <section className="py-20 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">Use Cases</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 h-12 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
                        Perfect for every scenario
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Whether you&apos;re running marketing campaigns or sharing content, our platform adapts to your needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {useCases.map((useCase, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader className="pb-4">
                                <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
                                    <useCase.icon className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <CardTitle className="text-xl text-card-foreground mb-2">{useCase.title}</CardTitle>
                                <CardDescription className="text-muted-foreground text-base">
                                    {useCase.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
