"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Content from "./Content";

export default function ProgramDetail() {
  return (
    <>
      <Header />
      <Hero
        title="Clean Ocean through Clean Communities (CLOCC)"
        background="program/program-1.png"
        detailPage
      />
      <Content />
      <Footer />
    </>
  );
}
