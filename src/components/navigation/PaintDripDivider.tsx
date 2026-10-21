"use client";

import React from "react";
import { useCreativesStore } from "@/store/useCreativesStore";
import { cn } from "@/lib/utils";

interface PaintDripDividerProps {
  className?: string;
  flip?: boolean;
  color?: string;
  showDrips?: boolean;
}

export function PaintDripDivider({
  className,
  flip = false,
  color,
  showDrips = true,
}: PaintDripDividerProps) {
  const activeAccent = useCreativesStore((state) => state.activeAccent);
  const fillColor = color || activeAccent;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden leading-none pointer-events-none select-none z-10",
        flip && "rotate-180",
        className
      )}
      style={{ height: "60px" }}
    >
      <svg
        viewBox="0 0 1440 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        {/* Layer 1: Background low opacity wave */}
        <path
          d="M0,30 C320,80 420,-10 680,45 C940,100 1200,10 1440,35 L1440,90 L0,90 Z"
          fill={fillColor}
          fillOpacity="0.15"
        />

        {/* Layer 2: Middle fluid wave */}
        <path
          d="M0,45 C280,10 500,85 780,40 C1060,-5 1250,70 1440,50 L1440,90 L0,90 Z"
          fill={fillColor}
          fillOpacity="0.4"
        />

        {/* Layer 3: Solid foreground dynamic wave with paint drip nodules */}
        <path
          d="M0,60 C180,40 340,75 520,55 C700,35 880,75 1060,55 C1240,35 1360,65 1440,58 L1440,90 L0,90 Z"
          fill={fillColor}
        />

        {/* Paint drips / droplets */}
        {showDrips && (
          <>
            <circle cx="280" cy="78" r="4.5" fill={fillColor} />
            <circle cx="640" cy="80" r="5" fill={fillColor} />
            <circle cx="980" cy="76" r="3.5" fill={fillColor} />
            <circle cx="1280" cy="82" r="4" fill={fillColor} />
          </>
        )}
      </svg>
    </div>
  );
}
