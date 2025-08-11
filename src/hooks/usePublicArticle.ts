import { useEffect, useState, useCallback } from "react";
import { ArticleType } from "@/types/article";

export function usePublicArticle(slug?: string) {
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        if (slug) {
          const res = await fetch(`/api/articles?slug=${slug}`);
          if (!res.ok) throw new Error("Gagal mengambil detail media");
          const json = await res.json();
          setArticle(json.data || []);
        }
      } catch (error) {
        console.error("Error fetching detail article:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchArticle();
  }, [slug]);

  return { article, loading };
}

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
