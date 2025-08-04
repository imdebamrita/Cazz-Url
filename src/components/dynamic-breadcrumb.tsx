'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'

export function DynamicBreadcrumb() {
    const pathname = usePathname()

    // Generate breadcrumb items based on the current path
    const pathSegments = pathname.split('/').filter(Boolean)

    // Create breadcrumb items
    const breadcrumbItems = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/')
        const isLast = index === pathSegments.length - 1

        // Capitalize and format segment names
        const formatSegment = (seg: string) => {
            return seg.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')
        }

        return {
            href,
            label: formatSegment(segment),
            isLast
        }
    })

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                    <div key={item.href} className="flex items-center gap-2">
                        {index > 0 && (
                            <BreadcrumbSeparator className="hidden md:block" />
                        )}
                        <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                            {item.isLast ? (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={item.href}>
                                    {item.label}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}