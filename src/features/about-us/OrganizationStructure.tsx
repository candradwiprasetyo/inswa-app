import Image from "next/image";

export default function OrganizationStructure() {
  return (
    <div className="w-full relative">
      <div className="container mx-auto px-4 md:px-44 py-10 md:py-16 relative md:flex justify-between">
        <div className="text-[32px] md:text-[40px] font-medium font-pathway-extreme mb-10">
          Struktur Organisasi
        </div>
        <div className="flex-grow text-right">
          <Image
            src="/assets/images/about-us/organization-structure.png"
            alt="Struktur Organisasi"
            width={664}
            height={422}
            className="md:float-right"
          />
        </div>
      </div>
    </div>
  );
}
