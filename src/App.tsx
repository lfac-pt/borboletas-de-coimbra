import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { SPECIES_FAMILIES } from './constants';
import type { Species, SpeciesEcology, SpeciesDetails } from './constants';
import SpeciesCard from './components/SpeciesCard';
import Filters from './components/Filters';

const App = () => {
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'taxonomy' | 'size' | 'color'>('taxonomy');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commonNamesRes, ecologyRes, detailsRes] = await Promise.all([
          fetch('/data/common-names.json'),
          fetch('/data/species-ecology.json'),
          fetch('/data/species-details.json')
        ]);

        const commonNames: Record<string, string> = await commonNamesRes.json();
        const ecology: Record<string, SpeciesEcology> = await ecologyRes.json();
        const details: Record<string, SpeciesDetails> = await detailsRes.json();

        const combined: Species[] = Object.keys(commonNames).map(key => {
          const latinName = key.trim();
          return {
            latinName,
            commonName: commonNames[key],
            family: SPECIES_FAMILIES[latinName] || 'Desconhecida',
            ecology: ecology[latinName] || ecology[key],
            details: details[latinName] || details[key]
          };
        });

        setSpeciesList(combined);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredSpecies = useMemo(() => {
    let list = speciesList.filter(s => (s.details?.months.length ?? 0) > 0);

    if (selectedMonth) {
      list = list.filter(s => s.details?.months.includes(selectedMonth));
    }

    list.sort((a, b) => {
      if (sortBy === 'taxonomy') {
        return a.family.localeCompare(b.family) || a.latinName.localeCompare(b.latinName);
      }
      if (sortBy === 'size') {
        const sizes = { 'pequena': 1, 'média': 2, 'grande': 3, '': 0 };
        const sizeA = sizes[a.details?.sizeCategory || ''] || 0;
        const sizeB = sizes[b.details?.sizeCategory || ''] || 0;
        return sizeB - sizeA || a.latinName.localeCompare(b.latinName);
      }
      if (sortBy === 'color') {
        return (a.details?.predominantColor || '').localeCompare(b.details?.predominantColor || '') || a.latinName.localeCompare(b.latinName);
      }
      return 0;
    });

    return list;
  }, [speciesList, selectedMonth, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#020917]">
        <div className="animate-pulse text-2xl font-bold text-blue-400">A carregar borboletas...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4 uppercase tracking-tighter">
          Borboletas diurnas de Coimbra
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Explore a diversidade das borboletas mais comuns encontradas no distrito de Coimbra.
        </p>
      </header>

      <Filters
        selectedMonth={selectedMonth}
        selectedSort={sortBy}
        onMonthChange={setSelectedMonth}
        onSortChange={setSortBy}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSpecies.map(species => (
          <SpeciesCard key={species.latinName} species={species} />
        ))}
      </div>

      {filteredSpecies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 italic">Nenhuma espécie encontrada para os filtros selecionados.</p>
        </div>
      )}

      <footer className="mt-20 pt-10 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Borboletas de Coimbra. Dados para fins informativos.</p>
      </footer>
    </div>
  );
};

export default App;
