"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Content from "./Content";
import { Suspense } from "react";

export default function Login() {
  return (
    <>
      <Header variant="white" />
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
      <Footer />
    </>
  );
}
