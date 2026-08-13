import React, { useRef, useState, useEffect } from 'react';
import { Upload, Camera, Crop, RefreshCw, Trash2 } from 'lucide-react';
import { BuilderCardData } from '../types/card';
import { PhotoCropperModal } from './PhotoCropperModal';
import { processImageFile } from '../lib/heicConverter';

interface CardFormProps {
  card: BuilderCardData;
  onChange: (updated: Partial<BuilderCardData>) => void;
  onGenerateTitle: () => void;
  onBindChoosePhoto?: (fn: () => void) => void;
}

export const CardForm: React.FC<CardFormProps> = ({
  card,
  onChange,
  onGenerateTitle,
  onBindChoosePhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);

  useEffect(() => {
    if (onBindChoosePhoto) {
      onBindChoosePhoto(() => {
        fileInputRef.current?.click();
      });
    }
  }, [onBindChoosePhoto]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessingImage(true);
      try {
        const result = await processImageFile(file);
        if (result) {
          setRawImageSrc(result);
          setIsCropperOpen(true);
        }
      } catch (err) {
        console.error('Image processing failed', err);
      } finally {
        setIsProcessingImage(false);
        e.target.value = '';
      }
    }
  };

  const handleConfirmCroppedImage = (croppedUrl: string) => {
    onChange({
      avatarUrl: croppedUrl,
    });
    setIsCropperOpen(false);
  };

  const handleRemovePhoto = () => {
    onChange({
      avatarUrl: '',
      cropPosition: undefined,
    });
    setRawImageSrc(null);
  };

  return (
    <div className="w-full bg-[#04281B] border-2 border-[#FFDD00]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#FFFDF5] select-none space-y-8">
      {/* Editorial Header */}
      <div className="flex items-center justify-between border-b border-[#FFDD00]/30 pb-4">
        <div>
          <span className="font-mono text-xs font-bold text-[#FF007A] uppercase tracking-widest block">
            ✦ BUILD YOUR IDENTITY
          </span>
          <h2 className="font-condensed text-3xl font-extrabold text-[#FFDD00] uppercase tracking-wide">
            BUILDER DETAILS
          </h2>
        </div>
      </div>

      {/* 01 — PHOTO SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-sm font-bold text-[#FFDD00] uppercase tracking-wider">
            01 — PHOTO
          </h3>
          {card.avatarUrl && (
            <span className="font-mono text-xs font-bold text-[#FF007A] bg-[#07422D] px-3 py-1 rounded-full border border-[#FF007A]/40">
              PHOTO READY
            </span>
          )}
        </div>

        {/* Hidden Inputs */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          type="file"
          ref={cameraInputRef}
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Photo Selection & Management UI */}
        {card.avatarUrl ? (
          <div className="bg-[#07422D] border-2 border-[#FFDD00]/40 rounded-2xl p-4 space-y-3">
            {/* Top Row: Thumbnail + Status */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-[#FFDD00] shrink-0 shadow-md">
                <img src={card.avatarUrl} alt="Portrait" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs font-bold text-white truncate">Portrait Uploaded</p>
                <p className="font-mono text-[11px] text-[#FFE0B2]/80 truncate">Ready on Builder Pass</p>
              </div>
            </div>

            {/* Bottom Row: Responsive Clean Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#FFDD00]/20">
              <button
                type="button"
                onClick={() => {
                  if (rawImageSrc) setIsCropperOpen(true);
                  else fileInputRef.current?.click();
                }}
                className="py-2.5 px-2 bg-[#04281B] hover:bg-[#095238] text-[#FFDD00] border border-[#FFDD00]/40 font-mono text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                title="Edit Crop"
              >
                <Crop className="w-3.5 h-3.5 text-[#FFDD00]" />
                <span>EDIT CROP</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-2.5 px-2 bg-[#FFDD00] hover:bg-white text-[#04281B] font-mono text-[11px] font-extrabold rounded-xl border border-[#04281B] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                title="Replace Photo"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#04281B]" />
                <span>REPLACE</span>
              </button>

              <button
                type="button"
                onClick={handleRemovePhoto}
                className="py-2.5 px-2 bg-[#04281B] hover:bg-[#8A133A] text-red-300 hover:text-white border border-red-500/30 font-mono text-[11px] font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
                title="Remove Photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>REMOVE</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isProcessingImage}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 bg-[#07422D] hover:bg-[#095238] border-2 border-dashed border-[#FFDD00]/50 p-4 rounded-2xl font-mono text-xs font-bold text-[#FFDD00] transition-colors disabled:opacity-50"
            >
              <Upload className="w-4 h-4 text-[#FF007A]" />
              <span>{isProcessingImage ? 'PROCESSING...' : 'CHOOSE PHOTO'}</span>
            </button>
            <button
              type="button"
              disabled={isProcessingImage}
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center justify-center gap-2 bg-[#07422D] hover:bg-[#095238] border-2 border-dashed border-[#FFDD00]/50 p-4 rounded-2xl font-mono text-xs font-bold text-[#FFDD00] transition-colors disabled:opacity-50"
            >
              <Camera className="w-4 h-4 text-[#FF007A]" />
              <span>TAKE PHOTO</span>
            </button>
          </div>
        )}
      </div>

      {/* 02 — BUILDER SECTION */}
      <div className="space-y-4 pt-2">
        <h3 className="font-mono text-sm font-bold text-[#FFDD00] uppercase tracking-wider">
          02 — BUILDER
        </h3>

        <div className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block font-mono text-xs font-bold text-[#FFE0B2] uppercase mb-1">
              Builder Name
            </label>
            <input
              type="text"
              value={card.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. ALEX RIVERA"
              className="w-full bg-[#07422D] border-2 border-[#FFDD00]/30 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#FFDD00]"
            />
          </div>

          {/* STACK / ROLE */}
          <div>
            <label className="block font-mono text-xs font-bold text-[#FFE0B2] uppercase mb-1">
              Stack / Role
            </label>
            <input
              type="text"
              value={card.role}
              onChange={(e) => onChange({ role: e.target.value })}
              placeholder="e.g. AI × CYBERSECURITY"
              className="w-full bg-[#07422D] border-2 border-[#FFDD00]/30 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#FFDD00]"
            />
          </div>

          {/* TEAM NAME (OPTIONAL) */}
          <div>
            <label className="block font-mono text-xs font-bold text-[#FFE0B2] uppercase mb-1">
              Team Name (optional)
            </label>
            <input
              type="text"
              value={card.team || ''}
              onChange={(e) => onChange({ team: e.target.value })}
              placeholder="e.g. BYTEFORCE"
              className="w-full bg-[#07422D] border-2 border-[#FFDD00]/30 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#FFDD00]"
            />
          </div>

          {/* X / HANDLE (OPTIONAL) */}
          <div>
            <label className="block font-mono text-xs font-bold text-[#FFE0B2] uppercase mb-1">
              X / Handle (optional)
            </label>
            <input
              type="text"
              value={card.xHandle || ''}
              onChange={(e) => onChange({ xHandle: e.target.value })}
              placeholder="e.g. @alex_builds"
              className="w-full bg-[#07422D] border-2 border-[#FFDD00]/30 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#FFDD00]"
            />
          </div>
        </div>
      </div>

      {/* 03 — YOUR TITLE SECTION */}
      <div className="space-y-3 pt-2">
        <h3 className="font-mono text-sm font-bold text-[#FFDD00] uppercase tracking-wider">
          03 — YOUR TITLE
        </h3>

        <div className="bg-[#07422D] border-2 border-[#FFDD00]/40 rounded-2xl p-4 flex items-center justify-between">
          <span className="font-condensed text-2xl font-extrabold text-[#FFDD00] uppercase tracking-wide">
            {card.title || 'THE PROTOCOL BREAKER'}
          </span>

          <button
            type="button"
            onClick={onGenerateTitle}
            className="flex items-center gap-1.5 bg-[#FF007A] hover:bg-[#D80068] text-white font-mono text-xs font-bold px-3.5 py-2 rounded-xl border border-[#04281B] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>GENERATE ANOTHER</span>
          </button>
        </div>
      </div>

      {/* Photo Cropper Modal */}
      {isCropperOpen && rawImageSrc && (
        <PhotoCropperModal
          imageSrc={rawImageSrc}
          onCancel={() => setIsCropperOpen(false)}
          onConfirm={handleConfirmCroppedImage}
        />
      )}
    </div>
  );
};
