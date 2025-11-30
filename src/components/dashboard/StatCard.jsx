import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon: Icon, trend, trendLabel, color = "blue" }) {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600",
        teal: "bg-teal-50 text-teal-600"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${colors[color]}`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend > 0 ? '+' : ''}{trend}%
                        <span className="text-zinc-400 font-normal ml-1">{trendLabel}</span>
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-zinc-500 text-sm font-medium mb-1">{title}</h3>
                <div className="text-2xl font-bold text-zinc-900">{value}</div>
            </div>
        </motion.div>
    );
}
