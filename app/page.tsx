import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ProductsPreview from "@/components/sections/ProductsPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import SAPCapabilities from "@/components/sections/SAPCapabilities";
import IndustriesPreview from "@/components/sections/IndustriesPreview";
import TestimonialsPreview from "@/components/sections/TestimonialsPreview";
import InsightsPreview from "@/components/sections/InsightsPreview";

export default function Home() {
  return (
    <div className="zip-theme font-sans">
      <Hero />
      <ServicesPreview />
      <ProductsPreview />
      <WhyChooseUs />
      <SAPCapabilities />
      <IndustriesPreview />
      <TestimonialsPreview />
      <InsightsPreview />
    </div>
  );
}
