"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import {
  useCreativesStore,
  STUDIO_PALETTE,
  StudioAccentColor,
  ChapterId,
} from "@/store/useCreativesStore";
import { cn } from "@/lib/utils";

const CHAPTERS: { id: ChapterId; label: string; href: string }[] = [
  { id: "01-STUDIO", label: "01 Studio", href: "#chapter-1" },
  { id: "02-SHUTTER", label: "02 Shutter", href: "#chapter-2" },
  { id: "03-LEGO-DESIGN", label: "03 Assemble", href: "#chapter-3" },
  { id: "04-SHOWCASE", label: "04 Gallery", href: "#chapter-4" },
  { id: "05-FB-FEED", label: "05 Socials", href: "#chapter-5" },
  { id: "06-JOIN", label: "06 Join Us", href: "#chapter-6" },
];

export function FloatingPaletteNav() {
  const {
    activeAccent,
    setActiveAccent,
    activeChapter,
    setActiveChapter,
  } = useCreativesStore();

  const rippleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active scroll-spy listener to update the nav pill as user scrolls
  useEffect(() => {
    const sectionIds: { id: string; chapter: ChapterId }[] = [
      { id: "chapter-1", chapter: "01-STUDIO" },
      { id: "chapter-2", chapter: "02-SHUTTER" },
      { id: "chapter-3", chapter: "03-LEGO-DESIGN" },
      { id: "chapter-4", chapter: "04-SHOWCASE" },
      { id: "chapter-5", chapter: "05-FB-FEED" },
      { id: "chapter-6", chapter: "06-JOIN" },
    ];

    const handleScroll = () => {
      // 35% viewport threshold for smooth natural tracking
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveChapter(sectionIds[i].chapter);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveChapter]);

  const triggerSplatterRipple = (e: React.MouseEvent<HTMLButtonElement>, color: StudioAccentColor) => {
    setActiveAccent(color);

    const canvas = rippleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Trigger local canvas ripple burst
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let radius = 0;
    let opacity = 0.8;

    const animateRipple = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = opacity;
      ctx.stroke();

      radius += 2.5;
      opacity -= 0.05;

      if (opacity > 0) {
        requestAnimationFrame(animateRipple);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    requestAnimationFrame(animateRipple);
  };

  return (
    <header className="fixed top-3 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4 pointer-events-auto bg-[#FAF7F2]/90 backdrop-blur-md border border-[#121316]/25 rounded-full px-3 sm:px-5 py-2 shadow-sm shadow-black/5">
        <canvas
          ref={rippleCanvasRef}
          width={300}
          height={60}
          className="absolute inset-0 pointer-events-none rounded-full w-full h-full"
        />

        {/* Church & Ministry Brand */}
        <a
          href="#chapter-1"
          onClick={() => setActiveChapter("01-STUDIO")}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#121316]/30 bg-[#F7B519] shrink-0 transition-transform group-hover:scale-105 shadow-xs">
            <Image
              src="/images/johia-logo.png"
              alt="JOHIA Emblem"
              width={32}
              height={32}
              className="object-cover w-full h-full"
              priority
              unoptimized
            />
          </div>
          <span className="font-mono text-sm sm:text-base font-black tracking-tight text-[#121316]">
            JOHIA CREATIVES
          </span>
        </a>

        {/* Chapter Jump Nav - Hidden on tiny mobile screens */}
        <nav className="hidden lg:flex items-center gap-1">
          {CHAPTERS.map((chap) => {
            const isActive = activeChapter === chap.id;
            return (
              <a
                key={chap.id}
                href={chap.href}
                onClick={() => setActiveChapter(chap.id)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-mono font-medium transition-all duration-200 border",
                  isActive
                    ? "bg-[#121316] text-[#FAF7F2] border-[#121316] shadow-xs"
                    : "text-[#5A5D64] hover:text-[#121316] border-transparent hover:border-[#121316]/15 hover:bg-black/5"
                )}
              >
                {chap.label}
              </a>
            );
          })}
        </nav>

        {/* Right HUD: Color Palette Swatches & Grid Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Studio Swatches */}
          <div className="flex items-center gap-1.5 bg-white/70 border border-[#121316]/20 rounded-full px-2.5 py-1 shadow-xs">
            <span className="text-[10px] font-mono font-bold text-[#5A5D64] pr-0.5 hidden md:inline">
              PALETTE:
            </span>
            {STUDIO_PALETTE.map((swatch) => {
              const isSelected = activeAccent === swatch.hex;
              return (
                <button
                  key={swatch.hex}
                  onClick={(e) => triggerSplatterRipple(e, swatch.hex)}
                  title={`${swatch.name} (${swatch.hex})`}
                  className={cn(
                    "relative w-5 h-5 rounded-full transition-all duration-200 focus:outline-none flex items-center justify-center cursor-pointer",
                    isSelected
                      ? "scale-115 ring-2 ring-offset-1 ring-[#121316]"
                      : "hover:scale-110 opacity-80 hover:opacity-100"
                  )}
                  style={{ backgroundColor: swatch.hex }}
                >
                  {isSelected && (
                    <Check
                      className="w-3 h-3 drop-shadow-xs"
                      style={{ color: swatch.textColor }}
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
