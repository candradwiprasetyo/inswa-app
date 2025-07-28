import Image from "next/image";
import { ProgramType } from "@/types/program";

const programData: ProgramType[] = [
  {
    title: "Clean Ocean through Clean Communities (CLOCC)",
    description:
      "Program CLOCC, kerja sama InSWA dan Sirk Norge dengan dukungan NORAD, bertujuan mencegah sampah plastik ke laut lewat perbaikan sistem sampah darat. Sejak 2020, program ini berjalan di Banyuwangi, Tabanan, dan Tegal dengan pendekatan ISWM yang partisipatif dan berkelanjutan.",
    images: "program-1.png",
  },
  {
    title: "Pelatihan Pengembangan Kapasitas dalam Pengelolaan Sampah",
    description:
      "Pelatihan ini membekali pemangku kepentingan dengan pemahaman dasar pengelolaan sampah berkelanjutan melalui lima aspek, serta studi banding ke negara seperti Singapura untuk memperoleh wawasan yang relevan dan aplikatif.",
    images: "program-2.png",
  },
  {
    title: "Advokasi Kebijakan Pengelolaan Sampah ",
    description:
      "InSWA mendorong kebijakan pengelolaan sampah berkelanjutan melalui advokasi, penyusunan regulasi, pendampingan teknis, dan dialog multipihak, dengan pendekatan berbasis data, partisipatif, dan kontekstual.",
    images: "program-3.png",
  },
];

export default function Content() {
  return (
    <div className="container mx-auto px-4 md:px-44 relative py-10 md:py-16 ">
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
        {programData.map((data, index) => (
          <div
            className="md:flex justify-between items-center py-10 px-10 md:px-10 rounded-tl-[64px] rounded-bl-lg rounded-br-[64px] rounded-tr-lg relative overflow-hidden bg-center bg-cover gap-10"
            style={{
              backgroundImage: `url("/assets/images/program/${data.images}")`,
            }}
          >
            <div className="absolute bg-black opacity-50 inset-0"></div>
            <div className="w-7/12 text-white relative py-6">
              <div className="font-pathway-extreme text-[32px] font-light mb-8">
                {data.title}
              </div>
              <button className="h-10 w-16 border border-secondary-light font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light">
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
        ))}
      </div>
    </div>
  );
}
