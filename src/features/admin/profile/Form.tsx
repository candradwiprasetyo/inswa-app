"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProfileType } from "@/types/profile";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cdnLoader } from "@/lib/cdnLoader";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type ProfileFormProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ProfileType;
  onSubmitData: (data: ProfileType) => Promise<void>;
};

export default function ProfileForm({
  isOpen,
  onClose,
  initialData,
  onSubmitData,
}: ProfileFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ProfileType>({
    defaultValues: {
      id: null,
      name: "",
      images: "",
      description: "",
      position: "",
      facebook: "",
      youtube: "",
      instagram: "",
      ...initialData,
    },
  });

  useEffect(() => {
    reset({
      id: null,
      name: "",
      images: "",
      description: "",
      position: "",
      facebook: "",
      youtube: "",
      instagram: "",
      ...initialData,
    });
    setImagePreview(initialData?.images || "");
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

  const onSubmit = async (data: ProfileType) => {
    if (!data.id && !imageFile) {
      setImageError("Gambar wajib diunggah!");
      return;
    }

    try {
      setIsSubmitting(true);

      let imagePath = data.images || "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("folder", "profiles");
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
        images: imagePath,
      });

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
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-3xl overflow-auto max-h-[80vh] scrollbar-hide relative">
        <div
          className="absolute w-8 h-8 rounded-full bg-red-400 top-6 right-6 text-white flex items-center justify-center cursor-pointer "
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </div>
        <h2 className="text-lg font-semibold mb-4">
          {initialData?.id ? "Edit Profile" : "Tambah Profile"}
        </h2>

        {/* Name */}
        <label className="text-sm font-bold text-gray-400">Nama</label>
        <input
          {...register("name", { required: "Nama wajib diisi" })}
          placeholder="Nama"
          className="border p-2 mb-1 w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mb-2">{errors.name.message}</p>
        )}

        {/* Position */}
        <label className="text-sm font-bold text-gray-400">Posisi</label>
        <input
          {...register("position")}
          placeholder="Posisi"
          className="border p-2 mb-2 w-full"
        />

        {/* Images */}
        <label className="text-sm font-bold text-gray-400">Foto</label>
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
        {imageError && (
          <p className="text-red-500 text-xs mb-2">{imageError}</p>
        )}

        {/* Description */}
        <label className="text-sm font-bold text-gray-400">Deskripsi</label>
        <Editor
          value={initialData?.description || ""}
          onChange={(value) => {
            setValue("description", value, { shouldValidate: true });
            trigger("description");
          }}
        />

        {/* Social Media */}
        <label className="text-sm font-bold text-gray-400">Facebook</label>
        <input
          {...register("facebook")}
          placeholder="Link Facebook"
          className="border p-2 mb-2 w-full"
        />

        <label className="text-sm font-bold text-gray-400">YouTube</label>
        <input
          {...register("youtube")}
          placeholder="Link YouTube"
          className="border p-2 mb-2 w-full"
        />

        <label className="text-sm font-bold text-gray-400">Instagram</label>
        <input
          {...register("instagram")}
          placeholder="Link Instagram"
          className="border p-2 mb-2 w-full"
        />

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-full text-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
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
      </div>
    </div>
  );
}
