export default function VisionMission() {
  return (
    <div className="w-full relative bg-vision-mission">
      <div className="absolute inset-0 bg-overlay"></div>
      <div className="container mx-auto px-4 md:px-44 py-10 md:py-16 relative">
        <div className="text-[32px] md:text-[40px] font-medium font-pathway-extreme text-white mb-8 md:mb-10">
          Visi & Misi
        </div>
        <div className="md:flex gap-16">
          <div className="flex-1 text-xl font-medium font-pathway-extreme">
            <div className="text-green mb-4">Visi</div>
            <div className="text-primary-dark text-[24px] md:text-[32px] leading-normal mb-12 md:mb-0">
              Mewujudkan Indonesia Berbudaya Mengelola Sampah Secara Terpadu
              sesuai Perundang-undangan pengelolaan sampah Indonesia
            </div>
          </div>
          <div className="flex-1 text-xl font-medium font-pathway-extreme">
            <div className="text-green mb-4">Misi</div>
            <div className="text-primary-dark text-xl leading-normal">
              <ul className="list-disc font-light pl-10 text-base md:text-xl">
                <li>
                  Memperkenalkan manajemen pengelolaan sampah yang berkelanjutan
                  di Indonesia
                </li>
                <li>
                  Melindungi serta menjaga lingkungan, sumberdaya alam dan
                  kesehatan manusia
                </li>
                <li>
                  Mengembangkan jaringan kerja di bidang pengelolaan sampah
                </li>
                <li>
                  Meningkatkan kapasitas pemangku kepentingan untuk pengelolaan
                  sampah
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
