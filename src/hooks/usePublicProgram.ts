import { useCallback, useEffect, useState } from "react";
import { ProgramType } from "@/types/program";

export function usePublicProgram(id?: string) {
  const [program, setProgram] = useState<ProgramType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await fetch(`/api/programs/${id}`);
          if (!res.ok) throw new Error("Gagal mengambil detail program");
          const json = await res.json();
          setProgram(json);
        }
      } catch (error) {
        console.error("Error fetching detail program:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProgram();
  }, [id]);

  return { program, loading };
}

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
