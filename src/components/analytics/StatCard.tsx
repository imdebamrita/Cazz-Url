import { Card, CardContent } from '@/components/ui/card';

export const StatCard = ({ title, value, icon: Icon, description }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    description?: string;
}) => (
    <Card className='max-w-[calc(100vw-2rem)] lg:max-w-none'>
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                    {description && (
                        <p className="text-xs text-muted-foreground mt-1">{description}</p>
                    )}
                </div>
                <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                </div>
            </div>
        </CardContent>
    </Card>
);
