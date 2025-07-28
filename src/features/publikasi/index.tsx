"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Content from "./Content";

export default function Publikasi() {
  return (
    <>
      <Header />
      <Hero title="Publikasi" background="publikasi/hero.png" />
      <Content />
      <Footer />
    </>
  );
}
