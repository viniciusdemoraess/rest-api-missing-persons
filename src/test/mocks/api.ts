import { PessoaDTO, PagePessoaDTO, EstatisticaPessoaDTO, OcorrenciaInformacaoDTO } from '../../types/api';

export const mockPerson: PessoaDTO = {
  id: 1,
  nome: "João da Silva",
  idade: 35,
  sexo: "MASCULINO",
  vivo: true,
  urlFoto: "https://example.com/photo.jpg",
  ultimaOcorrencia: {
    dtDesaparecimento: "2024-01-15T10:30:00Z",
    dataLocalizacao: undefined,
    encontradoVivo: undefined,
    localDesaparecimentoConcat: "Centro, Cuiabá - MT",
    ocorrenciaEntrevDesapDTO: {
      informacao: "Pessoa foi vista pela última vez no centro da cidade",
      vestimentasDesaparecido: "Camisa azul e calça jeans"
    },
    listaCartaz: [
      {
        urlCartaz: "https://example.com/cartaz.pdf",
        tipoCartaz: "PDF_DESAPARECIDO"
      }
    ],
    ocoId: 123
  }
};

export const mockFoundPerson: PessoaDTO = {
  ...mockPerson,
  id: 2,
  nome: "Maria Santos",
  sexo: "FEMININO",
  ultimaOcorrencia: {
    ...mockPerson.ultimaOcorrencia,
    dataLocalizacao: "2024-01-20",
    encontradoVivo: true,
    ocoId: 124
  }
};

export const mockPageResponse: PagePessoaDTO = {
  content: [mockPerson, mockFoundPerson],
  totalPages: 5,
  totalElements: 50,
  numberOfElements: 2,
  first: true,
  last: false,
  size: 10,
  number: 0,
  empty: false
};

export const mockStatistics: EstatisticaPessoaDTO = {
  quantPessoasDesaparecidas: 150,
  quantPessoasEncontradas: 75
};

export const mockOccurrenceInfo: OcorrenciaInformacaoDTO[] = [
  {
    ocoId: 123,
    informacao: "Pessoa foi vista no shopping",
    data: "2024-01-16",
    id: 1,
    anexos: ["foto1.jpg"]
  }
];