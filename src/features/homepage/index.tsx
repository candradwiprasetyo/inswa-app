"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import OurProgram from "./OurProgram";
import Highlight from "./Highlight";
import Member from "./Member";
import StayUpdated from "@/components/StayUpdated";
import FadeInSection from "@/components/FadeInSection";

export default function Homepage() {
  return (
    <>
      <Header />
      <Hero />
      <FadeInSection>
        <AboutUs />
      </FadeInSection>
      <FadeInSection>
        <OurProgram />
      </FadeInSection>
      <FadeInSection>
        <Highlight />
      </FadeInSection>
      <FadeInSection>
        <Member />
      </FadeInSection>
      <StayUpdated />
      <Footer />
    </>
  );
}
