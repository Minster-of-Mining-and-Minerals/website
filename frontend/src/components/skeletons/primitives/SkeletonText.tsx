import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SkeletonTextProps = {
    lines?: number;
    className?: string;
};

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
    return (
        <div className={cn("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                    key={index}
                    className={cn("h-4", index === lines - 1 ? "w-4/5" : "w-full")}
                />
            ))}
        </div>
    );
}
