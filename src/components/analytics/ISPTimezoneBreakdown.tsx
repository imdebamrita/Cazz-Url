import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Globe } from 'lucide-react';
import { MySeparator } from '../my-ui/my-separator';

export function ISPTimezoneBreakdown({ topISPs, topTimezones, totalClicks }: {
    topISPs: { name: string, count: number }[],
    topTimezones: { name: string, count: number }[],
    totalClicks: number
}) {
    return (
        <Card className='max-w-[calc(100vw-2rem)] lg:max-w-none'>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    ISP & Timezone
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                    <div className='w-full'>
                        <h4 className="font-medium mb-2">Top ISPs</h4>
                        <div className="space-y-2">
                            {topISPs.map(i => (
                                <div key={i.name} className="flex items-center justify-between gap-2">
                                    <span className="">{i.name}</span>
                                    <div className='flex items-center gap-2'>
                                        <Progress value={(i.count / totalClicks) * 100} className="w-16 h-2" />
                                        <span>{i.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <MySeparator className='hidden lg:block' /> */}
                    <div className="w-full flex gap-2 items-start">
                        <MySeparator className='hidden lg:block' />
                        <div className='w-full'>
                            <h4 className="font-medium mb-2">Timezones</h4>
                            <div className="space-y-2">
                                {topTimezones.map(tz => (
                                    <div key={tz.name} className="flex items-center justify-between gap-2">
                                        <span className="">{tz.name}</span>
                                        <div className='flex items-center gap-2'>
                                            <Progress value={(tz.count / totalClicks) * 100} className="w-16 h-2" />
                                            <span>{tz.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
