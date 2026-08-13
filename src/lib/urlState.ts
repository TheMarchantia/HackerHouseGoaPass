import LZString from 'lz-string';
import { BuilderCardData } from '../types/card';

const STORAGE_PREFIX = 'hhgoa_card_';

export function saveCardToLocal(card: BuilderCardData) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${card.id}`, JSON.stringify(card));
  } catch (e) {
    console.warn('LocalStorage save error', e);
  }
}

export function getCardFromLocal(id: string): BuilderCardData | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('LocalStorage read error', e);
  }
  return null;
}

export function encodeCardToUrlPayload(card: BuilderCardData): string {
  try {
    // Create a compact representation.
    // NOTE: avatarUrl (base64 photo data) is deliberately excluded here.
    // Embedding it previously produced URLs hundreds of KB long, which
    // browsers/Twitter truncate or reject outright. The photo travels via
    // localStorage (see getCardFromLocal/id param) or, for actual sharing,
    // as a directly-attached file (see handleShareToX in App.tsx).
    const compactObj = {
      i: card.id,
      n: card.name,
      r: card.role,
      t: card.title,
      tm: card.team || '',
      x: card.xHandle || '',
      ig: card.igHandle || '',
      c: card.createdAt,
    };
    const jsonStr = JSON.stringify(compactObj);
    return LZString.compressToEncodedURIComponent(jsonStr);
  } catch (e) {
    console.error('Failed to encode card data', e);
    return '';
  }
}

export function decodeCardFromUrlPayload(payload: string): BuilderCardData | null {
  try {
    const jsonStr = LZString.decompressFromEncodedURIComponent(payload);
    if (!jsonStr) return null;
    const obj = JSON.parse(jsonStr);
    return {
      id: obj.i,
      name: obj.n,
      role: obj.r,
      title: obj.t,
      team: obj.tm || undefined,
      xHandle: obj.x || undefined,
      igHandle: obj.ig || undefined,
      avatarUrl: '',
      createdAt: obj.c || Date.now(),
    };
  } catch (e) {
    console.error('Failed to decode card data payload', e);
    return null;
  }
}

export function getCardShareUrl(card: BuilderCardData): string {
  // Always use standard origin in browser or window.location.origin
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://hh-goa-2026.vercel.app';
  const payload = encodeCardToUrlPayload(card);
  // Also save to localStorage locally
  saveCardToLocal(card);
  return `${origin}/?card=${payload}&id=${card.id}`;
}
