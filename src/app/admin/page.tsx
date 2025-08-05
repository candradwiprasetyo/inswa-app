"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import AdminArticlePage from "@/features/admin/article";

export default function AdminPage() {
  return (
    <>
      <AdminHeader />
      <AdminNavigation />
      <AdminArticlePage />
    </>
  );
}
