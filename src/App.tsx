import React, { useState, useEffect, useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { CardForm } from './components/CardForm';
import { CardPreview } from './components/CardPreview';
import { BuilderCardFront } from './components/BuilderCardFront';
import { BuilderCardBack } from './components/BuilderCardBack';
import { exportCardAsPng, dataUrlToBlob } from './lib/cardExporter';
import { getRandomTitle } from './lib/titles';
import { generateBuilderId } from './lib/idGenerator';
import { decodeCardFromUrlPayload, getCardFromLocal } from './lib/urlState';
import { BuilderCardData } from './types/card';
import { Download, Share2, Sparkles } from 'lucide-react';
import saveAs from 'file-saver';
import JSZip from 'jszip';

export const DEFAULT_CARD_DATA: BuilderCardData = {
  id: generateBuilderId(),
  name: '',
  role: '',
  title: 'THE PROTOCOL BREAKER',
  team: '',
  xHandle: '',
  avatarUrl: '',
  createdAt: Date.now(),
};

export const App: React.FC = () => {
  const [cardData, setCardData] = useState<BuilderCardData>(DEFAULT_CARD_DATA);
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [isExportingFront, setIsExportingFront] = useState(false);
  const [isExportingBack, setIsExportingBack] = useState(false);
  const [isExportingBoth, setIsExportingBoth] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const triggerChoosePhotoRef = useRef<(() => void) | null>(null);
  const generatorRef = useRef<HTMLDivElement>(null);

  // Load generated card from URL parameters if present on initial mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const cardPayload = params.get('card');
      const cardId = params.get('id');

      if (cardPayload) {
        const decoded = decodeCardFromUrlPayload(cardPayload);
        if (decoded) {
          setCardData(decoded);
          return;
        }
      }

      if (cardId) {
        const localCard = getCardFromLocal(cardId);
        if (localCard) {
          setCardData(localCard);
        }
      }
    } catch (e) {
      console.error('URL card state parsing error', e);
    }
  }, []);

  const handleUpdateCard = (updated: Partial<BuilderCardData>) => {
    setCardData((prev) => ({ ...prev, ...updated }));
  };

  const handleGenerateTitle = () => {
    const newTitle = getRandomTitle(cardData.role, cardData.title);
    setCardData((prev) => ({ ...prev, title: newTitle }));
  };

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChoosePhotoFromCard = () => {
    if (triggerChoosePhotoRef.current) {
      triggerChoosePhotoRef.current();
    }
  };

  const handleExportFront = async () => {
    setIsExportingFront(true);
    try {
      const frontEl = document.getElementById('staging-builder-card-front') || document.getElementById('builder-card-front');
      if (!frontEl) {
        setIsExportingFront(false);
        return;
      }

      const dataUrl = await exportCardAsPng(frontEl, `${cardData.name || 'builder'}_HHGOA_Front.png`);
      saveAs(dataUrlToBlob(dataUrl), `${cardData.name || 'builder'}_HHGOA_Front.png`);
    } catch (err) {
      console.error('Front export error:', err);
    } finally {
      setIsExportingFront(false);
    }
  };

  const handleExportBack = async () => {
    setIsExportingBack(true);
    try {
      const backEl = document.getElementById('staging-builder-card-back') || document.getElementById('builder-card-back');
      if (!backEl) {
        setIsExportingBack(false);
        return;
      }

      const dataUrl = await exportCardAsPng(backEl, `${cardData.name || 'builder'}_HHGOA_Back.png`);
      saveAs(dataUrlToBlob(dataUrl), `${cardData.name || 'builder'}_HHGOA_Back.png`);
    } catch (err) {
      console.error('Back export error:', err);
    } finally {
      setIsExportingBack(false);
    }
  };

  const handleExportBoth = async () => {
    setIsExportingBoth(true);
    try {
      const frontEl = document.getElementById('staging-builder-card-front') || document.getElementById('builder-card-front');
      const backEl = document.getElementById('staging-builder-card-back') || document.getElementById('builder-card-back');

      if (!frontEl || !backEl) {
        setIsExportingBoth(false);
        return;
      }

      const frontDataUrl = await exportCardAsPng(frontEl, 'front.png');
      const backDataUrl = await exportCardAsPng(backEl, 'back.png');

      if (frontDataUrl && backDataUrl) {
        const zip = new JSZip();
        const cleanName = (cardData.name || 'builder').replace(/[^a-zA-Z0-9_-]/g, '_');
        zip.file(`${cleanName}-front.png`, dataUrlToBlob(frontDataUrl));
        zip.file(`${cleanName}-back.png`, dataUrlToBlob(backDataUrl));

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `${cleanName}-HHGOA-Pass.zip`);
      }
    } catch (err) {
      console.error('Export both error:', err);
    } finally {
      setIsExportingBoth(false);
    }
  };

  const handleShareToX = async () => {
    const text = `Claimed my Builder Pass for Hacker House Goa 2026! 🌊⚡\n\nName: ${cardData.name || 'Builder'}\nRole: ${cardData.role || 'Hacker'}\nTitle: ${cardData.title}\n\n#HHGoa2026 #FrameInGoa`;

    setIsSharing(true);
    try {
      const frontEl = document.getElementById('staging-builder-card-front') || document.getElementById('builder-card-front');
      const backEl = document.getElementById('staging-builder-card-back') || document.getElementById('builder-card-back');
      const cleanName = (cardData.name || 'builder').replace(/[^a-zA-Z0-9_-]/g, '_');

      if (frontEl && backEl) {
        const [frontDataUrl, backDataUrl] = await Promise.all([
          exportCardAsPng(frontEl, `${cleanName}_HHGOA_Front.png`),
          exportCardAsPng(backEl, `${cleanName}_HHGOA_Back.png`),
        ]);
        const files = [
          new File([dataUrlToBlob(frontDataUrl)], `${cleanName}_HHGOA_Front.png`, { type: 'image/png' }),
          new File([dataUrlToBlob(backDataUrl)], `${cleanName}_HHGOA_Back.png`, { type: 'image/png' }),
        ];

        // Prefer attaching both real generated images directly via the native share sheet
        // (works on mobile, which is where most people will use this per the brief).
        if (navigator.canShare && navigator.canShare({ files })) {
          await navigator.share({ files, title: 'Hacker House Goa 2026 Builder Pass', text });
          return;
        }
      }
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') {
        // User cancelled the native share sheet - don't fall back to opening a second share flow.
        setIsSharing(false);
        return;
      }
      console.warn('Native image share failed, falling back to text-only tweet intent:', err);
    } finally {
      setIsSharing(false);
    }

    // Desktop / unsupported-browser fallback: text-only tweet intent.
    // Deliberately not attaching a link back to the app here - that link can't carry the
    // actual card image (see urlState.ts) and its og:image is a static generic placeholder,
    // so it would show the wrong preview rather than none.
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#07422D] text-[#FFFDF5] font-sans antialiased selection:bg-[#FFDD00] selection:text-[#04281B] relative">
      {/* On-Screen Staging Container */}
      <div
        id="staging-container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1080px',
          height: '2200px',
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -9999,
          overflow: 'hidden',
        }}
      >
        <BuilderCardFront card={cardData} id="staging-builder-card-front" />
        <BuilderCardBack card={cardData} id="staging-builder-card-back" />
      </div>

      {/* Editorial Landing Hero */}
      <HeroSection onStart={scrollToGenerator} />

      {/* Main Builder Generator Section */}
      <section
        ref={generatorRef}
        className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-[#07422D] via-[#053323] to-[#04281B]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Builder Details Form */}
          <div className="lg:col-span-5 w-full">
            <CardForm
              card={cardData}
              onChange={handleUpdateCard}
              onGenerateTitle={handleGenerateTitle}
              onBindChoosePhoto={(fn) => {
                triggerChoosePhotoRef.current = fn;
              }}
            />
          </div>

          {/* Right Column: Card Preview & Clean Action Hierarchy */}
          <div className="lg:col-span-7 w-full flex flex-col items-center gap-6">
            <div className="w-full flex items-center justify-between border-b border-[#FFDD00]/30 pb-3">
              <span className="font-mono text-xs font-bold text-[#FF007A] uppercase tracking-widest">
                LIVE CARD PREVIEW
              </span>
              <span className="font-mono text-xs font-bold text-[#FFDD00]">
                1080×1080 HIGH-RES
              </span>
            </div>

            <CardPreview
              card={cardData}
              activeSide={activeSide}
              onSideChange={setActiveSide}
              onChoosePhoto={handleChoosePhotoFromCard}
            />

            {/* Clear Action Hierarchy Buttons */}
            <div className="w-full max-w-[640px] space-y-3 pt-2">
              {/* Row 1: Primary Action (DOWNLOAD FRONT) + SHARE TO X */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleExportFront}
                  disabled={isExportingFront}
                  className="w-full py-4 bg-[#FFDD00] hover:bg-white text-[#04281B] font-condensed text-xl font-extrabold rounded-2xl border-2 border-[#04281B] shadow-[4px_4px_0px_0px_#04281B] flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
                >
                  <Download className="w-5 h-5 text-[#FF007A]" />
                  <span>{isExportingFront ? 'EXPORTING...' : 'DOWNLOAD FRONT'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareToX}
                  disabled={isSharing}
                  className="w-full py-4 bg-[#FF007A] hover:bg-[#E0006B] text-white font-condensed text-xl font-extrabold rounded-2xl border-2 border-[#04281B] shadow-[4px_4px_0px_0px_#04281B] flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
                >
                  <Share2 className="w-5 h-5" />
                  <span>{isSharing ? 'PREPARING...' : 'SHARE TO X'}</span>
                </button>
              </div>

              {/* Row 2: Centered DOWNLOAD BACK & DOWNLOAD BOTH Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleExportBack}
                  disabled={isExportingBack}
                  className="py-3 bg-[#04281B] hover:bg-[#07422D] text-[#FFDD00] border border-[#FFDD00]/40 font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-[#FF007A]" />
                  <span>{isExportingBack ? 'EXPORTING...' : 'DOWNLOAD BACK'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportBoth}
                  disabled={isExportingBoth}
                  className="py-3 bg-[#04281B] hover:bg-[#07422D] text-[#FFDD00] border border-[#FFDD00]/40 font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-[#FF007A]" />
                  <span>{isExportingBoth ? 'EXPORTING...' : 'DOWNLOAD BOTH'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="w-full bg-[#04281B] border-t-2 border-[#FFDD00]/30 py-8 px-4 text-center font-mono text-xs text-[#FFFDF5]/70">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#FFDD00]">
            <Sparkles className="w-4 h-4 text-[#FF007A]" />
            <span className="font-bold">HACKER HOUSE GOA 2026</span>
          </div>
          <p>© 2:47PM STUDIO • GOA, INDIA</p>
          <div className="flex items-center gap-4 text-[#FFDD00] font-bold">
            <a href="https://hhgoa.com" target="_blank" rel="noreferrer" className="hover:underline">
              HHGOA.COM
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
