import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/utils/test-utils';
import { StatisticsCard } from '../StatisticsCard';

describe('StatisticsCard', () => {
  it('should render statistics correctly', () => {
    render(<StatisticsCard missing={150} found={75} />);
    
    expect(screen.getByText('Estatísticas Gerais')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('Pessoas Desaparecidas')).toBeInTheDocument();
    expect(screen.getByText('Pessoas Localizadas')).toBeInTheDocument();
  });

  it('should calculate percentage correctly', () => {
    render(<StatisticsCard missing={100} found={50} />);
    
    expect(screen.getByText('33%')).toBeInTheDocument(); // 50/150 = 33%
    expect(screen.getByText('Taxa de Localização')).toBeInTheDocument();
  });

  it('should handle zero values', () => {
    render(<StatisticsCard missing={0} found={0} />);
    
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should format large numbers with locale', () => {
    render(<StatisticsCard missing={1500} found={750} />);
    
    expect(screen.getByText('1.500')).toBeInTheDocument();
    expect(screen.getByText('750')).toBeInTheDocument();
  });
});