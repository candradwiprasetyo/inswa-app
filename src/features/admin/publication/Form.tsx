import { useState, useEffect } from "react";
import { PublicationType } from "@/types/publication";
import dynamic from "next/dynamic";
import { getFullImageUrl } from "@/lib/image";
import Image from "next/image";
import { cdnLoader } from "@/lib/cdnLoader";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type PublicationFormProps = {
  initialData?: PublicationType | null;
  onSubmit: (data: Omit<PublicationType, "id">) => void;
  onCancel: () => void;
};

export default function PublicationForm({
  initialData,
  onSubmit,
  onCancel,
}: PublicationFormProps) {
  const [form, setForm] = useState<Omit<PublicationType, "id">>({
    publication_type_id: 1,
    title: "",
    description: "",
    file: "",
    size: "",
    year: "",
    publisher: "",
    author: "",
    foreword: "",
    edition: "",
    isbn: "",
    pages: "",
    dimension: "",
    cover_url: "",
  });

  const [fileObj, setFileObj] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverError, setCoverError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        publication_type_id: initialData.publication_type_id,
        title: initialData.title,
        description: initialData.description,
        file: initialData.file,
        size: initialData.size,
        year: initialData.year,
        publisher: initialData.publisher,
        author: initialData.author,
        foreword: initialData.foreword,
        edition: initialData.edition,
        isbn: initialData.isbn,
        pages: initialData.pages,
        dimension: initialData.dimension,
        cover_url: initialData.cover_url,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setFileError("Hanya file PDF yang diperbolehkan!");
        setFileObj(null);
        return;
      }
      setFileError("");
      setFileObj(file);

      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2) + " MB";

      setForm((prev) => ({
        ...prev,
        size: fileSizeMB,
      }));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setCoverError("Hanya file gambar yang diperbolehkan!");
        setCoverFile(null);
        return;
      }
      setCoverError("");
      setCoverFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsUploading(true);

      let fileUrl = form.file;
      if (fileObj) {
        const formData = new FormData();
        formData.append("file", fileObj);
        formData.append("folder", "publications");

        const uploadRes = await fetch("/api/upload-minio", {
          method: "POST",
          body: formData,
        });

        const result = await uploadRes.json();
        if (uploadRes.ok && result.url) {
          fileUrl = result.url;
        } else {
          setFileError("Gagal upload file.");
          setIsUploading(false);
          return;
        }
      }

      let coverUrl = form.cover_url;
      if (coverFile) {
        const formData = new FormData();
        formData.append("file", coverFile);
        formData.append("folder", "publication-covers");

        const uploadRes = await fetch("/api/upload-minio", {
          method: "POST",
          body: formData,
        });

        const result = await uploadRes.json();
        if (uploadRes.ok && result.url) {
          coverUrl = result.url;
        } else {
          setCoverError("Gagal upload cover.");
          setIsUploading(false);
          return;
        }
      }

      onSubmit({
        ...form,
        file: fileUrl,
        cover_url: coverUrl,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-4">
        {initialData ? "Edit Publication" : "Tambah Publication"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm">Publication Type</label>
          <select
            name="publication_type_id"
            value={form.publication_type_id}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="1">Buku</option>
            <option value="2">Report</option>
            <option value="3">Publikasi Internasional</option>
            <option value="4">Peraturan</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm">Judul</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 text-sm">Deskripsi</label>
          <Editor
            value={form.description}
            onChange={(value: string) =>
              setForm((prev) => ({ ...prev, description: value }))
            }
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">File (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
          {fileError && <p className="text-red-500 text-xs">{fileError}</p>}

          {form.file && !fileObj && (
            <p className="text-xs mt-1">
              File sudah diunggah:{" "}
              <a
                href={getFullImageUrl(form.file)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Lihat File
              </a>
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm">Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="border p-2 rounded w-full"
          />
          {coverError && <p className="text-red-500 text-xs">{coverError}</p>}

          {(coverFile || form.cover_url) && (
            <div className="mt-2">
              {/* <img
                src={
                  coverFile
                    ? URL.createObjectURL(coverFile)
                    : getFullImageUrl(form.cover_url)
                }
                alt="Cover Preview"
                className="w-24 h-32 object-cover border rounded"
              /> 
              <Image
                src={
                  coverFile
                    ? URL.createObjectURL(coverFile)
                    : getFullImageUrl(form.cover_url)
                }
                alt="Preview"
                className="object-cover mb-2 rounded border"
                width={200}
                height={160}
                loader={cdnLoader}
              />*/}
            </div>
          )}
        </div>

        {initialData && (
          <div>
            <label className="block mb-1 text-sm">Ukuran File</label>
            <input
              type="text"
              name="size"
              value={form.size}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              readOnly
            />
          </div>
        )}

        <div>
          <label className="block mb-1 text-sm">Tahun</label>
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Penerbit</label>
          <input
            type="text"
            name="publisher"
            value={form.publisher}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Penulis</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Kata Pengantar</label>
          <input
            type="text"
            name="foreword"
            value={form.foreword}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Edisi</label>
          <input
            type="text"
            name="edition"
            value={form.edition}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Halaman</label>
          <input
            type="number"
            name="pages"
            value={form.pages}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Dimensi</label>
          <input
            type="text"
            name="dimension"
            value={form.dimension}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="col-span-2 flex gap-3 mt-4">
          <button
            type="submit"
            disabled={isUploading}
            className={`px-4 py-2 rounded-full text-white ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isUploading ? "Mengunggah..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-full"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
