"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArticleType } from "@/types/article";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cdnLoader } from "@/lib/cdnLoader";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type ArticleFormProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ArticleType;
  onSubmitData: (data: ArticleType) => Promise<void>;
};

export default function ArticleForm({
  isOpen,
  onClose,
  initialData,
  onSubmitData,
}: ArticleFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ArticleType>({
    defaultValues: {
      id: null,
      title: "",
      slug: "",
      content: "",
      images: "",
      type: "",
      video_url: "",
      ...initialData,
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    if (selectedType !== "video") {
      setValue("video_url", "");
    }
  }, [selectedType, setValue]);

  useEffect(() => {
    reset({
      id: null,
      title: "",
      slug: "",
      content: "",
      images: "",
      type: "",
      video_url: "",
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

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const onSubmit = async (data: ArticleType) => {
    if (!data.id && !imageFile) {
      setImageError("Gambar wajib diunggah!");
      return;
    }

    let imagePath = data.images || "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("folder", "media");

      const uploadRes = await fetch("/api/upload-minio", {
        method: "POST",
        body: formData,
      });

      const result = await uploadRes.json();

      if (uploadRes.ok && result.url) {
        imagePath = result.url;
      } else {
        setImageError("Upload gambar gagal");
        return;
      }
    }

    const payload: ArticleType = {
      ...data,
      slug: generateSlug(data.title),
      images: imagePath,
      ...(data.type !== "video" ? { video_url: "" } : {}),
    };

    await onSubmitData(payload);

    reset();
    setImageFile(null);
    setImagePreview("");
    setImageError("");
    onClose();
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
          {initialData?.id ? "Edit Media" : "Tambah Media"}
        </h2>

        <label className="text-sm font-bold text-gray-400">Judul</label>
        <input
          {...register("title", { required: "Judul wajib diisi" })}
          placeholder="Title"
          onChange={(e) => {
            setValue("title", e.target.value);
            setValue("slug", generateSlug(e.target.value));
          }}
          className="border p-2 mb-1 w-full"
        />
        {errors.title && (
          <p className="text-red-500 text-xs mb-2">{errors.title.message}</p>
        )}

        <label className="text-sm font-bold text-gray-400 mt-2">Type</label>
        <select
          {...register("type", { required: "Type wajib dipilih" })}
          className="border p-2 mb-2 w-full"
          defaultValue={initialData?.type || "article"}
        >
          <option value="article">Article</option>
          <option value="video">Video</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-xs mb-2">{errors.type.message}</p>
        )}

        {selectedType === "video" && (
          <>
            <label className="text-sm font-bold text-gray-400 mt-2">
              Video URL
            </label>
            <input
              {...register("video_url", {
                required:
                  selectedType === "video" ? "Video URL wajib diisi" : false,
              })}
              type="text"
              placeholder="https://..."
              className="border p-2 mb-2 w-full"
            />
            {errors.video_url && (
              <p className="text-red-500 text-xs mb-2">
                {errors.video_url.message}
              </p>
            )}
          </>
        )}

        <label className="text-sm font-bold text-gray-400">Images</label>
        {imagePreview && (
          <Image
            src={imagePreview}
            loader={cdnLoader}
            alt="Preview"
            className="object-cover mb-2 rounded border"
            width={200}
            height={160}
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

        <label className="text-sm font-bold text-gray-400">Content</label>
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
            validate: (value) => {
              const stripped = value?.replace(/<[^>]+>/g, "").trim();
              return stripped ? true : "Konten wajib diisi";
            },
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
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className={`bg-green-400 text-white px-4 py-2 rounded-full text-sm ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? initialData?.id
                ? "Updating..."
                : "Saving..."
              : initialData?.id
              ? "Update"
              : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
