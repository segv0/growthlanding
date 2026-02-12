"use client";

import { Video, Scissors, TrendingUp, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { SimplifyDict } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  video: Video,
  scissors: Scissors,
  "trending-up": TrendingUp,
};

function StepCard({
  step,
  index,
  isLast,
}: {
  step: { number: string; title: string; description: string; icon: string };
  index: number;
  isLast: boolean;
}) {
  const Icon = ICON_MAP[step.icon] ?? Video;

  return (
    <FadeInWhenVisible direction="up" delay={index * 0.15}>
      <div className="relative">
        {/* Connecting line between steps (desktop only, not on last step) */}
        {!isLast && (
          <div className="hidden md:block absolute top-7 left-[calc(50%+32px)] right-0 -mr-4 h-px bg-[#2F2F35]" />
        )}

        {/* Large faded step number */}
        <div className="text-5xl md:text-6xl font-bold text-white/[0.05] leading-none select-none">
          {step.number}
        </div>

        {/* Icon container */}
        <div className="mt-3 w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center">
          <Icon className="w-4 h-4 text-brand-400" />
        </div>

        {/* Title */}
        <h3 className="mt-3 text-base font-semibold text-gray-100">
          {step.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">
          {step.description}
        </p>
      </div>
    </FadeInWhenVisible>
  );
}

export default function SimplifySection({ dict }: { dict: SimplifyDict }) {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#0E0E10]">
      <Container>
        {/* Centered header */}
        <FadeInWhenVisible direction="up">
          <div className="text-center">
            <SectionBadge>{dict.badge}</SectionBadge>
            <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100">
              {dict.headingPrefix}
              <span className="font-script text-brand-500">{dict.headingAccent}</span>
              {dict.headingSuffix}
            </h2>
          </div>
        </FadeInWhenVisible>

        {/* 3-column steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-16">
          {dict.steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              isLast={index === dict.steps.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
