"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import AdminProgramPage from "@/features/admin/program";

export default function AdminProgram() {
  return (
    <>
      <div className="bg-admin min-h-screen">
        <AdminHeader />
        <AdminNavigation />
        <AdminProgramPage />
      </div>
    </>
  );
}
