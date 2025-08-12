"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-10 py-10 md:py-16">
      <div className="md:flex gap-10 items-center">
        <div className="flex-none">
          <Image
            src={"/assets/images/homepage/img-1.png"}
            width={333}
            height={320}
            alt="About Us"
            className="w-full md:w-64 xl:w-[340px]"
          />
        </div>
        <div className="md:flex-grow mt-10 md:mt-0 items-center">
          <div className="mb-6  font-pathway-extreme text-[32px] md:text-[24px] xl:text-[40px] font-medium">
            Mengelola Sampah, <br />
            Membangun Masa Depan
          </div>
          <div className="text-secondary-light mb-6 xl:mb-10">
            InSWA adalah organisasi profesi nirlaba yang didirikan pada 28
            Oktober 2003 di Jakarta, berfokus pada pengelolaan sampah dari
            sumber untuk menciptakan lingkungan bersih dan sehat. Berawal dari
            forum UNESCO dan BPPT, InSWA menjadi wadah kolaborasi lintas pihak
            dan mendorong lahirnya UU No. 18 Tahun 2008 tentang Pengelolaan
            Sampah.
          </div>
          <Link href="/program">
            <button className="h-10 px-8 text-base bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2">
              Selengkapnya
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="Logo"
                width={24}
                height={24}
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
