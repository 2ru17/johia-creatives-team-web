"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Crosshair,
  BatteryCharging,
  Zap,
  CheckCircle2,
  ArrowDown,
  ZoomIn,
  Sliders,
  Grid,
  RotateCw,
  Focus,
  Maximize2,
} from "lucide-react";
import { useCreativesStore, CameraAngle } from "@/store/useCreativesStore";
import { CAMERA_ANGLES } from "@/data/posterLegoLayers";
import { Viewfinder3DScene } from "@/components/canvas/Viewfinder3DScene";
import { PaintDripDivider } from "@/components/navigation/PaintDripDivider";
import { cn } from "@/lib/utils";

// Web Audio mechanical shutter synthesizer
function playShutterSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext })
        .webkitAudioContext;
    const ctx = new AudioContext();

    // Mirror flip click
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "square";
    osc1.frequency.setValueAtTime(320, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.04);
    gain1.gain.setValueAtTime(0.5, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.05);

    // Shutter curtain snap
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(800, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);
      gain2.gain.setValueAtTime(0.6, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.07);
    }, 45);
  } catch {
    // Graceful silence if browser blocks audio autoplay
  }
}

// Focus Lock Confirmation Beep
function playFocusBeep() {
  if (typeof window === "undefined") return;
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext })
        .webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch {}
}

const ISO_OPTIONS = [100, 400, 800, 1600, 3200] as const;
const APERTURE_OPTIONS = ["f/1.4", "f/2.8", "f/5.6", "f/11"] as const;
const SHUTTER_OPTIONS = ["1/125s", "1/250s", "1/500s", "1/1000s"] as const;
const ZOOM_LEVELS = [1, 1.4, 2, 2.8] as const;

