"use client";

import { useCallback, useRef, useState } from "react";
import EngagementBubbles from "./EngagementBubbles";

// Column configuration: speed in seconds, direction
const COLUMNS = [
  { speed: 20, dir: "up" as const },
  { speed: 28, dir: "down" as const },
  { speed: 24, dir: "up" as const },
  { speed: 30, dir: "down" as const },
  { speed: 22, dir: "up" as const },
  { speed: 26, dir: "down" as const },
  { speed: 29, dir: "up" as const },
];

// Card decoration types — platform logos + plain/gradient
type CardDecor = "plain" | "tiktok" | "instagram" | "youtube" | "gradient";
// Glitch timing offsets per column (in seconds) so they don't all glitch at once
const GLITCH_DELAYS = [0, 3.7, 1.2, 5.4, 2.8, 4.1, 6.3];
const CARD_DECORS: CardDecor[][] = [
  ["plain", "tiktok", "plain", "youtube", "instagram", "plain", "tiktok", "plain"],
  ["instagram", "plain", "youtube", "plain", "tiktok", "gradient", "plain", "instagram"],
  ["plain", "youtube", "gradient", "tiktok", "plain", "instagram", "youtube", "plain"],
  ["tiktok", "plain", "instagram", "plain", "gradient", "plain", "youtube", "tiktok"],
  ["plain", "gradient", "tiktok", "youtube", "plain", "instagram", "plain", "gradient"],
  ["youtube", "plain", "tiktok", "instagram", "plain", "youtube", "gradient", "tiktok"],
  ["plain", "instagram", "youtube", "plain", "tiktok", "plain", "instagram", "youtube"],
];

// Monochromatic platform icons — all rendered in currentColor
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.19 8.19 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const TINT_COLORS = {
  bg: "rgba(255, 255, 255, 0.18)",
  bgActive: "rgba(255, 255, 255, 0.22)",
  border: "rgba(255, 255, 255, 0.12)",
  borderActive: "rgba(255, 255, 255, 0.25)",
  shadow: "0 0 8px rgba(255, 255, 255, 0.06)",
  shadowActive: "0 0 16px rgba(255, 255, 255, 0.1), inset 0 0 12px rgba(255, 255, 255, 0.05)",
  glow: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.09) 0%, transparent 70%)",
  glowActive: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.12) 0%, transparent 70%)",
} as const;

const PLATFORM_COLORS = {
  tiktok: {
    bg: "rgba(0, 0, 0, 0.85)",
    bgActive: "rgba(0, 0, 0, 0.90)",
    border: "rgba(255, 255, 255, 0.20)",
    borderActive: "rgba(255, 255, 255, 0.35)",
    shadow: "0 0 8px rgba(255, 255, 255, 0.08)",
    shadowActive: "0 0 16px rgba(255, 255, 255, 0.14), inset 0 0 12px rgba(255, 255, 255, 0.06)",
    glow: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.10) 0%, transparent 70%)",
    glowActive: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
  },
  youtube: {
    bg: "rgba(255, 0, 0, 0.55)",
    bgActive: "rgba(255, 0, 0, 0.65)",
    border: "rgba(255, 60, 60, 0.25)",
    borderActive: "rgba(255, 60, 60, 0.40)",
    shadow: "0 0 8px rgba(255, 0, 0, 0.10)",
    shadowActive: "0 0 16px rgba(255, 0, 0, 0.18), inset 0 0 12px rgba(255, 0, 0, 0.06)",
    glow: "radial-gradient(ellipse at center, rgba(255, 0, 0, 0.12) 0%, transparent 70%)",
    glowActive: "radial-gradient(ellipse at center, rgba(255, 0, 0, 0.18) 0%, transparent 70%)",
  },
  instagram: {
    bg: "rgba(225, 48, 108, 0.50)",
    bgActive: "rgba(225, 48, 108, 0.60)",
    border: "rgba(225, 48, 108, 0.25)",
    borderActive: "rgba(225, 48, 108, 0.40)",
    shadow: "0 0 8px rgba(225, 48, 108, 0.10)",
    shadowActive: "0 0 16px rgba(225, 48, 108, 0.18), inset 0 0 12px rgba(225, 48, 108, 0.06)",
    glow: "radial-gradient(ellipse at center, rgba(225, 48, 108, 0.12) 0%, transparent 70%)",
    glowActive: "radial-gradient(ellipse at center, rgba(225, 48, 108, 0.18) 0%, transparent 70%)",
  },
} as const;

