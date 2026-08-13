import React, { useState, useRef, useEffect } from 'react';
import { BuilderCardData } from '../types/card';
import { BuilderCardFront } from './BuilderCardFront';
import { BuilderCardBack } from './BuilderCardBack';
import { RotateCw } from 'lucide-react';

interface CardPreviewProps {
  card: BuilderCardData;
  activeSide: 'front' | 'back';
  onSideChange: (side: 'front' | 'back') => void;
  onChoosePhoto?: () => void;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  card,
  activeSide,
  onSideChange,
  onChoosePhoto,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.45);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [displaySide, setDisplaySide] = useState<'front' | 'back'>(activeSide);

  // Measure parent container width and dynamically scale the 1080x1080 canvas
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 1080);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Handle 1.0s GPU-accelerated 3D flip animation trigger cleanly on mobile & desktop
  const triggerFlipTo = (targetSide: 'front' | 'back') => {
    if (isFlipping || targetSide === displaySide) {
      if (targetSide !== activeSide) onSideChange(targetSide);
      return;
    }

    setIsFlipping(true);
    onSideChange(targetSide);

    // Switch displayed face at the exact 3D rotation midpoint (500ms) when edge-on at 90deg
    setTimeout(() => {
      setDisplaySide(targetSide);
    }, 500);

    // Reset flip animation state at 1000ms
    setTimeout(() => {
      setIsFlipping(false);
    }, 1000);
  };

  const handleToggleSide = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const nextSide = displaySide === 'front' ? 'back' : 'front';
    triggerFlipTo(nextSide);
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 select-none">
      {/* Top FRONT | BACK | FLIP Toggle Controls */}
      <div className="flex items-center gap-2 bg-[#04281B] border-2 border-[#FFDD00]/50 rounded-xl p-1.5 shadow-xl z-10">
        <button
          type="button"
          onClick={() => triggerFlipTo('front')}
          className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase transition-all ${
            displaySide === 'front'
              ? 'bg-[#FFDD00] text-[#04281B]'
              : 'text-[#FFFDF5]/70 hover:text-white'
          }`}
        >
          FRONT
        </button>
        <button
          type="button"
          onClick={() => triggerFlipTo('back')}
          className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase transition-all ${
            displaySide === 'back'
              ? 'bg-[#FF007A] text-white'
              : 'text-[#FFFDF5]/70 hover:text-white'
          }`}
        >
          BACK
        </button>

        <button
          type="button"
          onClick={(e) => handleToggleSide(e)}
          className="px-3.5 py-2 bg-[#07422D] hover:bg-[#095238] border border-[#FFDD00]/40 rounded-lg text-[#FFDD00] font-mono text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 shadow-md"
          title="Flip Card in 3D"
        >
          <RotateCw className={`w-4 h-4 text-[#FF007A] ${isFlipping ? 'animate-spin' : ''}`} />
          <span>FLIP CARD</span>
        </button>
      </div>

      {/* Clean 1:1 Aspect-Square Card Preview Canvas */}
      <div className="w-full max-w-[640px] px-1 flex justify-center perspective-1200">
        <div
          ref={containerRef}
          className="w-full aspect-square relative rounded-2xl border-4 border-[#04281B] bg-[#07422D] cursor-pointer group shadow-2xl overflow-hidden [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]"
          onClick={(e) => handleToggleSide(e)}
          title="Click to flip pass"
        >
          {/* Absolutely Centered 1080x1080 Canvas Wrapper with 60FPS Hardware GPU Layer */}
          <div
            className={`w-[1080px] h-[1080px] absolute left-1/2 top-1/2 shrink-0 ${
              isFlipping ? 'animate-card-flip-slow' : ''
            }`}
            style={{
              '--card-scale': scale,
              transform: `translate3d(-50%, -50%, 0) scale(${scale})`,
              WebkitTransform: `translate3d(-50%, -50%, 0) scale(${scale})`,
              transformOrigin: '50% 50%',
              WebkitTransformOrigin: '50% 50%',
              willChange: 'transform, opacity',
            } as React.CSSProperties}
          >
            {displaySide === 'front' ? (
              <div className="w-full h-full">
                <BuilderCardFront card={card} onChoosePhoto={onChoosePhoto} />
              </div>
            ) : (
              <div className="w-full h-full">
                <BuilderCardBack card={card} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
