import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Wifi, Wind, Music, BookOpen, Sun } from 'lucide-react';
import { Amenity } from '../types';

const amenitiesList: Amenity[] = [
  { id: '1', label: 'Artisanal Coffee', iconName: 'Coffee' },
  { id: '2', label: 'Gigabit Wifi', iconName: 'Wifi' },
  { id: '3', label: 'Filtered Air', iconName: 'Wind' },
  { id: '4', label: 'Vinyl Collection', iconName: 'Music' },
  { id: '5', label: 'Curated Library', iconName: 'Book' },
  { id: '6', label: 'Natural Light', iconName: 'Sun' },
];

const IconMap = {
  Coffee: Coffee,
  Wifi: Wifi,
  Wind: Wind,
  Music: Music,
  Book: BookOpen,
  Sun: Sun,
};

export const Amenities: React.FC = () => {
  return (
    <section className="py-24 bg-white/50 relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:w-1/3">
           <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-soft-charcoal mb-4">Invisible Comforts</h2>
           <p className="font-serif text-2xl italic text-terracotta">Everything you need to do absolutely nothing.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {amenitiesList.map((item) => {
            const IconComponent = IconMap[item.iconName];
            return (
              <motion.div
                key={item.id}
                className="relative bg-oat-milk p-12 flex flex-col items-center justify-center gap-6 group cursor-default overflow-hidden"
              >
                <div className="relative z-10 text-soft-charcoal group-hover:text-terracotta transition-colors duration-500">
                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <IconComponent size={40} strokeWidth={1} />
                    </motion.div>
                </div>
                
                <span className="relative z-10 font-sans text-sm tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.label}
                </span>

                {/* Subtle hover background fill */}
                <div className="absolute inset-0 bg-white transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-full" style={{ borderRadius: '100%' }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};