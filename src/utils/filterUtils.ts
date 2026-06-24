export const MONTHS_ORDER = [
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
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
export const isNewSpeciesInMonth = (
  speciesMonths: string[] | undefined,
  selectedMonth: string | null,
): boolean => {
  if (!speciesMonths || !selectedMonth) return false;

  if (!speciesMonths.includes(selectedMonth)) return false;

  const currentIndex = MONTHS_ORDER.indexOf(selectedMonth);
  if (currentIndex === -1) return false;

  // If it's the first month (Março), and it flies, it's considered new for the season
  if (currentIndex === 0) return true;

  // Get all months in MONTHS_ORDER prior to the selectedMonth
  const precedingMonths = MONTHS_ORDER.slice(0, currentIndex);

  // It is new if it has not flown in any of the preceding months
  return !precedingMonths.some((month) => speciesMonths.includes(month));
};
