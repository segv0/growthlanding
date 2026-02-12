import type { AsciiChar, AsciiArtConfig } from "@/types";

type Anim = AsciiChar["animation"];

function c(char: string, animation: Anim = "none", delay = 0): AsciiChar {
  return { char, animation, delay };
}

// 1. Bullseye — radar pulse outward from center
const bullseye: AsciiArtConfig = {
  grid: [
    [c(" "), c("╭", "glow", 0.6), c("─", "glow", 0.6), c("─", "glow", 0.6), c("─", "glow", 0.6), c("╮", "glow", 0.6), c(" ")],
    [c(" "), c("│", "glow", 0.4), c("╭", "glow", 0.4), c("─", "glow", 0.4), c("╮", "glow", 0.4), c("│", "glow", 0.4), c(" ")],
    [c(" "), c("│", "glow", 0.2), c("│", "glow", 0.2), c("●", "center", 0), c("│", "glow", 0.2), c("│", "glow", 0.2), c(" ")],
    [c(" "), c("│", "glow", 0.4), c("╰", "glow", 0.4), c("─", "glow", 0.4), c("╯", "glow", 0.4), c("│", "glow", 0.4), c(" ")],
    [c(" "), c("╰", "glow", 0.6), c("─", "glow", 0.6), c("─", "glow", 0.6), c("─", "glow", 0.6), c("╯", "glow", 0.6), c(" ")],
  ],
};

// 2. Infinity loop — light traces the path
const infinity: AsciiArtConfig = {
  grid: [
    [c(" "), c("╭", "glow", 0), c("─", "glow", 0.15), c("╮", "glow", 0.3), c(" "), c("╭", "glow", 0.9), c("─", "glow", 1.05), c("╮", "glow", 1.2), c(" ")],
    [c(" "), c("│", "glow", 1.65), c(" "), c("╰", "glow", 0.45), c("─", "glow", 0.6), c("╯", "glow", 0.75), c(" "), c("│", "glow", 1.35), c(" ")],
    [c(" "), c("│", "glow", 1.5), c(" "), c("╭", "glow", 0.75), c("─", "glow", 0.6), c("╮", "glow", 0.45), c(" "), c("│", "glow", 1.35), c(" ")],
    [c(" "), c("╰", "glow", 1.35), c("─", "glow", 1.2), c("╯", "glow", 1.05), c(" "), c("╰", "glow", 0.3), c("─", "glow", 0.15), c("╯", "glow", 0), c(" ")],
  ],
};

// 3. Sparkle lattice — diagonal shimmer sweep
const sparkleLattice: AsciiArtConfig = {
  grid: [
    [c("✧", "glow", 0), c(" "), c("·", "glow", 0.15), c(" "), c("─", "glow", 0.3), c(" "), c("·", "glow", 0.45), c(" "), c("✧", "glow", 0.6)],
    [c("│", "glow", 0.15), c(" "), c("╲", "glow", 0.3), c(" "), c(" "), c(" "), c("╱", "glow", 0.45), c(" "), c("│", "glow", 0.6)],
    [c("─", "glow", 0.3), c(" "), c("─", "glow", 0.45), c(" "), c("✦", "center", 0), c(" "), c("─", "glow", 0.45), c(" "), c("─", "glow", 0.3)],
    [c("│", "glow", 0.6), c(" "), c("╱", "glow", 0.45), c(" "), c(" "), c(" "), c("╲", "glow", 0.3), c(" "), c("│", "glow", 0.15)],
    [c("✧", "glow", 0.6), c(" "), c("·", "glow", 0.45), c(" "), c("─", "glow", 0.3), c(" "), c("·", "glow", 0.15), c(" "), c("✧", "glow", 0)],
  ],
};

// 4. Node graph — network pulse with data packets on edges
const nodeGraph: AsciiArtConfig = {
  grid: [
    [c("◉", "center", 0), c(" "), c("─", "flash", 0.3), c(" "), c("─", "flash", 0.6), c(" "), c("◉", "center", 0.2)],
    [c("│", "flash", 1.5), c("╲", "flash", 1.2), c(" "), c(" "), c(" "), c("╱", "flash", 0.9), c("│", "flash", 0.6)],
    [c("│", "flash", 1.8), c(" "), c(" "), c("◈", "center", 0.1), c(" "), c(" "), c("│", "flash", 0.9)],
    [c("│", "flash", 1.5), c("╱", "flash", 1.2), c(" "), c(" "), c(" "), c("╲", "flash", 0.9), c("│", "flash", 1.2)],
    [c("◉", "center", 0.3), c(" "), c("─", "flash", 0.6), c(" "), c("─", "flash", 0.9), c(" "), c("◉", "center", 0.1)],
  ],
};

export const ASCII_CONFIGS: Record<string, AsciiArtConfig> = {
  target: bullseye,
  hand: infinity,
  sparkles: sparkleLattice,
  network: nodeGraph,
};
