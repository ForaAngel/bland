import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Problem />
        {/* <FeaturesAccordion /> */}
        <Pricing />
        <FAQ />
        {/* <CTA /> */}
      </main>
      <Footer />
    </>
  );
}
