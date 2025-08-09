import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import AdminActivityPage from "@/features/admin/activity";
import { Suspense } from "react";

export default function ActivityPage() {
  return (
    <div className="bg-admin min-h-screen">
      <AdminHeader />
      <AdminNavigation />
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <AdminActivityPage />
      </Suspense>
    </div>
  );
}
