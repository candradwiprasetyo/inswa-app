import Image from "next/image";
import Link from "next/link";
import { usePublicPrograms } from "@/hooks/usePublicProgram";
import { getFullImageUrl } from "@/lib/image";

export default function Content() {
  const { programs } = usePublicPrograms(3);

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-10 relative py-10 md:py-16 ">
      <div className="mb-8 md:mb-16">
        Sejak masa pendiriannya, InSWA telah melaksanakan serangkaian program
        dan kegiatan yang berkaitan dengan kebijakan, impementasi pengelolaan
        sampah kota, dan peningkatan kapasitas seperti:{" "}
        <strong>
          Green Label Indonesia, Pengembangan Jaringan dan Partisipasi
          Masyarakat, Pengembangan Kapasitas Teknis dan Kelembagaan, Penyusunan
          Regulasi, Riset Aplikasi tentang Pengelolaan Sampah, & Studi
          Karakteristik dan Manajemen Persampahan.
        </strong>
      </div>
      <div className="space-y-6">
        {programs.map((data, index) => (
          <Link
            key={index}
            href={`/program/${data.id}`}
            className="block relative"
          >
            <div
              className="md:flex justify-between items-center py-10 px-10 md:px-10 rounded-tl-[64px] rounded-bl-lg rounded-br-[64px] rounded-tr-lg relative overflow-hidden bg-center bg-cover gap-10"
              style={{
                backgroundImage: `url("${getFullImageUrl(data.image)}")`,
              }}
            >
              <div className="absolute bg-black opacity-50 inset-0"></div>
              <div className="w-7/12 text-white relative py-6">
                <div className="font-pathway-extreme text-[32px] font-light mb-8">
                  {data.name}
                </div>
                <button className="h-10 w-16 border border-secondary-light hover:border-secondary-light-hover font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light">
                  <Image
                    src="/assets/icons/arrow-right-white.svg"
                    alt="Arrow right"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div className="w-5/12 relative mt-16 md:mt-0">
                <div className="bg-overlay-white rounded-tl-[40px] rounded-tr-lg rounded-br-[40px] rounded-bl-lg py-6 md:py-8 px-4 md:px-6 space-y-4 text-primary-dark text-sm leading-6">
                  {data.description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
