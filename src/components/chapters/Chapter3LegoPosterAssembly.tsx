"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  RefreshCw,
  Box,
  Eye,
  Check,
  Move3d,
} from "lucide-react";
import {
  useCreativesStore,
  STUDIO_PALETTE,
  LegoStep,
} from "@/store/useCreativesStore";
import { LEGO_LAYERS } from "@/data/posterLegoLayers";
import { PaintDripDivider } from "@/components/navigation/PaintDripDivider";
import { cn } from "@/lib/utils";

export function Chapter3LegoPosterAssembly() {
  const {
    activeAccent,
    setActiveAccent,
    cameraAngle,
    legoAssemblyStep,
    setLegoAssemblyStep,
    is3dExploded,
    toggle3dExploded,
    showGridGuides,
    toggleGridGuides,
  } = useCreativesStore();

  const [isAutoAssembling, setIsAutoAssembling] = useState(false);

  // 3D Drag Rotation States
  const [dragRotation, setDragRotation] = useState({ x: 22, y: -26 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 22, rotY: -26 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!is3dExploded) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: dragRotation.x,
      rotY: dragRotation.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !is3dExploded) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    const newRotY = Math.max(-55, Math.min(55, dragStartRef.current.rotY + deltaX * 0.35));
    const newRotX = Math.max(-35, Math.min(45, dragStartRef.current.rotX - deltaY * 0.35));
    setDragRotation({ x: newRotX, y: newRotY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  // Auto-assemble step sequence
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoAssembling) {
      if (legoAssemblyStep < 4) {
        timer = setTimeout(() => {
          setLegoAssemblyStep((legoAssemblyStep + 1) as LegoStep);
        }, 650);
      } else {
        timer = setTimeout(() => {
          setIsAutoAssembling(false);
        }, 0);
      }
    }
    return () => clearTimeout(timer);
  }, [isAutoAssembling, legoAssemblyStep, setLegoAssemblyStep]);

  const handleStartAutoAssemble = () => {
    setLegoAssemblyStep(0);
    setIsAutoAssembling(true);
  };

  return (
    <section
      id="chapter-3"
      className="relative min-h-screen py-20 bg-[#FAF7F2] text-[#121316] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#121316]/25 bg-white mb-3 text-xs font-mono font-bold">
            <Box className="w-3.5 h-3.5" style={{ color: activeAccent }} />
            <span>CHAPTER 03 // GRAPHIC DESIGN & MODULAR POSTER ASSEMBLY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            MODULAR POSTERS.
            <br />
            <span
              className="underline decoration-wavy decoration-2 transition-colors duration-300"
              style={{ textDecorationColor: activeAccent }}
            >
              BUILT LAYER BY LAYER.
            </span>
          </h2>
          <p className="mt-3 text-[#5A5D64] text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
            Graphic design at JOHIA is modular. See how your RAW camera shot snaps with base
            textures, kinetic 3D typography, and studio badges like interlocking Lego blocks.
          </p>
        </div>

        {/* Studio Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-8 bg-white border border-[#121316]/25 rounded-sm shadow-xs">
          {/* Step Selector 1 -> 4 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="font-mono text-xs font-bold text-[#5A5D64] pr-1 shrink-0">
              ASSEMBLY STEP:
            </span>
            {([1, 2, 3, 4] as LegoStep[]).map((step) => {
              const isCurrent = legoAssemblyStep === step;
              const isPast = legoAssemblyStep >= step;
              return (
                <button
                  key={step}
                  onClick={() => {
                    setIsAutoAssembling(false);
                    setLegoAssemblyStep(step);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-sm font-mono text-xs font-bold transition-all duration-200 border flex items-center gap-1.5 cursor-pointer shrink-0",
                    isCurrent
                      ? "bg-[#121316] text-[#FAF7F2] border-[#121316] shadow-xs"
                      : isPast
                      ? "bg-zinc-100 text-[#121316] border-[#121316]/30"
                      : "bg-transparent text-[#5A5D64] border-dashed border-[#121316]/20 hover:border-[#121316]/40"
                  )}
                >
                  <span>Piece {step}</span>
                  {isPast && <Check className="w-3 h-3 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {/* Action Buttons: Auto-Assemble, Explode 3D, Guides */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auto Assemble Button */}
            <button
              onClick={handleStartAutoAssemble}
              className="px-3.5 py-1.5 rounded-sm font-mono text-xs font-bold text-white transition-all hover:brightness-105 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-xs"
              style={{ backgroundColor: activeAccent }}
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isAutoAssembling && "animate-spin")} />
              <span>Auto-Assemble</span>
            </button>

            {/* 3D Exploded Layers Toggle */}
            <button
              onClick={toggle3dExploded}
              className={cn(
                "px-3 py-1.5 rounded-sm font-mono text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer",
                is3dExploded
                  ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-xs"
                  : "border-[#121316]/25 hover:border-[#121316] text-[#121316] bg-white"
              )}
            >
              <Move3d className="w-3.5 h-3.5" />
              <span>{is3dExploded ? "Collapse 3D" : "Explode 3D"}</span>
            </button>

            {/* Grid Guides Toggle */}
            <button
              onClick={toggleGridGuides}
              className={cn(
                "px-3 py-1.5 rounded-sm font-mono text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer",
                showGridGuides
                  ? "bg-[#2563EB] text-white border-[#2563EB]"
                  : "border-[#121316]/25 hover:border-[#121316] text-[#121316] bg-white"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Guides</span>
            </button>
          </div>
        </div>

        {/* Central Lego Assembly Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Poster Artboard (3D perspective if exploded) */}
          <div className="lg:col-span-7 flex flex-col items-center perspective-[1200px]">
            {is3dExploded && (
              <div className="mb-2 font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-[#121316] text-zinc-300 border border-zinc-700 shadow-sm flex items-center gap-1.5 select-none">
                <Move3d className="w-3 h-3 text-purple-400" />
                <span>DRAG POSTER TO ROTATE IN 3D</span>
              </div>
            )}

            <motion.div
              animate={{
                rotateX: is3dExploded ? dragRotation.x : 0,
                rotateY: is3dExploded ? dragRotation.y : 0,
                scale: is3dExploded ? 0.9 : 1,
              }}
              transition={{ duration: isDragging ? 0 : 0.4, ease: "easeOut" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{ transformStyle: "preserve-3d" }}
              className={cn(
                "relative w-full max-w-[420px] aspect-[4/5] bg-white rounded-sm border border-[#121316]/40 shadow-2xl overflow-visible select-none touch-none",
                is3dExploded ? "cursor-grab active:cursor-grabbing" : ""
              )}
            >
              {/* Studio Grid Guides Overlay */}
              {showGridGuides && (
                <div className="absolute inset-0 pointer-events-none studio-grid-guides z-50 opacity-40" />
              )}

              {/* LAYER 1: BASE CANVAS & DUOTONE GRADIENT (Step >= 1) */}
              <AnimatePresence>
                {legoAssemblyStep >= 1 && (
                  <motion.div
                    initial={{ y: -80, opacity: 0, scale: 0.9 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      z: is3dExploded ? 0 : 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transform: is3dExploded ? "translateZ(0px)" : "none" }}
                    className="absolute inset-0 rounded-sm overflow-hidden"
                  >
                    {/* Architectural Duotone Grid Canvas */}
                    <div
                      className="w-full h-full p-6 flex flex-col justify-between"
                      style={{
                        background: `radial-gradient(circle at 80% 20%, ${activeAccent}40, transparent 70%), linear-gradient(135deg, #FAF7F2 0%, #EAE6DF 100%)`,
                      }}
                    >
                      {/* Top Poster Meta Header */}
                      <div className="flex justify-between items-center border-b border-[#121316]/20 pb-2 text-[10px] font-mono text-[#5A5D64]">
                        <span>JOHIA CUBAO</span>
                        <span className="font-bold text-[#121316]">SERIES 2026</span>
                      </div>

                      {/* Subtle Background Typography Watermark */}
                      <div className="absolute top-1/4 -right-10 text-8xl font-black text-black/5 font-mono select-none pointer-events-none">
                        HOPE
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LAYER 2: SUBJECT CUTOUT FROM CHAPTER 2 (Step >= 2) */}
              <AnimatePresence>
                {legoAssemblyStep >= 2 && (
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      z: is3dExploded ? 50 : 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22 }}
                    style={{ transform: is3dExploded ? "translateZ(60px)" : "none" }}
                    className="absolute inset-x-4 top-16 bottom-16 flex items-center justify-center pointer-events-none"
                  >
                    {/* Halftone / Sticker-Stroke Cutout Vector */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <svg
                        viewBox="0 0 400 400"
                        className="w-full h-full drop-shadow-lg"
                        fill="none"
                      >
                        {/* Halftone Dot Matrix */}
                        <defs>
                          <pattern
                            id="halftone"
                            x="0"
                            y="0"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                          >
                            <circle cx="2" cy="2" r="1.5" fill={activeAccent} opacity="0.4" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#halftone)" opacity="0.6" />

                        {/* Subject Cutout Silhouette depending on Camera Angle */}
                        {cameraAngle === "LOW_WORSHIP" && (
                          <g>
                            <circle cx="200" cy="160" r="45" fill="#FAF7F2" stroke="#121316" strokeWidth="4" />
                            <path
                              d="M140,220 C170,200 230,200 260,220 L290,380 L110,380 Z"
                              fill="#121316"
                              stroke="#FAF7F2"
                              strokeWidth="5"
                            />
                            {/* Uplifted Hands */}
                            <path d="M150,220 L90,140" stroke="#FAF7F2" strokeWidth="12" strokeLinecap="round" />
                            <path d="M250,220 L310,140" stroke="#FAF7F2" strokeWidth="12" strokeLinecap="round" />
                          </g>
                        )}

                        {cameraAngle === "WIDE_CROWD" && (
                          <g>
                            <rect x="180" y="70" width="40" height="40" fill={activeAccent} />
                            {[80, 160, 240, 320].map((x, i) => (
                              <circle key={i} cx={x} cy={280 + (i % 2) * 15} r="28" fill="#121316" stroke="#FAF7F2" strokeWidth="4" />
                            ))}
                            <path d="M40,340 Q200,310 360,340 L360,390 L40,390 Z" fill="#121316" />
                          </g>
                        )}

                        {cameraAngle === "STAGE_CLOSEUP" && (
                          <g>
                            <circle cx="200" cy="220" r="70" fill="#121316" stroke="#FAF7F2" strokeWidth="6" />
                            <circle cx="200" cy="220" r="30" fill={activeAccent} />
                            <line x1="50" y1="180" x2="350" y2="260" stroke="#FAF7F2" strokeWidth="3" />
                            <line x1="50" y1="200" x2="350" y2="280" stroke="#FAF7F2" strokeWidth="3" />
                            <line x1="50" y1="220" x2="350" y2="300" stroke="#FAF7F2" strokeWidth="3" />
                          </g>
                        )}
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LAYER 3: MODULAR KINETIC TYPOGRAPHY BRICKS (Step >= 3) */}
              <AnimatePresence>
                {legoAssemblyStep >= 3 && (
                  <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      z: is3dExploded ? 100 : 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 270, damping: 20 }}
                    style={{ transform: is3dExploded ? "translateZ(120px)" : "none" }}
                    className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none"
                  >
                    {/* Top Main Title Brick */}
                    <div className="mt-8">
                      <div className="inline-block bg-[#121316] text-[#FAF7F2] font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider mb-1">
                        JOHIA CUBAO // MAIN CELEBRATION
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black text-[#121316] leading-none tracking-tight">
                        SUNDAY
                        <br />
                        <span
                          className="text-white px-2 py-0.5 inline-block"
                          style={{ backgroundColor: activeAccent }}
                        >
                          CELEBRATION
                        </span>
                      </h3>
                    </div>

                    {/* Bottom Logistics Brick */}
                    <div className="bg-[#121316] text-[#FAF7F2] p-3 rounded-xs border border-zinc-700 shadow-md">
                      <div className="flex justify-between items-center text-xs font-mono font-bold">
                        <span>10:00 AM SERVICE</span>
                        <span style={{ color: activeAccent }}>IN-PERSON & LIVE</span>
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                        15 CAMBRIDGE ST. CUBAO, QUEZON CITY
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LAYER 4: COLOR ACCENTS & STUDIO BADGES (Step >= 4) */}
              <AnimatePresence>
                {legoAssemblyStep >= 4 && (
                  <motion.div
                    initial={{ scale: 1.4, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      z: is3dExploded ? 150 : 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    style={{ transform: is3dExploded ? "translateZ(180px)" : "none" }}
                    className="absolute inset-0 pointer-events-none p-4"
                  >
                    {/* Official Church Logo Stamp (Top Right) */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white border border-[#121316]/30 shadow-md flex items-center justify-center p-1 rotate-12">
                      <Image
                        src="/images/johia-logo.png"
                        alt="JOHIA"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>

                    {/* Creative Team Stamp (Bottom Left) */}
                    <div
                      className="absolute bottom-20 left-4 px-2.5 py-1 rounded font-mono text-[9px] font-bold text-white shadow-md -rotate-6"
                      style={{ backgroundColor: activeAccent }}
                    >
                      ★ CREATIVES VERIFIED
                    </div>

                    {/* Barcode Strip */}
                    <div className="absolute bottom-2 right-4 bg-white px-2 py-0.5 border border-[#121316]/20 font-mono text-[8px] text-[#121316] tracking-widest">
                      ||| | |||| | ||||| 2026
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Lego Layers Breakdown Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            <h3 className="font-mono text-xs font-bold text-[#5A5D64] uppercase tracking-wider mb-2">
              Lego Layer Composition Stack ({legoAssemblyStep}/4 Assembled)
            </h3>

            {LEGO_LAYERS.map((layer) => {
              const isLayerActive = legoAssemblyStep >= layer.step;
              return (
                <div
                  key={layer.id}
                  onClick={() => setLegoAssemblyStep(layer.step)}
                  className={cn(
                    "p-4 rounded-sm border transition-all duration-200 cursor-pointer",
                    isLayerActive
                      ? "bg-white border-[#121316]/30 shadow-xs"
                      : "bg-[#F4F1EA] border-dashed border-[#121316]/20 opacity-60 hover:opacity-90"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold",
                          isLayerActive
                            ? "bg-[#121316] text-[#FAF7F2]"
                            : "bg-zinc-300 text-zinc-600"
                        )}
                      >
                        {layer.step}
                      </span>
                      <h4 className="font-bold text-sm text-[#121316]">{layer.name}</h4>
                    </div>
                    <span
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase"
                      style={{
                        backgroundColor: isLayerActive ? `${activeAccent}20` : "#E2E8F0",
                        color: isLayerActive ? activeAccent : "#64748B",
                      }}
                    >
                      {layer.branch.split(":")[0]}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5D64] ml-7">{layer.description}</p>
                </div>
              );
            })}

            {/* Quick Swatch Switcher for Poster Theme */}
            <div className="p-4 bg-white border border-[#121316]/20 rounded-sm mt-4">
              <span className="font-mono text-xs font-bold text-[#121316] block mb-2">
                Swap Poster Palette:
              </span>
              <div className="flex items-center gap-2">
                {STUDIO_PALETTE.map((swatch) => (
                  <button
                    key={swatch.hex}
                    onClick={() => setActiveAccent(swatch.hex)}
                    className={cn(
                      "w-7 h-7 rounded-full transition-transform cursor-pointer flex items-center justify-center",
                      activeAccent === swatch.hex
                        ? "scale-110 ring-2 ring-offset-1 ring-[#121316]"
                        : "hover:scale-105 opacity-80 hover:opacity-100"
                    )}
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                  >
                    {activeAccent === swatch.hex && (
                      <Check className="w-3.5 h-3.5" style={{ color: swatch.textColor }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Paint Wave Transition into Chapter 4 */}
      <div className="mt-20 w-full">
        <PaintDripDivider color={activeAccent} />
      </div>
    </section>
  );
}
