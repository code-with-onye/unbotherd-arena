import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const BookingCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGradientPos({ x, y });
  };

  return (
    <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-soft-charcoal text-oat-milk"
    >
      {/* Dynamic Gradient Background */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
            background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, #C97D60 0%, #292D32 40%)`,
            opacity: 0.4
        }}
      />

      <div className="relative z-10 text-center px-6">
        <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-serif italic text-4xl md:text-7xl mb-12"
        >
            Claim your unbothered space.
        </motion.h2>
        
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-oat-milk text-soft-charcoal px-10 py-4 rounded-none font-sans tracking-[0.2em] uppercase hover:bg-white transition-colors"
        >
            Check Availability
        </motion.button>
      </div>
    </section>
  );
};