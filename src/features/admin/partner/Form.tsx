"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PartnerType } from "@/types/partner";
import Image from "next/image";
import { cdnLoader } from "@/lib/cdnLoader";

type PartnerFormProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: PartnerType;
  onSubmitData: (data: PartnerType) => Promise<void>;
};

export default function PartnerForm({
  isOpen,
  onClose,
  initialData,
  onSubmitData,
}: PartnerFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm<PartnerType>({
    defaultValues: {
      id: null,
      name: "",
      image: "",
      type: "",
      ...initialData,
    },
  });

  useEffect(() => {
    reset({
      id: null,
      name: "",
      image: "",
      type: "",
      ...initialData,
    });
    setImagePreview(initialData?.image || "");
  }, [initialData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PartnerType) => {
    if (!data.id && !imageFile) {
      setImageError("Logo wajib diunggah!");
      return;
    }

    try {
      setIsSubmitting(true);
      let imagePath = data.image || "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("folder", "partners");
        const uploadRes = await fetch("/api/upload-minio", {
          method: "POST",
          body: formData,
        });
        const result = await uploadRes.json();
        if (uploadRes.ok && result.url) {
          imagePath = result.url;
        }
      }

      await onSubmitData({ ...data, image: imagePath });

      reset();
      setImageFile(null);
      setImagePreview("");
      setImageError("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {initialData?.id ? "Edit Partner" : "Tambah Partner"}
        </h2>

        {/* Nama */}
        <label className="text-sm font-bold">Nama</label>
        <input
          {...register("name", { required: "Nama wajib diisi" })}
          placeholder="Nama Partner"
          className="border p-2 mb-2 w-full"
        />

        {/* Tipe */}
        <label className="text-sm font-bold">Tipe</label>
        <select
          {...register("type", { required: "Tipe wajib dipilih" })}
          className="border p-2 mb-2 w-full bg-white"
          defaultValue={initialData?.type || ""}
        >
          <option value="" disabled>
            Pilih tipe
          </option>
          <option value="1">Mitra</option>
          <option value="2">Sertifikat</option>
        </select>

        {/* Gambar */}
        <label className="text-sm font-bold">Logo</label>
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            width={160}
            height={100}
            loader={cdnLoader}
            className="object-contain mb-2 border"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 mb-2 w-full"
        />
        {imageError && <p className="text-red-500 text-xs">{imageError}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-full text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-500 text-white rounded-full text-sm"
          >
            {isSubmitting
              ? "Menyimpan..."
              : initialData?.id
              ? "Update"
              : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
