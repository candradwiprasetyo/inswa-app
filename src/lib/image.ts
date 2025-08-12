export function getFullImageUrl(key: string) {
  if (!key) return "";

  const endpoint = "https://cdn.inswa.or.id";
  const bucket = "inswa";
  const cleanedKey = key.replace(/^\/+/, "");

  if (!endpoint || !bucket) {
    console.warn(
      "NEXT_PUBLIC_MINIO_ENDPOINT or NEXT_PUBLIC_MINIO_BUCKET env is missing"
    );
    return cleanedKey;
  }

  return `${endpoint}/${bucket}/${cleanedKey}`;
}
