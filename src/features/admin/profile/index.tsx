"use client";

import { useProfile } from "@/hooks/useProfile";
import { useState, useEffect } from "react";
import { ProfileType } from "@/types/profile";
import LoadingAdmin from "@/components/LoadingAdmin";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import ProfileForm from "./Form";
import Pagination from "@/components/Pagination";
import ProfileHeader from "./Header";
import ProfileList from "./List";

export default function AdminProfilePage() {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const {
    profiles,
    loading,
    fetchProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    currentPage,
    totalPages,
  } = useProfile();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ProfileType>({
    id: null,
    name: "",
    images: "",
    description: "",
    position: "",
    facebook: "",
    youtube: "",
    instagram: "",
  });

  const handleEdit = (profile: ProfileType) => {
    setFormData(profile);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await deleteProfile(id);
    fetchProfiles();
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      name: "",
      images: "",
      description: "",
      position: "",
      facebook: "",
      youtube: "",
      instagram: "",
    });
    setShowModal(true);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchProfiles(page);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  if (loading) return <LoadingAdmin />;

  return (
    <div className="container mx-auto py-4 max-w-7xl px-6">
      <ProfileHeader onAdd={handleAdd} />
      <ProfileList
        profiles={profiles}
        onEdit={handleEdit}
        onDelete={(id) => setConfirmDeleteId(id)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ProfileForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={formData}
        onSubmitData={async (data) => {
          if (data.id) {
            await updateProfile(data.id, data);
          } else {
            await createProfile(data);
          }
          fetchProfiles();
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
