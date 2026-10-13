"use client";

import React from "react";
import { useBgm } from "./BgmContext";
import { Music, VolumeX, Volume2 } from "lucide-react";

export function BgmButton() {
  const { isPlaying, toggleBgm } = useBgm();

  return (
    <div className="flex justify-center my-3 sm:my-4">
      <button
        onClick={toggleBgm}
        type="button"
        aria-label={isPlaying ? "Turn background music off" : "Turn background music on"}
        className={`group relative inline-flex items-center gap-2.5 px-6 py-2 rounded-full border text-xs font-semibold tracking-wider transition-all duration-300 shadow-md ${
          isPlaying
            ? "border-[#D4AF37] bg-[#1A211B] text-[#FFEAA7] shadow-[0_0_18px_rgba(212,175,55,0.35)] scale-105"
            : "border-[#D4AF37]/50 bg-[#0C120F]/90 text-[#C9BFAC] hover:border-[#D4AF37] hover:text-[#FFEAA7]"
        }`}
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span className="font-serif">BGM ON</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors" />
            <span className="font-serif">BGM OFF</span>
          </>
        )}
      </button>
    </div>
  );
}
