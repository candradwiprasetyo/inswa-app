"use client";

import { useState, useEffect } from "react";
import { ActivityType } from "@/types/activity";
import { useActivity } from "@/hooks/useActivity";
import LoadingAdmin from "@/components/LoadingAdmin";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import ActivityForm from "./Form";
import Pagination from "@/components/Pagination";
import ActivityHeader from "./Header";
import ActivityList from "./List";
import { useSearchParams } from "next/navigation";

export default function AdminActivityPage() {
  const searchParams = useSearchParams();
  const programIdParam = searchParams.get("program_id");
  const programId = programIdParam ? parseInt(programIdParam, 10) : null;
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const {
    activities,
    loading,
    fetchActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    currentPage,
    totalPages,
  } = useActivity(programId ?? 0);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ActivityType>({
    id: null,
    program_id: programId ?? 0,
    name: "",
    content: "",
    year: new Date().getFullYear(),
    location: "",
    pic: "",
  });

  const handleEdit = (activity: ActivityType) => {
    setFormData(activity);
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      program_id: programId ?? 0,
      name: "",
      content: "",
      year: new Date().getFullYear(),
      location: "",
      pic: "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await deleteActivity(id);
    fetchActivities();
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchActivities(page);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  if (loading) return <LoadingAdmin />;

  return (
    <div className="container mx-auto py-4 max-w-7xl px-6">
      <ActivityHeader onAdd={handleAdd} />
      <ActivityList
        activities={activities}
        onEdit={handleEdit}
        onDelete={(id) => setConfirmDeleteId(id)}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ActivityForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={formData}
        onSubmitData={async (data) => {
          if (data.id) {
            await updateActivity(data.id, data);
          } else {
            await createActivity(data);
          }
          fetchActivities();
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
