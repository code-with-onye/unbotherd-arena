import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { Ethos } from './components/Ethos';
import { Properties } from './components/Properties';
import { Amenities } from './components/Amenities';
import { BookingCTA } from './components/BookingCTA';
import { Footer } from './components/Footer';
import { Soundscape } from './components/Soundscape';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-oat-milk overflow-hidden">
      {/* Global Custom Cursor */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Ambient Audio Controller */}
      <Soundscape />

      <main className="relative z-10">
        <Hero />
        <Ethos />
        <Properties />
        <Amenities />
        <BookingCTA />
      </main>

      <Footer />
    </div>
  );
};

export default App;