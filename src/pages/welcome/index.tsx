import {
  FeatureSection,
  Footer,
  HeroSection,
  FixedHeader,
  StaticHeader,
} from "./components";

export function Welcome() {
  return (
    <>
      <FixedHeader />

      <div className="min-h-screen flex flex-col">
        <StaticHeader />

        <HeroSection className="grow flex items-center" />
      </div>

      <FeatureSection />

      <Footer />
    </>
  );
}
