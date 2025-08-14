import { ArticleType } from "@/types/article";
import Image from "next/image";
import { cdnLoader } from "@/lib/cdnLoader";

type ArticleListProps = {
  articles: ArticleType[];
  onEdit: (article: ArticleType) => void;
  onDelete: (id: number) => void;
};

export default function ArticleList({
  articles,
  onEdit,
  onDelete,
}: ArticleListProps) {
  return (
    <div className="rounded-xl bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="p-4 w-[50px]">No</th>
            <th className="p-4 w-[100px]">Image</th>
            <th className="p-4">Title</th>
            <th className="p-4">Type</th>
            <th className="p-4 w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a, index) => (
            <tr key={a.id}>
              <td className="border-t p-3">{index + 1}</td>
              <td className="border-t p-3">
                {a.images && (
                  <Image
                    loader={cdnLoader}
                    src={a.images}
                    alt={a.title}
                    className="w-20 h-12 object-cover"
                    width={80}
                    height={80}
                  />
                )}
              </td>
              <td className="border-t p-3">{a.title}</td>
              <td className="border-t p-3 capitalize">{a.type}</td>
              <td className="border-t p-3 space-x-2 text-center">
                <button onClick={() => onEdit(a)} className="text-blue-500">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  onClick={() => onDelete(a.id!)}
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
