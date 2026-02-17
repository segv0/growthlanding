import { Twitter, Instagram } from "lucide-react";
import Container from "@/components/ui/Container";
import type { FooterDict } from "@/types";

export default function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer className="bg-[#0E0E10] text-gray-300">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Brand column */}
            <div className="col-span-2">
              <a href="#" className="inline-block mb-4">
                <img src="/logo.png" alt="Audience Labs" className="w-10 h-10 rounded-xl object-contain" />
              </a>
              <p className="text-sm text-gray-400 max-w-xs">
                {dict.description}
              </p>
            </div>

            {/* Link columns */}
            {dict.columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-[#2F2F35] pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <p className="text-sm text-gray-500">
                {dict.copyright}
              </p>
              <span className="hidden sm:inline text-gray-600">·</span>
              <p className="text-sm text-gray-500">
                {dict.parentCompany}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
