import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeaderSkeleton } from "../../shared/SectionHeaderSkeleton";
import { SkeletonText } from "../../primitives/SkeletonText";

export function FeaturedCarouselSkeleton() {
    return (
        <section className="w-full py-20">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeaderSkeleton showAction />

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Skeleton className="h-[250px] md:h-[370px] w-full rounded-none" />
                        <div className="p-4 md:p-8 flex flex-col justify-center gap-4">
                            <Skeleton className="h-7 w-4/5" />
                            <SkeletonText lines={3} />
                            <Skeleton className="h-11 w-36 rounded-md" />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex gap-4 overflow-hidden py-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="h-20 w-28 rounded-xl shrink-0" />
                    ))}
                </div>
            </div>
        </section>
    );
}
