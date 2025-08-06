"use client";

import Image from "next/image";

export default function StayUpdated() {
  return (
    <>
      <div className="bg-tertiary-light">
        <div className="container px-4 xl:px-16 mx-auto relative -mt-24 md:-mt-28">
          <div className="md:flex justify-between items-center py-12 px-10 md:px-12 2xl:px-28 bg-stay-updated rounded-tl-[96px] rounded-bl-lg rounded-br-[96px] rounded-tr-lg relative overflow-hidden">
            <div className="absolute bg-stay-updated-gradient inset-0"></div>
            <div className="flex-1 text-white relative">
              <div className="font-pathway-extreme text-2xl xl:text-[32px] font-bold mb-4">
                Stay Updated
              </div>
              <div className="text-sm xl:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent purus nunc, ornare eget mi non, feugiat rutrum odio.
                Mauris eros odio, aliquam ut nibh et, tempus dictum velit.
                Suspendisse at pretium ante.
              </div>
            </div>
            <div className="flex-1 text-center md:text-right relative mt-16 md:mt-0">
              <button className="h-10 px-8 text-base bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 float-right w-full md:w-auto">
                Selengkapnya
                <Image
                  src="/assets/icons/arrow-right.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
