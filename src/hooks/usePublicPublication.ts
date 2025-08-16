import { useEffect, useState, useCallback } from "react";
import { PublicationType } from "@/types/publication";

export function usePublicPublication(id?: string) {
  const [publication, setPublication] = useState<PublicationType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await fetch(`/api/publications?id=${id}`);
          if (!res.ok) throw new Error("Gagal mengambil detail publikasi");
          const json = await res.json();
          setPublication(json.data || null);
        }
      } catch (error) {
        console.error("Error fetching detail publication:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPublication();
  }, [id]);

  return { publication, loading };
}

export function usePublicPublications(
  limit = 6,
  type?: string,
  search?: string,
  excludeId?: string
) {
  const [publications, setPublications] = useState<PublicationType[]>([]);
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

  const fetchPublications = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });
      if (type && type !== "all") params.append("type", type);
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (excludeId) params.append("excludeId", excludeId);

      const res = await fetch(`/api/publications?${params.toString()}`);
      if (!res.ok) throw new Error("Gagal mengambil daftar publikasi");

      const json = await res.json();
      setPublications(json.data || []);
      setTotal(json.total || 0);
    } catch (error) {
      console.error("Failed to fetch publications:", error);
    } finally {
      setLoading(false);
    }
  }, [limit, type, currentPage, debouncedSearch, excludeId]);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  return { publications, loading, total, currentPage, limit, setCurrentPage };
}
