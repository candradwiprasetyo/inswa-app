import Image from "next/image";

export default function Content() {
  return (
    <div className="w-full relative">
      <div className="container mx-auto px-4 md:px-44 relative flex gap-5 items-start">
        <div className="w-1/3 py-8">
          <div className="border rounded-lg w-full">
            <div className="bg-table-green w-full p-3 font-semibold text-action">
              Buku, Modul dan Panduan
            </div>
            <div className="w-full p-3 font-semibold border-t">
              Laporan, Jurnal dan Makalah
            </div>
            <div className="w-full p-3 font-semibold border-t">Peraturan</div>
            <div className="w-full p-3 font-semibold border-t">
              Best Practice
            </div>
          </div>
        </div>
        <div className="w-2/3 border-l pl-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="py-5 flex items-center">
              <div className="flex flex-grow items-center">
                <div className="flex-none">
                  <Image
                    src="/assets/images/publikasi/publikasi-1.png"
                    alt="Publikasi 1"
                    width={120}
                    height={160}
                    className="border-2 border-tertiary-light"
                  />
                </div>
                <div className="flex-grow px-6">
                  <div className="text-lg mb-2">
                    Composting and Its Applicability in Developing Countries
                  </div>
                  <div className="text-xs text-tertiary-light">
                    PDF | 1,2MB | 2021
                  </div>
                </div>
              </div>
              <div className="flex flex-none">
                <button className="h-10 w-16 border border-secondary-light font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light">
                  <Image
                    src="/assets/icons/arrow-right-green.svg"
                    alt="Arrow right"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
