"use client";

import { useState } from "react";
import { usePublication } from "@/hooks/usePublication";
import PublicationHeader from "./Header";
import PublicationList from "./List";
import PublicationForm from "./Form";
import { PublicationType } from "@/types/publication";
import Pagination from "@/components/Pagination";

export default function PublicationPage() {
  const {
    publications,
    fetchPublications,
    createPublication,
    updatePublication,
    deletePublication,
    currentPage,
    totalPages,
  } = usePublication();

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<PublicationType | null>(null);

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (p: PublicationType) => {
    setEditData(p);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await deletePublication(id);
      fetchPublications();
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchPublications(page);
    }
  };

  const handleSubmit = async (data: Omit<PublicationType, "id">) => {
    if (editData) {
      await updatePublication(editData.id!, data);
    } else {
      await createPublication(data);
    }
    setShowForm(false);
    fetchPublications();
  };

  return (
    <div className="container mx-auto py-4 max-w-7xl px-6">
      <PublicationHeader onAdd={handleAdd} />

      {!showForm && (
        <>
          <PublicationList
            publications={publications}
            currentPage={currentPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {showForm && (
        <PublicationForm
          initialData={editData}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
