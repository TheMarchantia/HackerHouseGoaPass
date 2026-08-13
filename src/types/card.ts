export interface BuilderCardData {
  id: string;
  name: string;
  role: string;
  title: string;
  team?: string;
  xHandle?: string;
  igHandle?: string;
  avatarUrl: string;
  createdAt: number;
  cropPosition?: { x: number; y: number; scale: number };
}

export type DomainCategory = 'AI' | 'Cybersecurity' | 'Blockchain' | 'Hardware' | 'Fullstack' | 'General';

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
  zoom: number;
}
