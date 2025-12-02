import { motion } from 'framer-motion';

const SkeletonCard = ({ delay }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
        className="relative p-6 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm h-32 overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
        <div className="h-4 w-24 bg-white/10 rounded mb-4"></div>
        <div className="h-8 w-16 bg-white/10 rounded"></div>
    </motion.div>
);

const SkeletonResults = () => {
    return (
        <div className="w-full space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div className="h-8 w-48 bg-white/10 rounded animate-pulse"></div>
                <div className="h-10 w-32 bg-white/10 rounded-full animate-pulse"></div>
            </div>

            {/* Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                    <SkeletonCard key={i} delay={i * 0.1} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-64 bg-white/5 rounded-xl border border-white/5 animate-pulse"></div>
                <div className="h-64 bg-white/5 rounded-xl border border-white/5 animate-pulse"></div>
            </div>
        </div>
    );
};

export default SkeletonResults;
