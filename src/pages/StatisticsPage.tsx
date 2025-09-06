import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { StatisticsCard } from '../components/Statistics/StatisticsCard';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { ErrorMessage } from '../components/UI/ErrorMessage';
import { TrendingUp, Clock, Map } from 'lucide-react';

export const StatisticsPage: React.FC = () => {
  const {
    data: statistics,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => apiService.getStatistics(),
    retry: 2
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage 
          message="Não foi possível acessar os dados das estatísticas. Verifique sua conexão com a internet e tente novamente."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Estatísticas</h1>
          <p className="text-gray-600">Dados atualizados sobre pessoas desaparecidas em Mato Grosso</p>
        </div>

        {statistics && (
          <>
            <StatisticsCard 
              missing={statistics.quantPessoasDesaparecidas} 
              found={statistics.quantPessoasEncontradas} 
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Efetividade</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  {statistics.quantPessoasDesaparecidas + statistics.quantPessoasEncontradas > 0 
                    ? Math.round((statistics.quantPessoasEncontradas / (statistics.quantPessoasDesaparecidas + statistics.quantPessoasEncontradas)) * 100)
                    : 0
                  }%
                </p>
                <p className="text-sm text-gray-600">Taxa de localização</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Casos Ativos</h3>
                </div>
                <p className="text-3xl font-bold text-orange-600 mb-2">
                  {statistics.quantPessoasDesaparecidas.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Em investigação</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Map className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Localizações</h3>
                </div>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {statistics.quantPessoasEncontradas.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Pessoas encontradas</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Como você pode ajudar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Reportar informações</h4>
                  <p className="text-sm text-gray-600">
                    Se você tem informações sobre alguma pessoa desaparecida, utilize o sistema para reportar.
                    Qualquer informação pode ser valiosa para as investigações.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Compartilhar</h4>
                  <p className="text-sm text-gray-600">
                    Compartilhe os cartazes oficiais em suas redes sociais para ampliar o alcance
                    e aumentar as chances de localização.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};