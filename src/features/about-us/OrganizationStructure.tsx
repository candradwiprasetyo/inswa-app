import Image from "next/image";

export default function OrganizationStructure() {
  return (
    <div className="w-full relative">
      <div className="container mx-auto px-3 md:px-44 py-16 relative flex justify-between">
        <div className="text-[40px] font-medium font-pathway-extreme mb-10">
          Struktur
          <br /> Organisasi
        </div>
        <div className="flex-grow text-right">
          <Image
            src="/assets/images/about-us/struktur-organisasi.png"
            alt="Struktur Organisasi"
            width={664}
            height={422}
            className="float-right"
          />
        </div>
      </div>
    </div>
  );
}
