import { Footer } from "@/components/footer";

import { FeatureSection } from "./components/feature-section";
import { HeroSection } from "./components/hero-section";

export default function Welcome() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />

      <div className="grow">
        <FeatureSection />
      </div>

      <Footer />
    </div>
  );
}
