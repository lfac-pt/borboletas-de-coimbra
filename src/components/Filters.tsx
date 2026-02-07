import { useState } from 'react';
import MultiSelect from './ui/MultiSelect';

interface FiltersProps {
    onMonthChange: (month: string | null) => void;
    onSortChange: (sort: 'taxonomy' | 'size' | 'rarity') => void;
    onOrderChange: () => void;
    selectedMonth: string | null;
    selectedSort: string;
    sortOrder: 'asc' | 'desc';
    monthCounts: Record<string, number>;
    totalCount: number;

    // Advanced filters
    selectedSize: string | null;
    setSelectedSize: (size: string | null) => void;
    selectedColors: string[];
    setSelectedColors: (colors: string[]) => void;
    selectedHabitats: string[];
    setSelectedHabitats: (habitats: string[]) => void;
    selectedHostFamilies: string[];
    setSelectedHostFamilies: (families: string[]) => void;
    onlyEndangered: boolean;
    setOnlyEndangered: (val: boolean) => void;
    onlyNewSpecies: boolean;
    setOnlyNewSpecies: (val: boolean) => void;
    selectedRarities: string[];
    setSelectedRarities: (rarities: string[]) => void;
    filterOptions: {
        colors: string[];
        habitats: string[];
        hostFamilies: string[];
    };
}

const MONTHS = [
    'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'
];

const MONTH_ABBREVIATIONS: Record<string, string> = {
    'Março': 'Mar',
    'Abril': 'Abr',
    'Maio': 'Mai',
    'Junho': 'Jun',
    'Julho': 'Jul',
    'Agosto': 'Ago',
    'Setembro': 'Set'
};

const Filters = ({
    onMonthChange,
    onSortChange,
    onOrderChange,
    selectedMonth,
    selectedSort,
    sortOrder,
    monthCounts,
    totalCount,
    selectedSize,
    setSelectedSize,
    selectedColors,
    setSelectedColors,
    selectedHabitats,
    setSelectedHabitats,
    selectedHostFamilies,
    setSelectedHostFamilies,
    onlyEndangered,
    setOnlyEndangered,
    onlyNewSpecies,
    setOnlyNewSpecies,
    selectedRarities,
    setSelectedRarities,
    filterOptions
}: FiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const hasActiveAdvancedFilters = selectedSize ||
        selectedColors.length > 0 ||
        selectedHabitats.length > 0 ||
        selectedHostFamilies.length > 0 ||
        onlyEndangered ||
        (onlyNewSpecies && selectedMonth) ||
        selectedRarities.length > 0;

    const clearAllFilters = () => {
        onMonthChange(null);
        setSelectedSize(null);
        setSelectedColors([]);
        setSelectedHabitats([]);
        setSelectedHostFamilies([]);
        setSelectedRarities([]);
        setOnlyEndangered(false);
        setOnlyNewSpecies(false);
    };

    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                    <div className="text-forest-green hidden md:block">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => onMonthChange(null)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedMonth === null
                                ? 'bg-[#2d6a4f] text-white shadow-md'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Todos <span className={`ml-1 opacity-60 font-normal`}>({totalCount})</span>
                        </button>
                        {MONTHS.map(month => (
                            <button
                                key={month}
                                onClick={() => onMonthChange(month)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedMonth === month
                                    ? 'bg-[#2d6a4f] text-white shadow-md'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {MONTH_ABBREVIATIONS[month]} <span className={`ml-1 opacity-60 font-normal`}>({monthCounts[month] || 0})</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="flex items-center gap-1 w-full md:w-auto">
                        <select
                            value={selectedSort}
                            onChange={(e) => onSortChange(e.target.value as 'taxonomy' | 'size' | 'rarity')}
                            className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2d6a4f] w-full md:w-48 cursor-pointer"
                        >
                            <option value="taxonomy">Taxonomia</option>
                            <option value="size">Tamanho</option>
                            <option value="rarity">Raridade</option>
                        </select>

                        <button
                            onClick={onOrderChange}
                            title={sortOrder === 'asc' ? 'Ordem Ascendente' : 'Ordem Descendente'}
                            className="p-2 bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:ring-2 focus:ring-[#2d6a4f] shrink-0"
                        >
                            <svg
                                className={`w-6 h-6 transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                            </svg>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`p-2 rounded-lg transition-colors border relative ${isExpanded || hasActiveAdvancedFilters
                            ? 'bg-[#2d6a4f]/10 border-[#2d6a4f]/20 text-forest-green'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        title="Mais Filtros"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        {!isExpanded && hasActiveAdvancedFilters && (
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#2d6a4f] rounded-full border-2 border-white"></span>
                        )}
                    </button>
                </div>
            </div>

            {/* Advanced Filters Panel */}
            {isExpanded && (
                <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Size Filter */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Tamanho</label>
                        <div className="flex gap-1">
                            {['small', 'medium', 'large'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                                    className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all border ${selectedSize === size
                                        ? 'bg-[#2d6a4f] text-white border-[#2d6a4f] shadow-sm'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-[#2d6a4f]/50'
                                        }`}
                                >
                                    {size === 'small' ? 'Pequena' : size === 'medium' ? 'Média' : 'Grande'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Filter */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Cor</label>
                        <MultiSelect
                            label="Cores"
                            options={filterOptions.colors}
                            selected={selectedColors}
                            onChange={setSelectedColors}
                        />
                    </div>

                    {/* Habitat Filter */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Habitat</label>
                        <MultiSelect
                            label="Habitats"
                            options={filterOptions.habitats}
                            selected={selectedHabitats}
                            onChange={setSelectedHabitats}
                        />
                    </div>

                    {/* Host Plant Family Filter */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Família da Planta</label>
                        <MultiSelect
                            label="Famílias"
                            options={filterOptions.hostFamilies}
                            selected={selectedHostFamilies}
                            onChange={setSelectedHostFamilies}
                        />
                    </div>

                    {/* Rarity Filter */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Raridade</label>
                        <MultiSelect
                            label="Raridade"
                            options={['very-common', 'common', 'uncommon', 'rare']}
                            selected={selectedRarities}
                            onChange={setSelectedRarities}
                            valueLabelMap={{
                                'very-common': 'Muito Comum',
                                'common': 'Comum',
                                'uncommon': 'Pouco Comum',
                                'rare': 'Rara'
                            }}
                        />
                    </div>

                    {/* Bottom Row: Endangered & New Species Toggles & Clear Button */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col md:flex-row items-start md:items-center justify-between mt-2 gap-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <label className="relative inline-flex items-start cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={onlyEndangered}
                                    onChange={(e) => setOnlyEndangered(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2d6a4f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2d6a4f]"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-forest-green transition-colors mt-0.5">Apenas Espécies Ameaçadas</span>
                            </label>

                            <label className={`relative inline-flex items-start group ${!selectedMonth ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                                <input
                                    type="checkbox"
                                    checked={onlyNewSpecies}
                                    onChange={(e) => setOnlyNewSpecies(e.target.checked)}
                                    disabled={!selectedMonth}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2d6a4f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2d6a4f]"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-forest-green transition-colors mt-0.5">
                                    Novas Espécies do Mês
                                    {!selectedMonth && <span className="text-[10px] block font-normal text-gray-400 normal-case">Selecione um mês primeiro</span>}
                                </span>
                            </label>
                        </div>

                        <button
                            onClick={clearAllFilters}
                            className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Limpar Filtros
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filters;
