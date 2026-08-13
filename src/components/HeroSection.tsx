import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { GoaBeachIllustration } from './GoaIllustrations';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / 650));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col justify-between overflow-hidden bg-[#07422D] select-none">
      {/* Dynamic Animated Vector Sunset Landscape (Sun sinks, birds soar, waves ripple on scroll) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <GoaBeachIllustration scrollProgress={scrollProgress} />
      </div>

      {/* Hero Content Stack */}
      <div className="relative z-10 max-w-4xl mx-auto text-center pt-10 pb-12 px-4 flex flex-col items-center justify-between min-h-[80vh] md:min-h-[85vh] my-auto">
        {/* Editorial Top Tagline */}
        <div className="inline-flex items-center gap-2 bg-[#04281B]/95 border border-[#FFDD00]/40 px-4 py-1.5 rounded-full text-xs font-mono text-[#FFDD00] shadow-md backdrop-blur-md">
          <span>BUILDER IDENTITY GENERATOR</span>
          <span className="text-white/40">•</span>
          <span className="text-white font-bold">28–31 OCT 2026</span>
        </div>

        {/* Editorial Poster Title */}
        <div className="relative my-6 select-none py-2">
          {/* HACKER HOUSE */}
          <h1 className="font-condensed text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-[#FFDD00] uppercase leading-none text-stroke-dark drop-shadow-[0_8px_0_rgba(0,0,0,0.9)]">
            HACKER HOUSE
          </h1>

          {/* Devanagari "गोवा" */}
          <div className="my-1 sm:my-2 flex items-center justify-center">
            <span className="font-devanagari text-6xl sm:text-8xl md:text-9xl text-[#FF007A] font-extrabold text-stroke-yellow drop-shadow-[0_6px_0_rgba(4,40,27,1)] transform -rotate-3 hover:rotate-0 transition-transform">
              गोवा
            </span>
          </div>

          {/* 2026 */}
          <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl font-bold tracking-widest text-[#FFFDF5] uppercase leading-none text-stroke-dark drop-shadow-[0_6px_0_rgba(0,0,0,0.8)]">
            2026
          </h2>
        </div>

        {/* Minimalist Primary CTA Button */}
        <div className="mt-8 mb-2">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 bg-[#FFDD00] hover:bg-white text-[#04281B] font-condensed text-2xl sm:text-3xl font-extrabold px-8 py-4 rounded-2xl border-2 border-[#04281B] shadow-[4px_4px_0px_0px_#04281B] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-150"
          >
            <span>CREATE YOUR BUILDER IDENTITY</span>
            <ArrowDown className="w-6 h-6 text-[#FF007A] group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
