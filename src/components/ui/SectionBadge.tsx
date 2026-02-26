"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function SectionBadge({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="inline-block relative">
      {/* Layer 1: Ambient purple glow */}
      <div className="absolute -inset-2 bg-brand-500/15 blur-[20px] rounded-full pointer-events-none" />

      {/* Layer 2: SVG orbiting dashed ring */}
      <svg
        className="absolute -inset-3 overflow-visible pointer-events-none"
        aria-hidden="true"
      >
        <rect
          x="0" y="0" width="100%" height="100%"
          rx="999"
          stroke="rgba(145, 70, 255, 0.2)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          fill="none"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-24"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      {/* Layer 3+4: Gradient border + inner pill */}
      <div className="relative inline-flex rounded-full bg-gradient-to-r from-brand-500/50 via-brand-600/25 to-brand-500/50 p-[1px]">
        <span className="relative inline-flex items-center gap-2 rounded-full bg-[#1F1F23] px-4 py-1.5 overflow-hidden">
          {/* Layer 5: Shimmer sweep */}
          {isInView && (
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
              style={{ animation: "shimmer-sweep 3s ease-in-out infinite" }}
            />
          )}

          {/* Layer 6: Pulsing dot */}
          <span
            className="relative w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0"
            style={{ animation: "badge-dot-pulse 2s ease-in-out infinite" }}
          />

          {/* Layer 6: Glowing text */}
          <span
            className="relative font-mono text-xs text-brand-400 tracking-widest uppercase"
            style={{ animation: "badge-text-glow 3s ease-in-out infinite" }}
          >
            {children}
          </span>
        </span>
      </div>
    </div>
  );
}
