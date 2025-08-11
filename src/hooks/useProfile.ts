import { useEffect, useState, useCallback } from "react";
import { ProfileType } from "@/types/profile";

export function useProfile() {
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProfiles = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/profiles?page=${page}&limit=${limit}`);
      const json = await res.json();
      setProfiles(json.data);
      setTotalPages(json.totalPages);
      setCurrentPage(json.page);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProfile = async (
    profile: Omit<ProfileType, "id" | "created_at" | "updated_at">
  ) => {
    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    return res.json();
  };

  const updateProfile = async (id: number, profile: Partial<ProfileType>) => {
    const res = await fetch(`/api/profiles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    return res.json();
  };

  const deleteProfile = async (id: number) => {
    await fetch(`/api/profiles/${id}`, { method: "DELETE" });
  };

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return {
    profiles,
    loading,
    fetchProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
