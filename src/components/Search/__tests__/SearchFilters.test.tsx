import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { SearchFilters } from '../SearchFilters';

describe('SearchFilters', () => {
  const mockFilters = {
    nome: '',
    faixaIdadeInicial: undefined,
    faixaIdadeFinal: undefined,
    sexo: '',
    status: '',
    pagina: 0,
    porPagina: 10
  };

  const mockOnFiltersChange = vi.fn();
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search input and buttons', () => {
    render(
      <SearchFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
        isLoading={false}
      />
    );

    expect(screen.getByPlaceholderText('Digite o nome para buscar...')).toBeInTheDocument();
    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });

  it('should call onFiltersChange when name input changes', async () => {
    const user = userEvent.setup();
    
    render(
      <SearchFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
        isLoading={false}
      />
    );

    const nameInput = screen.getByPlaceholderText('Digite o nome para buscar...');
    await user.type(nameInput, 'João');

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      nome: 'João',
      pagina: 0
    });
  });

  it('should call onSearch when search button is clicked', () => {
    render(
      <SearchFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
        isLoading={false}
      />
    );

    const searchButton = screen.getByText('Buscar');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledOnce();
  });

  it('should show advanced filters when filter button is clicked', () => {
    render(
      <SearchFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
        isLoading={false}
      />
    );

    const filterButton = screen.getByText('Filtros');
    fireEvent.click(filterButton);

    expect(screen.getByText('Sexo')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Idade Mínima')).toBeInTheDocument();
    expect(screen.getByText('Idade Máxima')).toBeInTheDocument();
  });

  it('should show clear filters button when filters are active', () => {
    const filtersWithData = { ...mockFilters, nome: 'João' };
    
    render(
      <SearchFilters
        filters={filtersWithData}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
        isLoading={false}
      />
    );

    expect(screen.getByText('Filtros ativos aplicados')).toBeInTheDocument();
    expect(screen.getByText('Limpar filtros')).toBeInTheDocument();
  });

  it('should disable search button when loading', () => {
    render(
      <SearchFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
        isLoading={true}
      />
    );

    const searchButton = screen.getByText('Buscar');
    expect(searchButton).toBeDisabled();
  });
});