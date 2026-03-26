"use client";

import { useGetLeadershipsQuery } from "@/redux/api/leadershipApi";
import HierarchyNode from "./HierarchyNode";
import { buildLeadershipTree } from "@/utils/buildLeadershipTree";

export default function LeadershipSection() {
    const { data, isLoading, isError } = useGetLeadershipsQuery();

    if (isLoading) {
        return <div className="text-center py-20">Loading leadership...</div>;
    }

    if (isError || !data) {
        return <div className="text-center py-20 text-red-600">Failed to load leadership</div>;
    }

    const leadershipTree = buildLeadershipTree(data);

    if (!leadershipTree) {
        return <div className="text-center py-20">No leadership data</div>;
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
