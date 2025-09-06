import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'DESAPARECIDO' | 'LOCALIZADO';
  vivo?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  vivo, 
  className = '' 
}) => {
  const isFound = status === 'LOCALIZADO';
  
  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${className}`}>
      {isFound ? (
        <>
          <CheckCircle className="h-4 w-4" data-testid="check-circle" />
          <span className={`${vivo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {vivo ? 'Localizada Viva' : 'Localizada'}
          </span>
        </>
      ) : (
        <>
          <AlertTriangle className="h-4 w-4" data-testid="alert-triangle" />
          <span className="bg-red-100 text-red-800">Desaparecida</span>
        </>
      )}
    </div>
  );
};