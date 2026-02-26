"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerChildren, { staggerItemVariants } from "@/components/animations/StaggerChildren";
import AsciiArt from "@/components/animations/AsciiArt";
import { ASCII_CONFIGS } from "@/lib/asciiConfigs";
import type { WhyChooseDict } from "@/types";

export default function WhyChooseUsSection({ dict }: { dict: WhyChooseDict }) {
  return (
    <section className="bg-[#0E0E10] py-16 md:py-24">
      <Container>
        <SectionHeading
          badge={dict.badge}
          heading={dict.heading}
          subtitle={dict.subtitle}
        />

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dict.items.map((item) => (
            <motion.div
              key={item.icon}
              variants={staggerItemVariants}
              className="group relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Ambient glow backdrop */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-brand-500/0 group-hover:bg-brand-500/10 blur-[60px] transition-all duration-700" />

              {/* Gradient border wrapper */}
              <div className="h-full rounded-2xl bg-gradient-to-br from-brand-500/20 via-brand-600/10 to-brand-500/20 p-[1px] group-hover:from-brand-500/60 group-hover:via-brand-600/30 group-hover:to-brand-500/60 transition-all duration-500 hover:shadow-lg hover:shadow-brand-500/10">
                {/* Inner card */}
                <div className="relative h-full rounded-2xl bg-[#1F1F23] p-6 overflow-hidden">
                  {/* Shimmer overlay */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                      style={{ animation: "shimmer-sweep 3s ease-in-out infinite" }}
                    />
                  </div>

                  <AsciiArt config={ASCII_CONFIGS[item.icon]} />
                  <h3 className="text-lg font-semibold text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
