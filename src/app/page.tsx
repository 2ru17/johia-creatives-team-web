"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FloatingPaletteNav } from "@/components/navigation/FloatingPaletteNav";
import { Chapter1StudioHero } from "@/components/chapters/Chapter1StudioHero";
import { Chapter2CameraAngles } from "@/components/chapters/Chapter2CameraAngles";
import { Chapter3LegoPosterAssembly } from "@/components/chapters/Chapter3LegoPosterAssembly";
import { Chapter4BrokenGridShowcase } from "@/components/chapters/Chapter4BrokenGridShowcase";
import { Chapter5FacebookWriteupHub } from "@/components/chapters/Chapter5FacebookWriteupHub";
import { Chapter6CreativesOnboarding } from "@/components/chapters/Chapter6CreativesOnboarding";
import { ExternalLink, Heart } from "lucide-react";

// SSR-safe dynamic import for WebGL shader canvas
const StudioShaderCanvas = dynamic(
  () => import("@/components/canvas/StudioShaderCanvas").then((mod) => mod.StudioShaderCanvas),
  { ssr: false }
);

export default function CreativesHomePage() {
  return (
    <main className="relative min-h-screen selection:bg-[#FF5A1F] selection:text-white">
      {/* Background Liquid Shader Canvas */}
      <StudioShaderCanvas />

      {/* Top Floating Swatch Navigation */}
      <FloatingPaletteNav />

      {/* Chapter 01: 3D Studio Hero & Broken-Grid Intro */}
      <Chapter1StudioHero />

      {/* Chapter 02: Multi-Angle DSLR Viewfinder & Shutter Flash */}
      <Chapter2CameraAngles />

      {/* Chapter 03: Graphic Design & Lego Assembly Poster Scrollytelling */}
      <Chapter3LegoPosterAssembly />

      {/* Chapter 04: dau.lt Broken-Grid Portfolio Showcase (May Pinalalaki) */}
      <Chapter4BrokenGridShowcase />

      {/* Chapter 05: Documentation Write-Ups & Official FB Feed Simulator */}
      <Chapter5FacebookWriteupHub />

      {/* Chapter 06: The 4 Branches, Team Culture & Backstage Pass Onboarding */}
      <Chapter6CreativesOnboarding />

      {/* Footer */}
      <footer className="w-full bg-[#121316] text-[#FAF7F2] border-t border-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-zinc-800">
          <div className="shrink-0">
            <Image
              src="/images/johia-brand-banner.png"
              alt="JESUS OUR HOPE INTERNATIONAL ASSEMBLIES"
              width={260}
              height={136}
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-400">
            <a href="#chapter-1" className="hover:text-white transition-colors">
              01 Studio
            </a>
            <a href="#chapter-2" className="hover:text-white transition-colors">
              02 Shutter
            </a>
            <a href="#chapter-3" className="hover:text-white transition-colors">
              03 Assemble
            </a>
            <a href="#chapter-4" className="hover:text-white transition-colors">
              04 Gallery
            </a>
            <a href="#chapter-5" className="hover:text-white transition-colors">
              05 Socials
            </a>
            <a href="#chapter-6" className="hover:text-white transition-colors">
              06 Join Us
            </a>
            <a
              href="https://johiacubao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-amber-400 font-bold flex items-center gap-1 border-b border-white/20 hover:border-amber-400 pb-0.5 transition-colors"
            >
              <span>Visit our Official Website (johiacubao.com)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://forms.gle/AXmj7uZFNKisdVfK6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
            >
              <span>Join Form</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} JOHIA Creatives. All rights reserved.
          </div>
          <div>
            Made by{" "}
            <a
              href="https://github.com/2ru17"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white underline transition-colors"
            >
              Technicals Head
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
