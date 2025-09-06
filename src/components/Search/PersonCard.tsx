import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, User } from 'lucide-react';
import { PessoaDTO } from '../../services/api';
import { StatusBadge } from '../UI/StatusBadge';

interface PersonCardProps {
  person: PessoaDTO;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const isFound = person.ultimaOcorrencia?.dataLocalizacao;
  const status = isFound ? 'LOCALIZADO' : 'DESAPARECIDO';
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Link to={`/person/${person.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative">
          <img
            src={person.urlFoto || '/image-person.jpg'}
            alt={person.nome}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3">
            <StatusBadge status={status} vivo={person.vivo} />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{person.nome}</h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{person.sexo === 'MASCULINO' ? 'Masculino' : 'Feminino'}, {person.idade} anos</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>
                {isFound 
                  ? `Localizada em ${formatDate(person.ultimaOcorrencia.dataLocalizacao)}`
                  : `Desaparecida em ${formatDate(person.ultimaOcorrencia.dtDesaparecimento)}`
                }
              </span>
            </div>
            
            {person.ultimaOcorrencia?.localDesaparecimentoConcat && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{person.ultimaOcorrencia.localDesaparecimentoConcat}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};