export function Chapter2CameraAngles() {
  const {
    activeAccent,
    cameraAngle,
    setCameraAngle,
    photoCaptured,
    triggerShutter,
  } = useCreativesStore();

  // Interactive Camera Settings States
  const [focusRing, setFocusRing] = useState<number>(50); // 0-100, 45-55 is sweet spot
  const [focusMode, setFocusMode] = useState<"AF" | "MF">("AF");
  const [reticlePos, setReticlePos] = useState<{ x: number; y: number }>({ x: 50, y: 46 });
  const [zoom, setZoom] = useState<(typeof ZOOM_LEVELS)[number]>(1);
  const [showRuleOfThirds, setShowRuleOfThirds] = useState<boolean>(true);
  const [horizonTilt, setHorizonTilt] = useState<number>(0);
  const [selectedIso, setSelectedIso] = useState<number>(400);
  const [selectedAperture, setSelectedAperture] = useState<string>("f/1.4");
  const [selectedShutter, setSelectedShutter] = useState<string>("1/400s");
  const [showControlsDrawer, setShowControlsDrawer] = useState<boolean>(false);

  // Shutter action states
  const [isFlashing, setIsFlashing] = useState(false);
  const [apertureClosing, setApertureClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const activeAngleData = CAMERA_ANGLES[cameraAngle];
  const isFocusLocked = focusMode === "AF" || (focusRing >= 44 && focusRing <= 56);
  const focusBlurAmount = isFocusLocked ? 0 : Math.abs(focusRing - 50) * 0.16;

  // Exposure calculation for brightness preview
  const brightnessMultiplier = 0.85 + Math.log2(selectedIso / 400) * 0.12;

  const handleSnap = useCallback(() => {
    playShutterSound();
    setApertureClosing(true);
    setIsFlashing(true);
    triggerShutter();

    setTimeout(() => {
      setApertureClosing(false);
    }, 180);

    setTimeout(() => {
      setIsFlashing(false);
    }, 450);
  }, [triggerShutter]);

  // Click-to-focus on viewport
  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = Math.max(15, Math.min(85, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(15, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));
    setReticlePos({ x, y });
    playFocusBeep();
  };

  const handleAutoLockFocus = () => {
    setFocusRing(50);
    playFocusBeep();
  };

  // Keyboard shortcut: Spacebar triggers shutter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        handleSnap();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSnap]);

  return (
    <section
      id="chapter-2"
      ref={containerRef}
      className="relative min-h-screen py-20 bg-[#121316] text-[#FAF7F2] overflow-hidden"
    >
      {/* Crisp White Shutter Flash Overlay */}
      {isFlashing && (
        <motion.div
          initial={{ opacity: 0.95 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 bg-white z-50 pointer-events-none"
        />
      )}

      {/* Background Subdued Tech Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-zinc-700 bg-zinc-900 mb-3 text-xs font-mono font-bold text-zinc-300">
            <Camera className="w-3.5 h-3.5" style={{ color: activeAccent }} />
            <span>CHAPTER 02 // MULTI-ANGLE CAMERA VIEWFINDER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            EVERY MOMENT,
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(to right, ${activeAccent}, #FAF7F2)`,
              }}
            >
              EVERY PERSPECTIVE.
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base font-sans max-w-2xl">
            Sunday event coverage is dynamic. Dial camera angles, adjust manual focus, zoom into the
            stage, and click to focus before triggering the shutter.
          </p>
        </div>

        {/* 1. Camera Angle Presets Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(CAMERA_ANGLES) as CameraAngle[]).map((angleKey) => {
              const angle = CAMERA_ANGLES[angleKey];
              const isSelected = cameraAngle === angleKey;
              return (
                <button
                  key={angleKey}
                  onClick={() => {
                    setCameraAngle(angleKey);
                    playFocusBeep();
                  }}
                  className={cn(
                    "px-3.5 py-1.5 rounded-sm font-mono text-xs font-bold border transition-all duration-200 flex items-center gap-2 cursor-pointer",
                    isSelected
                      ? "bg-[#FAF7F2] text-[#121316] border-[#FAF7F2] shadow-sm"
                      : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-200"
                  )}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isSelected ? activeAccent : "#71717A",
                    }}
                  />
                  <span>{angle.title}</span>
                  <span className="text-[10px] opacity-75 font-normal hidden sm:inline">
                    [{angle.lens}]
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Toggle Controls Drawer */}
          <button
            onClick={() => setShowControlsDrawer(!showControlsDrawer)}
            className="px-3 py-1.5 rounded-sm font-mono text-xs font-bold border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" style={{ color: activeAccent }} />
            <span>{showControlsDrawer ? "Hide Camera Controls" : "Adjust Camera Controls"}</span>
          </button>
        </div>

        {/* 2. Interactive Manual Controls Strip (Focus, Zoom, Alignment, Level) */}
        <div className="p-4 mb-4 rounded-sm border border-zinc-800 bg-zinc-950/90 font-mono text-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Control A: Manual Focus Ring Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Focus className="w-3.5 h-3.5 text-zinc-500" />
                  <span>FOCUS RING:</span>
                </span>
                <span
                  className={cn(
                    "font-bold",
                    isFocusLocked ? "text-emerald-400" : "text-amber-400"
                  )}
                >
                  {isFocusLocked ? "SHARP (LOCKED)" : `BLUR (${focusRing}%)`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={focusRing}
                  onChange={(e) => {
                    setFocusMode("MF");
                    setFocusRing(Number(e.target.value));
                  }}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
                <button
                  onClick={handleAutoLockFocus}
                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] text-zinc-300 shrink-0 cursor-pointer"
                >
                  AF Lock
                </button>
              </div>
            </div>

            {/* Control B: Zoom Multiplier Buttons */}
            <div className="space-y-1.5">
              <span className="text-zinc-400 text-[11px] flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5 text-zinc-500" />
                <span>ZOOM / MAGNIFY:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {ZOOM_LEVELS.map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoom(z)}
                    className={cn(
                      "flex-1 py-1 rounded text-[11px] font-bold border transition-colors cursor-pointer",
                      zoom === z
                        ? "bg-[#FAF7F2] text-[#121316] border-[#FAF7F2]"
                        : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-white"
                    )}
                  >
                    {z}x
                  </button>
                ))}
              </div>
            </div>

            {/* Control C: Alignment & Grid Guides */}
            <div className="space-y-1.5">
              <span className="text-zinc-400 text-[11px] flex items-center gap-1">
                <Grid className="w-3.5 h-3.5 text-zinc-500" />
                <span>COMPOSITION GUIDES:</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRuleOfThirds(!showRuleOfThirds)}
                  className={cn(
                    "flex-1 py-1 px-2 rounded text-[11px] font-bold border transition-colors cursor-pointer text-center",
                    showRuleOfThirds
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-zinc-900 border-zinc-700 text-zinc-400"
                  )}
                >
                  {showRuleOfThirds ? "Rule of 3rds ON" : "Rule of 3rds OFF"}
                </button>
              </div>
            </div>

            {/* Control D: Electronic Horizon Level */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 text-zinc-500" />
                  <span>HORIZON TILT:</span>
                </span>
                <span
                  className={cn(
                    "font-bold",
                    Math.abs(horizonTilt) < 0.5 ? "text-emerald-400" : "text-amber-400"
                  )}
                >
                  {horizonTilt === 0 ? "0.0° LEVEL" : `${horizonTilt > 0 ? "+" : ""}${horizonTilt}°`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="0.5"
                  value={horizonTilt}
                  onChange={(e) => setHorizonTilt(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
                <button
                  onClick={() => setHorizonTilt(0)}
                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] text-zinc-300 shrink-0 cursor-pointer"
                >
                  Level
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible Pro Controls (ISO, Aperture, Shutter) */}
          {showControlsDrawer && (
            <div className="pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* ISO Selector */}
              <div>
                <span className="text-zinc-500 text-[10px] block mb-1">ISO SENSITIVITY:</span>
                <div className="flex items-center gap-1">
                  {ISO_OPTIONS.map((iso) => (
                    <button
                      key={iso}
                      onClick={() => setSelectedIso(iso)}
                      className={cn(
                        "flex-1 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer",
                        selectedIso === iso
                          ? "bg-amber-400 text-black border-amber-400"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800"
                      )}
                    >
                      {iso}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aperture Selector */}
              <div>
                <span className="text-zinc-500 text-[10px] block mb-1">LENS APERTURE:</span>
                <div className="flex items-center gap-1">
                  {APERTURE_OPTIONS.map((ap) => (
                    <button
                      key={ap}
                      onClick={() => setSelectedAperture(ap)}
                      className={cn(
                        "flex-1 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer",
                        selectedAperture === ap
                          ? "bg-pink-500 text-white border-pink-500"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800"
                      )}
                    >
                      {ap}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shutter Speed Selector */}
              <div>
                <span className="text-zinc-500 text-[10px] block mb-1">SHUTTER CURTAIN:</span>
                <div className="flex items-center gap-1">
                  {SHUTTER_OPTIONS.map((sh) => (
                    <button
                      key={sh}
                      onClick={() => setSelectedShutter(sh)}
                      className={cn(
                        "flex-1 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer",
                        selectedShutter === sh
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800"
                      )}
                    >
                      {sh}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Tactical DSLR Viewfinder Viewport */}
        <div className="relative rounded-sm border border-zinc-700 bg-black overflow-hidden shadow-2xl">
          {/* Viewfinder Top Telemetry Bar */}
          <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xs font-mono text-[11px] text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="text-red-500 font-bold flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                REC [STANDBY]
              </span>
              <span className="hidden sm:inline">RAW 14-BIT</span>
              <span className="hidden md:inline">SD1 128GB (999+)</span>
              <span className="text-zinc-500 hidden lg:inline">
                CLICK FRAME TO MOVE AF POINT
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-zinc-300 font-bold">AWB: 5200K</span>
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <BatteryCharging className="w-3.5 h-3.5" />
                <span>94%</span>
              </div>
            </div>
          </div>

          {/* Center Visual Scene Artboard (Click-to-Focus, Zoomable, Authentic Photo) */}
          <div
            ref={viewportRef}
            onClick={handleViewportClick}
            className="relative w-full h-[380px] sm:h-[480px] flex items-center justify-center overflow-hidden select-none cursor-crosshair bg-zinc-950"
          >
            {/* 3D Viewfinder Sanctuary & Stage Arena (Procedural R3F 3D Assets) */}
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{
                filter: `blur(${focusBlurAmount}px) brightness(${brightnessMultiplier})`,
              }}
            >
              <Viewfinder3DScene
                accent={activeAccent}
                cameraAngle={cameraAngle}
                zoom={zoom}
                horizonTilt={horizonTilt}
              />
              <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/50 pointer-events-none" />
            </div>

            {/* Rule of Thirds Lines Overlay */}
            {showRuleOfThirds && (
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-10 opacity-35">
                <div className="border-r border-b border-dashed border-white/60" />
                <div className="border-r border-b border-dashed border-white/60" />
                <div className="border-b border-dashed border-white/60" />
                <div className="border-r border-b border-dashed border-white/60" />
                <div className="border-r border-b border-dashed border-white/60" />
                <div className="border-b border-dashed border-white/60" />
                <div className="border-r border-white/60" />
                <div className="border-r border-white/60" />
                <div />
              </div>
            )}

            {/* Electronic Horizon Level Bar */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 pointer-events-none z-15 flex items-center justify-between opacity-70">
              <div
                className={cn(
                  "w-12 h-0.5 transition-colors",
                  Math.abs(horizonTilt) < 0.5 ? "bg-emerald-400" : "bg-amber-400"
                )}
              />
              <div
                className={cn(
                  "w-12 h-0.5 transition-colors",
                  Math.abs(horizonTilt) < 0.5 ? "bg-emerald-400" : "bg-amber-400"
                )}
              />
            </div>

            {/* Corner Viewfinder Brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/70 pointer-events-none z-10" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/70 pointer-events-none z-10" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/70 pointer-events-none z-10" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/70 pointer-events-none z-10" />

            {/* Dynamic Autofocus Reticle [ + ] positioned at reticlePos */}
            <motion.div
              animate={{
                left: `${reticlePos.x}%`,
                top: `${reticlePos.y}%`,
                scale: isFocusLocked ? [1, 1.08, 1] : [1, 0.95, 1],
              }}
              transition={{ duration: 0.25 }}
              style={{ transform: "translate(-50%, -50%)" }}
              className={cn(
                "absolute z-20 w-16 h-16 border-2 flex items-center justify-center pointer-events-none transition-colors",
                isFocusLocked
                  ? "border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  : "border-amber-400"
              )}
            >
              <Crosshair
                className={cn(
                  "w-6 h-6",
                  isFocusLocked ? "text-emerald-400" : "text-amber-400"
                )}
              />
              <span
                className={cn(
                  "absolute -bottom-5 font-mono text-[9px] font-bold px-1 rounded bg-black/80 whitespace-nowrap",
                  isFocusLocked ? "text-emerald-400" : "text-amber-400"
                )}
              >
                {isFocusLocked ? "AF-LOCK ✓" : "MF SEARCH"}
              </span>
            </motion.div>

            {/* 6-Blade Aperture Iris Clamping Animation */}
            {apertureClosing && (
              <motion.div
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 0.15, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
              >
                <div className="w-96 h-96 rounded-full border-16 border-black bg-black shadow-2xl" />
              </motion.div>
            )}
          </div>

          {/* Viewfinder Bottom Telemetry Bar & Live Shutter Action */}
          <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-zinc-800/80 bg-zinc-950 font-mono text-xs">
            {/* Real EXIF Readout */}
            <div className="flex items-center gap-3 sm:gap-4 text-zinc-300">
              <span className="font-bold text-white">{activeAngleData.lens}</span>
              <span className="text-pink-400 font-bold">{selectedAperture}</span>
              <span className="text-blue-400">{selectedShutter}</span>
              <span className="font-bold text-amber-400">ISO {selectedIso}</span>
              <span className="text-zinc-500 hidden md:inline">EV 0.0</span>
            </div>

            {/* Dynamic Histogram */}
            <div className="flex items-end gap-1 h-6 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">
              <span className="text-[9px] text-zinc-500 mr-1">HIST:</span>
              {[6, 14, 20, 12, 24, 18, 10, 16, 22, 8].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-xs transition-all duration-200"
                  style={{
                    height: `${Math.min(22, Math.max(4, h * (selectedIso / 400)))}px`,
                    backgroundColor: i > 6 ? activeAccent : "#71717A",
                  }}
                />
              ))}
            </div>

            {/* Snap Shutter Button Action */}
            <button
              onClick={handleSnap}
              className="w-full sm:w-auto px-5 py-2.5 rounded-sm font-mono text-xs font-black uppercase tracking-wider text-black transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              style={{ backgroundColor: activeAccent }}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>SNAP PHOTO (SPACEBAR / CLICK)</span>
            </button>
          </div>
        </div>

        {/* Ejected RAW Photo Development Banner (Visible once captured) */}
        {photoCaptured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-sm border border-emerald-500/40 bg-emerald-950/40 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-mono text-xs font-bold text-emerald-300 uppercase">
                  RAW Frame Successfully Captured // {activeAngleData.title}
                </h4>
                <p className="text-xs text-zinc-300 font-sans">
                  Subject cutout and lighting layers exported. Head down to Chapter 3 to watch it
                  snap like Lego into our Sunday Celebration Poster!
                </p>
              </div>
            </div>
            <a
              href="#chapter-3"
              className="shrink-0 px-4 py-2 rounded-sm font-mono text-xs font-bold bg-[#FAF7F2] text-[#121316] hover:bg-white flex items-center gap-2 shadow-sm"
            >
              <span>Assemble Poster Now</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </div>

      {/* SVG Paint Wave Transition into Chapter 3 */}
      <div className="mt-16 w-full">
        <PaintDripDivider color={activeAccent} />
      </div>
    </section>
  );
}
