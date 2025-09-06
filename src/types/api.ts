export interface PessoaDTO {
  id: number;
  nome: string;
  idade: number;
  sexo: 'MASCULINO' | 'FEMININO';
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: OcorrenciaDTO;
}

export interface OcorrenciaDTO {
  dtDesaparecimento: string;
  dataLocalizacao?: string;
  encontradoVivo?: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
  listaCartaz: OcorrenciaCartazDTO[];
  ocoId: number;
}

export interface OcorrenciaEntrevDesapDTO {
  informacao: string;
  vestimentasDesaparecido: string;
}

export interface OcorrenciaCartazDTO {
  urlCartaz: string;
  tipoCartaz: string;
}

export interface PagePessoaDTO {
  content: PessoaDTO[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  empty: boolean;
}

export interface EstatisticaPessoaDTO {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
}

export interface OcorrenciaInformacaoDTO {
  ocoId: number;
  informacao: string;
  data: string;
  id?: number;
  anexos?: string[];
}

export interface SearchFilters {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: 'MASCULINO' | 'FEMININO' | '';
  status?: 'DESAPARECIDO' | 'LOCALIZADO' | '';
  pagina?: number;
  porPagina?: number;
}

export interface InformationFormData {
  informacao: string;
  descricao: string;
  data: string;
  files: File[];
}