"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Tab from "./Tab";
import History from "./History";
import VisionMission from "./VisionMission";
import OrganizationStructure from "./OrganizationStructure";
import BoardOfDirector from "./BoardOfDirector";
import Contact from "./Contact";

export default function AboutUs() {
  return (
    <>
      <Header />
      <Hero title="About Us" background="about-us/hero.png" />
      <Tab />
      <History />
      <VisionMission />
      <OrganizationStructure />
      <BoardOfDirector />
      <Contact />
      <Footer />
    </>
  );
}
