import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/utils/test-utils';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('should render contact information', () => {
    render(<Footer />);

    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText('(65) 3613-7900')).toBeInTheDocument();
    expect(screen.getByText('Ouvidoria: 0800 647 7900')).toBeInTheDocument();
  });

  it('should render address information', () => {
    render(<Footer />);

    expect(screen.getByText('Endereço')).toBeInTheDocument();
    expect(screen.getByText(/Rua Engenheiro Edgar Prado/)).toBeInTheDocument();
    expect(screen.getByText(/CEP 78.049-909/)).toBeInTheDocument();
  });

  it('should render important information', () => {
    render(<Footer />);

    expect(screen.getByText('Importante')).toBeInTheDocument();
    expect(screen.getByText(/Em caso de emergência, ligue 190/)).toBeInTheDocument();
  });

  it('should render copyright information', () => {
    render(<Footer />);

    expect(screen.getByText(/© 2025 Polícia Judiciária Civil/)).toBeInTheDocument();
    expect(screen.getByText(/CNPJ: 06.284.531\/0001-30/)).toBeInTheDocument();
  });
});