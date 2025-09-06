import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../test/utils/test-utils';
import { StatisticsPage } from '../StatisticsPage';
import { mockStatistics } from '../../test/mocks/api';

// Mock the API service
vi.mock('../../services/api', () => ({
  apiService: {
    getStatistics: vi.fn(),
  }
}));

import { apiService } from '../../services/api';

describe('StatisticsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (apiService.getStatistics as any).mockResolvedValue(mockStatistics);
  });

  it('should render page title and description', async () => {
    render(<StatisticsPage />);

    expect(screen.getByText('Estatísticas')).toBeInTheDocument();
    expect(screen.getByText('Dados atualizados sobre pessoas desaparecidas em Mato Grosso')).toBeInTheDocument();
  });

  it('should render statistics cards', async () => {
    render(<StatisticsPage />);

    await waitFor(() => {
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
      expect(screen.getByText('33%')).toBeInTheDocument(); // 75/(150+75) = 33%
    });
  });

  it('should render additional statistics cards', async () => {
    render(<StatisticsPage />);

    await waitFor(() => {
      expect(screen.getByText('Efetividade')).toBeInTheDocument();
      expect(screen.getByText('Casos Ativos')).toBeInTheDocument();
      expect(screen.getByText('Localizações')).toBeInTheDocument();
    });
  });

  it('should render help section', async () => {
    render(<StatisticsPage />);

    await waitFor(() => {
      expect(screen.getByText('Como você pode ajudar')).toBeInTheDocument();
      expect(screen.getByText('Reportar informações')).toBeInTheDocument();
      expect(screen.getByText('Compartilhar')).toBeInTheDocument();
    });
  });

  it('should handle loading state', () => {
    (apiService.getStatistics as any).mockImplementation(() => new Promise(() => {}));
    
    render(<StatisticsPage />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should handle error state', async () => {
    (apiService.getStatistics as any).mockRejectedValue(new Error('API Error'));
    
    render(<StatisticsPage />);

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar estatísticas. Verifique sua conexão e tente novamente.')).toBeInTheDocument();
    });
  });
});