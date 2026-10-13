"use client";

import React from "react";
import Link from "next/link";
import { GODS_DATA } from "@/lib/gods";
import { LotusIcon } from "./LotusIcon";
import { X, QrCode, Music, Volume2, Sparkles } from "lucide-react";
import { useBgm } from "./BgmContext";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentGodId: number;
  onOpenQr: () => void;
}

export function NavigationDrawer({
  isOpen,
  onClose,
  currentGodId,
  onOpenQr,
}: NavigationDrawerProps) {
  const { isPlaying, toggleBgm } = useBgm();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xs bg-[#0C120F] border-l border-[#D4AF37]/30 h-full p-5 flex flex-col shadow-2xl overflow-y-auto animate-slideLeft">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2">
            <LotusIcon className="w-5 h-5" />
            <h3 className="font-serif text-base font-bold text-[#FFEAA7]">
              Ashta Lakshmi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#A69B89] hover:text-[#FFEAA7] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Utilities */}
        <div className="grid grid-cols-2 gap-2 my-3">
          <button
            onClick={() => {
              onClose();
              onOpenQr();
            }}
            className="py-2 px-3 rounded-lg border border-[#D4AF37]/40 bg-[#141B16] text-[11px] text-[#FFEAA7] hover:bg-[#D4AF37]/20 flex items-center justify-center gap-1.5 transition-colors font-medium"
          >
            <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>QR Codes</span>
          </button>

          <button
            onClick={toggleBgm}
            className="py-2 px-3 rounded-lg border border-[#D4AF37]/40 bg-[#141B16] text-[11px] text-[#FFEAA7] hover:bg-[#D4AF37]/20 flex items-center justify-center gap-1.5 transition-colors font-medium"
          >
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Music className="w-3.5 h-3.5 text-[#D4AF37]" />
            )}
            <span>{isPlaying ? "BGM Active" : "Play BGM"}</span>
          </button>
        </div>

        {/* 8 Deities List */}
        <div className="flex-1 space-y-1.5 py-2">
          <p className="text-[10px] uppercase font-semibold text-[#8C806D] tracking-wider mb-2">
            Select Sacred Deity
          </p>
          {GODS_DATA.map((god) => {
            const isActive = god.id === currentGodId;
            return (
              <Link
                key={god.id}
                href={`/${god.id}`}
                onClick={onClose}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                  isActive
                    ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#FFEAA7] shadow-sm"
                    : "border-white/5 bg-[#101713]/60 text-[#C5BBAA] hover:border-[#D4AF37]/40 hover:bg-[#141B16] hover:text-[#FFEAA7]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-serif font-bold ${
                      isActive
                        ? "bg-[#D4AF37] text-black"
                        : "bg-[#18201B] text-[#D4AF37] border border-[#D4AF37]/30"
                    }`}
                  >
                    {god.id}
                  </span>
                  <div className="truncate">
                    <p className="font-serif text-xs font-semibold truncate leading-tight">
                      {god.name}
                    </p>
                    <p className="text-[10px] text-[#8C806D] truncate leading-tight">
                      {god.tamilName}
                    </p>
                  </div>
                </div>
                {isActive && <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#D4AF37]/20 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#A69B89] font-serif">
            <LotusIcon className="w-3.5 h-3.5" />
            <span>Navarathri Tales</span>
          </div>
        </div>
      </div>
    </div>
  );
}
