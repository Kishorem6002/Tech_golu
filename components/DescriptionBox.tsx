import React from "react";

interface DescriptionBoxProps {
  englishDesc: string;
  tamilDesc: string;
}

export function DescriptionBox({ englishDesc, tamilDesc }: DescriptionBoxProps) {
  return (
    <div className="w-full rounded-2xl p-[1px] bg-gradient-to-b from-[#D4AF37]/40 via-[#AA7C11]/20 to-[#D4AF37]/30 shadow-lg shadow-black/50">
      <div className="w-full rounded-[15px] bg-[#0E1411]/90 backdrop-blur-md p-3.5 sm:p-4 flex flex-row items-stretch gap-3">
        {/* Left Column: English */}
        <div className="flex-1 flex flex-col justify-start">
          <div className="mb-2">
            <span className="inline-block text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#FFEAA7] tracking-wide">
              English
            </span>
          </div>
          <p className="text-[11px] sm:text-[12px] leading-relaxed text-[#D5CDBC] font-sans">
            {englishDesc}
          </p>
        </div>

        {/* Center Golden Divider */}
        <div className="w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent shrink-0 my-1" />

        {/* Right Column: Tamil */}
        <div className="flex-1 flex flex-col justify-start">
          <div className="mb-2">
            <span className="inline-block text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#FFEAA7] tracking-wide font-sans">
              தமிழ்
            </span>
          </div>
          <p className="text-[11px] sm:text-[12px] leading-relaxed text-[#D5CDBC] font-sans">
            {tamilDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
