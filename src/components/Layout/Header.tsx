import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, UserSearch } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <UserSearch className="h-8 w-8" data-testid="logo-icon" />
          <div>
              <h1 className="text-xl font-bold">Sistema de Pessoas Desaparecidas</h1>
              <p className="text-sm text-blue-200">Polícia Civil - Mato Grosso</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Search className="h-4 w-4" />
              <span>Buscar Pessoas</span>
            </Link>
            <Link to="/statistics" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Users className="h-4 w-4" />
              <span>Estatísticas</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};