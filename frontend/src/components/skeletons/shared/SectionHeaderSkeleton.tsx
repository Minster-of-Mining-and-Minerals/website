import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SectionHeaderSkeletonProps = {
    showAction?: boolean;
    className?: string;
};

export function SectionHeaderSkeleton({
    showAction = false,
    className,
}: SectionHeaderSkeletonProps) {
    return (
        <div className={cn("mb-10 flex justify-between items-center gap-4", className)}>
            <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-48 sm:w-64" />
                <Skeleton className="h-1 w-20 rounded-full" />
            </div>
            {showAction && <Skeleton className="h-11 w-36 rounded-2xl shrink-0" />}
        </div>
    );
}
