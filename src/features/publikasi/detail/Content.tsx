"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  usePublicPublication,
  usePublicPublications,
} from "@/hooks/usePublicPublication";
import { cdnLoader } from "@/lib/cdnLoader";
import { getFullImageUrl } from "@/lib/image";
import ReactMarkdown from "react-markdown";

export default function PublicationDetailPage() {
  const { id } = useParams();
  const { publication, loading } = usePublicPublication(id as string);
  const { publications: otherPublications } = usePublicPublications(
    5,
    undefined,
    undefined,
    id as string
  );

  const [openPdf, setOpenPdf] = useState(false);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!publication) {
    return <div className="p-10 text-center">Publikasi tidak ditemukan</div>;
  }

  return (
    <div className="w-full relative">
      <div className="mx-auto max-w-6xl px-4 md:px-10 flex items-center pt-20 relative">
        <div className="md:flex justify-center md:justify-between items-center py-10 px-6 md:px-16 md:px-28 bg-profile rounded-tl-[96px] rounded-bl-lg rounded-br-[96px] rounded-tr-lg relative w-full gap-8 mt-20 md:mt-32">
          <div className="flex-none md:w-60 ">
            {publication.cover_url && (
              <Image
                loader={cdnLoader}
                src={publication.cover_url}
                alt={publication.title}
                width={240}
                height={320}
                className="w-[180px] md:w-[240px] h-[260px] md:h-[320px] object-cover -mt-20 md:-mt-40 md:absolute border-2 border-tertiary-light mx-auto md:mx-none"
              />
            )}
          </div>
          <div className="flex-grow text-center md:text-left mt-8 md:mt-0 ">
            <div className="text-2xl md:text-[32px] font-light md:font-medium font-pathway-extreme md:leading-normal">
              {publication.title}
            </div>
            <div className="flex gap-2 mt-5 justify-center md:justify-start">
              <Link href={""} target="_blank">
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/footer-facebook.svg"
                    alt="Footer Facebook"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
              <Link href={""} target="_blank">
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/footer-youtube.svg"
                    alt="Footer Youtube"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
              <Link href={""} target="_blank">
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

            {publication.file && publication.publication_type_id !== 4 && (
              <a
                href={getFullImageUrl(publication.file)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mt-5 bg-action px-4 py-2 text-white rounded-lg shadow hover:bg-action-hover transition inline-block">
                  Open PDF
                </div>
              </a>
            )}
            {publication.file && publication.publication_type_id === 4 && (
              <a
                href={publication.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mt-5 bg-action px-4 py-2 text-white rounded-lg shadow hover:bg-action-hover transition inline-block">
                  Lihat Peraturan
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {openPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-[90%] h-[90%] bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setOpenPdf(false)}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              ✕
            </button>
            <iframe
              src={getFullImageUrl(publication.file)}
              className="w-full h-full"
              title="PDF Viewer"
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 md:px-10 relative py-10 md:py-16 md:flex gap-10 md:mt-10">
        <div className="md:w-2/3 text-secondary-light leading-7">
          {publication.publication_type_id === 1 && (
            <>
              <div className="font-medium text-xl flex w-fit gap-3 items-center mb-6 border-b-2 border-action-hover pb-3">
                <Image
                  src="/assets/icons/point-leaf.svg"
                  alt="Point Leaf"
                  width={22}
                  height={22}
                />
                Sinopsis
              </div>
              <div className="mb-8 md:mb-8 leading-7">
                <ReactMarkdown>{publication.description}</ReactMarkdown>
              </div>

              {/* Tabel detail */}
              <div className="mb-8 md:mb-12">
                <div className="overflow-hidden rounded-lg border text-sm md:text-base">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td
                          className="font-semibold bg-table-program py-2 px-3"
                          width="30%"
                        >
                          Penerbit
                        </td>
                        <td className="px-3 border-l text-tertiary-light">
                          {publication.publisher}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="font-semibold bg-table-program py-2 px-3">
                          Penulis
                        </td>
                        <td className="px-3 border-l text-tertiary-light">
                          {publication.author}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="font-semibold bg-table-program py-2 px-3">
                          Sambutan
                        </td>
                        <td className="px-3 border-l text-tertiary-light">
                          {publication.foreword}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="font-semibold bg-table-program py-2 px-3">
                          Cetakan
                        </td>
                        <td className="px-3 border-l text-tertiary-light">
                          {publication.edition}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="font-semibold bg-table-program py-2 px-3">
                          ISBN
                        </td>
                        <td className="px-3 border-l text-tertiary-light">
                          {publication.isbn}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="font-semibold bg-table-program py-2 px-3">
                          Halaman
                        </td>
                        <td className="px-3 border-l text-tertiary-light">
                          {publication.pages}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="font-semibold bg-table-program py-2 px-3">
                          Ukuran
                        </td>
                        <td className="px-3 border-l text-tertiary-light">
                          {publication.dimension}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Publikasi Lainnya */}
        <div className="md:w-1/3">
          <div className="text-2xl font-medium">Publikasi Lainnya</div>
          <div className="mt-6">
            {otherPublications.map((p) => (
              <Link
                href={`/publikasi/${p.id}`}
                key={p.id}
                className="block border-t-2 border-primary-light-border py-4"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex-none">
                    {p.cover_url && (
                      <Image
                        loader={cdnLoader}
                        src={p.cover_url}
                        alt={p.title}
                        width={107}
                        height={80}
                        className="w-20 h-28 object-cover border border-tertiary-light"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg md:text-xl font-light mb-2">
                      {p.title}
                    </div>
                    <div className="text-xs text-tertiary-light">
                      PDF | {p.size} | {p.year}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
