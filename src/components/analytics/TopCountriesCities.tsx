import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Globe } from 'lucide-react';
import { MySeparator } from '../my-ui/my-separator';

export function TopCountriesCities({ topCountries, topCities, topRegions, totalClicks }: {
    topCountries: { name: string, count: number }[],
    topCities: { name: string, count: number }[],
    topRegions: { name: string, count: number }[],
    totalClicks: number
}) {
    return (
        <Card className='max-w-[calc(100vw-2rem)] lg:max-w-none'>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Top Countries, Cities & Regions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
                    <div className="w-full">
                        <h4 className="font-medium mb-2">Countries</h4>
                        {topCountries.map(c => (
                            <div key={c.name} className="flex items-center justify-between gap-2">
                                <span>{c.name}</span>
                                <div className='flex items-center gap-2'>
                                    <Progress value={c.count / totalClicks * 100} className="w-16 h-2" />
                                    <span>{c.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="w-full">
                        <div className="w-full flex gap-2 items-start">
                            <MySeparator className='hidden lg:block' />
                            <div className='w-full'>
                                <h4 className="font-medium mb-2">Cities</h4>
                                {topCities.map(c => (
                                    <div key={c.name} className="flex items-center justify-between gap-2">
                                        <span>{c.name}</span>
                                        <div className='flex items-center gap-2'>
                                            <Progress value={c.count / totalClicks * 100} className="w-16 h-2" />
                                            <span>{c.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* <MySeparator className='hidden lg:block' /> */}

                    {Array.isArray(topRegions) && (
                        <div className="w-full flex gap-2 items-start">
                            <MySeparator className='hidden lg:block' />
                            <div className='w-full'>
                                <h4 className="font-medium mb-2">Regions</h4>
                                {topRegions.map(r => (
                                    <div key={r.name} className="flex items-center justify-between gap-2">
                                        <span>{r.name}</span>
                                        <div className='flex items-center gap-2'>
                                            <Progress value={r.count / totalClicks * 100} className="w-16 h-2" />
                                            <span>{r.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card >
    );
}
