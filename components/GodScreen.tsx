"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getGodById, GODS_DATA } from "@/lib/gods";
import { LotusIcon } from "./LotusIcon";
import { GodPortrait } from "./GodPortrait";
import { DescriptionBox } from "./DescriptionBox";
import { BgmButton } from "./BgmButton";
import { QRCodeSVG } from "qrcode.react";
import { QrCode } from "lucide-react";

interface GodScreenProps {
  id: number;
  showQrOnMain?: boolean;
  statusBadge?: string;
}

export function GodScreen({ id, showQrOnMain = false, statusBadge }: GodScreenProps) {
  const router = useRouter();
  const god = getGodById(id);
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-[#070A08] flex items-center justify-center p-0 sm:py-6 sm:px-4">
      {/* Common deep ambient background glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1C241E]/40 via-[#0A0E0C]/80 to-[#050706]" />

      {/* Main Screen Container */}
      <div className="relative w-full sm:max-w-[420px] min-h-[100dvh] sm:min-h-[820px] sm:max-h-[920px] sm:rounded-[36px] bg-[#0A0E0C] sm:border-2 sm:border-[#D4AF37]/35 shadow-2xl flex flex-col justify-between px-4 py-3 sm:px-5 sm:py-4 text-[#E8E2D5] overflow-y-auto">
        
        {/* Subtle decorative inner top glow */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none" />

        {/* 1. TOP HEADER: Lotus Icon only (No back button, no hamburger button) */}
        <header className="relative z-10 flex items-center justify-center pt-1.5 pb-1">
          <div className="flex flex-col items-center justify-center">
            <LotusIcon className="w-8 h-8 drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]" />
            {statusBadge && (
              <span className="text-[10px] text-[#D4AF37]/80 tracking-widest uppercase font-mono mt-0.5">
                {statusBadge}
              </span>
            )}
          </div>
        </header>

        {/* 2. MAIN CONTENT (Portrait, Titles, Bilingual Cards) */}
        <main className="relative z-10 flex flex-col items-center justify-center my-auto py-1">
          
          {/* Deity Framed Portrait: Pre-rendered layers with 0ms zero-latency instant cross-fade */}
          <div className="relative w-full">
            <GodPortrait id={god.id} imageUrl={god.imageUrl} name={god.name} />
          </div>

          {/* Deity Titles */}
          <div className="text-center mt-2.5 mb-2 transition-all duration-200">
            <h1 className="font-serif text-2xl sm:text-[26px] font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFEAA7] via-[#D4AF37] to-[#FFEAA7] drop-shadow-sm">
              {god.name}
            </h1>
            <p className="text-sm sm:text-base font-medium text-[#E5C158] mt-0.5 tracking-wide">
              {god.tamilName}
            </p>

            {/* Delicate Golden Flourish */}
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
              <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/80" />
              <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
            </div>
          </div>

          {/* Dual-Language Description Card (English & Tamil Side-by-Side) */}
          <div className="w-full mt-1">
            <DescriptionBox
              englishDesc={god.englishDesc}
              tamilDesc={god.tamilDesc}
            />
          </div>

          {/* ONLY 1 SINGLE QR CODE: Encodes the website root URL to get into the live experience */}
          {showQrOnMain && baseUrl && (
            <div className="w-full mt-3 rounded-2xl p-[1px] bg-gradient-to-r from-[#D4AF37]/30 via-[#FFEAA7]/40 to-[#D4AF37]/30">
              <div className="w-full rounded-[15px] bg-[#0C120F]/95 p-3 flex items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-lg shrink-0 shadow-sm">
                    {/* Single Master QR Code pointing to the website URL */}
                    <QRCodeSVG value={baseUrl} size={64} level="M" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-serif font-bold text-[#FFEAA7]">
                      <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Scan To Open On Mobile</span>
                    </div>
                    <p className="text-[10px] text-[#A69B89] mt-0.5 leading-snug">
                      One QR for exhibition · Changes dynamically with lights
                    </p>
                  </div>
                </div>

                <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-[#D4AF37]/15 text-[#FFEAA7] border border-[#D4AF37]/40 shrink-0 font-bold">
                  LIVE
                </span>
              </div>
            </div>
          )}

          {/* 3. BGM TOGGLE BUTTON (Auto-on, manual off only) */}
          <BgmButton />
        </main>

        {/* 4. FOOTER: Navarathri Tales & Step Pagination */}
        <footer className="relative z-10 pt-1 pb-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-0.5">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
            <LotusIcon className="w-3.5 h-3.5 opacity-90" />
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
          </div>
          <p className="font-serif text-xs tracking-widest text-[#D4AF37]/90 font-medium">
            Navarathri Tales
          </p>

          {/* Step pagination indicator (dots 1 to 8) */}
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            {GODS_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(`/${item.id}`)}
                aria-label={`Go to ${item.name}`}
                className={`transition-all rounded-full ${
                  item.id === god.id
                    ? "w-4 h-1.5 bg-[#D4AF37]"
                    : "w-1.5 h-1.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60"
                }`}
              />
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
