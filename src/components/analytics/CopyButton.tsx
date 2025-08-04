'use client'

import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface CopyButtonProps {
    shortUrl: string
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg'
    showText?: boolean
}

export function CopyButton({ shortUrl, variant = 'outline', size = 'sm', showText = true }: CopyButtonProps) {
    const copyShortUrl = () => {
        const fullUrl = `${window.location.origin}/${shortUrl}`
        navigator.clipboard.writeText(fullUrl)
        toast.success('Short URL copied to clipboard!')
    }

    return (
        <Button variant={variant} size={size} onClick={copyShortUrl}>
            <Copy className="h-4 w-4" />
            {showText && 'Copy Link'}
        </Button>
    )
}
