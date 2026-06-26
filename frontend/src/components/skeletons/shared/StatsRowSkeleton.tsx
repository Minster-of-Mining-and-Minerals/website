import { Skeleton } from "@/components/ui/skeleton";

type StatsRowSkeletonProps = {
    count?: number;
};

export function StatsRowSkeleton({ count = 4 }: StatsRowSkeletonProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                        <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-5 w-28" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
