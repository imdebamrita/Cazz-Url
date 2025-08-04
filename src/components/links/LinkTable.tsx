'use client'

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getUserLinks } from '@/lib/actions/link/getUserLinks';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Pencil, Trash2, BarChart2 } from 'lucide-react';
import EditLinkModal from './EditLinkModal';
import DeleteLinkModal from './DeleteLinkModal';

interface LinkType {
    _id: string;
    originalUrl: string;
    title: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
}

const getFullUrl = (shortCode: string) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    return `${appUrl}/${shortCode}`;
}

function truncateMiddle(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}

const LinkTable = () => {
    const [links, setLinks] = useState<LinkType[]>([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState<LinkType | null>(null);

    const fetchLinks = async () => {
        const userLinks = await getUserLinks();
        setLinks(userLinks);
    };
    React.useEffect(() => {
        fetchLinks();
    }, [isEditModalOpen, isDeleteModalOpen]);

    const handleEdit = (link: LinkType) => {
        setSelectedLink(link);
        setEditModalOpen(true);
    };

    const handleDelete = (link: LinkType) => {
        setSelectedLink(link);
        setDeleteModalOpen(true);
    };

    return (
        <>
            <ScrollArea className="h-[calc(60vh)] md:h-[calc(58vh)] pr-2 pb-2">
                <Table>
                    <TableCaption>A list of your shortened links and their stats.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Short URL</TableHead>
                            <TableHead>Original URL</TableHead>
                            <TableHead>Clicks</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {links.map((link) => (
                            <TableRow key={link._id}>
                                <TableCell className="font-medium max-w-[160px] truncate">
                                    {truncateMiddle(link.title || 'No Title', 28)}
                                </TableCell>
                                <TableCell className="font-mono text-muted-foreground underline max-w-[160px] truncate">
                                    <a href={getFullUrl(link.shortCode)} target="_blank" rel="noopener noreferrer">
                                        {truncateMiddle(getFullUrl(link.shortCode), 28)}
                                    </a>
                                </TableCell>
                                <TableCell className="truncate max-w-[180px] text-muted-foreground underline">
                                    <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                                        {truncateMiddle(link.originalUrl, 32)}
                                    </a>
                                </TableCell>
                                <TableCell className="text-center">{link.clicks}</TableCell>
                                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                                    {new Date(link.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <a href={`/dashboard/${link.shortCode}`} title="Go to Analysis" >
                                        <Button variant="ghost" size="icon" className='cursor-pointer'><BarChart2 className="h-4 w-4" /></Button>
                                    </a>
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(link)} title="Edit Link" className='cursor-pointer'>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(link)} title="Delete Link" className='cursor-pointer'>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
                <ScrollBar orientation="vertical" />
            </ScrollArea>
            {selectedLink && (
                <>
                    <EditLinkModal
                        link={selectedLink}
                        isOpen={isEditModalOpen}
                        onClose={() => setEditModalOpen(false)}
                    />
                    <DeleteLinkModal
                        linkId={selectedLink._id}
                        isOpen={isDeleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                    />
                </>
            )}
        </>
    )
}

export default LinkTable