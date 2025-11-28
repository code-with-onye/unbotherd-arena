import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Ethos: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 0.6]);
  const textColor = useTransform(scrollYProgress, [0.2, 0.5], ["#292D32", "#1a1c20"]);

  return (
    <div ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center py-24">
      {/* Scroll-based darkening background overlay */}
      <motion.div 
        style={{ opacity: backgroundOpacity }}
        className="absolute inset-0 bg-neutral-200 pointer-events-none transition-colors duration-1000"
      />

      <motion.div 
        className="relative z-10 max-w-prose mx-auto px-6 md:px-0 text-center md:text-left"
        style={{ color: textColor }}
      >
        <h2 className="font-sans font-light text-sm tracking-[0.3em] uppercase mb-12 text-terracotta">The Ethos</h2>
        
        <p className="font-serif text-2xl md:text-4xl leading-[1.6] md:leading-[1.8] text-soft-charcoal opacity-90">
            "The world is loud. Your sanctuary shouldn't be."
        </p>
        
        <div className="mt-12 space-y-8 font-serif text-lg md:text-xl leading-relaxed opacity-80">
            <p>
                We believe in the luxury of <span className="italic text-terracotta">absence</span>. Absence of noise, absence of clutter, absence of urgency.
            </p>
            <p>
                Every Unbothered property is curated not just by how it looks, but how it sounds. How the light hits the floorboards at 4 PM. How the linen feels against tired skin. 
            </p>
            <p>
                This isn't just a place to sleep. It is a pause button for your life.
            </p>
        </div>
      </motion.div>
    </div>
  );
};