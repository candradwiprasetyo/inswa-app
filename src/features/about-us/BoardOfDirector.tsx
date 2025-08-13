"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import "@/styles/embla.css";
import usePublicProfile from "@/hooks/usePublicProfile";
import { cdnLoader } from "@/lib/cdnLoader";

export default function BoardOfDirector() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });

  const { profiles, loading } = usePublicProfile();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (loading) {
    return (
      <div className="bg-bod py-20 text-center">
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="bg-bod">
      <div className="mx-auto max-w-6xl px-4 md:px-10 py-10 md:py-20 ">
        <div className="md:flex justify-between items-center">
          <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px]">
            Dewan Pengurus dan Keahlian
          </div>
          <div className="hidden md:flex gap-4">
            <button
              onClick={scrollPrev}
              className="h-10 w-16 border border-secondary-light hover:border-secondary-light-hover flex items-center justify-center rounded-tr-[32px] rounded-bl-[32px] rounded-br rounded-tl text-primary-light"
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
              className="h-10 w-16 border border-secondary-light hover:border-secondary-light-hover flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light"
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

        {/* Desktop carousel */}
        <div className="embla md:mt-10 hidden md:block" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {profiles.map((data) => (
              <div
                className="embla__slide shrink-0 w-[240px] relative"
                key={data.id}
              >
                <Link href={`/profile/${data.id}`}>
                  <Image
                    loader={cdnLoader}
                    src={data.images}
                    alt={data.name}
                    width={240}
                    height={320}
                    className="w-[240px] h-[320px] object-cover rounded-tl-[80px] rounded-tr-lg rounded-br-[80px] rounded-bl-lg mb-4 hover:border-action-hover hover:border-2 transition-all duration-100"
                  />
                  <div className="text-2xl font-bold mb-2">{data.name}</div>
                  <div className="text-sm font-medium text-action-hover  mb-16">
                    {data.position}
                  </div>
                  <button className="absolute bottom-0 h-8 border border-secondary-light hover:border-secondary-light-hover font-semibold items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 hidden md:flex">
                    <div className="text-action-hover font-semibold text-sm">
                      Lihat Profile
                    </div>
                    <Image
                      src="/assets/icons/arrow-right-green.svg"
                      alt="Arrow right"
                      width={22}
                      height={22}
                    />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {profiles.map((data) => (
            <div key={data.id}>
              <Image
                loader={cdnLoader}
                src={data.images}
                alt={data.name}
                width={240}
                height={240}
                className="object-cover rounded-tl-[40px] rounded-tr-lg rounded-br-[40px] rounded-bl-lg mb-4 hover:border-action-hover hover:border-2 transition-all duration-100 aspect-[3/4]"
              />
              <div className="text-base font-bold">{data.name}</div>
              <div className="text-sm text-action-hover">{data.position}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
