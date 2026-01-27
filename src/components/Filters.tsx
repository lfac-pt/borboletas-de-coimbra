interface FiltersProps {
    onMonthChange: (month: string | null) => void;
    onSortChange: (sort: 'taxonomy' | 'size' | 'color') => void;
    selectedMonth: string | null;
    selectedSort: string;
    monthCounts: Record<string, number>;
    totalCount: number;
}

const MONTHS = [
    'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'
];

const Filters = ({ onMonthChange, onSortChange, selectedMonth, selectedSort, monthCounts, totalCount }: FiltersProps) => {
    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                <div className="text-forest-green hidden md:block">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onMonthChange(null)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedMonth === null
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
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedMonth === month
                                ? 'bg-[#2d6a4f] text-white shadow-md'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {month} <span className={`ml-1 opacity-60 font-normal`}>({monthCounts[month] || 0})</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="text-forest-green">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                </div>

                <select
                    value={selectedSort}
                    onChange={(e) => onSortChange(e.target.value as 'taxonomy' | 'size' | 'color')}
                    className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d6a4f] w-full md:w-48 cursor-pointer"
                >
                    <option value="taxonomy">Taxonomia</option>
                    <option value="size">Tamanho</option>
                    <option value="color">Cor Predominante</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
