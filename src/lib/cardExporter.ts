import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function exportCardAsPng(element: HTMLElement, filename: string): Promise<string> {
  const parentWrapper = element.closest('[style*="scale"]') as HTMLElement | null;
  const flipContainer = element.closest('.animate-card-flip-slow') as HTMLElement | null;

  const originalTransform = parentWrapper ? parentWrapper.style.transform : '';
  const originalWebkitTransform = parentWrapper ? parentWrapper.style.webkitTransform : '';
  const hadFlipClass = flipContainer ? flipContainer.classList.contains('animate-card-flip-slow') : false;

  try {
    // 1. Temporarily pause flip animation and reset scale transform to 1:1 1080x1080
    if (hadFlipClass && flipContainer) {
      flipContainer.classList.remove('animate-card-flip-slow');
    }
    if (parentWrapper) {
      parentWrapper.style.transform = 'none';
      parentWrapper.style.webkitTransform = 'none';
    }

    // 2. Ensure all images inside target element are loaded
    const images = Array.from(element.querySelectorAll('img'));
    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth > 0) {
          return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
        }
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 300);
        });
      })
    );

    // 3. Ensure fonts are ready
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Small delay to allow DOM computed styles to settle at 1080x1080 1:1 scale
    await new Promise((r) => setTimeout(r, 60));

    // PRIMARY ENGINE: html2canvas directly on on-screen element
    try {
      const canvas = await html2canvas(element, {
        scale: 1.0,
        width: 1080,
        height: 1080,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#07422D',
        logging: false,
        imageTimeout: 5000,
        windowWidth: 1080,
        windowHeight: 1080,
      });

      const canvasDataUrl = canvas.toDataURL('image/png', 1.0);
      if (canvasDataUrl && canvasDataUrl.length > 5000) {
        return canvasDataUrl;
      }
    } catch (h2cError) {
      console.warn('html2canvas engine warning, falling back to html-to-image:', h2cError);
    }

    // FALLBACK ENGINE: html-to-image
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 1.0,
      width: 1080,
      height: 1080,
      cacheBust: false,
      skipFonts: true,
      style: {
        transform: 'none',
        webkitTransform: 'none',
        borderRadius: '0px',
        opacity: '1',
        visibility: 'visible',
      },
    });

    return dataUrl;
  } catch (error) {
    console.error('Error generating 1080x1080 PNG image:', error);
    throw error;
  } finally {
    if (hadFlipClass && flipContainer) {
      flipContainer.classList.add('animate-card-flip-slow');
    }
    if (parentWrapper) {
      parentWrapper.style.transform = originalTransform;
      parentWrapper.style.webkitTransform = originalWebkitTransform;
    }
  }
}

export async function downloadPng(element: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await exportCardAsPng(element, filename);
  saveAs(dataUrl, filename);
}

export async function downloadBothAsZip(
  frontElement: HTMLElement,
  backElement: HTMLElement,
  baseFilename: string
): Promise<void> {
  const frontDataUrl = await exportCardAsPng(frontElement, `${baseFilename}-front.png`);
  const backDataUrl = await exportCardAsPng(backElement, `${baseFilename}-back.png`);

  const zip = new JSZip();

  const frontBlob = dataUrlToBlob(frontDataUrl);
  const backBlob = dataUrlToBlob(backDataUrl);

  const cleanName = baseFilename.replace(/[^a-zA-Z0-9_-]/g, '_') || 'builder';
  zip.file(`${cleanName}-front.png`, frontBlob);
  zip.file(`${cleanName}-back.png`, backBlob);

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${cleanName}-HHGOA-Pass.zip`);
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}
