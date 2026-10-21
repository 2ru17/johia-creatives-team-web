"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Grid,
  Filter,
  Maximize2,
  X,
  Palette,
  Sparkles,
  Camera,
  Layers,
} from "lucide-react";
import { useCreativesStore } from "@/store/useCreativesStore";
import {
  PORTFOLIO_ITEMS,
  PortfolioItem,
  PortfolioCategory,
} from "@/data/creativesPortfolioData";
import { PaintDripDivider } from "@/components/navigation/PaintDripDivider";
import { cn } from "@/lib/utils";

const CATEGORIES: PortfolioCategory[] = [
  "ALL WORKS",
  "EVENT POSTERS",
  "SUNDAY PHOTOGRAPHY",
  "SERMON SERIES",
  "YOUTH & SOAKING",
];

// Procedural SVG Artwork & Photography Renderer for portfolio items
function PortfolioArtworkRenderer({
  item,
  isExpanded = false,
}: {
  item: PortfolioItem;
  isExpanded?: boolean;
}) {
  const [showPhoto, setShowPhoto] = useState<boolean>(Boolean(item.imageSrc));

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex items-center justify-center transition-all duration-300",
        isExpanded ? "h-64 sm:h-96" : "h-48 sm:h-64",
        "bg-linear-to-br from-[#1E2024] to-[#121316] text-[#FAF7F2]"
      )}
    >
      {/* If item has a real church photograph and photo view is active */}
      {item.imageSrc && showPhoto ? (
        <div className="relative w-full h-full">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Subtle gradient vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Authentic Camera Badge */}
          <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-white/20 text-[9px] font-mono font-bold text-white flex items-center gap-1.5 shadow-sm">
            <Camera className="w-3 h-3 text-emerald-400" />
            <span>AUTHENTIC CHURCH DOCU</span>
          </div>

          {/* Toggle Button to Switch to Vector Artwork */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowPhoto(false);
            }}
            className="absolute top-3 right-3 bg-black/80 hover:bg-black px-2.5 py-1 rounded-xs border border-white/20 text-[9px] font-mono font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer z-10 flex items-center gap-1 shadow-sm"
          >
            <Layers className="w-3 h-3 text-amber-400" />
            <span>VECTOR ART</span>
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Background Graphic Grid */}
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#FAF7F2_1px,transparent_1px),linear-gradient(to_bottom,#FAF7F2_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Toggle back to photo if image asset is available */}
          {item.imageSrc && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPhoto(true);
              }}
              className="absolute top-3 right-3 bg-black/80 hover:bg-black px-2.5 py-1 rounded-xs border border-white/20 text-[9px] font-mono font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer z-10 flex items-center gap-1 shadow-sm"
            >
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>VIEW PHOTO</span>
            </button>
          )}

          {/* SVG Vector Posters */}
          <svg
            viewBox="0 0 600 400"
            className="w-full h-full object-cover select-none pointer-events-none"
            fill="none"
          >
            {/* 01: CONQUEROR (August 30, Isaiah 54:2) */}
            {item.svgVariant === "conqueror" && (
              <g>
                <defs>
                  <radialGradient id="conqGlow" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#B43403" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#121316" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="conqGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#FF5A1F" />
                  </linearGradient>
                </defs>
                <rect width="600" height="400" fill="#131417" />
                <circle cx="300" cy="190" r="190" fill="url(#conqGlow)" />
                {[-60, -30, 0, 30, 60].map((deg, i) => (
                  <line
                    key={i}
                    x1="300"
                    y1="190"
                    x2={300 + 350 * Math.cos((deg * Math.PI) / 180)}
                    y2={190 + 350 * Math.sin((deg * Math.PI) / 180)}
                    stroke="#FACC15"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                    opacity="0.3"
                  />
                ))}
                <path
                  d="M120,380 L300,100 L480,380"
                  stroke="url(#conqGold)"
                  strokeWidth="4"
                  fill="none"
                  opacity="0.8"
                />
                <path
                  d="M180,380 L300,190 L420,380"
                  stroke="#FAF7F2"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.5"
                />
                <text
                  x="300"
                  y="215"
                  textAnchor="middle"
                  fill="#FAF7F2"
                  fontSize="54"
                  fontWeight="900"
                  fontFamily="sans-serif"
                  letterSpacing="6"
                >
                  CONQUEROR
                </text>
                <text
                  x="300"
                  y="248"
                  textAnchor="middle"
                  fill="#FACC15"
                  fontSize="13"
                  fontFamily="monospace"
                  letterSpacing="4"
                  fontWeight="700"
                >
                  ISAIAH 54:2 // ENLARGE YOUR TENT
                </text>
                <text
                  x="300"
                  y="272"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="11"
                  fontFamily="monospace"
                  letterSpacing="2"
                >
                  SUNDAY MESSAGE KEY VISUAL • AUG 30
                </text>
                <rect x="230" y="45" width="140" height="24" rx="2" fill="#FF5A1F" opacity="0.9" />
                <text
                  x="300"
                  y="61"
                  textAnchor="middle"
                  fill="#FAF7F2"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  JOHIA CREATIVES
                </text>
              </g>
            )}

            {/* 02: STILL STANDING (July 26, Ephesians 6:13) */}
            {item.svgVariant === "still-standing" && (
              <g>
                <defs>
                  <linearGradient id="stillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <radialGradient id="stillGlow" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#EC4899" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#0B0C10" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="600" height="400" fill="#0D0E13" />
                <circle cx="300" cy="180" r="220" fill="url(#stillGlow)" />
                <polygon
                  points="50,400 220,170 380,400"
                  fill="none"
                  stroke="#EC4899"
                  strokeWidth="2.5"
                  opacity="0.7"
                />
                <polygon
                  points="200,400 350,130 520,400"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  opacity="0.8"
                />
                <polygon points="120,400 300,230 460,400" fill="#EC4899" opacity="0.15" />
                <text
                  x="300"
                  y="165"
                  textAnchor="middle"
                  fill="#FAF7F2"
                  fontSize="48"
                  fontWeight="900"
                  fontFamily="Impact, sans-serif"
                  letterSpacing="4"
                >
                  STILL STANDING
                </text>
                <rect x="180" y="180" width="240" height="2" fill="url(#stillGrad)" />
                <text
                  x="300"
                  y="210"
                  textAnchor="middle"
                  fill="#EC4899"
                  fontSize="13"
                  fontFamily="monospace"
                  letterSpacing="4"
                  fontWeight="bold"
                >
                  EPHESIANS 6:13 // JULY 26
                </text>
                <text
                  x="300"
                  y="235"
                  textAnchor="middle"
                  fill="#93C5FD"
                  fontSize="11"
                  fontFamily="sans-serif"
                  letterSpacing="2"
                >
                  STAND FIRM IN THE FULL ARMOR OF GOD
                </text>
              </g>
            )}

            {/* 03: WHEN THE CHOICE IS YOURS (September 6, 2 Chronicles 20) */}
            {item.svgVariant === "choice-is-yours" && (
              <g>
                <defs>
                  <linearGradient id="choiceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <rect width="600" height="400" fill="#0F1017" />
                <rect
                  x="70"
                  y="50"
                  width="460"
                  height="300"
                  fill="url(#choiceGrad)"
                  stroke="#8B5CF6"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                <line
                  x1="300"
                  y1="50"
                  x2="300"
                  y2="350"
                  stroke="#8B5CF6"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
                <circle cx="300" cy="200" r="45" stroke="#FAF7F2" strokeWidth="2" fill="none" opacity="0.8" />
                <circle cx="300" cy="200" r="12" fill="#8B5CF6" />
                <text
                  x="300"
                  y="130"
                  textAnchor="middle"
                  fill="#FAF7F2"
                  fontSize="28"
                  fontWeight="800"
                  fontFamily="serif"
                  letterSpacing="2"
                >
                  WHEN THE CHOICE IS YOURS
                </text>
                <text
                  x="300"
                  y="280"
                  textAnchor="middle"
                  fill="#C4B5FD"
                  fontSize="12"
                  fontFamily="monospace"
                  letterSpacing="3"
                  fontWeight="bold"
                >
                  2 CHRONICLES 20:15 // SEPT 6
                </text>
                <text
                  x="300"
                  y="305"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="11"
                  fontFamily="sans-serif"
                >
                  The battle is not yours, but God’s
                </text>
              </g>
            )}

            {/* 04: INTERRUPTED (October 10) */}
            {item.svgVariant === "interrupted" && (
              <g>
                <defs>
                  <linearGradient id="intGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <rect width="600" height="400" fill="#0C101B" />
                <line x1="40" y1="360" x2="560" y2="40" stroke="url(#intGrad)" strokeWidth="3" />
                <text
                  x="300"
                  y="180"
                  textAnchor="middle"
                  fill="#FAF7F2"
                  fontSize="52"
                  fontWeight="900"
                  fontFamily="sans-serif"
                  letterSpacing="8"
                >
                  INTERRUPTED
                </text>
                <text
                  x="300"
                  y="225"
                  textAnchor="middle"
                  fill="#38BDF8"
                  fontSize="13"
                  fontFamily="monospace"
                  letterSpacing="4"
                >
                  PEACE IN THE STORM // OCT 10
                </text>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
                  <rect
                    key={bar}
                    x={220 + bar * 20}
                    y={260}
                    width="8"
                    height={15 + (bar % 3) * 12}
                    fill="#10B981"
                    opacity="0.75"
                    rx="1"
                  />
                ))}
              </g>
            )}

            {/* 05: LARGER THAN LIFE (September 13) */}
            {item.svgVariant === "larger-than-life" && (
              <g>
                <defs>
                  <radialGradient id="lifeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FACC15" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FF5A1F" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#13141A" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="600" height="400" fill="#13141A" />
                <circle cx="300" cy="200" r="160" fill="url(#lifeGlow)" />
                <circle
                  cx="300"
                  cy="200"
                  r="120"
                  stroke="#FACC15"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  fill="none"
                  opacity="0.6"
                />
                <text
                  x="300"
                  y="195"
                  textAnchor="middle"
                  fill="#FAF7F2"
                  fontSize="48"
                  fontWeight="900"
                  fontFamily="Impact, sans-serif"
                  letterSpacing="4"
                >
                  LARGER THAN LIFE
                </text>
                <text
                  x="300"
                  y="235"
                  textAnchor="middle"
                  fill="#FACC15"
                  fontSize="13"
                  fontFamily="monospace"
                  letterSpacing="4"
                  fontWeight="bold"
                >
                  SEPTEMBER 13 // SUNDAY KEY VISUAL
                </text>
                <text
                  x="300"
                  y="260"
                  textAnchor="middle"
                  fill="#E5E7EB"
                  fontSize="11"
                  fontFamily="sans-serif"
                >
                  Expanding vision and walking in supernatural faith
                </text>
              </g>
            )}

            {/* 06: BEYOND YOUR CAPACITY (August 23) */}
            {item.svgVariant === "beyond-capacity" && (
              <g>
                <defs>
                  <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#FACC15" />
                  </linearGradient>
                </defs>
                <rect width="600" height="400" fill="#0E1714" />
                <path d="M180,320 L240,280 L300,320 L240,360 Z" fill="#10B981" opacity="0.5" />
                <path d="M260,270 L320,230 L380,270 L320,310 Z" fill="#10B981" opacity="0.7" />
                <path d="M340,220 L400,180 L460,220 L400,260 Z" fill="url(#capGrad)" opacity="0.9" />
                <text
                  x="300"
                  y="130"
                  textAnchor="middle"
                  fill="#FAF7F2"
                  fontSize="36"
                  fontWeight="900"
                  fontFamily="serif"
                  letterSpacing="3"
                >
                  BEYOND YOUR CAPACITY
                </text>
                <text
                  x="300"
                  y="165"
                  textAnchor="middle"
                  fill="#FACC15"
                  fontSize="12"
                  fontFamily="monospace"
                  letterSpacing="4"
                  fontWeight="bold"
                >
                  AUGUST 23 // PREACHING SERIES
                </text>
                <text
                  x="300"
                  y="370"
                  textAnchor="middle"
                  fill="#6EE7B7"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  WHEN YOUR LIMITS BECOME HIS BEGINNING
                </text>
              </g>
            )}

            {/* 07: WATER BAPTISM */}
            {item.svgVariant === "baptism" && (
              <g>
                <defs>
                  <linearGradient id="bapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#1E3A8A" />
                  </linearGradient>
                </defs>
                <rect width="600" height="400" fill="#0A1120" />
                <circle cx="300" cy="140" r="70" fill="#38BDF8" opacity="0.25" />
                <path
                  d="M0,240 C150,190 300,310 450,230 C530,190 570,220 600,240 L600,400 L0,400 Z"
                  fill="url(#bapGrad)"
                  opacity="0.85"
                />
                <path
                  d="M0,290 C180,250 320,340 480,280 C550,260 580,275 600,290 L600,400 L0,400 Z"
                  fill="#1E3A8A"
                  opacity="0.95"
                />
                <text
                  x="300"
                  y="135"
                  textAnchor="middle"
                  fill="#FAF7F2"
                  fontSize="32"
                  fontWeight="900"
                  fontFamily="sans-serif"
                  letterSpacing="3"
                >
                  WATER BAPTISM
                </text>
                <text
                  x="300"
                  y="165"
                  textAnchor="middle"
                  fill="#7DD3FC"
                  fontSize="12"
                  fontFamily="monospace"
                  letterSpacing="3"
                >
                  NEW LIFE TESTIMONY CAROUSEL
                </text>
                <text
                  x="300"
                  y="360"
                  textAnchor="middle"
                  fill="#FAF7F2"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  JESUS OUR HOPE CUBAO • FAITH CELEBRATION
                </text>
              </g>
            )}

            {/* 08: WILDFIRE SUNDAY */}
            {item.svgVariant === "no-limits" && (
              <g>
                <defs>
                  <linearGradient id="limitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5A1F" />
                    <stop offset="100%" stopColor="#FACC15" />
                  </linearGradient>
                </defs>
                <rect width="600" height="400" fill="#141118" />
                <polygon points="120,400 240,0 290,0 170,400" fill="url(#limitGrad)" opacity="0.4" />
                <polygon points="320,400 440,0 490,0 370,400" fill="url(#limitGrad)" opacity="0.25" />
                <g transform="rotate(-4 300 190)">
                  <rect x="140" y="145" width="320" height="70" fill="#FF5A1F" rx="3" />
                  <text
                    x="300"
                    y="196"
                    textAnchor="middle"
                    fill="#FAF7F2"
                    fontSize="48"
                    fontWeight="900"
                    fontFamily="Impact, sans-serif"
                    letterSpacing="5"
                  >
                    WILDFIRE SUNDAY
                  </text>
                </g>
                <text
                  x="300"
                  y="270"
                  textAnchor="middle"
                  fill="#FACC15"
                  fontSize="13"
                  fontFamily="monospace"
                  letterSpacing="4"
                  fontWeight="bold"
                >
                  WILDFIRE // YOUTH & STUDENTS SUNDAY
                </text>
                <text
                  x="300"
                  y="295"
                  textAnchor="middle"
                  fill="#E5E7EB"
                  fontSize="11"
                  fontFamily="sans-serif"
                >
                  Empowering the next generation to walk in God's calling
                </text>
              </g>
            )}
          </svg>
        </div>
      )}

      {/* Protruding Category Tag */}
      <div className="absolute bottom-3 left-3 bg-[#121316]/90 backdrop-blur-xs border border-white/20 px-2.5 py-1 rounded-xs font-mono text-[9px] font-bold text-white uppercase flex items-center gap-1.5 shadow-sm pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
        <span>{item.category}</span>
      </div>

      {/* Click-to-Expand Indicator */}
      {!isExpanded && (
        <div className="absolute top-3 right-3 bg-black/60 p-1.5 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity text-white pointer-events-none">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
}

export function Chapter4BrokenGridShowcase() {
  const { activeAccent, expandedCardId, setExpandedCardId } = useCreativesStore();
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>("ALL WORKS");

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (selectedCategory === "ALL WORKS") return true;
    return item.category === selectedCategory;
  });

  const expandedItem = PORTFOLIO_ITEMS.find((item) => item.id === expandedCardId);

  return (
    <section
      id="chapter-4"
      className="relative min-h-screen py-20 bg-[#F4F1EA] text-[#121316] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#121316]/25 bg-white mb-3 text-xs font-mono font-bold">
            <Grid className="w-3.5 h-3.5" style={{ color: activeAccent }} />
            <span>CHAPTER 04 // BROKEN-GRID PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            CURATED WORKS.
            <br />
            <span
              className="underline decoration-wavy decoration-2 transition-colors duration-300"
              style={{ textDecorationColor: activeAccent }}
            >
              EXPANDED STORIES.
            </span>
          </h2>
          <p className="mt-3 text-[#5A5D64] text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
            Explore our Sunday posters, worship photography, and event campaigns. Click any artwork
            to inspect its creative recipe and production specs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#121316]/20">
          <Filter className="w-4 h-4 text-[#5A5D64] mr-1 hidden sm:block" />
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all duration-200 border cursor-pointer",
                  isSelected
                    ? "bg-[#121316] text-[#FAF7F2] border-[#121316] shadow-xs"
                    : "bg-white text-[#5A5D64] border-[#121316]/20 hover:border-[#121316]/50 hover:text-[#121316]"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Broken Grid Gallery Wall */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setExpandedCardId(item.id)}
              className={cn(
                item.gridSpan,
                "group cursor-pointer rounded-sm bg-[#FAF7F2] border border-[#121316]/25 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-4 relative"
              )}
            >
              {/* Protruding FIG. Badge */}
              <div className="dau-fig-badge">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
                <span>{item.fig}</span>
              </div>

              {/* COORD Telemetry */}
              <div className="dau-coord-header">
                <span className="font-mono text-[9px] text-[#5A5D64]">{item.coord}</span>
                <span className="font-mono text-[9px] text-[#121316] font-bold">CLICK TO ENLARGE</span>
              </div>

              {/* Artwork Container */}
              <div className="rounded-xs overflow-hidden mb-3 border border-[#121316]/20">
                <PortfolioArtworkRenderer item={item} />
              </div>

              {/* Card Meta */}
              <h3 className="font-bold text-base text-[#121316] group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#5A5D64] mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              {/* Bottom Quick Recipe Pill */}
              <div className="mt-3 pt-2.5 border-t border-[#121316]/10 flex items-center justify-between text-[10px] font-mono text-[#5A5D64]">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-3 h-3" />
                  <div className="flex -space-x-1">
                    {item.recipe.swatches.map((color, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-white"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <span>{item.recipe.branches[0].split(":")[0]}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* "May Pinalalaki" 2x Expanded Modal Feature View */}
        <AnimatePresence>
          {expandedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
              <motion.div
                layoutId={`card-${expandedItem.id}`}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] border border-[#121316]/40 rounded-sm p-6 sm:p-8 shadow-2xl"
              >
                {/* Header with Badge & Close Button */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono font-bold uppercase border border-[#121316]/30 bg-white rounded-xs text-[#121316] shadow-xs">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: expandedItem.accent }}
                    />
                    <span>{expandedItem.fig} {"// EXPANDED FEATURE VIEW"}</span>
                  </div>

                  <button
                    onClick={() => setExpandedCardId(null)}
                    className="w-9 h-9 rounded-full bg-white border border-[#121316]/30 flex items-center justify-center hover:bg-zinc-100 transition-colors cursor-pointer shadow-xs"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5 text-[#121316]" />
                  </button>
                </div>

                <div className="dau-coord-header mt-2">
                  <span>{expandedItem.coord}</span>
                  <span className="font-bold" style={{ color: expandedItem.accent }}>
                    {expandedItem.category}
                  </span>
                </div>

                {/* High-Res Artwork */}
                <div className="rounded-xs overflow-hidden border border-[#121316]/30 my-4 shadow-sm">
                  <PortfolioArtworkRenderer item={expandedItem} isExpanded />
                </div>

                {/* Title & Description */}
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#121316]">
                    {expandedItem.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5A5D64] leading-relaxed">
                    {expandedItem.description}
                  </p>
                </div>

                {/* Creative Recipe Breakdown */}
                <div className="p-5 bg-white border border-[#121316]/20 rounded-sm">
                  <h4 className="font-mono text-xs font-bold text-[#121316] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" style={{ color: expandedItem.accent }} />
                    <span>Creative Recipe Breakdown (Behind The Scenes)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                    {/* Swatches */}
                    <div>
                      <span className="text-[10px] text-[#5A5D64] uppercase block mb-1">
                        Color Swatches
                      </span>
                      <div className="flex items-center gap-1.5">
                        {expandedItem.recipe.swatches.map((hex, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <span
                              className="w-4 h-4 rounded-full border border-black/20"
                              style={{ backgroundColor: hex }}
                            />
                            <span className="text-[10px]">{hex}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fonts */}
                    <div>
                      <span className="text-[10px] text-[#5A5D64] uppercase block mb-1">
                        Typography Stack
                      </span>
                      <span className="font-bold text-[#121316]">{expandedItem.recipe.fonts}</span>
                    </div>

                    {/* Camera EXIF */}
                    <div>
                      <span className="text-[10px] text-[#5A5D64] uppercase block mb-1">
                        Camera / Gear Specs
                      </span>
                      <span className="text-zinc-800">{expandedItem.recipe.exif}</span>
                    </div>

                    {/* Dimensions */}
                    <div>
                      <span className="text-[10px] text-[#5A5D64] uppercase block mb-1">
                        Dimensions
                      </span>
                      <span className="text-zinc-800">{expandedItem.recipe.dimensions}</span>
                    </div>
                  </div>

                  {/* Collaborating Branches */}
                  <div className="mt-4 pt-3 border-t border-[#121316]/10 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono text-[#5A5D64] uppercase mr-2">
                      Collaborating Branches:
                    </span>
                    {expandedItem.recipe.branches.map((b, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FAF7F2] border border-[#121316]/20 text-[#121316]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Paint Wave Transition into Chapter 5 */}
      <div className="mt-20 w-full">
        <PaintDripDivider color={activeAccent} />
      </div>
    </section>
  );
}
