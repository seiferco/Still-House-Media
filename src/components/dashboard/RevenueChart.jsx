import { motion } from 'framer-motion';

export default function RevenueChart({ data }) {
    // Find max value for scaling
    const maxValue = Math.max(...data.map(d => d.value), 1);

    return (
        <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-semibold text-zinc-900">Revenue Overview</h3>
                <select className="text-sm border-none bg-zinc-50 rounded-lg px-3 py-1 text-zinc-600 focus:ring-0 cursor-pointer hover:bg-zinc-100 transition">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                </select>
            </div>

            <div className="flex items-end justify-between gap-2 h-64 sm:h-80 w-full">
                {data.map((item, index) => {
                    const heightPercentage = (item.value / maxValue) * 100;

                    return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="relative w-full flex items-end justify-center h-full bg-zinc-50 rounded-t-xl overflow-hidden">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPercentage}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                    className="w-full max-w-[40px] bg-gradient-to-t from-[#0D9488] to-[#2DD4BF] rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity relative"
                                >
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                        ${item.value.toLocaleString()}
                                    </div>
                                </motion.div>
                            </div>
                            <span className="text-xs text-zinc-500 font-medium">{item.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
