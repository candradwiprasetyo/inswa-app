import { useEffect, useState } from "react";
import { ArticleType } from "@/types/article";
import Cookies from "js-cookie";
import { decodeToken } from "@/lib/jwt";

export function useArticle() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  const fetchArticles = async () => {
    const res = await fetch("/api/articles");
    const data = await res.json();
    setArticles(data);
    setLoading(false);
  };

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
  }, []);

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
  };
}
