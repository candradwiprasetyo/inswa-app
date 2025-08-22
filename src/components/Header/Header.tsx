"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Button from "../Button";

const navItems = [
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Program", href: "/program" },
  { label: "Publikasi", href: "/publikasi" },
  { label: "Membership", href: "/membership" },
  { label: "Media", href: "/media" },
];

export type HeaderProps = {
  variant?: "default" | "white";
};

export default function Header({ variant = "default" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setIsScrolled(false);
        return;
      }

      const heroBottom = hero.offsetTop + hero.offsetHeight;
      setIsScrolled(window.scrollY > heroBottom);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        `transition-colors duration-500 max-w-7xl md:mx-auto h-14 md:h-16 rounded-xl right-3 md:right-10 left-3 md:left-10 px-3 md:px-10 flex items-center fixed z-50 top-3`,
        variant === "default"
          ? isScrolled
            ? "bg-header-secondary"
            : "bg-header-primary"
          : "bg-header-white"
      )}
    >
      <div className="flex-grow flex items-center gap-8">
        <div className="flex-none">
          <Link href="/">
            <Image
              src={
                isScrolled || variant !== "default"
                  ? "/assets/images/header-logo-white.png"
                  : "/assets/images/header-logo.png"
              }
              width={97}
              height={36}
              alt="Header Logo"
              className="w-28 md:w-32"
            />
          </Link>
        </div>
        <div
          className={clsx(
            "flex-grow gap-8 font-medium hidden lg:flex",
            isScrolled || variant !== "default"
              ? "text-tertiary-light"
              : "text-white"
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-action-hover text-sm xl:text-base ${
                pathname.startsWith(item.href) ? "text-green" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-none gap-2 hidden lg:flex">
        <Button
          title="Masuk"
          href="/login"
          customClass="h-8 text-sm border border-secondary-light text-action-hover"
          variant="transparent"
        />

        <Button title="Daftar" customClass="h-8 text-sm" href="/daftar" />
      </div>

      <div className="flex-none lg:hidden inline">
        <Link href={"/daftar"}>
          <button className="h-9 px-4 bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr text-primary-light">
            <Image
              src="/assets/icons/mobile-menu.svg"
              alt="Mobile Menu"
              width={24}
              height={24}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
