import { getPlantFamilySpritePosition, getPlantFamilyCommonName } from '../utils/plantFamilyIcons';
import { getHabitatSpritePosition } from '../utils/habitatTypeIcons';
import { getSizeSpritePosition } from '../utils/sizeTypeIcons';
import { endangered_pt, endangered_eu } from '../constants';
import type { Species } from '../constants';

interface SpeciesCardProps {
    species: Species;
}

const SpeciesCard = ({ species }: SpeciesCardProps) => {
    const getImagePath = (latinName: string, family: string) => {
        const formattedName = latinName.replace(/\//g, '_');
        return `imgs/sp/${family}/${formattedName}.jpg`;
    };
    const statusPT = endangered_pt[species.latinName as keyof typeof endangered_pt];
    const statusEU = endangered_eu[species.latinName as keyof typeof endangered_eu];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CR': return 'bg-red-100 text-red-700 border-red-200';
            case 'EN': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'VU': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'NT': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };
    const habitatPos = species.ecology?.habitatType ? getHabitatSpritePosition(species.ecology.habitatType) : getHabitatSpritePosition('Generalist');
    const plantFamily = species.ecology?.hostPlantFamilies[0];
    const plantPos = plantFamily ? getPlantFamilySpritePosition(plantFamily) : null;
    const plantCommonName = plantFamily ? getPlantFamilyCommonName(plantFamily) : null;
    const sizePos = species.details?.sizeCategory ? getSizeSpritePosition(species.details.sizeCategory) : null;

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

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row group transition-all hover:shadow-md h-full">
            {/* Left Photo */}
            <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-square overflow-hidden shrink-0">
                <img
                    src={getImagePath(species.latinName, species.family)}
                    alt={species.latinName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Sem+Foto';
                    }}
                />
            </div>

            {/* Right Content */}
            <div className="p-6 md:p-8 flex-1 flex flex-col min-w-0">
                <div className="mb-4">
                    <h3 className="serif-title text-2xl md:text-3xl text-gray-800 italic mb-1 truncate">
                        {species.latinName}
                    </h3>
                    <p className="text-lg text-gray-500 font-medium">
                        {species.commonName}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
                        {species.family}
                    </span>
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
                    {species.details?.similarSpecies && species.details.similarSpecies.length > 0 && (
                        <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold hover:bg-gray-200 transition-colors">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Espécies similares ({species.details.similarSpecies.length})
                        </button>
                    )}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 mt-auto items-center">
                    {/* Habitat Icon */}
                    <div className="flex items-center justify-center sm:justify-start">
                        <div
                            className="w-[88px] h-[88px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
                            style={{
                                backgroundImage: 'url("imgs/habitats.jpg")',
                                backgroundPosition: `${habitatPos.x}px ${habitatPos.y}px`,
                                backgroundSize: '352px 192px',
                            }}
                            title={`Habitat: ${species.ecology?.habitatType || 'Inconhecido'}`}
                        />
                    </div>

                    {/* Plant Icon */}
                    <div className="flex items-center justify-center sm:justify-start">
                        {plantPos ? (
                            <div
                                className="w-[88px] h-[88px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
                                style={{
                                    backgroundImage: 'url("imgs/plant_family_sprite.png")',
                                    backgroundPosition: `${plantPos.x}px ${plantPos.y}px`,
                                    backgroundSize: '352px 768px',
                                }}
                                title={`Plantas: ${plantCommonName || plantFamily || 'N/A'}`}
                            />
                        ) : (
                            <div className="w-[88px] h-[88px] rounded-lg bg-green-50 flex items-center justify-center text-green-700 shrink-0" title="Plantas: N/A">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Size Icon */}
                    <div className="flex items-center justify-center sm:justify-start">
                        {sizePos ? (
                            <div
                                className="w-[88px] h-[88px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
                                style={{
                                    backgroundImage: 'url("imgs/sizes.PNG")',
                                    backgroundPosition: `${sizePos.x}px ${sizePos.y}px`,
                                    backgroundSize: '352px 192px',
                                }}
                                title={`Porte: ${species.details?.sizeCategory || 'N/A'}`}
                            />
                        ) : (
                            <div className="w-[88px] h-[88px] rounded-lg bg-green-50 flex items-center justify-center text-green-700 shrink-0" title={`Porte: ${species.details?.sizeCategory || 'N/A'}`}>
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer info: Color */}
                <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                    <div className="flex -space-x-1">
                        {(Array.isArray(species.details?.predominantColor)
                            ? species.details.predominantColor
                            : [species.details?.predominantColor || '']
                        ).map((color, idx) => (
                            <div
                                key={idx}
                                className={`w-3 h-3 rounded-full shadow-sm border ${getColorClass(color)}`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">
                        Cor predominante: <span className="font-semibold text-gray-700">
                            {Array.isArray(species.details?.predominantColor)
                                ? species.details.predominantColor.join(' / ')
                                : species.details?.predominantColor || 'Inconhecida'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SpeciesCard;
