import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Key } from 'lucide-react';

export const Hero: React.FC = () => {
  const [showCTA, setShowCTA] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 3000);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 20; // Dampening factor
      const y = (e.clientY - innerHeight / 2) / 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-oat-milk">
        {/* Background Texture/Noise */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        
        {/* Curtain Effect (Simulated with blurred shapes) */}
        <motion.div 
            className="absolute inset-0 z-0 opacity-30"
            animate={{ 
                backgroundPosition: ['0% 0%', '100% 50%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
            style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201, 125, 96, 0.1) 0%, transparent 60%)'
            }}
        />

        {/* 3D Floating Key Parallax */}
        <motion.div 
            style={{ x: mouseX, y: mouseY, rotateZ: 45 }}
            className="absolute z-10 opacity-10 blur-[1px]"
        >
             <Key size={400} strokeWidth={0.5} color="#292D32" />
        </motion.div>

        {/* Content */}
        <div className="z-20 text-center space-y-8 relative">
            <motion.h1 
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                className="font-sans font-thin text-5xl md:text-8xl tracking-[0.2em] text-soft-charcoal uppercase"
            >
                Unbothered
                <br />
                <span className="font-light">Arena</span>
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showCTA ? 1 : 0, y: showCTA ? 0 : 20 }}
                transition={{ duration: 1.5 }}
                className="pt-12"
            >
                <button 
                    onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative px-8 py-3 overflow-hidden rounded-full border border-terracotta text-terracotta hover:text-white transition-colors duration-500"
                >
                    <span className="relative z-10 font-serif italic tracking-wide">Enter the Silence</span>
                    <div className="absolute inset-0 bg-terracotta transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                </button>
            </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] uppercase tracking-widest text-terracotta/60">Scroll to pause</span>
            <div className="w-[1px] h-12 bg-terracotta/30 overflow-hidden relative">
                <motion.div 
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 w-full h-1/2 bg-terracotta" 
                />
            </div>
        </motion.div>
    </div>
  );
};