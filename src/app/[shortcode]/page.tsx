import { notFound } from 'next/navigation';
import { getInfo } from '@/lib/actions/link/getInfo';
import Redirect from '@/components/links/Redirect';

export default async function RedirectPage({ params }: { params: Promise<{ shortcode: string }> }) {
    const { shortcode } = await params;

    console.log('Redirecting for shortcode:', shortcode);

    // Find the link
    const link = await getInfo(shortcode);
    if (!link) {
        notFound();
    }

    return (
        <Redirect link={link} shortCode={shortcode} />
    )
}
