import { useEffect, useState, useCallback } from "react";
import { ArticleType } from "@/types/article";
import Cookies from "js-cookie";
import { decodeToken } from "@/lib/jwt";

export function useArticle() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArticles = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles?page=${page}&limit=${limit}`);
      const json = await res.json();
      setArticles(json.data);
      setTotalPages(json.totalPages);
      setCurrentPage(json.page);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createArticle = async (
    article: Omit<ArticleType, "id" | "created_at" | "updated_at" | "author_id">
  ) => {
    if (!authorId) throw new Error("Author ID not available");

    const articleWithAuthor = {
      ...article,
      author_id: authorId,
    };

    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(articleWithAuthor),
    });

    return res.json();
  };

  const updateArticle = async (id: number, article: Partial<ArticleType>) => {
    const res = await fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    return res.json();
  };

  const deleteArticle = async (id: number) => {
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
  };

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    const token = Cookies.get("token");
    const decoded = token ? decodeToken(token) : null;
    setAuthorId(decoded?.id ?? null);
    setIsReady(true);
  }, []);

  return {
    articles,
    loading,
    isReady,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
