import { PartnerType } from "@/types/partner";
import Image from "next/image";
import { cdnLoader } from "@/lib/cdnLoader";

type PartnerListProps = {
  partners: PartnerType[];
  onEdit: (partner: PartnerType) => void;
  onDelete: (id: number) => void;
};

export default function PartnerList({
  partners,
  onEdit,
  onDelete,
}: PartnerListProps) {
  return (
    <div className="rounded-xl bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="p-4 w-[50px]">No</th>
            <th className="p-4 w-[120px]">Logo</th>
            <th className="p-4">Nama</th>
            <th className="p-4">Tipe</th>
            <th className="p-4 w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((p, index) => (
            <tr key={p.id}>
              <td className="border-t p-3">{index + 1}</td>
              <td className="border-t p-3">
                {p.image && (
                  <Image
                    loader={cdnLoader}
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-12 object-contain"
                    width={80}
                    height={80}
                  />
                )}
              </td>
              <td className="border-t p-3">{p.name}</td>
              <td className="border-t p-3">
                {p.type === "1" ? "Mitra" : "Sertifikat"}
              </td>
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
