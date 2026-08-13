import React from 'react';
import { BuilderCardData } from '../types/card';

interface BuilderCardBackProps {
  card: BuilderCardData;
  id?: string;
}

export const BuilderCardBack: React.FC<BuilderCardBackProps> = ({
  card,
  id = 'builder-card-back',
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
      {/* --- ORNATE GOAN FLORAL ARCH BORDER FRAME --- */}
      <svg
        viewBox="0 0 1080 1080"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Dotted Yellow Border */}
        <rect x="24" y="24" width="1032" height="1032" rx="20" stroke="#FFDD00" strokeWidth="8" fill="none" />
        <rect x="36" y="36" width="1008" height="1008" rx="14" stroke="#FFDD00" strokeWidth="2" strokeDasharray="6 6" fill="none" />

        {/* Central Ornate Arch Outline */}
        <path
          d="M 240 100 Q 540 30 840 100 Q 1000 240 1000 540 Q 1000 840 840 980 Q 540 1050 240 980 Q 80 840 80 540 Q 80 240 240 100 Z"
          stroke="#FFDD00"
          strokeWidth="6"
          fill="#063826"
          fillOpacity="0.85"
        />

        {/* Botanical Swirl Filigrees */}
        <path d="M 100 120 C 180 80, 240 200, 320 140 C 380 90, 440 160, 480 100" stroke="#FFDD00" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 120 220 Q 200 140 260 220" stroke="#FF007A" strokeWidth="6" fill="none" strokeLinecap="round" />

        <path d="M 980 120 C 900 80, 840 200, 760 140 C 700 90, 640 160, 600 100" stroke="#FFDD00" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 960 220 Q 880 140 820 220" stroke="#FF007A" strokeWidth="6" fill="none" strokeLinecap="round" />

        <path d="M 100 960 C 180 1000, 240 880, 320 940 C 380 990, 440 920, 480 980" stroke="#FFDD00" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 120 860 Q 200 940 260 860" stroke="#FF007A" strokeWidth="6" fill="none" strokeLinecap="round" />

        <path d="M 980 960 C 900 1000, 840 880, 760 940 C 700 990, 640 920, 600 980" stroke="#FFDD00" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 960 860 Q 880 940 820 860" stroke="#FF007A" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>

      {/* --- TOP HEADER --- */}
      <div className="relative z-10 w-full pt-10 px-14 flex items-center justify-between border-b border-[#FFDD00]/30 pb-4">
        <div>
          <h2 className="font-condensed text-3xl font-extrabold text-[#FFDD00] uppercase tracking-wider">
            HACKER HOUSE GOA
          </h2>
          <p className="font-mono text-xs text-[#FFFDF5]/70 tracking-widest uppercase mt-0.5">
            28–31 OCT 2026 • GOA, INDIA
          </p>
        </div>

        <div className="text-right">
          <span className="font-mono text-[10px] font-bold text-[#FF007A] uppercase tracking-widest block">
            BUILDER ID
          </span>
          <span className="font-mono text-lg font-extrabold text-[#FFDD00]">
            {builderId}
          </span>
        </div>
      </div>

      {/* --- CENTER TYPOGRAPHY & IDENTITY BLOCK --- */}
      <div className="relative z-10 my-auto text-center space-y-6 max-w-2xl mx-auto px-6 py-6">
        {/* Exact Stacked Logo Style — rendered as SVG text (matches BuilderCardFront technique)
            rather than CSS -webkit-text-stroke, which the PNG export engine doesn't support and
            was silently dropping, making downloads look different from the live preview. */}
        <div className="relative select-none my-2 mx-auto w-full max-w-[720px]">
          <svg viewBox="0 0 900 260" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text
              x="450"
              y="95"
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
            <text
              x="450"
              y="190"
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
            <g transform="rotate(-3 450 145)">
              <text
                x="450"
                y="155"
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
          </svg>
        </div>

        {/* Framework & Selection Section */}
        <div className="space-y-2 pt-2">
          <span className="inline-block bg-[#FF007A] text-white font-mono text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
            SELECTION FRAMEWORK & TIMELINE
          </span>
          <h3 className="font-sans text-3xl font-extrabold text-white tracking-wide mt-1">
            The Road to <span className="text-[#FFDD00]">247</span>
          </h3>
          <p className="font-sans text-xs text-[#FFFDF5]/80 max-w-md mx-auto leading-relaxed">
            How builders earn a seat at Hacker House Goa 2026. The trials, the criteria, and the journey to the beach.
          </p>
        </div>

        {/* Divider Bar */}
        <div className="w-24 h-1 bg-[#FFDD00] mx-auto rounded-full" />

        {/* Builder Data Block */}
        <div className="space-y-2">
          <h2 className="font-condensed text-5xl font-extrabold text-white uppercase tracking-wide">
            {name}
          </h2>
          <p className="font-mono text-xl font-extrabold text-[#FF007A] uppercase tracking-wider">
            {role}
          </p>
          <p className="font-condensed text-3xl font-extrabold text-[#FFDD00] uppercase tracking-wider text-shadow-sm">
            {title}
          </p>
          {team && (
            <p className="font-mono text-2xl sm:text-3xl font-extrabold text-[#FFE0B2] uppercase tracking-wider text-shadow-sm">
              TEAM: {team}
            </p>
          )}
          {xHandle && (
            <p className="font-mono text-xs font-bold text-[#FFFDF5]/80">
              {xHandle}
            </p>
          )}
        </div>
      </div>

      {/* --- FOOTER STRIP --- */}
      <div className="relative z-10 w-full pt-4 px-14 pb-8 border-t border-[#FFDD00]/30 flex items-center justify-between font-mono text-xs font-bold text-[#FFDD00]">
        <span>GOA, INDIA</span>
        <span>28–31 OCT 2026</span>
        <span className="text-[#FF007A]">#FrameInGoa</span>
      </div>
    </div>
  );
};
