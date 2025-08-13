import { getFullImageUrl } from "./image";

export const cdnLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const url = getFullImageUrl(src);
  const params = new URLSearchParams();
  params.set("w", width.toString());
  if (quality) params.set("q", (quality ?? 75).toString());
  return `${url}?${params.toString()}`;
};
