import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiService } from '../api';
import { mockPageResponse, mockPerson, mockStatistics, mockOccurrenceInfo } from '../../test/mocks/api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ApiService', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('searchPeople', () => {
    it('should search people with filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPageResponse,
      });

      const filters = {
        nome: 'João',
        sexo: 'MASCULINO' as const,
        pagina: 0,
        porPagina: 10
      };

      const result = await apiService.searchPeople(filters);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/pessoas/aberto/filtro'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
      expect(result).toEqual(mockPageResponse);
    });

    it('should handle empty filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPageResponse,
      });

      const result = await apiService.searchPeople({});
      expect(result).toEqual(mockPageResponse);
    });
  });

  describe('getPersonDetails', () => {
    it('should fetch person details by id', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPerson,
      });

      const result = await apiService.getPersonDetails(1);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://abitus-api.geia.vip/v1/pessoas/1',
        expect.any(Object)
      );
      expect(result).toEqual(mockPerson);
    });
  });

  describe('getStatistics', () => {
    it('should fetch statistics', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStatistics,
      });

      const result = await apiService.getStatistics();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://abitus-api.geia.vip/v1/pessoas/aberto/estatistico',
        expect.any(Object)
      );
      expect(result).toEqual(mockStatistics);
    });
  });

  describe('getOccurrenceInformation', () => {
    it('should fetch occurrence information', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockOccurrenceInfo,
      });

      const result = await apiService.getOccurrenceInformation(123);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/ocorrencias/informacoes-desaparecido'),
        expect.any(Object)
      );
      expect(result).toEqual(mockOccurrenceInfo);
    });
  });

  describe('error handling', () => {
    it('should throw error when response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(apiService.getPersonDetails(999)).rejects.toThrow('HTTP error! status: 404');
    });

    it('should throw error when fetch fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(apiService.getPersonDetails(1)).rejects.toThrow('Network error');
    });
  });
});