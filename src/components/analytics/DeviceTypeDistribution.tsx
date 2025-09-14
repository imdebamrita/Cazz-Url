import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mouse } from 'lucide-react';

export function DeviceTypeDistribution({ deviceTypes }: { deviceTypes: { name: string, count: number }[] }) {
    return (
        <Card className='max-w-[calc(100vw-2rem)] lg:max-w-none'>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mouse className="h-5 w-5" />
                    Device Type Distribution
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 flex-wrap">
                    {deviceTypes.map(dt => (
                        <div key={dt.name} className="flex flex-col items-center">
                            <span className="font-medium">{dt.name}</span>
                            <span className="text-lg">{dt.count}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
