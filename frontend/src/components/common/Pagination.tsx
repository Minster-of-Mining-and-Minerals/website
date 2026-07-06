"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    siblingCount?: number;
};

/**
 * Build a compact list of page numbers with ellipses.
 *
 * Examples (siblings = 1):
 *   1 total pages   → [1]
 *   totalPages = 5  → [1, 2, 3, 4, 5]
 *   current = 1     → [1, 2, 3, "…", 20]
 *   current = 10    → [1, "…", 9, 10, 11, "…", 20]
 *   current = 20    → [1, "…", 18, 19, 20]
 */
function buildPageList(
    currentPage: number,
    totalPages: number,
    siblingCount: number,
): (number | "ellipsis")[] {
    if (totalPages <= 1) return [1];

    const totalNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    const pages: (number | "ellipsis")[] = [1];

    if (showLeftEllipsis) pages.push("ellipsis");
    else for (let i = 2; i < leftSibling; i++) pages.push(i);

    for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== totalPages) pages.push(i);
    }

    if (showRightEllipsis) pages.push("ellipsis");
    else for (let i = rightSibling + 1; i < totalPages; i++) pages.push(i);

    pages.push(totalPages);

    return pages;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className,
    siblingCount = 1,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = buildPageList(currentPage, totalPages, siblingCount);
    const goTo = (page: number) => {
        const target = Math.min(Math.max(1, page), totalPages);
        if (target !== currentPage) onPageChange(target);
    };

    return (
        <nav
            role="navigation"
            aria-label="Pagination"
            className={cn("flex items-center justify-center gap-2 flex-wrap", className)}
        >
            <Button
                variant="outline"
                size="icon"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="h-9 w-9"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {pages.map((entry, i) =>
                entry === "ellipsis" ? (
                    <span
                        key={`ellipsis-${i}`}
                        className="px-2 text-sm text-gray-400 select-none"
                        aria-hidden="true"
                    >
                        …
                    </span>
                ) : (
                    <Button
                        key={entry}
                        variant={entry === currentPage ? "default" : "outline"}
                        size="icon"
                        onClick={() => goTo(entry)}
                        aria-current={entry === currentPage ? "page" : undefined}
                        aria-label={`Page ${entry}`}
                        className={cn(
                            "h-9 w-9 text-sm font-medium",
                            entry === currentPage &&
                                "bg-golden-dark text-white hover:bg-golden-dark/90 border-golden-dark",
                        )}
                    >
                        {entry}
                    </Button>
                ),
            )}

            <Button
                variant="outline"
                size="icon"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="h-9 w-9"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </nav>
    );
}
