"use client";

import { useArticle } from "@/hooks/useArticle";
import { useState } from "react";
import { ArticleType } from "@/types/article";
import dynamic from "next/dynamic";
import { generateSlug } from "@/lib/slug";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function AdminArticlePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const {
    articles,
    loading,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    isReady,
  } = useArticle();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ArticleType>({
    id: null,
    title: "",
    slug: "",
    content: "",
    images: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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

  const handleSubmit = async () => {
    if (!isReady) return alert("Masih loading...");

    let imagePath = formData.images || "";

    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadJson = await uploadRes.json();
      imagePath = uploadJson.filePath;
    }

    const dataToSend = {
      ...formData,
      images: imagePath,
    };

    if (formData.id) {
      await updateArticle(formData.id, dataToSend);
    } else {
      await createArticle(dataToSend);
    }

    setFormData({
      id: null,
      title: "",
      slug: "",
      content: "",
      images: "",
    });
    setImageFile(null);
    setShowModal(false);
    setImagePreview("");
    fetchArticles();
  };

  const handleEdit = (article: ArticleType) => {
    setFormData(article);
    setImagePreview(article.images || "");
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await deleteArticle(id);
      fetchArticles();
    }
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      title: "",
      slug: "",
      content: "",
      images: "",
    });
    setShowModal(true);
    setImagePreview("");
  };

  if (loading)
    return (
      <div className="container mx-auto py-3 max-w-7xl px-6">Loading...</div>
    );

  return (
    <div className="container mx-auto py-3 max-w-7xl px-6 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Media</h1>
        <button
          onClick={() => handleAdd()}
          className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm"
        >
          Add Media
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border w-[50px]">No</th>
            <th className="p-2 border w-[100px]">Image</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a, index) => (
            <tr key={a.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                {a.images && (
                  <img
                    src={a.images}
                    alt={a.title}
                    className="w-20 h-12 object-cover"
                  />
                )}
              </td>
              <td className="border p-2">{a.title}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(a)} className="text-blue-500">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  onClick={() => handleDelete(a.id!)}
                  className="text-red-500"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-3xl overflow-auto max-h-[80vh] scrollbar-hide relative">
            <div
              className="absolute w-8 h-8 rounded-full bg-red-400 top-6 right-6 text-white flex items-center justify-center cursor-pointer "
              onClick={() => setShowModal(false)}
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </div>
            <h2 className="text-lg font-semibold mb-4">
              {formData.id ? "Edit Article" : "Add Article"}
            </h2>
            <label className="text-sm font-bold text-gray-400">Title</label>
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <label className="text-sm font-bold text-gray-400">Images</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover mb-2 rounded border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 mb-2 w-full"
            />

            <label className="text-sm font-bold text-gray-400">Content</label>
            <Editor
              value={formData.content}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, content: value }))
              }
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-full text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-400 text-white px-4 py-2 rounded-full text-sm"
              >
                {formData.id ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
