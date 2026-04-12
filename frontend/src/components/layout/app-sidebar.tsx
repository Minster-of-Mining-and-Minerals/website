"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ChevronRight,
  Shield,
  Key,
  Phone,
  Briefcase,
  Building2,
  Megaphone,
  Tag,
  Newspaper,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Image from "next/image";

/* ---------------- LOCALE STRIPPER ---------------- */
const stripLocale = (pathname: string) => {
  const segments = pathname.split("/");
  if (segments.length > 1 && ["en", "am"].includes(segments[1])) {
    return "/" + segments.slice(2).join("/");
  }
  return pathname;
};

/* ---------------- NAVIGATION ---------------- */
const navigationItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hero Section",
    url: "/admin/hero-section",
    icon: Building2
  },
  {
    title: "About",
    url: "/admin/about",
    icon: Building2,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: Briefcase,
  },
  {
    title: "Contacts",
    url: "/admin/contacts",
    icon: Phone,
  },
  {
    title: "Footer",
    url: "/admin/footer",
    icon: Building2,
  },
];

const userManagementItems = [
  {
    title: "Role Management",
    url: "/admin/users/roles",
    icon: Shield,
  },
  {
    title: "Permission Management",
    url: "/admin/users/permissions",
    icon: Key,
  },
];

const newsManagementItems = [
  {
    title: "News",
    url: "/admin/news",
    icon: Megaphone,
  },
  {
    title: "News Tag",
    url: "/admin/news/tags",
    icon: Tag,
  },
];

const miningManagementItems = [
  {
    title: "Snapshots",
    url: "/admin/sectors/mining/snapshots",
    icon: Megaphone,
  },
  {
    title: "Gemstones",
    url: "/admin/sectors/mining/gamestones",
    icon: Tag,
  },
  {
    title: "Resources",
    url: "/admin/sectors/mining/resources",
    icon: Tag,
  },
];

const geologyManagementItems = [
  {
    title: "Snapshots",
    url: "/admin/sectors/geology/snapshots",
    icon: Megaphone,
  },
  {
    title: "Resources",
    url: "/admin/sectors/geology/resources",
    icon: Tag,
  },
];

const asmManagementItems = [
  {
    title: "ASM Overview",
    url: "/admin/asm",
    icon: Megaphone,
  },
];

const investigateEthiopiaManagementItems = [
  {
    title: "Overview",
    url: "/admin/investigate-ethiopia",
    icon: Megaphone,
  },
];

const petroleumManagementItems = [
  {
    title: "Snapshots",
    url: "/admin/sectors/petroleum/snapshots",
    icon: Megaphone,
  },
  {
    title: "Objectives",
    url: "/admin/sectors/petroleum/objectives",
    icon: Tag,
  },
  {
    title: "Processes",
    url: "/admin/sectors/petroleum/processes",
    icon: Tag,
  },
  {
    title: "Resources",
    url: "/admin/sectors/petroleum/resources",
    icon: Tag,
  },
];

