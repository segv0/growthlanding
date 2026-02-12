"use client";

import Container from "@/components/ui/Container";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import ReelCascade from "@/components/backgrounds/ReelCascade";

import { Play, Instagram, Twitch, Eye } from "lucide-react";
import type { HeroDict } from "@/types";

/* ------------------------------------------------------------------ */
/*  Inline SVGs for platforms without lucide icons                     */
/* ------------------------------------------------------------------ */

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.56a8.2 8.2 0 0 0 4.77 1.52V6.69h-1.01Z" />
    </svg>
  );
}

function KickIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#53FC18" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontWeight="900"
        fontSize="14"
        fill="#000"
        fontFamily="system-ui, sans-serif"
      >
        K
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  ClipFlowIllustration                                               */
/* ------------------------------------------------------------------ */

const FLOW_PATHS = [
  // Twitch → center: already purple, no color shift needed
  { id: "path-tl", d: "M 96,130 C 170,130 200,200 252,200", fromDim: true, delay: 0, startColors: ["#9146FF", "#A970FF", "#C4B1FF"], endColors: undefined },
  // Kick → center: starts green, transitions to purple
  { id: "path-bl", d: "M 96,270 C 170,270 200,200 252,200", fromDim: true, delay: 0.4, startColors: ["#53FC18", "#76FD4D", "#9CFE82"], endColors: undefined },
  // Center → TikTok: purple → white
  { id: "path-tr", d: "M 348,200 C 400,200 440,130 490,130", fromDim: false, delay: 1.5, startColors: ["#9146FF", "#A970FF", "#C4B1FF"], endColors: ["#FFFFFF", "#E0E0E0", "#C0C0C0"] },
  // Center → Instagram: purple → pink
  { id: "path-br", d: "M 348,200 C 400,200 440,270 490,270", fromDim: false, delay: 1.9, startColors: ["#9146FF", "#A970FF", "#C4B1FF"], endColors: ["#E1306C", "#E85A8A", "#F0A0B8"] },
];

const PARTICLES = [
  { top: "8%", left: "20%", size: 3, dur: "6s", variant: 1 },
  { top: "15%", left: "75%", size: 2, dur: "8s", variant: 2 },
  { top: "70%", left: "15%", size: 2.5, dur: "7s", variant: 2 },
  { top: "80%", left: "80%", size: 2, dur: "9s", variant: 1 },
  { top: "40%", left: "10%", size: 1.5, dur: "7.5s", variant: 1 },
  { top: "45%", left: "88%", size: 2, dur: "6.5s", variant: 2 },
  { top: "90%", left: "45%", size: 1.5, dur: "8.5s", variant: 1 },
  { top: "5%", left: "50%", size: 2, dur: "7s", variant: 2 },
];

const FLOW_DOTS = [
  { r: 5, fill: "#9146FF", opacityValues: "0;1;1;0", offsetFraction: 0 },
  { r: 3.5, fill: "#A970FF", opacityValues: "0;0.8;0.8;0", offsetFraction: 0.8 },
  { r: 2.5, fill: "#C4B1FF", opacityValues: "0;0.6;0.6;0", offsetFraction: 1.6 },
];

