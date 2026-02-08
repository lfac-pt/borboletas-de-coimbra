import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { SPECIES_FAMILIES, endangered_eu, endangered_pt, HABITAT_TRANSLATIONS } from './constants';
import { HABITAT_TYPE_SPRITES } from './utils/habitatTypeIcons';
import type { Species, SpeciesEcology, SpeciesDetails } from './constants';
import SpeciesCard from './components/SpeciesCard';
import Filters from './components/Filters';
import SpeciesModal from './components/SpeciesModal';
import { isNewSpeciesInMonth } from './utils/filterUtils';

const App = () => {
  // State initialization from URL
  const getUrlParam = (key: string) => new URLSearchParams(window.location.search).get(key);
  const getArrayFromUrl = (key: string): string[] => {
    const param = getUrlParam(key);
    return param ? param.split(',') : [];
  };

  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(getUrlParam('month'));

  const initialSort = getUrlParam('sort');
  const [sortBy, setSortBy] = useState<'taxonomy' | 'size' | 'rarity'>(
    (initialSort === 'taxonomy' || initialSort === 'size' || initialSort === 'rarity') ? initialSort : 'taxonomy'
  );

  const initialOrder = getUrlParam('order');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    (initialOrder === 'asc' || initialOrder === 'desc') ? initialOrder : 'asc'
  );

  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  // Advanced filters (Multi-select)
  const [selectedSize, setSelectedSize] = useState<string | null>(getUrlParam('size'));
  const [selectedColors, setSelectedColors] = useState<string[]>(getArrayFromUrl('color'));
  const [selectedHabitats, setSelectedHabitats] = useState<string[]>(getArrayFromUrl('habitat'));
  const [selectedHostFamilies, setSelectedHostFamilies] = useState<string[]>(getArrayFromUrl('plant'));
  const [onlyEndangered, setOnlyEndangered] = useState(getUrlParam('endangered') === 'true');
  const [onlyNewSpecies, setOnlyNewSpecies] = useState(getUrlParam('new') === 'true');
  const [selectedRarities, setSelectedRarities] = useState<string[]>(getArrayFromUrl('rarity'));

  // Sync state to URL
  useEffect(() => {
    if (loading) return; // DON'T sync URL while loading, or it might wipe out deep links

    const params = new URLSearchParams();
    if (selectedMonth) params.set('month', selectedMonth);
    if (sortBy !== 'taxonomy') params.set('sort', sortBy);
    if (sortOrder !== 'asc') params.set('order', sortOrder);
    if (selectedSize) params.set('size', selectedSize);
    if (selectedColors.length > 0) params.set('color', selectedColors.join(','));
    if (selectedHabitats.length > 0) params.set('habitat', selectedHabitats.join(','));
    if (selectedHostFamilies.length > 0) params.set('plant', selectedHostFamilies.join(','));
    if (onlyEndangered) params.set('endangered', 'true');
    if (onlyNewSpecies && selectedMonth) params.set('new', 'true');
    if (selectedRarities.length > 0) params.set('rarity', selectedRarities.join(','));
    if (selectedSpecies) params.set('species', selectedSpecies.latinName);

    const newRelativePathQuery = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState(null, '', newRelativePathQuery);
  }, [selectedMonth, sortBy, sortOrder, selectedSize, selectedColors, selectedHabitats, selectedHostFamilies, onlyEndangered, onlyNewSpecies, selectedRarities, selectedSpecies, loading]);

  // Handle Initial Species Popstate
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const speciesParam = params.get('species');
      if (speciesParam) {
        const decodedParam = decodeURIComponent(speciesParam.replace(/\+/g, ' '));
        const found = speciesList.find(s =>
          s.latinName.toLowerCase() === speciesParam.toLowerCase() ||
          s.latinName.toLowerCase() === decodedParam.toLowerCase()
        );
        if (found) setSelectedSpecies(found);
      } else {
        setSelectedSpecies(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [speciesList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commonNamesRes, ecologyRes, detailsRes, attributionsRes] = await Promise.all([
          fetch('data/common-names.json'),
          fetch('data/species-ecology.json'),
          fetch('data/species-details.json'),
          fetch('data/attributions.json')
        ]);

        const commonNames: Record<string, string> = await commonNamesRes.json();
        const ecology: Record<string, SpeciesEcology> = await ecologyRes.json();
        const details: Record<string, SpeciesDetails> = await detailsRes.json();
        const attributions: Record<string, string> = await attributionsRes.json();

        const combined: Species[] = Object.keys(commonNames).map(key => {
          const latinName = key.trim();
          const family = SPECIES_FAMILIES[latinName] || 'Desconhecida';
          const formattedName = latinName.replace(/\//g, '_');
          const imageKey = `${family}/${formattedName}.jpg`;

          return {
            latinName,
            commonName: commonNames[key],
            family,
            ecology: ecology[latinName] || ecology[key],
            details: details[latinName] || details[key],
            attribution: attributions[imageKey]
          };
        });

        setSpeciesList(combined);

        // Check for deep link on initial load
        const initialSpeciesParam = new URLSearchParams(window.location.search).get('species');
        if (initialSpeciesParam) {
          const decodedParam = decodeURIComponent(initialSpeciesParam.replace(/\+/g, ' '));
          const found = combined.find(s =>
            s.latinName.toLowerCase() === initialSpeciesParam.toLowerCase() ||
            s.latinName.toLowerCase() === decodedParam.toLowerCase()
          );
          if (found) setSelectedSpecies(found);
        }

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

    if (selectedSize) {
      list = list.filter(s => s.details?.sizeCategory === selectedSize);
    }

    if (selectedColors.length > 0) {
      list = list.filter(s => {
        if (!s.details?.predominantColor) return false;
        const speciesColors = Array.isArray(s.details.predominantColor)
          ? s.details.predominantColor
          : [s.details.predominantColor];
        // Check if ANY of the selected colors match any of the species colors
        return selectedColors.some(selectedColor => speciesColors.includes(selectedColor));
      });
    }

    if (selectedHabitats.length > 0) {
      list = list.filter(s => {
        const habitatTypeTrans = s.ecology?.habitatType ? (HABITAT_TRANSLATIONS[s.ecology.habitatType] || s.ecology.habitatType) : (HABITAT_TRANSLATIONS['Generalist'] || 'Generalista');
        return selectedHabitats.includes(habitatTypeTrans);
      });
    }

    if (selectedHostFamilies.length > 0) {
      list = list.filter(s => {
        if (!s.ecology?.hostPlantFamilies) return false;
        return selectedHostFamilies.some(family => s.ecology!.hostPlantFamilies.includes(family));
      });
    }

    if (onlyEndangered) {
      list = list.filter(s => endangered_pt[s.latinName] || endangered_eu[s.latinName]);
    }

    if (selectedRarities.length > 0) {
      list = list.filter(s => s.details?.rarity && selectedRarities.includes(s.details.rarity));
    }

    if (onlyNewSpecies && selectedMonth) {
      list = list.filter(s => isNewSpeciesInMonth(s.details?.months, selectedMonth));
    }

    list.sort((a, b) => {
      let result = 0;
      if (sortBy === 'taxonomy') {
        const familyOrder: Record<string, number> = {
          'Hesperiidae': 1,
          'Papilionidae': 2,
          'Pieridae': 3,
          'Nymphalidae': 4,
          'Lycaenidae': 5
        };
        const orderA = familyOrder[a.family] || 99;
        const orderB = familyOrder[b.family] || 99;
        result = (orderA - orderB) || a.latinName.localeCompare(b.latinName);
      } else if (sortBy === 'size') {
        const sizes: Record<string, number> = { 'small': 1, 'medium': 2, 'large': 3, '': 0 };
        const sizeA = sizes[a.details?.sizeCategory || ''] || 0;
        const sizeB = sizes[b.details?.sizeCategory || ''] || 0;
        // Size is naturally descending (large to small) in the original code, 
        // but we'll normalize it to respect sortOrder
        result = sizeA - sizeB || a.latinName.localeCompare(b.latinName);
      } else if (sortBy === 'rarity') {
        const rarities: Record<string, number> = { 'very-common': 1, 'common': 2, 'uncommon': 3, 'rare': 4 };
        const rarityA = rarities[a.details?.rarity || ''] || 0;
        const rarityB = rarities[b.details?.rarity || ''] || 0;
        result = rarityA - rarityB || a.latinName.localeCompare(b.latinName);
      }

      return sortOrder === 'asc' ? result : -result;
    });

    return list;
  }, [speciesList, selectedMonth, sortBy, sortOrder, selectedSize, selectedColors, selectedHabitats, selectedHostFamilies, onlyEndangered, selectedRarities, onlyNewSpecies]);

  // Use this function to change species so we push to history
  const handleSetSelectedSpecies = (species: Species | null) => {
    setSelectedSpecies(species);

    // We construct the next URL manually here to push to history.
    // The useEffect above will also run, but 'replaceState' on the same URL is harmless.
    const params = new URLSearchParams(window.location.search);
    if (species) {
      params.set('species', species.latinName);
    } else {
      params.delete('species');
    }
    const newRelativePathQuery = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.pushState(null, '', newRelativePathQuery);
  };

  const handleNextSpecies = () => {
    if (!selectedSpecies) return;
    const currentIndex = filteredSpecies.findIndex(s => s.latinName === selectedSpecies.latinName);
    if (currentIndex !== -1 && currentIndex < filteredSpecies.length - 1) {
      handleSetSelectedSpecies(filteredSpecies[currentIndex + 1]);
    }
  };

  const handlePrevSpecies = () => {
    if (!selectedSpecies) return;
    const currentIndex = filteredSpecies.findIndex(s => s.latinName === selectedSpecies.latinName);
    if (currentIndex > 0) {
      handleSetSelectedSpecies(filteredSpecies[currentIndex - 1]);
    }
  };

  const selectedSpeciesIndex = selectedSpecies ? filteredSpecies.findIndex(s => s.latinName === selectedSpecies.latinName) : -1;

  const filterOptions = useMemo(() => {
    const colors = new Set<string>();
    const hostFamilies = new Set<string>();

    speciesList.forEach(s => {
      if (s.details?.predominantColor) {
        if (Array.isArray(s.details.predominantColor)) {
          s.details.predominantColor.forEach(c => c && colors.add(c));
        } else {
          colors.add(s.details.predominantColor);
        }
      }
      s.ecology?.hostPlantFamilies.forEach(f => hostFamilies.add(f));
    });

    const mainHabitats = Object.keys(HABITAT_TYPE_SPRITES).map(h => HABITAT_TRANSLATIONS[h] || h);

    return {
      colors: Array.from(colors).filter(Boolean).sort() as string[],
      habitats: Array.from(new Set(mainHabitats)).sort() as string[],
      hostFamilies: Array.from(hostFamilies).filter(Boolean).sort() as string[]
    };
  }, [speciesList]);

  // Derived stats
  const familiesCount = useMemo(() => {
    return new Set(filteredSpecies.map(s => s.family)).size;
  }, [filteredSpecies]);

  const monthCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const allMonths = ['Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'];
    allMonths.forEach(m => counts[m] = 0);

    speciesList.forEach(s => {
      if (onlyNewSpecies) {
        allMonths.forEach(m => {
          if (isNewSpeciesInMonth(s.details?.months, m)) {
            counts[m]++;
          }
        });
      } else {
        s.details?.months.forEach(m => {
          if (counts[m] !== undefined) {
            counts[m]++;
          }
        });
      }
    });
    return counts;
  }, [speciesList, onlyNewSpecies]);

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
      <header className="bg-[#2d6a4f] pt-4 pb-26 px-6 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-white/10 opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full border border-white/10 opacity-10"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <img src="logo.webp" alt="Logo" className="w-32 h-32 object-contain mx-auto" />

          <h1 className="serif-title text-5xl md:text-7xl mb-4 font-bold leading-tight uppercase tracking-tight">
            Borboletas Diurnas <br /> <span className="text-white/80 font-normal normal-case">de Coimbra</span>
          </h1>

          <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-light mb-12">
            Guia para contadores de borboletas diurnas no distrito de Coimbra.
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
          sortOrder={sortOrder}
          onMonthChange={setSelectedMonth}
          onSortChange={setSortBy}
          onOrderChange={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          monthCounts={monthCounts}
          totalCount={speciesList.filter(s => (s.details?.months.length ?? 0) > 0).length}
          // Advanced filter props
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedHabitats={selectedHabitats}
          setSelectedHabitats={setSelectedHabitats}
          selectedHostFamilies={selectedHostFamilies}
          setSelectedHostFamilies={setSelectedHostFamilies}
          onlyEndangered={onlyEndangered}
          setOnlyEndangered={setOnlyEndangered}
          onlyNewSpecies={onlyNewSpecies}
          setOnlyNewSpecies={setOnlyNewSpecies}
          selectedRarities={selectedRarities}
          setSelectedRarities={setSelectedRarities}
          filterOptions={filterOptions}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {loading ? (
            <div className="col-span-full h-64 flex flex-col items-center justify-center text-gray-400 gap-4">
              <div className="w-8 h-8 border-2 border-forest-green/30 border-t-forest-green rounded-full animate-spin"></div>
              <p className="animate-pulse">A carregar espécies...</p>
            </div>
          ) : filteredSpecies.length === 0 ? (
            <div className="col-span-full h-64 flex flex-col items-center justify-center text-gray-400 gap-4 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
              <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Nenhuma espécie encontrada com os filtros selecionados.</p>
              <button
                onClick={() => {
                  setSelectedMonth(null);
                  setSelectedSize(null);
                  setSelectedColors([]);
                  setSelectedHabitats([]);
                  setSelectedHostFamilies([]);
                  setSelectedRarities([]);
                  setOnlyEndangered(false);
                  setOnlyNewSpecies(false);
                }}
                className="text-forest-green hover:underline text-sm font-medium"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : (
            filteredSpecies.map(species => (
              <SpeciesCard
                key={species.latinName}
                species={species}
                onExpand={() => handleSetSelectedSpecies(species)}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1b2621] text-white py-12 md:py-20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="serif-title text-2xl md:text-3xl italic">Borboletas de Coimbra</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Um guia digital dedicado à identificação e preservação da biodiversidade de lepidópteros na região de Coimbra.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-gray-600 text-[9px]">Fontes de Dados:</span>
              <div className="flex gap-4">
                <a href="https://www.biodiversity4all.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Biodiversity4All</a>
                <a href="http://www.naturdata.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Naturdata</a>
                <a href="https://www.pyrgus.de/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Pyrgus.de</a>
                <a href="https://www.eurobutterflies.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">EuroButterflies</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} <a href="https://www.instagram.com/lfac_pt/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Luís Cardoso</a>. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Species Detail Modal */}
      {selectedSpecies && (
        <SpeciesModal
          species={selectedSpecies}
          onClose={() => handleSetSelectedSpecies(null)}
          hasNext={selectedSpeciesIndex !== -1 && selectedSpeciesIndex < filteredSpecies.length - 1}
          hasPrev={selectedSpeciesIndex > 0}
          onNext={handleNextSpecies}
          onPrev={handlePrevSpecies}
          allSpecies={speciesList}
          onSelectSpecies={handleSetSelectedSpecies}
        />
      )}
    </div>
  );
};

export default App;
