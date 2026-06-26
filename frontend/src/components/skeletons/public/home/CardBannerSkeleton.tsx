import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonText } from "../../primitives/SkeletonText";

export function CardBannerSkeleton() {
    return (
        <section className="w-full flex justify-center md:px-4 mb-20">
            <div className="relative w-full max-w-7xl md:rounded-3xl overflow-hidden shadow-xl">
                <Skeleton className="h-64 sm:h-72 w-full rounded-none" />
                <div className="absolute inset-0 p-8 lg:p-14 flex flex-col lg:flex-row justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <Skeleton className="h-8 w-2/3 bg-white/40" />
                        <SkeletonText lines={2} className="[&_*]:bg-white/30" />
                    </div>
                    <Skeleton className="h-11 w-36 rounded-md self-start bg-white/40" />
                </div>
            </div>
        </section>
    );
}
