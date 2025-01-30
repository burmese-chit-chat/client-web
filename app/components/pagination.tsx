import React from "react";
import Link from "next/link";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationProps {
    /** Current active page number */
    currentPage?: number;
    /** Total number of pages */
    totalPages?: number;
    /** Base URL path for pagination links */
    basePath?: string;
    /** Maximum number of page numbers to display */
    maxDisplayed?: number;
    /** Additional CSS classes */
    className?: string;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage = 1, totalPages = 1, basePath = "", maxDisplayed = 5, className = "" }) => {
    // Ensure currentPage and totalPages are numbers
    const current = Number(currentPage);
    const total = Number(totalPages);

    // Generate array of page numbers to display
    const getPageNumbers = (): number[] => {
        const halfDisplay = Math.floor(maxDisplayed / 2);

        const startPage = Math.max(1, current - halfDisplay);
        const endPage = Math.min(total, startPage + maxDisplayed - 1);

        // Adjust start if we're near the end
        const adjustedStart = endPage - startPage + 1 < maxDisplayed ? Math.max(1, endPage - maxDisplayed + 1) : startPage;

        return Array.from({ length: endPage - adjustedStart + 1 }, (_, i) => adjustedStart + i);
    };

    const visiblePages = getPageNumbers();
    const showStartEllipsis = visiblePages[0] > 1;
    const showEndEllipsis = visiblePages[visiblePages.length - 1] < total;

    // Helper to generate href for a page
    const getHref = (page: number): string => {
        if (basePath.includes("?")) {
            return `${basePath}&page=${page}`;
        }
        return `${basePath}?page=${page}`;
    };

    if (total <= 1) return null;

    return (
        <Pagination className={`max-w-[90%] mx-auto overflow-x-auto ${className}`}>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <Link href={getHref(Math.max(1, current - 1))} passHref legacyBehavior>
                        <PaginationPrevious className={current <= 1 ? "pointer-events-none opacity-50" : ""} aria-disabled={current <= 1} />
                    </Link>
                </PaginationItem>

                {/* First Page */}
                {showStartEllipsis && (
                    <>
                        <PaginationItem>
                            <Link href={getHref(1)} passHref legacyBehavior>
                                <PaginationLink>1</PaginationLink>
                            </Link>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}

                {/* Page Numbers */}
                {visiblePages.map(pageNum => (
                    <PaginationItem key={pageNum}>
                        <Link href={getHref(pageNum)} passHref legacyBehavior>
                            <PaginationLink isActive={pageNum === current}>{pageNum}</PaginationLink>
                        </Link>
                    </PaginationItem>
                ))}

                {/* End Ellipsis */}
                {showEndEllipsis && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <Link href={getHref(total)} passHref legacyBehavior>
                                <PaginationLink>{total}</PaginationLink>
                            </Link>
                        </PaginationItem>
                    </>
                )}

                {/* Next Button */}
                <PaginationItem>
                    <Link href={getHref(Math.min(total, current + 1))} passHref legacyBehavior>
                        <PaginationNext className={current >= total ? "pointer-events-none opacity-50" : ""} aria-disabled={current >= total} />
                    </Link>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
