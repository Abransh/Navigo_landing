// src/components/blog/Pagination.tsx
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Create a range of page numbers to display
  let pageRange = pageNumbers;
  if (totalPages > 5) {
    if (currentPage <= 3) {
      // Near the start
      pageRange = [...pageNumbers.slice(0, 5), null, totalPages];
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      pageRange = [1, null, ...pageNumbers.slice(totalPages - 5)];
    } else {
      // Middle
      pageRange = [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages];
    }
  }

  return (
    <nav className="flex justify-center mt-12">
      <ul className="flex items-center space-x-2">
        {/* Previous page */}
        <li>
          <Link 
            href={currentPage > 1 ? `${basePath}/page/${currentPage - 1}` : `${basePath}`}
            className={`
              flex items-center justify-center w-10 h-10 rounded-md border
              ${currentPage === 1 
                ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'border-border hover:bg-primary hover:text-white text-navy transition-colors'}
            `}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </li>
        
        {/* Page numbers */}
        {pageRange.map((pageNumber, i) => 
          pageNumber === null ? (
            <li key={`ellipsis-${i}`} className="text-foreground-muted">
              …
            </li>
          ) : (
            <li key={pageNumber}>
              <Link 
                href={pageNumber === 1 ? basePath : `${basePath}/page/${pageNumber}`}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-md border
                  ${pageNumber === currentPage 
                    ? 'bg-primary text-white border-primary' 
                    : 'border-border hover:bg-sand/50 text-navy transition-colors'}
                `}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
              >
                {pageNumber}
              </Link>
            </li>
          )
        )}
        
        {/* Next page */}
        <li>
          <Link 
            href={`${basePath}/page/${currentPage + 1}`}
            className={`
              flex items-center justify-center w-10 h-10 rounded-md border
              ${currentPage === totalPages 
                ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'border-border hover:bg-primary hover:text-white text-navy transition-colors'}
            `}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}