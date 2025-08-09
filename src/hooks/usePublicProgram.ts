import { useCallback, useEffect, useState } from "react";
import { ProgramType } from "@/types/program";

export function usePublicPrograms(limit = 3) {
  const [programs, setPrograms] = useState<ProgramType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestPrograms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/programs?page=1&limit=${limit}`);
      const json = await res.json();
      setPrograms(json.data || []);
    } catch (error) {
      console.error("Failed to fetch programs:", error);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLatestPrograms();
  }, [fetchLatestPrograms]);

  return { programs, loading };
}
