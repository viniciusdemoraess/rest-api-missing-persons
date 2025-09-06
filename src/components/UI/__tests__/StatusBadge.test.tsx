import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/utils/test-utils';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge', () => {
  it('should render missing status correctly', () => {
    render(<StatusBadge status="DESAPARECIDO" />);
    
    expect(screen.getByText('Desaparecida')).toBeInTheDocument();
    expect(screen.getByTestId('alert-triangle')).toBeInTheDocument();
  });

  it('should render found alive status correctly', () => {
    render(<StatusBadge status="LOCALIZADO" vivo={true} />);
    
    expect(screen.getByText('Localizada Viva')).toBeInTheDocument();
    expect(screen.getByTestId('check-circle')).toBeInTheDocument();
  });

  it('should render found status without alive indicator', () => {
    render(<StatusBadge status="LOCALIZADO" vivo={false} />);
    
    expect(screen.getByText('Localizada')).toBeInTheDocument();
    expect(screen.getByTestId('check-circle')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <StatusBadge status="DESAPARECIDO" className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});