import Label from "@/components/Label/Label";
import Image from "next/image";
import { NewsType } from "@/types/news";
import NewsCard from "@/components/NewsCard";

const newsData: NewsType[] = [
  {
    id: 1,
    title:
      "Peluncuran Peraturan Bupati Banyuwangi No. 1 Tahun 2024 tentang Dokumen Rencana",
    description:
      "Program Clean Ocean through Clean Communities (CLOCC) dengan InSWA di Kabupaten Banyuwangi sudah dilaksanakan sejak tahun 2020 hingga 2024. Serangkaian aktivitas telah dilakukan seperti pelatihan pemangku kepentingan untuk pengelolaan sampah, penyusunan Dokumen Rencana Induk ",
    images: "img-3.png",
    date: "31 Agu 2025",
  },
  {
    id: 2,
    title:
      "Diskusi dan Peluncuran Buku Pengelolaan Sampah Kebersihan adalah Investasi, Sampahku Tanggung Jawabku",
    description:
      "Jakarta, 3 Juli 2022. Masih dalam rangka peringatan Hari Lingkungan Hidup Sedunia, InSWA mengadakan diskusi dan peluncuran buku pengelolaan sampah dengan judul “Kebersihan adalah Investasi, Sampahku Tanggung Jawabku” di Jakarta Convention Center.",
    images: "img-4.png",
    date: "1 Juli 2025",
  },
  {
    id: 3,
    title:
      "Seminar Evolusi Pengelolaan Sampah Dari Ekonomi Linear ke Sirkular. Pelajaran dari Negara",
    description:
      "Jakarta, 30 September 2022 - Sistem pengelolaan sampah merupakan sistem penyediaan layanan kebersihan yang berhak dinikmati oleh seluruh warga negara. Sistem ini membutuhkan sumber daya besar untuk menjalankannya",
    images: "img-5.png",
    date: "31 September 2025",
  },
  {
    id: 4,
    title:
      "Peluncuran Peraturan Bupati Banyuwangi No. 1 Tahun 2024 tentang Dokumen Rencana",
    description:
      "Program Clean Ocean through Clean Communities (CLOCC) dengan InSWA di Kabupaten Banyuwangi sudah dilaksanakan sejak tahun 2020 hingga 2024. Serangkaian aktivitas telah dilakukan seperti pelatihan pemangku kepentingan untuk pengelolaan sampah, penyusunan Dokumen Rencana Induk ",
    images: "img-3.png",
    date: "31 Agu 2025",
  },
  {
    id: 5,
    title:
      "Diskusi dan Peluncuran Buku Pengelolaan Sampah Kebersihan adalah Investasi, Sampahku Tanggung Jawabku",
    description:
      "Jakarta, 3 Juli 2022. Masih dalam rangka peringatan Hari Lingkungan Hidup Sedunia, InSWA mengadakan diskusi dan peluncuran buku pengelolaan sampah dengan judul “Kebersihan adalah Investasi, Sampahku Tanggung Jawabku” di Jakarta Convention Center.",
    images: "img-4.png",
    date: "1 Juli 2025",
  },
  {
    id: 6,
    title:
      "Seminar Evolusi Pengelolaan Sampah Dari Ekonomi Linear ke Sirkular. Pelajaran dari Negara",
    description:
      "Jakarta, 30 September 2022 - Sistem pengelolaan sampah merupakan sistem penyediaan layanan kebersihan yang berhak dinikmati oleh seluruh warga negara. Sistem ini membutuhkan sumber daya besar untuk menjalankannya",
    images: "img-5.png",
    date: "31 September 2025",
  },
];

export default function Content() {
  return (
    <div className="w-full relative">
      <div className="container mx-auto px-6 md:px-44 flex items-center pt-20 relative h-64">
        <div className="absolute text-4xl md:text-[48px] font-medium font-pathway-extreme bottom-5 leading-snug md:leading-normal">
          Media
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-44 relative">
        <div className="mb-5 w-full relative">
          <div className="absolute w-5 h-5 left-4 top-4">
            <Image
              src="/assets/icons/search.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border border-primary-light rounded-xl py-3 px-4 w-full pl-12"
          ></input>
        </div>
        <div className="mb-5 w-full flex items-center">
          <div className="flex-1 text-tertiary-light font-medium text-sm">
            Showing 1 - 10 of 678 results
          </div>
          <div className="flex-1 flex justify-end gap-3">
            <Label title="All" active={true} />
            <Label title="Article" />
            <Label title="Video" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 md:mt-10 md:px-0 scrollbar-hide gap-x-10 gap-y-16 mb-16">
          {newsData.map((news, index) => (
            <NewsCard
              key={index}
              id={news.id}
              title={news.title}
              description={news.description}
              images={news.images}
              date={news.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
