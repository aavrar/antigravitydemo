import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const MetricCard = ({ title, value, label, color = 'blue', delay = 0 }) => {
    const isNumber = typeof value === 'number';
    const springValue = useSpring(0, { stiffness: 50, damping: 20 });
    const displayValue = useTransform(springValue, (current) => Math.round(current));

    useEffect(() => {
        if (isNumber) {
            springValue.set(value);
        }
    }, [value, isNumber, springValue]);

    const colorStyles = {
        green: 'text-green-400 border-green-500/30 bg-green-500/10',
        blue: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
        yellow: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
        orange: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
        red: 'text-red-400 border-red-500/30 bg-red-500/10',
        purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
        gray: 'text-gray-400 border-gray-500/30 bg-gray-500/10',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`relative p-6 rounded-xl border ${colorStyles[color]} backdrop-blur-md hover:bg-opacity-20 transition-all duration-300 group`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">
                    {isNumber ? <motion.span>{displayValue}</motion.span> : value}
                </span>
                {label && <span className="text-sm font-medium opacity-80">{label}</span>}
            </div>
        </motion.div>
    );
};

export default MetricCard;
