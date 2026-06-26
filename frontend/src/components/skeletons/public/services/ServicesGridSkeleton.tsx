import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "../../primitives/SkeletonText";

export function ServicesGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <SkeletonText lines={3} />
                </div>
            ))}
        </div>
    );
}
