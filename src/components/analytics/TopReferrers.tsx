import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export function TopReferrers({ topReferrers }: { topReferrers: { name: string, count: number }[] }) {
    return (
        <Card className='max-w-[calc(100vw-2rem)] lg:max-w-none'>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Top Referrers
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 flex-wrap">
                    {topReferrers.map(r => (
                        <div key={r.name} className="flex flex-col items-center">
                            <span className="font-medium">{r.name}</span>
                            <span className="text-lg">{r.count}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
