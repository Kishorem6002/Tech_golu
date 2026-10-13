"use client";

import React from "react";
import { GODS_DATA } from "@/lib/gods";

interface GodPortraitProps {
  id: number;
  imageUrl?: string;
  name?: string;
}

export function GodPortrait({ id }: GodPortraitProps) {
  return (
    <div className="relative w-full max-w-[320px] aspect-[4/4.5] mx-auto flex items-center justify-center my-1">
      {/* Background radial gold aura glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.25)_0%,_transparent_70%)] blur-xl pointer-events-none rounded-full" />

      {/* Decorative Outer Golden Arch / Rounded Frame */}
      <div className="relative w-full h-full rounded-[22px] p-[2px] bg-gradient-to-b from-[#FFEAA7] via-[#D4AF37]/50 to-[#9E7820] shadow-[0_8px_30px_rgba(0,0,0,0.85)]">
        <div className="w-full h-full rounded-[20px] overflow-hidden bg-[#0A0E0C] relative flex items-center justify-center">
          
          {/* Pre-render all 8 deity images in DOM layers for 0ms zero-latency instant switching */}
          {GODS_DATA.map((god) => {
            const isActive = god.id === id;
            return (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={god.id}
                src={god.imageUrl}
                alt={god.name}
                loading="eager"
                decoding="sync"
                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-200 ${
                  isActive
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              />
            );
          })}

          {/* Delicate inner border ring */}
          <div className="absolute inset-0 pointer-events-none rounded-[20px] ring-1 ring-inset ring-white/10 z-20" />
        </div>
      </div>
    </div>
  );
}
