import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "../primitives/SkeletonText";

export function ArticleLayoutSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
                <Skeleton className="h-4 w-32" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <Skeleton className="h-64 sm:h-80 w-full rounded-none" />
                            <div className="p-6 space-y-4">
                                <Skeleton className="h-8 w-3/4" />
                                <SkeletonText lines={8} />
                            </div>
                        </article>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                            <Skeleton className="h-6 w-32" />
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="flex gap-3">
                                    <Skeleton className="h-16 w-16 rounded shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
