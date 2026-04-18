// hooks/usePermissions.ts
import { useSession } from "next-auth/react";
import { PermissionKey, hasPermission, normalizePermissions } from "@/lib/permissions";
import { useGetUserRolesAndPermissionsQuery } from "@/redux/api/userApi";

export function usePermissions() {
  const { status } = useSession();
  const { data: generatedPermissions = [], isLoading: isPermissionsLoading } =
    useGetUserRolesAndPermissionsQuery(undefined, {
      skip: status !== "authenticated",
    });

  const userPermissions = generatedPermissions?.permissions;
  console.log("userPermissions: ", userPermissions)

  const checkPermission = (required: {
    anyPermissions?: PermissionKey[];
    allPermissions?: PermissionKey[];
    onlyPermissions?: PermissionKey[];
  }) => {
    return hasPermission(userPermissions, required);
  };

  const can = (permission: PermissionKey) => {
    return userPermissions.includes(permission);
  };

  const canAny = (permissions: PermissionKey[]) => {
    return permissions.some((p) => userPermissions.includes(p));
  };

  const canAll = (permissions: PermissionKey[]) => {
    return permissions.every((p) => userPermissions.includes(p));
  };

  return {
    permissions: userPermissions,
    isLoading: status === "loading" || isPermissionsLoading,
    check: checkPermission,
    can,
    canAny,
    canAll,
  };
}
