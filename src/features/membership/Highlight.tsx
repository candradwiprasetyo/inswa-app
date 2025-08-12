"use client";

import Image from "next/image";
import NewsCard from "@/components/NewsCard";
import { usePublicArticles } from "@/hooks/usePublicArticle";

export default function Highlight() {
  const { articles, loading } = usePublicArticles(3);

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-10 py-10 md:py-20">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex gap-8 overflow-x-auto md:overflow-none md:flex-nowrap flex-nowrap md:mt-10 md:px-0 scrollbar-hide">
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
            />
          ))}
        </div>
      )}
      <button className="mt-8 h-10 border border-secondary-light font-semibold flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 md:hidden inline mx-auto">
        <div className="text-action-hover font-semibold">
          Lihat Lebih Banyak
        </div>
        <Image
          src="/assets/icons/arrow-right-green.svg"
          alt="Arrow right"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
