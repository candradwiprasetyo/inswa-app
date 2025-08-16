"use client";

import { useState } from "react";
import { usePublication } from "@/hooks/usePublication";
import PublicationHeader from "./Header";
import PublicationList from "./List";
import PublicationForm from "./Form";
import { PublicationType } from "@/types/publication";

export default function PublicationPage() {
  const {
    publications,
    fetchPublications,
    createPublication,
    updatePublication,
    deletePublication,
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
        <PublicationList
          publications={publications}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
