"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Button from "../Button";
import { tabData } from "@/data/tab";
import { Link as LinkScroll } from "react-scroll";
import { useAuth } from "@/hooks/useAuth";

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
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      <div
        className={clsx(
          `transition-colors duration-500 min-h-[64px] max-w-7xl md:mx-auto pt-2 rounded-xl right-3 md:right-10 left-3 md:left-10 px-3 md:px-10 flex fixed z-50 top-3 items-start`,
          variant === "default"
            ? isScrolled
              ? "bg-header-secondary"
              : "bg-header-primary"
            : "bg-header-white"
        )}
      >
        <div className="flex-grow flex items-start gap-8">
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
          <div className="flex-grow">
            <div
              className={clsx(
                "gap-8 font-medium hidden lg:flex h-12 items-center",
                isScrolled || variant !== "default"
                  ? "text-tertiary-light"
                  : "text-white"
              )}
            >
              {navItems.map((item) => (
                <Link
                  key={`item-${item.href}`}
                  href={item.href}
                  className={`transition-colors hover:text-action-hover text-sm ${
                    pathname.startsWith(item.href) ? "text-green" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {pathname.startsWith("/tentang-kami") && isScrolled && (
              <div
                className={clsx(
                  "flex gap-8 mt-4",
                  isScrolled || variant !== "default"
                    ? "text-tertiary-light"
                    : "text-white"
                )}
              >
                {tabData.map((tab, index) => (
                  <LinkScroll
                    key={tab.id}
                    to={tab.id}
                    smooth={true}
                    duration={500}
                    offset={index === 0 ? -120 : -100}
                    spy={true}
                    className={`transition-colors hover:text-action-hover text-xs pb-2 cursor-pointer`}
                    activeClass="text-green font-bold border-b-[3px] border-green"
                  >
                    {tab.label}
                  </LinkScroll>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-none gap-2 hidden lg:flex pt-2">
          {!user ? (
            <div className="flex-none gap-2 hidden lg:flex">
              <Button
                title="Masuk"
                href="/login"
                customClass="h-8 text-sm border border-secondary-light text-action-hover"
                variant="transparent"
              />
              <Button title="Daftar" customClass="h-8 text-sm" href="/daftar" />
            </div>
          ) : (
            <div className="flex-none gap-4 hidden lg:flex items-center text-sm">
              <Link href={"/dashboard"}>
                <span
                  className={
                    isScrolled || variant !== "default"
                      ? "text-tertiary-light"
                      : "text-white"
                  }
                >
                  Hi, {user.name}
                </span>
              </Link>
              <Button
                title="Logout"
                customClass="h-8 text-sm"
                onClick={logout}
              />
            </div>
          )}
        </div>

        <div className="flex-none lg:hidden inline">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="mt-[6px] h-9 px-4 bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr text-primary-light"
          >
            <Image
              src="/assets/icons/mobile-menu.svg"
              alt="Mobile Menu"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-[999] bg-gradient-to-b from-white bg-surface-success text-primary-light font-pathway-extreme transition-transform duration-500",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="bg-line absolute inset-0 bg-[500%] md:bg-contain pointer-events-none"></div>

        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute w-8 h-8 rounded-full bg-green-gradient top-5 right-5 text-white flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </div>

        <div className="flex flex-col items-center justify-center h-full space-y-10 text-3xl font-medium">
          {navItems.map((item) => (
            <Link
              key={`item-${item.href}`}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)} // close after click
              className={clsx(
                "transition-colors hover:text-action-hover",
                pathname.startsWith(item.href) && "text-green"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
