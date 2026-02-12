"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { AboutMeDict } from "@/types";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function AboutSection({ dict }: { dict: AboutMeDict }) {
  return (
    <section id="founder" className="bg-[#0E0E10] py-16 md:py-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-brand-500/15 rounded-full blur-[80px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section badge */}
        <div className="text-center mb-12">
          <SectionBadge icon={User}>{dict.badge}</SectionBadge>
        </div>

        <FadeInWhenVisible direction="up">
          {/* Gradient border wrapper */}
          <div className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-br from-brand-500/30 via-brand-600/15 to-brand-500/30 p-[1.5px]">
            {/* Inner card */}
            <div className="rounded-2xl bg-[#1F1F23] p-8 md:p-10 relative overflow-hidden">
              {/* Subtle contribution-grid dot pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Content */}
              <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative shrink-0"
                >
                  <img
                    src={`https://github.com/${dict.githubUsername}.png`}
                    alt={`${dict.firstName} ${dict.surname}`}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full border-2 border-[#2F2F35] ring-2 ring-brand-500/20 object-cover"
                  />
                  {/* GitHub badge overlay */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#1F1F23] rounded-full border-2 border-[#2F2F35] flex items-center justify-center">
                    <GitHubIcon className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </motion.div>

                {/* Text content */}
                <div className="text-center md:text-left">
                  {/* Name */}
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {dict.firstName}{" "}
                    <span
                      className="text-[#9BA8B8] italic"
                      style={{ fontFamily: "var(--font-script)" }}
                    >
                      {dict.surname}
                    </span>
                  </h2>

                  {/* GitHub handle */}
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                    <GitHubIcon className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      @{dict.githubUsername}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-400 text-base leading-relaxed mt-4 max-w-xl">
                    {dict.bio}
                  </p>

                  {/* GitHub button */}
                  <a
                    href={`https://github.com/${dict.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    {dict.githubButton}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </Container>
    </section>
  );
}
