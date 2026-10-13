"use client";

import React, { useEffect, useState, useRef } from "react";
import { GodScreen } from "@/components/GodScreen";
import { getBrowserSupabase } from "@/lib/supabase";
import { LotusIcon } from "@/components/LotusIcon";
import { GODS_DATA } from "@/lib/gods";
import type { RealtimeChannel } from "@supabase/supabase-js";

export default function HomePage() {
  const [activeLedId, setActiveLedId] = useState<number | null>(null);
  const activeIdRef = useRef<number | null>(null);
  activeIdRef.current = activeLedId;

  useEffect(() => {
    let isMounted = true;
    let channel: RealtimeChannel | null = null;
    let supabaseClient: ReturnType<typeof getBrowserSupabase> | null = null;

    // 0. Pre-warm and cache all 8 deity images in browser RAM immediately
    if (typeof window !== "undefined") {
      GODS_DATA.forEach((god) => {
        const img = new window.Image();
        img.src = god.imageUrl;
      });
    }

    // 1. Direct query to Supabase DB for active LED / doll number
    const fetchDirectFromDb = async () => {
      try {
        if (!supabaseClient) {
          supabaseClient = getBrowserSupabase();
        }
        const { data, error } = await supabaseClient
          .from("golu_state")
          .select("doll_id")
          .eq("id", 1)
          .single();

        if (!error && data && typeof data.doll_id === "number") {
          const num = Number(data.doll_id);
          if (num >= 1 && num <= 8 && isMounted && num !== activeIdRef.current) {
            setActiveLedId(num);
          }
        }
      } catch {
        fetchFromApi();
      }
    };

    // Fast fallback API route check
    const fetchFromApi = async () => {
      try {
        const res = await fetch("/api/doll", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const rawId = data?.ledNumber ?? data?.dollId;
          if (typeof rawId === "number") {
            const num = Number(rawId);
            if (num >= 1 && num <= 8 && isMounted && num !== activeIdRef.current) {
              setActiveLedId(num);
            }
          }
        }
      } catch {}
    };

    // Execute instant DB check on mount
    fetchDirectFromDb();

    // 2. High-speed 400ms polling heartbeat for zero perceptible delay
    const interval = setInterval(fetchDirectFromDb, 400);

    // 3. Supabase Realtime WebSocket for instant sub-50ms push updates
    try {
      supabaseClient = getBrowserSupabase();
      channel = supabaseClient
        .channel("smart-golu-zero-latency-sync")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "golu_state",
            filter: "id=eq.1",
          },
          (payload) => {
            if (payload.new && "doll_id" in payload.new) {
              const newId = Number((payload.new as { doll_id: number }).doll_id);
              if (newId >= 1 && newId <= 8 && isMounted) {
                // Instantly update active deity
                setActiveLedId(newId);
              }
            }
          }
        )
        .subscribe();
    } catch {
      // Polling handles fallback
    }

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (supabaseClient && channel) {
        supabaseClient.removeChannel(channel);
      }
    };
  }, []);

  // Display sacred loading screen until initial live DB value is retrieved
  if (activeLedId === null) {
    return (
      <div className="min-h-screen w-full bg-[#070A08] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#D4AF37]/10 shadow-[0_0_25px_rgba(212,175,55,0.3)] animate-pulse">
          <LotusIcon className="w-10 h-10" />
        </div>
        <p className="font-serif text-[#FFEAA7] text-sm font-semibold tracking-wider mt-4">
          Connecting to Sacred Exhibition DB...
        </p>
        <p className="text-[11px] text-[#A69B89] mt-1 font-mono">
          Syncing active LED deity from Database
        </p>
      </div>
    );
  }

  // Once DB provides active LED number, load that deity alone with 0ms pre-rendered visuals
  return (
    <GodScreen
      id={activeLedId}
      showQrOnMain={true}
      statusBadge={`LED #${activeLedId} Active`}
    />
  );
}
