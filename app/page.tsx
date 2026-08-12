import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProductsPreview from "@/components/sections/ProductsPreview";
import IndustriesPreview from "@/components/sections/IndustriesPreview";
import TestimonialsPreview from "@/components/sections/TestimonialsPreview";
import InsightsPreview from "@/components/sections/InsightsPreview";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="zip-theme font-sans">
      <Hero />
      <ServicesPreview />
      <WhyChooseUs />
      <ProductsPreview />
      <IndustriesPreview />
      <TestimonialsPreview />
      <InsightsPreview />
      <CTA />
    </div>
  );
}
