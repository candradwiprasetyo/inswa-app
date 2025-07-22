"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "./Hero";
import Tab from "./Tab";
import History from "./History";
import VisionMission from "./VisionMission";
import OrganizationStructure from "./OrganizationStructure";
import BoardOfDirector from "./BoardOfDirector";

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
      <Footer />
    </>
  );
}
