import Image from "next/image";
import Link from "next/link";
import { BoardOfDirectorType } from "@/types/boardOfDirector";

const boardOfDirectorData: BoardOfDirectorType[] = [
  {
    id: 1,
    name: "Ir. Sri Bebassari Msi",
    position: "KETUA UMUM INSWA",
    images: "1.png",
  },
  {
    id: 2,
    name: "Mohammad Helmy",
    position: "KETUA DEWAN PEMBINA INSWA",
    images: "2.png",
  },
  {
    id: 3,
    name: "Djoko Heru Martono",
    position: "WAKIL KETUA UMUM INSWA",
    images: "3.png",
  },
  {
    id: 4,
    name: "Nurina A. Herminindian",
    position: "SEKJEN INSWA",
    images: "4.png",
  },
  {
    id: 5,
    name: "Dini Trisyanti",
    position: "DEPUTI BIDANG PENINGKATAN KAPASITAS DAN PEMBINAAN TEKNIS",
    images: "5.png",
  },
];
export default function Content() {
  return (
    <div className="w-full relative">
      <div className="container mx-auto px-6 md:px-44 flex items-center pt-20 relative">
        <div className="md:flex justify-between items-center py-10 px-16 md:px-28 bg-profile rounded-tl-[96px] rounded-bl-lg rounded-br-[96px] rounded-tr-lg relative w-full gap-8 mt-32">
          <div className="flex-none w-60">
            <Image
              src="/assets/images/publikasi/publikasi-1.png"
              alt="Publikasi 1"
              width={240}
              height={320}
              className="w-[240px] h-[320px] object-cover -mt-40 absolute border-2 border-tertiary-light"
            />
          </div>
          <div className="flex-grow">
            <div className="text-[32px] font-medium font-pathway-extreme">
              Kebersihan adalah Investasi. Sampahku Tanggung Jawabku
            </div>
            <div className="flex gap-2 mt-4">
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
            Tentang
          </div>
          <div className="mb-8 md:mb-8 leading-7">
            Kebersihan adalah Investasi. Sampahku Tanggung Jawabku merupakan
            sebuah filosofi dan panduan pengelolaan sampah berlandaskan 5 aspek
            pengelolaan sampah, untuk terciptanya kebersihan lingkungan dan
            kesehatan masyarakat. <br></br>
            <br></br>Namun filosofi tersebut kurang populer di Pemerintah bahkan
            masyarakat. Penyediaan sistem pengelolaan sampah yang baik masih
            belum menjadi prioritas Pemerintah Kabupaten / Kota. Selain itu,
            masih banyak pihak yang belum menyadari bahwa pengelolaan sampah
            membutuhkan biaya. Jika pengelolaan sampah dilaksanakan dengan baik
            maka lingkungan menjadi bersih, kesehatan masyarakat meningkat serta
            dapat meningkatkan pariwisata dan ekonomi masyarakat.<br></br>
            <br></br> Berbicara tentang pengelolaan sampah, maka perlu
            membahasnya dengan pendekatan 5 aspek pengelolaan sampah. Mulai dari
            aspek peraturan, kelembagaan, pendanaan, sosial budaya dan
            teknologi. Namun demikian, Lima Aspek Pengelolaan Sampah ini dapat
            berjalan apabila ada political will dari Pemerintah Pusat dan
            Daerah.<br></br>
            <br></br>
            Buku ini sangat tepat dijadikan sebagai panduan oleh berbagai pihak
            terkait pengelolaan sampah karena didalamnya memuat 5 aspek
            pengelolaan sampah. Dengan demikian, diharapkan berbagai macam
            permasalahan persampahan di Indonesia dapat segera teratasi untuk
            menciptakan Indonesia bersih dan sehat.
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
                      Penerbit
                    </td>
                    <td className="px-3 border-l text-tertiary-light">
                      Indonesia Solid Waste Association
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="font-semibold bg-table-program py-2 px-3">
                      Penulis
                    </td>
                    <td className="px-3 border-l text-tertiary-light">
                      Sri Bebassari, Guntur Sitorus, Gifta Oktavia Fajriyanti
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td
                      className="font-semibold bg-table-program py-2 px-3"
                      valign="top"
                    >
                      Sambutan
                    </td>
                    <td className="px-3 border-l py-2 text-tertiary-light">
                      Ir. Sarwono Kusumaatmadja
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="font-semibold bg-table-program py-2 px-3">
                      Cetakan
                    </td>
                    <td className="px-3 border-l text-tertiary-light">
                      Pertama, Juni 2022 Kedua, <br></br>September 2022 Ketiga,
                      <br></br>
                      Februari 2024
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td
                      className="font-semibold bg-table-program py-2 px-3"
                      valign="top"
                    >
                      ISBN
                    </td>
                    <td className="px-3 border-l py-2 text-tertiary-light">
                      978-623-09-3412-4
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td
                      className="font-semibold bg-table-program py-2 px-3"
                      valign="top"
                    >
                      Halaman
                    </td>
                    <td className="px-3 border-l py-2 text-tertiary-light">
                      80
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td
                      className="font-semibold bg-table-program py-2 px-3"
                      valign="top"
                    >
                      Ukuran
                    </td>
                    <td className="px-3 border-l py-2 text-tertiary-light">
                      15,5 x 23 cm
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="text-2xl font-medium">Publikasi Lainnya</div>
          <div className="mt-6">
            {boardOfDirectorData.map((data, index) => (
              <div
                className="border-t-2 border-primary-light-border py-4 flex gap-4 items-center"
                key={index}
              >
                <div className="flex-none">
                  <Image
                    src="/assets/images/publikasi/publikasi-1.png"
                    alt="Publikasi 1"
                    width={107}
                    height={80}
                    className="w-20 h-28 object-cover border border-tertiary-light"
                  />
                </div>
                <div className="flex-grow">
                  <div className="text-xl font-light mb-2">
                    3R Strategic Elements
                  </div>
                  <div className="text-xs text-tertiary-light">
                    PDF | 1,2MB | 2021
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
