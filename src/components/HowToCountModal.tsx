import { useEffect, useState } from "react";

interface HowToCountModalProps {
  onClose: () => void;
}

const HowToCountModal = ({ onClose }: HowToCountModalProps) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsRendered(true));
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const guidelines = [
    {
      title: "Período e Frequência",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-blue-500",
      textColor: "text-blue-600",
      lightBg: "bg-blue-500/10",
      border: "border-blue-500/20",
      items: [
        "Período oficial: 1 de Março a 30 de Setembro.",
        "Frequência ideal: Semanalmente ou quinzenalmente.",
        "As contagens devem ser regulares ao longo da época para apanhar os diferentes picos de voo.",
      ]
    },
    {
      title: "Condições Meteorológicas",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      lightBg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      items: [
        "Temperatura: Superior a 15°C se estiver céu limpo. Superior a 18°C se estiver nublado.",
        "Vento: Inferior a grau 5 na Escala de Beaufort (quando os ramos das árvores começam a abanar fortemente).",
        "Não se deve contar enquanto chove.",
      ]
    },
    {
      title: "Hora do Dia",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-orange-500",
      textColor: "text-orange-600",
      lightBg: "bg-orange-500/10",
      border: "border-orange-500/20",
      items: [
        "No geral, as contagens devem ser realizadas entre as 11:00 e as 16:00.",
        "Em dias muito quentes de verão (ondas de calor), as horas centrais devem ser evitadas, podendo-se começar um pouco mais cedo.",
        "No final do inverno o ideal é entre as 12:00 e as 15:00."
      ]
    },
    {
      title: "Registo e Identificação",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      ),
      color: "bg-purple-500",
      textColor: "text-purple-600",
      lightBg: "bg-purple-500/10",
      border: "border-purple-500/20",
      items: [
        "Procure registar sempre o nível taxonómico mais detalhado possível (idealmente a Espécie, ex: Pieris rapae).",
        "Se não tiver a certeza da espécie, registe o Género (ex: Pieris sp.).",
        "Se mesmo o género for duvidoso, registe a Família (ex: Pieridae).",
        "Qualquer registo, mesmo a nível de família, tem utilidade para avaliar a abundância."
      ]
    },
    {
      title: "Área de Contagem",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      lightBg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      items: [
        "Contar o número de indivíduos de cada espécie sempre por secção (2 Pieris Rapae na secção 1, 3 Pieris Rapae na secção 2, etc).",
        "Caminhar a um passo constante e lento ao longo da rota predefinida.",
        "Caixa imaginária: Registar apenas as borboletas num cubo de 5x5x5 metros (2.5m para a esquerda, 2.5m para a direita, 5m em frente e 5m de altura).",
        "Não volte para trás para contar indivíduos que tenham passado depois de si.",
      ]
    }
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 transition-all duration-500 ease-out`}
    >
      {/* Blurred background overlay */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 ${isRendered ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative flex flex-col w-full max-w-6xl max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-[2rem] shadow-2xl border border-white/20 transition-all duration-500 transform overflow-hidden ${isRendered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}`}
      >
        {/* Scroll Container bounds scrollbar within rounded corners */}
        <div className="flex-1 w-full overflow-y-auto">
          {/* Header */}
          <div className="relative z-20 bg-white/90 backdrop-blur-md border-b border-gray-100/50 flex justify-between p-6 pr-16 md:px-10 md:pr-24 md:py-8 rounded-t-2xl md:rounded-t-[2rem]">
            <div className="space-y-1 md:space-y-2">
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-forest-green/70">
                Guia Prático
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold serif-title uppercase text-gray-900 tracking-tight">
                Como Contar Borboletas
              </h2>
              <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mt-2 leading-relaxed">
                A metodologia padrão do eBMS (European Butterfly Monitoring Scheme) baseia-se em transectos. Siga estas diretrizes simples para que as suas contagens sejam válidas do ponto de vista científico.
              </p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-gray-100/80 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded-full transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {guidelines.map((guide, index) => (
                <div
                  key={guide.title}
                  className={`group relative flex flex-col rounded-[1.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${guide.title === "Área de Contagem" || guide.title === "Registo e Identificação" ? "md:col-span-2 lg:col-span-3" : ""
                    }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Content Container */}
                  <div className={`relative flex flex-1 p-6 sm:p-8 ${guide.title === "Área de Contagem" || guide.title === "Registo e Identificação" ? "flex-col lg:flex-row gap-8 lg:items-center" : "flex-col"
                    }`}>
                    {/* Decorative background element */}
                    <div
                      className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none ${guide.color}`}
                    ></div>

                    <div className="flex flex-col flex-1">
                      <div className="mb-4 flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${guide.lightBg} ${guide.textColor} shrink-0`}>
                          {guide.icon}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 serif-title uppercase tracking-tight relative z-10">
                          {guide.title}
                        </h3>
                      </div>

                      <ul className="space-y-3 mt-2 flex-1 relative z-10">
                        {guide.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm text-gray-700"
                          >
                            <span
                              className={`mr-2.5 mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white ${guide.color}`}
                            >
                              <svg
                                className="w-2.5 h-2.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {guide.title === "Registo e Identificação" && (
                      <div className="w-full lg:w-1/2 shrink-0">
                        <TaxonomyTreeDiagram />
                      </div>
                    )}
                    {guide.title === "Área de Contagem" && (
                      <div className="w-full lg:w-1/2 shrink-0">
                        <TransectBoxDiagram />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-forest-green/5 text-forest-green rounded-2xl text-sm font-medium border border-forest-green/10">
                <svg
                  className="w-8 h-8 flex-shrink-0 opacity-80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-left">
                  <p className="font-bold text-gray-900 mb-0.5 uppercase tracking-wide text-xs">Atenção ao detalhe</p>
                  <p className="text-gray-700">Se um indivíduo voar de trás para a sua frente atravessando a caixa, ou for detetado a repousar dentro da mesma, deve ser contado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransectBoxDiagram = () => (
  <div className="w-full flex justify-center mt-4 lg:mt-0 xl:scale-110">
    <svg viewBox="0 0 500 420" className="w-full h-auto max-h-[280px] sm:max-h-[340px] drop-shadow-sm font-sans">
      <defs>
        <linearGradient id="boxLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="boxRight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="boxTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
        </linearGradient>

        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
        </marker>
      </defs>

      {/* (Trajeto anterior removido para manter legibilidade na parte de baixo do diagrama) */}

      {/* Linhas traseiras da caixa */}
      <path d="M90,250 L250,170 L410,250" fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M250,30 L250,170" fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Faces visíveis da caixa */}
      {/* Topo */}
      <polygon points="250,190 410,110 250,30 90,110" fill="url(#boxTop)" stroke="#059669" strokeWidth="1" strokeLinejoin="round" />
      {/* Esquerda */}
      <polygon points="250,330 90,250 90,110 250,190" fill="url(#boxLeft)" stroke="#059669" strokeWidth="1" strokeLinejoin="round" />
      {/* Direita */}
      <polygon points="250,330 410,250 410,110 250,190" fill="url(#boxRight)" stroke="#059669" strokeWidth="1" strokeLinejoin="round" />

      {/* Linhas centrais estruturais & path do interior */}
      <line x1="250" y1="330" x2="250" y2="190" stroke="#059669" strokeWidth="2" />
      <line x1="90" y1="250" x2="250" y2="330" stroke="#059669" strokeWidth="2" />
      <line x1="410" y1="250" x2="250" y2="330" stroke="#059669" strokeWidth="2" />

      {/* Trajeto / Floor center line */}
      <path d="M250,170 L250,330" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.5" strokeDasharray="8 4" fill="none" />

      {/* Pessoa (Observador) com as costas voltadas para nós, posicionada em 250, 330 */}
      <g transform="translate(250, 325)">
        {/* Sombra */}
        <ellipse cx="0" cy="8" rx="10" ry="3" fill="#000000" fillOpacity="0.2" />
        {/* Pernas */}
        <path d="M-4,-10 L-6,8 M4,-10 L5,8" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        {/* Prancheta (apenas uma lasca visível lado direito) */}
        <rect x="7" y="-22" width="2" height="6" fill="#f8fafc" transform="rotate(10 7 -22)" />
        {/* Tronco de costas */}
        <path d="M-7,-26 L7,-26 L6,-6 L-6,-6 Z" fill="#1e293b" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
        {/* Cabeça */}
        <circle cx="0" cy="-33" r="6.5" fill="#1e293b" />
        {/* Braços ligeiramente dobrados para a frente */}
        <path d="M-7,-24 L-9,-12 L-5,-6 M7,-24 L9,-12 L5,-6" fill="none" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="290" y="315" fill="#1e293b" fontSize="12" fontWeight="600" textAnchor="start" style={{ fontStyle: 'italic' }}>Observador</text>

      {/* Dimensão: Altura */}
      <line x1="75" y1="110" x2="75" y2="250" stroke="#475569" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <text x="35" y="185" fill="#334155" fontSize="14" fontWeight="bold">5m</text>
      <text x="35" y="200" fill="#64748b" fontSize="11">altura</text>

      {/* Dimensão: Largura Esquerda / Direita */}
      <line x1="90" y1="355" x2="250" y2="380" stroke="#475569" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <text x="160" y="385" fill="#334155" fontSize="12" fontWeight="bold" textAnchor="middle">2.5m (esquerda)</text>

      <line x1="250" y1="380" x2="410" y2="355" stroke="#475569" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <text x="340" y="385" fill="#334155" fontSize="12" fontWeight="bold" textAnchor="middle">2.5m (direita)</text>

      {/* Guias das marcações */}
      <line x1="250" y1="330" x2="250" y2="390" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="90" y1="250" x2="90" y2="360" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="410" y1="250" x2="410" y2="360" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

      {/* Dimensão: Profundidade (frente) */}
      <line x1="265" y1="175" x2="265" y2="320" stroke="#0f172a" strokeWidth="2" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <rect x="272" y="240" width="75" height="20" fill="white" fillOpacity="0.8" rx="4" />
      <text x="278" y="254" fill="#0f172a" fontSize="12" fontWeight="bold">5m frente</text>

      {/* Ícones de Borboletas */}
      <g fill="#f59e0b" transform="translate(180, 260) scale(0.6)">
        <path d="M0,0 C-10,-10 -20,5 0,10 C20,5 10,-10 0,0" />
      </g>
      <g fill="#3b82f6" transform="translate(320, 200) scale(0.5) rotate(45)">
        <path d="M0,0 C-10,-10 -20,5 0,10 C20,5 10,-10 0,0" />
      </g>
      <g fill="#ec4899" transform="translate(150, 180) scale(0.7) rotate(-30)">
        <path d="M0,0 C-10,-10 -20,5 0,10 C20,5 10,-10 0,0" />
      </g>
      <g fill="#10b981" transform="translate(280, 140) scale(0.55) rotate(15)">
        <path d="M0,0 C-10,-10 -20,5 0,10 C20,5 10,-10 0,0" />
      </g>
    </svg>
  </div>
);

const TaxonomyTreeDiagram = () => (
  <div className="w-full flex justify-center mt-4 lg:mt-0 xl:scale-100">
    <svg viewBox="0 0 430 380" className="w-full h-auto max-h-[340px] sm:max-h-[400px] drop-shadow-sm font-sans">
      <defs>
        <marker id="arrow-down" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#d8b4fe" />
        </marker>
        <clipPath id="rounded-photo" clipPathUnits="objectBoundingBox">
          <rect width="1" height="1" rx="0.111" ry="0.156" />
        </clipPath>
      </defs>

      {/* Level Labels on the Left side */}
      <text x="5" y="25" fill="#a855f7" fontSize="12" fontWeight="bold" >1. Família</text>
      <text x="5" y="105" fill="#a855f7" fontSize="12" fontWeight="bold">2. Género</text>
      <text x="5" y="185" fill="#a855f7" fontSize="12" fontWeight="bold">3. Espécie</text>

      <g transform="translate(75, 0)">
        {/* Background soft paths defining the structure */}
        <path d="M200,40 L200,80" stroke="#d8b4fe" strokeWidth="2" markerEnd="url(#arrow-down)" />

        {/* Branching from Family to Genus */}
        <path d="M200,110 L200,130 L110,130 L110,160" stroke="#d8b4fe" strokeWidth="2" fill="none" markerEnd="url(#arrow-down)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M200,110 L200,130 L290,130 L290,160" stroke="#d8b4fe" strokeWidth="2" fill="none" markerEnd="url(#arrow-down)" strokeLinecap="round" strokeLinejoin="round" />

        {/* Branching from Genus to Species */}
        <path d="M110,190 L110,210 L50,210 L50,240" stroke="#e9d5ff" strokeWidth="2" fill="none" markerEnd="url(#arrow-down)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M110,190 L110,210 L170,210 L170,240" stroke="#e9d5ff" strokeWidth="2" fill="none" markerEnd="url(#arrow-down)" strokeLinecap="round" strokeLinejoin="round" />

        {/* Single Branch for the secondary Genus to Species for detail */}
        <path d="M290,190 L290,210 L290,240" stroke="#e9d5ff" strokeWidth="2" fill="none" markerEnd="url(#arrow-down)" />

        {/* FAMILY Node */}
        <rect x="140" y="10" width="120" height="30" rx="15" fill="#a855f7" />
        <text x="200" y="29" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">Pieridae</text>

        {/* GENUS Nodes */}
        <rect x="50" y="90" width="120" height="30" rx="15" fill="#c084fc" />
        <text x="110" y="109" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle" fontStyle="italic">Pieris<tspan fill="#f3e8ff" fontStyle="normal" fontSize="11"> sp.</tspan></text>

        <rect x="230" y="90" width="120" height="30" rx="15" fill="#c084fc" />
        <text x="290" y="109" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle" fontStyle="italic">Gonepteryx<tspan fill="#f3e8ff" fontStyle="normal" fontSize="11"> sp.</tspan></text>

        {/* SPECIES Nodes */}
        <rect x="10" y="170" width="80" height="30" rx="15" fill="#d8b4fe" />
        <text x="50" y="189" fill="#4c1d95" fontSize="12" fontWeight="bold" textAnchor="middle" fontStyle="italic">P. rapae</text>

        <rect x="120" y="170" width="90" height="30" rx="15" fill="#d8b4fe" />
        <text x="165" y="189" fill="#4c1d95" fontSize="12" fontWeight="bold" textAnchor="middle" fontStyle="italic">P. brassicae</text>

        <rect x="240" y="170" width="100" height="30" rx="15" fill="#d8b4fe" />
        <text x="290" y="189" fill="#4c1d95" fontSize="12" fontWeight="bold" textAnchor="middle" fontStyle="italic">G. cleopatra</text>

        {/* Photos */}
        <image x="5" y="230" width="90" height="64" href="imgs/sp/Pieridae/Pieris rapae.webp" preserveAspectRatio="xMidYMid slice" clipPath="url(#rounded-photo)" />
        <image x="120" y="230" width="90" height="64" href="imgs/sp/Pieridae/Pieris brassicae.webp" preserveAspectRatio="xMidYMid slice" clipPath="url(#rounded-photo)" />
        <image x="245" y="230" width="90" height="64" href="imgs/sp/Pieridae/Gonepteryx cleopatra.webp" preserveAspectRatio="xMidYMid slice" clipPath="url(#rounded-photo)" />

        {/* Photo Background Borders */}
        <rect x="5" y="230" width="90" height="64" rx="10" fill="none" stroke="#d8b4fe" strokeWidth="2" />
        <rect x="120" y="230" width="90" height="64" rx="10" fill="none" stroke="#d8b4fe" strokeWidth="2" />
        <rect x="245" y="230" width="90" height="64" rx="10" fill="none" stroke="#d8b4fe" strokeWidth="2" />
      </g>

    </svg>
  </div>
);

export default HowToCountModal;
