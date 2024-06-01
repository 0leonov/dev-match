import { FeatureSection } from "./components/feature-section";
import { Footer } from "./components/footer";
import { FooterNav } from "./components/footer-nav";
import { HeroSection } from "./components/hero-section";

export default function Welcome() {
  return (
    <>
      <HeroSection />

      <FeatureSection />

      <FooterNav />

      <Footer />
    </>
  );
}
