import { StudioAccentColor, CameraAngle } from "@/store/useCreativesStore";

export interface CameraAngleData {
  id: CameraAngle;
  title: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
  description: string;
  sceneTitle: string;
  accent: StudioAccentColor;
}

export const CAMERA_ANGLES: Record<CameraAngle, CameraAngleData> = {
  LOW_WORSHIP: {
    id: "LOW_WORSHIP",
    title: "Low-Angle Worship Leader",
    lens: "35mm Prime",
    aperture: "f/1.4",
    shutter: "1/400s",
    iso: "ISO 400",
    description:
      "Dramatic upward perspective from the altar step. Stage rim lighting framing heartfelt praise.",
    sceneTitle: "WORSHIP IN SPIRIT & TRUTH",
    accent: "#FF5A1F",
  },
  WIDE_CROWD: {
    id: "WIDE_CROWD",
    title: "Wide Sanctuary Crowd",
    lens: "24mm Ultra-Wide",
    aperture: "f/2.8",
    shutter: "1/200s",
    iso: "ISO 800",
    description:
      "Balcony wide-angle view capturing the congregation united in celebration across Cambridge Hall.",
    sceneTitle: "UNITED AS ONE BODY",
    accent: "#2563EB",
  },
  STAGE_CLOSEUP: {
    id: "STAGE_CLOSEUP",
    title: "Candid Detail / Instrument Macro",
    lens: "85mm Portrait Macro",
    aperture: "f/1.8",
    shutter: "1/500s",
    iso: "ISO 320",
    description:
      "Emotional macro focus on acoustic guitar frets, worn Bible pages, and heartfelt worship moments.",
    sceneTitle: "IN TIMBRE & HARMONY",
    accent: "#EC4899",
  },
};

export interface LegoLayerDefinition {
  step: 1 | 2 | 3 | 4;
  id: string;
  name: string;
  role: string;
  branch: string;
  zIndex: number;
  explodeTranslateZ: number;
  description: string;
}

export const LEGO_LAYERS: LegoLayerDefinition[] = [
  {
    step: 1,
    id: "layer-base",
    name: "Base Canvas & Duotone Gradient",
    role: "Background Grid & Architectural Texture",
    branch: "Branch 02: Graphic Design",
    zIndex: 10,
    explodeTranslateZ: 0,
    description: "Clean millimeter grid with vibrant studio duotone gradient.",
  },
  {
    step: 2,
    id: "layer-subject",
    name: "Subject Cutout (From Chapter 2 RAW Shot)",
    role: "Worship Leader & Congregation Silhouette",
    branch: "Branch 01: Photography",
    zIndex: 20,
    explodeTranslateZ: 40,
    description: "Camera RAW frame extracted with high-contrast sticker stroke and halftone dot screen.",
  },
  {
    step: 3,
    id: "layer-typography",
    name: "Modular Kinetic Typography Bricks",
    role: "Editorial Display Title & Event Coordinates",
    branch: "Branch 02: Graphic Design",
    zIndex: 30,
    explodeTranslateZ: 80,
    description: "Bold 3D letterforms snapping into place: 'SUNDAY CELEBRATION // 10:00 AM'.",
  },
  {
    step: 4,
    id: "layer-stickers",
    name: "Color Accents & Studio Badges",
    role: "Tactile Ministry Stamps & Telemetry Barcode",
    branch: "Branch 04: Social Media",
    zIndex: 40,
    explodeTranslateZ: 120,
    description: "Star sparkles, ministry badges, barcode stamp, and official church emblem.",
  },
];
