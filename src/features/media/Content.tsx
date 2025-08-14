import { useState } from "react";
import Label from "@/components/Label/Label";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";
import { usePublicArticles } from "@/hooks/usePublicArticle";

export default function Content() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { articles, loading, total, currentPage, limit } = usePublicArticles(
    12,
    typeFilter !== "all" ? typeFilter : undefined,
    searchTerm
  );

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  return (
    <div className="w-full relative">
      <div className="mx-auto max-w-6xl px-4 md:px-10 flex items-center pt-20 relative h-64">
        <div className="absolute text-4xl md:text-[48px] font-medium font-pathway-extreme bottom-5 leading-snug md:leading-normal">
          Media
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-10 relative">
        <div className="mb-5 w-full relative">
          <div className="absolute w-5 h-5 left-4 top-4">
            <Image
              src="/assets/icons/search.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border border-primary-light rounded-xl py-3 px-4 w-full pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-5 w-full md:flex items-center">
          <div className="flex-1 text-tertiary-light font-medium text-sm mb-4 md:mb-0">
            {loading
              ? "Loading..."
              : `Showing ${start} - ${end} of ${total} results`}
          </div>
          <div className="flex-1 flex md:justify-end gap-3">
            <Label
              title="All"
              active={typeFilter === "all"}
              customClass="flex-1 md:flex-none"
              onClick={() => setTypeFilter("all")}
            />
            <Label
              title="Article"
              active={typeFilter === "article"}
              customClass="flex-1 md:flex-none"
              onClick={() => setTypeFilter("article")}
            />
            <Label
              title="Video"
              active={typeFilter === "video"}
              customClass="flex-1 md:flex-none"
              onClick={() => setTypeFilter("video")}
            />
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 md:mt-10 md:px-0 scrollbar-hide gap-x-4 md:gap-x-10 gap-y-4 md:gap-y-16 mb-16">
            {articles.map((news, index) => (
              <NewsCard
                key={index}
                title={news.title}
                description={news.content}
                images={news.images}
                date={new Date(news.created_at!).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                slug={news.slug}
                scrollabel={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
