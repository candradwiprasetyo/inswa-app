"use client";

import { useProgram } from "@/hooks/useProgram";
import { useState, useEffect } from "react";
import { ProgramType } from "@/types/program";
import LoadingAdmin from "@/components/LoadingAdmin";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import ProgramForm from "./Form";
import Pagination from "@/components/Pagination";
import ProgramHeader from "./Header";
import ProgramList from "./List";

export default function AdminProgramPage() {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const {
    programs,
    loading,
    fetchPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
    currentPage,
    totalPages,
  } = useProgram();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ProgramType>({
    id: null,
    name: "",
    slug: "",
    content: "",
    image: "",
    description: "",
  });

  const handleEdit = (program: ProgramType) => {
    setFormData(program);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await deleteProgram(id);
    fetchPrograms();
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      name: "",
      slug: "",
      content: "",
      image: "",
      description: "",
    });
    setShowModal(true);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchPrograms(page);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  if (loading) return <LoadingAdmin />;

  return (
    <div className="container mx-auto py-4 max-w-7xl px-6">
      <ProgramHeader onAdd={handleAdd} />
      <ProgramList
        programs={programs}
        onEdit={handleEdit}
        onDelete={(id) => setConfirmDeleteId(id)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ProgramForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={formData}
        onSubmitData={async (data) => {
          if (data.id) {
            await updateProgram(data.id, data);
          } else {
            await createProgram(data);
          }
          fetchPrograms();
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
