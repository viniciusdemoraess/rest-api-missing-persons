import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/utils/test-utils';
import App from '../App';




describe('App', () => {
  it('should render header and footer', () => {
    render(<App />, { withRouter: false });

    expect(screen.getByText('Sistema de Pessoas Desaparecidas')).toBeInTheDocument();
    expect(screen.getByText('Polícia Civil - Mato Grosso')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

});
