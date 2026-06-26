import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "../../primitives/SkeletonText";

export function TenderVacancyListSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                    <div className="flex justify-between gap-4">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-6 w-20 rounded-full shrink-0" />
                    </div>
                    <SkeletonText lines={2} />
                    <div className="flex gap-4">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function TenderVacancyDetailSkeleton() {
    return (
        <div className="max-w-4xl mx-auto py-8 space-y-6">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-9 w-3/4" />
            <div className="flex flex-wrap gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
            </div>
            <div className="bg-white rounded-2xl border p-6 md:p-8 space-y-4">
                <SkeletonText lines={8} />
                <Skeleton className="h-11 w-40 rounded-md" />
            </div>
        </div>
    );
}
