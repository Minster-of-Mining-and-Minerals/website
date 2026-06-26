import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "../../primitives/SkeletonText";

export function AboutSectionsSkeleton() {
    return (
        <div className="space-y-16 py-8">
            <div className="space-y-6">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-64 w-full rounded-2xl" />
                <SkeletonText lines={5} />
            </div>

            <div className="space-y-6">
                <Skeleton className="h-8 w-48 mx-auto" />
                <div className="flex flex-col items-center gap-6">
                    <Skeleton className="h-40 w-40 rounded-full" />
                    <Skeleton className="h-32 w-72 rounded-xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
                        <Skeleton className="h-24 rounded-xl" />
                        <Skeleton className="h-24 rounded-xl" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <Skeleton className="h-6 w-32" />
                        <SkeletonText lines={3} />
                    </div>
                ))}
            </div>
        </div>
    );
}
