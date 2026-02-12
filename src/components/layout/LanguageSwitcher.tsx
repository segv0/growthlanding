"use client";

import { usePathname, useRouter } from "next/navigation";

const flags: Record<string, { flag: string; label: string }> = {
  en: { flag: "🇬🇧", label: "EN" },
  tr: { flag: "🇹🇷", label: "TR" },
};

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "en" ? "tr" : "en";
  const other = flags[otherLocale];

  function switchLocale() {
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 rounded-full border border-[#2F2F35] bg-[#1F1F23] px-3 py-1.5 text-sm text-gray-300 hover:border-gray-500 hover:bg-[#2F2F35] transition-colors cursor-pointer"
      aria-label={`Switch to ${otherLocale === "en" ? "English" : "Türkçe"}`}
    >
      <span>{other.flag}</span>
      <span className="font-medium">{other.label}</span>
    </button>
  );
}
