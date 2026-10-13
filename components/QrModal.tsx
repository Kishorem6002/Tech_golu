"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { GODS_DATA, GodItem } from "@/lib/gods";
import { X, ExternalLink, Copy, Check, Download, QrCode } from "lucide-react";

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGodId?: number;
}

export function QrModal({ isOpen, onClose, initialGodId = 1 }: QrModalProps) {
  const [selectedId, setSelectedId] = useState<number>(initialGodId);
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  useEffect(() => {
    setSelectedId(initialGodId);
  }, [initialGodId]);

  if (!isOpen) return null;

  const currentGod = GODS_DATA.find((g) => g.id === selectedId) || GODS_DATA[0];
  const targetUrl = `${baseUrl}/${selectedId}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0C120F] border border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 shadow-[0_0_35px_rgba(212,175,55,0.25)] flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-lg font-bold text-[#FFEAA7]">
              Golu QR Code Generator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#A69B89] hover:text-[#FFEAA7] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <p className="text-xs text-[#C5BBAA] mt-3 leading-relaxed">
          Scan this QR code with a phone to instantly view this deity. URL format:{" "}
          <span className="text-[#FFEAA7] font-mono">{`<domain>/${selectedId}`}</span>
        </p>

        {/* Deity Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mt-3">
          {GODS_DATA.map((god) => (
            <button
              key={god.id}
              onClick={() => setSelectedId(god.id)}
              className={`py-1.5 px-1 rounded-lg text-[11px] font-medium transition-all text-center truncate ${
                selectedId === god.id
                  ? "bg-[#D4AF37] text-black font-bold shadow-sm"
                  : "bg-[#141B16] text-[#A69B89] hover:bg-[#1E2620] hover:text-[#FFEAA7]"
              }`}
            >
              #{god.id} {god.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* QR Code Display Card */}
        <div className="mt-4 flex flex-col items-center justify-center bg-white p-5 rounded-xl shadow-inner mx-auto">
          <QRCodeSVG
            value={targetUrl}
            size={180}
            level="H"
            includeMargin={true}
          />
          <span className="mt-2 text-black font-serif text-xs font-bold tracking-wider">
            {currentGod.name} ({currentGod.tamilName})
          </span>
          <span className="text-[10px] text-neutral-600 font-mono mt-0.5">
            {targetUrl}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={copyUrl}
            className="flex-1 py-2 px-3 rounded-lg border border-[#D4AF37]/50 bg-[#141C17] text-xs text-[#FFEAA7] hover:bg-[#D4AF37]/20 flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>Copied Link!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </>
            )}
          </button>
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-lg border border-[#D4AF37]/50 bg-[#141C17] text-xs text-[#FFEAA7] hover:bg-[#D4AF37]/20 flex items-center justify-center gap-1.5 transition-colors text-center"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open /{selectedId}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
