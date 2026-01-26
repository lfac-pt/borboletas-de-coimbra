

interface FiltersProps {
    onMonthChange: (month: string | null) => void;
    onSortChange: (sort: 'taxonomy' | 'size' | 'color') => void;
    selectedMonth: string | null;
    selectedSort: string;
}

const MONTHS = [
    'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'
];

const Filters: React.FC<FiltersProps> = ({ onMonthChange, onSortChange, selectedMonth, selectedSort }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="flex-1 space-y-2">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider block">Filtrar por Mês</label>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onMonthChange(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedMonth === null
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                    >
                        Todos
                    </button>
                    {MONTHS.map(month => (
                        <button
                            key={month}
                            onClick={() => onMonthChange(month)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedMonth === month
                                ? 'bg-blue-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                        >
                            {month}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider block">Ordenar por</label>
                <select
                    value={selectedSort}
                    onChange={(e) => onSortChange(e.target.value as any)}
                    className="bg-gray-800 text-white border border-white/20 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48 appearance-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                >
                    <option value="taxonomy">Táxon (Família)</option>
                    <option value="size">Tamanho</option>
                    <option value="color">Cor Predominante</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
