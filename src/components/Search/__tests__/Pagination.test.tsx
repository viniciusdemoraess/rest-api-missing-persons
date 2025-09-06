import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/utils/test-utils';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination
        currentPage={0}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render pagination controls', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próxima')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // currentPage + 1
  });

  it('should disable previous button on first page', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const previousButton = screen.getByRole('button', { name: /Anterior/i });
    expect(previousButton).toBeDisabled();

  });

  it('should disable next button on last page', () => {
    render(
      <Pagination
        currentPage={4}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: /Próxima/i });
    expect(nextButton).toBeDisabled();

  });

  it('should call onPageChange when page number is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButton = screen.getByText('4'); // Page 3 (index 3)
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('should call onPageChange when previous button is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const previousButton = screen.getByText('Anterior');
    fireEvent.click(previousButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('should call onPageChange when next button is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByText('Próxima');
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('should disable all buttons when loading', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
        isLoading={true}
      />
    );

    expect(screen.getByRole('button', { name: /Anterior/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Próxima/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: '3' })).toBeDisabled();
  });
});