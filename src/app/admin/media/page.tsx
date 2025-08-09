"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import AdminArticlePage from "@/features/admin/article";

export default function MediaProgram() {
  return (
    <>
      <div className="bg-admin min-h-screen">
        <AdminHeader />
        <AdminNavigation />
        <AdminArticlePage />
      </div>
    </>
  );
}
