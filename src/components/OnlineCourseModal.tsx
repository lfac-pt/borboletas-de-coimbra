import { useEffect, useState } from "react";

interface OnlineCourseModalProps {
  onClose: () => void;
}

const OnlineCourseModal = ({ onClose }: OnlineCourseModalProps) => {
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 transition-all duration-500 ease-out">
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 ${isRendered ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`relative flex flex-col w-full max-w-6xl bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-[2rem] shadow-2xl border border-white/20 transition-all duration-500 transform overflow-hidden ${isRendered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}`}
      >
        {/* Header */}
        <div className="relative z-20 bg-white/90 backdrop-blur-md border-b border-gray-100/50 flex justify-between p-6 pr-16 md:px-10 md:pr-24 md:py-8 rounded-t-2xl md:rounded-t-[2rem]">
          <div className="space-y-1 md:space-y-2">
            <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-forest-green/70">
              Vídeos
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold serif-title uppercase text-gray-900 tracking-tight">
              Curso Online
            </h2>
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

        {/* Iframe */}
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/videoseries?list=PL8vcx-l-OFpXL6Kj0TB9b1VuIp0ycyJRz"
            title="Curso Online"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default OnlineCourseModal;
