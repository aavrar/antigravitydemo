import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-dark-bg text-white selection:bg-brand-primary selection:text-white">
            {/* Animated Gradient Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-dark-bg opacity-90 z-10"></div>
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-brand-primary/30 blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-brand-secondary/30 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-brand-accent/20 blur-[100px] animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Content */}
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-20 w-full h-full"
            >
                {children}
            </motion.main>
        </div>
    );
};

export default Layout;
