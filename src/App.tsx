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
          fetch('data/common-names.json'),
          fetch('data/species-ecology.json'),
          fetch('data/species-details.json')
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

  // Derived stats
  const familiesCount = useMemo(() => {
    return new Set(filteredSpecies.map(s => s.family)).size;
  }, [filteredSpecies]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Header */}
      <header className="bg-[#2d6a4f] pt-16 pb-32 px-6 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-white/10 opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full border border-white/10 opacity-10"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6 backdrop-blur-sm border border-white/20">
            <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 20s-2-2-2-5 2-4 2-4 2 1 2 4-2 5-2 5ZM10 13c-3 0-5 1-5 4s2 4 5-1ZM14 13c3 0 5 1 5 4s-2 4-5-1ZM10 13c-3 0-5-2-5-5s2-5 5 1ZM14 13c3 0 5-2 5-5s-2-5-5 1ZM12 7l1-2m-2 2l-1-2" />
            </svg>
          </div>

          <h1 className="serif-title text-5xl md:text-7xl mb-4 font-bold leading-tight uppercase tracking-tight">
            Borboletas Diurnas <br /> <span className="text-white/80 font-normal normal-case">de Coimbra</span>
          </h1>

          <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-light mb-12">
            Guia das espécies existentes no distrito de Coimbra,
            com informações para identificação e distinção entre espécies similares.
          </p>

          <div className="flex justify-center items-end gap-12 text-white">
            <div className="text-center">
              <span className="block text-4xl font-bold">{filteredSpecies.length}</span>
              <span className="text-xs uppercase tracking-widest text-white/50 font-semibold">Espécies</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold">{familiesCount}</span>
              <span className="text-xs uppercase tracking-widest text-white/50 font-semibold">Famílias</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl serif-title italic">Mar–Set</span>
              <span className="text-xs uppercase tracking-widest text-white/50 font-semibold">Época de Voo</span>
            </div>
          </div>
        </div>

        {/* Wavy Divider */}
        <div className="wavy-divider">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 -mt-16 px-6 relative z-20 max-w-7xl mx-auto w-full">
        <Filters
          selectedMonth={selectedMonth}
          selectedSort={sortBy}
          onMonthChange={setSelectedMonth}
          onSortChange={setSortBy}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {filteredSpecies.map(species => (
            <SpeciesCard key={species.latinName} species={species} />
          ))}
        </div>

        {filteredSpecies.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-xl text-gray-400 italic">Nenhuma espécie encontrada para os filtros selecionados.</p>
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-gray-200 text-center text-gray-400 text-sm bg-white">
        <p className="mb-2">&copy; 2026 Luís Cardoso</p>
        <p className="text-gray-300">Guia para fins educativos e científicos.</p>
      </footer>
    </div>
  );
};

export default App;
