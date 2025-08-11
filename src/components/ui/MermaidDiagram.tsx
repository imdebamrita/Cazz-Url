"use client";

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    chart: string;
    id: string;
    scale?: number;
}

export default function MermaidDiagram({ chart, id, scale = 0.8 }: MermaidDiagramProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            // Use stable hard-coded neutrals that look OK in both light and dark themes
            // Derived from globals: light (~oklch 0.98/0.95/0.85) and dark (~0.04/0.12/0.28)
            // We pick mid-contrast grays so they remain readable across themes.
            // const background = 'transparent'; // let page background show through
            const foreground = '#e5e7eb'; // gray-200
            // const card = '#111827'; // gray-900 (node fill)
            const muted = '#1f2937'; // gray-800 (secondary fill)
            const border = '#374151'; // gray-700 (borders/lines)
            mermaid.initialize({
                startOnLoad: true,
                theme: 'dark',
                themeVariables: {
                    primaryColor: muted,
                    primaryTextColor: foreground,
                    primaryBorderColor: border,
                    lineColor: border,
                    // secondaryColor: card,
                    // tertiaryColor: background,
                    // background: background,
                    // mainBkg: card,
                    // secondBkg: muted,
                    // tertiaryBkg: background,
                },
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                fontSize: 50,
                flowchart: {
                    // useMaxWidth: true,
                    htmlLabels: true,
                    curve: 'basis',
                    nodeSpacing: 30,
                    rankSpacing: 30,
                    padding: 5,
                }
            });

            mermaid.render(id, chart).then((result: any) => {
                if (ref.current && result.svg) {
                    ref.current.innerHTML = result.svg;
                }
            });
        }
    }, [chart, id]);

    return (
        <div
            ref={ref}
            className="mermaid-container w-xs md:w-lg overflow-x-auto"
            style={{ transformOrigin: 'top left' }}
        />
    );
}
