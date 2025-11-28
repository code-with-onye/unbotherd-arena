import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Property } from '../types';
import { X } from 'lucide-react';

const properties: Property[] = [
  {
    id: '1',
    title: 'The Sunken Loft',
    description: 'A subterranean hideaway with skylights and soundproof clay walls.',
    image: 'https://picsum.photos/seed/loft/800/800',
    gallery: [
        'https://picsum.photos/seed/loft1/1200/800',
        'https://picsum.photos/seed/loft2/1200/800',
        'https://picsum.photos/seed/loft3/1200/800'
    ],
    price: '$240/night',
    guests: 2
  },
  {
    id: '2',
    title: 'Oatmeal Studio',
    description: 'Monochromatic stillness. Textured fabrics and morning light.',
    image: 'https://picsum.photos/seed/oat/800/800',
    gallery: [
        'https://picsum.photos/seed/oat1/1200/800',
        'https://picsum.photos/seed/oat2/1200/800',
        'https://picsum.photos/seed/oat3/1200/800'
    ],
    price: '$190/night',
    guests: 2
  },
  {
    id: '3',
    title: 'Glass Pavilion',
    description: 'Surrounded by nature, separated by invisible walls.',
    image: 'https://picsum.photos/seed/glass/800/800',
    gallery: [
        'https://picsum.photos/seed/glass1/1200/800',
        'https://picsum.photos/seed/glass2/1200/800',
        'https://picsum.photos/seed/glass3/1200/800'
    ],
    price: '$350/night',
    guests: 4
  },
  {
    id: '4',
    title: 'Silent Villa',
    description: 'Minimalist architecture meeting wild coastline.',
    image: 'https://picsum.photos/seed/villa/800/800',
    gallery: [
        'https://picsum.photos/seed/villa1/1200/800',
        'https://picsum.photos/seed/villa2/1200/800',
        'https://picsum.photos/seed/villa3/1200/800'
    ],
    price: '$420/night',
    guests: 6
  }
];

interface PropertyCardProps {
  property: Property;
  containerRef: React.RefObject<HTMLDivElement | null>; // Fix: Update RefObject type
  onClick: (property: Property) => void;
  index: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, containerRef, onClick, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track this specific card's position relative to the scroll container's viewport
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    axis: "x",
    offset: ["start end", "end start"] // Tracking from when it enters right to leaves left
  });

  // Parallax mapping: As card moves left (progress 0 -> 1), image moves slightly right relative to card.
  // This creates the "depth" effect where the background feels further away.
  const x = useTransform(scrollXProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={cardRef}
      className="min-w-[85vw] md:min-w-[40vw] snap-center perspective-1000 group cursor-pointer"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      onClick={() => onClick(property)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-200 transition-transform duration-700 ease-out group-hover:rotate-y-2 group-hover:scale-[1.02] shadow-xl">
          {/* Parallax Image */}
          <motion.div 
            className="w-full h-full"
            style={{ x, scale: 1.25 }} // Base scale > 1 to allow for parallax movement without gaps
          >
             <img 
                src={`${property.image}?grayscale`} 
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0"
             />
          </motion.div>
          
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          
          <div className="absolute bottom-0 left-0 p-8 text-white z-10 translate-y-4 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h3 className="font-serif text-3xl italic">{property.title}</h3>
            <p className="font-sans text-sm mt-2 tracking-widest uppercase">{property.price}</p>
          </div>
      </div>
    </motion.div>
  );
};

export const Properties: React.FC = () => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="properties" className="py-32 overflow-hidden relative bg-oat-milk">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="font-sans font-thin text-4xl md:text-6xl text-soft-charcoal tracking-wide">
            Catalogue of Calm
        </h2>
      </div>

      {/* Horizontal Scroll / Carousel Simulation */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-8 px-6 pb-20 snap-x snap-mandatory no-scrollbar"
      >
        {properties.map((prop, index) => (
          <PropertyCard 
            key={prop.id} 
            property={prop} 
            index={index}
            containerRef={containerRef}
            onClick={setActiveProperty} 
          />
        ))}
      </div>

      {/* Night Mode Gallery Overlay */}
      <AnimatePresence>
        {activeProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-night-sky text-oat-milk flex flex-col overflow-y-auto"
          >
             {/* Close Button */}
            <button 
                onClick={() => setActiveProperty(null)}
                className="fixed top-8 right-8 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
            >
                <X size={24} />
            </button>

            <div className="container mx-auto px-6 py-24">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="font-serif text-5xl md:text-7xl mb-4 italic text-terracotta">{activeProperty.title}</h2>
                    <p className="font-sans text-xl opacity-70 max-w-xl mb-12">{activeProperty.description}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeProperty.gallery.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}
                        >
                            <img src={img} alt="Gallery" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <button className="px-12 py-4 bg-terracotta text-white font-sans tracking-widest uppercase hover:bg-white hover:text-night-sky transition-colors duration-300">
                        Request to Book
                    </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
