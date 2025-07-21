"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`transition-colors duration-500 max-w-7xl md:mx-auto h-14 md:h-16 rounded-xl right-3 md:right-10 left-3 md:left-10  px-3 md:px-10 flex items-center fixed z-50 top-3 ${
          isScrolled ? "bg-header-secondary" : "bg-header-primary"
        }`}
      >
        <div className="flex-grow flex items-center gap-8">
          <div className="flex-none">
            <Image
              src={"/assets/images/header-logo.png"}
              width={157}
              height={36}
              alt="Header Logo"
              className="w-32 md:w-36"
            />
          </div>
          <div className="flex-grow gap-8 text-white font-medium hidden md:flex">
            <div>Tentang Kami</div>
            <div>Program</div>
            <div>Publikasi</div>
            <div>Membership</div>
            <div>Media</div>
          </div>
        </div>
        <div className="flex-none gap-2 hidden md:flex">
          <div className="h-9 w-24 font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr border border-white text-green">
            Masuk
          </div>
          <div className="h-9 w-24 bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr text-primary-light">
            Daftar
          </div>
        </div>
        <div className="flex-none md:hidden inline">
          <button className="h-9 px-4 bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr text-primary-light">
            <Image
              src="/assets/icons/mobile-menu.svg"
              alt="Mobile Menu"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </>
  );
}
