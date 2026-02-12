import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "white";
  children: ReactNode;
  className?: string;
}

export default function Button({ variant = "filled", children, className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer";
  const variants = {
    filled: "bg-brand-500 text-white hover:bg-brand-600 shadow-sm",
    outline: "border border-[#2F2F35] text-gray-300 hover:border-gray-500 hover:bg-[#1F1F23]",
    white: "bg-white text-black hover:bg-gray-200",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
