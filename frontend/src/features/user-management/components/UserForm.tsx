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

    /* Populate Form in Edit Mode */
    useEffect(() => {
        if (userData) {
            setFullName(userData.full_name || "");
            setEmail(userData.email || "");
            setPhoneNumber(userData.phone_number || "");
            setUserTypeId(userData.user_type_id || "");
            setIsActive(userData.is_active);
            
            if (userData.roles) {
                setSelectedRoleIds(userData.roles.map(r => r.role_id));
            }
        }
    }, [userData]);

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

    if (isUserLoading) return <div className="p-10 text-center">Loading user details...</div>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-[#094C81] p-6 text-white">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <UserCircle className="h-6 w-6" />
                        {isEdit ? "Edit User Account" : "Create New User Account"}
                    </h1>
                    <p className="text-[#E5E7EB] text-sm mt-1">
                        {isEdit 
                            ? `Updating information for ${userData?.full_name}` 
                            : "Enter details to register a new administrator or personnel."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Information Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <Briefcase className="h-4 w-4 text-[#094C81]" />
                            <h2 className="font-semibold text-[#094C81]">Identity & Contact</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-1.5">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input 
                                        id="fullName"
                                        className="pl-10"
                                        placeholder="Enter full name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5">
                                    Email Address <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input 
                                        id="email"
                                        type="email"
                                        className="pl-10"
                                        placeholder="email@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isEdit} // Email usually shouldn't change for unique ID reasons, though controller supports it
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-1.5">
                                    Phone Number
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input 
                                        id="phoneNumber"
                                        className="pl-10"
                                        placeholder="+251 ..."
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="userType" className="text-sm font-medium flex items-center gap-1.5">
                                    User Type <span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="userType"
                                    className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <ShieldCheck className="h-4 w-4 text-[#094C81]" />
                            <h2 className="font-semibold text-[#094C81]">Roles & Access Control</h2>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-sm font-medium">Assign System Roles</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        type="button"
                                        className="w-full min-h-12 max-h-32 overflow-y-auto border border-gray-200 p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors text-left"
                                    >
                                        <div className="flex flex-wrap gap-2 items-center">
                                            {selectedRoleIds.length === 0 && (
                                                <span className="text-gray-400 text-sm flex items-center gap-2">
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
                                                        className="bg-[#094C81] text-white hover:bg-[#073954] gap-1 px-2 py-1"
                                                    >
                                                        {role.name}
                                                        <XIcon 
                                                            className="h-3 w-3 cursor-pointer" 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedRoleIds(prev => prev.filter(id => id !== roleId));
                                                            }}
                                                        />
                                                    </Badge>
                                                );
                                            })}
                                            {selectedRoleIds.length > 0 && (
                                                <ChevronDown className="h-4 w-4 ml-auto text-gray-400" />
                                            )}
                                        </div>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2" align="start">
                                    <div className="space-y-1 max-h-60 overflow-y-auto">
                                        {rolesData.length === 0 && <p className="p-4 text-center text-sm text-gray-400">No roles available</p>}
                                        {rolesData
                                            .filter(role => !selectedRoleIds.includes(role.role_id))
                                            .map((role) => (
                                                <button
                                                    key={role.role_id}
                                                    type="button"
                                                    onClick={() => setSelectedRoleIds(prev => [...prev, role.role_id])}
                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#094C81]/10 text-[#094C81] rounded-md transition-colors"
                                                >
                                                    <div className="font-semibold">{role.name}</div>
                                                    {role.description && (
                                                        <div className="text-[10px] text-gray-500 truncate">{role.description}</div>
                                                    )}
                                                </button>
                                            ))}
                                        {rolesData.filter(r => !selectedRoleIds.includes(r.role_id)).length === 0 && selectedRoleIds.length > 0 && (
                                            <p className="p-2 text-center text-xs text-gray-400 italic">All available roles assigned</p>
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {isEdit && (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    className="h-4 w-4 text-[#094C81] border-gray-300 rounded focus:ring-[#094C81]"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                />
                                <Label htmlFor="isActive" className="text-sm cursor-pointer font-medium text-gray-700">
                                    Account is Active & Enabled
                                </Label>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/admin/users")}
                            className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isCreating || isUpdating}
                            className="bg-[#094C81] hover:bg-[#073954] text-white px-8"
                        >
                            {isEdit ? "Update Account" : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
