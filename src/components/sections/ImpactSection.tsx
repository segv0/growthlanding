"use client";

import { Twitch, TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import CountUp from "@/components/animations/CountUp";
import type { ImpactDict } from "@/types";

const BAR_HEIGHTS = [30, 35, 28, 45, 40, 55, 50, 65, 60, 75, 80, 95];

function KickIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded"
    >
      <rect width="20" height="20" rx="4" fill="#53FC18" />
      <path
        d="M6.5 4H9V8L12 4H15L11.5 8.5L15 13H12L9 9V13H6.5V4Z"
        fill="#000"
      />
    </svg>
  );
}

function FloatingEmoji({
  emoji,
  size,
  className,
  animationDuration,
  animationDelay = 0,
}: {
  emoji: string;
  size: number;
  className: string;
  animationDuration: number;
  animationDelay?: number;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div
        className="animate-[float_ease-in-out_infinite]"
        style={{
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDelay}s`,
          fontSize: size,
          lineHeight: 1,
        }}
      >
        {emoji}
      </div>
    </div>
  );
}

export default function ImpactSection({ dict }: { dict: ImpactDict }) {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#0E0E10]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <FadeInWhenVisible direction="right">
            <div>
              <SectionBadge>{dict.badge}</SectionBadge>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-100">
                {dict.heading}
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                {dict.description}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {dict.stats.map((stat) => (
                  <div key={stat.value}>
                    <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-[#9BA8B8]">
                      <span className="inline-block text-2xl md:text-3xl">
                        {stat.emoji}
                      </span>
                      <CountUp value={stat.value} />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Dashboard Column */}
          <FadeInWhenVisible direction="left" delay={0.2}>
            <div className="relative" style={{ perspective: "1200px" }}>
              {/* Floating emojis around dashboard */}
              <FloatingEmoji
                emoji="🎬"
                className="-top-6 -right-20 z-10"
                size={36}
                animationDuration={3}
              />
              <FloatingEmoji
                emoji="🚀"
                className="-top-5 left-4 z-10"
                size={28}
                animationDuration={3.5}
                animationDelay={0.4}
              />
              <FloatingEmoji
                emoji="🎮"
                className="top-1/2 -right-24 z-10"
                size={32}
                animationDuration={2.8}
                animationDelay={0.8}
              />
              <FloatingEmoji
                emoji="📈"
                className="-bottom-5 -right-12 z-10"
                size={26}
                animationDuration={3.2}
                animationDelay={1.2}
              />
              <FloatingEmoji
                emoji="🔥"
                className="top-1/3 -left-7 z-10"
                size={34}
                animationDuration={3.4}
                animationDelay={0.6}
              />
              {/* Shadow offset card for 3D depth */}
              <div
                className="absolute inset-0 bg-white/80 rounded-2xl shadow-xl shadow-black/10"
                style={{
                  transform: "rotateY(-25deg) rotateX(10deg) translate3d(8px, 8px, -20px)",
                }}
              />
              {/* CSS-built analytics dashboard card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-black/15 p-6 overflow-hidden" style={{ transform: "rotateY(-25deg) rotateX(10deg)", transformStyle: "preserve-3d" }}>
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-gray-900 font-semibold text-lg">
                    {dict.dashboardTitle}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Twitch className="w-5 h-5 text-brand-500" />
                    <KickIcon />
                  </div>
                </div>

                {/* Mini stat cards */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {dict.dashboardStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-gray-50 rounded-xl p-3 text-center"
                    >
                      <div className="text-lg md:text-xl font-bold text-gray-900">
                        <CountUp value={stat.value} />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bar chart visualization */}
                <div className="flex items-end gap-[6px] h-32">
                  {BAR_HEIGHTS.map((height, i) => {
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-brand-500"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Overlapping growth badge */}
              <div className="absolute -bottom-4 -left-4 flex items-center gap-2 bg-white border border-gray-200 rounded-full py-2 px-4 shadow-lg shadow-black/20" style={{ transform: "rotateY(25deg) rotateX(-10deg)" }}>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/15">
                  <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {dict.growthBadge}
                </span>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </Container>
    </section>
  );
}
