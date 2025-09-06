import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '../../test/utils/test-utils';
import { StatisticsPage } from '../StatisticsPage';
import { mockStatistics } from '../../test/mocks/api';
import { apiService } from '../../services/api';
import { screen, waitFor } from '@testing-library/react';

// Mock the API service
vi.mock('../../services/api', () => ({
  apiService: {
    getStatistics: vi.fn(),
  }
}));



describe('StatisticsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (apiService.getStatistics as any).mockResolvedValue(mockStatistics);
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

});