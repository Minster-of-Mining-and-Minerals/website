import { SkeletonMediaCard } from "../../primitives/SkeletonMediaCard";
import { TagFilterSkeleton } from "../../shared/TagFilterSkeleton";

type EventsListSkeletonProps = {
    count?: number;
};

export function EventsListSkeleton({ count = 6 }: EventsListSkeletonProps) {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <TagFilterSkeleton />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: count }).map((_, index) => (
                    <SkeletonMediaCard key={index} />
                ))}
            </div>
        </section>
    );
}

export { ArticleLayoutSkeleton as EventDetailSkeleton } from "../../shared/ArticleLayoutSkeleton";
