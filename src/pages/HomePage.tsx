import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService, SearchFilters } from '../services/api';
import { SearchFilters as SearchFiltersComponent } from '../components/Search/SearchFilters';
import { PersonCard } from '../components/Search/PersonCard';
import { Pagination } from '../components/Search/Pagination';
import { StatisticsCard } from '../components/Statistics/StatisticsCard';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { ErrorMessage } from '../components/UI/ErrorMessage';

export const HomePage: React.FC = () => {
  const [filters, setFilters] = React.useState<SearchFilters>({
    nome: '',
    faixaIdadeInicial: undefined,
    faixaIdadeFinal: undefined,
    sexo: '',
    status: '',
    pagina: 0,
    porPagina: 12
  });

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
    refetch: refetchSearch
  } = useQuery({
    queryKey: ['searchPeople', filters],
    queryFn: () => apiService.searchPeople(filters),
    retry: 2
  });

  const {
    data: statistics,
    isLoading: isStatsLoading,
    error: statsError
  } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => apiService.getStatistics(),
    retry: 2
  });

  const {
    data: randomPeople,
    isLoading: isRandomLoading
  } = useQuery({
    queryKey: ['randomPeople'],
    queryFn: () => apiService.getRandomPeople(12),
    retry: 2
  });

  const handleSearch = () => {
    refetchSearch();
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, pagina: page }));
  };

  const hasSearched = filters.nome || filters.faixaIdadeInicial || filters.faixaIdadeFinal || filters.sexo || filters.status;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Statistics */}
        {!statsError && statistics && (
          <StatisticsCard 
            missing={statistics.quantPessoasDesaparecidas} 
            found={statistics.quantPessoasEncontradas} 
          />
        )}

        {/* Statistics Error */}
        {statsError && (
          <div className="mb-6">
            <ErrorMessage 
              message="Não foi possível carregar as estatísticas. Verifique sua conexão com a internet."
              onRetry={() => window.location.reload()}
            />
          </div>
        )}

        {/* Search Filters */}
        <SearchFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
          isLoading={isSearchLoading}
        />

        {/* Search Results */}
        {hasSearched && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Resultados da Busca
              {searchResults && ` (${searchResults.totalElements} encontrados)`}
            </h2>

            {isSearchLoading && <LoadingSpinner className="py-12" />}
            
            {searchError && (
              <ErrorMessage 
                message="Não foi possível acessar os dados das pessoas. Verifique sua conexão com a internet e tente novamente."
                onRetry={refetchSearch}
              />
            )}

            {searchResults && !isSearchLoading && (
              <>
                {searchResults.content.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Nenhuma pessoa encontrada com os filtros aplicados.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {searchResults.content.map(person => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </div>
                    
                    <Pagination
                      currentPage={searchResults.number}
                      totalPages={searchResults.totalPages}
                      onPageChange={handlePageChange}
                      isLoading={isSearchLoading}
                    />
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* Recent Cases */}
        {!hasSearched && searchResults && !isRandomLoading && (
          <>
          {searchResults.content.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Nenhuma pessoa encontrada com os filtros aplicados.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.content.map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
              
              <Pagination
                currentPage={searchResults.number}
                totalPages={searchResults.totalPages}
                onPageChange={handlePageChange}
                isLoading={isSearchLoading}
              />
            </>
          )}
        </>
        )}

        {/* Loading state for initial load */}
        {!hasSearched && isRandomLoading && <LoadingSpinner className="py-12" />}

        {/* Error state for random people */}
        {!hasSearched && !isRandomLoading && !randomPeople && (
          <div className="text-center py-12">
            <ErrorMessage 
              message="Não foi possível carregar os casos recentes. Verifique sua conexão com a internet."
              onRetry={() => window.location.reload()}
            />
          </div>
        )}
      </div>
    </div>
  );
};