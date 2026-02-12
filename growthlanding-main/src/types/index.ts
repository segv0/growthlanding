export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseCard {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  avatarColor: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface CTAStat {
  value: string;
  label: string;
}

export interface AsciiChar {
  char: string;
  animation: "glow" | "flash" | "center" | "none";
  delay: number;
}

export interface AsciiArtConfig {
  grid: AsciiChar[][];
}

// Dictionary types derived from en.json structure
export type Dictionary = typeof import("@/lib/i18n/dictionaries/en.json");

export type NavDict = Dictionary["nav"];
export type HeroDict = Dictionary["hero"];
export type TrustBarDict = Dictionary["trustBar"];
export type ImpactDict = Dictionary["impact"];
export type ServicesDict = Dictionary["services"];
export type SimplifyDict = Dictionary["simplify"];
export type WhyChooseDict = Dictionary["whyChoose"];
export type TestimonialsDict = Dictionary["testimonials"];
export type AboutMeDict = Dictionary["aboutMe"];
export type FounderEntry = AboutMeDict["founders"][number];
export type FAQDict = Dictionary["faq"];
export type CTADict = Omit<Dictionary["cta"], "stats"> & {
  stats: CTAStat[];
};
export type FooterDict = Dictionary["footer"];
