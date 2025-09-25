"use client";

import Image from "next/image";
import Link from "next/link";
import { cdnLoader } from "@/lib/cdnLoader";
import { usePublicPublicationRules } from "@/hooks/usePublicPublication";

export default function RuleContentDetail({ ruleType }: { ruleType: string }) {
  const { publications } = usePublicPublicationRules(ruleType);

  return (
    <>
      {publications.map((p) => (
        <Link href={`/publikasi/${p.slug}`} key={p.id}>
          <div className="p-5 flex items-center border-b">
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
                <div className="text-lg mb-2 line-clamp-2">{p.title}</div>
                <div className="text-xs text-tertiary-light">
                  {p.publication_type_id !== 4 ? "PDF" : "WEB"}
                  {p.size && <> | {p.size} </>}
                  {p.publication_date && (
                    <>
                      {" "}
                      |{" "}
                      {p.publication_date
                        ? p.publication_date.split("-")[0]
                        : "-"}{" "}
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
      ))}
    </>
  );
}
