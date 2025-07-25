"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 md:px-44 py-10 md:py-16">
      <div className="md:flex gap-10">
        <div className="flex-none">
          <Image
            src={"/assets/images/homepage/img-1.png"}
            width={333}
            height={320}
            alt="About Us"
            className="w-full"
          />
        </div>
        <div className="md:flex-grow mt-10 md:mt-0">
          <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px] font-medium">
            Mengelola Sampah, <br />
            Membangun Masa Depan
          </div>
          <div className="text-secondary-light mb-6 md:mb-10">
            InSWA adalah organisasi profesi nirlaba yang didirikan pada 28
            Oktober 2003 di Jakarta, berfokus pada pengelolaan sampah dari
            sumber untuk menciptakan lingkungan bersih dan sehat. Berawal dari
            forum UNESCO dan BPPT, InSWA menjadi wadah kolaborasi lintas pihak
            dan mendorong lahirnya UU No. 18 Tahun 2008 tentang Pengelolaan
            Sampah.
          </div>
          <button className="h-10 px-8 text-base bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2">
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
  );
}
