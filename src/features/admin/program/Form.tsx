"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProgramType } from "@/types/program";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cdnLoader } from "@/lib/cdnLoader";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type ProgramFormProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ProgramType;
  onSubmitData: (data: ProgramType) => Promise<void>;
};

export default function ProgramForm({
  isOpen,
  onClose,
  initialData,
  onSubmitData,
}: ProgramFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ProgramType>({
    defaultValues: {
      id: null,
      name: "",
      slug: "",
      image: "",
      description: "",
      content: "",
      ...initialData,
    },
  });

  useEffect(() => {
    reset({
      id: null,
      name: "",
      slug: "",
      image: "",
      description: "",
      content: "",
      ...initialData,
    });
    setImagePreview(initialData?.image || "");
  }, [initialData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const onSubmit = async (data: ProgramType) => {
    let imagePath = data.image || "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("folder", "program");
      const uploadRes = await fetch("/api/upload-minio", {
        method: "POST",
        body: formData,
      });
      const result = await uploadRes.json();

      if (uploadRes.ok && result.url) {
        imagePath = result.url;
      } else {
        return;
      }
    }
    await onSubmitData({
      ...data,
      slug: generateSlug(data.name),
      image: imagePath,
    });

    reset();
    setImageFile(null);
    setImagePreview("");
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
          {initialData?.id ? "Edit Program" : "Tambah Program"}
        </h2>

        <label className="text-sm font-bold text-gray-400">Nama Program</label>
        <input
          {...register("name", { required: "Nama program wajib diisi" })}
          onChange={(e) => {
            setValue("name", e.target.value);
            setValue("slug", generateSlug(e.target.value));
          }}
          className="border p-2 mb-1 w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mb-2">{errors.name.message}</p>
        )}

        <label className="text-sm font-bold text-gray-400">Deskripsi</label>
        <textarea
          {...register("description", { required: "Deskripsi wajib diisi" })}
          className="border p-2 mb-1 w-full"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mb-2">
            {errors.description.message}
          </p>
        )}

        <label className="text-sm font-bold text-gray-400">Gambar</label>
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            className="object-cover mb-2 rounded border"
            width={200}
            height={160}
            loader={cdnLoader}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 mb-2 w-full"
        />

        <label className="text-sm font-bold text-gray-400">Konten</label>
        <Editor
          value={initialData?.content || ""}
          onChange={(value) => {
            setValue("content", value, { shouldValidate: true });
            trigger("content");
          }}
        />
        <input
          type="hidden"
          {...register("content", {
            required: "Konten wajib diisi",
            validate: (value) =>
              value?.replace(/<[^>]+>/g, "").trim()
                ? true
                : "Konten wajib diisi",
          })}
        />
        {errors.content && (
          <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
        )}

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