export function AppSidebar() {
  const rawPathname = usePathname();
  const pathname = stripLocale(rawPathname);

  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* ---------- HEADER ---------- */}
      <SidebarHeader className="py-10">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/admin/dashboard" className="flex flex-col items-center">
              <Image
                src="/logo-only.png"
                alt="Minister of Mining Logo"
                width={100}
                height={100}
                className="mx-auto mb-1 rounded-xl p-2"
              />
              <div className="grid flex-1 text-center gap-1 text-sm leading-tight group-data-[collapsible=icon]:opacity-0">
                <span className="truncate font-semibold text-golden-dark">
                  Minister of Mining
                </span>
                <span className="truncate text-golden-dark">
                  Portal Admin
                </span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ---------- CONTENT ---------- */}
      <SidebarContent>
        <SidebarGroup className="px-5 group-data-[collapsible=icon]:px-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 group-data-[collapsible=icon]:items-center">

              {/* MAIN NAV */}
              {navigationItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="group-data-[collapsible=icon]:w-fit"
                >
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.url)}
                    tooltip={item.title}
                    className="text-primary hover:bg-golden-dark20 px-5 py-5
                      group-data-[collapsible=icon]:px-2
                      group-data-[collapsible=icon]:justify-center
                      data-[active=true]:bg-golden-dark
                      data-[active=true]:text-primary-foreground
                      "
                  >
                    <Link
                      href={item.url}
                      className="flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center"
                    >
                      <item.icon className="group-data-[collapsible=icon]:size-5" />
                      <span className="text-base group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* NEWS WITH NESTED MENU */}
              <Collapsible
                asChild
                defaultOpen={pathname.startsWith("/admin/news")}
                className="group/collapsible"
              >
                <SidebarMenuItem className="group-data-[collapsible=icon]:w-fit">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="News"
                      isActive={pathname.startsWith("/admin/news")}
                      className="text-primary hover:bg-golden-metallic px-5 py-5
                        group-data-[collapsible=icon]:px-2
                        group-data-[collapsible=icon]:justify-center
                        data-[active=true]:bg-golden-dark
                        data-[active=true]:text-primary-foreground"
                    >
                      <Newspaper className="group-data-[collapsible=icon]:size-5" />
                      <span className="text-base group-data-[collapsible=icon]:hidden">
                        News
                      </span>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200
                          group-data-[state=open]/collapsible:rotate-90
                          group-data-[collapsible=icon]:hidden"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="pt-1">
                      {newsManagementItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                            className="text-primary hover:bg-golden-metallic
                              group-data-[collapsible=icon]:justify-center
                              data-[active=true]:bg-golden-metallic
                              data-[active=true]:text-primary"
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* MINING WITH NESTED MENU */}
              <Collapsible
                asChild
                defaultOpen={pathname.startsWith("/admin/sectors/mining")}
                className="group/collapsible"
              >
                <SidebarMenuItem className="group-data-[collapsible=icon]:w-fit">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Mining"
                      isActive={pathname.startsWith("/admin/sectors/mining")}
                      className="text-primary hover:bg-golden-metallic px-5 py-5
                        group-data-[collapsible=icon]:px-2
                        group-data-[collapsible=icon]:justify-center
                        data-[active=true]:bg-golden-dark
                        data-[active=true]:text-primary-foreground"
                    >
                      <Newspaper className="group-data-[collapsible=icon]:size-5" />
                      <span className="text-base group-data-[collapsible=icon]:hidden">
                        Mining
                      </span>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200
                          group-data-[state=open]/collapsible:rotate-90
                          group-data-[collapsible=icon]:hidden"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="pt-1">
                      {miningManagementItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                            className="text-primary hover:bg-golden-metallic
                              group-data-[collapsible=icon]:justify-center
                              data-[active=true]:bg-golden-metallic
                              data-[active=true]:text-primary"
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* ASM WITH NESTED MENU */}
              <Collapsible
                asChild
                defaultOpen={pathname.startsWith("/admin/asm")}
                className="group/collapsible"
              >
                <SidebarMenuItem className="group-data-[collapsible=icon]:w-fit">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Artisanal Mining"
                      isActive={pathname.startsWith("/admin/asm")}
                      className="text-primary hover:bg-golden-metallic px-5 py-5
                        group-data-[collapsible=icon]:px-2
                        group-data-[collapsible=icon]:justify-center
                        data-[active=true]:bg-golden-dark
                        data-[active=true]:text-primary-foreground"
                    >
                      <Newspaper className="group-data-[collapsible=icon]:size-5" />
                      <span className="text-base group-data-[collapsible=icon]:hidden">
                        Artisanal Mining
                      </span>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200
                          group-data-[state=open]/collapsible:rotate-90
                          group-data-[collapsible=icon]:hidden"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="pt-1">
                      {asmManagementItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                            className="text-primary hover:bg-golden-metallic
                              group-data-[collapsible=icon]:justify-center
                              data-[active=true]:bg-golden-metallic
                              data-[active=true]:text-primary"
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* INVESTIGATE ETHIOPIA WITH NESTED MENU */}
              <Collapsible
                asChild
                defaultOpen={pathname.startsWith("/admin/investigate-ethiopia")}
                className="group/collapsible"
              >
                <SidebarMenuItem className="group-data-[collapsible=icon]:w-fit">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Investigate Ethiopia"
                      isActive={pathname.startsWith("/admin/investigate-ethiopia")}
                      className="text-primary hover:bg-golden-metallic px-5 py-5
                        group-data-[collapsible=icon]:px-2
                        group-data-[collapsible=icon]:justify-center
                        data-[active=true]:bg-golden-dark
                        data-[active=true]:text-primary-foreground"
                    >
                      <Newspaper className="group-data-[collapsible=icon]:size-5" />
                      <span className="text-base group-data-[collapsible=icon]:hidden">
                        Investigate Ethiopia
                      </span>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200
                          group-data-[state=open]/collapsible:rotate-90
                          group-data-[collapsible=icon]:hidden"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="pt-1">
                      {investigateEthiopiaManagementItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                            className="text-primary hover:bg-golden-metallic
                              group-data-[collapsible=icon]:justify-center
                              data-[active=true]:bg-golden-metallic
                              data-[active=true]:text-primary"
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* GEOLOGY WITH NESTED MENU */}
              <Collapsible
                asChild
                defaultOpen={pathname.startsWith("/admin/sectors/geology")}
                className="group/collapsible"
              >
                <SidebarMenuItem className="group-data-[collapsible=icon]:w-fit">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Geothermal"
                      isActive={pathname.startsWith("/admin/sectors/geology")}
                      className="text-primary hover:bg-golden-metallic px-5 py-5
                        group-data-[collapsible=icon]:px-2
                        group-data-[collapsible=icon]:justify-center
                        data-[active=true]:bg-golden-dark
                        data-[active=true]:text-primary-foreground"
                    >
                      <Newspaper className="group-data-[collapsible=icon]:size-5" />
                      <span className="text-base group-data-[collapsible=icon]:hidden">
                        Geothermal
                      </span>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200
                          group-data-[state=open]/collapsible:rotate-90
                          group-data-[collapsible=icon]:hidden"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="pt-1">
                      {geologyManagementItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                            className="text-primary hover:bg-golden-metallic
                              group-data-[collapsible=icon]:justify-center
                              data-[active=true]:bg-golden-metallic
                              data-[active=true]:text-primary"
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* PETROLEUM WITH NESTED MENU */}
              <Collapsible
                asChild
                defaultOpen={pathname.startsWith("/admin/sectors/petroleum")}
                className="group/collapsible"
              >
                <SidebarMenuItem className="group-data-[collapsible=icon]:w-fit">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Petroleum"
                      isActive={pathname.startsWith("/admin/sectors/petroleum")}
                      className="text-primary hover:bg-golden-metallic px-5 py-5
                        group-data-[collapsible=icon]:px-2
                        group-data-[collapsible=icon]:justify-center
                        data-[active=true]:bg-golden-dark
                        data-[active=true]:text-primary-foreground"
                    >
                      <Newspaper className="group-data-[collapsible=icon]:size-5" />
                      <span className="text-base group-data-[collapsible=icon]:hidden">
                        Petroleum
                      </span>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200
                          group-data-[state=open]/collapsible:rotate-90
                          group-data-[collapsible=icon]:hidden"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="pt-1">
                      {petroleumManagementItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                            className="text-primary hover:bg-golden-metallic
                              group-data-[collapsible=icon]:justify-center
                              data-[active=true]:bg-golden-metallic
                              data-[active=true]:text-primary"
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* USERS WITH NESTED MENU */}
              <Collapsible
                asChild
                defaultOpen={pathname.startsWith("/admin/users")}
                className="group/collapsible"
              >
                <SidebarMenuItem className="group-data-[collapsible=icon]:w-fit">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Users"
                      isActive={pathname.startsWith("/admin/users")}
                      className="text-primary hover:bg-golden-metallic px-5 py-5
                        group-data-[collapsible=icon]:px-2
                        group-data-[collapsible=icon]:justify-center
                        data-[active=true]:bg-golden-dark
                        data-[active=true]:text-primary-foreground"
                    >
                      <Users className="group-data-[collapsible=icon]:size-5" />
                      <span className="text-base group-data-[collapsible=icon]:hidden">
                        Users
                      </span>
                      <ChevronRight
                        className="ml-auto transition-transform duration-200
                          group-data-[state=open]/collapsible:rotate-90
                          group-data-[collapsible=icon]:hidden"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="pt-1">
                      {userManagementItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                            className="text-primary hover:bg-golden-metallic
                              group-data-[collapsible=icon]:justify-center
                              data-[active=true]:bg-golden-metallic
                              data-[active=true]:text-primary"
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}