import Image from "next/image";

export default function JoinNow() {
  return (
    <div className="w-full relative bg-join-now">
      <div className="absolute inset-0 bg-overlay"></div>
      <div className="container mx-auto px-4 md:px-44 py-10 md:py-20 relative flex gap-16 items-center">
        <div className="w-2/3">
          <div className="text-[32px] md:text-[32px] font-medium font-pathway-extreme text-white mb-6 md:mb-6">
            Mengapa Bergabung dengan Kami?
          </div>
          <div className="text-secondary-dark mb-6">
            Sebagai organisasi yang menghimpun para pelaku pengelolaan sampah di
            Indonesia, InSWA membuka kesempatan bergabung kepada individu dan
            lembaga dalam upaya perbaikan lingkungan yang lebih bersih dan hijau
            di Indonesia.
          </div>
          <div className="text-secondary-dark">
            Keikusertaan untuk menjadi anggota InSWA bisa dilakukan dengan
            terlebih dahulu mengikuti pelatihan dasar pengelolaan sampah
            (training InSWA) dan tes yang diselenggarakan oleh InSWA dan
            melakukan registrasi
          </div>
        </div>
        <div className="w-1/3">
          <div className="bg-join-now-form rounded-tl-[30px] rounded-tr-lg rounded-br-[30px] rounded-bl-lg py-6 md:py-10 px-4 md:px-8 space-y-4 text-white text-center">
            <div className="text-2xl font-pathway-extreme font-medium">
              Gabung Sekarang
            </div>
            <button className="h-10 px-14 text-base bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 mx-auto mb-10">
              Unduh Formulir
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="Logo"
                width={24}
                height={24}
              />
            </button>
            <div className="text-lg font-pathway-extreme font-medium mb-2">
              Punya Pertanyaan
            </div>
            <div className="text-base">
              Call : +31 (0) 10 8083995
              <br />
              Email : members@iswa.org
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
