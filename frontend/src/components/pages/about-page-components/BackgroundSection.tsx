"use client";

import React from "react";
import { useGetBackgroundsQuery } from "@/redux/api/backgroundApi";
import RotatingImage3D from "./RotatingImage3D";
import * as LucideIcons from "lucide-react";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { Loader2, ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE ?? "http://localhost:4000";

const BackgroundPage = () => {
    const { data: backgrounds, isLoading, isError } = useGetBackgroundsQuery();
    const t = useTranslations("empty_state");

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-golden-dark" />
            </div>
        );
    }

    if (isError || !backgrounds || backgrounds.length === 0) {
        return <PublicEmptyState title={t("background_title")} icon={ImageIcon} />;
    }

    // Always use the first background
    const bg = backgrounds[0];

    // Split title into two spans
    const titleParts = bg.title.split(" ");
    const titleFirst = titleParts[0];
    const titleSecond = titleParts.slice(1).join(" ") || "";

    // Choose icon dynamically
    const IconComponent =
        bg.icon && (LucideIcons as any)[bg.icon]
            ? (LucideIcons as any)[bg.icon]
            : LucideIcons.FileText;

    // Get front and back images
    const frontAttachment =
        bg.attachments?.[0]?.attachment?.file_path
            ? `${BACKEND_URL}/${bg.attachments[0].attachment.file_path.replaceAll("\\", "/")}`
            : "/map.jpg";

    const backAttachment =
        bg.attachments?.[1]?.attachment?.file_path
            ? `${BACKEND_URL}/${bg.attachments[1].attachment.file_path.replaceAll("\\", "/")}`
            : "/home-2.jpg";

    return (
        <div className="h-auto py-12 px-4 mb-10">
            <div className="max-w-7xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center md:gap-4 mb-4">
                        <div className="bg-golden-dark/10 pt-2 pb-1 rounded-2xl">
                            <IconComponent className="w-8 h-8 text-golden-dark" />
                        </div>
                        <div className="text-2xl md:text-4xl font-bold text-teal-900">
                            <span>{titleFirst}</span>{" "}
                            {titleSecond && <span className="text-golden-dark">{titleSecond}</span>}
                        </div>
                    </div>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">{bg.description}</p>
                </div>

                {/* Rotating 3D Images */}
                <div className="flex items-center justify-center">
                    <RotatingImage3D frontUrl={frontAttachment} backUrl={backAttachment} />
                </div>

                {/* Main Content */}
                <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center mt-12">{bg.content}</p>
            </div>
        </div>
    );
};

export default BackgroundPage;