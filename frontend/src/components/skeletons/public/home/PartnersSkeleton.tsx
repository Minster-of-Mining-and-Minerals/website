import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeaderSkeleton } from "../../shared/SectionHeaderSkeleton";

export function PartnersSkeleton() {
    return (
        <section className="w-full max-w-7xl pb-28 mx-auto px-4">
            <SectionHeaderSkeleton className="justify-center text-center [&>div]:items-center [&>div]:mx-auto" />
            <div className="flex gap-8 overflow-hidden py-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="h-16 w-32 rounded-lg shrink-0" />
                ))}
            </div>
        </section>
    );
}
