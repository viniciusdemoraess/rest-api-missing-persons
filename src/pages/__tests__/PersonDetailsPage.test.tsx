import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../test/utils/test-utils';
import { PersonDetailsPage } from '../PersonDetailsPage';
import { mockPerson, mockOccurrenceInfo } from '../../test/mocks/api';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
  };
});

// Mock the API service
vi.mock('../../services/api', () => ({
  apiService: {
    getPersonDetails: vi.fn(),
    getOccurrenceInformation: vi.fn(),
    addOccurrenceInformation: vi.fn(),
  }
}));

import { apiService } from '../../services/api';

describe('PersonDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    (apiService.getPersonDetails as any).mockResolvedValue(mockPerson);
    (apiService.getOccurrenceInformation as any).mockResolvedValue(mockOccurrenceInfo);
  });

  it('should render person details', async () => {
    render(<PersonDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('João da Silva')).toBeInTheDocument();
      expect(screen.getByText('Masculino, 35 anos')).toBeInTheDocument();
      expect(screen.getByText('Centro, Cuiabá - MT')).toBeInTheDocument();
    });
  });

  it('should render occurrence details', async () => {
    render(<PersonDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('Detalhes da Ocorrência')).toBeInTheDocument();
      expect(screen.getByText('Pessoa foi vista pela última vez no centro da cidade')).toBeInTheDocument();
      expect(screen.getByText('Camisa azul e calça jeans')).toBeInTheDocument();
    });
  });

  it('should show add information button for missing persons', async () => {
    render(<PersonDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('Adicionar Informações')).toBeInTheDocument();
    });
  });

  it('should render citizen information section', async () => {
    render(<PersonDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('Informações de Cidadãos')).toBeInTheDocument();
      expect(screen.getByText('Pessoa foi vista no shopping')).toBeInTheDocument();
    });
  });

  it('should show back to search link', async () => {
    render(<PersonDetailsPage />);
  
    // espera até que o elemento apareça
    expect(await screen.findByText('Voltar à busca')).toBeInTheDocument();
  });
  

  it('should handle loading state', () => {
    (apiService.getPersonDetails as any).mockImplementation(() => new Promise(() => {}));
    
    render(<PersonDetailsPage />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });  
  
});