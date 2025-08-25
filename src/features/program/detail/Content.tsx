import Image from "next/image";
import { usePublicProgram, usePublicPrograms } from "@/hooks/usePublicProgram";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePublicActivities } from "@/hooks/usePublicActivity";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Hero from "@/components/Hero";
import { getFullImageUrl } from "@/lib/image";

export default function Content() {
  const params = useParams();
  const id = params.id as string;

  const { programs } = usePublicPrograms(3);
  const { program } = usePublicProgram(id);
  const { activities } = usePublicActivities(id);

  return (
    <>
      <Hero
        title={program?.name || ""}
        background={getFullImageUrl(program?.image || "")}
        detailPage
      />
      <div className="mx-auto max-w-6xl px-4 md:px-10 relative py-10 md:py-16 md:flex gap-10">
        <div className="md:w-2/3 text-secondary-light leading-7">
          {program?.description && (
            <div className="mb-8 md:mb-12">{program?.description}</div>
          )}
          {activities.map((activity, index) => (
            <>
              <div className="md:flex justify-between items-center py-6 px-8 md:px-8 bg-stay-updated rounded-tl-[40px] rounded-bl-lg rounded-br-[40px] rounded-tr-lg relative overflow-hidden mb-6">
                <div className="absolute bg-stay-updated-gradient inset-0"></div>
                <div className="flex-1 text-white relative">
                  <div className="font-pathway-extreme text-lg font-bold">
                    {index + 1}. {activity.name}
                  </div>
                </div>
              </div>
              <div className="mb-8 md:mb-12">
                <p>{activity.content}</p>
              </div>
              <div className="mb-8 md:mb-12">
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td
                          className="font-semibold bg-table-program py-2 px-3"
                          width="30%"
                        >
                          Tahun
                        </td>
                        <td className="px-3 border-l">{activity.year}</td>
                      </tr>
                      <tr className="border-t">
                        <td className="font-semibold bg-table-program py-2 px-3">
                          Lokasi
                        </td>
                        <td className="px-3 border-l">{activity.location}</td>
                      </tr>
                      <tr className="border-t">
                        <td
                          className="font-semibold bg-table-program py-2 px-3"
                          valign="top"
                        >
                          Pihak yang terlibat
                        </td>
                        <td className="px-3 border-l py-2">
                          <MarkdownRenderer content={activity.pic ?? ""} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="md:w-1/3">
          <div className="text-2xl font-medium">Program Lainnya</div>
          <div className="mt-6">
            {programs.map((data, index) => (
              <Link href={`/program/${data.id}`} key={index}>
                <div className="border-t-2 border-primary-light-border py-4">
                  <div className="text-tertiary-light text-sm mb-2">
                    Program
                  </div>
                  <div className="text-secondary-light text-base font-semibold">
                    {data.name}
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/program">
              <button className="h-7 border border-secondary-light hover:border-secondary-light-hover font-semibold items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 hidden md:flex text-xs mt-4 float-right">
                <div className="text-action-hover font-semibold">
                  Lihat Semua
                </div>
                <Image
                  src="/assets/icons/arrow-right-green.svg"
                  alt="Arrow right"
                  width={20}
                  height={20}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
