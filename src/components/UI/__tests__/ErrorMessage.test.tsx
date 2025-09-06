import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/utils/test-utils';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message', () => {
    render(<ErrorMessage message="Test error message" />);
    
    // Título fixo do componente
    expect(screen.getByText('Falha na conexão')).toBeInTheDocument();
    // Mensagem passada via prop
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', () => {
    const mockRetry = vi.fn();
    render(<ErrorMessage message="Test error" onRetry={mockRetry} />);
    
    const retryButton = screen.getByRole('button', { name: /atualizar/i });    
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledOnce();
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Test error" />);
    
    // O botão não deve aparecer
    expect(screen.queryByRole('button', { name: /atualizar/i })).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ErrorMessage message="Test error" className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
