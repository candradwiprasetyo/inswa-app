import Image from "next/image";
import Link from "next/link";
import { usePublicArticle, usePublicArticles } from "@/hooks/usePublicArticle";
import { useParams } from "next/navigation";
import Loader from "./Loader";

export default function Content() {
  const params = useParams();
  const slug = params.slug as string;

  const { articles } = usePublicArticles(12);
  const { article, loading } = usePublicArticle(slug);

  if (loading) return <Loader />;

  if (!article) return <div>Media tidak ditemukan</div>;

  return (
    <div className="w-full relative">
      <div className="container mx-auto px-4 md:px-44 relative py-10 md:py-32 flex gap-10 mt-10">
        <div className="w-2/3 ">
          <div className="text-[40px] font-medium font-pathway-extreme mb-5">
            {article.title}
          </div>
          <div className="flex text-tertiary-light text-sm gap-3 mb-5">
            <div className="flex gap-2">
              <Image
                src="/assets/icons/calendar.svg"
                alt="Calendar"
                width={20}
                height={20}
              />
              31 Agustus 2022
            </div>
            |
            <div className="flex gap-2">
              <Image
                src="/assets/icons/user.svg"
                alt="Calendar"
                width={20}
                height={20}
              />
              Dini Trisyanti
            </div>
          </div>
          <div className="mb-8">
            <Image
              src={article.images}
              alt={article.title}
              width={500}
              height={300}
              className="w-full rounded-lg"
            />
          </div>
          <div className="mb-8 md:mb-8 leading-7 text-secondary-light">
            {article.content}
          </div>
        </div>
        <div className="w-1/3">
          <div className="text-2xl font-medium">Artikel Lainnya</div>
          <div className="mt-6">
            {articles.map((data, index) => (
              <Link href={`/media/${data.slug}`} key={index}>
                <div className="border-t-2 border-primary-light-border py-4 flex gap-4">
                  <div className="flex-none">
                    <Image
                      src={data.images}
                      alt="Media 1"
                      width={107}
                      height={80}
                      className="w-20 h-16 object-cover border border-tertiary-light rounded-tl-[16px] rounded-tr rounded-br-[16px] rounded-bl"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-medium mb-2 text-secondary-light">
                      {data.title}
                    </div>
                    <div className="text-xs text-tertiary-light">
                      {new Date(data.created_at!).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
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
