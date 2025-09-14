import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Globe } from 'lucide-react';

export function GeoMapPlaceholder({ geoPointsCount }: { geoPointsCount: number }) {
    return geoPointsCount > 0 ? (
        <Card className='max-w-[calc(100vw-2rem)] lg:max-w-none'>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Click Locations Map
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-muted-foreground text-sm">Map visualization coming soon. {geoPointsCount} geo points available.</div>
            </CardContent>
        </Card>
    ) : null;
}
