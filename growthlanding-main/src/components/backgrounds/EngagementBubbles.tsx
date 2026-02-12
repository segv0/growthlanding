"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Bubble {
  id: number;
  emoji: string;
  text: string;
  x: number;
  y: number;
  duration: number;
}

const ENGAGEMENT_ITEMS = [
  { emoji: "👁", text: "+5.2K" },
  { emoji: "❤️", text: "847" },
  { emoji: "🔥", text: "Trending" },
  { emoji: "💬", text: "256" },
  { emoji: "🔴", text: "Live" },
  { emoji: "🏆", text: "Top Clip" },
  { emoji: "👁", text: "+12K" },
  { emoji: "❤️", text: "2.1K" },
  { emoji: "🎯", text: "Viral" },
  { emoji: "💬", text: "1.4K" },
  { emoji: "🔥", text: "+340%" },
  { emoji: "👁", text: "+8.7K" },
  { emoji: "⭐", text: "Featured" },
  { emoji: "❤️", text: "523" },
  { emoji: "🚀", text: "Boosted" },
  { emoji: "👁", text: "+3.1K" },
];

function getVisibleColumns(): number {
  if (typeof window === "undefined") return 7;
  const w = window.innerWidth;
  if (w < 640) return 3;
  if (w < 1024) return 5;
  return 7;
}

function getMaxBubbles(): number {
  if (typeof window === "undefined") return 10;
  const w = window.innerWidth;
  if (w < 640) return 5;
  if (w < 1024) return 7;
  return 10;
}

export default function EngagementBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextId = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);

  const spawnBubble = useCallback(() => {
    if (pausedRef.current) return;

    setBubbles((prev) => {
      if (prev.length >= getMaxBubbles()) return prev;

      const cols = getVisibleColumns();
      // Exclude center columns so bubbles don't block hero text
      const edgeCols = cols <= 3
        ? [0, cols - 1]                       // mobile: only outer 2
        : [0, 1, cols - 2, cols - 1];         // desktop: outer 2 on each side
      const colIndex = edgeCols[Math.floor(Math.random() * edgeCols.length)];
      // Match the justify-between px-[5%] layout
      const colX = 5 + (90 / (cols - 1)) * colIndex + (Math.random() * 4 - 2);
      const item =
        ENGAGEMENT_ITEMS[Math.floor(Math.random() * ENGAGEMENT_ITEMS.length)];

      const bubble: Bubble = {
        id: nextId.current++,
        emoji: item.emoji,
        text: item.text,
        x: Math.max(2, Math.min(98, colX)),
        y: 20 + Math.random() * 60,
        duration: 3.5 + Math.random(),
      };

      return [...prev, bubble];
    });
  }, []);

  const scheduleNext = useCallback(() => {
    const delay = 800 + Math.random() * 700;
    timerRef.current = setTimeout(() => {
      spawnBubble();
      scheduleNext();
    }, delay);
  }, [spawnBubble]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const onMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        pausedRef.current = true;
        if (timerRef.current) clearTimeout(timerRef.current);
        setBubbles([]);
      }
    };
    mql.addEventListener("change", onMotionChange);

    // Pause when tab hidden
    const onVisibility = () => {
      if (document.hidden) {
        pausedRef.current = true;
        if (timerRef.current) clearTimeout(timerRef.current);
      } else {
        pausedRef.current = false;
        scheduleNext();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Start spawning
    scheduleNext();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      mql.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [scheduleNext]);

  const removeBubble = useCallback((id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-[#1A1A1E]/80 border border-[#2F2F35]/60 px-2.5 py-1 backdrop-blur-sm shadow-lg shadow-black/20 whitespace-nowrap"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            animation: `engagement-bubble-float ${b.duration}s ease-out forwards`,
          }}
          onAnimationEnd={() => removeBubble(b.id)}
        >
          <span className="text-[11px] font-medium text-gray-300">
            {b.emoji}{" "}
            <span className="text-gray-400">{b.text}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
