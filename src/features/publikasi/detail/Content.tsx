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
import { formatPublicationDate } from "@/lib/dateUtils";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";
import { publicationTypeMap } from "@/lib/publicationTypeMap";

export default function PublicationDetailPage() {
  const { slug } = useParams();
  const { publication, loading } = usePublicPublication(slug as string);
  const { publications: otherPublications } = usePublicPublications(
    5,
    undefined,
    undefined,
    slug as string
  );

  const [openPdf, setOpenPdf] = useState(false);
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const baseUrl = process.env.BASE_URL;
  const currentUrl = `${baseUrl}${pathname}`;

  const copyUrl = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Gagal menyalin:", err);
      alert("Gagal menyalin link, silakan coba manual.");
    }
  };

  const handleWhatsappShare = () => {
    if (!publication) return;

    const text = `${publication.title} - ${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleXShare = () => {
    if (!publication) return;

    const text = publication.title;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(currentUrl)}`;

    window.open(xUrl, "_blank");
  };

  const handleLinkedinShare = () => {
    if (!publication) return;

    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;

    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!publication) {
    return <div className="p-10 text-center">Publikasi tidak ditemukan</div>;
  }

  return (
    <div className="w-full relative">
      <div className="mx-auto max-w-6xl px-4 md:px-10 flex items-center pt-20 relative">
        <div className="md:flex justify-center md:justify-between items-center py-8 px-6 md:px-16 md:px-28 bg-profile rounded-tl-[96px] rounded-bl-lg rounded-br-[96px] rounded-tr-lg relative w-full gap-3 mt-8 md:mt-8">
          <div className="flex-none md:w-60 min-h-[280px] h-full">
            {publication.cover_url && (
              <Image
                loader={cdnLoader}
                src={publication.cover_url}
                alt={publication.title}
                width={200}
                height={260}
                className="w-[180px] md:w-[200px] h-[280px] md:h-[280px] object-cover border-2 border-tertiary-light mx-auto md:mx-none md:absolute top-8"
              />
            )}
          </div>
          <div className="flex-grow text-center md:text-left mt-8 md:mt-0 ">
            <div className="text-2xl md:text-[32px] font-light md:font-medium font-pathway-extreme md:leading-10">
              {publication.title}
            </div>
            <div className="font-bold mt-6">Bagikan:</div>
            <div className="flex gap-2 mt-2 justify-center md:justify-start">
              <button onClick={copyUrl}>
                {copied ? (
                  <div className="h-8 rounded-full bg-blue-300 flex items-center justify-center cursor-pointer text-white text-xs px-3">
                    Copied!
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                    <Image
                      src="/assets/icons/copy.png"
                      alt="Copy"
                      width={16}
                      height={16}
                    />
                  </div>
                )}
              </button>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`}
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
              <button onClick={handleWhatsappShare}>
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/whatsapp.png"
                    alt="Whatsapp"
                    width={16}
                    height={16}
                  />
                </div>
              </button>
              <button onClick={handleXShare}>
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/x.png"
                    alt="Whatsapp"
                    width={16}
                    height={16}
                  />
                </div>
              </button>
              <button onClick={handleLinkedinShare}>
                <div className="h-8 w-8 rounded-full bg-surface-green flex items-center justify-center cursor-pointer">
                  <Image
                    src="/assets/icons/linkedin.webp"
                    alt="Linkedin"
                    width={16}
                    height={16}
                  />
                </div>
              </button>
            </div>

            <div className="flex gap-3 mt-5 flex-wrap justify-center md:justify-start">
              {publication.file &&
                publication.publication_type_id !== 4 &&
                (!user ? (
                  <div>
                    <Button
                      title="Daftar Member"
                      customClass="h-8 text-sm w-48 mx-auto md:mx-0"
                      href="/daftar"
                    />
                  </div>
                ) : (
                  <a
                    href={getFullImageUrl(publication.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="h-8 px-8 text-base font-semibold flex w-40 items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr gap-2 bg-green-gradient mx-auto md:mx-0">
                      Open PDF
                    </div>
                  </a>
                ))}

              {Array.isArray(publication.links) &&
                publication.links.length > 0 &&
                publication.links.map((link: string, index: number) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 px-6 text-sm font-semibold flex w-fit items-center justify-center 
                    rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr 
                    gap-2 bg-green-gradient"
                  >
                    Download {index + 1}
                  </a>
                ))}
            </div>

            {publication.file && publication.publication_type_id === 4 && (
              <a
                href={publication.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mt-5 h-8 px-8 text-base font-semibold flex w-52 items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr gap-2 bg-green-gradient mx-auto md:mx-0">
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
        {publication.publication_type_id === 1 && (
          <div className="md:w-2/3 text-secondary-light leading-7">
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
                          Tanggal Penerbitan
                        </td>
                        <td className="px-3 border-l text-tertiary-light">
                          {formatPublicationDate(publication.publication_date)}
                        </td>
                      </tr>
                      <tr className="border-t">
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
          </div>
        )}
        {/* Publikasi Lainnya */}
        <div
          className={publication.publication_type_id === 1 ? "md:w-1/3" : ""}
        >
          <div className="text-xl font-medium">Publikasi Lainnya</div>
          <div
            className={`mt-6 border-t-2 border-primary-light-border py-4 gap-x-10
                  ${
                    publication.publication_type_id === 1
                      ? "grid grid-cols-1"
                      : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  }`}
          >
            {otherPublications.map((p) => (
              <Link
                key={p.id}
                href={`/publikasi/${p.slug}`}
                className="block border-primary-light-border py-4 border-b"
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-none">
                    {p.cover_url && (
                      <Image
                        loader={cdnLoader}
                        src={p.cover_url}
                        alt={p.title}
                        width={107}
                        height={80}
                        className="w-20 h-28 object-cover border border-tertiary-light mt-2"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="text-action-hover mb-1">
                      {publicationTypeMap[p.publication_type_id] ?? ""}
                    </div>
                    <div className="font-semibold text-base font mb-2 line-clamp-5">
                      {p.title}
                    </div>
                    <div className="text-xs text-tertiary-light">
                      {p.publication_type_id !== 4 && "PDF"}
                      {p.size && <> | {p.size} </>}
                      {p.year && <> | {p.year} </>}
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
