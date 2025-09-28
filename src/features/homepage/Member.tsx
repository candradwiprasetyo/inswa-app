"use client";

import Image from "next/image";
import usePublicPartner from "@/hooks/usePublicPartner";
import { cdnLoader } from "@/lib/cdnLoader";
import useEmblaCarousel from "embla-carousel-react";

export default function Member() {
  const { partners, loading } = usePublicPartner("1");
  const { partners: sertifikat } = usePublicPartner("2");

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });

  return (
    <div className="bg-gradient-to-b from-white bg-surface-success pb-24 xl:pb-32 relative">
      <div className="bg-line absolute inset-0 bg-[500%] md:bg-contain"></div>
      <div className="md:flex gap-10 mx-auto max-w-6xl px-4 md:px-10 pt-10 md:pt-16 pb-20 relative">
        <div className="flex-none hidden md:inline md:w-1/3 min-w-[300px]">
          {sertifikat?.map((sertifikat) => (
            <Image
              key={sertifikat.id}
              loader={cdnLoader}
              src={sertifikat.image}
              alt={sertifikat.name}
              width={400}
              height={331}
              className="w-full"
            />
          ))}
        </div>
        <div className="flex-grow">
          <div className="mb-6 font-pathway-extreme text-[32px] font-medium">
            InSWA Resmi Bagian Dari ISWA
          </div>
          <div className="text-secondary-light mb-8 text-sm leading-6">
            Terhitung sejak Januari 2013, InSWA menjadi National Member of ISWA.
            ISWA adalah satu-satunya asosiasi internasional yang konsen pada
            sektor pengelolaan sampah berkelanjutan dan ramah lingkungan,
            mengoptimal dan meningkatkan efisiensi pengelolaan sampah di level
            global.
          </div>
          <div className="md:hidden block mb-6">
            {sertifikat?.map((sertifikat) => (
              <Image
                key={sertifikat.id}
                loader={cdnLoader}
                src={sertifikat.image}
                alt={sertifikat.name}
                width={400}
                height={331}
                className="w-full"
              />
            ))}
          </div>
          <div className="font-extrabold mb-4">Mitra Kami</div>

          {loading && <div>Loading...</div>}

          <div
            className="embla md:mt-10 hidden md:block overflow-hidden"
            ref={emblaRef}
          >
            <div className="embla__container flex">
              {partners?.map((partner) => (
                <div
                  className="embla__slide shrink-0 w-1/6 px-2"
                  key={partner.id}
                >
                  <div className="aspect-[3/2] border bg-white border-primary-light rounded-lg flex items-center px-2">
                    <Image
                      loader={cdnLoader}
                      src={partner.image}
                      alt={partner.name}
                      width={100}
                      height={100}
                      className="w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
