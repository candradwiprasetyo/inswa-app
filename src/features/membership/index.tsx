"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Highlight from "./Highlight";
import JoinNow from "./JoinNow";
import Contact from "./Contact";

export default function Membership() {
  return (
    <>
      <Header />
      <Hero
        title="InSWA Membership"
        background="about-us/hero.png"
        variant="green"
      />
      <JoinNow />
      <Highlight />
      <Contact />
      <Footer />
    </>
  );
}
