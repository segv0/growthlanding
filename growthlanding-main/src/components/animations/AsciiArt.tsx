"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import type { AsciiArtConfig } from "@/types";

const animationClass: Record<string, string> = {
  glow: "ascii-glow",
  flash: "ascii-flash",
  center: "ascii-center-glow",
};

export default function AsciiArt({ config }: { config: AsciiArtConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative flex items-center justify-center mb-4">
      {/* Ambient glow backdrop */}
      <div className="absolute inset-0 bg-brand-500/8 blur-lg rounded-full" />
      <div
        className="relative font-mono leading-tight select-none"
        style={{ fontSize: "11px" }}
      >
        {config.grid.map((row, ri) => (
          <div key={ri} className="flex">
            {row.map((cell, ci) => {
              const anim = cell.animation !== "none" && isInView
                ? animationClass[cell.animation]
                : undefined;

              return (
                <span
                  key={ci}
                  className="inline-block text-center"
                  style={{
                    width: "1ch",
                    animation: anim
                      ? `${anim} ${cell.animation === "flash" ? "2.5s" : "2s"} ease-in-out ${cell.delay}s infinite`
                      : undefined,
                    color: !anim
                      ? cell.char.trim() ? "rgba(145, 70, 255, 0.15)" : "transparent"
                      : undefined,
                  }}
                >
                  {cell.char}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
