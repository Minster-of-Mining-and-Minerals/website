// Component Level Permission Gaurd
"use client";

import { PermissionKey } from "@/lib/permissions";
import { usePermissions } from "@/hooks/usePermissions";

interface ComponentGuardProps {
    children: React.ReactNode;
    anyPermissions?: PermissionKey[];
    allPermissions?: PermissionKey[];
    onlyPermissions?: PermissionKey[];
    fallback?: React.ReactNode;
}

export function ComponentGuard({
    children,
    anyPermissions,
    allPermissions,
    onlyPermissions,
    fallback = null,
}: ComponentGuardProps) {
    const { check, isLoading } = usePermissions();

    // Optional: avoid flicker while loading
    if (isLoading) return null;

    const hasAccess = check({
        anyPermissions,
        allPermissions,
        onlyPermissions,
    });

    if (!hasAccess) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}