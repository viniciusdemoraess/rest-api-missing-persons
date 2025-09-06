import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../../test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { InformationForm } from '../InformationForm';

describe('InformationForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });


  it('should call onClose when close button is clicked', () => {
    render(
      <InformationForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /Cancelar/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it('should call onClose when cancel button is clicked', () => {
    render(
      <InformationForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        onClose={mockOnClose}
      />
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it('should show validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    
    render(
      <InformationForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        onClose={mockOnClose}
      />
    );

    const submitButton = screen.getByText('Enviar Informações');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Informação deve ter pelo menos 10 caracteres')).toBeInTheDocument();
      expect(screen.getByText('Descrição deve ter pelo menos 5 caracteres')).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValueOnce(undefined);
    
    render(
      <InformationForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        onClose={mockOnClose}
      />
    );

    await user.type(
      screen.getByPlaceholderText(/descreva detalhadamente/i),
      'Vi a pessoa no centro da cidade ontem à tarde'
    );
    
    await user.type(
      screen.getByPlaceholderText(/ex: foto da pessoa/i),
      'Foto da pessoa no local'
    );
    

    const submitButton = screen.getByText('Enviar Informações');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          informacao: 'Vi a pessoa no centro da cidade ontem à tarde',
          descricao: 'Foto da pessoa no local'
        })
      );
    });
  });

  it('should disable submit button when loading', () => {
    render(
      <InformationForm
        onSubmit={mockOnSubmit}
        isLoading={true}
        onClose={mockOnClose}
      />
    );

    const searchButton = screen.getByRole('button', { name: /Enviar Informações/i });
    expect(searchButton).toBeDisabled();
  });
});