import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/analytics/CopyButton';

interface LinkInfoProps {
    originalUrl: string;
    shortCode: string;
    createdAt: string;
    updatedAt: string;
    shortUrl: string;
}

export function LinkInfo({ originalUrl, shortCode, createdAt, updatedAt, shortUrl }: LinkInfoProps) {
    return (
        <Card>
            <CardContent className="px-6">
                <div className="grid gap-4 md:grid-cols-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Original URL</p>
                        <p className="text-sm truncate">{originalUrl}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Short Code</p>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">/{shortCode}</Badge>
                            <CopyButton shortUrl={shortUrl} variant="ghost" showText={false} />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Created</p>
                        <p className="text-sm">{new Date(createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                        <p className="text-sm">{new Date(updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
