"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Users,
  Check,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Palette,
  FileText,
  Share2,
  HeartHandshake,
  ShieldAlert,
} from "lucide-react";
import { useCreativesStore } from "@/store/useCreativesStore";
import { CREATIVES_BRANCHES } from "@/data/creativesRolesData";
import { cn } from "@/lib/utils";

export const GOOGLE_FORM_URL = "https://forms.gle/AXmj7uZFNKisdVfK6";

// Exact 29x29 Version 3-L QR Code SVG Path encoding https://forms.gle/AXmj7uZFNKisdVfK6
const QR_CODE_SVG_PATH =
  "M0,0h1v1h-1zM1,0h1v1h-1zM2,0h1v1h-1zM3,0h1v1h-1zM4,0h1v1h-1zM5,0h1v1h-1zM6,0h1v1h-1zM10,0h1v1h-1zM14,0h1v1h-1zM19,0h1v1h-1zM20,0h1v1h-1zM22,0h1v1h-1zM23,0h1v1h-1zM24,0h1v1h-1zM25,0h1v1h-1zM26,0h1v1h-1zM27,0h1v1h-1zM28,0h1v1h-1zM0,1h1v1h-1zM6,1h1v1h-1zM9,1h1v1h-1zM13,1h1v1h-1zM18,1h1v1h-1zM19,1h1v1h-1zM22,1h1v1h-1zM28,1h1v1h-1zM0,2h1v1h-1zM2,2h1v1h-1zM3,2h1v1h-1zM4,2h1v1h-1zM6,2h1v1h-1zM8,2h1v1h-1zM11,2h1v1h-1zM15,2h1v1h-1zM19,2h1v1h-1zM20,2h1v1h-1zM22,2h1v1h-1zM24,2h1v1h-1zM25,2h1v1h-1zM26,2h1v1h-1zM28,2h1v1h-1zM0,3h1v1h-1zM2,3h1v1h-1zM3,3h1v1h-1zM4,3h1v1h-1zM6,3h1v1h-1zM9,3h1v1h-1zM12,3h1v1h-1zM13,3h1v1h-1zM18,3h1v1h-1zM22,3h1v1h-1zM24,3h1v1h-1zM25,3h1v1h-1zM26,3h1v1h-1zM28,3h1v1h-1zM0,4h1v1h-1zM2,4h1v1h-1zM3,4h1v1h-1zM4,4h1v1h-1zM6,4h1v1h-1zM9,4h1v1h-1zM12,4h1v1h-1zM13,4h1v1h-1zM16,4h1v1h-1zM19,4h1v1h-1zM22,4h1v1h-1zM24,4h1v1h-1zM25,4h1v1h-1zM26,4h1v1h-1zM28,4h1v1h-1zM0,5h1v1h-1zM6,5h1v1h-1zM10,5h1v1h-1zM11,5h1v1h-1zM12,5h1v1h-1zM14,5h1v1h-1zM15,5h1v1h-1zM17,5h1v1h-1zM18,5h1v1h-1zM19,5h1v1h-1zM20,5h1v1h-1zM22,5h1v1h-1zM28,5h1v1h-1zM0,6h1v1h-1zM1,6h1v1h-1zM2,6h1v1h-1zM3,6h1v1h-1zM4,6h1v1h-1zM5,6h1v1h-1zM6,6h1v1h-1zM8,6h1v1h-1zM10,6h1v1h-1zM12,6h1v1h-1zM14,6h1v1h-1zM16,6h1v1h-1zM18,6h1v1h-1zM20,6h1v1h-1zM22,6h1v1h-1zM23,6h1v1h-1zM24,6h1v1h-1zM25,6h1v1h-1zM26,6h1v1h-1zM27,6h1v1h-1zM28,6h1v1h-1zM8,7h1v1h-1zM11,7h1v1h-1zM16,7h1v1h-1zM17,7h1v1h-1zM18,7h1v1h-1zM19,7h1v1h-1zM20,7h1v1h-1zM0,8h1v1h-1zM1,8h1v1h-1zM2,8h1v1h-1zM4,8h1v1h-1zM5,8h1v1h-1zM6,8h1v1h-1zM7,8h1v1h-1zM8,8h1v1h-1zM12,8h1v1h-1zM19,8h1v1h-1zM20,8h1v1h-1zM21,8h1v1h-1zM22,8h1v1h-1zM26,8h1v1h-1zM3,9h1v1h-1zM4,9h1v1h-1zM9,9h1v1h-1zM11,9h1v1h-1zM12,9h1v1h-1zM13,9h1v1h-1zM18,9h1v1h-1zM20,9h1v1h-1zM22,9h1v1h-1zM25,9h1v1h-1zM28,9h1v1h-1zM0,10h1v1h-1zM2,10h1v1h-1zM3,10h1v1h-1zM4,10h1v1h-1zM5,10h1v1h-1zM6,10h1v1h-1zM8,10h1v1h-1zM10,10h1v1h-1zM11,10h1v1h-1zM12,10h1v1h-1zM14,10h1v1h-1zM17,10h1v1h-1zM18,10h1v1h-1zM20,10h1v1h-1zM22,10h1v1h-1zM23,10h1v1h-1zM24,10h1v1h-1zM26,10h1v1h-1zM27,10h1v1h-1zM28,10h1v1h-1zM3,11h1v1h-1zM8,11h1v1h-1zM9,11h1v1h-1zM10,11h1v1h-1zM12,11h1v1h-1zM13,11h1v1h-1zM14,11h1v1h-1zM17,11h1v1h-1zM19,11h1v1h-1zM22,11h1v1h-1zM24,11h1v1h-1zM27,11h1v1h-1zM1,12h1v1h-1zM3,12h1v1h-1zM4,12h1v1h-1zM6,12h1v1h-1zM8,12h1v1h-1zM10,12h1v1h-1zM11,12h1v1h-1zM14,12h1v1h-1zM15,12h1v1h-1zM16,12h1v1h-1zM19,12h1v1h-1zM22,12h1v1h-1zM25,12h1v1h-1zM27,12h1v1h-1zM28,12h1v1h-1zM5,13h1v1h-1zM10,13h1v1h-1zM11,13h1v1h-1zM14,13h1v1h-1zM15,13h1v1h-1zM16,13h1v1h-1zM17,13h1v1h-1zM19,13h1v1h-1zM20,13h1v1h-1zM21,13h1v1h-1zM22,13h1v1h-1zM25,13h1v1h-1zM28,13h1v1h-1zM0,14h1v1h-1zM1,14h1v1h-1zM2,14h1v1h-1zM3,14h1v1h-1zM4,14h1v1h-1zM6,14h1v1h-1zM7,14h1v1h-1zM10,14h1v1h-1zM13,14h1v1h-1zM16,14h1v1h-1zM17,14h1v1h-1zM21,14h1v1h-1zM25,14h1v1h-1zM27,14h1v1h-1zM28,14h1v1h-1zM2,15h1v1h-1zM3,15h1v1h-1zM4,15h1v1h-1zM5,15h1v1h-1zM7,15h1v1h-1zM9,15h1v1h-1zM10,15h1v1h-1zM11,15h1v1h-1zM16,15h1v1h-1zM17,15h1v1h-1zM19,15h1v1h-1zM21,15h1v1h-1zM22,15h1v1h-1zM23,15h1v1h-1zM25,15h1v1h-1zM27,15h1v1h-1zM1,16h1v1h-1zM2,16h1v1h-1zM3,16h1v1h-1zM6,16h1v1h-1zM9,16h1v1h-1zM12,16h1v1h-1zM16,16h1v1h-1zM20,16h1v1h-1zM21,16h1v1h-1zM22,16h1v1h-1zM23,16h1v1h-1zM25,16h1v1h-1zM27,16h1v1h-1zM28,16h1v1h-1zM3,17h1v1h-1zM7,17h1v1h-1zM9,17h1v1h-1zM11,17h1v1h-1zM12,17h1v1h-1zM13,17h1v1h-1zM16,17h1v1h-1zM19,17h1v1h-1zM20,17h1v1h-1zM21,17h1v1h-1zM22,17h1v1h-1zM25,17h1v1h-1zM26,17h1v1h-1zM28,17h1v1h-1zM0,18h1v1h-1zM2,18h1v1h-1zM5,18h1v1h-1zM6,18h1v1h-1zM7,18h1v1h-1zM8,18h1v1h-1zM9,18h1v1h-1zM10,18h1v1h-1zM11,18h1v1h-1zM12,18h1v1h-1zM14,18h1v1h-1zM16,18h1v1h-1zM17,18h1v1h-1zM21,18h1v1h-1zM22,18h1v1h-1zM23,18h1v1h-1zM27,18h1v1h-1zM28,18h1v1h-1zM1,19h1v1h-1zM2,19h1v1h-1zM4,19h1v1h-1zM5,19h1v1h-1zM7,19h1v1h-1zM8,19h1v1h-1zM12,19h1v1h-1zM13,19h1v1h-1zM14,19h1v1h-1zM16,19h1v1h-1zM17,19h1v1h-1zM20,19h1v1h-1zM22,19h1v1h-1zM24,19h1v1h-1zM25,19h1v1h-1zM27,19h1v1h-1zM0,20h1v1h-1zM2,20h1v1h-1zM3,20h1v1h-1zM5,20h1v1h-1zM6,20h1v1h-1zM8,20h1v1h-1zM9,20h1v1h-1zM10,20h1v1h-1zM11,20h1v1h-1zM14,20h1v1h-1zM19,20h1v1h-1zM20,20h1v1h-1zM21,20h1v1h-1zM22,20h1v1h-1zM23,20h1v1h-1zM24,20h1v1h-1zM8,21h1v1h-1zM9,21h1v1h-1zM10,21h1v1h-1zM11,21h1v1h-1zM14,21h1v1h-1zM15,21h1v1h-1zM16,21h1v1h-1zM19,21h1v1h-1zM20,21h1v1h-1zM24,21h1v1h-1zM26,21h1v1h-1zM27,21h1v1h-1zM28,21h1v1h-1zM0,22h1v1h-1zM1,22h1v1h-1zM2,22h1v1h-1zM3,22h1v1h-1zM4,22h1v1h-1zM5,22h1v1h-1zM6,22h1v1h-1zM8,22h1v1h-1zM10,22h1v1h-1zM13,22h1v1h-1zM16,22h1v1h-1zM17,22h1v1h-1zM18,22h1v1h-1zM19,22h1v1h-1zM20,22h1v1h-1zM22,22h1v1h-1zM24,22h1v1h-1zM25,22h1v1h-1zM27,22h1v1h-1zM28,22h1v1h-1zM0,23h1v1h-1zM6,23h1v1h-1zM8,23h1v1h-1zM9,23h1v1h-1zM11,23h1v1h-1zM15,23h1v1h-1zM16,23h1v1h-1zM17,23h1v1h-1zM18,23h1v1h-1zM19,23h1v1h-1zM20,23h1v1h-1zM24,23h1v1h-1zM25,23h1v1h-1zM28,23h1v1h-1zM0,24h1v1h-1zM2,24h1v1h-1zM3,24h1v1h-1zM4,24h1v1h-1zM6,24h1v1h-1zM8,24h1v1h-1zM10,24h1v1h-1zM12,24h1v1h-1zM16,24h1v1h-1zM17,24h1v1h-1zM20,24h1v1h-1zM21,24h1v1h-1zM22,24h1v1h-1zM23,24h1v1h-1zM24,24h1v1h-1zM28,24h1v1h-1zM0,25h1v1h-1zM2,25h1v1h-1zM3,25h1v1h-1zM4,25h1v1h-1zM6,25h1v1h-1zM10,25h1v1h-1zM11,25h1v1h-1zM12,25h1v1h-1zM13,25h1v1h-1zM16,25h1v1h-1zM23,25h1v1h-1zM24,25h1v1h-1zM26,25h1v1h-1zM27,25h1v1h-1zM28,25h1v1h-1zM0,26h1v1h-1zM2,26h1v1h-1zM3,26h1v1h-1zM4,26h1v1h-1zM6,26h1v1h-1zM8,26h1v1h-1zM9,26h1v1h-1zM11,26h1v1h-1zM12,26h1v1h-1zM14,26h1v1h-1zM18,26h1v1h-1zM19,26h1v1h-1zM20,26h1v1h-1zM23,26h1v1h-1zM24,26h1v1h-1zM25,26h1v1h-1zM28,26h1v1h-1zM0,27h1v1h-1zM6,27h1v1h-1zM8,27h1v1h-1zM9,27h1v1h-1zM12,27h1v1h-1zM13,27h1v1h-1zM14,27h1v1h-1zM17,27h1v1h-1zM18,27h1v1h-1zM19,27h1v1h-1zM20,27h1v1h-1zM22,27h1v1h-1zM23,27h1v1h-1zM24,27h1v1h-1zM27,27h1v1h-1zM0,28h1v1h-1zM1,28h1v1h-1zM2,28h1v1h-1zM3,28h1v1h-1zM4,28h1v1h-1zM5,28h1v1h-1zM6,28h1v1h-1zM8,28h1v1h-1zM10,28h1v1h-1zM11,28h1v1h-1zM14,28h1v1h-1zM17,28h1v1h-1zM19,28h1v1h-1zM20,28h1v1h-1zM22,28h1v1h-1zM23,28h1v1h-1zM24,28h1v1h-1zM27,28h1v1h-1zM28,28h1v1h-1z";

