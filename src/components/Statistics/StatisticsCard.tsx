import React from 'react';
import { Users, UserCheck, AlertTriangle } from 'lucide-react';

interface StatisticsCardProps {
  missing: number;
  found: number;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({ missing, found }) => {
  const total = missing + found;
  const foundPercentage = total > 0 ? Math.round((found / total) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
        <Users className="h-5 w-5" />
        <span>Estatísticas Gerais</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-900">{missing.toLocaleString()}</p>
              <p className="text-sm text-red-700">Pessoas Desaparecidas</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-3">
            <UserCheck className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-900">{found.toLocaleString()}</p>
              <p className="text-sm text-green-700">Pessoas Localizadas</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-900">{foundPercentage}%</p>
              <p className="text-sm text-blue-700">Taxa de Localização</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};