import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Calendar, MapPin, User, Plus, FileText } from 'lucide-react';
import { apiService } from '../services/api';
import { StatusBadge } from '../components/UI/StatusBadge';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { ErrorMessage } from '../components/UI/ErrorMessage';
import { InformationForm } from '../components/Forms/InformationForm';
import { InformationFormData } from '../types/api';

export const PersonDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showInformationForm, setShowInformationForm] = React.useState(false);
  const queryClient = useQueryClient();

  const {
    data: person,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['person', id],
    queryFn: () => apiService.getPersonDetails(Number(id)),
    enabled: !!id,
    retry: 2
  });

  const {
    data: occurrenceInfo,
    isLoading: isInfoLoading
  } = useQuery({
    queryKey: ['occurrenceInfo', person?.ultimaOcorrencia?.ocoId],
    queryFn: () => apiService.getOccurrenceInformation(person!.ultimaOcorrencia.ocoId),
    enabled: !!person?.ultimaOcorrencia?.ocoId,
    retry: 2
  });

  const addInformationMutation = useMutation({
    mutationFn: ({ informacao, descricao, data, files }: InformationFormData) =>
      apiService.addOccurrenceInformation(
        person!.ultimaOcorrencia.ocoId,
        informacao,
        descricao,
        data,
        files
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occurrenceInfo', person?.ultimaOcorrencia?.ocoId] });
      setShowInformationForm(false);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage 
          message="Não foi possível acessar os dados desta pessoa. Verifique sua conexão com a internet e tente novamente."
          onRetry={refetch}
        />
      </div>
    );
  }

  const isFound = person.ultimaOcorrencia?.dataLocalizacao;
  const status = isFound ? 'LOCALIZADO' : 'DESAPARECIDO';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar à busca</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
              <div className="relative">
                <img
                  src={person.urlFoto || '/image-person.jpg' }
                  alt={person.nome}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <StatusBadge status={status} vivo={person.vivo} />
                </div>
              </div>
              
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{person.nome}</h1>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{person.sexo === 'MASCULINO' ? 'Masculino' : 'Feminino'}, {person.idade} anos</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      {isFound 
                        ? `Localizada em ${formatDate(person.ultimaOcorrencia.dataLocalizacao)}`
                        : `Desaparecida em ${formatDateTime(person.ultimaOcorrencia.dtDesaparecimento)}`
                      }
                    </span>
                  </div>
                  
                  {person.ultimaOcorrencia?.localDesaparecimentoConcat && (
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span>{person.ultimaOcorrencia.localDesaparecimentoConcat}</span>
                    </div>
                  )}
                </div>

                {!isFound && (
                  <button
                    onClick={() => setShowInformationForm(true)}
                    className="w-full mt-6 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Adicionar Informações</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Details and Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Occurrence Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalhes da Ocorrência</h2>
              
              {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO && (
                <div className="space-y-4">
                  {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Informações do Desaparecimento</h3>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                      </p>
                    </div>
                  )}
                  
                  {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Vestimentas no Desaparecimento</h3>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {person.ultimaOcorrencia?.listaCartaz && person.ultimaOcorrencia.listaCartaz.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-gray-700 mb-3">Cartazes Oficiais</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {person.ultimaOcorrencia.listaCartaz.map((cartaz, index) => (
                      <a
                        key={index}
                        href={cartaz.urlCartaz}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {cartaz.tipoCartaz.replace('_', ' ').toLowerCase()}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Citizen Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações de Cidadãos</h2>
              
              {isInfoLoading && <LoadingSpinner />}
              
              {occurrenceInfo && occurrenceInfo.length > 0 ? (
                <div className="space-y-4">
                  {occurrenceInfo.map((info, index) => (
                    <div key={info.id || index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">
                          {formatDate(info.data)}
                        </span>
                        {info.anexos && info.anexos.length > 0 && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {info.anexos.length} anexo(s)
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700">{info.informacao}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p>Nenhuma informação adicional foi reportada ainda.</p>
                  {!isFound && (
                    <p className="text-sm mt-2">
                      Seja o primeiro a compartilhar informações sobre esta pessoa.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information Form Modal */}
        {showInformationForm && (
          <InformationForm
            onSubmit={addInformationMutation.mutateAsync}
            isLoading={addInformationMutation.isPending}
            onClose={() => setShowInformationForm(false)}
          />
        )}
      </div>
    </div>
  );
};