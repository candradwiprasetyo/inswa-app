"use client";

import Image from "next/image";
import { NewsType } from "@/types/news";
import NewsCard from "@/components/NewsCard";

const newsData: NewsType[] = [
  {
    id: 1,
    title:
      "Peluncuran Peraturan Bupati Banyuwangi No. 1 Tahun 2024 tentang Dokumen Rencana",
    description:
      "Program Clean Ocean through Clean Communities (CLOCC) dengan InSWA di Kabupaten Banyuwangi sudah dilaksanakan",
    date: "31 Agu 2025",
    images: "img-3.png",
  },
  {
    id: 2,
    title:
      "Diskusi dan Peluncuran Buku Pengelolaan Sampah “Kebersihan adalah Investasi",
    description:
      "Jakarta, 3 Juli 2022. Masih dalam rangka peringatan Hari Lingkungan Hidup Sedunia, InSWA mengadakan diskusi dan peluncuran",
    date: "11 Agu 2025",
    images: "img-4.png",
  },
  {
    id: 3,
    title:
      "Seminar Evolusi Pengelolaan Sampah Dari Ekonomi Linear ke Sirkular. Pelajaran dari Negara",
    description:
      "Jakarta, 30 September 2022 - Sistem pengelolaan sampah merupakan sistem penyediaan layanan kebersihan yang berhak",
    date: "21 Agu 2025",
    images: "img-5.png",
  },
];

export default function Highlight() {
  return (
    <div className="container mx-auto px-4 md:px-44 py-10 md:py-20">
      <div className="flex justify-between">
        <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px]">
          Highlight
        </div>
        <button className="h-10 border border-secondary-light hover:border-secondary-light-hover font-semibold items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 hidden md:flex">
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
      <div className="flex gap-8 overflow-x-auto md:overflow-none md:flex-nowrap flex-nowrap md:mt-10 md:px-0 scrollbar-hide">
        {newsData.map((news, index) => (
          <NewsCard
            key={index}
            id={news.id}
            title={news.title}
            description={news.description}
            images={news.images}
            date={news.date}
          />
        ))}
      </div>
      <button className="mt-8 h-10 border border-secondary-light font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 md:hidden inline mx-auto">
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
