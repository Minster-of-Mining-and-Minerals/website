"use client";

import React from "react";
import { FileText, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface PublicEmptyStateProps {
    title: string;
    description?: string;
    variant?: "page" | "inline";
    icon?: LucideIcon;
    action?: React.ReactNode;
    className?: string;
    hideDescription?: boolean;
}

export default function PublicEmptyState({
    title,
    description,
    variant = "page",
    icon: Icon = FileText,
    action,
    className,
    hideDescription = false,
}: PublicEmptyStateProps) {
    const t = useTranslations("empty_state");
    const resolvedDescription = description ?? t("default_description");
    const isInline = variant === "inline";

    return (
        <div
            className={cn(
                "text-center",
                isInline ? "py-6" : "py-16 px-4",
                className
            )}
        >
            {!isInline && (
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                    <Icon className="h-9 w-9 text-golden-dark/60" />
                </div>
            )}
            <h3
                className={cn(
                    "font-semibold text-gray-900",
                    isInline ? "text-sm mb-1" : "text-lg sm:text-xl mb-2"
                )}
            >
                {title}
            </h3>
            {!hideDescription && (
                <p
                    className={cn(
                        "text-gray-600 mx-auto",
                        isInline ? "text-sm max-w-sm" : "text-base max-w-md mb-6"
                    )}
                >
                    {resolvedDescription}
                </p>
            )}
            {action}
        </div>
    );
}
