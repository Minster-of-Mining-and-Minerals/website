import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "./SkeletonText";
import { cn } from "@/lib/utils";

type SkeletonMediaCardProps = {
    imageHeight?: string;
    className?: string;
};

export function SkeletonMediaCard({
    imageHeight = "h-52",
    className,
}: SkeletonMediaCardProps) {
    return (
        <div className={cn("bg-white rounded-2xl shadow-md overflow-hidden", className)}>
            <Skeleton className={cn("w-full rounded-none", imageHeight)} />
            <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <SkeletonText lines={2} />
            </div>
        </div>
    );
}
