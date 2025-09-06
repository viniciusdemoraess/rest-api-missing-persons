import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/utils/test-utils';
import { PersonCard } from '../PersonCard';
import { mockPerson, mockFoundPerson } from '../../../test/mocks/api';

describe('PersonCard', () => {
  it('should render person information correctly', () => {
    render(<PersonCard person={mockPerson} />);
    
    expect(screen.getByText('João da Silva')).toBeInTheDocument();
    expect(screen.getByText('Masculino, 35 anos')).toBeInTheDocument();
    expect(screen.getByText('Centro, Cuiabá - MT')).toBeInTheDocument();
  });

  it('should show missing status for missing person', () => {
    render(<PersonCard person={mockPerson} />);
    
    expect(screen.getByText('Desaparecida')).toBeInTheDocument();
    expect(screen.getByText(/Desaparecida em/)).toBeInTheDocument();
  });

  it('should show found status for found person', () => {
    render(<PersonCard person={mockFoundPerson} />);
    
    expect(screen.getByText('Localizada Viva')).toBeInTheDocument();
    expect(screen.getByText(/Localizada em/)).toBeInTheDocument();
  });

  it('should render female gender correctly', () => {
    const femalePerson = { ...mockPerson, sexo: 'FEMININO' as const };
    render(<PersonCard person={femalePerson} />);
    
    expect(screen.getByText('Feminino, 35 anos')).toBeInTheDocument();
  });

  it('should handle missing photo gracefully', () => {
    const personWithoutPhoto = { ...mockPerson, urlFoto: '' };
    render(<PersonCard person={personWithoutPhoto} />);
    
    const image = screen.getByAltText('João da Silva');
    expect(image).toBeInTheDocument();
  });
});