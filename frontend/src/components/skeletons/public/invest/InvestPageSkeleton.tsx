import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "../../primitives/SkeletonText";

export function InvestPageSkeleton() {
    return (
        <div className="space-y-10 py-8">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
                        <Skeleton className="h-6 w-1/2" />
                        <SkeletonText lines={4} />
                    </div>
                ))}
            </div>
        </div>
    );
}
