import { useEffect, useState } from "react";
import { PartnerType } from "@/types/partner";

export default function usePublicPartner(type?: "1" | "2") {
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let url = "/api/partners";
        if (type) {
          url += `?type=${encodeURIComponent(type)}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal mengambil data partners");

        const json = await res.json();
        setPartners(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return { partners, loading };
}
