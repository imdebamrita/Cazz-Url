import { notFound, redirect } from 'next/navigation';
import { getInfo } from '@/lib/actions/link/getInfo';
import { recordClick } from '@/lib/actions/analytics/recordClick';
// import type { IpData } from '@/lib/types/ipData';
import type { LinkType } from '@/lib/models/Link';
import getIpData from '@/lib/utils/getIpData';

export const dynamic = 'force-dynamic';

function ensureAbsoluteUrl(url: string): string {
    try {
        // If it's already a valid absolute URL, this will succeed
        new URL(url);
        return url;
    } catch {
        return url.startsWith('http') ? url : `https://${url}`;
    }
}

export default async function RedirectPage({ params }: { params: Promise<{ shortcode: string }> }) {
    const { shortcode } = await params;

    const link = await getInfo(shortcode);
    if (!link) {
        notFound();
    }

    // Enrich with IP data and record on the server
    const ipData = await getIpData();
    await recordClick(link as LinkType, ipData);

    // Redirect to destination
    const target = ensureAbsoluteUrl(link.originalUrl);
    redirect(target);
}
