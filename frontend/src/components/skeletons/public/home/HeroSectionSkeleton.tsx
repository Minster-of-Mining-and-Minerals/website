import { Skeleton } from "@/components/ui/skeleton";

export function HeroSectionSkeleton() {
    return (
        <section className="relative w-full h-[80vh] min-h-[28rem] bg-gray-200 overflow-hidden">
            <Skeleton className="absolute inset-0 rounded-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16 space-y-4 max-w-3xl">
                <Skeleton className="h-6 w-40 bg-white/30" />
                <Skeleton className="h-10 sm:h-14 w-full max-w-2xl bg-white/30" />
                <Skeleton className="h-10 sm:h-12 w-full max-w-xl bg-white/30" />
                <div className="flex flex-wrap gap-3 pt-2">
                    <Skeleton className="h-11 w-36 rounded-md bg-white/30" />
                    <Skeleton className="h-11 w-36 rounded-md bg-white/30" />
                </div>
            </div>
        </section>
    );
}
