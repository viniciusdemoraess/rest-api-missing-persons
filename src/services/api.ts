import { EstatisticaPessoaDTO, OcorrenciaInformacaoDTO, PagePessoaDTO, PessoaDTO, SearchFilters } from "../types/api";

const API_BASE_URL = 'https://abitus-api.geia.vip';

class ApiService {
  private baseURL = API_BASE_URL;

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async searchPeople(filters: SearchFilters): Promise<PagePessoaDTO> {
    const params = new URLSearchParams();
    
    if (filters.nome) params.append('nome', filters.nome);
    if (filters.faixaIdadeInicial) params.append('faixaIdadeInicial', filters.faixaIdadeInicial.toString());
    if (filters.faixaIdadeFinal) params.append('faixaIdadeFinal', filters.faixaIdadeFinal.toString());
    if (filters.sexo) params.append('sexo', filters.sexo);
    if (filters.status) params.append('status', filters.status);
    if (filters.pagina !== undefined) params.append('pagina', filters.pagina.toString());
    if (filters.porPagina) params.append('porPagina', filters.porPagina.toString());

    return this.makeRequest<PagePessoaDTO>(`/v1/pessoas/aberto/filtro?${params}`);
  }

  async getPersonDetails(id: number): Promise<PessoaDTO> {
    return this.makeRequest<PessoaDTO>(`/v1/pessoas/${id}`);
  }

  async getStatistics(): Promise<EstatisticaPessoaDTO> {
    return this.makeRequest<EstatisticaPessoaDTO>('/v1/pessoas/aberto/estatistico');
  }

  async getRandomPeople(registros: number = 12): Promise<PessoaDTO[]> {
    return this.makeRequest<PessoaDTO[]>(`/v1/pessoas/aberto/dinamico?registros=${registros}`);
  }

  async getOccurrenceInformation(ocorrenciaId: number): Promise<OcorrenciaInformacaoDTO[]> {
    return this.makeRequest<OcorrenciaInformacaoDTO[]>(`/v1/ocorrencias/informacoes-desaparecido?ocorrenciaId=${ocorrenciaId}`);
  }

  async addOccurrenceInformation(
    ocoId: number,
    informacao: string,
    descricao: string,
    data: string,
    files: File[]
  ): Promise<OcorrenciaInformacaoDTO> {
    try {
    const formData = new FormData();
    
    for (const file of files) {
      formData.append('files', file);
    }

    const params = new URLSearchParams({
      informacao,
      descricao,
      data,
      ocoId: ocoId.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/v1/ocorrencias/informacoes-desaparecido?${params}`, {
      method: 'POST',
      body: formData,
    });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('API request failed: Tempo limite excedido');
        }
        throw new Error(`API request failed: ${error.message}`);
      }
      throw new Error('API request failed: Erro desconhecido');
    }
  }
}

export const apiService = new ApiService();
export type { SearchFilters, PagePessoaDTO, PessoaDTO, EstatisticaPessoaDTO, OcorrenciaInformacaoDTO, InformationFormData };