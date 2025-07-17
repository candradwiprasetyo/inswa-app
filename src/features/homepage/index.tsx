import Image from "next/image";

export default function Homepage() {
  return (
    <div className="bg-default text-sm relative">
      <div className="absolute w-full inset-0 bg-overlay"></div>
      <div className="container mx-auto px-20 py-3">
        <div className="h-16 rounded-xl relative bg-header px-10 flex items-center">
          <div className="flex-grow flex items-center gap-8">
            <div className="flex-none">
              <Image
                src={"/assets/images/header-logo.png"}
                width={157}
                height={36}
                alt="Header Logo"
              />
            </div>
            <div className="flex-grow flex gap-8 text-white font-medium">
              <div>Tentang Kami</div>
              <div>Program</div>
              <div>Publikasi</div>
              <div>Membership</div>
              <div>Media</div>
            </div>
          </div>
          <div className="flex-none flex gap-2">
            <div className="h-9 w-24 font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr border border-white text-green">
              Masuk
            </div>
            <div className="h-9 w-24 bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr text-primary-light">
              Daftar
            </div>
          </div>
        </div>

        <div className="text-white  relative my-24 w-1/2 px-12">
          <div className="text-5xl mb-6 font-medium leading-snug font-pathway-extreme">
            Kebersihan adalah Investasi. Sampahku Tanggung Jawabku
          </div>
          <div className="text-lg">
            InSWA meyakini bahwa sistem pengelolaan sampah yang berkelanjutan
            perlu dirancang secara holistik dengan mempertimbangkan lima aspek
            pengelolaan Sampah: peraturan, kelembagaan, keuangan, teknis, dan
            sosial budaya. Melalui pendekatan ini, tujuan utama pengelolaan
            sampah yaitu lingkungan bersih dan masyarakat sehat dapat terwujud
          </div>
          <div className="h-10 w-16 bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr text-primary-light mt-10">
            <Image
              src="/assets/images/arrow-down.svg"
              alt="Logo"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
