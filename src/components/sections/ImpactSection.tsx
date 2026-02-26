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
              {/* Top-right: rocket */}
              <div
                className="absolute -top-6 -right-4 text-3xl z-10 drop-shadow-[0_0_12px_rgba(145,70,255,0.7)] animate-[float_3s_ease-in-out_infinite]"
                style={{ transform: "rotateY(20deg) rotateX(-10deg) rotate(-15deg)" }}
              >
                🚀
              </div>
              {/* Top-left: chart */}
              <div
                className="absolute -top-5 left-4 text-2xl z-10 drop-shadow-[0_0_10px_rgba(145,70,255,0.6)] animate-[float_3.5s_ease-in-out_0.4s_infinite]"
                style={{ transform: "rotateY(-15deg) rotateX(-12deg) rotate(8deg)" }}
              >
                📊
              </div>
              {/* Right-middle: fire */}
              <div
                className="absolute top-1/2 -right-8 text-2xl z-10 drop-shadow-[0_0_10px_rgba(145,70,255,0.6)] animate-[float_2.8s_ease-in-out_0.8s_infinite]"
                style={{ transform: "rotateY(25deg) rotateX(5deg) rotate(-5deg)" }}
              >
                🔥
              </div>
              {/* Bottom-right: star */}
              <div
                className="absolute -bottom-5 right-8 text-2xl z-10 drop-shadow-[0_0_10px_rgba(145,70,255,0.6)] animate-[float_3.2s_ease-in-out_1.2s_infinite]"
                style={{ transform: "rotateY(18deg) rotateX(12deg) rotate(10deg)" }}
              >
                ⭐
              </div>
              {/* Left-middle: gaming controller */}
              <div
                className="absolute top-1/3 -left-7 text-2xl z-10 drop-shadow-[0_0_10px_rgba(145,70,255,0.6)] animate-[float_3.4s_ease-in-out_0.6s_infinite]"
                style={{ transform: "rotateY(-20deg) rotateX(8deg) rotate(-12deg)" }}
              >
                🎮
              </div>
              {/* Shadow offset card for 3D depth */}
              <div
                className="absolute inset-0 bg-white/[0.06] rounded-2xl border border-white/[0.08]"
                style={{
                  transform: "rotateY(-25deg) rotateX(10deg) translate3d(8px, 8px, -20px)",
                }}
              />
              {/* CSS-built analytics dashboard card */}
              <div className="bg-[#1F1F23] rounded-2xl border border-[#2F2F35] p-6 overflow-hidden" style={{ transform: "rotateY(-25deg) rotateX(10deg)", transformStyle: "preserve-3d" }}>
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-gray-100 font-semibold text-lg">
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
                      className="bg-[#0E0E10] rounded-xl p-3 text-center"
                    >
                      <div className="text-lg md:text-xl font-bold text-gray-100">
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
                    const intensity = 0.3 + (i / (BAR_HEIGHTS.length - 1)) * 0.7;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${height}%`,
                          backgroundColor: `rgba(255, 255, 255, ${intensity})`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Overlapping growth badge */}
              <div className="absolute -bottom-4 -left-4 flex items-center gap-2 bg-[#1F1F23] border border-[#2F2F35] rounded-full py-2 px-4 shadow-lg shadow-black/30" style={{ transform: "rotateY(25deg) rotateX(-10deg)" }}>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20">
                  <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                </div>
                <span className="text-sm font-semibold text-green-400">
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
