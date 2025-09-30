"use client";

import { MemberType } from "@/types/member";
import { useState } from "react";

type MemberListProps = {
  members: MemberType[];
  onEdit: (member: MemberType) => void;
  onActivate: (member: MemberType) => Promise<void>;
  onDelete: (id: number) => void;
};

export default function MemberList({
  members,
  onEdit,
  onActivate,
  onDelete,
}: MemberListProps) {
  const [activatingId, setActivatingId] = useState<number | null>(null);

  const handleActivateClick = async (member: MemberType) => {
    setActivatingId(member.id);
    try {
      await onActivate(member);
    } finally {
      setActivatingId(null);
    }
  };

  return (
    <div className="rounded-xl bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-4 w-[50px] text-left">No</th>
            <th className="p-4 text-left">Nama</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Whatsapp</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, index) => (
            <tr key={m.id} className="border-b">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{m.name}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    m.role === "admin"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {m.role}
                </span>
              </td>
              <td className="p-3">{m.email}</td>
              <td className="p-3">{m.whatsapp}</td>
              <td className="p-3 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    m.active_status
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {m.active_status ? "Aktif" : "Tidak Aktif"}
                </span>
              </td>
              <td className="p-3 space-x-2 text-center">
                {m.id && !m.activate_email_status && (
                  <button
                    onClick={() => handleActivateClick(m)}
                    className="text-yellow-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={activatingId === m.id}
                    title="Aktivasi Akun"
                  >
                    {activatingId === m.id ? (
                      <span className="material-symbols-outlined animate-spin">
                        cached
                      </span>
                    ) : (
                      <span className="material-symbols-outlined">
                        send_and_archive
                      </span>
                    )}
                  </button>
                )}
                <button onClick={() => onEdit(m)} className="text-blue-500">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  onClick={() => onDelete(m.id!)}
                  className="text-red-500"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
