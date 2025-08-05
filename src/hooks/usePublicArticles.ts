import { useCallback, useEffect, useState } from "react";
import { ArticleType } from "@/types/article";

export function usePublicArticles(limit = 3) {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles?page=1&limit=${limit}`);
      const json = await res.json();
      setArticles(json.data || []);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLatestArticles();
  }, [fetchLatestArticles]);

  return { articles, loading };
}
