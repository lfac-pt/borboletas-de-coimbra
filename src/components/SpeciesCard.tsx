import type { Species } from '../constants';

interface SpeciesCardProps {
    species: Species;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
    const getImagePath = (latinName: string, family: string) => {
        const formattedName = latinName.replace(/\//g, '_');
        return `/imgs/sp/${family}/${formattedName}.jpg`;
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 group">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={getImagePath(species.latinName, species.family)}
                    alt={species.latinName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Sem+Foto';
                    }}
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white font-medium">
                    {species.family}
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                        {species.commonName}
                    </h3>
                    <p className="text-sm italic text-gray-300">
                        {species.latinName}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="space-y-1">
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">Habitat</span>
                        <p className="text-gray-200 line-clamp-2">
                            {species.ecology?.habitats.join(', ') || 'Informação não disponível'}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">Planta Anfitriã</span>
                        <p className="text-gray-200 line-clamp-2">
                            {species.ecology?.hostPlantFamilies.join(', ') || (species.ecology?.hostPlantSpecies.join(', ')) || 'Informação não disponível'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {species.details?.sizeCategory && (
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                            Porte: {species.details.sizeCategory}
                        </span>
                    )}
                    {species.details?.predominantColor && (
                        <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                            Cor: {species.details.predominantColor}
                        </span>
                    )}
                </div>

                {species.details?.similarSpecies && species.details.similarSpecies.length > 0 && (
                    <div className="pt-2">
                        <div className="relative group/tooltip">
                            <span className="text-xs font-semibold text-pink-400 cursor-help underline decoration-dotted">
                                Espécies semelhantes
                            </span>
                            <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 rounded-lg text-xs text-gray-200 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl border border-white/10">
                                {species.details.similarSpecies.map((s, i) => (
                                    <div key={i} className="mb-2 last:mb-0">
                                        <div className="font-bold text-white">{s.name}</div>
                                        <div>{s.distinction}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpeciesCard;
