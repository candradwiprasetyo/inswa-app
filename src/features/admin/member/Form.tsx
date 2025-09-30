"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MemberType } from "@/types/member";

type MemberFormProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<MemberType>;
  onSubmitData: (data: Partial<MemberType>) => Promise<void>;
};

export default function MemberForm({
  isOpen,
  onClose,
  initialData,
  onSubmitData,
}: MemberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<MemberType>>({
    defaultValues: {
      id: null,
      name: "",
      email: "",
      whatsapp: "",
      password: "",
      active_status: false,
      role: "member",
      ...initialData,
    },
  });

  useEffect(() => {
    reset({
      id: null,
      name: "",
      email: "",
      whatsapp: "",
      password: "",
      active_status: false,
      role: "member",
      ...initialData,
    });
  }, [initialData, reset]);

  const onSubmit = async (data: Partial<MemberType>) => {
    try {
      setIsSubmitting(true);
      await onSubmitData(data);
      reset();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg overflow-auto max-h-[80vh] scrollbar-hide relative">
        <div
          className="absolute w-8 h-8 rounded-full bg-red-400 top-6 right-6 text-white flex items-center justify-center cursor-pointer "
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </div>
        <h2 className="text-lg font-semibold mb-4">
          {initialData?.id ? "Edit Member" : "Tambah Member"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-bold text-gray-400">Nama</label>
            <input
              {...register("name", { required: "Nama wajib diisi" })}
              placeholder="Nama"
              className="border p-2 w-full rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-bold text-gray-400">Role</label>
            <select
              {...register("role", { required: "Role wajib diisi" })}
              className="border p-2 w-full rounded-md"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-bold text-gray-400">Email</label>
            <input
              {...register("email", { required: "Email wajib diisi" })}
              type="email"
              placeholder="Email"
              className="border p-2 w-full rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Whatsapp */}
          <div>
            <label className="text-sm font-bold text-gray-400">
              Nomor WhatsApp
            </label>
            <input
              {...register("whatsapp")}
              placeholder="Nomor WhatsApp"
              className="border p-2 w-full rounded-md"
            />
          </div>

          {/* Password (for new member) */}
          {!initialData?.id && (
            <div>
              <label className="text-sm font-bold text-gray-400">
                Password
              </label>
              <input
                {...register("password", { required: "Password wajib diisi" })}
                type="password"
                placeholder="Password"
                className="border p-2 w-full rounded-md"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          {/* Active Status */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active_status"
              {...register("active_status")}
              className="form-checkbox h-4 w-4 text-green-600 rounded"
            />
            <label
              htmlFor="active_status"
              className="text-sm font-bold text-gray-400"
            >
              Aktif
            </label>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-full text-sm"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-full text-sm text-white ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-400 hover:bg-green-500"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Menyimpan..."
                : initialData?.id
                ? "Update"
                : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
