import CreateLink from '@/components/links/CreateLink'
import React from 'react'

const Page = () => {
    return (
        <div className="h-full p-6">
            <div className="max-w-xl mx-auto text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Create Short Link</h1>
                <p className="text-muted-foreground text-sm">Generate links and get full analytics in one place.</p>
            </div>
            <CreateLink />
        </div>
    )
}

export default Page
