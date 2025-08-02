import Image from "next/image";
import Link from "next/link";
import { BoardOfDirectorType } from "@/types/boardOfDirector";

const boardOfDirectorData: BoardOfDirectorType[] = [
  {
    id: 1,
    name: "Ir. Sri Bebassari Msi",
    position: "KETUA UMUM INSWA",
    url: "1.png",
  },
  {
    id: 2,
    name: "Mohammad Helmy",
    position: "KETUA DEWAN PEMBINA INSWA",
    url: "2.png",
  },
  {
    id: 3,
    name: "Djoko Heru Martono",
    position: "WAKIL KETUA UMUM INSWA",
    url: "3.png",
  },
  {
    id: 4,
    name: "Nurina A. Herminindian",
    position: "SEKJEN INSWA",
    url: "4.png",
  },
  {
    id: 5,
    name: "Dini Trisyanti",
    position: "DEPUTI BIDANG PENINGKATAN KAPASITAS DAN PEMBINAAN TEKNIS",
    url: "5.png",
  },
];
export default function Content() {
  return (
    <div className="w-full relative">
      <div className="container mx-auto px-6 md:px-44 flex items-center pt-20 relative">
        <div className="md:flex justify-between items-center py-10 px-16 md:px-28 bg-profile rounded-tl-[96px] rounded-bl-lg rounded-br-[96px] rounded-tr-lg relative w-full gap-8 mt-32">
          <div className="flex-none w-60">
            <Image
              src={`/assets/images/board-of-director/1.png`}
              alt="BOD 1"
              width={240}
              height={320}
              className="w-[240px] h-[320px] object-cover rounded-tl-[80px] rounded-tr-lg rounded-br-[80px] rounded-bl-lg -mt-40 absolute"
            />
          </div>
          <div className="flex-grow">
            <div className="text-[48px] font-medium font-pathway-extreme">
              Ir. Sri Bebassari Msi
            </div>
            <div className="flex gap-2 mt-2">
              <Link
                href={
                  "https://www.facebook.com/profile.php/?id=100068494286108"
                }
                target="_blank"
              >
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/footer-facebook.svg"
                    alt="Footer Facebook"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
              <Link
                href={"https://www.youtube.com/@inswa.official"}
                target="_blank"
              >
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/footer-youtube.svg"
                    alt="Footer Youtube"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
              <Link
                href={"https://www.instagram.com/inswa.official/"}
                target="_blank"
              >
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/footer-instagram.svg"
                    alt="Footer Instagram"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-44 relative py-10 md:py-16 flex gap-10 mt-10">
        <div className="w-2/3 text-secondary-light leading-7">
          <div className="font-medium text-xl flex w-fit gap-3 items-center mb-6 border-b-2 border-action-hover pb-3">
            <Image
              src="/assets/icons/point-leaf.svg"
              alt="Point Leaf"
              width={22}
              height={22}
            />
            Tentang Ir. Sri Bebassari Msi
          </div>
          <div className="mb-8 md:mb-12 leading-7">
            Sri Bebassari menyelesaikan pendidikan S1 pada Teknik
            Penyehatan/Lingkungan ITB pada 1979 dan S2 Program Studi Ilmu
            Lingkungan UI. Sederetan pengalaman profesionalnya telah
            mengantarkan Sri Bebassari menjadi ahli di bidang pengelolaan sampah
            di Indonesia sejak tahun 1981. <br></br>
            <br></br>Selain tercatat sebagai peneliti BPPT dan pernah menjabat
            sebagai Asisten Direktur Teknologi Lingkungan BPPT selama 5 tahun
            (1998 – 2003), Sri Bebassari kerap diminta sebagai tim ahli, tim
            penasehat teknis, dan narasumber di lembaga nasional maupun
            internasional. Sebut saja sebagai narasumber penyusunan UU No. 18
            tentang Pengelolaan Sampah, narasumber penyusunan Peraturan Gubernur
            Pemprov DKI tentang Pengurangan Sampah Rumah Tangga dan Sampah
            Sejenis Sampah Rumah Tangga, Tenaga Ahli Pengelola Sampah Padat pada
            World Bank Office, Jakarta. <br></br>
            <br></br>Di dunia organisasi non pemerintah, Sri Bebassari pernah
            sebagai Direktur Eksekutif Dana Mitra Lingkungan, sebagai Pendiri
            sekaligus Ketua Umum InSWA, Pendiri dan Direktur Eksekutif Yayasan
            PERISAI (Pusat Pengembangan Riset Sampah Sampah Indonesia), dan
            Pendiri/Ketua Dewan Pembina Indonesia Waste Forum (IWF). <br></br>
            <br></br>Hingga saat ini, Sri aktif sebagai Tim Penasehat Teknis
            Persampahan Pemprov DKI Jakarta, Tenaga Ahli pada Sentra 3R Rawasar
            i Jakarta Pusat, Tim Pengendali Tempat Pengelolahan Sampah Terpadu
            Bantar Gebang – Bekasi yang merupakan milik Pemda DKI, dan Anggota
            Dewan Pertimbangan Adipura, Kementerian Lingkungan Hidup.
          </div>
        </div>
        <div className="w-1/3">
          <div className="text-2xl font-medium">Dewan Pengurus Lainnya</div>
          <div className="mt-6">
            {boardOfDirectorData.map((data, index) => (
              <div
                className="border-t-2 border-primary-light-border py-4 flex gap-4"
                key={index}
              >
                <div className="flex-none">
                  <Image
                    src={`/assets/images/board-of-director/${data.url}`}
                    alt="BOD 1"
                    width={240}
                    height={320}
                    className="w-20 h-20 object-cover rounded-tl-[24px] rounded-tr rounded-br-[24px] rounded-bl"
                  />
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-medium mb-2">{data.name}</div>
                  <div className="text-xs text-tertiary-light font-medium">
                    {data.position}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
