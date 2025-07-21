"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import OurProgram from "./OurProgram";
import Highlight from "./Highlight";
import Member from "./Member";

export default function Homepage() {
  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <OurProgram />
      <Highlight />
      <Member />
      <Footer />
    </>
  );
}
