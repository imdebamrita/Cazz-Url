"use client";

import React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ClickType } from "@/lib/models/Click";

const COLORS = {
    desktop: "#6b7280", // Medium gray - professional and neutral
    mobile: "#9ca3af", // Light gray - subtle contrast
    other: "#4b5563", // Dark gray - good distinction
} as const

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: COLORS.desktop,
    },
    mobile: {
        label: "Mobile",
        color: COLORS.mobile,
    },
    other: {
        label: "Other",
        color: COLORS.other,
    },
} satisfies ChartConfig

function getClicksTimeSeriesData(clicks: ClickType[], timeRange: "7d" | "30d" | "90d") {
    // console.log(clicks)

    const counts: Record<string, { desktop: number; mobile: number; other: number }> = {};
    (clicks ?? []).filter(Boolean).forEach((click: ClickType) => {
        if (click.timestamp) {
            const date = new Date(click.timestamp);
            if (!isNaN(date.getTime())) {
                const day = date.toISOString().slice(0, 10); // YYYY-MM-DD
                if (!counts[day]) {
                    counts[day] = { desktop: 0, mobile: 0, other: 0 };
                }
                if (click.deviceType === 'desktop') {
                    counts[day].desktop++;
                } else if (click.deviceType === 'mobile') {
                    counts[day].mobile++;
                } else {
                    counts[day].other++;
                }
            }
        }
    });

    let daysToFill = 90;
    if (timeRange === "30d") {
        daysToFill = 30;
    } else if (timeRange === "7d") {
        daysToFill = 7;
    }

    const days: string[] = [];
    const today = new Date();
    for (let i = daysToFill - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        days.push(d.toISOString().slice(0, 10));
    }
    return days.map(day => ({
        date: day,
        desktop: counts[day]?.desktop || 0,
        mobile: counts[day]?.mobile || 0,
        other: counts[day]?.other || 0
    }));
}



const ClicksTimeSeries = ({ clicks }: { clicks: ClickType[] }) => {
    const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "90d">("30d")
    const data = getClicksTimeSeriesData(clicks, timeRange)

    const timeRangeMapping = {
        "7d": "Last 7 days",
        "30d": "Last 30 days",
        "90d": "Last 90 days",
    }

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Clicks Over Time</CardTitle>
                    <CardDescription>
                        Showing total clicks for the {timeRangeMapping[timeRange].toLowerCase()}
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={(value) => setTimeRange(value as "7d" | "30d" | "90d")}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 90 days
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="h-[240px] w-full">
                    <AreaChart data={data} accessibilityLayer>
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={COLORS.desktop} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={COLORS.desktop} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={COLORS.mobile} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={COLORS.mobile} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillOther" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={COLORS.other} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={COLORS.other} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={value => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={32}
                            allowDecimals={false}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />} />
                        <Area
                            dataKey="mobile"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke={COLORS.mobile}
                            strokeWidth={2}
                            stackId="a"
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke={COLORS.desktop}
                            strokeWidth={2}
                            stackId="a"
                        />
                        <Area
                            dataKey="other"
                            type="natural"
                            fill="url(#fillOther)"
                            stroke={COLORS.other}
                            strokeWidth={2}
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default ClicksTimeSeries;
