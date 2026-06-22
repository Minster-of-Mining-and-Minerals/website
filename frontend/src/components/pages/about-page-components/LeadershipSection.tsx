"use client";

import { useGetLeadershipsQuery } from "@/redux/api/leadershipApi";
import HierarchyNode from "./HierarchyNode";
import { buildLeadershipTree } from "@/utils/buildLeadershipTree";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { Loader2, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LeadershipSection() {
    const { data, isLoading, isError } = useGetLeadershipsQuery();
    const t = useTranslations("empty_state");

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-golden-dark" />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <PublicEmptyState
                title={t("leadership_title")}
                description={t("error_description")}
                icon={Users}
            />
        );
    }

    const leadershipTree = buildLeadershipTree(data);

    if (!leadershipTree) {
        return <PublicEmptyState title={t("leadership_title")} icon={Users} />;
    }

    return (
        <div className="min-h-screen bg-gray-200 py-12 md:px-4 space-y-4">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="md:text-4xl text-2xl mb-10 font-bold text-teal-900">
                    <span className="text-golden-dark">Minister</span> of Mines
                </h1>
                {/* <p className="text-gray-600 mt-2">
                    Interactive organizational hierarchy
                </p> */}
            </div>

            <HierarchyNode node={leadershipTree} />

        </div>
    );
}
