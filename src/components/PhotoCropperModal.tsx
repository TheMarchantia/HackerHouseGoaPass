import React, { useRef, useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Move } from 'lucide-react';

interface PhotoCropperModalProps {
  imageSrc: string;
  onConfirm: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

export const PhotoCropperModal: React.FC<PhotoCropperModalProps> = ({
  imageSrc,
  onConfirm,
  onCancel,
}) => {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      drawCanvas(img, 1, { x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Redraw canvas whenever zoom or offset changes
  useEffect(() => {
    if (imageRef.current) {
      drawCanvas(imageRef.current, zoom, offset);
    }
  }, [zoom, offset]);

  const drawCanvas = (img: HTMLImageElement, currentZoom: number, currentOffset: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed canvas size for high-res output
    const size = 500;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Background
    ctx.fillStyle = '#07422D';
    ctx.fillRect(0, 0, size, size);

    ctx.save();

    // Move to center
    ctx.translate(size / 2 + currentOffset.x, size / 2 + currentOffset.y);
    ctx.scale(currentZoom, currentZoom);

    // Draw image centered
    const aspect = img.width / img.height;
    let drawW = size;
    let drawH = size;
    if (aspect > 1) {
      drawH = size;
      drawW = size * aspect;
    } else {
      drawW = size;
      drawH = size / aspect;
    }

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  };

  // Drag Handlers (Touch & Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setOffset({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleConfirm = () => {
    if (canvasRef.current) {
      const croppedUrl = canvasRef.current.toDataURL('image/png', 0.95);
      onConfirm(croppedUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#04281B]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#07422D] border-4 border-[#FFDD00] rounded-3xl p-6 w-full max-w-md shadow-2xl relative my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#FFDD00]/30 pb-4 mb-4">
          <div>
            <h3 className="font-condensed text-2xl font-bold text-[#FFDD00] tracking-wider uppercase flex items-center gap-2">
              <Move className="w-5 h-5 text-[#FF007A]" />
              CROP & POSITION PORTRAIT
            </h3>
            <p className="text-xs text-[#FFFDF5]/70 font-mono mt-0.5">
              Drag to center face inside the card portrait frame
            </p>
          </div>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-[#04281B] hover:bg-[#FF007A] text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas Preview with Square Rounded-Corner Mask Overlay (Matching Card Portrait Frame) */}
        <div className="relative w-full aspect-square bg-[#04281B] rounded-2xl overflow-hidden border-2 border-[#FFDD00]/40 shadow-inner flex items-center justify-center cursor-move select-none">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="w-full h-full object-cover"
          />

          {/* Mask Frame Overlay (Simulates Badge Square Portrait Framing) */}
          <div className="absolute inset-0 pointer-events-none border-[20px] border-[#04281B]/85 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl border-4 border-[#FFDD00] shadow-[0_0_0_9999px_rgba(4,40,27,0.75)] flex items-center justify-center">
              <div className="text-[10px] font-mono text-[#FFDD00] uppercase tracking-widest bg-[#04281B]/80 px-2.5 py-1 rounded-md border border-[#FFDD00]/40">
                HERO PORTRAIT FRAME
              </div>
            </div>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="mt-5 space-y-4">
          {/* Zoom Slider */}
          <div className="flex items-center gap-3">
            <ZoomOut className="w-4 h-4 text-[#FFFDF5]/70" />
            <input
              type="range"
              min="0.6"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-[#FFDD00] cursor-pointer"
            />
            <ZoomIn className="w-4 h-4 text-[#FFFDF5]/70" />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(2.5, z + 0.15))}
                className="bg-[#04281B] hover:bg-[#095238] border border-[#FFDD00]/30 text-[#FFDD00] p-2 rounded-lg text-xs font-mono flex items-center gap-1"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
                className="bg-[#04281B] hover:bg-[#095238] border border-[#FFDD00]/30 text-[#FFDD00] p-2 rounded-lg text-xs font-mono flex items-center gap-1"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setOffset({ x: 0, y: 0 });
                }}
                className="bg-[#04281B] hover:bg-[#095238] border border-[#FFDD00]/30 text-white p-2 rounded-lg text-xs font-mono flex items-center gap-1"
                title="Reset Position"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">RESET</span>
              </button>
            </div>

            {/* Action CTAs */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="bg-[#04281B] hover:bg-[#8A133A] text-white border border-white/20 px-3 py-2 rounded-lg font-mono text-xs"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-[#FFDD00] hover:bg-white text-[#04281B] font-mono text-xs font-extrabold px-4 py-2.5 rounded-lg border-2 border-[#04281B] shadow-md flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>CONFIRM PORTRAIT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
