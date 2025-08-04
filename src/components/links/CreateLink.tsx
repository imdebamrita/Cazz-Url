'use client'

// import { useUser } from '@clerk/nextjs'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from "sonner"
import { createLink } from '@/lib/actions/link/create'
import { checkExistingLink } from '@/lib/actions/checkExistingLink';

const formSchema = z.object({
    originalUrl: z.string().url({ message: 'Enter a valid URL' }),
    title: z.string().optional(),
    shortUrl: z.string()
        .regex(/^[a-zA-Z0-9_-]*$/, {
            message: "Only alphanumeric characters, hyphens, and underscores are allowed.",
        })
        .optional()
        .refine(async (shortUrl) => {
            if (!shortUrl) return true;
            const isTaken = await checkExistingLink(shortUrl);
            return !isTaken;
        }, {
            message: 'This short URL is already taken.',
        }),
})

type FormData = z.infer<typeof formSchema>

export default function CreateLink() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: FormData) => {
        try {
            const res = await createLink(data)
            toast.success('Link created successfully!')
            reset()
        } catch (err: any) {
            toast.error(err.message || "Something went wrong")
        }
    }

    return (
        <Card className="w-full max-w-xl mx-auto mt-10 bg-card/90 border border-border shadow-2xl rounded-2xl">
            <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-semibold">Create Link</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" autoComplete="off">
                    {/* Destination */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="originalUrl" className="text-base">Destination</Label>
                        <Input
                            id="originalUrl"
                            placeholder="http://example.com/my-long-url"
                            {...register('originalUrl')}
                            aria-invalid={!!errors.originalUrl}
                        />
                        {errors.originalUrl && (
                            <p className="text-sm text-destructive mt-1">{errors.originalUrl.message}</p>
                        )}
                    </div>

                    {/* Title (optional) */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="title" className="text-base">Title</Label>
                            <span className="text-xs text-muted-foreground">Optional</span>
                        </div>
                        <Input
                            id="title"
                            placeholder="Title"
                            {...register('title')}
                            aria-invalid={!!errors.title}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Short URL (optional) */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="shortUrl" className="text-base">Short URL</Label>
                            <span className="text-xs text-muted-foreground">Optional</span>
                        </div>
                        <Input
                            id="shortUrl"
                            placeholder="your-custom-short-url or Generate a random one"
                            {...register('shortUrl')}
                            aria-invalid={!!errors.shortUrl}
                        />
                        {errors.shortUrl && (
                            <p className="text-sm text-destructive mt-1">{errors.shortUrl.message}</p>
                        )}
                    </div>

                    <div className="flex flex-row gap-4 justify-end mt-4">
                        <Button
                            type="submit"
                            className="px-8 py-3 font-semibold rounded-lg shadow-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Shortening...' : 'Shorten My Link ↗'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
