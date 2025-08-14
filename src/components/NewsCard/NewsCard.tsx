import Image from "next/image";
import clsx from "clsx";
import { NewsType } from "@/types/news";
import Link from "next/link";
import { cdnLoader } from "@/lib/cdnLoader";

export default function NewsCard({
  title,
  description,
  date,
  images,
  slug,
  scrollabel = true,
}: NewsType) {
  return (
    <div
      className={clsx(
        "group shrink-0  md:min-w-0 md:w-full md:flex-1 bg-white border-b-2 border-primary-light hover:border-action-hover transition-all duration-300 cursor-pointer",
        scrollabel ? "w-[65%]" : "w-full"
      )}
    >
      <Link href={`/media/${slug}`}>
        <div className="w-full relative aspect-[4/3] overflow-hidden rounded-md rounded-tl-[38px] md:rounded-tl-[80px] rounded-br-[38px] md:rounded-br-[80px] rounded-tr-lg rounded-bl-lg border-2 border-transparent group-hover:border-action-hover transition-all duration-300">
          <Image
            loader={cdnLoader}
            src={images}
            alt={title}
            fill
            className="object-cover w-full h-full"
          />
        </div>
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
