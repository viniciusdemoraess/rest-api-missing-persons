import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Upload, X } from 'lucide-react';
import { InformationFormData } from '../../services/api';
import InputMask from 'react-input-mask';

const schema = z.object({
  informacao: z.string().min(10, 'Informação deve ter pelo menos 10 caracteres'),
  descricao: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato correto'),
  files: z.any().optional()
});

interface InformationFormProps {
  onSubmit: (data: InformationFormData) => Promise<void>;
  isLoading: boolean;
  onClose: () => void;
}

export const InformationForm: React.FC<InformationFormProps> = ({
  onSubmit,
  isLoading,
  onClose
}) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<InformationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      data: new Date().toISOString().split('T')[0]
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onFormSubmit = async (data: InformationFormData) => {
    try {
      await onSubmit({
        ...data,
        files: selectedFiles
      });
      
      reset();
      setSelectedFiles([]);
    } catch (error) {
      // Error will be handled by the parent component
      console.error('Erro ao enviar informações:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Adicionar Informações</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data da Visualização *
            </label>
            <input
              type="date"
              {...register('data')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.data && (
              <p className="text-red-600 text-sm mt-1">{errors.data.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informações sobre a visualização *
            </label>
            <textarea
              {...register('informacao')}
              rows={4}
              placeholder="Descreva detalhadamente onde e quando viu a pessoa, como ela estava, com quem estava, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            {errors.informacao && (
              <p className="text-red-600 text-sm mt-1">{errors.informacao.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição das fotos/anexos *
            </label>
            <input
              type="text"
              {...register('descricao')}
              placeholder="Ex: Foto da pessoa no local, documento encontrado, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.descricao && (
              <p className="text-red-600 text-sm mt-1">{errors.descricao.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anexar fotos (opcional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Clique para selecionar fotos</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG até 10MB cada</p>
              </label>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Arquivos selecionados:</p>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4" />
              <span>Enviar Informações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};