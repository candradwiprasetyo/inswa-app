"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import AdminProfilePage from "@/features/admin/profile";

export default function MediaProgram() {
  return (
    <>
      <div className="bg-admin min-h-screen">
        <AdminHeader />
        <AdminNavigation />
        <AdminProfilePage />
      </div>
    </>
  );
}
