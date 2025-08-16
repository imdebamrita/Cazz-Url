import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata, Viewport } from 'next'

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cazz-url.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cazz URL — Shorten links with rich analytics',
    template: '%s · Cazz URL',
  },
  description: 'Create short links and track clicks with device, location, referrer, and more. Built with Next.js, MongoDB, and Clerk.',
  applicationName: 'Cazz URL',
  generator: 'Next.js',
  keywords: [
    'URL shortener',
    'link shortener',
    'analytics',
    'Next.js',
    'MongoDB',
    'Clerk',
  ],
  authors: [{ name: 'Cazz URL' }],
  creator: 'Cazz URL',
  publisher: 'Cazz URL',
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Cazz URL',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Cazz URL — Shorten links with rich analytics',
    description: 'Create short links and track clicks with device, location, referrer, and more.',
    siteName: 'Cazz URL',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Cazz URL',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cazz URL — Shorten links with rich analytics',
    description: 'Create short links and track clicks with device, location, referrer, and more.',
    images: ['/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: dark)', color: '#fafafa' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    // afterSignInUrl="/dashboard"
    // afterSignUpUrl="/dashboard"
    >
      <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Cazz URL',
                url: siteUrl,
                potentialAction: {
                  '@type': 'SearchAction',
                  target: `${siteUrl}/dashboard?query={search_term_string}`,
                  'query-input': 'required name=search_term_string',
                },
              }),
            }}
          />
        </head>
        <body cz-shortcut-listen="true">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
