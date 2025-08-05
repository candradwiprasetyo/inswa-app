"use client";

import Image from "next/image";
import NewsCard from "@/components/NewsCard";
import { usePublicArticles } from "@/hooks/usePublicArticles";

export default function Highlight() {
  const { articles, loading } = usePublicArticles(3);

  return (
    <div className="container mx-auto px-4 md:px-44 py-10 md:py-20">
      <div className="flex justify-between">
        <div className="mb-6 font-pathway-extreme text-[32px] md:text-[40px]">
          Highlight
        </div>
        <button className="h-10 border border-secondary-light hover:border-secondary-light-hover font-semibold items-center justify-center rounded-tl-[32px] rounded-br-[32px] rounded-bl rounded-tr text-primary-light flex gap-2 px-6 hidden md:flex">
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
