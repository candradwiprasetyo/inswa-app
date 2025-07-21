"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-default text-sm relative">
      <div className="absolute w-full inset-0 bg-overlay"></div>
      <div className="container mx-auto px-3 md:px-32 py-3 min-h-screen flex items-center pt-20">
        <div className="text-white relative md:w-2/3 px-3 md:px-12 ">
          <div className="text-2xl md:text-5xl mb-6 font-medium leading-9 md:leading-snug font-pathway-extreme w-3/4 md:w-2/3">
            Kebersihan adalah Investasi. Sampahku Tanggung Jawabku
          </div>
          <div className="text-sm md:text-lg leading-7 md:leading-8">
            InSWA meyakini bahwa sistem pengelolaan sampah yang berkelanjutan
            perlu dirancang secara holistik dengan mempertimbangkan lima aspek
            pengelolaan Sampah: peraturan, kelembagaan, keuangan, teknis, dan
            sosial budaya. Melalui pendekatan ini, tujuan utama pengelolaan
            sampah yaitu lingkungan bersih dan masyarakat sehat dapat terwujud
          </div>
          <button className="h-10 w-16 bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light mt-10">
            <Image
              src="/assets/icons/arrow-down.svg"
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
