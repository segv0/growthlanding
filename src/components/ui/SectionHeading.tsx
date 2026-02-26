import SectionBadge from "./SectionBadge";

interface SectionHeadingProps {
  badge: string;
  heading: string;
  headingAccent?: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ badge, heading, headingAccent, subtitle, centered = true }: SectionHeadingProps) {
  const renderedHeading = headingAccent
    ? (() => {
        const idx = heading.indexOf(headingAccent);
        if (idx === -1) return heading;
        const before = heading.slice(0, idx);
        const after = heading.slice(idx + headingAccent.length);
        return (
          <>
            {before}
            <span className="font-script text-brand-500">{headingAccent}</span>
            {after}
          </>
        );
      })()
    : heading;

  return (
    <div className={`${centered ? "text-center" : ""} mb-12`}>
      <SectionBadge>{badge}</SectionBadge>
      <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-100">{renderedHeading}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
