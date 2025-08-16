"use client"

import * as React from "react"
import {
  Link2,
  ListPlus,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Links",
      url: "/dashboard",
      icon: Link2,
      isActive: true,
    },
    // {
    //   title: "Analytics",
    //   url: "/dashboard/analytics",
    //   icon: Bot,
    // },
    {
      title: "Create Link",
      url: "/dashboard/create-link",
      icon: ListPlus,
    },
    // {
    //   title: "Settings",
    //   url: "/dashboard/settings",
    //   icon: Settings2,
    // },
  ],
  // navSecondary: [
  //   {
  //     title: "Support",
  //     url: "#",
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: "Feedback",
  //     url: "#",
  //     icon: Send,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {/* go to home */}
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-gray-100 flex aspect-square size-8 items-center justify-center rounded-lg shadow-sm">
                  <Image src="/favicon.svg" alt="logo" width={500} height={500} className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-base leading-tight">
                  <span className="truncate font-medium">Cazz Url</span>
                  <span className="truncate text-xs text-muted-foreground">Shorten • Track • Grow</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
