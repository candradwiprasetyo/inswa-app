"use client";

import { usePartner } from "@/hooks/usePartner";
import { useState, useEffect } from "react";
import { PartnerType } from "@/types/partner";
import LoadingAdmin from "@/components/LoadingAdmin";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import PartnerForm from "./Form";
import Pagination from "@/components/Pagination";
import PartnerList from "./List";
import PartnerHeader from "./Header";

export default function AdminPartnerPage() {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const {
    partners,
    loading,
    fetchPartners,
    createPartner,
    updatePartner,
    deletePartner,
    currentPage,
    totalPages,
  } = usePartner();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<PartnerType>({
    id: null,
    name: "",
    image: "",
    type: "",
  });

  const handleEdit = (partner: PartnerType) => {
    setFormData(partner);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await deletePartner(id);
    fetchPartners();
  };

  const handleAdd = () => {
    setFormData({ id: null, name: "", image: "", type: "" });
    setShowModal(true);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchPartners(page);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  if (loading) return <LoadingAdmin />;

  return (
    <div className="container mx-auto py-4 max-w-7xl px-6">
      <PartnerHeader onAdd={handleAdd} />

      <PartnerList
        partners={partners}
        onEdit={handleEdit}
        onDelete={(id) => setConfirmDeleteId(id)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <PartnerForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={formData}
        onSubmitData={async (data) => {
          if (data.id) {
            await updatePartner(data.id, data);
          } else {
            await createPartner(data);
          }
          fetchPartners();
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