export function ClipFlowIllustration() {
  return (
    <div className="relative w-full max-w-[600px] mx-auto h-[400px]">
      {/* Ambient background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-500/8 blur-[100px] pointer-events-none" />

      {/* Floating ambient particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-brand-400/30 pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size * 2,
            height: p.size * 2,
            animation: `particle-float-${p.variant} ${p.dur} ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* ---------- SVG Layer: paths, dots, patterns ---------- */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 400"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Dot grid pattern */}
          <pattern
            id="dot-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="1" fill="white" opacity="0.04" />
          </pattern>

          {/* Glow filter for flow dots */}
          <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Path gradient definitions */}
          {FLOW_PATHS.map((p) => (
            <linearGradient
              key={`grad-${p.id}`}
              id={`grad-${p.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor={p.startColors[0]}
                stopOpacity={p.fromDim ? 0.1 : 0.6}
              />
              <stop
                offset="100%"
                stopColor={p.endColors?.[0] ?? "#9146FF"}
                stopOpacity={p.fromDim ? 0.6 : 0.1}
              />
            </linearGradient>
          ))}
        </defs>

        {/* Background dot grid */}
        <rect width="600" height="400" fill="url(#dot-grid)" />

        {/* Curved paths — base track + animated gradient overlay */}
        {FLOW_PATHS.map((p) => (
          <g key={p.id}>
            <path
              d={p.d}
              stroke="#2F2F35"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <path
              d={p.d}
              stroke={`url(#grad-${p.id})`}
              strokeWidth="2"
              strokeDasharray="8 12"
              style={{ animation: "dash-flow 3s linear infinite" }}
            />
          </g>
        ))}

        {/* Animated flow dots following curved paths */}
        {FLOW_PATHS.map((p) =>
          FLOW_DOTS.map((dot, di) => {
            const startFill = p.startColors[di];
            const endFill = p.endColors?.[di] ?? dot.fill;
            const needsColorAnim = startFill !== endFill;
            return (
              <circle
                key={`${p.id}-dot-${di}`}
                r={dot.r}
                fill={startFill}
                filter="url(#dot-glow)"
              >
                <animateMotion
                  path={p.d}
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${p.delay + dot.offsetFraction}s`}
                />
                <animate
                  attributeName="opacity"
                  values={dot.opacityValues}
                  keyTimes="0;0.1;0.85;1"
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${p.delay + dot.offsetFraction}s`}
                />
                {needsColorAnim && (
                  <animate
                    attributeName="fill"
                    values={`${startFill};${startFill};${endFill};${endFill}`}
                    keyTimes="0;0.3;0.7;1"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${p.delay + dot.offsetFraction}s`}
                  />
                )}
              </circle>
            );
          })
        )}
      </svg>

      {/* ---------- Center Play Button ---------- */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {/* Ambient glow backdrop */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-brand-500/10 blur-[60px] pointer-events-none" />

        {/* Concentric rotating rings with orbital particles */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg className="w-32 h-32" viewBox="0 0 128 128">
            {/* Outer dashed ring — clockwise */}
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#9146FF"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              fill="none"
              opacity="0.3"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 64 64"
                to="360 64 64"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Inner dashed ring — counter-clockwise */}
            <circle
              cx="64"
              cy="64"
              r="50"
              stroke="#9146FF"
              strokeWidth="0.5"
              strokeDasharray="6 6"
              fill="none"
              opacity="0.2"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 64 64"
                to="0 64 64"
                dur="15s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Orbital dot on outer ring */}
            <circle cx="64" cy="6" r="2" fill="#9146FF" opacity="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 64 64"
                to="360 64 64"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Orbital dot on inner ring */}
            <circle cx="64" cy="14" r="1.5" fill="#9146FF" opacity="0.3">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 64 64"
                to="0 64 64"
                dur="15s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Pulsing inner border ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-[104px] h-[104px] rounded-2xl border border-brand-500/30"
            style={{ animation: "pulse-ring 3s ease-in-out infinite" }}
          />
        </div>

        {/* Play button card */}
        <div
          className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1F1F23] to-[#2A2A30] border-2 border-brand-500 flex items-center justify-center"
          style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }}
        >
          <Play className="w-10 h-10 text-brand-500 fill-brand-500" />
        </div>
      </div>

      {/* ---------- Source Icons (left side) ---------- */}

      {/* Twitch */}
      <div
        className="absolute left-0 top-[23.5%]"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-[#9146FF]/20 blur-xl pointer-events-none" />
          <div className="relative w-[72px] h-[72px] rounded-xl bg-gradient-to-br from-[#1F1F23] to-[#252528] border border-[#3A3A42] flex items-center justify-center shadow-lg shadow-black/20">
            <Twitch className="w-8 h-8 text-[#9146FF]" />
          </div>
        </div>
      </div>

      {/* Kick */}
      <div
        className="absolute left-0 top-[58.5%]"
        style={{ animation: "float 4s ease-in-out infinite 1s" }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-[#53FC18]/15 blur-xl pointer-events-none" />
          <div className="relative w-[72px] h-[72px] rounded-xl bg-gradient-to-br from-[#1F1F23] to-[#252528] border border-[#3A3A42] flex items-center justify-center shadow-lg shadow-black/20">
            <KickIcon className="w-9 h-9" />
          </div>
        </div>
      </div>

      {/* ---------- Destination Icons (right side) ---------- */}

      {/* TikTok */}
      <div
        className="absolute right-0 top-[23.5%] flex items-center gap-3"
        style={{ animation: "float 4s ease-in-out infinite 0.5s" }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-white/10 blur-xl pointer-events-none" />
          <div className="relative w-[72px] h-[72px] rounded-xl bg-gradient-to-br from-[#1F1F23] to-[#252528] border border-[#3A3A42] flex items-center justify-center shadow-lg shadow-black/20">
            <TikTokIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 bg-[#1A1A1E]/90 border border-[#2F2F35] rounded-lg px-2.5 py-1.5 backdrop-blur-sm shadow-lg shadow-black/20"
          style={{ animation: "badge-pulse 3s ease-in-out infinite" }}
        >
          <Eye className="w-3 h-3 text-brand-400" />
          <span className="text-xs text-gray-300 font-medium whitespace-nowrap">
            142K
          </span>
        </div>
      </div>

      {/* Instagram */}
      <div
        className="absolute right-0 top-[58.5%] flex items-center gap-3"
        style={{ animation: "float 4s ease-in-out infinite 1.5s" }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-[#E1306C]/15 blur-xl pointer-events-none" />
          <div className="relative w-[72px] h-[72px] rounded-xl bg-gradient-to-br from-[#1F1F23] to-[#252528] border border-[#3A3A42] flex items-center justify-center shadow-lg shadow-black/20">
            <Instagram className="w-8 h-8 text-[#E1306C]" />
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 bg-[#1A1A1E]/90 border border-[#2F2F35] rounded-lg px-2.5 py-1.5 backdrop-blur-sm shadow-lg shadow-black/20"
          style={{ animation: "badge-pulse 3s ease-in-out infinite 1s" }}
        >
          <Eye className="w-3 h-3 text-brand-400" />
          <span className="text-xs text-gray-300 font-medium whitespace-nowrap">
            89K
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroSection                                                        */
/* ------------------------------------------------------------------ */

export default function HeroSection({ dict }: { dict: HeroDict }) {
  const btnBase =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer";

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0E0E10] overflow-hidden">
      {/* Reel Cascade background — scoped stacking context */}
      <div className="absolute inset-0 z-0" style={{ isolation: "isolate" }}>
        <ReelCascade />
      </div>
      <Container className="relative z-30">
        <FadeInWhenVisible direction="up">
          <div className="flex flex-col items-center text-center">
            <h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight"
              aria-label={`${dict.headingStart}${dict.headingAccent}`}
            >
              <span className="text-[#9BA8B8]">
                {dict.headingStart}
              </span>
              <br />
              <span className="text-white">
                {dict.headingAccent}
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-lg mx-auto">
              {dict.description}
            </p>

            <div className="mt-8">
              <a
                href="#services"
                className={`${btnBase} border border-[#2F2F35] text-gray-300 hover:border-gray-500 hover:bg-[#1F1F23]`}
              >
                {dict.ctaSecondary}
              </a>
            </div>
          </div>
        </FadeInWhenVisible>
      </Container>
    </section>
  );
}
