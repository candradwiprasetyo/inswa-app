"use client";

import { useArticle } from "@/hooks/useArticle";
import { useState, useEffect } from "react";
import { ArticleType } from "@/types/article";
import LoadingAdmin from "@/components/LoadingAdmin";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import ArticleForm from "./Form";
import Pagination from "@/components/Pagination";
import ArticleHeader from "./Header";
import ArticleList from "./List";

export default function AdminArticlePage() {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const {
    articles,
    loading,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    currentPage,
    totalPages,
  } = useArticle();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ArticleType>({
    id: null,
    title: "",
    slug: "",
    content: "",
    images: "",
  });

  const handleEdit = (article: ArticleType) => {
    setFormData(article);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await deleteArticle(id);
    fetchArticles();
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
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchArticles(page);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (loading) return <LoadingAdmin />;

  return (
    <div className="container mx-auto py-4 max-w-7xl px-6">
      <ArticleHeader onAdd={handleAdd} />
      <ArticleList
        articles={articles}
        onEdit={handleEdit}
        onDelete={(id) => setConfirmDeleteId(id)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ArticleForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={formData}
        onSubmitData={async (data) => {
          if (data.id) {
            await updateArticle(data.id, data);
          } else {
            await createArticle(data);
          }
          fetchArticles();
        }}
      />

      {confirmDeleteId !== null && (
        <DeleteConfirmation
          onCancel={() => setConfirmDeleteId(null)}
          onConfirm={async () => {
            await handleDelete(confirmDeleteId);
            setConfirmDeleteId(null);
          }}
        />
      )}
    </div>
  );
}
