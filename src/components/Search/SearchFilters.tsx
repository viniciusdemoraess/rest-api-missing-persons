import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../../services/api';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  isLoading
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value, pagina: 0 });
  };

  const clearFilters = () => {
    onFiltersChange({
      nome: '',
      faixaIdadeInicial: undefined,
      faixaIdadeFinal: undefined,
      sexo: '',
      status: '',
      pagina: 0,
      porPagina: 10
    });
  };

  const hasActiveFilters = filters.nome || filters.faixaIdadeInicial || filters.faixaIdadeFinal || filters.sexo || filters.status;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
              Nome da pessoa
            </label>
            <input
              id="nome"
              type="text"
              value={filters.nome || ''}
              onChange={(e) => updateFilter('nome', e.target.value)}
              placeholder="Digite o nome para buscar..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </button>
            
            <button
              onClick={onSearch}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Buscar</span>
            </button>
          </div>
        </div>

        {showAdvanced && (
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
              <select
                value={filters.sexo || ''}
                onChange={(e) => updateFilter('sexo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status || ''}
                onChange={(e) => updateFilter('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="DESAPARECIDO">Desaparecido</option>
                <option value="LOCALIZADO">Localizado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idade Mínima</label>
              <input
                type="number"
                value={filters.faixaIdadeInicial || ''}
                onChange={(e) => updateFilter('faixaIdadeInicial', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="0"
                min="0"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idade Máxima</label>
              <input
                type="number"
                value={filters.faixaIdadeFinal || ''}
                onChange={(e) => updateFilter('faixaIdadeFinal', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="120"
                min="0"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-sm text-gray-600">
              Filtros ativos aplicados
            </p>
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Limpar filtros</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};