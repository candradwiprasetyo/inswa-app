import { useCallback, useEffect, useState } from "react";
import { ActivityType } from "@/types/activity";

export function usePublicActivities(programId?: string) {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/activities?program_id=${programId}&limit=1000`
      );
      const json = await res.json();
      setActivities(json.data || []);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setLoading(false);
    }
  }, [programId]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, loading };
}
