'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { UAParser } from 'ua-parser-js';

export function UserAgentSummary({
    userAgents,
}: {
    userAgents: { name: string; count: number }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Top User Agents
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 flex-wrap justify-around w-full">
                    {userAgents.map((ua) => {
                        const parsed = new UAParser(ua.name).getResult();
                        const browserName = parsed.browser.name;
                        const browserVersion = parsed.browser.version;
                        const osName = parsed.os.name;
                        const osVersion = parsed.os.version;

                        const browser = browserName && browserVersion ? `${browserName} ${browserVersion}` : browserName || browserVersion || 'undefined';
                        const os = osName && osVersion ? `${osName} ${osVersion}` : osName || osVersion || 'undefined';

                        // If both browser and OS are undefined, collapse to just one 'undefined'
                        const showOnlyUndefined = browser === 'undefined' && os === 'undefined';

                        return (
                            <div key={ua.name} className="flex flex-col items-center max-w-xs text-center">
                                {showOnlyUndefined ? (

                                    <span className="font-medium text-xs mb-4 text-muted-foreground">Unknown

                                    </span>
                                ) : (
                                    <>
                                        <span className="font-medium text-xs truncate">{browser}</span>
                                        <span className="text-xs text-muted-foreground">{os}</span>
                                    </>
                                )}
                                <span className="text-lg font-semibold">{ua.count}</span>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
