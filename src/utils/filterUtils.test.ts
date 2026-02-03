
import { isNewSpeciesInMonth } from './filterUtils';
import { describe, it, expect } from '@rstest/core';

describe('isNewSpeciesInMonth', () => {
    it('should return false if speciesMonths is undefined or selectedMonth is null', () => {
        expect(isNewSpeciesInMonth(undefined, 'Maio')).toBe(false);
        expect(isNewSpeciesInMonth([], null)).toBe(false);
    });

    it('should return false if species does not fly in selected month', () => {
        const months = ['Abril', 'Junho'];
        expect(isNewSpeciesInMonth(months, 'Maio')).toBe(false);
    });

    it('should return true for Março if species flies in Março (season start)', () => {
        const months = ['Março', 'Abril'];
        expect(isNewSpeciesInMonth(months, 'Março')).toBe(true);
    });

    it('should return true if species flies in selected month, but NOT in previous month', () => {
        // Flies in May, not in April.
        const months = ['Maio', 'Junho'];
        expect(isNewSpeciesInMonth(months, 'Maio')).toBe(true);
    });

    it('should return false if species flies in selected month AND in previous month', () => {
        // Flies in April AND May. Not new in May.
        const months = ['Abril', 'Maio', 'Junho'];
        expect(isNewSpeciesInMonth(months, 'Maio')).toBe(false);
    });

    it('should handle non-contiguous periods correctly', () => {
        // Flies in March, stops in April, flies again in May.
        // Should be new in March AND new in May.
        const months = ['Março', 'Maio'];

        expect(isNewSpeciesInMonth(months, 'Março')).toBe(true);
        expect(isNewSpeciesInMonth(months, 'Abril')).toBe(false); // Doesn't fly
        expect(isNewSpeciesInMonth(months, 'Maio')).toBe(true); // New appearing
    });

    it('should return false for invalid months', () => {
        const months = ['Março'];
        expect(isNewSpeciesInMonth(months, 'InvalidMonth')).toBe(false);
    });
});
