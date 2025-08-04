"use client";

import { recordClick } from '@/lib/actions/analytics/recordClick';
import { LinkType } from '@/lib/models/Link';
import { IpData } from '@/lib/types/ipData';
import { useEffect } from 'react'

const Redirect = ({ link, shortCode }: { link: LinkType, shortCode: string }) => {

    useEffect(() => {
        const handleRedirect = async () => {
            if (!shortCode) {
                console.error('shortCode is undefined');
                return;
            }

            try {
                console.log('shortCode:', shortCode); // ✅ should now be defined
                // if ipapi fetch failed, just go on with the redirect and pass the empty data
                let data: IpData = {
                    ip: "Unknown",
                    country_name: "Unknown",
                    city: "Unknown",
                    region: "Unknown",
                    latitude: null,
                    longitude: null,
                    timezone: "Unknown",
                    org: "Unknown",
                    asn: "Unknown"
                };
                try {
                    const res = await fetch('https://ipapi.co/json/');
                    data = await res.json();
                } catch (fetchError) {
                    console.warn('ipapi fetch failed:', fetchError);
                }

                await recordClick(link, data);

                let targetUrl = link.originalUrl;

                try {
                    new URL(targetUrl);
                } catch {
                    if (!targetUrl.startsWith('http')) {
                        targetUrl = 'https://' + targetUrl;
                    }
                }

                // Client-side redirect
                window.location.href = targetUrl;
            } catch (err) {
                console.error('Redirect failed:', err);
            }
        };

        handleRedirect();
    }, [link, shortCode]);

    return (
        null
    )
}

export default Redirect