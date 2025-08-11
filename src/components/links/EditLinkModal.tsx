'use client'

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { editLink } from '@/lib/actions/link/edit';
import { checkExistingLink } from '@/lib/actions/link/checkExisting';

const formSchema = z.object({
    originalUrl: z.string().url({ message: 'Enter a valid URL' }),
    title: z.string().optional(),
    shortUrl: z.string()
        .regex(/^[a-zA-Z0-9_-]*$/, {
            message: "Only alphanumeric characters, hyphens, and underscores are allowed.",
        })
        .optional()
});

type FormData = z.infer<typeof formSchema>;

interface EditLinkModalProps {
    link: {
        _id: string;
        originalUrl: string;
        title: string;
        shortCode: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

export default function EditLinkModal({ link, isOpen, onClose }: EditLinkModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            originalUrl: link.originalUrl,
            title: link.title,
            shortUrl: link.shortCode,
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            if (data.shortUrl && data.shortUrl !== link.shortCode) {
                const isTaken = await checkExistingLink(data.shortUrl);
                if (isTaken) {
                    setError('shortUrl', { type: 'manual', message: 'This short URL is already taken.' });
                    setIsSubmitting(false);
                    return;
                }
            }
            await editLink(link._id, data);
            toast.success('Link updated successfully!');
            onClose();
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Link</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" autoComplete="off">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="originalUrl">Destination</Label>
                        <Input
                            id="originalUrl"
                            {...register('originalUrl')}
                        />
                        {errors.originalUrl && <p className="text-sm text-destructive mt-1">{errors.originalUrl.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            {...register('title')}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="shortUrl">Short URL</Label>
                        <Input
                            id="shortUrl"
                            {...register('shortUrl')}
                        />
                        {errors.shortUrl && <p className="text-sm text-destructive mt-1">{errors.shortUrl.message}</p>}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting} className='mb-2 md:mb-0'>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
