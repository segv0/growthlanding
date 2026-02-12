"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { CALENDLY_URL } from "@/lib/constants";
import CalComLogo from "@/components/ui/CalComLogo";
import type { NavDict } from "@/types";

function NavCTAButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block ${className}`}
    >
      <span className="relative flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-white text-black hover:bg-gray-100 transition-colors duration-200">
        <CalComLogo className="h-6 w-auto" />
        <span>{label}</span>
      </span>
    </a>
  );
}

export default function Navbar({ dict, locale }: { dict: NavDict; locale: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-[#0E0E10]/80 backdrop-blur-md border-b transition-colors duration-300 ${scrolled ? "border-[#2F2F35]" : "border-transparent"}`}>
      <Container>
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-white">Audience </span>
              <span className="text-brand-500 italic" style={{ fontFamily: 'var(--font-script)' }}>Labs</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-[#1F1F23] border border-[#2F2F35] rounded-full px-1.5 py-1 absolute left-1/2 -translate-x-1/2">
            {dict.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-gray-100 hover:bg-[#2F2F35] rounded-full px-4 py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <NavCTAButton label={dict.bookACall} />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0E0E10] border-t border-[#2F2F35]">
          <Container>
            <nav className="py-4 flex flex-col gap-3">
              {dict.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-gray-100 py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2">
                <LanguageSwitcher locale={locale} />
              </div>
              <NavCTAButton label={dict.bookACall} className="mt-2" />
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
