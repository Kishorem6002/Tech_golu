import React from "react";

export function LotusIcon({
  className = "w-6 h-6",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="lotusGoldShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9C731C" />
        </linearGradient>
        <filter id="lotusGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#FFEAA7" floodOpacity="0.4" />
        </filter>
      </defs>
      
      {/* Central Tall Divine Petal */}
      <path
        d="M60 8 C65 28 72 50 60 72 C48 50 55 28 60 8 Z"
        fill="url(#lotusGoldShine)"
        filter="url(#lotusGlow)"
      />
      
      {/* Mid Left Petal */}
      <path
        d="M60 22 C46 32 36 50 50 68 C54 55 57 40 60 22 Z"
        fill="url(#lotusGoldShine)"
        opacity="0.9"
      />
      
      {/* Mid Right Petal */}
      <path
        d="M60 22 C74 32 84 50 70 68 C66 55 63 40 60 22 Z"
        fill="url(#lotusGoldShine)"
        opacity="0.9"
      />
      
      {/* Far Left Petal */}
      <path
        d="M52 40 C34 44 18 56 38 72 C44 65 48 54 52 40 Z"
        fill="url(#lotusGoldShine)"
        opacity="0.8"
      />
      
      {/* Far Right Petal */}
      <path
        d="M68 40 C86 44 102 56 82 72 C76 65 72 54 68 40 Z"
        fill="url(#lotusGoldShine)"
        opacity="0.8"
      />
      
      {/* Bottom Lotus Base / Calyx */}
      <path
        d="M32 71 C50 76 70 76 88 71 C80 80 40 80 32 71 Z"
        fill="url(#lotusGoldShine)"
        opacity="0.95"
      />
    </svg>
  );
}
