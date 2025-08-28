"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import AdminMemberPage from "@/features/admin/member";

export default function AdminMember() {
  return (
    <>
      <div className="bg-admin min-h-screen">
        <AdminHeader />
        <AdminNavigation />
        <AdminMemberPage />
      </div>
    </>
  );
}
