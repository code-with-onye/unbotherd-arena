import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-oat-milk py-12 border-t border-soft-charcoal/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-50 text-xs font-sans tracking-widest uppercase">
        <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Unbothered Arena
        </div>
        <div className="flex gap-8">
            <a href="#" className="hover:text-terracotta transition-colors">Instagram</a>
            <a href="#" className="hover:text-terracotta transition-colors">Email</a>
            <a href="#" className="hover:text-terracotta transition-colors">Legal</a>
        </div>
      </div>
    </footer>
  );
};