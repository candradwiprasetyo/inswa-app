"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import AdminPartnerPage from "@/features/admin/partner";

export default function AdminPartner() {
  return (
    <>
      <div className="bg-admin min-h-screen">
        <AdminHeader />
        <AdminNavigation />
        <AdminPartnerPage />
      </div>
    </>
  );
}
