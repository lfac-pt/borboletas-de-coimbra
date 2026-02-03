
export const MONTHS_ORDER = [
    'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'
];

/**
 * Checks if a species is "new" in the selected month.
 * A species is considered new if it flies in the selected month
 * AND does NOT fly in the immediately preceding month.
 * 
 * @param speciesMonths List of months the species flies in
 * @param selectedMonth The month to check
 * @returns true if the species is new in the selected month
 */
export const isNewSpeciesInMonth = (speciesMonths: string[] | undefined, selectedMonth: string | null): boolean => {
    if (!speciesMonths || !selectedMonth) return false;

    if (!speciesMonths.includes(selectedMonth)) return false;

    const currentIndex = MONTHS_ORDER.indexOf(selectedMonth);
    if (currentIndex === -1) return false;

    // If it's the first month (Março), and it flies, it's considered new for the season
    if (currentIndex === 0) return true;

    const previousMonth = MONTHS_ORDER[currentIndex - 1];

    // It is new if it DOES NOT fly in the previous month
    return !speciesMonths.includes(previousMonth);
};
