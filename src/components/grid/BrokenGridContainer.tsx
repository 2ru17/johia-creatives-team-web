"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useCreativesStore } from "@/store/useCreativesStore";

interface BrokenGridContainerProps {
  children: React.ReactNode;
  className?: string;
  showGuides?: boolean;
}

export function BrokenGridContainer({
  children,
  className,
  showGuides,
}: BrokenGridContainerProps) {
  const globalGuides = useCreativesStore((state) => state.showGridGuides);
  const guidesActive = showGuides ?? globalGuides;

  return (
    <div
      className={cn(
        "relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        guidesActive && "studio-grid-guides ring-1 ring-blue-500/20",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 md:gap-6 items-start">
        {children}
      </div>
    </div>
  );
}

interface BrokenGridCardProps {
  children: React.ReactNode;
  fig?: string;
  coord?: string;
  tag?: string;
  className?: string;
  dark?: boolean;
  tilt?: "none" | "left" | "right" | "slight-left" | "slight-right";
  layoutId?: string;
  onClick?: () => void;
  accentBorder?: boolean;
}

export function BrokenGridCard({
  children,
  fig,
  coord,
  tag,
  className,
  dark = false,
  tilt = "none",
  layoutId,
  onClick,
  accentBorder = false,
}: BrokenGridCardProps) {
  const activeAccent = useCreativesStore((state) => state.activeAccent);

  const tiltClass = {
    none: "",
    left: "-rotate-2 hover:rotate-0 transition-transform duration-300",
    right: "rotate-2 hover:rotate-0 transition-transform duration-300",
    "slight-left": "-rotate-1 hover:rotate-0 transition-transform duration-300",
    "slight-right": "rotate-1 hover:rotate-0 transition-transform duration-300",
  }[tilt];

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      style={{
        borderColor: accentBorder ? activeAccent : undefined,
      }}
      className={cn(
        "relative rounded-sm p-5 md:p-6 transition-all duration-300",
        dark ? "dau-card-dark" : "dau-card",
        tiltClass,
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Protruding FIG. 0X Badge */}
      {fig && (
        <div
          className={cn(
            dark ? "dau-fig-badge-dark" : "dau-fig-badge",
            "flex items-center gap-1.5"
          )}
          style={{
            borderColor: accentBorder ? activeAccent : undefined,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ backgroundColor: activeAccent }}
          />
          <span>{fig}</span>
        </div>
      )}

      {/* COORD Telemetry Header */}
      {(coord || tag) && (
        <div className="dau-coord-header">
          <span className="font-mono text-[10px] tracking-widest uppercase truncate max-w-[70%]">
            {coord || "COORD // CUBAO_CREATIVES_GRID"}
          </span>
          {tag && (
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${activeAccent}25`,
                color: dark ? "#FAF7F2" : "#121316",
                border: `1px solid ${activeAccent}60`,
              }}
            >
              {tag}
            </span>
          )}
        </div>
      )}

      {children}
    </motion.div>
  );
}
