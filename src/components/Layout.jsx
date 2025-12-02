
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const Layout = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const moveX1 = useTransform(springX, [0, window.innerWidth], [-20, 20]);
  const moveY1 = useTransform(springY, [0, window.innerHeight], [-20, 20]);

  const moveX2 = useTransform(springX, [0, window.innerWidth], [20, -20]);
  const moveY2 = useTransform(springY, [0, window.innerHeight], [20, -20]);

  const moveX3 = useTransform(springX, [0, window.innerWidth], [-10, 10]);
  const moveY3 = useTransform(springY, [0, window.innerHeight], [10, -10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-dark-bg text-white selection:bg-brand-primary selection:text-white">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-dark-bg opacity-90 z-10"></div>
        <motion.div
          style={{ x: moveX1, y: moveY1 }}
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-brand-primary/20 blur-[120px] animate-pulse-slow"
        ></motion.div>
        <motion.div
          style={{ x: moveX2, y: moveY2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-brand-secondary/20 blur-[120px] animate-pulse-slow"
        ></motion.div>
        <motion.div
          style={{ x: moveX3, y: moveY3 }}
          className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-brand-accent/15 blur-[100px] animate-pulse-slow"
        ></motion.div>
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

