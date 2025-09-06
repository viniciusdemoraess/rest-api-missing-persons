import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages - 1, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(0, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0 || isLoading}
        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Anterior</span>
      </button>

      {getVisiblePages().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={isLoading}
          className={`px-3 py-2 rounded-lg transition-colors ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 hover:bg-gray-50 disabled:opacity-50'
          }`}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1 || isLoading}
        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span>Próxima</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};