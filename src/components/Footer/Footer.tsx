"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="bg-tertiary-light">
        <div className="mx-auto max-w-6xl px-4 md:px-10 pt-12 pb-5">
          <div className="md:flex justify-between items-start pb-5 mb-5 border-b border-tertiary-light items-center">
            <div className="flex-1 mb-6 md:mb-0">
              <Image
                src="/assets/images/footer-logo.png"
                alt="Footer Logo"
                width={112}
                height={120}
              />
            </div>
            <div className="flex-1 text-[32px] md:text-4xl font-medium font-pathway-extreme md:text-right">
              sekretariat@inswa.or.id
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
                    <div>
                      <Link href="/tentang-kami">Tentang Kami</Link>
                    </div>
                    <div>
                      <Link href="/program">Program</Link>
                    </div>
                    <div>
                      <Link href="/publikasi">Publikasi</Link>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 text-sm">
                    <div>
                      <Link href="/membership">Membership</Link>
                    </div>
                    <div>
                      <Link href="/media">Media</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/3 md:text-right">
                <div className="font-extrabold mb-4">Social Media</div>
                <div className="flex md:justify-end gap-2">
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
          <div className="text-xs font-medium text-center md:text-right mt-5 text-tertiary-light">
            Copyright © 2025 InSWA. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
