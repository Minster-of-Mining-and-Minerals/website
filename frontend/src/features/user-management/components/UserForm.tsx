"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, XIcon, UserCircle, Mail, Phone, ShieldCheck, Briefcase } from "lucide-react";
import { toast } from "sonner";
import {
    useCreateUserMutation,
    useUpdateUserMutation,
    useGetUserByIdQuery,
    useGetUserTypesQuery
} from "@/redux/api/userApi";
import { useGetRolesQuery } from "@/redux/api/roleApi";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface UserFormProps {
    userId?: string;
}

const UserForm = ({ userId }: UserFormProps) => {
    const router = useRouter();
    const isEdit = !!userId;

    /* API Hooks */
    const { data: userData, isLoading: isUserLoading } = useGetUserByIdQuery(userId as string, { skip: !isEdit });
    const { data: userTypes = [] } = useGetUserTypesQuery();
    const { data: rolesData = [] } = useGetRolesQuery({ is_active: true });

    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    /* Form State */
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userTypeId, setUserTypeId] = useState("");
    const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
    const [isActive, setIsActive] = useState(true);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    // Track if initial load has happened to prevent overwriting
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    /* Populate Form in Edit Mode - Only on initial load */
    useEffect(() => {
        if (userData && isInitialLoad) {
            setFullName(userData.full_name || "");
            setEmail(userData.email || "");
            setPhoneNumber(userData.phone_number || "");
            setUserTypeId(userData.user_type_id || "");
            setIsActive(userData.is_active);

            if (userData.roles && userData.roles.length > 0) {
                const roleIds = userData.roles.map(r => r.role_id);
                setSelectedRoleIds(roleIds);
            }
            setIsInitialLoad(false);
        }
    }, [userData, isInitialLoad]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullName || !email || !userTypeId) {
            toast.error("Please fill in all required fields (Name, Email, User Type)");
            return;
        }

        const payload = {
            full_name: fullName,
            email,
            phone_number: phoneNumber,
            user_type_id: userTypeId,
            role_ids: selectedRoleIds,
            is_active: isActive
        };

        const loadingToast = toast.loading(isEdit ? "Updating user..." : "Creating user...");

        try {
            if (isEdit) {
                await updateUser({ id: userId as string, data: payload }).unwrap();
                toast.dismiss(loadingToast);
                toast.success("User updated successfully");
            } else {
                await createUser(payload).unwrap();
                toast.dismiss(loadingToast);
                toast.success("User created successfully. Temporary password sent via email.");
            }

            setTimeout(() => {
                router.push("/admin/users");
            }, 1000);
        } catch (err: any) {
            toast.dismiss(loadingToast);
            toast.error(err?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} user`);
        }
    };

    // Handle role removal
    const handleRemoveRole = (roleId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Removing role:", roleId);
        setSelectedRoleIds(prev => {
            const newRoles = prev.filter(id => id !== roleId);
            console.log("Previous roles:", prev);
            console.log("New roles:", newRoles);
            return newRoles;
        });
    };

    // Handle role addition
    const handleAddRole = (roleId: string) => {
        console.log("Adding role:", roleId);
        setSelectedRoleIds(prev => {
            if (!prev.includes(roleId)) {
                return [...prev, roleId];
            }
            return prev;
        });
    };

    if (isUserLoading) return <div className="p-10 text-center">Loading user details...</div>;

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6 pb-8">
            <Card className="border-golden-dark/20 shadow-sm">
                <CardHeader className="bg-golden-dark/5 border-b border-golden-dark/10">
                    <CardTitle className="text-xl text-golden-dark flex items-center gap-2">
                        <UserCircle className="h-6 w-6" />
                        {isEdit ? "Edit User Account" : "Create New User Account"}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">
                        {isEdit
                            ? `Updating information for ${userData?.full_name}`
                            : "Enter details to register a new administrator or personnel."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                    {/* Basic Information Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-golden-dark/10">
                            <Briefcase className="h-5 w-5 text-golden-dark" />
                            <h2 className="font-semibold text-golden-dark">Identity & Contact</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-1.5 text-golden-dark/80">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-golden-dark/50" />
                                    <Input
                                        id="fullName"
                                        className="pl-10 border-golden-dark/20 focus-visible:ring-golden-dark/30"
                                        placeholder="Enter full name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5 text-golden-dark/80">
                                    Email Address <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-golden-dark/50" />
                                    <Input
                                        id="email"
                                        type="email"
                                        className="pl-10 border-golden-dark/20 focus-visible:ring-golden-dark/30"
                                        placeholder="email@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isEdit}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-1.5 text-golden-dark/80">
                                    Phone Number
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-golden-dark/50" />
                                    <Input
                                        id="phoneNumber"
                                        className="pl-10 border-golden-dark/20 focus-visible:ring-golden-dark/30"
                                        placeholder="+251 ..."
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="userType" className="text-sm font-medium flex items-center gap-1.5 text-golden-dark/80">
                                    User Type <span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="userType"
                                    className="w-full flex h-10 rounded-md border border-golden-dark/20 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden-dark/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={userTypeId}
                                    onChange={(e) => setUserTypeId(e.target.value)}
                                    required
                                >
                                    <option value="">Select User Type</option>
                                    {userTypes.map((type) => (
                                        <option key={type.user_type_id} value={type.user_type_id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Permissions & Roles Section */}
                    <div className="space-y-6 pt-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-golden-dark/10">
                            <ShieldCheck className="h-5 w-5 text-golden-dark" />
                            <h2 className="font-semibold text-golden-dark">Roles & Access Control</h2>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-golden-dark/80">Assign System Roles</Label>
                            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        className="w-full min-h-12 max-h-32 overflow-y-auto border border-golden-dark/20 p-3 rounded-lg bg-golden-dark/5 hover:bg-golden-dark/10 transition-colors text-left cursor-pointer"
                                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                                    >
                                        <div className="flex flex-wrap gap-2 items-center">
                                            {selectedRoleIds.length === 0 && (
                                                <span className="text-muted-foreground text-sm flex items-center gap-2">
                                                    Click to assign roles...
                                                    <ChevronDown className="h-4 w-4" />
                                                </span>
                                            )}
                                            {selectedRoleIds.map((roleId) => {
                                                const role = rolesData.find(r => r.role_id === roleId);
                                                if (!role) return null;
                                                return (
                                                    <Badge
                                                        key={roleId}
                                                        className="bg-golden-dark text-white hover:bg-golden-dark/90 gap-1 px-2 py-1"
                                                    >
                                                        {role.name}
                                                        <div
                                                            className="cursor-pointer hover:text-red-300 transition-colors flex items-center justify-center ml-1"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleRemoveRole(roleId, e as any);
                                                            }}
                                                            onPointerDown={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <XIcon className="h-3 w-3" />
                                                        </div>
                                                    </Badge>
                                                );
                                            })}
                                            {selectedRoleIds.length > 0 && (
                                                <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2 border-golden-dark/20" align="start">
                                    <div className="space-y-1 max-h-60 overflow-y-auto">
                                        {rolesData.length === 0 && <p className="p-4 text-center text-sm text-muted-foreground">No roles available</p>}
                                        {rolesData
                                            .filter(role => !selectedRoleIds.includes(role.role_id))
                                            .map((role) => (
                                                <button
                                                    key={role.role_id}
                                                    type="button"
                                                    onClick={() => {
                                                        handleAddRole(role.role_id);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-golden-dark/10 text-golden-dark rounded-md transition-colors"
                                                >
                                                    <div className="font-semibold">{role.name}</div>
                                                    {role.description && (
                                                        <div className="text-[10px] text-muted-foreground truncate">{role.description}</div>
                                                    )}
                                                </button>
                                            ))}
                                        {rolesData.filter(r => !selectedRoleIds.includes(r.role_id)).length === 0 && selectedRoleIds.length > 0 && (
                                            <p className="p-2 text-center text-xs text-muted-foreground italic">All available roles assigned</p>
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {isEdit && (
                            <div className="flex items-center gap-3 p-4 bg-golden-dark/5 rounded-lg border border-golden-dark/10">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    className="h-4 w-4 text-golden-dark border-golden-dark/30 rounded focus:ring-golden-dark"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                />
                                <Label htmlFor="isActive" className="text-sm cursor-pointer font-medium text-golden-dark">
                                    Account is Active & Enabled
                                </Label>
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="bg-golden-dark/5 border-t border-golden-dark/10 px-6 py-4 flex items-center justify-end gap-3 rounded-b-lg">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/users")}
                        className="bg-white border-golden-dark/20 text-golden-dark hover:bg-golden-dark/5"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isCreating || isUpdating}
                        className="bg-golden-dark hover:bg-golden-dark/90 text-white px-8"
                    >
                        {isEdit ? "Update Account" : "Create Account"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default UserForm;