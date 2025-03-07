// app/page.tsx

import LandingBenefits from "./_components/lp-benefits";
import LandingCTA from "./_components/lp-cta";
import LandingFAQ from "./_components/lp-faq";
import LandingFeatures from "./_components/lp-features";
import LandingFooter from "./_components/lp-footer";
import LandingHero from "./_components/lp-hero";
import LandingHowItWorks from "./_components/lp-how-works";
import LandingProblemSection from "./_components/lp-problem-section";
import LandingTestimonials from "./_components/lp-testimonials";
import LandingUseCases from "./_components/lp-use-cases";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <LandingHero />
      <LandingProblemSection />
      <LandingHowItWorks />
      <LandingBenefits />
      <LandingUseCases />
      <LandingTestimonials />
      <LandingFeatures />
      <LandingCTA />
      <LandingFAQ />
      <LandingFooter />
    </main>
  );
}
