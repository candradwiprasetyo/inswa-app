"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import OurProgram from "./OurProgram";
import Highlight from "./Highlight";
import Member from "./Member";
import StayUpdated from "@/components/StayUpdated";

export default function Homepage() {
  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <OurProgram />
      <Highlight />
      <Member />
      <StayUpdated />
      <Footer />
    </>
  );
}
