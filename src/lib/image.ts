export function getFullImageUrl(key: string) {
  if (!key) return "";

  const endpoint = (process.env.NEXT_PUBLIC_MINIO_ENDPOINT || "").replace(
    /\/+$/,
    ""
  );
  const bucket = (process.env.NEXT_PUBLIC_MINIO_BUCKET || "").replace(
    /^\/+|\/+$/g,
    ""
  );
  const cleanedKey = key.replace(/^\/+/, "");

  if (!endpoint || !bucket) {
    console.warn(
      "NEXT_PUBLIC_MINIO_ENDPOINT or NEXT_PUBLIC_MINIO_BUCKET env is missing"
    );
    return cleanedKey;
  }

  return `${endpoint}/${bucket}/${cleanedKey}`;
}
