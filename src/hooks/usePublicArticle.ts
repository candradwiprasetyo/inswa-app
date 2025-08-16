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
          setArticle(json.data || null);
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

export function usePublicArticles(
  limit = 3,
  type?: string,
  search?: string,
  excludeSlug?: string
) {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const fetchLatestArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });
      if (type && type !== "all") params.append("type", type);
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (excludeSlug) params.append("excludeSlug", excludeSlug);

      const res = await fetch(`/api/articles?${params.toString()}`);
      const json = await res.json();
      setArticles(json.data || []);
      setTotal(json.total || 0);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  }, [limit, type, currentPage, debouncedSearch, excludeSlug]);

  useEffect(() => {
    fetchLatestArticles();
  }, [fetchLatestArticles]);

  return { articles, loading, total, currentPage, limit, setCurrentPage };
}
