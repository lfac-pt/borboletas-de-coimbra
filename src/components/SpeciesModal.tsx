import { useRef, useEffect, useState } from 'react';
import type { Species } from '../constants';
import { getPlantFamilySpritePosition, getPlantFamilyCommonName } from '../utils/plantFamilyIcons';
import { getHabitatSpritePosition } from '../utils/habitatTypeIcons';
import { getSizeSpritePosition } from '../utils/sizeTypeIcons';
import { endangered_pt, endangered_eu } from '../constants';

interface SpeciesModalProps {
    species: Species;
    onClose: () => void;
    hasNext: boolean;
    hasPrev: boolean;
    onNext: () => void;
    onPrev: () => void;
    allSpecies: Species[];
    onSelectSpecies: (species: Species) => void;
}

const SpeciesModal = ({ species, onClose, hasNext, hasPrev, onNext, onPrev, allSpecies, onSelectSpecies }: SpeciesModalProps) => {
    const [imgError, setImgError] = useState(false);
    const [prevLatinName, setPrevLatinName] = useState(species.latinName);
    const modalRef = useRef<HTMLDivElement>(null);

    // Reset image error state when species changes
    if (species.latinName !== prevLatinName) {
        setPrevLatinName(species.latinName);
        setImgError(false);
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && hasNext) onNext();
            if (e.key === 'ArrowLeft' && hasPrev) onPrev();
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden'; // Lock scroll
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset'; // Unlock scroll
        };
    }, [onClose, hasNext, hasPrev, onNext, onPrev]);

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const getImagePath = (latinName: string, family: string) => {
        const formattedName = latinName.replace(/\//g, '_');
        return `imgs/sp/${family}/${formattedName}.webp`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CR': return 'bg-red-100 text-red-700 border-red-200';
            case 'EN': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'VU': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'NT': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getColorClass = (color: string) => {
        switch (color) {
            case 'Branco': return 'bg-white border-gray-200';
            case 'Preto': return 'bg-gray-900';
            case 'Castanho': return 'bg-[#8B4513]';
            case 'Laranja': return 'bg-orange-500';
            case 'Amarelo': return 'bg-yellow-400';
            case 'Azul': return 'bg-blue-500';
            case 'Verde': return 'bg-green-600';
            case 'Vermelho': return 'bg-red-600';
            case 'Cinzento': return 'bg-gray-400';
            default: return 'bg-gray-200';
        }
    };

    const getRarityConfig = (rarity: string) => {
        switch (rarity) {
            case 'very-common': return { label: 'Muito Comum', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
            case 'common': return { label: 'Comum', className: 'bg-green-100 text-green-800 border-green-200' };
            case 'uncommon': return { label: 'Pouco Comum', className: 'bg-amber-100 text-amber-800 border-amber-200' };
            case 'rare': return { label: 'Rara', className: 'bg-rose-100 text-rose-800 border-rose-200' };
            default: return { label: 'Desconhecido', className: 'bg-gray-100 text-gray-800 border-gray-200' };
        }
    };

    const statusPT = endangered_pt[species.latinName as keyof typeof endangered_pt];
    const statusEU = endangered_eu[species.latinName as keyof typeof endangered_eu];
    const habitatPos = species.ecology?.habitatType ? getHabitatSpritePosition(species.ecology.habitatType) : getHabitatSpritePosition('Generalist');

    const sizePos = species.details?.sizeCategory ? getSizeSpritePosition(species.details.sizeCategory) : null;

    const similarSpeciesList = species.details?.similarSpecies?.map(sim => {
        const found = allSpecies.find(s => s.latinName === sim.name);
        return found ? { ...found, distinction: sim.distinction } : null;
    }).filter(Boolean) as (Species & { distinction?: string })[];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleBackdropClick}>
            <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-[94vw] max-h-[94vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">

                <div className="flex flex-col md:flex-row min-h-full items-stretch">
                    {/* Image Section - Large and Prominent */}
                    <div className="w-full md:w-1/2 bg-gray-100 relative group flex-shrink-0">
                        {!imgError ? (
                            <img
                                src={getImagePath(species.latinName, species.family)}
                                alt={species.latinName}
                                className="w-full h-auto block object-contain"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="w-full aspect-square flex flex-col items-center justify-center text-gray-400 bg-gray-50 border-r border-gray-100">
                                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-medium">Imagem indisponível</span>
                            </div>
                        )}

                        {species.attribution && !imgError && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-md text-xs text-white/90 font-medium tracking-wide z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                © {species.attribution}
                            </div>
                        )}

                        {/* Close Button Mobile (Absolute) */}
                        <button
                            onClick={onClose}
                            className="md:hidden absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Left Arrow (Desktop inside image area or overlay) */}
                        {hasPrev && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                                className="absolute left-4 bottom-4 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all hidden md:flex"
                                title="Espécie anterior"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}

                        {/* Right Arrow (Desktop inside image area or overlay) */}
                        {hasNext && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onNext(); }}
                                className="absolute right-4 bottom-4 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all hidden md:flex"
                                title="Próxima espécie"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col relative">
                        {/* Close Button Desktop */}
                        <button
                            onClick={onClose}
                            className="hidden md:block absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="mb-5 pr-8">
                            <h2 className="serif-title text-3xl md:text-4xl text-gray-900 italic mb-2">
                                {species.latinName}
                            </h2>
                            <h3 className="text-xl text-gray-500 font-medium">
                                {species.commonName}
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
                                {species.family}
                            </span>
                            {species.details?.rarity && (() => {
                                const config = getRarityConfig(species.details.rarity);
                                return (
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold border ${config.className}`}
                                        title="Dados baseados em biodiversity4all.org e na experiência de campo do autor"
                                    >
                                        {config.label}
                                    </span>
                                );
                            })()}
                            {statusPT && (
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(statusPT)}`}>
                                    PT: {statusPT}
                                </span>
                            )}
                            {statusEU && (
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(statusEU)}`}>
                                    EU: {statusEU}
                                </span>
                            )}
                        </div>

                        {/* Icons Row */}
                        <div className="flex flex-wrap gap-4 mb-4">
                            {/* Habitat Icon */}
                            <div
                                className="w-[88px] h-[88px] shrink-0 rounded-lg overflow-hidden bg-gray-100 transition-all duration-300 relative group/icon"
                                title={`Habitat: ${species.ecology?.habitatType || 'Inconhecido'}`}
                            >
                                <div
                                    className="w-[88px] h-[88px] shrink-0 rounded-lg"
                                    style={{
                                        backgroundImage: 'url("imgs/habitats.webp")',
                                        backgroundPosition: `${habitatPos.x}px ${habitatPos.y}px`,
                                        backgroundSize: '352px 192px',
                                    }}
                                />
                            </div>

                            {/* Size Icon */}
                            <div
                                className="w-[88px] h-[88px] shrink-0 rounded-lg overflow-hidden bg-gray-100 transition-all duration-300 relative group/icon"
                                title={`Porte: ${species.details?.sizeCategory || 'N/A'}`}
                            >
                                {sizePos ? (
                                    <div
                                        className="w-[88px] h-[88px] shrink-0 rounded-lg"
                                        style={{
                                            backgroundImage: 'url("imgs/sizes.webp")',
                                            backgroundPosition: `${sizePos.x}px ${sizePos.y}px`,
                                            backgroundSize: '352px 192px',
                                        }}
                                    />
                                ) : (
                                    <svg className="w-8 h-8 text-green-700/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                )}
                            </div>

                            {/* Plant Icons */}
                            {(() => {
                                const families = species.ecology?.hostPlantFamilies || [];
                                const hasTooMany = families.length > 4;
                                const displayed = hasTooMany ? families.slice(0, 3) : families;
                                const hidden = hasTooMany ? families.slice(3) : [];

                                return (
                                    <>
                                        {displayed.map((family, idx) => {
                                            const plantPos = getPlantFamilySpritePosition(family);
                                            const plantCommonName = getPlantFamilyCommonName(family);
                                            return (
                                                <a
                                                    href={`https://flora-on.pt/#/1${family}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    key={idx}
                                                    className="w-[88px] h-[88px] shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center transition-all duration-300 relative group/icon hover:ring-2 hover:ring-forest-green hover:ring-offset-2 cursor-pointer"
                                                    title={`Plantas: ${plantCommonName || family || 'N/A'} (Ver no Flora-On)`}
                                                >
                                                    {plantPos ? (
                                                        <div
                                                            className="w-[88px] h-[88px] shrink-0 rounded-lg"
                                                            style={{
                                                                backgroundImage: 'url("imgs/plant_family_sprite.webp")',
                                                                backgroundPosition: `${plantPos.x}px ${plantPos.y}px`,
                                                                backgroundSize: '352px 1250px',
                                                            }}
                                                        />
                                                    ) : (
                                                        <svg className="w-8 h-8 text-green-700/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    )}
                                                </a>
                                            );
                                        })}
                                        {hidden.length > 0 && (
                                            <div
                                                className="w-[88px] h-[88px] shrink-0 rounded-lg bg-emerald-50/50 border border-emerald-100/50 flex flex-col items-center justify-center text-emerald-700 group/icon hover:bg-emerald-50 transition-colors cursor-help"
                                                title={`Outras famílias: ${hidden.map(f => getPlantFamilyCommonName(f) || f).join(', ')}`}
                                            >
                                                <span className="text-xl font-bold leading-none">+{hidden.length}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-tight mt-1 opacity-60">Famílias</span>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </div>

                        {/* Similar Species Section (Moved to Right Column) */}
                        {similarSpeciesList && similarSpeciesList.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Espécies Semelhantes</h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {similarSpeciesList.map((sim, idx) => (
                                        <div
                                            key={idx}
                                            className="group/sim cursor-pointer bg-white rounded-lg border border-gray-100 hover:border-forest-green/30 hover:shadow-md transition-all overflow-hidden flex flex-col"
                                            onClick={() => onSelectSpecies(sim)}
                                            title={sim.commonName}
                                        >
                                            <div className="aspect-square w-full bg-gray-100 relative overflow-hidden border-b border-gray-100">
                                                <img
                                                    src={getImagePath(sim.latinName, sim.family)}
                                                    alt={sim.latinName}
                                                    className="w-full h-full object-cover group-hover/sim:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="p-3 flex flex-col gap-1">
                                                <p className="text-xs font-bold text-gray-800 group-hover/sim:text-forest-green transition-colors truncate">
                                                    {sim.latinName}
                                                </p>
                                                {sim.distinction ? (
                                                    <p className="text-[11px] leading-snug text-gray-500 line-clamp-3">
                                                        {sim.distinction}
                                                    </p>
                                                ) : (
                                                    <p className="text-[10px] text-gray-400 italic">Sem distinção registada</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-1/3">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Cor Predominante</span>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {(Array.isArray(species.details?.predominantColor)
                                            ? species.details.predominantColor
                                            : [species.details?.predominantColor || '']
                                        ).map((color, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-6 h-6 rounded-full shadow-sm border ring-2 ring-white ${getColorClass(color)}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-700 text-sm">
                                        {Array.isArray(species.details?.predominantColor)
                                            ? species.details.predominantColor.join(' / ')
                                            : species.details?.predominantColor || 'Inconhecida'}
                                    </span>
                                </div>
                            </div>

                            {/* Flight Months */}
                            <div className="flex-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Período de Voo</span>
                                <div className="flex flex-wrap gap-1">
                                    {['Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'].map(month => {
                                        const isFlying = species.details?.months.includes(month);
                                        return (
                                            <span
                                                key={month}
                                                className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${isFlying
                                                    ? 'bg-forest-green/10 text-forest-green border border-forest-green/20'
                                                    : 'bg-gray-50 text-gray-300 border border-transparent'
                                                    }`}
                                            >
                                                {month.substring(0, 3)}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Arrows (Fixed to screen edges) */}
                <div className="md:hidden fixed inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 pointer-events-none z-50">
                    {hasPrev && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onPrev(); }}
                            className="p-3 bg-black/40 text-white rounded-full backdrop-blur-sm pointer-events-auto"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    {!hasPrev && <div></div>} {/* Spacer */}

                    {hasNext && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onNext(); }}
                            className="p-3 bg-black/40 text-white rounded-full backdrop-blur-sm pointer-events-auto"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div >
        </div >

    );
};

export default SpeciesModal;
