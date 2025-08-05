import Label from "@/components/Label/Label";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";
import { usePublicArticles } from "@/hooks/usePublicArticles";

export default function Content() {
  const { articles, loading } = usePublicArticles(12);

  return (
    <div className="w-full relative">
      <div className="container mx-auto px-6 md:px-44 flex items-center pt-20 relative h-64">
        <div className="absolute text-4xl md:text-[48px] font-medium font-pathway-extreme bottom-5 leading-snug md:leading-normal">
          Media
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-44 relative">
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
          ></input>
        </div>
        <div className="mb-5 w-full flex items-center">
          <div className="flex-1 text-tertiary-light font-medium text-sm">
            Showing 1 - 10 of 678 results
          </div>
          <div className="flex-1 flex justify-end gap-3">
            <Label title="All" active={true} />
            <Label title="Article" />
            <Label title="Video" />
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 md:mt-10 md:px-0 scrollbar-hide gap-x-10 gap-y-16 mb-16">
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
