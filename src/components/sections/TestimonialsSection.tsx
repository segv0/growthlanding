"use client";

import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { TestimonialsDict } from "@/types";

function TestimonialCard({
  testimonial,
  index,
  hoveredIndex,
  isRowHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  testimonial: TestimonialsDict["items"][number];
  index: number;
  hoveredIndex: number | null;
  isRowHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const isHovered = hoveredIndex === index;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`w-[300px] sm:w-[350px] flex-shrink-0 mx-3 rounded-2xl border bg-[#1F1F23] p-6 transition-all duration-300 ${
        isHovered
          ? "relative z-10 border-brand-500 scale-[1.02] shadow-lg shadow-brand-500/10"
          : "border-[#2F2F35]"
      } ${isRowHovered && !isHovered ? "opacity-50" : "opacity-100"}`}
    >
      {/* Stars */}
      <div className="flex items-center gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
        <span className="text-sm text-gray-400 ml-1">
          {testimonial.rating}
        </span>
      </div>

      {/* Quote */}
      <p className="text-gray-400 italic mt-3 leading-relaxed text-sm">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-4 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
          style={{ backgroundColor: testimonial.avatarColor }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-sm text-gray-100">
            {testimonial.name}
          </div>
          <div className="text-sm text-gray-500">{testimonial.title}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  testimonials,
  direction,
}: {
  testimonials: TestimonialsDict["items"];
  direction: "left" | "right";
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isRowHovered = hoveredIndex !== null;

  return (
    <div className="overflow-hidden -my-4">
      <div
        className="flex w-max py-4"
        style={{
          animation: `${direction === "left" ? "marquee" : "marquee-reverse"} 40s linear infinite`,
          animationPlayState: isRowHovered ? "paused" : "running",
        }}
      >
        {[...testimonials, ...testimonials].map((testimonial, i) => (
          <TestimonialCard
            key={`${testimonial.name}-${i}`}
            testimonial={testimonial}
            index={i}
            hoveredIndex={hoveredIndex}
            isRowHovered={isRowHovered}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection({ dict }: { dict: TestimonialsDict }) {
  const topRow = dict.items.slice(0, 6);
  const bottomRow = dict.items.slice(6, 12);

  return (
    <section id="testimonials" className="bg-[#0E0E10] py-16 md:py-24">
      <Container>
        <SectionHeading
          badge={dict.badge}
          heading={dict.heading}
          subtitle={dict.subtitle}
          icon={MessageSquare}
        />
      </Container>

      <div className="mt-12 flex flex-col gap-6">
        <MarqueeRow testimonials={topRow} direction="left" />
        <MarqueeRow testimonials={bottomRow} direction="right" />
      </div>
    </section>
  );
}
