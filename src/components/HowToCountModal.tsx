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
        "Chuva: Não se deve contar enquanto chove.",
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
      title: "O Transecto e a Área",
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
        className={`relative flex flex-col w-full max-w-4xl max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-[2rem] shadow-2xl border border-white/20 transition-all duration-500 transform overflow-hidden ${isRendered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}`}
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
              <p className="text-sm md:text-base text-gray-500 font-light max-w-xl mt-2 leading-relaxed">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {guidelines.map((guide, index) => (
                <div
                  key={guide.title}
                  className="group relative flex flex-col rounded-[1.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Content Container */}
                  <div className="relative flex flex-col flex-1 p-6 sm:p-8">
                    {/* Decorative background element */}
                    <div
                      className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none ${guide.color}`}
                    ></div>

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

export default HowToCountModal;
