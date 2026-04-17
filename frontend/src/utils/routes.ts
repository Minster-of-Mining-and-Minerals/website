// config/routes.ts
export type PermissionKey = `${string}:${string}`;

export interface RouteConfig {
    path: string;
    label: string;
    icon?: string;
    permissions?: {
        anyPermissions?: PermissionKey[];
        allPermissions?: PermissionKey[];
        onlyPermissions?: PermissionKey[];
    };
    children?: RouteConfig[];
}

export const routePermissions: RouteConfig[] = [
    // ---------------- MAIN ----------------
    {
        path: "/admin/dashboard",
        label: "Dashboard",
        icon: "LayoutDashboard",
        permissions: {
            anyPermissions: ["DASHBOARD:VIEW"],
        },
    },
    {
        path: "/admin/hero-section",
        label: "Hero Section",
        icon: "Image",
        permissions: {
            anyPermissions: ["HERO:READ"],
        },
    },
    {
        path: "/admin/about",
        label: "About",
        icon: "Info",
        permissions: {
            anyPermissions: ["ABOUT:READ"],
        },
    },
    {
        path: "/admin/services",
        label: "Services",
        icon: "Briefcase",
        permissions: {
            anyPermissions: ["SERVICES:READ"],
        },
    },
    {
        path: "/admin/contacts",
        label: "Contacts",
        icon: "Phone",
        permissions: {
            anyPermissions: ["CONTACT:READ"],
        },
    },
    {
        path: "/admin/footer",
        label: "Footer",
        icon: "Layout",
        permissions: {
            anyPermissions: ["FOOTER:READ"],
        },
    },

    // ---------------- USERS ----------------
    {
        path: "/admin/users",
        label: "Users",
        icon: "Users",
        permissions: {
            anyPermissions: ["USERS:READ", "ROLES:READ", "PERMISSIONS:READ"],
        },
        children: [
            {
                path: "/admin/users",
                label: "User Accounts",
                icon: "User",
                permissions: { anyPermissions: ["USERS:READ"] },
            },
            {
                path: "/admin/users/roles",
                label: "Role Management",
                icon: "ShieldCheck",
                permissions: { anyPermissions: ["ROLES:READ"] },
            },
            {
                path: "/admin/users/permissions",
                label: "Permission Management",
                icon: "Key",
                permissions: { anyPermissions: ["PERMISSIONS:READ"] },
            },
        ],
    },

    // ---------------- NEWS ----------------
    {
        path: "/admin/news",
        label: "News",
        icon: "Newspaper",
        permissions: {
            anyPermissions: ["NEWS:READ", "TAGS:READ"],
        },
        children: [
            {
                path: "/admin/news",
                label: "News",
                icon: "Newspaper",
                permissions: { anyPermissions: ["NEWS:READ"] },
            },
            {
                path: "/admin/news/tags",
                label: "Tags",
                icon: "Tag",
                permissions: { anyPermissions: ["TAGS:READ"] },
            },
            {
                path: "/admin/news/feedbacks",
                label: "News Feedbacks",
                icon: "MessageSquare",
                permissions: { anyPermissions: ["NEWS:READ"] },
            },
        ],
    },

    // ---------------- MINING ----------------
    {
        path: "/admin/sectors/mining",
        label: "Mining",
        icon: "Gem",
        permissions: {
            anyPermissions: ["MINING_SNAPSHOTS:READ", "MINING_GAMESTONES:READ", "MINING_RESOURCES:READ", "MINING_APPLICATION_PROCESSES:READ", "MINING_REGULATION_PROCESSES:READ"],
        },
        children: [
            {
                path: "/admin/sectors/mining/snapshots",
                label: "Snapshots",
                icon: "Camera",
                permissions: { anyPermissions: ["MINING_SNAPSHOTS:READ"] },
            },
            {
                path: "/admin/sectors/mining/gamestones",
                label: "Gemstones",
                icon: "Diamond",
                permissions: { anyPermissions: ["MINING_GAMESTONES:READ"] },
            },
            {
                path: "/admin/sectors/mining/resources",
                label: "Resources",
                icon: "Layers",
                permissions: { anyPermissions: ["MINING_RESOURCES:READ"] },
            },
            {
                path: "/admin/sectors/mining/application-processes",
                label: "Application Processes",
                icon: "ClipboardList",
                permissions: { anyPermissions: ["MINING_APPLICATION_PROCESSES:READ"] },
            },
            {
                path: "/admin/sectors/mining/regulation-processes",
                label: "Regulation Processes",
                icon: "FileText",
                permissions: { anyPermissions: ["MINING_REGULATION_PROCESSES:READ"] },
            },
        ],
    },

    // ---------------- GEOTHERMAL ----------------
    {
        path: "/admin/sectors/geothermal",
        label: "Geothermal",
        icon: "Thermometer",
        permissions: {
            anyPermissions: ["GEOTHERMAL_SNAPSHOTS:READ", "GEOTHERMAL_RESOURCES:READ"],
        },
        children: [
            {
                path: "/admin/sectors/geothermal/snapshots",
                label: "Snapshots",
                icon: "Camera",
                permissions: { anyPermissions: ["GEOTHERMAL_SNAPSHOTS:READ"] },
            },
            {
                path: "/admin/sectors/geothermal/resources",
                label: "Resources",
                icon: "Layers",
                permissions: { anyPermissions: ["GEOTHERMAL_RESOURCES:READ"] },
            },
        ],
    },

    // ---------------- PETROLEUM ----------------
    {
        path: "/admin/sectors/petroleum",
        label: "Petroleum",
        icon: "Droplets",
        permissions: {
            anyPermissions: ["PETROLEUM_SNAPSHOTS:READ", "PETROLEUM_PROCESSES:READ", "PETROLEUM_REGULATION_PROCESSES:READ", "PETROLEUM_RESOURCES:READ"],
        },
        children: [
            {
                path: "/admin/sectors/petroleum/objectives",
                label: "Objectives",
                icon: "Target",
                permissions: { anyPermissions: ["PETROLEUM_PROCESSES:READ"] },
            },
            {
                path: "/admin/sectors/petroleum/processes",
                label: "Processes",
                icon: "Activity",
                permissions: { anyPermissions: ["PETROLEUM_PROCESSES:READ"] },
            },
            {
                path: "/admin/sectors/petroleum/regulation-processes",
                label: "Regulation Processes",
                icon: "FileText",
                permissions: { anyPermissions: ["PETROLEUM_REGULATION_PROCESSES:READ"] },
            },
            {
                path: "/admin/sectors/petroleum/resources",
                label: "Resources",
                icon: "Layers",
                permissions: { anyPermissions: ["PETROLEUM_RESOURCES:READ"] },
            },
        ],
    },

    // ---------------- ASM ----------------
    {
        path: "/admin/asm",
        label: "Artisanal Mining",
        icon: "Hammer",
        permissions: {
            anyPermissions: ["ASM:READ"],
        },
        children: [
            {
                path: "/admin/asm",
                label: "Overview",
                icon: "Globe",
                permissions: { anyPermissions: ["ASM:READ"] },
            },
        ],
    },

    // ---------------- INVEST ETHIOPIA ----------------
    {
        path: "/admin/investigate-ethiopia",
        label: "Investigate Ethiopia",
        icon: "Search",
        permissions: {
            anyPermissions: ["INVESTIGATE_ETHIOPIA:READ"],
        },
        children: [
            {
                path: "/admin/investigate-ethiopia",
                label: "Overview",
                icon: "Globe",
                permissions: { anyPermissions: ["INVESTIGATE_ETHIOPIA:READ"] },
            },
        ],
    },

];


// ---------------- HELPER ----------------

// Find route (including children)
export function getPermissionsForPath(path: string) {
    for (const route of routePermissions) {
        if (route.path === path) return route.permissions;

        if (route.children) {
            const child = route.children.find((c) => c.path === path);
            if (child) return child.permissions;
        }
    }
    return undefined;
}


// Get children for tabs (🔥 THIS IS WHAT YOU WANT)
export function getChildRoutes(parentPath: string) {
    return routePermissions.find((r) => r.path === parentPath)?.children || [];
}