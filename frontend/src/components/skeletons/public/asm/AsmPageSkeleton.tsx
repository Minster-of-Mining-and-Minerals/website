import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "../../primitives/SkeletonText";

export function AsmPageSkeleton() {
    return (
        <div className="space-y-8 py-8">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <SkeletonText lines={6} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-48 rounded-xl" />
            </div>
        </div>
    );
}
