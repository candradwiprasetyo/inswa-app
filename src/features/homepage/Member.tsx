"use client";

import Image from "next/image";

export default function Member() {
  return (
    <div className="bg-gradient-to-b from-white bg-surface-success pb-24 xl:pb-32 relative">
      <div className="bg-line absolute inset-0 bg-[500%] md:bg-contain"></div>
      <div className="md:flex gap-10 mx-auto max-w-6xl px-4 md:px-10 pt-10 md:pt-16 pb-20 relative">
        <div className="flex-none hidden md:inline">
          <Image
            src={"/assets/images/homepage/img-member.png"}
            width={400}
            height={331}
            alt="Member"
            className="w-full"
          />
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
            <Image
              src={"/assets/images/homepage/img-member.png"}
              width={400}
              height={331}
              alt="Member"
              className="w-full"
            />
          </div>
          <div className="font-extrabold mb-4">Mitra Kami</div>
          <div className="grid grid-cols-4  lg:grid-cols-6 gap-3 xl:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                className="aspect-square border bg-white border-primary-light rounded-lg flex items-center px-2"
                key={i}
              >
                <Image
                  src={`/assets/images/homepage/img-member-${i + 1}.png`}
                  width={100}
                  height={100}
                  alt="Member"
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
