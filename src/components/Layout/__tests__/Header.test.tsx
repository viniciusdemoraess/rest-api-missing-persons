import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/utils/test-utils';
import { Header } from '../Header';

describe('Header', () => {
  it('should render logo and title', () => {
    render(<Header />);

    expect(screen.getByText('Sistema de Pessoas Desaparecidas')).toBeInTheDocument();
    expect(screen.getByText('Polícia Civil - Mato Grosso')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Header />);

    expect(screen.getByText('Buscar Pessoas')).toBeInTheDocument();
    expect(screen.getByText('Estatísticas')).toBeInTheDocument();
  });

  it('should have correct navigation links', () => {
    render(<Header />);

    const searchLink = screen.getByText('Buscar Pessoas').closest('a');
    const statsLink = screen.getByText('Estatísticas').closest('a');

    expect(searchLink).toHaveAttribute('href', '/');
    expect(statsLink).toHaveAttribute('href', '/statistics');
  });

  it('should render shield icon', () => {
    render(<Header />);

    expect(screen.getByTestId('shield')).toBeInTheDocument();
  });
});