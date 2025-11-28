import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Soundscape: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // Initialize Audio
  useEffect(() => {
    // Using a soft rain/nature loop
    audioRef.current = new Audio(
      "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    // Clear any existing fade intervals
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
    }

    if (!isPlaying) {
      // Start Playing
      audioRef.current
        .play()
        .catch((e) => console.warn("Audio autoplay blocked", e));
      setIsPlaying(true);

      // Fade In
      fadeIntervalRef.current = window.setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.3) {
          // Increase volume gradually
          audioRef.current.volume = Math.min(
            0.3,
            audioRef.current.volume + 0.02
          );
        } else {
          if (fadeIntervalRef.current)
            window.clearInterval(fadeIntervalRef.current);
        }
      }, 100);
    } else {
      // Fade Out then Pause
      setIsPlaying(false);

      fadeIntervalRef.current = window.setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.02) {
          // Decrease volume gradually
          audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.02);
        } else {
          // Stop completely
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.volume = 0;
          }
          if (fadeIntervalRef.current)
            window.clearInterval(fadeIntervalRef.current);
        }
      }, 100);
    }
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="font-sans text-[10px] tracking-[0.2em] uppercase text-soft-charcoal bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
          >
            Ambience
          </motion.span>
        )}
      </AnimatePresence>

      <button
        onClick={toggleSound}
        className={`
          relative w-12 h-12 flex items-center justify-center rounded-full 
          backdrop-blur-md border transition-all duration-500
          ${
            isPlaying
              ? "bg-terracotta/10 border-terracotta text-terracotta"
              : "bg-white/50 border-soft-charcoal/20 text-soft-charcoal hover:bg-white"
          }
        `}
      >
        {isPlaying ? (
          <Volume2 size={20} strokeWidth={1.5} />
        ) : (
          <VolumeX size={20} strokeWidth={1.5} />
        )}

        {/* Pulse effect when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-terracotta animate-ping opacity-20" />
        )}
      </button>
    </motion.div>
  );
};


