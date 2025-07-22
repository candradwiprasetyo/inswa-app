import Image from "next/image";
import { ProgramType } from "@/types/program";

const programData: ProgramType[] = [
  {
    title: "Pengembangan Jaringan & Partisipasi Masyarakat",
    description:
      "Salah satu dari poin utama kegiatan InSWA adalah jangkauan jaringan yang luas di sektor pengelolaan sampah, dari segi infrastuktur, keuangan, operasional, serta pengembangan kapasitas untuk partisipasi masyarakat. InSWA secara aktif dilibatkan dalam pertemuan resmi Pemerintah Daerah dan Pemerintah Nasional, forum informal LSM, komunitas masyarakat, dan diskusi ilmiah diantara akademisi. Anggota Dewan InSWA, khususnya Ketua Umum …",
  },
  {
    title: "Penyusunan Regulasi",
    description:
      "1. Undang-Undang Nomor 18 Tahun 2008 Tentang Pengelolaan Sampah InSWA merupakan salah satu organisasi yang sepakat bahwa Indonesia harus memiliki Undang-Undang tentang Pengelolaan Sampah. Sebelum tahun 2008, peraturan mengenai persampahan terpisah dalam peraturan yang berbeda dan lebih ditekankan pada pengolahan akhir. Sejak tahun 2005, InSWA melakukan serangkaian lokakarya dan forum diskusi untuk meningkatkan pengetahuan",
  },
  {
    title: "Riset Aplikasi tentang Pengelolaan Sampah",
    description:
      "1. Pusat Penelitian dan Pelatihan Rawasari TPST Rawasari adalah fasilitas pemilahan, pengomposan, dan daur ulang dari sampah pada skala komunal yang terletak di Jakarta Pusat, yang lahannya dimiliki oleh Dinas Kebersihan. Rawasari merupakan laboratorium InSWA untuk menunjukkan kepada masyarakat bahwa pengolahan sampah itu sederhana, tidak berbau, dan dapat berlokasi di tengah-tengah pemukiman. Lokasi yang …",
  },
  {
    title: "Studi & Pelatihan Pengembangan Kapasitas Teknis dan Kelembagaan",
    description:
      "1. Pelatihan dasar dan studi banding sistem pengelolaan sampah di Jakarta dan singapura Merujuk Peraturan Pemerintah RI nomor 81 tahun 2012 tentang Pengelolaan Sampah Rumah Tangga dan Sampah Sejenis Sampah Rumah Tangga bahwa Setiap orang wajib melakukan pengurangan sampah dan penanganan sampah. Berdasarkan catatan KLHK, saat ¡ni diperkirakan timbulan sampah secara nasional mencapai 200.000 ton/hari",
  },
  {
    title: "Studi Karakteristik & Manajemen Persampahan",
    description:
      "Karakteristik sampah dan pengelolaannya merupakan salah satu fokus InSWA yang bertujuan untuk mencari dan memvalidasi data tentang pengelolaan sampah dari berbagai kegiatan. Kajian jangka pendek telah dilakukan bekerja sama dengan pemerintah atau organisasi internasional. 1. Kajian Pengelolaan Sampah Pelabuhan Studi pengelolaan sampah pelabuhan telah dilakukan pada tahun 2011 yang didanai oleh German International Cooperation (GIZ)",
  },
];

export default function Content() {
  return (
    <div className="container mx-auto px-4 md:px-44 relative py-10 md:py-16">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 md:gap-y-16">
        {programData.map((data, index) => (
          <div className="flex gap-4" key={index}>
            <div className="flex-none">
              <Image
                src="/assets/icons/point-leaf.svg"
                alt="Pengembangan Jaringan & Partisipasi Masyarakat"
                width={22}
                height={22}
              />
            </div>
            <div className="flex-grow -mt-1 border-primary-light border-b-2 pb-6 md:pb-8">
              <div className="text-xl font-medium mb-3">{data.title}</div>
              <div className="text-secondary-light line-clamp-3">
                {data.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
