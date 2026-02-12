"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

interface CountUpProps {
  value: string;
  className?: string;
}

function parseValue(value: string): {
  prefix: string;
  number: number;
  decimals: number;
  suffix: string;
} {
  const match = value.match(/^(\$)?([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, decimals: 0, suffix: value };

  const prefix = match[1] || "";
  const numStr = match[2];
  const suffix = match[3] || "";
  const number = parseFloat(numStr);
  const decimalIndex = numStr.indexOf(".");
  const decimals = decimalIndex === -1 ? 0 : numStr.length - decimalIndex - 1;

  return { prefix, number, decimals, suffix };
}

export default function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, number, decimals, suffix } = parseValue(value);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 50,
    damping: 20,
    duration: 1.5,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(number);
    }
  }, [isInView, motionValue, number]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        const formatted =
          decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString();
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
    return unsubscribe;
  }, [spring, prefix, suffix, decimals]);

  return (
    <motion.span ref={ref}>
      {prefix}0{suffix}
    </motion.span>
  );
}
