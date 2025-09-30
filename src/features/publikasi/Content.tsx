"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Label from "@/components/Label";
import { usePublicPublications } from "@/hooks/usePublicPublication";
import { publicationTypeMap } from "@/lib/publicationTypeMap";
import { cdnLoader } from "@/lib/cdnLoader";
import RuleContent from "./RuleContent";
import clsx from "clsx";

export default function Content() {
  const [activeType, setActiveType] = useState<string>("all");
  const { publications, loading, fetchedOnce, setCurrentPage, hasMore } =
    usePublicPublications(6, activeType);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(loaderRef.current);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [hasMore, loading, setCurrentPage]);

  return (
    <div className="w-full relative">
      <div className="mx-auto max-w-6xl px-4 md:px-10 relative md:flex gap-5 items-strech">
        {/* Sidebar filter desktop */}
        <div className="md:w-1/3 py-5 hidden md:block">
          <div
            className="border rounded-lg w-full sticky top-24"
            id="tab-sticky"
          >
            <div
              onClick={() => setActiveType("all")}
              className={`w-full p-3 font-semibold border-b cursor-pointer ${
                activeType === "all"
                  ? "bg-table-green text-action"
                  : "hover:bg-surface-secondary-light"
              }`}
            >
              Semua
            </div>
            {Object.entries(publicationTypeMap).map(([id, name], idx, arr) => (
              <div
                key={id}
                onClick={() => setActiveType(id)}
                className={`w-full p-3 font-semibold ${
                  idx !== arr.length - 1 ? "border-b" : ""
                } cursor-pointer ${
                  activeType === id
                    ? "bg-table-green text-action"
                    : "hover:bg-surface-secondary-light"
                }`}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 flex-nowrap md:hidden mt-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {Object.entries(publicationTypeMap).map(([id, name]) => (
            <Label
              key={id}
              title={name}
              active={activeType === id}
              onClick={() => setActiveType(id)}
            />
          ))}
        </div>

        <div
          className={clsx(
            "md:w-2/3 md:border-l",
            activeType !== "4" && "md:pl-5"
          )}
        >
          {activeType !== "4" ? (
            <>
              {!fetchedOnce && loading ? (
                <div className="p-5 text-center text-gray-500">Loading...</div>
              ) : fetchedOnce && publications.length === 0 ? (
                <div className="p-5 text-center text-gray-500">
                  Tidak ada publikasi
                </div>
              ) : (
                publications.map((p) => (
                  <Link href={`/publikasi/${p.slug}`} key={p.id}>
                    <div className="py-5 flex items-center border-b">
                      <div className="flex flex-grow items-center">
                        <div className="flex-none">
                          <div className="relative w-[120px] aspect-[3/4]">
                            <Image
                              loader={cdnLoader}
                              src={p.cover_url}
                              alt={p.title}
                              fill
                              className="border-2 border-tertiary-light object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-grow px-6">
                          <div className="text-action-hover mb-1">
                            {publicationTypeMap[p.publication_type_id] ?? ""}
                          </div>
                          <div className="text-lg mb-2 line-clamp-2">
                            {p.title}
                          </div>
                          <div className="text-xs text-tertiary-light">
                            {p.publication_type_id !== 4 ? "PDF" : "WEB"}
                            {p.size && <> | {p.size} </>}
                            {p.publication_date && (
                              <>
                                |
                                {p.publication_date
                                  ? p.publication_date.split("-")[0]
                                  : "-"}
                              </>
                            )}
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
                ))
              )}

              <div
                ref={loaderRef}
                className="h-10 flex items-center justify-center"
              >
                {loading && publications.length > 0 && (
                  <span className="text-gray-500">Loading...</span>
                )}
              </div>
            </>
          ) : (
            <RuleContent />
          )}
        </div>
      </div>
    </div>
  );
}
