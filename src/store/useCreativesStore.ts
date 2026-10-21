import { create } from "zustand";

export type StudioAccentColor =
  | "#FF5A1F" // Tangerine Studio Orange
  | "#EC4899" // Viva Magenta / Berry
  | "#2563EB" // Cobalt Electric
  | "#FACC15" // Cyber Canary Yellow
  | "#10B981" // Acrylic Mint / Emerald
  | "#8B5CF6"; // Ultraviolet Purple

export type ChapterId =
  | "01-STUDIO"
  | "02-SHUTTER"
  | "03-LEGO-DESIGN"
  | "04-SHOWCASE"
  | "05-FB-FEED"
  | "06-JOIN";

export type CameraAngle = "LOW_WORSHIP" | "WIDE_CROWD" | "STAGE_CLOSEUP";

export type LegoStep = 0 | 1 | 2 | 3 | 4;

export type WriteupTone =
  | "JESUS_ON_THE_MOVE"
  | "MORNING_PRAYER"
  | "THIS_IS_YOUR_HOME"
  | "CHURCH_ADVISORY";

export interface CreativesState {
  activeAccent: StudioAccentColor;
  activeChapter: ChapterId;
  cameraAngle: CameraAngle;
  photoCaptured: boolean;
  capturedAt: number | null;
  legoAssemblyStep: LegoStep;
  is3dExploded: boolean;
  showGridGuides: boolean;
  expandedCardId: string | null;
  writeupTone: WriteupTone;
  selectedBranches: string[];
  
  // Actions
  setActiveAccent: (color: StudioAccentColor) => void;
  setActiveChapter: (chapter: ChapterId) => void;
  setCameraAngle: (angle: CameraAngle) => void;
  setPhotoCaptured: (captured: boolean) => void;
  triggerShutter: () => void;
  setLegoAssemblyStep: (step: LegoStep) => void;
  nextLegoStep: () => void;
  prevLegoStep: () => void;
  setIs3dExploded: (exploded: boolean) => void;
  toggle3dExploded: () => void;
  setShowGridGuides: (show: boolean) => void;
  toggleGridGuides: () => void;
  setExpandedCardId: (id: string | null) => void;
  setWriteupTone: (tone: WriteupTone) => void;
  setSelectedBranches: (branches: string[]) => void;
  toggleBranch: (branch: string) => void;
}

export const STUDIO_PALETTE: {
  hex: StudioAccentColor;
  name: string;
  tag: string;
  textColor: string;
}[] = [
  { hex: "#FF5A1F", name: "Tangerine Orange", tag: "SWATCH-01", textColor: "#FFFFFF" },
  { hex: "#EC4899", name: "Viva Magenta", tag: "SWATCH-02", textColor: "#FFFFFF" },
  { hex: "#2563EB", name: "Cobalt Electric", tag: "SWATCH-03", textColor: "#FFFFFF" },
  { hex: "#FACC15", name: "Canary Yellow", tag: "SWATCH-04", textColor: "#121316" },
  { hex: "#10B981", name: "Emerald Green", tag: "SWATCH-05", textColor: "#FFFFFF" },
  { hex: "#8B5CF6", name: "Ultraviolet Purple", tag: "SWATCH-06", textColor: "#FFFFFF" },
];

export const useCreativesStore = create<CreativesState>((set) => ({
  activeAccent: "#FF5A1F",
  activeChapter: "01-STUDIO",
  cameraAngle: "LOW_WORSHIP",
  photoCaptured: false,
  capturedAt: null,
  legoAssemblyStep: 4,
  is3dExploded: false,
  showGridGuides: false,
  expandedCardId: null,
  writeupTone: "JESUS_ON_THE_MOVE",
  selectedBranches: [
    "Photography & Event Documentation",
    "Graphic Design & Visual Identity",
  ],

  setActiveAccent: (color) => set({ activeAccent: color }),
  setActiveChapter: (chapter) => set({ activeChapter: chapter }),
  setCameraAngle: (angle) => set({ cameraAngle: angle }),
  setPhotoCaptured: (captured) => set({ photoCaptured: captured }),
  triggerShutter: () =>
    set({
      photoCaptured: true,
      capturedAt: Date.now(),
      legoAssemblyStep: 2, // Auto-progress to cutout stage on capture
    }),
  setLegoAssemblyStep: (step) => set({ legoAssemblyStep: step }),
  nextLegoStep: () =>
    set((state) => ({
      legoAssemblyStep: Math.min(state.legoAssemblyStep + 1, 4) as LegoStep,
    })),
  prevLegoStep: () =>
    set((state) => ({
      legoAssemblyStep: Math.max(state.legoAssemblyStep - 1, 0) as LegoStep,
    })),
  setIs3dExploded: (exploded) => set({ is3dExploded: exploded }),
  toggle3dExploded: () => set((state) => ({ is3dExploded: !state.is3dExploded })),
  setShowGridGuides: (show) => set({ showGridGuides: show }),
  toggleGridGuides: () => set((state) => ({ showGridGuides: !state.showGridGuides })),
  setExpandedCardId: (id) => set({ expandedCardId: id }),
  setWriteupTone: (tone) => set({ writeupTone: tone }),
  setSelectedBranches: (branches) => set({ selectedBranches: branches }),
  toggleBranch: (branch) =>
    set((state) => ({
      selectedBranches: state.selectedBranches.includes(branch)
        ? state.selectedBranches.filter((b) => b !== branch)
        : [...state.selectedBranches, branch],
    })),
}));
