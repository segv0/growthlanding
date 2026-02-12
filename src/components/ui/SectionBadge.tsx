import type { LucideIcon } from "lucide-react";

export default function SectionBadge({ children, icon: Icon }: { children: React.ReactNode; icon?: LucideIcon }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-brand-500/10 border border-brand-500/30 text-brand-400 text-sm font-medium px-4 py-1.5 rounded-full">
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
}
