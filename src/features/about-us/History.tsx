"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import "@/styles/embla.css";
import { HistoryType } from "@/types/history";

export default function History() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const historyData: HistoryType[] = [
    {
      year: 2001,
      title: "Awal Kolaborasi dan Workshop Pengelolaan Sampah",
      description:
        "Pada Tahun 2001, Unesco, Badan Pengkajian dan Pengembangan Teknologi (BPPT) serta beberapa Lembaga Swadaya Masyarakat mengadakan workshop di Jakarta tentang pengelolaan sampah di pemukiman sebagai usaha untuk mengurangi sampah yang di buang ke sungai dan laut. Salah satu hasil dari workshop adalah perlunya satu wadah komunikasi guna dapat memfasilitasi pihak-pihak yang peduli pada pengelolaan sampah. ",
    },
    {
      year: 2002,
      title: "Lahirnya IWF dan Pembentukan InSWA",
      description:
        "Pada tanggal 20 Februari 2002 lahirlah sebuah forum yang disebut Indonesia Waste Forum (IWF). Sebagai sarana meningkatkan kapasitas organisasi, maka dipandang perlu untuk membentuk organisasi baru yang kemudian di beri nama Indonesia Solid Waste Association (InSWA). Salah satu program InSWA adalah membantu pemerintah dalam mendorong terciptanya UU No. 18 tahun 2008, yaitu Undang-Undang tentang Pengelolaan Sampah.",
    },
    {
      year: 2003,
      title: "Organisasi Profesional Pengelolaan Sampah",
      description:
        "InSWA adalah organisasi profesi di bidang manajemen dan teknologi pengelolaan sampah, didirikan di Jakarta pada 28 Oktober 2003. Bersifat nirlaba, non-partisan, dan independen, InSWA mengusung paradigma baru: pengelolaan sampah dari sumber untuk menciptakan lingkungan yang bersih dan sehat, sekaligus memanfaatkan hasilnya sebagai energi, pupuk, atau bahan baku industri.",
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-44 py-10 md:py-20">
      <div className="flex justify-between items-center">
        <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px]">
          Sejarah InSWA
        </div>
        <div className="gap-4 hidden md:flex">
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
        <div className="embla__container flex gap-8">
          {historyData.map((data, index) => (
            <div
              className="embla__slide shrink-0 w-full md:w-[500px] bg-white"
              key={index}
            >
              <div className="pt-3 pb-8">
                <div className="flex text-green font-semibold items-center gap-4 mb-6">
                  <div className="flex-none">{data.year}</div>
                  <div className="flex-grow border-t-2 border-dashed border-green -mt-1"></div>
                </div>
                <div className="text-primary-light text-base md:text-xl font-medium mb-4 font-pathway-extreme">
                  {data.title}
                </div>
                <div className="text-secondary-light text-sm">
                  {data.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gap-4 flex md:hidden mt-2">
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

      <button className="mt-8 h-10 border border-secondary-light hidden md:flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] text-primary-light gap-2 px-6 md:hidden mx-auto">
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
