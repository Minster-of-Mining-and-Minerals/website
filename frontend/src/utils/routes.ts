// config/routes.ts
export type PermissionKey = `${string}:${string}`;

export interface RouteConfig {
    path: string;
    label: string;
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
        // permissions: {
        //   anyPermissions: ["DASHBOARD:VIEW"],
        // },
    },
    {
        path: "/admin/hero-section",
        label: "Hero Section",
        // permissions: {
        //   anyPermissions: ["HERO:READ"],
        // },
    },
    {
        path: "/admin/about",
        label: "About",
        // permissions: {
        //   anyPermissions: ["ABOUT:READ"],
        // },
    },
    {
        path: "/admin/services",
        label: "Services",
        // permissions: {
        //   anyPermissions: ["SERVICES:READ"],
        // },
    },
    {
        path: "/admin/contacts",
        label: "Contacts",
        // permissions: {
        //   anyPermissions: ["CONTACT:READ"],
        // },
    },
    {
        path: "/admin/footer",
        label: "Footer",
        // permissions: {
        //   anyPermissions: ["FOOTER:READ"],
        // },
    },

    // ---------------- USERS ----------------
    {
        path: "/admin/users",
        label: "Users",
        children: [
            {
                path: "/admin/users",
                label: "User Accounts",
                // permissions: { anyPermissions: ["USERS:READ"] },
            },
            {
                path: "/admin/users/roles",
                label: "Role Management",
                // permissions: { anyPermissions: ["ROLES:READ"] },
            },
            {
                path: "/admin/users/permissions",
                label: "Permission Management",
                // permissions: { anyPermissions: ["PERMISSIONS:READ"] },
            },
        ],
    },

    // ---------------- NEWS ----------------
    {
        path: "/admin/news",
        label: "News",
        children: [
            {
                path: "/admin/news",
                label: "News",
                // permissions: { anyPermissions: ["NEWS:READ"] },
            },
            {
                path: "/admin/news/tags",
                label: "Tags",
                // permissions: { anyPermissions: ["TAGS:READ"] },
            },
            {
                path: "/admin/news/feedbacks",
                label: "News Feedbacks",
                // permissions: { anyPermissions: ["NEWS_FEEDBACKS:READ"] },
            },
        ],
    },

    // ---------------- MINING ----------------
    {
        path: "/admin/sectors/mining",
        label: "Mining",
        children: [
            {
                path: "/admin/sectors/mining/snapshots",
                label: "Snapshots",
                // permissions: { anyPermissions: ["MINING_SNAPSHOTS:READ"] },
            },
            {
                path: "/admin/sectors/mining/gamestones",
                label: "Gemstones",
                // permissions: { anyPermissions: ["MINING_GAMESTONES:READ"] },
            },
            {
                path: "/admin/sectors/mining/resources",
                label: "Resources",
                // permissions: { anyPermissions: ["MINING_RESOURCES:READ"] },
            },
            {
                path: "/admin/sectors/mining/application-processes",
                label: "Application Processes",
                // permissions: { anyPermissions: ["MINING_APPLICATION_PROCESSES:READ"] },
            },
            {
                path: "/admin/sectors/mining/regulation-processes",
                label: "Regulation Processes",
                // permissions: { anyPermissions: ["MINING_REGULATION_PROCESSES:READ"] },
            },
        ],
    },

    // ---------------- GEOTHERMAL ----------------
    {
        path: "/admin/sectors/geothermal",
        label: "Geothermal",
        children: [
            {
                path: "/admin/sectors/geothermal/snapshots",
                label: "Snapshots",
                // permissions: { anyPermissions: ["GEOTHERMAL_SNAPSHOTS:READ"] },
            },
            {
                path: "/admin/sectors/geothermal/resources",
                label: "Resources",
                // permissions: { anyPermissions: ["GEOTHERMAL_RESOURCES:READ"] },
            },
        ],
    },

    // ---------------- PETROLEUM ----------------
    {
        path: "/admin/sectors/petroleum",
        label: "Petroleum",
        children: [
            // {
            //     path: "/admin/sectors/petroleum/snapshots",
            //     label: "Snapshots",
            //     // permissions: { anyPermissions: ["PETROLEUM_SNAPSHOTS:READ"] },
            // },
            {
                path: "/admin/sectors/petroleum/objectives",
                label: "Objectives",
                // ⚠️ no direct permission in seeder
                // permissions: { anyPermissions: ["PETROLEUM_PROCESSES:READ"] },
            },
            {
                path: "/admin/sectors/petroleum/processes",
                label: "Processes",
                // permissions: { anyPermissions: ["PETROLEUM_PROCESSES:READ"] },
            },
            {
                path: "/admin/sectors/petroleum/regulation-processes",
                label: "Regulation Processes",
                // permissions: { anyPermissions: ["PETROLEUM_REGULATION_PROCESSES:READ"] },
            },
            {
                path: "/admin/sectors/petroleum/resources",
                label: "Resources",
                // permissions: { anyPermissions: ["PETROLEUM_RESOURCES:READ"] },
            },
        ],
    },

    // ---------------- ASM ----------------
    {
        path: "/admin/asm",
        label: "Artisanal Mining",
        children: [
            {
                path: "/admin/asm",
                label: "Overview",
                // permissions: { anyPermissions: ["ASM:READ"] },
            },
        ],
    },

    // ---------------- INVEST ETHIOPIA ----------------
    {
        path: "/admin/investigate-ethiopia",
        label: "Investigate Ethiopia",
        children: [
            {
                path: "/admin/investigate-ethiopia",
                label: "Overview",
                // permissions: { anyPermissions: ["INVESTIGATE_ETHIOPIA:READ"] },
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