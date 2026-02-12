"use client";

import { ReactNode } from "react";

export default function MarqueeAnimation({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max"
        style={{
          animation: "marquee 30s linear infinite",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
