'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteLink } from '@/lib/actions/link/delete';

interface DeleteLinkModalProps {
    linkId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function DeleteLinkModal({ linkId, isOpen, onClose }: DeleteLinkModalProps) {
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteLink(linkId);
            toast.success('Link deleted successfully!');
            onClose();
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the link.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className='cursor-pointer'>Cancel</Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant="default"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-800 hover:bg-red-900 text-white cursor-pointer font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Permanently'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
