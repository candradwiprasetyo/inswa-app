import { PublicationType } from "@/types/publication";

type PublicationListProps = {
  publications: PublicationType[];
  onEdit: (p: PublicationType) => void;
  onDelete: (id: number) => void;
};

const publicationTypeMap: Record<number, string> = {
  1: "Buku",
  2: "Report",
  3: "Publikasi Internasional",
  4: "Peraturan",
};

export default function PublicationList({
  publications,
  onEdit,
  onDelete,
}: PublicationListProps) {
  return (
    <div className="rounded-xl bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="p-4 w-[50px]">No</th>
            <th className="p-4">Judul</th>
            <th className="p-4">Tipe</th>
            <th className="p-4">Tahun</th>
            <th className="p-4 w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((p, index) => (
            <tr key={p.id}>
              <td className="border-t p-3">{index + 1}</td>
              <td className="border-t p-3">{p.title}</td>
              <td className="border-t p-3">
                {publicationTypeMap[p.publication_type_id] || "-"}
              </td>
              <td className="border-t p-3">{p.year}</td>
              <td className="border-t p-3 space-x-2 text-center">
                <button onClick={() => onEdit(p)} className="text-blue-500">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  onClick={() => onDelete(p.id!)}
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
