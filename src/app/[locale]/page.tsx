import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import HeroSection from "@/components/sections/HeroSection";
import ImpactSection from "@/components/sections/ImpactSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SimplifySection from "@/components/sections/SimplifySection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <HeroSection dict={dict.hero} />
      <ServicesSection dict={dict.services} />
      <SimplifySection dict={dict.simplify} />
      <ImpactSection dict={dict.impact} />
      <WhyChooseUsSection dict={dict.whyChoose} />
      <AboutSection dict={dict.aboutMe} />
      {/* <TestimonialsSection dict={dict.testimonials} /> */}
      <FAQSection dict={dict.faq} />
      <CTASection dict={dict.cta} />
    </>
  );
}
