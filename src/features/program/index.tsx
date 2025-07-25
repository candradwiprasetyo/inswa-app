"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Content from "./Content";

export default function Program() {
  return (
    <>
      <Header />
      <Hero title="Program" background="program/hero.png" />
      <Content />
      <Footer />
    </>
  );
}
