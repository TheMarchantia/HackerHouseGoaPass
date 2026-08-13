import React from 'react';
import { User, Upload, RefreshCw } from 'lucide-react';
import { BuilderCardData } from '../types/card';

interface BuilderCardFrontProps {
  card: BuilderCardData;
  onChoosePhoto?: () => void;
  id?: string;
}

export const BuilderCardFront: React.FC<BuilderCardFrontProps> = ({
  card,
  onChoosePhoto,
  id = 'builder-card-front',
}) => {
  const name = card.name || 'YOUR NAME';
  const role = card.role || 'BUILDER / ROLE';
  const title = card.title || 'THE PROTOCOL BREAKER';
  const team = card.team;
  const builderId = card.id || 'HH26-X7K9P2';
  const xHandle = card.xHandle;

  return (
    <div
      id={id}
      className="w-[1080px] h-[1080px] bg-[#07422D] text-[#FFFDF5] font-sans relative overflow-hidden flex flex-col justify-between select-none shadow-2xl rounded-3xl border-4 border-[#FFDD00]"
    >
      {/* --- RICH GOA BEACH & SUNSET VECTOR LANDSCAPE BACKDROP (SYMMETRICAL CENTER ALIGNMENT) --- */}
      <svg
        viewBox="0 0 1080 1080"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sunset Sky Gradient */}
          <linearGradient id="richSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#04281B" />
            <stop offset="35%" stopColor="#0B5C3F" />
            <stop offset="65%" stopColor="#8A133A" />
            <stop offset="100%" stopColor="#E64A19" />
          </linearGradient>

          {/* Ocean Horizon Glow */}
          <linearGradient id="richOceanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF5722" opacity="0.95" />
            <stop offset="50%" stopColor="#AD1457" opacity="0.85" />
            <stop offset="100%" stopColor="#04281B" />
          </linearGradient>

          {/* Warm Golden Beach Sand Gradient */}
          <linearGradient id="richSandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5D0A1" />
            <stop offset="50%" stopColor="#FFE0B2" />
            <stop offset="100%" stopColor="#E6B87D" />
          </linearGradient>
        </defs>

        {/* Rich Sunset Sky Layer */}
        <rect width="1080" height="640" fill="url(#richSkyGrad)" />

        {/* Giant Yellow Graphic Sun - EXACT HORIZONTAL CENTER (X=540, Y=220) */}
        <g transform="translate(540, 220)">
          <circle cx="0" cy="0" r="175" fill="#FFDD00" />
          <circle cx="0" cy="0" r="175" stroke="#FF5722" strokeWidth="6" strokeDasharray="10 10" opacity="0.6" fill="none" />
          {/* Symmetrical Sun Rays */}
          <g stroke="#FFDD00" strokeWidth="3.5" opacity="0.75">
            <line x1="0" y1="-225" x2="0" y2="-190" />
            <line x1="-160" y1="-160" x2="-132" y2="-132" />
            <line x1="160" y1="-160" x2="132" y2="-132" />
            <line x1="-225" y1="0" x2="-190" y2="0" />
            <line x1="225" y1="0" x2="190" y2="0" />
          </g>
        </g>

        {/* EXACT STACKED LOGO (HACKER / गोवा / HOUSE): LOCKED AT X=540 CENTER */}
        <g transform="translate(540, 195)">
          {/* HACKER */}
          <text
            x="0"
            y="-30"
            textAnchor="middle"
            fill="#FFDD00"
            stroke="#031D14"
            strokeWidth="8"
            paintOrder="stroke fill"
            fontSize="94"
            fontFamily="'Bebas Neue', sans-serif"
            fontWeight="900"
            letterSpacing="3"
          >
            HACKER
          </text>

          {/* HOUSE */}
          <text
            x="0"
            y="65"
            textAnchor="middle"
            fill="#FFDD00"
            stroke="#031D14"
            strokeWidth="8"
            paintOrder="stroke fill"
            fontSize="94"
            fontFamily="'Bebas Neue', sans-serif"
            fontWeight="900"
            letterSpacing="3"
          >
            HOUSE
          </text>

          {/* Devanagari "गोवा" in exact center gap */}
          <g transform="rotate(-3 0 15)">
            <text
              x="0"
              y="25"
              textAnchor="middle"
              fill="#FF007A"
              stroke="#FFDD00"
              strokeWidth="5"
              paintOrder="stroke fill"
              fontSize="72"
              fontFamily="'Yatra One', 'Rozha One', serif"
              fontWeight="900"
            >
              गोवा
            </text>
          </g>
        </g>

        {/* Ocean Horizon & Sunset Wave Lines */}
        <path d="M0 450 Q 270 435 540 450 T 1080 450 V 640 H 0 Z" fill="url(#richOceanGrad)" />
        <path d="M0 470 Q 270 485 540 470 T 1080 470" stroke="#FFDD00" strokeWidth="4" opacity="0.9" fill="none" />
        <path d="M0 495 Q 270 480 540 495 T 1080 495" stroke="#FF007A" strokeWidth="3.5" opacity="0.8" fill="none" />
        <path d="M0 520 Q 270 535 540 520 T 1080 520" stroke="#FFFDF5" strokeWidth="2.5" opacity="0.65" fill="none" />

        {/* Warm Golden Sand Beach Shoreline Layer */}
        <path d="M0 590 C 300 570, 780 570, 1080 590 V 1080 H 0 Z" fill="url(#richSandGrad)" />
        <path d="M0 630 Q 350 610 700 635 T 1080 630" stroke="#D99B56" strokeWidth="3" opacity="0.6" fill="none" />

        {/* --- GOA VILLAS & BEACH SHACK ILLUSTRATION (BALANCED SYMMETRY) --- */}
        {/* Left Goa Villa */}
        <g transform="translate(60, 520)">
          <rect x="0" y="30" width="130" height="75" fill="#04281B" stroke="#04120D" strokeWidth="3" />
          <polygon points="-16,30 65,-15 146,30" fill="#FF5722" stroke="#04120D" strokeWidth="3" />
          <rect x="20" y="50" width="30" height="45" fill="#FFDD00" />
          <rect x="70" y="50" width="30" height="45" fill="#FF007A" />
        </g>

        {/* Right Goa Villa */}
        <g transform="translate(890, 515)">
          <rect x="0" y="35" width="135" height="80" fill="#04281B" stroke="#04120D" strokeWidth="3" />
          <polygon points="-18,35 67.5,-12 153,35" fill="#FFDD00" stroke="#04120D" strokeWidth="3" />
          <rect x="25" y="55" width="32" height="45" fill="#FF5722" />
          <rect x="75" y="55" width="32" height="45" fill="#FF007A" />
        </g>

        {/* Goa Beach Shack & Bar */}
        <g transform="translate(710, 560)">
          <rect x="0" y="25" width="135" height="60" fill="#04281B" stroke="#FFDD00" strokeWidth="2.5" />
          <polygon points="-15,25 67.5,-12 150,25" fill="#FF007A" />
          <rect x="18" y="40" width="99" height="16" fill="#FFDD00" />
          <text x="67.5" y="52" textAnchor="middle" fill="#04281B" fontSize="11" fontFamily="monospace" fontWeight="bold">GOA BEACH</text>
        </g>

        {/* Beach Umbrellas & Surfboard */}
        <g transform="translate(220, 580)">
          <line x1="25" y1="0" x2="20" y2="45" stroke="#04281B" strokeWidth="3.5" />
          <path d="M-15 0 Q 25 -30 65 0 Z" fill="#FF007A" stroke="#04281B" strokeWidth="2" />
          <path d="M5 -5 Q 25 -25 45 -5 Z" fill="#FFDD00" />
        </g>
        <ellipse cx="680" cy="600" rx="8" ry="32" fill="#FFDD00" transform="rotate(16 680 600)" stroke="#04281B" strokeWidth="2.5" />

        {/* Tropics Palm Groves framing sides SYMMETRICALLY */}
        <path d="M120 720 Q 40 380 180 120" stroke="#031D14" strokeWidth="20" strokeLinecap="round" />
        <path d="M180 120 Q 80 60 -10 130" stroke="#0E6B4B" strokeWidth="11" strokeLinecap="round" />
        <path d="M180 120 Q 290 50 350 120" stroke="#0E6B4B" strokeWidth="11" strokeLinecap="round" />

        <path d="M960 720 Q 1040 380 900 120" stroke="#031D14" strokeWidth="20" strokeLinecap="round" />
        <path d="M900 120 Q 800 60 740 130" stroke="#0E6B4B" strokeWidth="11" strokeLinecap="round" />
        <path d="M900 120 Q 1000 50 1070 120" stroke="#0E6B4B" strokeWidth="11" strokeLinecap="round" />

        {/* Birds in sky */}
        <path d="M410 100 Q 425 85 440 100 Q 455 85 470 100" stroke="#031D14" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <path d="M475 80 Q 487 68 499 80 Q 511 68 523 80" stroke="#031D14" strokeWidth="4.5" fill="none" strokeLinecap="round" />

        {/* --- ORNATE GOAN/INDIAN BOTANICAL BORDER FRAME --- */}
        <rect x="24" y="24" width="1032" height="1032" rx="20" stroke="#FFDD00" strokeWidth="8" fill="none" />
        <rect x="36" y="36" width="1008" height="1008" rx="14" stroke="#FFDD00" strokeWidth="2" strokeDasharray="6 6" fill="none" />

        {/* Corner Botanical Leaves & Swirls */}
        <path d="M 60 70 C 140 40, 200 140, 280 80" stroke="#FFDD00" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 80 150 Q 160 80 220 150" stroke="#FF007A" strokeWidth="6" fill="none" strokeLinecap="round" />

        <path d="M 1020 70 C 940 40, 880 140, 800 80" stroke="#FFDD00" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 1000 150 Q 920 80 860 150" stroke="#FF007A" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>

      {/* --- TOP EDITORIAL POSTER HEADER --- */}
      <div className="relative z-10 w-full pt-10 px-12 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-extrabold text-[#FFDD00] tracking-widest uppercase">
              HACKER HOUSE GOA
            </span>
            <span className="text-white/40">•</span>
            <span className="font-mono text-base font-extrabold text-[#FF007A] tracking-widest uppercase">
              2026
            </span>
          </div>
          <p className="font-mono text-sm font-bold text-[#FFFDF5]/90 tracking-wider mt-1 uppercase">
            GOA, INDIA • 28–31 OCT 2026
          </p>
        </div>

        <div className="bg-[#04281B]/95 border-2 border-[#FFDD00] px-5 py-2.5 rounded-xl text-right shadow-xl">
          <span className="font-mono text-xs font-bold text-[#FF007A] uppercase block tracking-wider">
            BUILDER ID
          </span>
          <span className="font-mono text-lg font-extrabold text-[#FFDD00]">
            {builderId}
          </span>
        </div>
      </div>

      {/* --- CENTER SECTION: HERO PORTRAIT MATHEMICALLY CENTERED ON X=540 --- */}
      <div className="relative z-10 w-full my-auto flex flex-col items-center justify-center pt-16">
        {/* HERO PORTRAIT: PERFECT 380x390 BALANCED DIMENSIONS & HORIZONTAL CENTER */}
        <div
          onClick={(e) => {
            if (onChoosePhoto) {
              e.stopPropagation();
              onChoosePhoto();
            }
          }}
          className="relative w-[380px] h-[390px] mb-2 cursor-pointer group hover:scale-[1.03] transition-transform mx-auto"
          title="Click to choose or replace photo"
        >
          {/* Double Border Frame */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FFDD00] via-[#FF007A] to-[#FF5722] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
            <div className="w-full h-full rounded-[18px] overflow-hidden bg-[#04281B] border-4 border-[#04281B] flex items-center justify-center relative">
              {card.avatarUrl ? (
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                  style={{
                    backgroundImage: `url("${card.avatarUrl}")`,
                  }}
                >
                  <img
                    src={card.avatarUrl}
                    alt={name}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover relative z-10"
                    style={{
                      transform: `scale(${card.cropPosition?.scale || 1}) translate(${card.cropPosition?.x || 0}px, ${card.cropPosition?.y || 0}px)`,
                    }}
                  />
                  {/* Change Photo Hover Overlay */}
                  <div className="absolute inset-0 bg-[#04281B]/70 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col items-center justify-center text-[#FFDD00] gap-1.5 p-2">
                    <RefreshCw className="w-9 h-9 text-[#FF007A]" />
                    <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#FFDD00]">
                      CHANGE PHOTO
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-[#FFDD00] gap-2 p-4 text-center">
                  <Upload className="w-16 h-16 text-[#FF007A] group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-sm font-extrabold uppercase tracking-widest text-[#FFDD00]">
                    CLICK TO ADD PHOTO
                  </span>
                  <span className="font-mono text-xs text-[#FFE0B2]/80">
                    Tap anywhere on this box to choose your portrait
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- LOWER BUILDER IDENTITY TYPOGRAPHY SECTION --- */}
      <div className="relative z-10 w-full bg-[#04281B] border-t-4 border-[#FFDD00] px-12 py-8 flex flex-col gap-4">
        {/* Name & Stack Row */}
        <div className="flex items-end justify-between border-b border-[#FFDD00]/40 pb-4">
          <div>
            <h2 className="font-condensed text-6xl sm:text-7xl font-extrabold text-white uppercase tracking-wide leading-none text-shadow-md">
              {name}
            </h2>
            <div className="flex items-center gap-3 mt-2.5">
              <span className="font-mono text-2xl font-extrabold text-[#FF007A] uppercase tracking-wider text-shadow-sm">
                {role}
              </span>
              {team && (
                <>
                  <span className="text-white/40">•</span>
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#FFE0B2] uppercase tracking-wider text-shadow-sm">
                    {team}
                  </span>
                </>
              )}
            </div>
          </div>

          {xHandle && (
            <div className="font-mono text-base font-extrabold text-[#FFDD00] tracking-wider text-right">
              {xHandle}
            </div>
          )}
        </div>

        {/* Builder Title & Event Details Row */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="font-mono text-xs font-extrabold text-[#FF007A] uppercase tracking-widest block mb-0.5">
              BUILDER TITLE
            </span>
            <h3 className="font-condensed text-4xl sm:text-5xl font-extrabold text-[#FFDD00] uppercase tracking-wider text-shadow-md">
              {title}
            </h3>
          </div>

          <div className="text-right font-mono text-sm font-extrabold text-[#FFE0B2]">
            <p className="text-[#FFDD00]">28–31 OCT 2026</p>
            <p className="text-[#FFFDF5]/90">GOA, INDIA</p>
          </div>
        </div>
      </div>
    </div>
  );
};
