import Image from "next/image";

import { NewsType } from "@/types/news";
import Link from "next/link";

export default function NewsCard({
  title,
  description,
  date,
  images,
  slug,
}: NewsType) {
  return (
    <div className="group shrink-0 w-[65%] md:min-w-0 md:w-full md:flex-1 bg-white border-b-2 border-primary-light hover:border-action-hover transition-all duration-300 cursor-pointer">
      <Link href={`/media/${slug}`}>
        <Image
          src={`${images}`}
          width={320}
          height={200}
          alt={title}
          className="w-full border-2 border-transparent group-hover:border-action-hover transition-all duration-300 rounded-md rounded-tl-[80px] rounded-br-[80px] rounded-tr-lg rounded-bl-lg"
        />
        <div className="px-2 pt-3 pb-8">
          <div className="text-disabled text-sm mb-3">{date}</div>
          <div className="text-primary-light group-hover:text-action-hover text-base md:text-lg xl:text-xl font-medium mb-3 font-pathway-extreme transition-colors duration-300 line-clamp-3">
            {title}
          </div>
          <div className="text-secondary-light text-sm line-clamp-3">
            {description}
          </div>
        </div>
      </Link>
    </div>
  );
}
