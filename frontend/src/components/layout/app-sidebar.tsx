"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ChevronRight,
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
// import { routePermissions, getChildRoutes } from "@/config/routes";
import { hasPermissionFromSession } from "@/lib/permissions";
import { useSession } from "next-auth/react";
import { routePermissions } from "@/utils/routes";

/* ---------------- LOCALE STRIPPER ---------------- */
const stripLocale = (pathname: string) => {
  const segments = pathname.split("/");
  if (segments.length > 1 && ["en", "am"].includes(segments[1])) {
    return "/" + segments.slice(2).join("/");
  }
  return pathname;
};

/* ---------------- ICON MAP ---------------- */
const getIconForRoute = (label: string) => {
  const iconMap: Record<string, any> = {
    Dashboard: LayoutDashboard,
    "Hero Section": Building2,
    About: Building2,
    Services: Briefcase,
    Contacts: Phone,
    Footer: Building2,
    Users: Users,
    News: Newspaper,
    Mining: Megaphone,
    "Artisanal Mining": Megaphone,
    "Investigate Ethiopia": Megaphone,
    Geothermal: Megaphone,
    Petroleum: Megaphone,
  };
  return iconMap[label] || Tag;
};

/* ---------------- MENU ITEM COMPONENT ---------------- */
interface MenuItemProps {
  item: {
    path: string;
    label: string;
    permissions?: any;
  };
  pathname: string;
  isNested?: boolean;
}

const MenuItem = ({ item, pathname, isNested = false }: MenuItemProps) => {
  const { data: session } = useSession();

  // Check permissions if they exist
  if (item.permissions) {
    const hasAccess = hasPermissionFromSession(session, item.permissions);
    if (!hasAccess) return null;
  }

  const Icon = getIconForRoute(item.label);
  const isActive = isNested ? pathname === item.path : pathname.startsWith(item.path);
  const isExactActive = pathname === item.path;

  if (isNested) {
    return (
      <SidebarMenuSubItem key={item.path}>
        <SidebarMenuSubButton
          asChild
          isActive={isExactActive}
          className="text-primary hover:bg-golden-metallic
            group-data-[collapsible=icon]:justify-center
            data-[active=true]:bg-golden-metallic
            data-[active=true]:text-primary"
        >
          <Link href={item.path}>
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }

  return (
    <SidebarMenuItem
      key={item.path}
      className="group-data-[collapsible=icon]:w-fit"
    >
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.label}
        className="text-primary hover:bg-golden-dark20 px-5 py-5
          group-data-[collapsible=icon]:px-2
          group-data-[collapsible=icon]:justify-center
          data-[active=true]:bg-golden-dark
          data-[active=true]:text-primary-foreground"
      >
        <Link
          href={item.path}
          className="flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center"
        >
          <Icon className="group-data-[collapsible=icon]:size-5" />
          <span className="text-base group-data-[collapsible=icon]:hidden">
            {item.label}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

/* ---------------- COLLAPSIBLE MENU SECTION ---------------- */
interface CollapsibleSectionProps {
  route: {
    path: string;
    label: string;
    children?: any[];
    permissions?: any;
  };
  pathname: string;
}

const CollapsibleSection = ({ route, pathname }: CollapsibleSectionProps) => {
  const { data: session } = useSession();

  // Check parent permissions
  if (route.permissions) {
    const hasAccess = hasPermissionFromSession(session, route.permissions);
    if (!hasAccess) return null;
  }

  // Filter children based on permissions
  const visibleChildren = route.children?.filter(child => {
    if (child.permissions) {
      return hasPermissionFromSession(session, child.permissions);
    }
    return true;
  }) || [];

  if (visibleChildren.length === 0) return null;

  const Icon = getIconForRoute(route.label);
  const isActive = pathname.startsWith(route.path);

  return (
    <Collapsible
      asChild
      defaultOpen={isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem className="group-data-[collapsible=icon]:w-fit">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={route.label}
            isActive={isActive}
            className="text-primary hover:bg-golden-metallic px-5 py-5
              group-data-[collapsible=icon]:px-2
              group-data-[collapsible=icon]:justify-center
              data-[active=true]:bg-golden-dark
              data-[active=true]:text-primary-foreground"
          >
            <Icon className="group-data-[collapsible=icon]:size-5" />
            <span className="text-base group-data-[collapsible=icon]:hidden">
              {route.label}
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
            {visibleChildren.map((child) => (
              <MenuItem
                key={child.path}
                item={child}
                pathname={pathname}
                isNested={true}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

/* ---------------- MAIN SIDEBAR COMPONENT ---------------- */
export function AppSidebar() {
  const rawPathname = usePathname();
  const pathname = stripLocale(rawPathname);

  // Separate top-level routes (no parent) and nested routes
  const topLevelRoutes = routePermissions.filter(
    (route) => !route.children && !route.path.includes("/users/") &&
      !route.path.includes("/news/") && !route.path.includes("/sectors/")
  );

  const collapsibleRoutes = routePermissions.filter(
    (route) => route.children && route.children.length > 0
  );

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

              {/* Top Level Routes (Dashboard, Hero, About, Services, Contacts, Footer) */}
              {topLevelRoutes.map((route) => (
                <MenuItem
                  key={route.path}
                  item={route}
                  pathname={pathname}
                  isNested={false}
                />
              ))}

              {/* Collapsible Sections (News, Mining, Artisanal Mining, etc.) */}
              {collapsibleRoutes.map((route) => (
                <CollapsibleSection
                  key={route.path}
                  route={route}
                  pathname={pathname}
                />
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}