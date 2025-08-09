import { useEffect, useState, useCallback } from "react";
import { ActivityType } from "@/types/activity";

export function useActivity(programId: number) {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchActivities = useCallback(
    async (page = 1, limit = 10) => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/activities?program_id=${programId}&page=${page}&limit=${limit}`
        );
        const json = await res.json();
        setActivities(json.data);
        setTotalPages(json.totalPages);
        setCurrentPage(json.page);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    },
    [programId]
  );

  const createActivity = async (
    activity: Omit<ActivityType, "id" | "created_at" | "updated_at">
  ) => {
    const res = await fetch("/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });
    return res.json();
  };

  const updateActivity = async (
    id: number,
    activity: Partial<ActivityType>
  ) => {
    const res = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });
    return res.json();
  };

  const deleteActivity = async (id: number) => {
    await fetch(`/api/activities/${id}`, { method: "DELETE" });
  };

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    activities,
    loading,
    fetchActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
