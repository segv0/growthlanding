"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function SectionBadge({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="inline-block relative">
      {/* Ambient purple glow */}
      <div className="absolute -inset-2 bg-brand-500/15 blur-[20px] rounded-full pointer-events-none" />

      {/* SVG orbiting dashed ring */}
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

      {/* Border + inner pill */}
      <div className="relative inline-flex rounded-full border border-brand-500/30 p-[1px]">
        <span className="relative inline-flex items-center gap-2 rounded-full bg-[#1F1F23] px-4 py-1.5">
          {/* Blinking dot */}
          <span
            className="relative w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0"
            style={{ animation: isInView ? "badge-dot-blink 2s ease-in-out infinite" : "none" }}
          />

          {/* Glowing text */}
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
