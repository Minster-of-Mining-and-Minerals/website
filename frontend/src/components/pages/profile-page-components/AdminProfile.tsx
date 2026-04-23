"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon, Mail, Phone, Shield, Building2, Briefcase } from "lucide-react";
import { useGetUserRolesAndPermissionsQuery } from "@/redux/api/userApi";

export default function AdminProfile() {
  const { data: session } = useSession();
  const { data: rolePerms, isLoading: isRolePermsLoading } = useGetUserRolesAndPermissionsQuery();
  const user = session?.user;

  if (!user) {
    return <div className="p-8 text-center text-muted-foreground">Loading profile...</div>;
  }

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const displayRole = rolePerms?.roles?.[0] || "N/A";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-golden-dark/20 shadow-md">
        <CardHeader className="flex flex-row items-center gap-6 pb-6 border-b border-golden-dark/10">
          <Avatar className="h-24 w-24 border-2 border-golden-dark/20">
            <AvatarImage src={user.profile_image || user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="text-2xl bg-golden-dark/10 text-golden-dark">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-3xl text-golden-dark">{user.name}</CardTitle>
            <CardDescription className="text-base flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {user.email}
            </CardDescription>
            <div className="flex gap-2 mt-2">
              {displayRole !== "N/A" && (
                <Badge variant="secondary" className="bg-golden-dark/10 text-golden-dark">
                  {displayRole}
                </Badge>
              )}
              <Badge variant="outline" className="border-golden-dark/20">Admin</Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-golden-dark flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Contact Information
            </h3>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg border border-golden-dark/10 bg-golden-dark/5">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </span>
                <span className="font-medium">{user.email || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-golden-dark/10 bg-golden-dark/5">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone
                </span>
                <span className="font-medium">{user.phone_number || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Organization Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-golden-dark flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Organization Details
            </h3>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg border border-golden-dark/10 bg-golden-dark/5">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4" /> User ID
                </span>
                <span className="font-medium text-xs truncate max-w-[150px]" title={user.id}>{user.id || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-golden-dark/10 bg-golden-dark/5">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4" /> Primary Role
                </span>
                <span className="font-medium">{displayRole}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions & Roles */}
      {!isRolePermsLoading && ((rolePerms?.roles && rolePerms.roles.length > 0) || (rolePerms?.permissions && rolePerms.permissions.length > 0)) ? (
        <Card className="border-golden-dark/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-golden-dark flex items-center gap-2">
               <Shield className="h-5 w-5" /> Access & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {rolePerms.roles && rolePerms.roles.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Assigned Roles</h4>
                <div className="flex flex-wrap gap-2">
                  {rolePerms.roles.map((r, i) => (
                    <Badge key={i} variant="outline" className="border-golden-dark/30">{r}</Badge>
                  ))}
                </div>
              </div>
            )}

            {rolePerms.permissions && rolePerms.permissions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Granted Permissions</h4>
                <div className="flex flex-wrap gap-2">
                  {rolePerms.permissions.map((p, i) => (
                    <Badge key={i} variant="secondary" className="bg-slate-100 font-mono text-xs text-muted-foreground">{p}</Badge>
                  ))}
                </div>
              </div>
            )}
            
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
