import { useState, useRef, useEffect } from 'react';

interface MultiSelectProps {
    label: string;
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    // Map internal values to display labels (optional)
    valueLabelMap?: Record<string, string>;
}

const MultiSelect = ({ label, options, selected, onChange, valueLabelMap }: MultiSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleOption = (option: string) => {
        const newSelected = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];
        onChange(newSelected);
    };

    const getDisplayValue = () => {
        if (selected.length === 0) return `Todas as ${label.toLowerCase()}`; // e.g. "Todas as cores"
        if (selected.length === 1) return valueLabelMap ? (valueLabelMap[selected[0]] || selected[0]) : selected[0];
        return `${selected.length} selecionadas`;
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-2 text-sm text-left flex items-center justify-between outline-none focus:ring-2 focus:ring-[#2d6a4f] transition-all ${isOpen ? 'ring-2 ring-[#2d6a4f] border-transparent' : 'hover:border-gray-300'}`}
            >
                <span className="truncate block max-w-[90%]">
                    {getDisplayValue()}
                </span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-1 space-y-0.5">
                        {/* Option to clear all if something is selected */}
                        {selected.length > 0 && (
                            <button
                                onClick={() => { onChange([]); setIsOpen(false); }}
                                className="w-full text-left px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            >
                                Limpar Seleção
                            </button>
                        )}

                        {options.map(option => {
                            const isSelected = selected.includes(option);
                            const displayLabel = valueLabelMap ? (valueLabelMap[option] || option) : option;

                            return (
                                <div
                                    key={option}
                                    onClick={() => toggleOption(option)}
                                    className={`flex items-center gap-3 px-3 py-2 text-sm cursor-pointer rounded-md transition-colors select-none ${isSelected ? 'bg-[#2d6a4f]/5 text-[#2d6a4f] font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
                                >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#2d6a4f] border-[#2d6a4f]' : 'border-gray-300 bg-white'}`}>
                                        {isSelected && (
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <span>{displayLabel}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
