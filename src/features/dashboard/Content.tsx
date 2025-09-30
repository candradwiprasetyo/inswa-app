"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Contact from "../membership/Contact";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { usePublicPrograms } from "@/hooks/usePublicProgram";
import Link from "next/link";
import Image from "next/image";
import { usePublicPublications } from "@/hooks/usePublicPublication";
import { cdnLoader } from "@/lib/cdnLoader";

type User = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
  name: string;
  created_at: string;
};

export default function Content() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const { programs } = usePublicPrograms(10);
  const { publications, loading } = usePublicPublications(8, 2);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        console.log(data);
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  function formatYear(dateString?: string) {
    if (dateString) {
      const date = new Date(dateString);
      return date.getFullYear().toString();
    }
  }

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <>
      <Hero
        name={user?.name}
        background="about-us/hero.png"
        variant="green"
        subtitle={`Member semenjak ${formatYear(user?.created_at)}`}
      />

      <div className="mx-auto p-10 max-w-6xl relative">
        <div className="flex justify-between">
          <div className="font-medium text-[32px]">Baca Report Terkini</div>
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="h-10 w-16 border border-secondary-light hover:border-secondary-light-hover font-semibold flex items-center justify-center rounded-tr-[32px] rounded-bl-[32px] rounded-br rounded-tl text-primary-light"
            >
              <Image
                src="/assets/icons/arrow-left-green.svg"
                alt="Arrow left"
                width={24}
                height={24}
              />
            </button>
            <button
              onClick={scrollNext}
              className="h-10 w-16 border border-secondary-light hover:border-secondary-light-hover font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light"
            >
              <Image
                src="/assets/icons/arrow-right-green.svg"
                alt="Arrow right"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div className="overflow-hidden w-[100%] my-10" ref={emblaRef}>
          <div className="flex">
            {publications.map((publication, index) => (
              <div className="flex-[0_0_25%] pr-4" key={index}>
                <Link
                  href={`/publikasi/${publication.slug}`}
                  key={publication.id}
                >
                  <div className="relative w-[200px] aspect-[3/4] mx-auto">
                    <Image
                      loader={cdnLoader}
                      src={publication.cover_url}
                      alt={publication.title}
                      fill
                      className="border-2 border-tertiary-light object-cover rounded mx-auto"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <div className="font-light text-base">
                      {publication.title}
                    </div>
                    <div className="text-xs text-tertiary-light text-center mt-2">
                      {publication.publication_type_id !== 4 ? "PDF" : "WEB"}
                      {publication.size && <> | {publication.size} </>}
                      {publication.publication_date && (
                        <>
                          |
                          {publication.publication_date
                            ? publication.publication_date.split("-")[0]
                            : "-"}
                        </>
                      )}
                    </div>
                    <button className="mx-auto mt-6 h-8 border border-secondary-light hover:border-secondary-light-hover font-semibold items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 hidden md:flex">
                      <div className="text-action-hover font-semibold text-sm">
                        Baca Laporan
                      </div>
                      <Image
                        src="/assets/icons/arrow-right-green.svg"
                        alt="Arrow right"
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Contact />
    </>
  );
}
