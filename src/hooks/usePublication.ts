import { useEffect, useState, useCallback } from "react";
import { PublicationType } from "@/types/publication";

export function usePublication() {
  const [publications, setPublications] = useState<PublicationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPublications = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/publications?page=${page}&limit=${limit}&context=admin`
      );
      const json = await res.json();
      setPublications(json.data);
      setTotalPages(json.totalPages);
      setCurrentPage(json.page);
    } catch (error) {
      console.error("Failed to fetch publications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPublication = async (
    publication: Omit<PublicationType, "id" | "created_at" | "updated_at">
  ) => {
    const payload = {
      ...publication,
      links: JSON.stringify(publication.links ?? []),
    };

    const res = await fetch("/api/publications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  };

  const updatePublication = async (
    id: number,
    publication: Partial<PublicationType>
  ) => {
    const payload = {
      ...publication,
      ...(publication.links !== undefined && {
        links: JSON.stringify(publication.links),
      }),
    };

    const res = await fetch(`/api/publications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  };

  const deletePublication = async (id: number) => {
    await fetch(`/api/publications/${id}`, { method: "DELETE" });
  };

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  return {
    publications,
    loading,
    fetchPublications,
    createPublication,
    updatePublication,
    deletePublication,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
