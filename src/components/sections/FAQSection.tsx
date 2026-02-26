"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { FAQDict } from "@/types";

export default function FAQSection({ dict }: { dict: FAQDict }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#0E0E10]">
      <Container>
        <SectionHeading
          badge={dict.badge}
          heading={dict.heading}
          subtitle={dict.subtitle}
        />

        <FadeInWhenVisible>
          <div className="max-w-3xl mx-auto">
            {dict.items.map((item, index) => (
              <div key={index} className="border-b border-[#2F2F35]">
                <button
                  className="w-full flex justify-between items-center py-5 text-left cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? -1 : index)
                  }
                >
                  <span className="font-medium text-gray-100 pr-4">
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-gray-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </Container>
    </section>
  );
}
