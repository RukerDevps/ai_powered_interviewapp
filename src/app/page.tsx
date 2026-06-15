import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/homepage/Hero";
import { Features } from "@/components/homepage/Features";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { WhyIntervAI } from "@/components/homepage/WhyIntervAI";
import { Testimonials } from "@/components/homepage/Testimonials";
import { Pricing } from "@/components/homepage/Pricing";
import { FAQ } from "@/components/homepage/FAQ";
import { CTA } from "@/components/homepage/CTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent-light selection:text-accent">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <WhyIntervAI /> 
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