const BRANCH_ICONS: Record<string, React.ElementType> = {
  "branch-photography": Camera,
  "branch-graphic-design": Palette,
  "branch-writeups": FileText,
  "branch-social-media": Share2,
};

export function Chapter6CreativesOnboarding() {
  const { activeAccent } = useCreativesStore();
  const [selectedBranchId, setSelectedBranchId] = useState<string>("branch-photography");

  const selectedBranch =
    CREATIVES_BRANCHES.find((b) => b.id === selectedBranchId) ?? CREATIVES_BRANCHES[0];

  return (
    <section
      id="chapter-6"
      className="relative min-h-screen py-20 bg-[#FAF7F2] text-[#121316] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#121316]/25 bg-white mb-3 text-xs font-mono font-bold">
            <Users className="w-3.5 h-3.5" style={{ color: activeAccent }} />
            <span>CHAPTER 06 // ONBOARDING & REGISTRATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            WHERE DO YOU
            <br />
            <span
              className="underline decoration-wavy decoration-2 transition-colors duration-300"
              style={{ textDecorationColor: activeAccent }}
            >
              FIT IN THE STUDIO?
            </span>
          </h2>
          <p className="mt-3 text-[#5A5D64] text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
            Select your creative track below, then submit your official registration on Google
            Forms. Zero prior experience needed: we train everyone hands-on!
          </p>
        </div>

        {/* 1. Bold 3-Step Training Progression Banner (Modeled after Tech Team) */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: "STEP 01",
                title: "SHADOW",
                desc: "Sit with our photographers, designers, or writers and observe the Sunday rhythm live.",
                bg: "bg-white text-[#121316] border-[#121316]/30",
              },
              {
                step: "STEP 02",
                title: "CO-PILOT",
                desc: "Shoot side-by-side, co-design sermon slides, or write recaps with a senior mentor.",
                bg: "bg-white text-[#121316] border-[#121316]/30",
              },
              {
                step: "STEP 03",
                title: "LEAD COVERAGE",
                desc: "Own your station: capture services, publish carousels, and share God's story.",
                bg: "bg-[#121316] text-[#FAF7F2] border-[#121316]",
              },
            ].map((item) => (
              <div
                key={item.step}
                className={cn("p-5 rounded-sm border shadow-xs flex flex-col justify-between", item.bg)}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-current/20 text-xs font-mono font-bold mb-3">
                    <span>{item.step}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight mb-2">{item.title}</h3>
                  <p className="text-xs opacity-80 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Interactive Role Selection Cards (Concise, skimmable, hook-oriented) */}
        <div className="mb-10">
          <div className="font-mono text-xs font-bold text-[#5A5D64] uppercase tracking-wider mb-3">
            SELECT YOUR CREATIVE TRACK // CLICK ANY CARD
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CREATIVES_BRANCHES.map((b) => {
              const Icon = BRANCH_ICONS[b.id] ?? Camera;
              const isSelected = selectedBranchId === b.id;
              return (
                <motion.div
                  key={b.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedBranchId(b.id)}
                  className={cn(
                    "p-5 rounded-sm border transition-all duration-200 cursor-pointer flex flex-col justify-between",
                    isSelected
                      ? "bg-white border-[#121316] shadow-md ring-2 ring-[#121316]"
                      : "bg-white/80 hover:bg-white border-[#121316]/20 shadow-xs hover:border-[#121316]/50"
                  )}
                >
                  <div>
                    {/* Header: Number + Icon */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#121316]/10 mb-3">
                      <span className="font-mono text-[10px] font-bold text-[#5A5D64]">
                        {b.number}
                      </span>
                      <Icon className="w-4 h-4" style={{ color: b.color }} />
                    </div>

                    <h3 className="text-base font-black text-[#121316] leading-tight mb-1">
                      {b.name}
                    </h3>
                    <p className="text-xs font-mono text-[#5A5D64] mb-3">{b.tagline}</p>
                    <p className="text-xs text-[#121316]/80 leading-relaxed font-sans mb-3">
                      {b.role}
                    </p>

                    {/* Google Form Checkbox Badge */}
                    <div className="p-2 rounded-xs bg-[#FAF7F2] border border-[#121316]/15 text-[10px] font-mono text-[#121316]">
                      <span className="text-[#5A5D64] block text-[9px] uppercase font-bold">
                        Google Form Option:
                      </span>
                      <span className="font-bold line-clamp-1">{b.formCheckboxValue}</span>
                    </div>
                  </div>

                  {/* Selection Status */}
                  <div
                    className={cn(
                      "mt-4 pt-2.5 border-t border-[#121316]/10 flex items-center justify-between text-xs font-mono font-bold",
                      isSelected ? "text-[#121316]" : "text-[#5A5D64]"
                    )}
                  >
                    <span>{isSelected ? "[SELECTED]" : "CLICK TO SELECT"}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3. Ministry Distinction & Team Culture Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Ministry Distinction */}
          <div className="lg:col-span-6 p-5 sm:p-6 bg-zinc-900 text-[#FAF7F2] rounded-sm border border-zinc-700 shadow-md">
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>MINISTRY DISTINCTION: CREATIVES VS. TECHNICALS</span>
            </div>
            <h4 className="text-lg font-black text-white mb-2">
              Which Ministry Should You Join?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4 font-sans">
              Passionate about photography, video reels, sermon graphics, or social recaps?
              You belong here in <strong>JOHIA Creatives</strong>.
              <br />
              <br />
              Want to operate <strong>ProPresenter lyrics, live streams, soundboards, or stage lights</strong> in the booth on Sundays? Check out <strong>JOHIA Technicals</strong>.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span>Both ministries collaborate closely every Sunday.</span>
            </div>
          </div>

          {/* Mentorship & Culture */}
          <div className="lg:col-span-6 p-5 sm:p-6 bg-white rounded-sm border border-[#121316]/25 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-blue-600">
                <HeartHandshake className="w-4 h-4" />
                <span>CULTURE // MENTORSHIP FIRST</span>
              </div>
              <h4 className="text-xl font-black text-[#121316] mb-2">
                “We Shall Evolve Together!”
              </h4>
              <p className="text-xs sm:text-sm text-[#5A5D64] leading-relaxed font-sans">
                You don’t need high-end gear or an agency portfolio. Many start with an iPhone or
                basic Canva templates. What matters is a willing heart to serve and share what God is
                doing back to the community.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#121316]/10 flex items-center justify-between text-xs font-mono font-bold text-[#121316]">
              <span>HANDS-ON MENTORSHIP</span>
              <span className="text-emerald-600">BEGINNERS 100% WELCOME</span>
            </div>
          </div>
        </div>

        {/* 4. Official Google Form Integration & QR Code (Matches Tech Team Exactly) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left CTA Card */}
          <div className="lg:col-span-7 bg-white text-[#121316] border border-[#121316]/30 shadow-md p-6 sm:p-8 flex flex-col justify-between gap-6 rounded-sm">
            <div>
              <div className="flex items-center justify-between border-b border-[#121316]/15 pb-3">
                <span className="font-mono text-xs sm:text-sm font-bold uppercase text-[#5A5D64]">
                  READY TO CREATE // CLAIM YOUR ROLE IN THE STUDIO
                </span>
                <span
                  className="font-mono text-xs font-bold px-2.5 py-0.5 rounded text-white"
                  style={{ backgroundColor: activeAccent }}
                >
                  JOHIA Creatives
                </span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-4 leading-none text-[#121316]">
                JOIN CREATIVES.
              </h3>

              <div className="mt-4 p-3 bg-[#FAF7F2] border border-[#121316]/20 rounded-xs font-mono text-xs">
                <span className="text-[#5A5D64] block text-[10px] uppercase font-bold">
                  Selected Track:
                </span>
                <span className="font-bold text-[#121316] text-sm">
                  {selectedBranch.name}
                </span>
                <div className="text-[11px] text-[#5A5D64] mt-1">
                  On Google Form, check:{" "}
                  <strong className="text-[#121316]">{selectedBranch.formCheckboxValue}</strong>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-white border border-[#121316] shadow-sm py-4 px-6 font-mono text-base font-black uppercase flex items-center justify-between gap-3 transition-transform hover:scale-[1.01] active:scale-98 cursor-pointer rounded-xs"
                style={{ backgroundColor: activeAccent }}
              >
                <span>REGISTER NOW ON GOOGLE FORMS</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5] shrink-0" />
              </a>

              <div className="flex items-center justify-between font-mono text-xs text-[#5A5D64] px-1">
                <span>OFFICIAL SIGN-UP LINK:</span>
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800 font-bold"
                >
                  forms.gle/AXmj7uZFNKisdVfK6
                </a>
              </div>
            </div>
          </div>

          {/* Right QR Code Card */}
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-5 bg-[#121316] hover:bg-zinc-900 border border-zinc-700 shadow-md p-6 flex flex-col items-center justify-between text-center gap-4 transition-transform hover:-translate-y-0.5 rounded-sm group"
          >
            {/* Header Church Logo */}
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
              <Image
                src="/images/johia-logo.png"
                alt="JOHIA"
                width={28}
                height={28}
                className="object-contain"
              />
              <span>JOHIA CREATIVES</span>
            </div>

            {/* 29x29 Crisp QR Code */}
            <div className="bg-white p-4 rounded-xs border border-zinc-700 shadow-inner">
              <svg
                viewBox="-2 -2 33 33"
                className="w-36 h-36 sm:w-40 sm:h-40"
                shapeRendering="crispEdges"
                aria-label="Scan QR Code to open JOHIA Creatives Google Form"
              >
                <rect x="-2" y="-2" width="33" height="33" fill="#FFFFFF" />
                <path d={QR_CODE_SVG_PATH} fill="#121316" />
              </svg>
            </div>

            <div className="space-y-1">
              <div
                className="text-white font-mono text-xs font-bold uppercase px-3 py-1 rounded-xs inline-block"
                style={{ backgroundColor: activeAccent }}
              >
                SCAN WITH PHONE CAMERA TO JOIN
              </div>
              <div className="text-sm font-mono text-zinc-300 group-hover:underline">
                forms.gle/AXmj7uZFNKisdVfK6
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
