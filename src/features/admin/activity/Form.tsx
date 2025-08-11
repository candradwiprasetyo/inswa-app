"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityType } from "@/types/activity";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type ActivityFormProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ActivityType;
  onSubmitData: (data: ActivityType) => Promise<void>;
};

export default function ActivityForm({
  isOpen,
  onClose,
  initialData,
  onSubmitData,
}: ActivityFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ActivityType>({
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data: ActivityType) => {
    await onSubmitData(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-3xl overflow-auto max-h-[80vh] scrollbar-hide relative">
        <div
          className="absolute w-8 h-8 rounded-full bg-red-400 top-6 right-6 text-white flex items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </div>
        <h2 className="text-lg font-semibold mb-4">
          {initialData?.id ? "Edit Kegiatan" : "Tambah Kegiatan"}
        </h2>

        <label className="text-sm font-bold text-gray-400">Nama Kegiatan</label>
        <input
          {...register("name", { required: "Nama kegiatan wajib diisi" })}
          className="border p-2 mb-1 w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mb-2">{errors.name.message}</p>
        )}

        <label className="text-sm font-bold text-gray-400">Tahun</label>
        <input
          type="number"
          {...register("year", {
            required: "Tahun wajib diisi",
            valueAsNumber: true,
          })}
          className="border p-2 mb-1 w-full"
        />
        {errors.year && (
          <p className="text-red-500 text-xs mb-2">{errors.year.message}</p>
        )}

        <label className="text-sm font-bold text-gray-400">Lokasi</label>
        <input
          {...register("location", { required: "Lokasi wajib diisi" })}
          className="border p-2 mb-1 w-full"
        />
        {errors.location && (
          <p className="text-red-500 text-xs mb-2">{errors.location.message}</p>
        )}

        <label className="text-sm font-bold text-gray-400">PIC</label>
        {/* <textarea
          {...register("pic")}
          className="border p-2 mb-1 w-full"
          rows={3}
        /> */}
        <Editor
          value={initialData?.pic || ""}
          onChange={(value) => {
            setValue("pic", value, { shouldValidate: true });
            trigger("pic");
          }}
        />

        <label className="text-sm font-bold text-gray-400">Konten</label>
        {/* <textarea
          {...register("content")}
          className="border p-2 mb-1 w-full h-32"
        /> */}
        <Editor
          value={initialData?.content || ""}
          onChange={(value) => {
            setValue("content", value, { shouldValidate: true });
            trigger("content");
          }}
        />

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-full text-sm"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-green-400 text-white px-4 py-2 rounded-full text-sm"
          >
            {initialData?.id ? "Update" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
