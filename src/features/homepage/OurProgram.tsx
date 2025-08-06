"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export default function OurProgram() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="bg-gradient-to-b from-white bg-tertiary-light">
      <div className="container mx-auto px-4 xl:px-36 2xl:px-44 pt-5 md:pt-16 pb-20">
        <div className="md:flex gap-10 w-full">
          <div className="md:w-2/3">
            <div className="mb-6 font-pathway-extreme text-[32px] lg:text-[24px] xl:text-[40px]">
              Program Kami
            </div>
            <div className="text-secondary-light mb-5 xl:mb-10">
              Program kami dirancang untuk mendorong solusi inovatif dan
              kolaboratif dalam pengelolaan sampah yang berkelanjutan.
            </div>
            <div className="overflow-hidden w-[100%]" ref={emblaRef}>
              <div className="flex">
                {[1, 2, 3, 4].map((item, index) => (
                  <div className="flex-[0_0_50%] pr-4" key={index}>
                    <div className="py-4 border-t-[3px] border-action-hover group hover:border-secondary-light-hover transition-all duration-300">
                      <div className="text-tertiary-light">Program</div>
                      <div className="text-2xl md:text-lg xl:text-2xl font-pathway-extreme my-4 cursor-pointer">
                        Pelatihan Pengembangan Kapasitas dalam Pengelolaan
                        Sampah
                      </div>
                      <span className="font-pathway-extreme font-semibold text-sm text-action group-hover:text-action-hover cursor-pointer transition-all duration-300">
                        Baca Selengkapnya
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 xl:mt-12 flex gap-4 justify-center md:justify-start">
              <button
                onClick={scrollPrev}
                className="h-10 w-16 border border-secondary-light hover:border-secondary-light-hover font-semibold flex items-center justify-center rounded-tr-[32px] rounded-bl-[32px] rounded-br rounded-tl text-primary-light"
              >
                <Image
                  src="/assets/icons/arrow-left-green.svg"
                  alt="Arrow left"
                  width={24}
                  height={24}
                />
              </button>
              <button
                onClick={scrollNext}
                className="h-10 w-16 border border-secondary-light hover:border-secondary-light-hover font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light"
              >
                <Image
                  src="/assets/icons/arrow-right-green.svg"
                  alt="Arrow right"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <div className="w-1/3 hidden md:inline">
            <Image
              src={"/assets/images/homepage/img-2.png"}
              width={333}
              height={320}
              alt="Our Program"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
