import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/utils/test-utils';
import App from '../App';

// Mock the pages to avoid complex dependencies
vi.mock('../pages/HomePage', () => ({
  HomePage: () => <div>HomePage Component</div>
}));

vi.mock('../pages/PersonDetailsPage', () => ({
  PersonDetailsPage: () => <div>PersonDetailsPage Component</div>
}));

vi.mock('../pages/StatisticsPage', () => ({
  StatisticsPage: () => <div>StatisticsPage Component</div>
}));

describe('App', () => {
  it('should render header and footer', () => {
    render(<App />);

    expect(screen.getByText('ABITUS')).toBeInTheDocument();
    expect(screen.getByText('Polícia Civil - Mato Grosso')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('should render home page by default', async () => {
    render(<App />);

    expect(screen.getByText('HomePage Component')).toBeInTheDocument();
  });

  it('should have proper layout structure', () => {
    const { container } = render(<App />);
    
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});