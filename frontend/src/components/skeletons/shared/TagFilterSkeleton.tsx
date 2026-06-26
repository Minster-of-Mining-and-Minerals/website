import { Skeleton } from "@/components/ui/skeleton";

type TagFilterSkeletonProps = {
    count?: number;
};

export function TagFilterSkeleton({ count = 5 }: TagFilterSkeletonProps) {
    return (
        <div className="flex flex-wrap gap-4 mb-8">
            {Array.from({ length: count }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-24 rounded-lg" />
            ))}
        </div>
    );
}
