import { useEffect, useState, useCallback, useRef } from "react";
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
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>(
    search
  );
  const [hasMore, setHasMore] = useState(true);
  const [fetchedOnce, setFetchedOnce] = useState(false);
  const requestRef = useRef(0);

  useEffect(() => {
    if (typeof search === "undefined") {
      return;
    }

    const handler = setTimeout(() => {
      if (search !== debouncedSearch) {
        setDebouncedSearch(search || "");
        setCurrentPage(1);
        setPublications([]);
        setHasMore(true);
        setFetchedOnce(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [search, debouncedSearch]);

  // reset kalau type/excludeId berubah
  useEffect(() => {
    setCurrentPage(1);
    setPublications([]);
    setHasMore(true);
    setFetchedOnce(false);
  }, [type, excludeId]);

  const fetchPublications = useCallback(async () => {
    setLoading(true);
    const thisRequestId = ++requestRef.current;

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });

      // hanya kirim type kalau bukan "all"
      if (type && type !== "all") {
        params.append("type", type);
      }

      if (debouncedSearch && debouncedSearch.length > 0) {
        params.append("search", debouncedSearch);
      }

      if (excludeId) {
        params.append("excludeId", excludeId);
      }

      const res = await fetch(`/api/publications?${params.toString()}`);
      if (!res.ok) throw new Error("Gagal mengambil daftar publikasi");
      const json = await res.json();

      if (requestRef.current !== thisRequestId) return;

      const newData: PublicationType[] = json.data || [];

      setPublications((prev) => {
        if (currentPage === 1) {
          return newData;
        }
        const existingIds = new Set(prev.map((p) => p.id));
        const filtered = newData.filter((p) => !existingIds.has(p.id));
        return [...prev, ...filtered];
      });

      setTotal(json.total || 0);
      setHasMore(currentPage < (json.totalPages || 0));
      setFetchedOnce(true);
    } catch (error) {
      console.error("Failed to fetch publications:", error);
    } finally {
      if (requestRef.current === thisRequestId) {
        setLoading(false);
      }
    }
  }, [limit, type, currentPage, debouncedSearch, excludeId]);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  return {
    publications,
    loading,
    fetchedOnce,
    total,
    currentPage,
    setCurrentPage,
    hasMore,
  };
}
