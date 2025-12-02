import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="text-center space-y-6 max-w-4xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
            >
                Writing Analyzer
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto"
            >
                Elevate your writing with intelligent analysis and actionable insights.
            </motion.p>
        </div>
    );
};

export default Hero;
