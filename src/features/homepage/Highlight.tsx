"use client";

import Image from "next/image";

export default function Highlight() {
  return (
    <div className="container mx-auto px-4 md:px-44 py-10 md:py-20">
      <div className="flex justify-between">
        <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px]">
          Highlight
        </div>
        <button className="h-10 border border-secondary-light font-semibold items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 hidden md:flex">
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
        <div className="shrink-0 w-[65%] md:min-w-0 md:flex-1 bg-white rounded-md border-b-2 border-primary-light">
          <Image
            src={"/assets/images/homepage/img-3.png"}
            width={320}
            height={200}
            alt="Hightlight 1"
            className="w-full"
          />
          <div className="px-2 pt-3 pb-8">
            <div className="text-disabled text-sm mb-3">31 Agu 2025</div>
            <div className="text-primary-light text-base md:text-xl font-medium mb-3 font-pathwa y-extreme">
              Peluncuran Peraturan Bupati Banyuwangi No. 1 Tahun 2024 tentang
              Dokumen Rencana...
            </div>
            <div className="text-secondary-light text-sm ">
              Program Clean Ocean through Clean Communities (CLOCC) dengan InSWA
              di Kabupaten Banyuwangi sudah dilaksanakan...
            </div>
          </div>
        </div>
        <div className="shrink-0 w-[65%] md:min-w-0 md:flex-1 bg-white rounded-md border-b-2 border-primary-light">
          <Image
            src={"/assets/images/homepage/img-4.png"}
            width={320}
            height={200}
            alt="Hightlight 2"
            className="w-full"
          />
          <div className="px-2 pt-3 pb-8">
            <div className="text-disabled text-sm mb-3">31 Agu 2025</div>
            <div className="text-primary-light text-base md:text-xl font-medium mb-3 font-pathwa y-extreme">
              Diskusi dan Peluncuran Buku Pengelolaan Sampah “Kebersihan adalah
              Investasi...
            </div>
            <div className="text-secondary-light text-sm">
              Jakarta, 3 Juli 2022. Masih dalam rangka peringatan Hari
              Lingkungan Hidup Sedunia, InSWA mengadakan diskusi dan
              peluncuran...
            </div>
          </div>
        </div>
        <div className="shrink-0 w-[65%] md:min-w-0 md:flex-1 bg-white rounded-md border-b-2 border-primary-light">
          <Image
            src={"/assets/images/homepage/img-5.png"}
            width={320}
            height={200}
            alt="Hightlight 3"
            className="w-full"
          />
          <div className="px-2 pt-3 pb-8">
            <div className="text-disabled text-sm mb-3">31 Agu 2025</div>
            <div className="text-primary-light text-base md:text-xl font-medium mb-3 font-pathwa y-extreme">
              Seminar Evolusi Pengelolaan Sampah Dari Ekonomi Linear ke
              Sirkular. Pelajaran dari Negara...
            </div>
            <div className="text-secondary-light text-sm">
              Jakarta, 30 September 2022 - Sistem pengelolaan sampah merupakan
              sistem penyediaan layanan kebersihan yang berhak...
            </div>
          </div>
        </div>
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
