import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  highlighted?: boolean;
  className?: string;
}

export default function Card({ children, highlighted = false, className = "" }: CardProps) {
  return (
    <div
      className={`bg-[#1F1F23] rounded-2xl p-6 transition-all duration-200 ${
        highlighted
          ? "border-2 border-brand-500 shadow-lg shadow-black/20 relative"
          : "border border-[#2F2F35] hover:shadow-md hover:shadow-black/20"
      } ${className}`}
    >
      {children}
    </div>
  );
}
