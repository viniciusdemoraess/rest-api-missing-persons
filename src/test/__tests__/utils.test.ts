import { describe, it, expect } from 'vitest';

// Utility functions for testing
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('pt-BR');
};

export const calculatePercentage = (part: number, total: number) => {
  return total > 0 ? Math.round((part / total) * 100) : 0;
};

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const result = formatDate('2024-01-15');
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });
  });

  describe('formatDateTime', () => {
    it('should format datetime correctly', () => {
      const result = formatDateTime('2024-01-15T10:30:00Z');
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });
  });

  describe('calculatePercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(calculatePercentage(25, 100)).toBe(25);
      expect(calculatePercentage(1, 3)).toBe(33);
    });

    it('should handle zero total', () => {
      expect(calculatePercentage(5, 0)).toBe(0);
    });

    it('should round to nearest integer', () => {
      expect(calculatePercentage(1, 3)).toBe(33);
      expect(calculatePercentage(2, 3)).toBe(67);
    });
  });
});