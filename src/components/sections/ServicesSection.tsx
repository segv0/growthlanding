"use client";

import { motion } from "framer-motion";
import {
  Video,
  Share2,
  BarChart3,
  Sparkles,
  Globe,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { ClipFlowIllustration } from "@/components/sections/HeroSection";
import type { ServicesDict } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  video: Video,
  share: Share2,
  chart: BarChart3,
  sparkles: Sparkles,
  globe: Globe,
  trending: TrendingUp,
  users: Users,
  file: FileText,
};

export default function ServicesSection({ dict }: { dict: ServicesDict }) {
  return (
    <section id="services" className="bg-[#0E0E10] py-16 md:py-24">
      <Container>
        <SectionHeading
          badge={dict.badge}
          heading={dict.heading}
          headingAccent={dict.headingAccent}
          subtitle={dict.subtitle}
        />

        <FadeInWhenVisible direction="up" delay={0.1}>
          <div className="flex justify-center mb-12">
            <div className="hidden lg:block max-w-[600px] w-full">
              <ClipFlowIllustration />
            </div>
          </div>
        </FadeInWhenVisible>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dict.items.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Video;
            const row = Math.floor(index / 4);
            const col = index % 4;
            const isBlue = (row + col) % 2 === 1;
            return (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                className="group relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Ambient glow backdrop */}
                <div className={`absolute -inset-4 -z-10 rounded-3xl blur-[60px] transition-all duration-700 ${isBlue ? "bg-[#9BA8B8]/0 group-hover:bg-[#9BA8B8]/10" : "bg-brand-500/0 group-hover:bg-brand-500/10"}`} />

                {/* Gradient border wrapper */}
                <div className={`h-full rounded-2xl bg-gradient-to-br p-[1px] transition-all duration-500 ${isBlue ? "from-[#9BA8B8]/20 via-[#9BA8B8]/10 to-[#9BA8B8]/20 group-hover:from-[#9BA8B8]/60 group-hover:via-[#9BA8B8]/30 group-hover:to-[#9BA8B8]/60 hover:shadow-lg hover:shadow-[#9BA8B8]/10" : "from-brand-500/20 via-brand-600/10 to-brand-500/20 group-hover:from-brand-500/60 group-hover:via-brand-600/30 group-hover:to-brand-500/60 hover:shadow-lg hover:shadow-brand-500/10"}`}>
                  {/* Inner card */}
                  <div className="relative h-full rounded-2xl bg-[#1F1F23] p-6 overflow-hidden">
                    {/* Shimmer overlay */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                        style={{ animation: "shimmer-sweep 3s ease-in-out infinite" }}
                      />
                    </div>

                    {/* Icon container */}
                    <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center transition-colors duration-300 ${isBlue ? "from-[#9BA8B8]/20 to-[#9BA8B8]/10 border border-[#9BA8B8]/20 group-hover:border-[#9BA8B8]/40" : "from-brand-500/20 to-brand-600/10 border border-brand-500/20 group-hover:border-brand-500/40"}`}>
                      <div className={`absolute inset-0 rounded-xl blur-md -z-10 ${isBlue ? "bg-[#9BA8B8]/20" : "bg-brand-500/20"}`} />
                      <Icon className={`w-5 h-5 ${isBlue ? "text-[#9BA8B8]" : "text-brand-400"}`} />
                    </div>

                    {/* Label */}
                    <p className={`mt-5 text-xs font-semibold tracking-wider ${isBlue ? "text-[#9BA8B8]" : "text-brand-400"}`}>
                      {service.label}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mt-1.5 text-gray-100">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
