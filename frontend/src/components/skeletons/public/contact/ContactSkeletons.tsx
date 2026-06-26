import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "../../primitives/SkeletonText";

export function ContactPageSkeleton() {
    return (
        <section className="container max-w-7xl mx-auto px-4 py-16">
            <div className="mb-12 space-y-4">
                <Skeleton className="h-9 w-40" />
                <Skeleton className="h-1 w-12 rounded-full" />
                <Skeleton className="h-4 w-full max-w-2xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex gap-3 items-start">
                            <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-11 w-full rounded-md" />
                    <Skeleton className="h-11 w-full rounded-md" />
                    <Skeleton className="h-11 w-full rounded-md" />
                    <Skeleton className="h-32 w-full rounded-md" />
                    <Skeleton className="h-11 w-32 rounded-md ml-auto" />
                </div>
            </div>

            <Skeleton className="h-72 w-full rounded-2xl mt-10" />
        </section>
    );
}

export function RegionalOfficesSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                    <Skeleton className="h-6 w-2/3" />
                    <SkeletonText lines={3} />
                    <Skeleton className="h-4 w-40" />
                </div>
            ))}
        </div>
    );
}
