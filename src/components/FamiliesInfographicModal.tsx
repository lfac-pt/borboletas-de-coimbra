import { useEffect, useState } from 'react';

interface FamiliesInfographicModalProps {
    onClose: () => void;
}

const FamiliesInfographicModal = ({ onClose }: FamiliesInfographicModalProps) => {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        setIsRendered(true);
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const families = [
        {
            name: 'Hesperiidae',
            commonName: 'Hesperídeos',
            color: 'bg-amber-700',
            textColor: 'text-amber-700',
            lightBg: 'bg-amber-700/10',
            border: 'border-amber-700/20',
            photo: 'imgs/sp/Hesperiidae/Thymelicus sylvestris.webp',
            description: 'Borboletas de corpo muito robusto e cabeça larga. Têm um voo rápido e "saltitante".',
            features: [
                'Corpo atarracado e cabeça mais larga que o tórax',
                'Antenas amplamente separadas na base',
                'Postura típica de repouso: asas anteriores em "V" e posteriores abertas',
                'Cores predominantemente castanhas, alaranjadas ou pretas e brancas'
            ]
        },
        {
            name: 'Papilionidae',
            commonName: 'Papilionídeos',
            color: 'bg-yellow-500',
            textColor: 'text-yellow-600',
            lightBg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20',
            photo: 'imgs/sp/Papilionidae/Papilio machaon.webp',
            description: 'Entre as nossas maiores borboletas. Muitas têm prolongamentos nas asas posteriores idênticos a caudas.',
            features: [
                'Tamanho grande a muito grande; voo poderoso',
                'Algumas espécies apresentam "caudas" nas asas posteriores',
                'Apenas três espécies em Portugal',
                'Por vezes alimentam-se em voo contínuo sem parar de bater as asas'
            ]
        },
        {
            name: 'Pieridae',
            commonName: 'Pierídeos',
            color: 'bg-lime-400',
            textColor: 'text-lime-600',
            lightBg: 'bg-lime-400/10',
            border: 'border-lime-400/20',
            photo: 'imgs/sp/Pieridae/Pieris brassicae.webp',
            description: 'Vulgarmente conhecidas como as "brancas" e as "amarelas", algumas são muito comuns em zonas rurais/agrícolas.',
            features: [
                'Cores de fundo geralmente brancas, amarelas ou alaranjadas',
                'Pigmentos baseados em resíduos metabólicos (pterinas)',
                'Postura de repouso: asas geralmente fechadas com firmeza'
            ]
        },
        {
            name: 'Nymphalidae',
            commonName: 'Ninfalídeos',
            color: 'bg-orange-500',
            textColor: 'text-orange-600',
            lightBg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            photo: 'imgs/sp/Nymphalidae/Vanessa atalanta.webp',
            description: 'A maior e mais diversificada das famílias.',
            features: [
                'Padrões muito variáveis: laranjas vibrantes, ocelos grandes e padrões crípticos',
                'Muitos repousam com as asas completamente abertas ao sol',
                'Incluem os satíreos, muitas vezes acastanhados com padrões de ocelos nas orlas'
            ]
        },
        {
            name: 'Lycaenidae',
            commonName: 'Licaenídeos',
            color: 'bg-sky-500',
            textColor: 'text-sky-600',
            lightBg: 'bg-sky-500/10',
            border: 'border-sky-500/20',
            photo: 'imgs/sp/Lycaenidae/Polyommatus icarus_celina.webp',
            description: 'Borboletas de pequenas dimensões. Os machos têm frequentemente faces dorsais azuladas maravilhosas, ardentes ou cobre.',
            features: [
                'Tamanho pequeno (algumas muito pequenas)',
                'As faces ventrais têm frequentemente padrões complexos de manchas/ocelos',
                'Algumas espécies têm filamentos capilares como caudas nas asas e esfregam-nas quando pousam',
                'As lagartas são muitas vezes associadas a formigas (mirmecofilia)'
            ]
        }
    ];

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 transition-all duration-500 ease-out`}
        >
            {/* Blurred background overlay */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 ${isRendered ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className={`relative flex flex-col w-full max-w-6xl max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-[2rem] shadow-2xl border border-white/20 transition-all duration-500 transform overflow-hidden ${isRendered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}
            >
                {/* Scroll Container bounds scrollbar within rounded corners */}
                <div className="flex-1 w-full overflow-y-auto">
                    {/* Header */}
                    <div className="relative z-20 bg-white/90 backdrop-blur-md border-b border-gray-100/50 flex justify-between p-6 pr-16 md:px-10 md:pr-24 md:py-8 rounded-t-2xl md:rounded-t-[2rem]">
                        <div className="space-y-1 md:space-y-2">
                            <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-forest-green/70">Resumo</p>
                            <h2 className="text-3xl md:text-5xl font-extrabold serif-title uppercase text-gray-900 tracking-tight">
                                As 5 Famílias
                            </h2>
                            <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mt-2 leading-relaxed">
                                Descubra como distinguir os 5 maiores grupos de borboletas diurnas que podemos encontrar na região. Cada família tem características morfológicas e de comportamentos únicos.
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-gray-100/80 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded-full transition-colors flex-shrink-0"
                            aria-label="Fechar"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content - Masonry/Grid Layout */}
                    <div className="p-6 md:p-10 bg-slate-50/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {families.map((family, index) => (
                                <div
                                    key={family.name}
                                    className="group relative flex flex-col rounded-[1.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                    style={{
                                        transitionDelay: `${index * 100}ms`
                                    }}
                                >
                                    {/* Full bleed Image Header */}
                                    <div className="relative overflow-hidden h-56 sm:h-64 bg-gray-100">
                                        <img
                                            src={family.photo}
                                            alt={`Exemplo de ${family.name}`}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${family.color}`}></div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="relative flex flex-col flex-1 p-6 sm:p-8">
                                        {/* Decorative background element */}
                                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none ${family.color}`}></div>

                                        <div className="mb-6">
                                            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 serif-title uppercase tracking-tight mb-1 relative z-10">
                                                {family.name}
                                            </h3>
                                            <p className={`text-sm sm:text-base tracking-wide font-bold uppercase mb-4 relative z-10 ${family.textColor}`}>
                                                {family.commonName}
                                            </p>
                                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed relative z-10">
                                                {family.description}
                                            </p>
                                        </div>

                                        {/* Features List */}
                                        <div className={`flex-1 ${family.lightBg} p-5 rounded-xl border ${family.border} w-full relative z-10`}>
                                            <h4 className={`text-xs uppercase tracking-wider font-bold mb-3 opacity-80 ${family.textColor}`}>
                                                Como Identificar
                                            </h4>
                                            <ul className="space-y-3">
                                                {family.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start text-sm text-gray-700">
                                                        <span className={`mr-2.5 mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white ${family.color}`}>
                                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                        </span>
                                                        <span className="leading-snug">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest-green/10 text-forest-green rounded-full text-sm font-medium border border-forest-green/20">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Lembre-se: a prática leva à perfeição. Ao longo do tempo, as silhuetas gerais de cada família tornam-se inconfundíveis!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FamiliesInfographicModal;
