
import { getGlobalStats } from "@/lib/actions/analytics/getGlobalStats";
import { formatStatNumber } from "@/lib/utils/formatStats";

export default async function RealStatsSection() {
    const stats = await getGlobalStats();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-18 pt-12 border-t border-border">
            <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {formatStatNumber(stats.totalLinks)}
                </div>
                <div className="text-sm text-muted-foreground">Links Created</div>
            </div>
            <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {formatStatNumber(stats.totalClicks)}
                </div>
                <div className="text-sm text-muted-foreground">Total Clicks</div>
            </div>
            <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stats.totalCountries}+
                </div>
                <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stats.uptime}
                </div>
                <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
        </div>
    );
}
