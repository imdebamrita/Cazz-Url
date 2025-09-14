import { ExternalLink, Calendar, Mouse, BarChart3 } from 'lucide-react'
import { StatCard } from '@/components/analytics/StatCard';
import { LinkInfo } from '@/components/analytics/LinkInfo';
import { DeviceTypeDistribution } from '@/components/analytics/DeviceTypeDistribution';
import { TopCountriesCities } from '@/components/analytics/TopCountriesCities';
import { TopReferrers } from '@/components/analytics/TopReferrers';
import { ISPTimezoneBreakdown } from '@/components/analytics/ISPTimezoneBreakdown';
import { UserAgentSummary } from '@/components/analytics/UserAgentSummary';
import { GeoMapPlaceholder } from '@/components/analytics/GeoMapPlaceholder';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getLinkInfoWithAnalytics } from '@/lib/actions/analytics/getStats'
import { CopyButton } from '@/components/analytics/CopyButton'
import ClicksTimeSeries from '@/components/analytics/ClicksTimeSeries'
import { notFound } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ClickType } from '@/lib/models/Click';

interface LinkData {
    id: string
    title: string
    originalUrl: string
    shortCode: string
    clicks: ClickType[]
    createdAt: string
    updatedAt: string
}

export default async function AnalyticsPage({ params }: { params: Promise<{ 'short-url': string }> }) {
    const shortUrl = (await params)['short-url']

    // Fetch data on the server
    const result = await getLinkInfoWithAnalytics(shortUrl)

    if (!result.success || !result.data) {
        notFound()
    }

    const linkInfo = result.data;
    const linkData: LinkData = {
        id: linkInfo.id,
        title: linkInfo.title,
        originalUrl: linkInfo.originalUrl,
        shortCode: linkInfo.shortCode,
        clicks: linkInfo.clicks,
        createdAt: linkInfo.createdAt,
        updatedAt: linkInfo.updatedAt,
    };

    // Helper functions for analytics
    const getTop = (arr: ClickType[], key: keyof ClickType, topN = 5) => {
        const counts: Record<string, number> = {};
        arr.forEach((item: ClickType) => {
            const val = item[key] ?? 'Unknown';
            counts[String(val)] = (counts[String(val)] || 0) + 1;
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, topN)
            .map(([name, count]) => ({ name, count }));
    };

    const topCountries = getTop(linkData.clicks, 'country');
    const topCities = getTop(linkData.clicks, 'city');
    const deviceTypes = getTop(linkData.clicks, 'deviceType');
    const topReferrers = getTop(linkData.clicks, 'referer');
    const topISPs = getTop(linkData.clicks, 'isp');
    const topTimezones = getTop(linkData.clicks, 'timezone');

    // Geo points for map
    const geoPoints = linkData.clicks
        .filter(c => c.latitude && c.longitude)
        .map(c => ({ lat: c.latitude, lng: c.longitude, city: c.city, country: c.country }));

    // User agent summary
    const userAgents = getTop(linkData.clicks, 'userAgent', 3);

    // ...existing code...

    return (
        <ScrollArea className="h-[calc(100vh-6rem)] w-full p-0 lg:pr-4">
            <div className='space-y-6'>
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{linkData.title}</h1>
                            <p className="text-muted-foreground">Analytics for /{shortUrl}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <CopyButton shortUrl={shortUrl} />
                        <Button variant="outline" size="sm" asChild>
                            <Link href={linkData.originalUrl} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                                Visit
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Link Info */}
                <LinkInfo
                    originalUrl={linkData.originalUrl}
                    shortCode={linkData.shortCode}
                    createdAt={linkData.createdAt}
                    updatedAt={linkData.updatedAt}
                    shortUrl={shortUrl}
                />

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                        title="Total Clicks"
                        value={linkData.clicks.length}
                        icon={Mouse}
                        description="All time"
                    />
                    <StatCard
                        title="Created"
                        value={new Date(linkData.createdAt).toLocaleDateString()}
                        icon={Calendar}
                        description="Link creation date"
                    />
                    <StatCard
                        title="Last Updated"
                        value={new Date(linkData.updatedAt).toLocaleDateString()}
                        icon={BarChart3}
                        description="Last modification"
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Device Type Distribution */}
                    <DeviceTypeDistribution deviceTypes={deviceTypes} />
                    {/* Referrer Sources */}
                    <TopReferrers topReferrers={topReferrers} />
                </div>

                {/* Top Countries, Cities & Regions */}
                <TopCountriesCities
                    topCountries={topCountries}
                    topCities={topCities}
                    topRegions={getTop(linkData.clicks, 'region')}
                    totalClicks={linkData.clicks.length}
                />

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {/* ISP & Timezone Breakdown */}
                    <div className='col-span-1 md:col-span-2'>
                        <ISPTimezoneBreakdown topISPs={topISPs} topTimezones={topTimezones} totalClicks={linkData.clicks.length} />
                    </div>
                    {/* User Agent Summary */}
                    <UserAgentSummary userAgents={userAgents} />

                </div>




                {/* Clicks Time Series Graph */}
                <Card className='max-w-[calc(100vw-2rem)] lg:max-w-none'>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Clicks Over Time
                        </CardTitle>
                        <CardDescription>
                            Daily click activity for this link
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ClicksTimeSeries clicks={linkData.clicks || []} />
                    </CardContent>
                </Card>

                {/* Geo Map Visualization (placeholder) */}
                <GeoMapPlaceholder geoPointsCount={geoPoints.length} />
            </div>
        </ScrollArea>
    );
}
