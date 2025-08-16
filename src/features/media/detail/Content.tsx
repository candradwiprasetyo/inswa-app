import Image from "next/image";
import Link from "next/link";
import { usePublicArticle, usePublicArticles } from "@/hooks/usePublicArticle";
import { useParams } from "next/navigation";
import Loader from "./Loader";
import { cdnLoader } from "@/lib/cdnLoader";

export default function Content() {
  const params = useParams();
  const slug = params.slug as string;

  const { articles } = usePublicArticles(12, undefined, undefined, slug);
  const { article, loading } = usePublicArticle(slug);

  if (loading) return <Loader />;

  if (!article) return <div>Media tidak ditemukan</div>;

  return (
    <div className="w-full relative">
      <div className="mx-auto max-w-6xl px-4 md:px-10 relative py-10 md:py-32 md:flex gap-10 mt-10">
        <div className="md:w-2/3 ">
          <div className="text-[24px] md:text-[32px] font-medium font-pathway-extreme mb-4 md:mb-5 mb:leading-normal">
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
              {new Date(article.created_at!).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            |
            <div className="flex gap-2">
              <Image
                src="/assets/icons/user.svg"
                alt="Calendar"
                width={20}
                height={20}
              />
              {article.author_name}
            </div>
          </div>
          <div className="mb-8">
            {article.video_url ? (
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={article.video_url}
                  title={article.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="relative w-full aspect-[5/3]">
                <Image
                  loader={cdnLoader}
                  src={article.images}
                  alt={article.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="mb-8 md:mb-8 leading-7 text-secondary-light">
            {article.content}
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="text-2xl font-medium">Artikel Lainnya</div>
          <div className="mt-6">
            {articles.map((data, index) => (
              <Link href={`/media/${data.slug}`} key={index}>
                <div className="border-t-2 border-primary-light-border py-4 flex gap-4">
                  <div className="flex-none">
                    <Image
                      loader={cdnLoader}
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
