import { useEffect, useState } from "react";
import { ProfileType } from "@/types/profile";

export default function usePublicProfile(id?: string) {
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (id) {
          const res = await fetch(`/api/profiles/${id}`);
          if (!res.ok) throw new Error("Gagal mengambil detail profile");
          const json = await res.json();
          setProfile(json);
        } else {
          const res = await fetch("/api/profiles");
          if (!res.ok) throw new Error("Gagal mengambil data profiles");
          const json = await res.json();
          setProfiles(Array.isArray(json.data) ? json.data : []);
        }
      } catch (error) {
        console.error("Error fetching profile(s):", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { profiles, profile, loading };
}
