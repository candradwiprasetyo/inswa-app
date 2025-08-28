"use client";

import { useMembers } from "@/hooks/useMember";
import { useState, useEffect } from "react";
import { MemberType } from "@/types/member";
import LoadingAdmin from "@/components/LoadingAdmin";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import MemberForm from "./Form";
import Pagination from "@/components/Pagination";
import MemberHeader from "./Header";
import MemberList from "./List";

export default function AdminMemberPage() {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const {
    members,
    loading,
    fetchMembers,
    createMember,
    updateMember,
    activateMember,
    deleteMember,
    currentPage,
    totalPages,
  } = useMembers();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<MemberType>>({});

  const handleEdit = (member: MemberType) => {
    setFormData(member);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await deleteMember(id);
    fetchMembers();
  };

  const handleActivate = async (member: MemberType) => {
    if (member.activate_email_status) {
      alert("Member ini sudah diaktivasi.");
      return;
    }
    await activateMember(member.id!);
    fetchMembers();
  };

  const handleAdd = () => {
    setFormData({});
    setShowModal(true);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchMembers(page);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  if (loading) return <LoadingAdmin />;

  return (
    <div className="container mx-auto py-4 max-w-7xl px-6">
      <MemberHeader onAdd={handleAdd} />
      <MemberList
        members={members}
        onEdit={handleEdit}
        onActivate={handleActivate}
        onDelete={(id) => setConfirmDeleteId(id)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <MemberForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={formData}
        onSubmitData={async (data) => {
          if (data.id) {
            await updateMember(data.id, data);
          } else {
            if (data.name && data.email && data.password && data.whatsapp) {
              await createMember({
                name: data.name,
                email: data.email,
                password: data.password,
                whatsapp: data.whatsapp,
              });
            } else {
              console.error("Data tidak lengkap untuk membuat anggota baru.");
              return;
            }
          }
          fetchMembers();
        }}
      />

      {confirmDeleteId !== null && (
        <DeleteConfirmation
          onCancel={() => setConfirmDeleteId(null)}
          onConfirm={async () => {
            await handleDelete(confirmDeleteId);
            setConfirmDeleteId(null);
          }}
        />
      )}
    </div>
  );
}
