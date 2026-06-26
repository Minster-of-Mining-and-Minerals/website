import { SkeletonMediaCard } from "../../primitives/SkeletonMediaCard";
import { TagFilterSkeleton } from "../../shared/TagFilterSkeleton";

type NewsListSkeletonProps = {
    count?: number;
};

export function NewsListSkeleton({ count = 6 }: NewsListSkeletonProps) {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 space-y-3">
                <div className="h-8 w-32 bg-accent animate-pulse rounded-md" />
                <div className="h-1 w-12 bg-accent animate-pulse rounded-full" />
                <div className="h-4 w-full max-w-2xl bg-accent animate-pulse rounded-md" />
            </div>
            <TagFilterSkeleton />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: count }).map((_, index) => (
                    <SkeletonMediaCard key={index} />
                ))}
            </div>
        </section>
    );
}

export { ArticleLayoutSkeleton as NewsDetailSkeleton } from "../../shared/ArticleLayoutSkeleton";
