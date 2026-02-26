"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionBadge from "@/components/ui/SectionBadge";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";
import CountUp from "@/components/animations/CountUp";
import { CALENDLY_URL } from "@/lib/constants";
import CalComLogo from "@/components/ui/CalComLogo";
import type { CTADict } from "@/types";

export default function CTASection({ dict }: { dict: CTADict }) {
  return (
    <section id="contact" className="bg-[#0E0E10] py-16 md:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/15 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <FadeInWhenVisible>
          {/* Gradient border wrapper */}
          <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-brand-500/60 via-brand-700/30 to-brand-500/60 p-[1.5px]">
            {/* Inner card */}
            <div className="rounded-3xl bg-[#1F1F23] px-6 py-10 sm:px-10 sm:py-12 md:px-16 md:py-16 text-center">
              <div className="flex justify-center mb-6">
                <SectionBadge>{dict.badge}</SectionBadge>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {dict.heading}
              </h2>
              <p className="text-gray-400 mt-4 max-w-xl mx-auto text-lg">
                {dict.description}
              </p>

              {/* Stats row */}
              {dict.stats.length > 0 && (
                <StaggerChildren className="flex flex-col sm:flex-row items-center justify-center mt-10 divide-y sm:divide-y-0 sm:divide-x divide-[#2F2F35]">
                  {dict.stats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={staggerItemVariants}
                      className="px-8 py-4 sm:py-0"
                    >
                      <p className="text-2xl md:text-3xl font-bold text-white">
                        <CountUp value={stat.value} />
                      </p>
                      <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </StaggerChildren>
              )}

              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="white" className="mt-8 px-5 py-2 text-sm">
                  <CalComLogo className="h-5 w-auto" />
                  {dict.button}
                </Button>
              </a>
            </div>
          </div>
        </FadeInWhenVisible>
      </Container>
    </section>
  );
}
