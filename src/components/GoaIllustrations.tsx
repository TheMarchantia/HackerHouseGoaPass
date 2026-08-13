import React from 'react';

interface GoaBeachProps {
  className?: string;
  scrollProgress?: number; // 0 (top) to 1 (scrolled)
}

export const GoaBeachIllustration: React.FC<GoaBeachProps> = ({ className = '', scrollProgress = 0 }) => {
  // Sun sinks on scroll down into ocean horizon
  const sunY = 270 + scrollProgress * 200;
  const sunScale = 1 - scrollProgress * 0.12;

  // Birds soar directly across the face of the sun
  const birdScrollTranslateX = (scrollProgress * 550) % 700;
  const birdScrollTranslateY = -scrollProgress * 25;

  return (
    <div className={`relative w-full h-full select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl transition-all duration-300"
      >
        <defs>
          {/* Rich GTA VI Sunset Sky Gradient */}
          <linearGradient id="minSunsetSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#042017" />
            <stop offset="35%" stopColor="#1A0D26" />
            <stop offset="65%" stopColor="#8A133A" />
            <stop offset="100%" stopColor="#E64A19" />
          </linearGradient>

          {/* Ocean Sunset Glow */}
          <linearGradient id="minOceanGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF5722" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#B71C1C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#042017" />
          </linearGradient>

          {/* Sun Glow */}
          <radialGradient id="minSunAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFDD00" stopOpacity="1" />
            <stop offset="40%" stopColor="#FF5722" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#B71C1C" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1A0D26" stopOpacity="0" />
          </radialGradient>

          {/* Sand Beach Gradient Texture */}
          <linearGradient id="beachSandGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5D0A1" />
            <stop offset="40%" stopColor="#FFE0B2" />
            <stop offset="100%" stopColor="#E6B87D" />
          </linearGradient>

          {/* Sand Grain Stippling Texture Pattern */}
          <pattern id="sandGrainPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="12" r="1" fill="#D99B56" opacity="0.4" />
            <circle cx="24" cy="6" r="1.5" fill="#C48440" opacity="0.35" />
            <circle cx="35" cy="22" r="1" fill="#FCE8C7" opacity="0.5" />
            <circle cx="16" cy="30" r="1" fill="#B37332" opacity="0.3" />
            <circle cx="30" cy="36" r="1.5" fill="#D99B56" opacity="0.4" />
            <circle cx="5" cy="26" r="1.2" fill="#FCE8C7" opacity="0.45" />
          </pattern>

          {/* Wet Sand Ocean Tide Reflection */}
          <linearGradient id="wetSandTide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF5722" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#D81B60" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F5D0A1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dynamic Sky Backdrop */}
        <rect width="1200" height="580" fill="url(#minSunsetSky)" />

        {/* GIANT GLOWING SUN */}
        <g transform={`translate(600, ${sunY}) scale(${sunScale})`} className="transition-transform duration-200">
          <circle cx="0" cy="0" r="165" fill="url(#minSunAura)" />
          <circle cx="0" cy="0" r="92" fill="#FFDD00" />
        </g>

        {/* --- BOLD THICK FLYING BIRDS DIRECTLY IN FRONT OF THE SUN DISC --- */}
        <g
          className="transition-transform duration-300 ease-out"
          style={{ transform: `translate(${birdScrollTranslateX}px, ${birdScrollTranslateY}px)` }}
        >
          {/* Bold Flock soaring directly across the center of the sun */}
          <g transform="translate(310, 235)">
            <path className="animate-float-bird" d="M 0 0 Q 16 -16 32 0 Q 48 -16 64 0" stroke="#03160F" strokeWidth="6.5" strokeLinecap="round" fill="none" />
          </g>
          <g transform="translate(385, 215)">
            <path className="animate-float-bird" d="M 0 0 Q 14 -14 28 0 Q 42 -14 56 0" stroke="#03160F" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          </g>
          <g transform="translate(455, 250)">
            <path className="animate-float-bird" d="M 0 0 Q 12 -12 24 0 Q 36 -12 48 0" stroke="#03160F" strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>
          <g transform="translate(520, 225)">
            <path className="animate-float-bird" d="M 0 0 Q 11 -11 22 0 Q 33 -11 44 0" stroke="#03160F" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </g>
          <g transform="translate(580, 260)">
            <path className="animate-float-bird" d="M 0 0 Q 10 -10 20 0 Q 30 -10 40 0" stroke="#03160F" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        </g>

        {/* Ocean Horizon & Wave Lines */}
        <path d="M0 540 Q 300 528 600 540 T 1200 540 V660 H0 V540Z" fill="url(#minOceanGlow)" />

        {/* Animated Sunset Wave Reflections */}
        <path
          className="animate-wave"
          d="M0 560 Q 300 575 600 560 T 1200 560"
          stroke="#FFDD00"
          strokeWidth="4"
          opacity="0.9"
          fill="none"
        />
        <path
          className="animate-wave"
          d="M0 580 Q 300 568 600 580 T 1200 580"
          stroke="#FF007A"
          strokeWidth="3.5"
          opacity="0.75"
          fill="none"
        />
        <path
          className="animate-wave"
          d="M0 605 Q 300 620 600 605 T 1200 605"
          stroke="#FFFDF5"
          strokeWidth="2.5"
          opacity="0.6"
          fill="none"
        />

        {/* --- RICH TEXTURED BEACH & SAND SHORELINE --- */}

        {/* Base Sand Layer */}
        <path d="M0 640 C 350 620, 850 620, 1200 640 V 900 H 0 Z" fill="url(#beachSandGradient)" />

        {/* Sand Grain Stippling Texture Overlay */}
        <path d="M0 640 C 350 620, 850 620, 1200 640 V 900 H 0 Z" fill="url(#sandGrainPattern)" opacity="0.85" />

        {/* Wet Tide Shoreline Reflection Strip */}
        <path d="M0 635 C 350 615, 850 615, 1200 635 C 850 660, 350 660, 0 635 Z" fill="url(#wetSandTide)" />

        {/* Dune Ripple Texture Lines */}
        <path d="M0 680 Q 300 665 600 685 T 1200 680" stroke="#D99B56" strokeWidth="2.5" opacity="0.45" fill="none" />
        <path d="M0 730 Q 400 715 800 735 T 1200 730" stroke="#C48440" strokeWidth="2" opacity="0.35" fill="none" />
        <path d="M0 790 Q 350 775 750 795 T 1200 790" stroke="#B37332" strokeWidth="1.5" opacity="0.3" fill="none" />

        {/* --- GOA VILLAS & SHACKS (ARRANGED AT X=320 & X=760) --- */}
        <g transform="translate(320, 615)">
          <rect x="0" y="25" width="95" height="55" fill="#0C251C" stroke="#04120D" strokeWidth="3" />
          <polygon points="-12,25 47.5,-8 107,25" fill="#FF5722" stroke="#04120D" strokeWidth="2.5" />
          <path d="M14 38 A 10 10 0 0 1 34 38 V 70 H 14 Z" fill="#FFDD00" stroke="#04120D" strokeWidth="2" />
          <path d="M50 38 A 10 10 0 0 1 70 38 V 70 H 50 Z" fill="#FF007A" stroke="#04120D" strokeWidth="2" />
        </g>

        <g transform="translate(760, 610)">
          <rect x="0" y="30" width="100" height="60" fill="#0C251C" stroke="#04120D" strokeWidth="3" />
          <polygon points="-14,30 50,0 114,30" fill="#FFDD00" stroke="#04120D" strokeWidth="2.5" />
          <rect x="20" y="48" width="22" height="32" fill="#FF5722" stroke="#04120D" strokeWidth="2" />
          <rect x="55" y="48" width="22" height="32" fill="#FF007A" stroke="#04120D" strokeWidth="2" />
        </g>

        {/* --- 1. LEFT CORNER BEACH UMBRELLA & LOUNGER (X = 140, Y = 650) --- */}
        <g transform="translate(140, 650)">
          <line x1="45" y1="20" x2="35" y2="70" stroke="#042017" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M5 25 Q 45 -5 85 25 Z" fill="#FF007A" stroke="#042017" strokeWidth="2" />
          <path d="M25 21 Q 45 -2 65 21 Z" fill="#FFDD00" />
          <path d="M15 65 L 50 60 L 60 50" stroke="#FF5722" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>

        {/* --- 2. MIDDLE BEACH UMBRELLA (SHIFTED DOWN BY 10PX TO Y = 645) --- */}
        <g transform="translate(600, 645)">
          {/* Umbrella Pole */}
          <line x1="0" y1="-10" x2="-5" y2="45" stroke="#042017" strokeWidth="3.5" strokeLinecap="round" />
          {/* Striped Canopy */}
          <path d="M-40 -10 Q 0 -40 40 -10 Z" fill="#FF007A" stroke="#042017" strokeWidth="2" />
          <path d="M-20 -15 Q 0 -35 20 -15 Z" fill="#FFDD00" />
          <path d="M-5 -20 Q 0 -33 5 -20 Z" fill="#FF5722" />
          {/* Beach Lounger Chair */}
          <path d="M-30 35 L 5 30 L 15 18" stroke="#FF5722" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Leaning Surfboard */}
          <ellipse cx="25" cy="25" rx="5.5" ry="22" fill="#FFDD00" transform="rotate(18 25 25)" stroke="#042017" strokeWidth="2" />
        </g>

        {/* --- 3. RIGHT CORNER BEACH UMBRELLA & SURFBOARD (X = 1060, Y = 645) --- */}
        <g transform="translate(1060, 645)">
          <line x1="45" y1="20" x2="55" y2="72" stroke="#042017" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M5 25 Q 45 -5 85 25 Z" fill="#FF5722" stroke="#042017" strokeWidth="2" />
          <path d="M25 21 Q 45 -2 65 21 Z" fill="#FFDD00" />
          <ellipse cx="25" cy="55" rx="6" ry="24" fill="#FF007A" transform="rotate(-15 25 55)" stroke="#042017" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

export const TechNodeMotif: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="60" cy="20" r="5" fill="#FFDD00" />
      <circle cx="20" cy="80" r="5" fill="#FF007A" />
      <circle cx="100" cy="80" r="5" fill="#FFDD00" />
      <circle cx="60" cy="60" r="6" fill="#FFFDF5" stroke="#160424" strokeWidth="2" />
      <line x1="60" y1="20" x2="60" y2="60" stroke="#FFDD00" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="20" y1="80" x2="60" y2="60" stroke="#FF007A" strokeWidth="1.5" />
      <line x1="100" y1="80" x2="60" y2="60" stroke="#FFDD00" strokeWidth="1.5" />
    </svg>
  );
};
