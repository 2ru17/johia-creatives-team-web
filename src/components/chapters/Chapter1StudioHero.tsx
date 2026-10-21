"use client";

import React from "react";
import { motion } from "motion/react";
import { Camera, Palette, Sparkles, ArrowRight, Video } from "lucide-react";
import { useCreativesStore, STUDIO_PALETTE } from "@/store/useCreativesStore";
import { HeroStudio3D } from "@/components/canvas/HeroStudio3D";
import { BrokenGridCard } from "@/components/grid/BrokenGridContainer";

export function Chapter1StudioHero() {
  const activeAccent = useCreativesStore((state) => state.activeAccent);
  const setActiveAccent = useCreativesStore((state) => state.setActiveAccent);
  const setActiveChapter = useCreativesStore((state) => state.setActiveChapter);

  return (
    <section id="chapter-1" className="relative min-h-screen pt-24 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Top Telemetry Header */}
      <div className="w-full border-y border-[#121316]/15 bg-[#FAF7F2] py-2 px-4 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs text-[#5A5D64]">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: activeAccent }}
            />
            <span className="font-bold text-[#121316]">JOHIA CREATIVES</span>
            <span className="hidden sm:inline">/ 15 Cambridge St. Cubao</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#121316]">JOHIA CREATIVES</span>
          </div>
        </div>
      </div>

      {/* Main Title & Asymmetric Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center md:text-left mb-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#121316]/20 bg-white mb-3 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" style={{ color: activeAccent }} />
            <span>THE CREATIVE STUDIO</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#121316] leading-none mb-3">
            WE SHAPE
            <br />
            <span
              className="underline decoration-wavy decoration-2 transition-colors duration-300"
              style={{ textDecorationColor: activeAccent }}
            >
              THE VIBE.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#5A5D64] max-w-xl font-sans">
            JOHIA Creatives turns Sunday worship into visual stories. We shoot photos, edit reels, design sermon art, and share what God is doing.
          </p>
        </div>

        {/* 3D Scene + Overlapping Cards */}
        <div className="relative w-full my-2">
          {/* Central 3D Canvas (Draggable / Orbitable) */}
          <div className="w-full relative z-0">
            <HeroStudio3D />
          </div>

          {/* Asymmetric Overlapping Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative z-10 -mt-12 sm:-mt-20">
            {/* Card 1: Photography Eye (Left) */}
            <BrokenGridCard
              fig="FIG. 01"
              coord="CAM / 50MM RAW"
              tag="PHOTO"
              tilt="slight-left"
              className="md:col-span-5 bg-[#FAF7F2]/95 backdrop-blur-xs"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: activeAccent }}
                  >
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#121316]">Capture The Unseen</h3>
                    <p className="text-[11px] font-mono text-[#5A5D64]">Worship Photography</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#121316] text-[#FAF7F2] px-2 py-0.5 rounded">
                  RAW 14-BIT
                </span>
              </div>
              <p className="text-xs text-[#5A5D64] mb-3 leading-relaxed">
                Freezing praise, prayers, and heartfelt smiles during worship across 3 dynamic camera angles.
              </p>
              <div className="font-mono text-[10px] bg-white border border-[#121316]/15 rounded p-2 flex justify-between items-center text-[#121316]">
                <span>50mm Prime</span>
                <span>f/1.8</span>
                <span>1/320s</span>
                <span className="font-bold" style={{ color: activeAccent }}>ISO 640</span>
              </div>
            </BrokenGridCard>

            {/* Card 2: Interactive Color Studio (Right) - Intuitive & Functional */}
            <BrokenGridCard
              fig="FIG. 02"
              coord="STUDIO / PALETTE"
              tag="INTERACTIVE"
              tilt="slight-right"
              className="md:col-span-4 md:col-start-9 bg-white shadow-md select-none"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" style={{ color: activeAccent }} />
                  <h3 className="font-bold text-sm text-[#121316]">Color Palette Studio</h3>
                </div>
                <span className="text-[9px] font-mono text-[#5A5D64]">TAP A COLOR</span>
              </div>
              <p className="text-xs text-[#5A5D64] mb-3">
                Click a swatch below to tune the website and poster theme in real time:
              </p>
              <div className="grid grid-cols-6 gap-1.5 p-2 bg-[#FAF7F2] border border-[#121316]/15 rounded mb-3">
                {STUDIO_PALETTE.map((swatch) => (
                  <button
                    key={swatch.hex}
                    onClick={() => setActiveAccent(swatch.hex)}
                    title={swatch.name}
                    className="w-full aspect-square rounded-xs border border-[#121316]/20 transition-transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: swatch.hex,
                      boxShadow: activeAccent === swatch.hex ? "0 0 0 2px #121316" : "none",
                    }}
                  />
                ))}
              </div>
              <div className="font-mono text-[10px] text-[#5A5D64] flex justify-between items-center">
                <span>Active Accent:</span>
                <span className="font-bold" style={{ color: activeAccent }}>{activeAccent}</span>
              </div>
            </BrokenGridCard>
          </div>

          {/* Bottom Overlapping Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative z-10 mt-5">
            {/* Card 3: Video & Motion (Left) */}
            <BrokenGridCard
              fig="FIG. 03"
              coord="MOTION / REELS"
              tag="VIDEO"
              tilt="slight-right"
              className="md:col-span-6 bg-white"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: activeAccent }}
                >
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#121316]">Video & Social Stories</h3>
                  <p className="text-[11px] font-mono text-[#5A5D64]">Reels, Sermons, Recaps</p>
                </div>
              </div>
              <p className="text-xs text-[#5A5D64] leading-relaxed">
                Transforming Sunday highlights into 60-second vertical reels, sermon clips, and uplifting community recaps.
              </p>
            </BrokenGridCard>

            {/* Card 4: Join The Team CTA (Right) */}
            <BrokenGridCard
              dark
              fig="FIG. 04"
              coord="JOIN / 2026"
              tag="INVITE"
              tilt="slight-left"
              className="md:col-span-5 md:col-start-8 bg-[#121316] text-[#FAF7F2] flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-base text-white mb-1.5">Step Into The Studio</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  Whether you shoot, design, or write, we will train you step by step. Beginners are 100% welcome.
                </p>
              </div>
              <a
                href="#chapter-6"
                onClick={() => setActiveChapter("06-JOIN")}
                className="w-full py-2.5 px-4 rounded-xs font-mono text-xs font-black uppercase tracking-wider text-[#121316] flex items-center justify-between transition-transform hover:scale-[1.01] active:scale-98"
                style={{ backgroundColor: activeAccent }}
              >
                <span>Join Creatives Today</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </BrokenGridCard>
          </div>
        </div>
      </div>
    </section>
  );
}
