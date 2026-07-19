"use client"

import type { LucideIcon } from "lucide-react"
import {
  Award,
  Briefcase,
  FolderOpen,
  Hammer,
  House,
  Images,
  Layers,
  Mail,
  Monitor,
  Quote,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import avatar from "@/public/default-avatar.png"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

type NavGroup = {
  label?: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  { items: [{ label: "Home", href: "/", icon: House }] },
  {
    label: "Portfolio",
    items: [
      { label: "Projects", href: "/projects", icon: FolderOpen },
      { label: "Experience", href: "/experience", icon: Briefcase },
      { label: "Certifications", href: "/certifications", icon: Award },
      { label: "Tech Stack", href: "/tech-stack", icon: Layers },
    ],
  },
  {
    label: "Media",
    items: [{ label: "Gallery", href: "/gallery", icon: Images }],
  },
  {
    label: "Connect",
    items: [{ label: "Contacts", href: "/contacts", icon: Mail }],
  },
  {
    label: "Extras",
    items: [
      { label: "Currently Building", href: "/currently-building", icon: Hammer },
      { label: "Recommendations", href: "/recommendations", icon: Quote },
      { label: "Gear", href: "/gear", icon: Monitor },
    ],
  },
]

// Quiet, minimal Notion-like retheme of the sidebar surface. These remap the
// --sidebar* tokens onto neutral near-white / near-black values so every
// bg-sidebar, border-sidebar-border and hover:bg-sidebar-accent element
// inherits the muted chrome without competing with page content.
const SIDEBAR_THEME = {
  "--sidebar": "color-mix(in oklch, var(--secondary) 5%, white)",
  "--sidebar-foreground": "var(--foreground)",
  "--sidebar-border": "var(--border)",
  "--sidebar-accent": "color-mix(in oklch, var(--foreground) 5%, transparent)",
  "--sidebar-accent-foreground": "var(--foreground)",
  "--sidebar-ring": "var(--ring)",
} as React.CSSProperties

function isItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href
}

export function PortfolioSidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar collapsible="icon" style={SIDEBAR_THEME}>
        {/* Inner wrapper re-declares the theme vars + surface so the retheme also
            applies inside the mobile Sheet, which does not receive Sidebar's
            style prop (it is portaled and the prop lands on the Radix Root). */}
        <div
          style={SIDEBAR_THEME}
          className="flex h-full w-full flex-col bg-sidebar"
        >
          <SidebarHeader className="border-b border-sidebar-border/60 pb-2">
            <div className="flex items-center gap-2.5 px-1.5 py-1 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1.5 group-data-[collapsible=icon]:px-0">
              <Image
                src={avatar}
                alt="Celest"
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-full object-cover ring-1 ring-border"
              />
              <span className="font-cursive text-2xl leading-none text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                Celest
              </span>
              <SidebarTrigger className="ml-auto shrink-0 group-data-[collapsible=icon]:ml-0" />
            </div>
          </SidebarHeader>

          <SidebarContent>
            {NAV_GROUPS.map((group) => (
              <SidebarGroup
                key={group.label ?? "home"}
                className={cn("px-1.5", group.label && "mt-1")}
              >
                {group.label && (
                  <SidebarGroupLabel className="px-2 font-heading text-[11px] font-normal uppercase tracking-wider text-muted-foreground/70">
                    {group.label}
                  </SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    {group.items.map((item) => {
                      const active = isItemActive(pathname, item.href)
                      const Icon = item.icon

                      return (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton
                            asChild
                            isActive={active}
                            tooltip={item.label}
                            className={cn(
                              "h-8 gap-2.5 rounded-md px-2 font-sans text-[13px] font-normal tracking-tight text-sidebar-foreground/70 transition-colors",
                              "hover:bg-foreground/[0.045] hover:text-sidebar-foreground",
                              "data-[active=true]:bg-foreground/[0.06] data-[active=true]:text-sidebar-foreground"
                            )}
                          >
                            <Link
                              href={item.href}
                              aria-current={active ? "page" : undefined}
                              onClick={() => setOpenMobile(false)}
                            >
                              <Icon />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter />
        </div>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  )
}

export default PortfolioSidebar
