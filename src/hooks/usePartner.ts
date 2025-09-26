"use client";

import { useState, useCallback } from "react";
import { PartnerType } from "@/types/partner";

export function usePartner() {
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPartners = useCallback(async (page: number = 1) => {
    setLoading(true);
    const res = await fetch(`/api/partners?page=${page}`);
    const data = await res.json();
    setPartners(data.data);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
    setLoading(false);
  }, []);

  const createPartner = async (partner: PartnerType) => {
    await fetch("/api/partners", {
      method: "POST",
      body: JSON.stringify(partner),
      headers: { "Content-Type": "application/json" },
    });
  };

  const updatePartner = async (id: number, partner: PartnerType) => {
    await fetch(`/api/partners/${id}`, {
      method: "PUT",
      body: JSON.stringify(partner),
      headers: { "Content-Type": "application/json" },
    });
  };

  const deletePartner = async (id: number) => {
    await fetch(`/api/partners/${id}`, { method: "DELETE" });
  };

  return {
    partners,
    loading,
    fetchPartners,
    createPartner,
    updatePartner,
    deletePartner,
    currentPage,
    totalPages,
  };
}
