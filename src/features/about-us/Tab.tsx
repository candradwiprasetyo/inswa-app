"use client";

import { Link } from "react-scroll";
import { tabData } from "@/data/tab";

export default function Tab() {
  return (
    <div className="w-full bg-tertiary-light">
      <div className="mx-auto max-w-6xl px-4 md:px-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex items-center text-xs gap-6 min-w-max">
          {tabData.map((tab, idx) => (
            <Link
              key={tab.id}
              to={tab.id}
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              className={`cursor-pointer flex h-11 items-center pt-[3px] ${
                idx === 0
                  ? "font-bold text-action border-b-[3px] border-green"
                  : ""
              }`}
              activeClass="font-bold text-action border-b-[3px] border-green"
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
