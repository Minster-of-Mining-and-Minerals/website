import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "../../primitives/SkeletonText";
import { StatsRowSkeleton } from "../../shared/StatsRowSkeleton";

export function GemstonesListSkeleton() {
    return (
        <div className="w-full mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <Skeleton className="h-12 lg:col-span-6 rounded-lg" />
                    <Skeleton className="h-12 lg:col-span-4 rounded-lg" />
                    <Skeleton className="h-12 lg:col-span-2 rounded-lg" />
                </div>
            </div>

            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl grid grid-cols-1 lg:grid-cols-3 border border-gray-200 overflow-hidden shadow-md"
                >
                    <Skeleton className="h-56 lg:h-auto w-full rounded-none" />
                    <div className="p-6 col-span-2 space-y-4">
                        <Skeleton className="h-7 w-2/3" />
                        <Skeleton className="h-4 w-1/3" />
                        <SkeletonText lines={2} />
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function GemstoneDetailSkeleton() {
    return (
        <div className="not-prose min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-40" />

                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                    <Skeleton className="h-48 sm:h-64 md:h-[40vh] w-full rounded-none" />
                    <div className="p-4 sm:p-6 md:p-8 space-y-6">
                        <StatsRowSkeleton />
                        <div className="space-y-4">
                            <Skeleton className="h-7 w-48" />
                            <SkeletonText lines={5} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden p-4 space-y-3">
                            <Skeleton className="h-44 w-full rounded-xl" />
                            <Skeleton className="h-5 w-3/4" />
                            <SkeletonText lines={2} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function SectorSnapshotSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
            <Skeleton className="h-10 w-2/3 max-w-xl" />
            <Skeleton className="h-1 w-24 rounded-full" />
            <Skeleton className="h-64 sm:h-80 w-full rounded-2xl" />
            <SkeletonText lines={6} />
        </div>
    );
}

export function ResourcePageSkeleton() {
    return (
        <div className="space-y-8 py-8">
            {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                    <Skeleton className="h-7 w-48" />
                    <SkeletonText lines={2} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, cardIndex) => (
                            <div key={cardIndex} className="border border-gray-200 rounded-lg p-4 space-y-3">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-9 w-28 rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
