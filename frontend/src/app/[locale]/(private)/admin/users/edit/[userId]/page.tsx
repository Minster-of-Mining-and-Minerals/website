"use client";

import UserForm from "@/features/user-management/components/UserForm";
import { useParams } from "next/navigation";

export default function EditUserPage() {
    const params = useParams();
    const userId = params.userId as string;

    return (
        <div className="w-full">
            <UserForm userId={userId} />
        </div>
    );
}
