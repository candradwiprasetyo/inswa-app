"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import "@/styles/embla.css";
import { BoardOfDirectorType } from "@/types/boardOfDirector";

export default function BoardOfDirector() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const boardOfDirectorData: BoardOfDirectorType[] = [
    {
      id: 1,
      name: "Ir. Sri Bebassari Msi",
      position: "KETUA UMUM INSWA",
      url: "1.png",
    },
    {
      id: 2,
      name: "Mohammad Helmy",
      position: "KETUA DEWAN PEMBINA INSWA",
      url: "2.png",
    },
    {
      id: 3,
      name: "Djoko Heru Martono",
      position: "WAKIL KETUA UMUM INSWA",
      url: "3.png",
    },
    {
      id: 4,
      name: "Nurina A. Herminindian",
      position: "SEKJEN INSWA",
      url: "4.png",
    },
    {
      id: 5,
      name: "Dini Trisyanti",
      position: "DEPUTI BIDANG PENINGKATAN KAPASITAS DAN PEMBINAAN TEKNIS",
      url: "5.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-44 py-10 md:py-20 bg-bod">
      <div className="flex justify-between items-center">
        <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px]">
          Dewan Pengurus dan Keahlian
        </div>
        <div className="flex gap-4">
          <button
            onClick={scrollPrev}
            className="h-10 w-16 border border-secondary-light flex items-center justify-center rounded-tr-[32px] rounded-bl-[32px] text-primary-light"
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
            className="h-10 w-16 border border-secondary-light flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] text-primary-light"
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
      <div className="embla md:mt-10" ref={emblaRef}>
        <div className="embla__container flex gap-6">
          {boardOfDirectorData.map((data, index) => (
            <div
              className="embla__slide shrink-0 w-[240px] relative"
              key={index}
            >
              <Image
                src={`/assets/images/board-of-director/${data.url}`}
                alt="BOD 1"
                width={240}
                height={320}
                className="w-[240px] h-[320px] object-cover rounded-tl-[80px] rounded-tr-lg rounded-br-[80px] rounded-bl-lg mb-4"
              />
              <div className="text-2xl font-bold mb-2">{data.name}</div>
              <div className="text-sm font-medium text-action-hover  mb-16">
                {data.position}
              </div>
              <button className="absolute bottom-0 h-8 border border-secondary-light font-semibold items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 hidden md:flex">
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
            </div>
          ))}
        </div>
      </div>
      <button className="mt-8 h-10 border border-secondary-light flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] text-primary-light gap-2 px-6 md:hidden mx-auto">
        <div className="text-action-hover font-semibold">
          Lihat Lebih Banyak
        </div>
        <Image
          src="/assets/icons/arrow-right-green.svg"
          alt="Arrow right"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
