import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../test/utils/test-utils';
import { HomePage } from '../HomePage';
import { mockPageResponse, mockStatistics, mockPerson } from '../../test/mocks/api';
import { apiService } from '../../services/api';

// Mock the API service
vi.mock('../../services/api', () => ({
  apiService: {
    searchPeople: vi.fn(),
    getStatistics: vi.fn(),
    getRandomPeople: vi.fn(),
  }
}));



describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mocks
    (apiService.getStatistics as any).mockResolvedValue(mockStatistics);
    (apiService.getRandomPeople as any).mockResolvedValue([mockPerson]);
    (apiService.searchPeople as any).mockResolvedValue(mockPageResponse);
  });

  it('should render statistics card', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Estatísticas Gerais')).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
    });
  });

  it('should render search filters', () => {
    render(<HomePage />);

    expect(screen.getByPlaceholderText('Digite o nome para buscar...')).toBeInTheDocument();
    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });


  it('should handle loading states', () => {
    (apiService.getStatistics as any).mockImplementation(() => new Promise(() => {}));
    
    render(<HomePage />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});