function ReelCard({
  decor,
  isActive,
  glitchDelay,
}: {
  decor: CardDecor;
  isActive: boolean;
  glitchDelay: number;
}) {
  const hasLogo = decor === "tiktok" || decor === "instagram" || decor === "youtube";
  const shouldGlitch = hasLogo;
  const isPlatform = hasLogo && (decor === "tiktok" || decor === "instagram" || decor === "youtube");
  const c = isPlatform ? PLATFORM_COLORS[decor as keyof typeof PLATFORM_COLORS] : TINT_COLORS;

  return (
    <div
      className="w-[56px] h-[100px] rounded-xl flex-shrink-0 my-2 relative overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: isActive ? c.bgActive : c.bg,
        border: `1px solid ${isActive ? c.borderActive : c.border}`,
        filter: isActive ? "blur(0.5px)" : "blur(1px)",
        boxShadow: isActive ? c.shadowActive : c.shadow,
        animation: shouldGlitch
          ? `reel-glitch ${7 + glitchDelay}s ${glitchDelay}s ease-in-out infinite`
          : undefined,
      }}
    >
      {/* Inner screen glow */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          background: isActive ? c.glowActive : c.glow,
        }}
      />

      {/* Instagram rainbow gradient overlay */}
      {decor === "instagram" && (
        <div
          className="absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
            opacity: isActive ? 0.45 : 0.35,
          }}
        />
      )}

      {/* Platform logos — white on branded backgrounds */}
      {hasLogo && (
        <div
          className="absolute inset-0 flex items-center justify-center transition-colors duration-300"
          style={{
            color: isActive
              ? "rgba(255, 255, 255, 0.90)"
              : "rgba(255, 255, 255, 0.70)",
          }}
        >
          {decor === "tiktok" && <TikTokIcon size={18} />}
          {decor === "instagram" && <InstagramIcon size={18} />}
          {decor === "youtube" && <YouTubeIcon size={18} />}
        </div>
      )}

      {/* Gradient overlay for gradient-type cards */}
      {decor === "gradient" && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: isActive
              ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent)"
              : "linear-gradient(to bottom, rgba(255, 255, 255, 0.04), transparent)",
          }}
        />
      )}
    </div>
  );
}

function ScrollColumn({
  columnIndex,
  speed,
  dir,
  isActive,
}: {
  columnIndex: number;
  speed: number;
  dir: "up" | "down";
  isActive: boolean;
}) {
  const decors = CARD_DECORS[columnIndex % CARD_DECORS.length];
  const animationName = dir === "up" ? "reel-scroll-up" : "reel-scroll-down";
  const glitchDelay = GLITCH_DELAYS[columnIndex % GLITCH_DELAYS.length];

  return (
    <div className="flex flex-col items-center overflow-hidden h-full">
      <div
        className="flex flex-col items-center transition-[animation-play-state] duration-300"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
          animationPlayState: isActive ? "paused" : "running",
        }}
      >
        {/* Original cards */}
        {decors.map((decor, i) => (
          <ReelCard key={`a-${i}`} decor={decor} isActive={isActive} glitchDelay={glitchDelay + i * 0.8} />
        ))}
        {/* Duplicate for seamless loop */}
        {decors.map((decor, i) => (
          <ReelCard key={`b-${i}`} decor={decor} isActive={isActive} glitchDelay={glitchDelay + i * 0.8} />
        ))}
      </div>
    </div>
  );
}

export default function ReelCascade() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeColumn, setActiveColumn] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const containerWidth = rect.width;

      // Calculate column positions
      const columnCount = 7; // desktop default
      const spacing = containerWidth / (columnCount + 1);

      let closestCol = 0;
      let closestDist = Infinity;

      for (let i = 0; i < columnCount; i++) {
        const colCenter = spacing * (i + 1);
        const dist = Math.abs(cursorX - colCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestCol = i;
        }
      }

      // Only activate if cursor is reasonably close to a column
      if (closestDist < spacing * 0.6) {
        setActiveColumn(closestCol);
      } else {
        setActiveColumn(null);
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setActiveColumn(null);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Edge fade masks */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0E0E10] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0E0E10] to-transparent z-10 pointer-events-none" />

      {/* Columns container */}
      <div className="absolute inset-0 flex justify-between px-[5%]">
        {/* Desktop: 7 columns */}
        {COLUMNS.map((col, i) => (
          <div
            key={i}
            className={`h-full hidden ${
              i < 3
                ? "flex! sm:flex!"
                : i < 5
                ? "sm:flex! md:flex!"
                : "lg:flex!"
            }`}
          >
            <ScrollColumn
              columnIndex={i}
              speed={col.speed}
              dir={col.dir}
              isActive={activeColumn === i}
            />
          </div>
        ))}
      </div>

      <EngagementBubbles />

      {/* Transparent cursor tracking overlay */}
      <div
        className="absolute inset-0 z-20"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
