import Image from "next/image";
import { ProgramType } from "@/types/program";
import Link from "next/link";

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
    <div className="container mx-auto px-4 md:px-44 relative py-10 md:py-16 flex gap-10">
      <div className="w-2/3 text-secondary-light leading-7">
        <div className="mb-8 md:mb-12">
          Program CLOCC, kerja sama InSWA dan Sirk Norge dengan dukungan NORAD,
          bertujuan mencegah sampah plastik ke laut lewat perbaikan sistem
          sampah darat. Sejak 2020, program ini berjalan di Banyuwangi, Tabanan,
          dan Tegal dengan pendekatan ISWM yang partisipatif dan berkelanjutan.
        </div>
        <div className="md:flex justify-between items-center py-6 px-8 md:px-8 bg-stay-updated rounded-tl-[40px] rounded-bl-lg rounded-br-[40px] rounded-tr-lg relative overflow-hidden mb-6">
          <div className="absolute bg-stay-updated-gradient inset-0"></div>
          <div className="flex-1 text-white relative">
            <div className="font-pathway-extreme text-lg font-bold">
              1. Asia Pasific Roundtable For Sustainable Consumption And
              Production (APRSCP)
            </div>
          </div>
        </div>
        <div className="mb-8 md:mb-12">
          <p>
            Asia Pasific Roundtable For Sustainable Consumption And Production
            (APRSCP) adalah sebuah forum negara-negara Asia Pasifik yang peduli
            pada aspek pelaksanaan produksi dan konsumsi berkelanjutan.
            Konferensi APRSCP ke-10 dilaksanakan di Yogyakarta, Indonesia pada
            tanggal 9 – 11 November 2011, diselenggarakan oleh Kementerian
            Lingkungan Hidup dan Indonesia Solid Waste Association (InSWA),
            dengan tema utama “Sustainable Consumption and Production: Leading
            to Green Business, from Local Initiative to Global Winner”.
            Disamping konferensi, workshop, pameran, dan kunjungan ke lapangan,
            program-program juga diatur sebelum konferensi, bertujuan untuk
            memfasilitasi informasi dan bertukar pengalaman dari prakarsa lokal
            dan pelajaran yang dipelajari dari proyek-proyek yang berhubungan
            dengan Sustainable Consumption and Production (SCP) di wilayah Asia
            Pasifik.{" "}
          </p>
          <p className="mt-4">
            Konferensi terselenggara dengan baik yang dihadiri lebih dari 350
            peserta dari 27 negara. Acara tersebut dibuka oleh Menteri
            Lingkungan Hidup dan Sultan Yogyakarta sebagai Gubernur Yogyakarta.
            Ini adalah batu loncatan yang signifikan bagi InSWA dalam menjalin
            hubungan dengan organisasi internasional untuk mengembangkan
            kemitraan program dan kegiatan InSWA.
          </p>
        </div>
        <div className="mb-8 md:mb-12">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <tbody>
                <tr>
                  <td
                    className="font-semibold bg-table-program py-2 px-3"
                    width="30%"
                  >
                    Tahun
                  </td>
                  <td className="px-3 border-l">2011</td>
                </tr>
                <tr className="border-t">
                  <td className="font-semibold bg-table-program py-2 px-3">
                    Lokasi
                  </td>
                  <td className="px-3 border-l">Yogyakarta</td>
                </tr>
                <tr className="border-t">
                  <td
                    className="font-semibold bg-table-program py-2 px-3"
                    valign="top"
                  >
                    Pihak yang terlibat
                  </td>
                  <td className="px-3 border-l py-2">
                    <ul className="list-disc pl-6">
                      <li>
                        Pemerintah (Kementerian Lingkungan Hidup, Badan
                        Penelitian dan Aplikasi Teknologi, Kementerian Industri,
                        Kementerian Perdagangan, Kementerian Pariwisata)
                      </li>
                      <li>Pusat Produksi Bersih Nasional (PPBN)</li>
                      <li>
                        Organisasi International (UNEP, IGES, UNIDO, SWITCH Asia
                        - Uni Eropa)
                      </li>
                      <li>Dewan Wali Amanat APRSCP Sektor Swasta</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <div className="text-2xl font-medium">Program Lainnya</div>
        <div className="mt-6">
          {programData.map((data, index) => (
            <div
              className="border-t-2 border-primary-light-border py-4"
              key={index}
            >
              <div className="text-tertiary-light text-sm mb-2">Program</div>
              <div className="text-secondary-light text-base font-semibold">
                {data.title}
              </div>
            </div>
          ))}
          <button className="h-7 border border-secondary-light hover:border-secondary-light-hover font-semibold items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 hidden md:flex text-xs mt-4 float-right">
            <div className="text-action-hover font-semibold">Lihat Semua</div>
            <Image
              src="/assets/icons/arrow-right-green.svg"
              alt="Arrow right"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
