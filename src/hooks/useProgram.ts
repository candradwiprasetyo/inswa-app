import { useState, useCallback } from "react";
import { ProgramType } from "@/types/program";

export function useProgram() {
  const [programs, setPrograms] = useState<ProgramType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPrograms = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/programs?page=${page}&limit=${limit}`);
      const json = await res.json();
      setPrograms(json.data);
      setTotalPages(json.totalPages);
      setCurrentPage(json.page);
    } catch (error) {
      console.error("Failed to fetch programs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProgram = async (
    program: Omit<ProgramType, "id" | "created_at" | "updated_at">
  ) => {
    const res = await fetch("/api/programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(program),
    });
    return res.json();
  };

  const updateProgram = async (id: number, program: Partial<ProgramType>) => {
    const res = await fetch(`/api/programs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(program),
    });
    return res.json();
  };

  const deleteProgram = async (id: number) => {
    await fetch(`/api/programs/${id}`, { method: "DELETE" });
  };

  return {
    programs,
    loading,
    fetchPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
