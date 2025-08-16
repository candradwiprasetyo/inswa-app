"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import AdminPublicationPage from "@/features/admin/publication";

export default function MediaProgram() {
  return (
    <>
      <div className="bg-admin min-h-screen">
        <AdminHeader />
        <AdminNavigation />
        <AdminPublicationPage />
      </div>
    </>
  );
}
