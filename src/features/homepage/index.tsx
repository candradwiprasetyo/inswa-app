"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`transition-colors duration-500 md:container md:mx-auto h-14 md:h-16 rounded-xl right-3 md:right-0 left-3 md:left-0  px-3 md:px-10 flex items-center fixed z-50 top-3 ${
          isScrolled ? "bg-header-secondary" : "bg-header-primary"
        }`}
      >
        <div className="flex-grow flex items-center gap-8">
          <div className="flex-none">
            <Image
              src={"/assets/images/header-logo.png"}
              width={157}
              height={36}
              alt="Header Logo"
              className="w-32 md:w-36"
            />
          </div>
          <div className="flex-grow gap-8 text-white font-medium hidden md:flex">
            <div>Tentang Kami</div>
            <div>Program</div>
            <div>Publikasi</div>
            <div>Membership</div>
            <div>Media</div>
          </div>
        </div>
        <div className="flex-none gap-2 hidden md:flex">
          <div className="h-9 w-24 font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr border border-white text-green">
            Masuk
          </div>
          <div className="h-9 w-24 bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr text-primary-light">
            Daftar
          </div>
        </div>
        <div className="flex-none md:hidden inline">
          <button className="h-9 px-4 bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[24px] rounded-br-[24px] rounded-bl rounded-tr text-primary-light">
            <Image
              src="/assets/icons/mobile-menu.svg"
              alt="Mobile Menu"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div className="bg-default text-sm relative">
        <div className="absolute w-full inset-0 bg-overlay"></div>
        <div className="container mx-auto px-3 md:px-32 py-3 min-h-screen flex items-center pt-20">
          <div className="text-white relative md:w-2/3 px-3 md:px-12 ">
            <div className="text-2xl md:text-5xl mb-6 font-medium leading-9 md:leading-snug font-pathway-extreme w-3/4 md:w-2/3">
              Kebersihan adalah Investasi. Sampahku Tanggung Jawabku
            </div>
            <div className="text-sm md:text-lg leading-7 md:leading-8">
              InSWA meyakini bahwa sistem pengelolaan sampah yang berkelanjutan
              perlu dirancang secara holistik dengan mempertimbangkan lima aspek
              pengelolaan Sampah: peraturan, kelembagaan, keuangan, teknis, dan
              sosial budaya. Melalui pendekatan ini, tujuan utama pengelolaan
              sampah yaitu lingkungan bersih dan masyarakat sehat dapat terwujud
            </div>
            <button className="h-10 w-16 bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light mt-10">
              <Image
                src="/assets/icons/arrow-down.svg"
                alt="Logo"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-44 py-10 md:py-16">
        <div className="md:flex gap-10">
          <div className="flex-none">
            <Image
              src={"/assets/images/homepage/img-1.png"}
              width={333}
              height={320}
              alt="About Us"
              className="w-full"
            />
          </div>
          <div className="md:flex-grow mt-10 md:mt-0">
            <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px] font-medium">
              Mengelola Sampah, <br />
              Membangun Masa Depan
            </div>
            <div className="text-secondary-light mb-6 md:mb-10">
              InSWA adalah organisasi profesi nirlaba yang didirikan pada 28
              Oktober 2003 di Jakarta, berfokus pada pengelolaan sampah dari
              sumber untuk menciptakan lingkungan bersih dan sehat. Berawal dari
              forum UNESCO dan BPPT, InSWA menjadi wadah kolaborasi lintas pihak
              dan mendorong lahirnya UU No. 18 Tahun 2008 tentang Pengelolaan
              Sampah.
            </div>
            <button className="h-10 px-8 text-base bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2">
              Selengkapnya
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="Logo"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-white bg-tertiary-light">
        <div className="container mx-auto px-4 md:px-44 pt-5 md:pt-16 pb-20">
          <div className="flex gap-10">
            <div className="flex-grow">
              <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px]">
                Program Kami
              </div>
              <div className="text-secondary-light mb-10">
                Program kami dirancang untuk mendorong solusi inovatif dan
                kolaboratif dalam pengelolaan sampah yang berkelanjutan.
              </div>
              <div className="flex mt-10 gap-5">
                <div className="py-4 border-t-[3px] border-[#6abd45] flex-1">
                  <div className="text-tertiary-light">Program</div>
                  <div className="text-2xl font-pathway-extreme my-4">
                    Clean Ocean through Clean Communities (CLOCC)
                  </div>
                  <div className="font-pathway-extreme font-semibold text-sm text-action-hover">
                    Baca Selengkapnya
                  </div>
                </div>
                <div className="py-4 border-t-[3px] border-[#6abd45] flex-1">
                  <div className="text-tertiary-light">Program</div>
                  <div className="text-2xl font-pathway-extreme my-4">
                    Pelatihan Sistem Pengelolaan Sampah
                  </div>
                  <div className="font-pathway-extreme font-semibold text-sm text-action-hover">
                    Baca Selengkapnya
                  </div>
                </div>
              </div>
              <div className="mt-12 flex gap-4 justify-center md:justify-start">
                <button className="h-10 w-16 border border-secondary-light font-semibold flex items-center justify-center rounded-tr-[32px] rounded-bl-[32px] rounded-br rounded-tl text-primary-light">
                  <Image
                    src="/assets/icons/arrow-left-green.svg"
                    alt="Arrow left"
                    width={24}
                    height={24}
                  />
                </button>
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
            <div className="flex-none hidden md:inline">
              <Image
                src={"/assets/images/homepage/img-2.png"}
                width={333}
                height={320}
                alt="Our Program"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-44 py-10 md:py-20">
        <div className="flex justify-between">
          <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px]">
            Highlight
          </div>
          <button className="h-10 border border-secondary-light font-semibold items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 hidden md:flex">
            <div className="text-action-hover font-semibold">
              Lihat Lebih Banyak
            </div>
            <Image
              src="/assets/icons/arrow-right-green.svg"
              alt="Arrow right"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="flex gap-8 overflow-x-auto md:overflow-none md:flex-nowrap flex-nowrap md:mt-10 md:px-0 scrollbar-hide">
          <div className="shrink-0 w-[65%] md:min-w-0 md:flex-1 bg-white rounded-md border-b-2 border-primary-light">
            <Image
              src={"/assets/images/homepage/img-3.png"}
              width={320}
              height={200}
              alt="Hightlight 1"
              className="w-full"
            />
            <div className="px-2 pt-3 pb-8">
              <div className="text-disabled text-sm mb-3">31 Agu 2025</div>
              <div className="text-primary-light text-base md:text-xl font-medium mb-3 font-pathwa y-extreme">
                Peluncuran Peraturan Bupati Banyuwangi No. 1 Tahun 2024 tentang
                Dokumen Rencana...
              </div>
              <div className="text-secondary-light text-sm ">
                Program Clean Ocean through Clean Communities (CLOCC) dengan
                InSWA di Kabupaten Banyuwangi sudah dilaksanakan...
              </div>
            </div>
          </div>
          <div className="shrink-0 w-[65%] md:min-w-0 md:flex-1 bg-white rounded-md border-b-2 border-primary-light">
            <Image
              src={"/assets/images/homepage/img-4.png"}
              width={320}
              height={200}
              alt="Hightlight 2"
              className="w-full"
            />
            <div className="px-2 pt-3 pb-8">
              <div className="text-disabled text-sm mb-3">31 Agu 2025</div>
              <div className="text-primary-light text-base md:text-xl font-medium mb-3 font-pathwa y-extreme">
                Diskusi dan Peluncuran Buku Pengelolaan Sampah “Kebersihan
                adalah Investasi...
              </div>
              <div className="text-secondary-light text-sm">
                Jakarta, 3 Juli 2022. Masih dalam rangka peringatan Hari
                Lingkungan Hidup Sedunia, InSWA mengadakan diskusi dan
                peluncuran...
              </div>
            </div>
          </div>
          <div className="shrink-0 w-[65%] md:min-w-0 md:flex-1 bg-white rounded-md border-b-2 border-primary-light">
            <Image
              src={"/assets/images/homepage/img-5.png"}
              width={320}
              height={200}
              alt="Hightlight 3"
              className="w-full"
            />
            <div className="px-2 pt-3 pb-8">
              <div className="text-disabled text-sm mb-3">31 Agu 2025</div>
              <div className="text-primary-light text-base md:text-xl font-medium mb-3 font-pathwa y-extreme">
                Seminar Evolusi Pengelolaan Sampah Dari Ekonomi Linear ke
                Sirkular. Pelajaran dari Negara...
              </div>
              <div className="text-secondary-light text-sm">
                Jakarta, 30 September 2022 - Sistem pengelolaan sampah merupakan
                sistem penyediaan layanan kebersihan yang berhak...
              </div>
            </div>
          </div>
        </div>
        <button className="mt-8 h-10 border border-secondary-light font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 md:hidden inline mx-auto">
          <div className="text-action-hover font-semibold">
            Lihat Lebih Banyak
          </div>
          <Image
            src="/assets/icons/arrow-right-green.svg"
            alt="Arrow right"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className="bg-gradient-to-b from-white bg-surface-success pb-24 md:pb-32 relative">
        <div className="bg-line absolute inset-0 bg-[500%] md:bg-contain"></div>
        <div className="md:flex gap-10 container mx-auto px-4 md:px-44 pt-10 md:pt-16 pb-20 relative">
          <div className="flex-none hidden md:inline">
            <Image
              src={"/assets/images/homepage/img-member.png"}
              width={400}
              height={331}
              alt="Member"
            />
          </div>
          <div className="flex-grow">
            <div className="mb-6 font-pathway-extreme text-[32px] font-medium">
              InSWA Resmi Bagian Dari ISWA
            </div>
            <div className="text-secondary-light mb-8 text-sm leading-6">
              Terhitung sejak Januari 2013, InSWA menjadi National Member of
              ISWA. ISWA adalah satu-satunya asosiasi internasional yang konsen
              pada sektor pengelolaan sampah berkelanjutan dan ramah lingkungan,
              mengoptimal dan meningkatkan efisiensi pengelolaan sampah di level
              global.
            </div>
            <div className="md:hidden block mb-6">
              <Image
                src={"/assets/images/homepage/img-member.png"}
                width={400}
                height={331}
                alt="Member"
              />
            </div>
            <div className="font-extrabold mb-4">Mitra Kami</div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  className="aspect-square border bg-white border-primary-light rounded-lg flex items-center px-2"
                  key={i}
                >
                  <Image
                    src={`/assets/images/homepage/img-member-${i + 1}.png`}
                    width={100}
                    height={100}
                    alt="Member"
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-tertiary-light">
        <div className="container px-4 md:px-16 mx-auto relative -mt-24 md:-mt-28">
          <div className="md:flex justify-between items-center py-12 px-10 md:px-28 bg-stay-updated rounded-tl-[96px] rounded-bl-lg rounded-br-[96px] rounded-tr-lg relative overflow-hidden">
            <div className="absolute bg-stay-updated-gradient inset-0"></div>
            <div className="flex-1 text-white relative">
              <div className="font-pathway-extreme text-[32px] font-bold mb-4">
                Stay Updated
              </div>
              <div className="text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent purus nunc, ornare eget mi non, feugiat rutrum odio.
                Mauris eros odio, aliquam ut nibh et, tempus dictum velit.
                Suspendisse at pretium ante.
              </div>
            </div>
            <div className="flex-1 text-center md:text-right relative mt-16 md:mt-0">
              <button className="h-10 px-8 text-base bg-green-gradient font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 float-right w-full md:w-auto">
                Selengkapnya
                <Image
                  src="/assets/icons/arrow-right.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-tertiary-light">
        <div className="container mx-auto px-4 md:px-44 pt-12 pb-5">
          <div className="md:flex justify-between items-start pb-5 mb-5 border-b border-tertiary-light">
            <div className="flex-1 mb-6 md:mb-0">
              <Image
                src="/assets/images/footer-logo.png"
                alt="Footer Logo"
                width={200}
                height={51}
              />
            </div>
            <div className="flex-1 text-[32px] md:text-5xl font-medium font-pathway-extreme md:text-right">
              halo@inswa.or.id
            </div>
          </div>
          <div className="md:flex border-b border-tertiary-light pb-5">
            <div className="flex-1 mb-6 md:mb-0">
              <div className="font-extrabold mb-4">Kontak</div>
              <div className="font-bold mb-2 text-sm">Kantor Sekretariat</div>
              <div className="text-sm">
                Gedung Plaza Mutiara, Lt 8. <br />
                Jl. Lingkar Mega Kuningan, Kuningan Timur,
                <br /> Kec. Setiabudi, Kota Jakarta Selatan, <br />
                DKI Jakarta 12950
              </div>
            </div>
            <div className="flex-1 md:flex">
              <div className="w-2/3 mb-6 md:mb-0">
                <div className="font-extrabold mb-4">InSWA</div>
                <div className="flex">
                  <div className="flex-1 space-y-3 text-sm">
                    <div>About Us</div>
                    <div>Our Work</div>
                    <div>News and Report</div>
                  </div>
                  <div className="flex-1 space-y-3 text-sm">
                    <div>News and Report</div>
                    <div>Membership</div>
                    <div>Media</div>
                  </div>
                </div>
              </div>
              <div className="w-1/3 md:text-right">
                <div className="font-extrabold mb-4">Social Media</div>
                <div className="flex md:justify-end gap-2">
                  <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center">
                    <Image
                      src="/assets/icons/footer-facebook.svg"
                      alt="Footer Facebook"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center">
                    <Image
                      src="/assets/icons/footer-youtube.svg"
                      alt="Footer Youtube"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center">
                    <Image
                      src="/assets/icons/footer-instagram.svg"
                      alt="Footer Instagram"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs font-medium text-center md:text-right mt-5 text-tertiary-light">
            Copyright © 2025 InSWA. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
