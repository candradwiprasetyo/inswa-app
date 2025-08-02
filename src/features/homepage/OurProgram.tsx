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
      <div className="container mx-auto px-4 md:px-44 pt-5 md:pt-16 pb-20">
        <div className="flex gap-10">
          <div className="flex-grow">
            <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px]">
              Program Kami
            </div>
            <div className="text-secondary-light mb-10">
              Program kami dirancang untuk mendorong solusi inovatif dan
              kolaboratif dalam pengelolaan sampah yang berkelanjutan.
            </div>
            {/* <div className="flex mt-10 gap-5">
              <div className="py-4 border-t-[3px] border-action-hover flex-1 group hover:border-secondary-light-hover transition-all duration-300">
                <div className="text-tertiary-light">Program</div>
                <div className="text-2xl font-pathway-extreme my-4 cursor-pointer">
                  Clean Ocean through Clean Communities (CLOCC)
                </div>
                <span className="font-pathway-extreme font-semibold text-sm text-action group-hover:text-action-hover cursor-pointer transition-all duration-300">
                  Baca Selengkapnya
                </span>
              </div>
              <div className="py-4 border-t-[3px] border-action-hover flex-1 group hover:border-secondary-light-hover transition-all duration-300">
                <div className="text-tertiary-light">Program</div>
                <div className="text-2xl font-pathway-extreme my-4 cursor-pointer">
                  Pelatihan Sistem Pengelolaan Sampah
                </div>
                <span className="font-pathway-extreme font-semibold text-sm text-action group-hover:text-action-hover cursor-pointer transition-all duration-300">
                  Baca Selengkapnya
                </span>
              </div>
            </div>
            <div className="mt-12 flex gap-4 justify-center md:justify-start">
              <button className="h-10 w-16 border border-secondary-light hover:border-secondary-light-hover font-semibold flex items-center justify-center rounded-tr-[32px] rounded-bl-[32px] rounded-br rounded-tl text-primary-light">
                <Image
                  src="/assets/icons/arrow-left-green.svg"
                  alt="Arrow left"
                  width={24}
                  height={24}
                />
              </button>
              <button className="h-10 w-16 border border-secondary-light hover:border-secondary-light-hover font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light">
                <Image
                  src="/assets/icons/arrow-right-green.svg"
                  alt="Arrow right"
                  width={24}
                  height={24}
                />
              </button>
            </div> */}

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {[1, 2, 3, 4].map((item, index) => (
                  <div className="flex-[0_0_50%] px-2" key={index}>
                    <div className="py-4 border-t-[3px] border-action-hover group hover:border-secondary-light-hover transition-all duration-300">
                      <div className="text-tertiary-light">Program</div>
                      <div className="text-2xl font-pathway-extreme my-4 cursor-pointer">
                        Clean Ocean through Clean Communities (CLOCC)
                      </div>
                      <span className="font-pathway-extreme font-semibold text-sm text-action group-hover:text-action-hover cursor-pointer transition-all duration-300">
                        Baca Selengkapnya
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex gap-4 justify-center md:justify-start">
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
          <div className="flex-none hidden md:inline">
            <Image
              src={"/assets/images/homepage/img-2.png"}
              width={333}
              height={320}
              alt="Our Program"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
