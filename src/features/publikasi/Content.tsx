import Image from "next/image";
import Link from "next/link";
import Label from "@/components/Label";

export default function Content() {
  return (
    <div className="w-full relative">
      <div className="mx-auto max-w-6xl px-4 md:px-10 relative md:flex gap-5 items-start">
        <div className="md:w-1/3 py-8 hidden md:inline">
          <div className="border rounded-lg w-full">
            <div className="bg-table-green w-full p-3 font-semibold text-action hover:bg-surface-secondary-light cursor-pointer">
              Buku
            </div>
            <div className="w-full p-3 font-semibold border-t hover:bg-surface-secondary-light cursor-pointer">
              Report
            </div>
            <div className="w-full p-3 font-semibold border-t hover:bg-surface-secondary-light cursor-pointer">
              Publikasi Internasional
            </div>
            <div className="w-full p-3 font-semibold border-t hover:bg-surface-secondary-light cursor-pointer">
              Peraturan
            </div>
          </div>
        </div>
        <div className="flex gap-3 flex-nowrap md:hidden mt-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Label title="Buku" active={true} />
          <Label title="Report" />
          <Label title="Publikasi Internasional" />
          <Label title="Peraturan" />
        </div>
        <div className="md:w-2/3 md:border-l md:pl-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Link href={`/publikasi/${i}`} key={i}>
              <div className="py-5 flex items-center border-b" key={i}>
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
                <div className="hidden md:flex flex-none">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
