"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

interface BgmContextType {
  isPlaying: boolean;
  toggleBgm: () => void;
  playBgm: () => void;
  pauseBgm: () => void;
}

const BgmContext = createContext<BgmContextType>({
  isPlaying: true,
  toggleBgm: () => {},
  playBgm: () => {},
  pauseBgm: () => {},
});

export function BgmProvider({ children }: { children: React.ReactNode }) {
  // Default to AUTO ON on website load
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const manuallyPausedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if the user previously turned off BGM manually in this session
    const wasManuallyOff = sessionStorage.getItem("bgm_manually_off") === "true";
    if (wasManuallyOff) {
      manuallyPausedRef.current = true;
      setIsPlaying(false);
    } else {
      manuallyPausedRef.current = false;
      setIsPlaying(true);
    }

    const audio = new Audio("/bgm.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.75;
    audioRef.current = audio;

    audio.addEventListener("play", () => {
      if (!manuallyPausedRef.current) setIsPlaying(true);
    });
    audio.addEventListener("pause", () => {
      if (manuallyPausedRef.current) setIsPlaying(false);
    });

    const startAudio = () => {
      if (manuallyPausedRef.current) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser restricts unmuted autoplay before the first user gesture,
          // attach a listener to automatically unlock & play on the first touch/click anywhere
          const unlockOnGesture = () => {
            if (!manuallyPausedRef.current) {
              audio
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
            }
            cleanupGestures();
          };

          const cleanupGestures = () => {
            window.removeEventListener("pointerdown", unlockOnGesture);
            window.removeEventListener("touchstart", unlockOnGesture);
            window.removeEventListener("click", unlockOnGesture);
            window.removeEventListener("keydown", unlockOnGesture);
          };

          window.addEventListener("pointerdown", unlockOnGesture, { once: true, passive: true });
          window.addEventListener("touchstart", unlockOnGesture, { once: true, passive: true });
          window.addEventListener("click", unlockOnGesture, { once: true, passive: true });
          window.addEventListener("keydown", unlockOnGesture, { once: true, passive: true });
        });
    };

    if (!wasManuallyOff) {
      startAudio();
    }

    return () => {
      audio.pause();
    };
  }, []);

  const playBgm = useCallback(() => {
    manuallyPausedRef.current = false;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("bgm_manually_off");
    }
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play gesture error:", err);
        });
    }
    setIsPlaying(true);
  }, []);

  const pauseBgm = useCallback(() => {
    manuallyPausedRef.current = true;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bgm_manually_off", "true");
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  const toggleBgm = useCallback(() => {
    if (isPlaying) {
      pauseBgm();
    } else {
      playBgm();
    }
  }, [isPlaying, playBgm, pauseBgm]);

  return (
    <BgmContext.Provider value={{ isPlaying, toggleBgm, playBgm, pauseBgm }}>
      {children}
    </BgmContext.Provider>
  );
}

export function useBgm() {
  return useContext(BgmContext);
}
