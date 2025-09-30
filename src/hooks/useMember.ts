import { useEffect, useState, useCallback } from "react";
import { MemberType } from "@/types/member";

export function useMembers() {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMembers = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/members?page=${page}&limit=${limit}`);
      const json = await res.json();
      setMembers(json.data);
      setTotalPages(json.totalPages);
      setCurrentPage(json.page);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createMember = async (
    member: Omit<
      MemberType,
      | "id"
      | "created_at"
      | "updated_at"
      | "activate_email_status"
      | "active_status"
      | "role"
    >
  ) => {
    const res = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...member,
        role: "member",
        active_status: false,
        activate_email_status: false,
      }),
    });
    return res.json();
  };

  const updateMember = async (id: number, member: Partial<MemberType>) => {
    const res = await fetch(`/api/members/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });
    return res.json();
  };

  const activateMember = async (id: number) => {
    const res = await fetch(`/api/members/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "activate" }),
    });
    return res.json();
  };

  const deleteMember = async (id: number) => {
    await fetch(`/api/members/${id}`, { method: "DELETE" });
  };

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    members,
    loading,
    fetchMembers,
    createMember,
    updateMember,
    activateMember,
    deleteMember,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
