"use client";

import Header from "@/components/HeaderTmp";
import Footer from "@/components/FooterTmp";
import Hero from "./Hero";
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
      <Hero />
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
