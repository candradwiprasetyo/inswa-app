"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Program", href: "/program" },
  { label: "Publikasi", href: "/publikasi" },
  { label: "Membership", href: "/membership" },
  { label: "Media", href: "/media" },
];

export type HeaderProps = {
  active?: boolean;
  title: string;
};

export default function Label({ active = false, title }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "rounded-full py-1 px-6 text-sm font-semibold text-action-hover cursor-pointer",
        active ? "bg-surface-success" : "bg-tertiary-light"
      )}
    >
      {title}
    </div>
  );
}
